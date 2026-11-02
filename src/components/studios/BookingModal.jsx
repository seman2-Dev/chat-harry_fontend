"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { authenticatedFetch } from "@/lib/auth-client";

const TIME_SLOTS = Array.from({ length: 16 }, (_, index) => {
  const hour = index + 6; // 06:00 – 21:00
  return `${String(hour).padStart(2, "0")}:00`;
});

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export default function BookingModal({ studio, open, onClose }) {
  const router = useRouter();
  const { user, isPending } = useAuth();
  const [date, setDate] = useState(todayIso());
  const [startTime, setStartTime] = useState("10:00");
  const [durationHours, setDurationHours] = useState(2);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = useMemo(
    () => studio.hourlyRate * durationHours,
    [studio.hourlyRate, durationHours]
  );

  if (!open) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!user) {
      toast.message("Please sign in to book this studio.");
      router.push(`/login?redirect=${encodeURIComponent(`/studios/${studio.id}`)}`);
      return;
    }
    setSubmitting(true);
    const response = await authenticatedFetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studioId: studio.id,
        date,
        startTime,
        durationHours,
        totalPrice,
        note,
        // Seed/mock studios are not in MongoDB — send a snapshot so the API
        // can still record the reservation.
        studioSnapshot: {
          title: studio.title,
          image: studio.image,
          location: studio.location,
          hourlyRate: studio.hourlyRate,
        },
      }),
    }).catch(() => null);
    setSubmitting(false);

    if (!response) {
      toast.error("Network error — please try again.");
      return;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast.error(data.error || "Could not create the booking.");
      return;
    }
    toast.success("Booking requested — track it in My Bookings");
    onClose();
    router.push("/my-bookings");
    router.refresh();
  }

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-700">
              <Image
                src={studio.image}
                alt={studio.alt || studio.title}
                fill
                sizes="56px"
                unoptimized
                className="object-cover"
              />
            </span>
            <div className="min-w-0">
              <h2
                id="booking-title"
                className="truncate text-lg font-semibold text-zinc-900 dark:text-white"
              >
                Book {studio.title}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                ${studio.hourlyRate} / hr · {studio.location}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="booking-date"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Date
              </label>
              <input
                id="booking-date"
                type="date"
                min={todayIso()}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="booking-start"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Start time
              </label>
              <select
                id="booking-start"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="booking-duration"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Duration (hours)
              </label>
              <select
                id="booking-duration"
                value={durationHours}
                onChange={(event) => setDurationHours(Number(event.target.value))}
                className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              >
                {Array.from({ length: 12 }, (_, index) => index + 1).map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} {hours === 1 ? "hour" : "hours"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Estimated total
              </span>
              <span className="mt-1.5 rounded-lg bg-amber-500/15 px-3.5 py-2.5 text-lg font-bold text-amber-700 dark:text-amber-400">
                ${totalPrice}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="booking-note"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Note for the host <span className="text-zinc-400">(optional)</span>
            </label>
            <textarea
              id="booking-note"
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Crew size, gear load-in time, anything the host should know…"
              className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            Bookings start as <strong>Pending</strong>. Overlapping slots are
            rejected automatically — you will see an error if the time is taken.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || isPending}
              className="flex-1 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Booking…" : "Book Workspace Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
