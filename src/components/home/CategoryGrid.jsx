import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Photo Studios",
    slug: "photo-studio",
    image: "/images/categories/photo-studios.jpg",
    alt: "Photo studio with a white cyclorama wall and lighting stands",
  },
  {
    label: "Sound Stages",
    slug: "sound-stage",
    image: "/images/categories/sound-stages.jpg",
    alt: "Crew shooting on a sound stage under a large softbox",
  },
  {
    label: "Podcast Rooms",
    slug: "podcast-room",
    image: "/images/categories/podcast-rooms.jpg",
    alt: "Studio microphone with headphones in a podcast room",
  },
  {
    label: "Music Suites",
    slug: "music-suite",
    image: "/images/categories/music-suites.jpg",
    alt: "Music production suite with a mixing console and monitors",
  },
  {
    label: "Art Workshops",
    slug: "art-workshop",
    image: "/images/categories/art-workshops.jpg",
    alt: "Hands shaping clay on a pottery wheel in an art workshop",
  },
];

export default function CategoryGrid() {
  return (
    <section aria-labelledby="categories-heading" className="bg-zinc-50 py-20 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Browse by type
          </p>
          <h2
            id="categories-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white"
          >
            Studio Categories
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Jump straight to the kind of space your next project needs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/studios?category=${category.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[3/4]"
              aria-label={`Browse ${category.label}`}
            >
              <Image
                src={category.image}
                alt={category.alt}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
                <span className="text-sm font-semibold leading-tight text-white sm:text-base">
                  {category.label}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-zinc-950 transition-transform group-hover:translate-x-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
