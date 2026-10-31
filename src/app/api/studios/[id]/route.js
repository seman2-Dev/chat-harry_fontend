import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { withDb } from "@/lib/db";

async function getSession(request) {
  return auth.api.getSession({ headers: request.headers });
}

function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

export async function GET(request, { params }) {
  const { id } = await params;
  const _id = toObjectId(id);
  if (!_id) return Response.json({ error: "Invalid studio id." }, { status: 400 });

  try {
    const studio = await withDb((db) => db.collection("studios").findOne({ _id }));
    if (!studio) return Response.json({ error: "Studio not found." }, { status: 404 });
    return Response.json({ studio });
  } catch {
    return Response.json({ error: "Database is unavailable." }, { status: 503 });
  }
}

// Challenge 1: only the owner may update their listing.
export async function PUT(request, { params }) {
  const session = await getSession(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const _id = toObjectId(id);
  if (!_id) return Response.json({ error: "Invalid studio id." }, { status: 400 });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    title,
    category,
    hourlyRate,
    securityDeposit,
    maxCapacity,
    location,
    imageUrl,
    amenities,
    overview,
  } = body ?? {};

  const errors = {};
  if (!title?.trim()) errors.title = "Title is required.";
  if (!category?.trim()) errors.category = "Category is required.";
  if (!(Number(hourlyRate) > 0)) errors.hourlyRate = "Hourly rate must be greater than 0.";
  if (!(Number(maxCapacity) >= 1)) errors.maxCapacity = "Max capacity must be at least 1.";
  if (!location?.trim()) errors.location = "Location is required.";
  if (!imageUrl?.trim()) errors.imageUrl = "Image URL is required.";
  if (!overview?.trim() || overview.trim().length < 20)
    errors.overview = "Overview must be at least 20 characters.";
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Validation failed.", fields: errors }, { status: 400 });
  }

  try {
    const result = await withDb(async (db) => {
      const existing = await db.collection("studios").findOne({ _id });
      if (!existing) return { notFound: true };
      if (existing.ownerEmail !== session.user.email) return { forbidden: true };
      const update = {
        title: title.trim(),
        category: category.trim(),
        hourlyRate: Number(hourlyRate),
        securityDeposit: Number(securityDeposit) || 0,
        maxCapacity: Number(maxCapacity),
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        amenities: Array.isArray(amenities) ? amenities.filter(Boolean) : [],
        overview: overview.trim(),
        updatedAt: new Date(),
      };
      await db.collection("studios").updateOne({ _id }, { $set: update });
      return { studio: { ...existing, ...update } };
    });

    if (result.notFound) {
      return Response.json({ error: "Studio not found." }, { status: 404 });
    }
    if (result.forbidden) {
      return Response.json(
        { error: "You can only edit your own studios." },
        { status: 403 }
      );
    }
    return Response.json({ studio: result.studio });
  } catch {
    return Response.json(
      { error: "Could not update the studio." },
      { status: 503 }
    );
  }
}

// Challenge 1: only the owner may delete their listing.
export async function DELETE(request, { params }) {
  const session = await getSession(request);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const _id = toObjectId(id);
  if (!_id) return Response.json({ error: "Invalid studio id." }, { status: 400 });

  try {
    const result = await withDb(async (db) => {
      const existing = await db.collection("studios").findOne({ _id });
      if (!existing) return { notFound: true };
      if (existing.ownerEmail !== session.user.email) return { forbidden: true };
      await db.collection("studios").deleteOne({ _id });
      return { ok: true };
    });

    if (result.notFound) {
      return Response.json({ error: "Studio not found." }, { status: 404 });
    }
    if (result.forbidden) {
      return Response.json(
        { error: "You can only delete your own studios." },
        { status: 403 }
      );
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Could not delete the studio." },
      { status: 503 }
    );
  }
}
