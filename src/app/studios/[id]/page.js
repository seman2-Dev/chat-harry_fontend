import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import StudioDetails from "@/components/studios/StudioDetails";
import { getStudioById } from "@/data/studios";

// Fully dynamic (per-request): studio data and the shared Header's
// usePathname() can't exist in a static shell for an unknown id.
export const instant = false;

export async function generateMetadata({ params }) {
  const { id } = await params;
  await connection();
  const studio = await getStudioById(id);
  if (!studio) return { title: "Studio not found — StudioSpace" };
  return {
    title: `${studio.title} — StudioSpace`,
    description: `${studio.overview?.slice(0, 150) || `Book ${studio.title} by the hour in ${studio.location}.`}`,
  };
}

export default async function StudioDetailsPage({ params }) {
  const { id } = await params;
  await connection();
  const studio = await getStudioById(id);
  if (!studio) notFound();

  return (
    <div className="bg-white py-10 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/studios" className="transition-colors hover:text-amber-600 dark:hover:text-amber-400">
            Explore Studios
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span className="text-zinc-900 dark:text-white">{studio.title}</span>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
              {studio.category}
            </span>
            {studio.rating != null ? (
              <span className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-amber-400">
                  <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29Z" />
                </svg>
                {studio.rating.toFixed(1)} · {studio.reviewCount} reviews
              </span>
            ) : (
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                New listing
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            {studio.title}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{studio.location}</p>
        </header>

        <StudioDetails studio={studio} />
      </div>
    </div>
  );
}
