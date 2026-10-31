import Link from "next/link";

export const metadata = {
  title: "About Us — StudioSpace",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
        About StudioSpace
      </h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        We connect creators with professional studios they can rent by the hour
        — and help hosts turn empty rooms into income. Full story coming soon.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
      >
        Return to Home
      </Link>
    </div>
  );
}
