"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StudioCard from "@/components/shared/StudioCard";
import { categoryLabelForSlug, studioCategories } from "@/data/categories";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
];

function SearchIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CompassIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" />
    </svg>
  );
}

export default function StudiosExplorer({ studios }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialCategory = categoryLabelForSlug(
    searchParams.get("category")
  )
    ? searchParams.get("category")
    : null;

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("recommended");

  function selectCategory(slug) {
    setCategory(slug);
    if (slug) {
      router.replace(`${pathname}?category=${slug}`, { scroll: false });
    } else {
      router.replace(pathname, { scroll: false });
    }
  }

  function clearFilters() {
    setQuery("");
    setCategory(null);
    setSort("recommended");
    router.replace(pathname, { scroll: false });
  }

  const filteredStudios = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    let result = studios.filter((studio) => {
      const matchesCategory =
        !category || studio.category === categoryLabelForSlug(category);
      const matchesQuery =
        !normalizedQuery ||
        studio.title.toLowerCase().includes(normalizedQuery) ||
        studio.location.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sort === "rating-desc") {
      result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return result;
  }, [studios, query, category, sort]);

  const hasActiveFilters = Boolean(query.trim() || category);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or location…"
            aria-label="Search studios by title or location"
            className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="studio-sort"
            className="text-sm font-medium text-zinc-500 dark:text-zinc-400"
          >
            Sort by
          </label>
          <select
            id="studio-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => selectCategory(null)}
          aria-pressed={!category}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            !category
              ? "bg-amber-500 text-zinc-950"
              : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          }`}
        >
          All
        </button>
        {studioCategories.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => selectCategory(item.slug)}
            aria-pressed={category === item.slug}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              category === item.slug
                ? "bg-amber-500 text-zinc-950"
                : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p
        aria-live="polite"
        className="mt-6 text-sm text-zinc-500 dark:text-zinc-400"
      >
        Showing {filteredStudios.length} of {studios.length}{" "}
        {studios.length === 1 ? "studio" : "studios"}
      </p>

      {filteredStudios.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
          <CompassIcon className="h-12 w-12 text-zinc-300 dark:text-zinc-600" />
          <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
            No studios found
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Try a different search, or clear your filters to browse every space
            on StudioSpace.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
