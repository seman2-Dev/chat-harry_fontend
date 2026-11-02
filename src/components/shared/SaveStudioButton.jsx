"use client";

import { useAuth } from "@/context/AuthContext";

export default function SaveStudioButton({ studio }) {
  const { user, savedStudios, toggleSavedStudio } = useAuth();
  const studioId = String(studio._id ?? studio.id);
  const canSave = /^[a-f0-9]{24}$/i.test(studioId);
  const saved = savedStudios.some((item) => item.studioId === studioId);

  return (
    <button
      type="button"
      disabled={!canSave}
      onClick={() => toggleSavedStudio(studio)}
      aria-label={saved ? "Remove studio from saved studios" : "Save studio"}
      aria-pressed={saved}
      title={!canSave ? "Sample studios cannot be saved" : user ? (saved ? "Remove from saved studios" : "Save studio") : "Sign in to save this studio"}
      className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-zinc-500 shadow transition hover:scale-105 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-950/90 dark:text-zinc-300"
    >
      <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={`h-5 w-5 ${saved ? "text-rose-600" : ""}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
      </svg>
    </button>
  );
}
