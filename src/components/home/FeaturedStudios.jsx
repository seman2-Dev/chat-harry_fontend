import Link from "next/link";
import StudioCard from "@/components/shared/StudioCard";

export default function FeaturedStudios({ studios }) {
  return (
    <section aria-labelledby="featured-heading" className="bg-white py-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Handpicked for you
          </p>
          <h2
            id="featured-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white"
          >
            Featured Studios
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Six of the highest-rated spaces on the platform — booked by creators
            this week.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/studios"
            className="inline-block rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Browse All Studios
          </Link>
        </div>
      </div>
    </section>
  );
}
