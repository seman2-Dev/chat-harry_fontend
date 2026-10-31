import Link from "next/link";

export const metadata = {
  title: "Page Not Found — StudioSpace",
};

// Creative "studio" illustration: a light beam sweeping across an empty cyc.
function StudioNotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 320 180"
      role="img"
      aria-label="An empty studio with a spotlight and camera"
      className="mx-auto h-44 w-auto text-zinc-300 dark:text-zinc-700"
    >
      {/* Backdrop cyc wall */}
      <path
        d="M20 150 Q20 60 90 60 H230 Q300 60 300 150 Z"
        fill="currentColor"
        opacity="0.25"
      />
      {/* Floor line */}
      <path d="M10 150 H310" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Spotlight */}
      <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <rect x="148" y="14" width="24" height="14" rx="3" fill="currentColor" opacity="0.85" />
        <path d="M160 28 L110 150 L210 150 Z" fill="#f59e0b" opacity="0.25" stroke="none" />
        <path d="M160 28v8" />
      </g>
      {/* Camera on tripod */}
      <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="64" y="96" width="34" height="22" rx="4" fill="currentColor" opacity="0.5" />
        <circle cx="104" cy="107" r="8" />
        <path d="M78 118v32M66 150l12-16M90 150 78 134" />
      </g>
      {/* Floating aperture (brand mark) */}
      <g transform="translate(238 88)" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="18" />
        <path d="m25.3 12 9.7 16.9M14.7 12h19.4M9.1 20l9.7-16.9M14.7 28 5 11.1M25.3 28H4.2M30.9 20l-9.7 16.9" />
      </g>
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
        404 — Scene missing
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
        This set isn&apos;t lit
      </h1>
      <div className="mt-8 w-full">
        <StudioNotFoundIllustration />
      </div>
      <p className="mt-8 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
        The page you&apos;re looking for was struck from the call sheet. Head
        back home and pick a new scene.
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
