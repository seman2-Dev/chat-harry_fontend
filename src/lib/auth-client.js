"use client";

import { createAuthClient } from "better-auth/react";

// Same-origin by default; no NEXT_PUBLIC vars needed.
export const authClient = createAuthClient();
