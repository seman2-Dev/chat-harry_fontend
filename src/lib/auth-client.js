"use client";

import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// Same-origin by default; no NEXT_PUBLIC vars needed.
export const authClient = createAuthClient({ plugins: [jwtClient()] });

// Keep access JWTs short-lived and memory-only. The long-lived browser
// credential remains Better Auth's HttpOnly session cookie.
export async function authenticatedFetch(input, init = {}) {
  const headers = new Headers(init.headers);
  try {
    const { data } = await authClient.token();
    if (data?.token) headers.set("Authorization", `Bearer ${data.token}`);
  } catch {
    // Preserve cookie-session requests if token issuance is temporarily
    // unavailable; the API still authenticates the HttpOnly session.
  }
  return fetch(input, {
    ...init,
    credentials: "include",
    headers,
  });
}
