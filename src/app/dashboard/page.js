"use client";

import Link from "next/link";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/context/AuthContext";

const actions = [
  {
    title: "Add New Studio",
    description: "List a new creative space and start taking bookings.",
    href: "/add-studio",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    title: "My Studio Listings",
    description: "Update or remove the spaces you already host.",
    href: "/my-listings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "My Bookings",
    description: "Review reservations and cancel pending slots.",
    href: "/my-bookings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4m8-4v4M3 11h18" />
      </svg>
    ),
  },
  {
    title: "Explore Studios",
    description: "Browse every workspace on the marketplace.",
    href: "/studios",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <RequireAuth>
      <div className="bg-white py-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xl font-bold text-amber-700 dark:text-amber-400">
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                (user?.name?.charAt(0) || "U").toUpperCase()
              )}
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Dashboard
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Welcome back, {user?.name?.split(" ")[0] || "creator"}
              </h1>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">{user?.email}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  {action.icon}
                </span>
                <span>
                  <span className="block text-lg font-semibold text-zinc-900 dark:text-white">
                    {action.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {action.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
