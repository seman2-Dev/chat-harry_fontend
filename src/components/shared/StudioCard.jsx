import Image from "next/image";
import Link from "next/link";

function StarIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29Z" />
    </svg>
  );
}

function PinIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function StudioCard({ studio }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={studio.image}
          alt={studio.alt || studio.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-amber-500/95 px-3 py-1 text-xs font-semibold text-zinc-950">
          {studio.category}
        </span>
        {studio.rating != null ? (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <StarIcon className="h-3.5 w-3.5 text-amber-400" />
            {studio.rating.toFixed(1)}
          </span>
        ) : (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
            New
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {studio.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <PinIcon className="h-4 w-4 shrink-0" />
          {studio.location}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="text-lg font-bold text-zinc-900 dark:text-white">
            ${studio.hourlyRate}
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {" "}
              / hr
            </span>
          </p>
          <Link
            href={`/studios/${studio.id}`}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
