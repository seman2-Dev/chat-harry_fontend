"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import RequireAuth from "@/components/auth/RequireAuth";
import ConfirmModal from "@/components/shared/ConfirmModal";
import EmptyState from "@/components/shared/EmptyState";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAuth } from "@/context/AuthContext";

function BookingsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-28 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      ))}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-14 w-14"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4m8-4v4M3 11h18" />
    </svg>
  );
}

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingCancel, setPendingCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!user) return undefined;
    // Canonical React data-fetch pattern: async work inside the effect,
    // guarded by a cancellation flag (react-hooks/set-state-in-effect).
    let ignore = false;
    (async () => {
      const response = await fetch("/api/bookings").catch(() => null);
      if (ignore) return;
      if (response?.ok) {
        const data = await response.json().catch(() => ({}));
        if (!ignore) setBookings(data.bookings ?? []);
      } else if (response?.status === 401) {
        // Session not ready yet — show the empty state.
        setBookings([]);
      } else {
        toast.error("Could not load your bookings.");
      }
      if (!ignore) setLoading(false);
    })();
    return () => {
      ignore = true;
    };
  }, [user]);

  async function handleCancel() {
    if (!pendingCancel) return;
    setCancelling(true);
    const response = await fetch(`/api/bookings/${pendingCancel._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Cancelled" }),
    }).catch(() => null);
    setCancelling(false);
    setPendingCancel(null);
    if (!response) {
      toast.error("Network error — please try again.");
      return;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast.error(data.error || "Could not cancel the booking.");
      return;
    }
    toast.success("Booking cancelled");
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === pendingCancel._id
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  }

  return (
    <RequireAuth>
      <div className="bg-white py-12 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Your reservations
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              My Bookings
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Track upcoming shoots and cancel pending slots when plans change.
            </p>
          </header>

          {loading ? (
            <BookingsSkeleton />
          ) : bookings.length === 0 ? (
            <EmptyState
              icon={<CalendarIcon />}
              title="No bookings yet"
              message="When you reserve a studio it shows up here with its status and details."
              actionLabel="Explore Studios"
              actionHref="/studios"
            />
          ) : (
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li
                  key={booking._id}
                  className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-200 sm:w-28 dark:bg-zinc-800">
                    <Image
                      src={booking.studioImage || "/images/studios/product-studio.jpg"}
                      alt={booking.studioTitle}
                      fill
                      sizes="112px"
                      unoptimized
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/studios/${booking.studioId}`}
                        className="truncate text-base font-semibold text-zinc-900 transition-colors hover:text-amber-600 dark:text-white dark:hover:text-amber-400"
                      >
                        {booking.studioTitle}
                      </Link>
                      <StatusBadge status={booking.status} />
                    </div>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {booking.date} at {booking.startTime} · {booking.durationHours}{" "}
                      {booking.durationHours === 1 ? "hour" : "hours"} ·{" "}
                      <strong className="text-zinc-900 dark:text-white">
                        ${booking.totalPrice}
                      </strong>
                    </p>
                    {booking.note && (
                      <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
                        Note: {booking.note}
                      </p>
                    )}
                  </div>
                  {booking.status === "Pending" && (
                    <button
                      type="button"
                      onClick={() => setPendingCancel(booking)}
                      className="shrink-0 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                      Cancel Booking
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ConfirmModal
        open={Boolean(pendingCancel)}
        title="Cancel this booking?"
        message={`${pendingCancel?.studioTitle} on ${pendingCancel?.date} at ${pendingCancel?.startTime} will be released.`}
        confirmLabel="Cancel Booking"
        danger
        busy={cancelling}
        onConfirm={handleCancel}
        onCancel={() => !cancelling && setPendingCancel(null)}
      />
    </RequireAuth>
  );
}
