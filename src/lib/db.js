import { MongoClient } from "mongodb";

// The driver connects lazily on the first operation, so importing this module
// (e.g. during `next build`) never requires MongoDB to be running.
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studiospace";

export function getDb() {
  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
  return client.db(); // db name comes from the URI path (/studiospace)
}

// Run `fn(db)` against the database with a short timeout so a missing local
// mongod never stalls a page or the build. Always closes the client.
export async function withDb(fn) {
  const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
  try {
    return await fn(client.db());
  } finally {
    await client.close().catch(() => {});
  }
}
