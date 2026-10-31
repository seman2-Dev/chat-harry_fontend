import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// BetterAuth endpoints: /api/auth/sign-in/email, /api/auth/sign-up/email,
// /api/auth/sign-out, /api/auth/get-session, /api/auth/callback/google, ...
export const { GET, POST } = toNextJsHandler(auth.handler);
