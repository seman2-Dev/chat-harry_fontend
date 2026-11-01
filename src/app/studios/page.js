import { Suspense } from "react";
import StudiosExplorer from "@/components/studios/StudiosExplorer";
import StudiosGridSkeleton from "@/components/studios/StudiosGridSkeleton";
import { allStudios, getAllStudios } from "@/data/studios";

export const metadata = {
  title: "Explore Studios — StudioSpace",
  description:
    "Browse every creative workspace on StudioSpace — photo studios, sound stages, podcast lounges, music suites, and art workshops available by the hour.",
};

async function StudiosSection() {
  const availableStudios = await getAllStudios();
  const existingTitles = new Set(
    availableStudios.map((studio) => studio.title.toLowerCase())
  );
  const studios = [
    ...availableStudios,
    ...allStudios.filter((studio) => !existingTitles.has(studio.title.toLowerCase())),
  ].slice(0, 15);
  return <StudiosExplorer studios={studios} />;
}

function ExplorerFallback() {
  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="h-10 w-full animate-pulse rounded-lg bg-zinc-200 lg:max-w-md dark:bg-zinc-800" />
        <div className="h-10 w-44 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-8 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>
      <div className="mt-6 h-4 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-6">
        <StudiosGridSkeleton />
      </div>
    </div>
  );
}

export default function ExploreStudiosPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 py-14 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              The full catalog
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Explore Studios
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Every workspace on StudioSpace — filter by category or search by
              city to find the room your next project needs.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ExplorerFallback />}>
            <StudiosSection />
          </Suspense>
        </div>
      </section>
    </>
  );
}
