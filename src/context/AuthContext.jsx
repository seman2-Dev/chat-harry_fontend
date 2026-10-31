"use client";

import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Client-side session read — keeps the layout's static shell intact under
  // Cache Components (no cookies() read in a server layout).
  const { data, isPending } = authClient.useSession();
  const user = data?.user
    ? {
        name: data.user.name,
        email: data.user.email,
        image: data.user.image ?? null,
      }
    : null;

  async function logout() {
    await authClient.signOut();
  }

  return (
    <AuthContext.Provider
      value={{ user, session: data, isPending, logout, authClient }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
