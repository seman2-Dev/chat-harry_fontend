"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import EmptyState from "@/components/shared/EmptyState";
import StudioCard from "@/components/shared/StudioCard";
import { useAuth } from "@/context/AuthContext";

export default function SavedStudiosPage() {
  const { savedStudios } = useAuth();
  const studios = savedStudios.map(({ studio, studioId }) => ({
    ...studio,
    id: studioId,
    image: studio.imageUrl || "/images/studios/product-studio.jpg",
  }));

  return (
    <RequireAuth>
      <section className="bg-white py-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">Your shortlist</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">Saved Studios</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Keep promising creative spaces close for your next project.</p>
          </header>
          {studios.length === 0 ? (
            <EmptyState
              icon={<span className="text-5xl" aria-hidden="true">♡</span>}
              title="No saved studios yet"
              message="Tap the heart on any studio card to keep it in your shortlist."
              actionLabel="Explore Studios"
              actionHref="/studios"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => <StudioCard key={studio.id} studio={studio} />)}
            </div>
          )}
        </div>
      </section>
    </RequireAuth>
  );
}
