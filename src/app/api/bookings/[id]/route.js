import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { withDb } from "@/lib/db";

async function getSession(request) {
  return auth.api.getSession({ headers: request.headers });
}

// Only the booking's owner may change it, and only Pending → Cancelled
// (hosts confirm via their own dashboard in a later iteration).
export async function PATCH(request, { params }) {
  const session = await getSession(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return Response.json({ error: "Invalid booking id." }, { status: 400 });
  }
  const _id = new ObjectId(id);

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body?.status !== "Cancelled") {
    return Response.json(
      { error: "Only cancellations are supported right now." },
      { status: 400 }
    );
  }

  try {
    const result = await withDb(async (db) => {
      const existing = await db.collection("bookings").findOne({ _id });
      if (!existing) return { notFound: true };
      if (existing.userEmail !== session.user.email) return { forbidden: true };
      if (existing.status !== "Pending") return { wrongStatus: true };
      await db
        .collection("bookings")
        .updateOne({ _id }, { $set: { status: "Cancelled", updatedAt: new Date() } });
      return { ok: true };
    });

    if (result.notFound) {
      return Response.json({ error: "Booking not found." }, { status: 404 });
    }
    if (result.forbidden) {
      return Response.json(
        { error: "You can only manage your own bookings." },
        { status: 403 }
      );
    }
    if (result.wrongStatus) {
      return Response.json(
        { error: "Only pending bookings can be cancelled." },
        { status: 409 }
      );
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Could not cancel the booking." }, { status: 503 });
  }
}
