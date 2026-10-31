import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { withDb } from "@/lib/db";

async function getSession(request) {
  return auth.api.getSession({ headers: request.headers });
}

// Bookings store date (YYYY-MM-DD) + startTime ("HH:MM") + durationHours.
// Two bookings collide when their [start, end) windows overlap on one day.
function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function overlaps(existing, next) {
  if (existing.date !== next.date) return false;
  if (existing.studioId !== next.studioId) return false;
  const nextStart = toMinutes(next.startTime);
  const nextEnd = nextStart + next.durationHours * 60;
  const existingStart = toMinutes(existing.startTime);
  const existingEnd = existingStart + existing.durationHours * 60;
  return nextStart < existingEnd && existingStart < nextEnd;
}

export async function GET(request) {
  const session = await getSession(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const bookings = await withDb(async (db) =>
      db
        .collection("bookings")
        .find({ userEmail: session.user.email })
        .sort({ createdAt: -1 })
        .limit(200)
        .toArray()
    );
    return Response.json({ bookings });
  } catch {
    return Response.json({ error: "Database is unavailable." }, { status: 503 });
  }
}

// Challenge 1 (401 without session) + Challenge 2 (reject overlapping
// Confirmed/Pending bookings for the same slot).
export async function POST(request) {
  const session = await getSession(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { studioId, date, startTime, durationHours, totalPrice, note, studioSnapshot } =
    body ?? {};

  const errors = {};
  if (!studioId) errors.studioId = "Studio is required.";
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.date = "Pick a valid date.";
  if (!startTime || !/^\d{2}:\d{2}$/.test(startTime))
    errors.startTime = "Pick a start time.";
  const hours = Number(durationHours);
  if (!(hours >= 1 && hours <= 12))
    errors.durationHours = "Duration must be between 1 and 12 hours.";
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Validation failed.", fields: errors }, { status: 400 });
  }

  const _id = ObjectId.isValid(studioId) ? new ObjectId(studioId) : null;

  try {
    const outcome = await withDb(async (db) => {
      // Resolve the studio (DB ObjectId) for pricing + title. Seed/mock
      // studios are not in the DB, so fall back to the client snapshot.
      const studio = _id
        ? await db.collection("studios").findOne({ _id })
        : await db.collection("studios").findOne({ id: studioId });
      const snapshot = studioSnapshot ?? {};
      const studioTitle = studio?.title || snapshot.title || "Studio";
      const studioImage =
        studio?.imageUrl || snapshot.image || "/images/studios/product-studio.jpg";
      const studioLocation = studio?.location || snapshot.location || "";
      const hourlyRate = Number(studio?.hourlyRate ?? snapshot.hourlyRate) || 0;
      if (!studio && !snapshot.title) return { notFound: true };

      const booking = {
        studioId,
        studioTitle,
        studioImage,
        studioLocation,
        hourlyRate,
        date,
        startTime,
        durationHours: hours,
        totalPrice: Number(totalPrice) || hourlyRate * hours,
        note: typeof note === "string" ? note.slice(0, 500) : "",
        status: "Pending",
        userEmail: session.user.email,
        userName: session.user.name,
        createdAt: new Date(),
      };

      // Challenge 2: reject collisions with active (Pending/Confirmed) slots.
      const active = await db
        .collection("bookings")
        .find({ status: { $in: ["Pending", "Confirmed"] } })
        .toArray();
      const clash = active.find((existing) => overlaps(existing, booking));
      if (clash) return { clash: true };

      const result = await db.collection("bookings").insertOne(booking);
      return { booking: { ...booking, _id: result.insertedId } };
    });

    if (outcome.notFound) {
      return Response.json({ error: "Studio not found." }, { status: 404 });
    }
    if (outcome.clash) {
      return Response.json(
        {
          error:
            "That time slot is already booked. Please choose different hours.",
        },
        { status: 409 }
      );
    }
    return Response.json({ booking: outcome.booking }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Could not create the booking." },
      { status: 503 }
    );
  }
}
