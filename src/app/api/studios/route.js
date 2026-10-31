import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { withDb } from "@/lib/db";

async function getSession(request) {
  return auth.api.getSession({ headers: request.headers ?? (await headers()) });
}

export async function GET() {
  try {
    const studios = await withDb(async (db) =>
      db
        .collection("studios")
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray()
    );
    return Response.json({ studios });
  } catch {
    return Response.json(
      { error: "Database is unavailable right now." },
      { status: 503 }
    );
  }
}

// Challenge 1: mutations require a session (JWT lives in an HttpOnly cookie).
export async function POST(request) {
  const session = await getSession(request);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const doc = {
    title: title.trim(),
    category: category.trim(),
    hourlyRate: Number(hourlyRate),
    securityDeposit: Number(securityDeposit) || 0,
    maxCapacity: Number(maxCapacity),
    location: location.trim(),
    imageUrl: imageUrl.trim(),
    amenities: Array.isArray(amenities) ? amenities.filter(Boolean) : [],
    overview: overview.trim(),
    ownerEmail: session.user.email,
    ownerName: session.user.name,
    rating: null,
    reviewCount: 0,
    createdAt: new Date(),
  };

  try {
    const result = await withDb((db) => db.collection("studios").insertOne(doc));
    return Response.json(
      { studio: { ...doc, _id: result.insertedId } },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "Could not save the studio. Try again later." },
      { status: 503 }
    );
  }
}
