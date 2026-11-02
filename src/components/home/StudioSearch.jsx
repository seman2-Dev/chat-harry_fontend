import Link from "next/link";
import { studioCategories } from "@/data/categories";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function StudioSearch() {
  return (
    <section
      aria-labelledby="studio-search-heading"
      className="relative z-10 mx-auto -mt-8 max-w-5xl px-4 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-950/10 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
              Start with your project
            </p>
            <h2
              id="studio-search-heading"
              className="mt-1 text-xl font-bold text-zinc-950 dark:text-white"
            >
              Find a space that fits
            </h2>
          </div>
          <Link
            href="/studios"
            className="text-sm font-semibold text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-amber-700 dark:text-zinc-300 dark:decoration-zinc-700 dark:hover:text-amber-400"
          >
            Browse every studio
          </Link>
        </div>

        <form action="/studios" method="GET" className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <label className="sr-only" htmlFor="home-studio-query">
            Search by studio name or location
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
              <SearchIcon />
            </span>
            <input
              id="home-studio-query"
              type="search"
              name="q"
              placeholder="Studio name or location"
              className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
          <label className="sr-only" htmlFor="home-studio-category">
            Choose a studio category
          </label>
          <select
            id="home-studio-category"
            name="category"
            defaultValue=""
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
          >
            <option value="">All studio types</option>
            {studioCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.plural}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
          >
            <SearchIcon />
            Search spaces
          </button>
        </form>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          Search by title or city, then compare rates, amenities, and listing details.
        </p>
      </div>
    </section>
  );
}
