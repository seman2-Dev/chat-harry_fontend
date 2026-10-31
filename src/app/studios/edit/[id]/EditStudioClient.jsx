"use client";

import Link from "next/link";
import RequireAuth from "@/components/auth/RequireAuth";
import StudioForm from "@/components/studios/StudioForm";
import { useAuth } from "@/context/AuthContext";

export default function EditStudioClient({ studioId, initialStudio }) {
  const { user } = useAuth();

  const ownerEmail = initialStudio?.ownerEmail || initialStudio?.host?.email;
  const forbidden = Boolean(user && ownerEmail && ownerEmail !== user.email);

  if (!initialStudio) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Studio not found
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          This listing may have been removed.
        </p>
        <Link
          href="/my-listings"
          className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
        >
          Back to My Listings
        </Link>
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
          You cannot edit this studio
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Only the listing&apos;s host can update it.
        </p>
        <Link
          href="/my-listings"
          className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
        >
          Back to My Listings
        </Link>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="bg-white py-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Update listing
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Edit {initialStudio.title}
            </h1>
          </header>
          <StudioForm mode="edit" studioId={studioId} initialData={initialStudio} />
        </div>
      </div>
    </RequireAuth>
  );
}
