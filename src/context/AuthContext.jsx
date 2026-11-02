"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

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
  const [savedStudios, setSavedStudios] = useState([]);
  const [savedForEmail, setSavedForEmail] = useState(null);

  useEffect(() => {
    let ignore = false;
    if (!user?.email) return () => { ignore = true; };
    fetch("/api/wishlist")
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load saved studios.");
        return response.json();
      })
      .then((payload) => {
        if (!ignore) {
          setSavedStudios(payload.items ?? []);
          setSavedForEmail(user.email);
        }
      })
      .catch(() => {
        if (!ignore) toast.error("Could not load your saved studios.");
      });
    return () => { ignore = true; };
  }, [user?.email]);

  const toggleSavedStudio = useCallback(async (studio) => {
    if (!user?.email) {
      toast.error("Sign in to save studios.");
      return false;
    }
    const studioId = String(studio._id ?? studio.id);
    const existing = savedStudios.some((item) => item.studioId === studioId);
    const response = await fetch(existing ? `/api/wishlist/${studioId}` : "/api/wishlist", {
      method: existing ? "DELETE" : "POST",
      headers: existing ? undefined : { "Content-Type": "application/json" },
      body: existing ? undefined : JSON.stringify({ studioId }),
    }).catch(() => null);
    if (!response) {
      toast.error("Network error — please try again.");
      return false;
    }
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast.error(payload.error || "Could not update your saved studios.");
      return false;
    }
    setSavedStudios((items) => existing
      ? items.filter((item) => item.studioId !== studioId)
      : [payload.item, ...items]);
    toast.success(existing ? "Removed from saved studios" : "Studio saved" );
    return true;
  }, [savedStudios, user?.email]);

  async function logout() {
    await authClient.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session: data,
        isPending,
        logout,
        authClient,
        savedStudios: savedForEmail === user?.email ? savedStudios : [],
        toggleSavedStudio,
      }}
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
