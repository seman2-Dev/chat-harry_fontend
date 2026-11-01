"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BookingModal from "@/components/studios/BookingModal";
import { useAuth } from "@/context/AuthContext";

function StarRow({ rating }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
          className={`h-4 w-4 ${star <= rating ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600"}`}
        >
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.29a1 1 0 0 0 .95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.18 0l-2.8 2.03c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.72c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.69l1.07-3.29Z" />
        </svg>
      ))}
    </span>
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

function CheckIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default function StudioDetails({ studio }) {
  const [activeImage, setActiveImage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const gallery = studio.gallery?.length > 0 ? studio.gallery : [studio.image];

  useEffect(() => {
    let ignore = false;
    fetch(`/api/studios/${studio.id}/reviews`)
      .then((response) => response.ok ? response.json() : { reviews: [] })
      .then((data) => { if (!ignore) setReviews(data.reviews ?? []); })
      .catch(() => { if (!ignore) setReviews([]); });
    return () => { ignore = true; };
  }, [studio.id]);

  async function submitReview(event) {
    event.preventDefault();
    setReviewSubmitting(true);
    const response = await fetch(`/api/studios/${studio.id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: reviewRating, text: reviewText }),
    }).catch(() => null);
    setReviewSubmitting(false);
    if (!response) return toast.error("Network error — please try again.");
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return toast.error(data.error || "Could not submit your review.");
    setReviews((current) => [data.review, ...current]);
    setReviewText("");
    router.refresh();
    toast.success("Thanks for sharing your experience.");
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Gallery */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
            <Image
              src={gallery[activeImage]}
              alt={`${studio.title} — photo ${activeImage + 1}`}
              fill
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() =>
                    setActiveImage((index) =>
                      index === 0 ? gallery.length - 1 : index - 1
                    )
                  }
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() =>
                    setActiveImage((index) =>
                      index === gallery.length - 1 ? 0 : index + 1
                    )
                  }
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show photo ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === activeImage
                      ? "bg-amber-500"
                      : "bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              About this studio
            </h2>
            <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
              {studio.overview || "No description provided yet."}
            </p>
          </div>

          {/* Amenities */}
          {studio.amenities?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Amenities
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {studio.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300"
                  >
                    <CheckIcon className="h-4 w-4 shrink-0 text-emerald-500" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews */}
          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Reviews
              </h2>
              {studio.rating != null && (
                <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <StarRow rating={Math.round(studio.rating)} />
                  <strong className="text-zinc-900 dark:text-white">
                    {studio.rating.toFixed(1)}
                  </strong>
                  ({studio.reviewCount} review{studio.reviewCount === 1 ? "" : "s"})
                </span>
              )}
            </div>
            {reviews.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <li
                    key={review._id}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-700 dark:text-amber-400">
                          {(review.userName || "C").charAt(0)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {review.userName || "Creator"}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {new Date(review.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <StarRow rating={review.rating} />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {review.text}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-zinc-300 px-5 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                No reviews yet — be the first to book and leave one.
              </p>
            )}
            {user && (
              <form onSubmit={submitReview} className="mt-5 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Share your experience</h3>
                <div className="mt-3 flex items-center gap-3">
                  <label htmlFor="review-rating" className="text-sm text-zinc-600 dark:text-zinc-400">Rating</label>
                  <select
                    id="review-rating"
                    value={reviewRating}
                    onChange={(event) => setReviewRating(Number(event.target.value))}
                    className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                  >
                    {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}
                  </select>
                </div>
                <textarea
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  minLength={8}
                  maxLength={1200}
                  required
                  rows={3}
                  placeholder="What should other creators know about this space?"
                  className="mt-3 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                />
                <button disabled={reviewSubmitting} className="mt-3 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-60">
                  {reviewSubmitting ? "Posting…" : "Post review"}
                </button>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Reviews are available after a completed booking.</p>
              </form>
            )}
          </div>
        </div>

        {/* Booking sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              ${studio.hourlyRate}
              <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">
                {" "}
                / hr
              </span>
            </p>
            {studio.securityDeposit > 0 && (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                ${studio.securityDeposit} refundable deposit
              </p>
            )}

            <dl className="mt-5 space-y-3 border-t border-zinc-100 pt-5 text-sm dark:border-zinc-800">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500 dark:text-zinc-400">Location</dt>
                <dd className="flex items-center gap-1.5 font-medium text-zinc-900 dark:text-white">
                  <PinIcon className="h-4 w-4 text-amber-500" />
                  {studio.location}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500 dark:text-zinc-400">Category</dt>
                <dd className="font-medium text-zinc-900 dark:text-white">
                  {studio.category}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-zinc-500 dark:text-zinc-400">Max capacity</dt>
                <dd className="font-medium text-zinc-900 dark:text-white">
                  {studio.maxCapacity > 0 ? `${studio.maxCapacity} people` : "—"}
                </dd>
              </div>
              {studio.rating != null && (
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-zinc-500 dark:text-zinc-400">Rating</dt>
                  <dd className="flex items-center gap-1.5 font-medium text-zinc-900 dark:text-white">
                    <StarRow rating={Math.round(studio.rating)} />
                    {studio.rating.toFixed(1)}
                  </dd>
                </div>
              )}
            </dl>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="mt-6 w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
            >
              Book Workspace Now
            </button>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/70">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20 font-bold text-amber-700 dark:text-amber-400">
                {studio.host?.name?.charAt(0) || "H"}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                  {studio.host?.name}
                </p>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  Studio host
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <BookingModal
        studio={studio}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
