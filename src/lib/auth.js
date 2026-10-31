import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// The driver connects lazily on the first operation, so importing this module
// (e.g. during `next build`) never requires MongoDB to be running.
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studiospace";

function getDb() {
  const client = new MongoClient(MONGODB_URI);
  return client.db(); // db name comes from the URI path (/studiospace)
}

const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : undefined;

export const auth = betterAuth({
  database: mongodbAdapter(getDb()),
  emailAndPassword: {
    enabled: true,
    // Assignment requires passwords of at least 6 characters (default is 8).
    minPasswordLength: 6,
    // Registering must land the user on the Login page (per Requirments.md),
    // so do not create a session automatically on sign-up.
    autoSignIn: false,
  },
  // OAuth providers appear only once credentials exist in .env.local.
  socialProviders: google,
  plugins: [nextCookies()],
});
