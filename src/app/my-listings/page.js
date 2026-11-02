"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import RequireAuth from "@/components/auth/RequireAuth";
import ConfirmModal from "@/components/shared/ConfirmModal";
import EmptyState from "@/components/shared/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { authenticatedFetch } from "@/lib/auth-client";

function ListingsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 animate-pulse sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-64 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      ))}
    </div>
  );
}

function StudioGridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-14 w-14"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export default function MyListingsPage() {
  const { user } = useAuth();
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user?.email) return undefined;
    // Canonical React data-fetch pattern: async work inside the effect,
    // guarded by a cancellation flag (react-hooks/set-state-in-effect).
    let ignore = false;
    (async () => {
      const response = await fetch(
        `/api/studios?owner=${encodeURIComponent(user.email)}`
      ).catch(() => null);
      if (ignore) return;
      if (response?.ok) {
        const data = await response.json().catch(() => ({}));
        setStudios(data.studios ?? []);
      } else {
        toast.error("Could not load your listings.");
      }
      if (!ignore) setLoading(false);
    })();
    return () => {
      ignore = true;
    };
  }, [user?.email, user]);

  async function handleDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    const response = await authenticatedFetch(`/api/studios/${pendingDelete._id}`, {
      method: "DELETE",
    }).catch(() => null);
    setDeleting(false);
    setPendingDelete(null);
    if (!response) {
      toast.error("Network error — please try again.");
      return;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast.error(data.error || "Could not delete the studio.");
      return;
    }
    toast.success("Studio deleted");
    setStudios((prev) => prev.filter((studio) => studio._id !== pendingDelete._id));
  }

  return (
    <RequireAuth>
      <div className="bg-white py-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Host dashboard
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                My Studio Listings
              </h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Manage the spaces you host on StudioSpace.
              </p>
            </div>
            <Link
              href="/add-studio"
              className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
            >
              + Add New Studio
            </Link>
          </header>

          {loading ? (
            <ListingsSkeleton />
          ) : studios.length === 0 ? (
            <EmptyState
              icon={<StudioGridIcon />}
              title="No studios listed yet"
              message="List your first creative space and start earning from hours your room sits empty."
              actionLabel="Add Your First Studio"
              actionHref="/add-studio"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <article
                  key={studio._id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={studio.imageUrl || "/images/studios/product-studio.jpg"}
                      alt={studio.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-amber-500/95 px-3 py-1 text-xs font-semibold text-zinc-950">
                      {studio.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {studio.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {studio.location}
                    </p>
                    <p className="mt-2 text-lg font-bold text-zinc-900 dark:text-white">
                      ${studio.hourlyRate}
                      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        {" "}
                        / hr
                      </span>
                    </p>
                    <div className="mt-auto flex gap-3 pt-5">
                      <Link
                        href={`/studios/edit/${studio._id}`}
                        className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-center text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      >
                        Update
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(studio)}
                        className="flex-1 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={Boolean(pendingDelete)}
        title="Delete this studio?"
        message={`"${pendingDelete?.title}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete Studio"
        danger
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setPendingDelete(null)}
      />
    </RequireAuth>
  );
}
