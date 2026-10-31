"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Client-side private-route guard. Waits for the session to settle before
// deciding anything: redirecting while isPending would bounce every logged-in
// user to /login on a hard reload (Key Rule 5 in Requirments.md).
export default function RequireAuth({ children }) {
  const { user, isPending } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isPending || user) return;
    const redirect = encodeURIComponent(pathname);
    router.replace(`/login?redirect=${redirect}`);
  }, [isPending, user, router, pathname]);

  if (isPending || !user) {
    // Logged-out visitors see a skeleton until the redirect kicks in;
    // logged-in users get their content as soon as the session resolves.
    return (
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-8 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-6 h-4 w-96 max-w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-56 rounded-2xl bg-zinc-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      </div>
    );
  }

  return children;
}
