"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { AMENITY_OPTIONS } from "@/data/amenities";
import { studioCategories } from "@/data/categories";

const inputClasses =
  "mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white";

const URL_RE = /^https?:\/\/\S+$/i;

const EMPTY_FORM = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  imageUrl: "",
  amenities: [],
  overview: "",
};

export default function StudioForm({ mode = "add", initialData, studioId }) {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState(() =>
    initialData
      ? {
          title: initialData.title ?? "",
          category: initialData.category ?? "",
          hourlyRate: String(initialData.hourlyRate ?? ""),
          securityDeposit: String(initialData.securityDeposit ?? ""),
          maxCapacity: String(initialData.maxCapacity ?? ""),
          location: initialData.location ?? "",
          imageUrl: initialData.image ?? initialData.imageUrl ?? "",
          amenities: initialData.amenities ?? [],
          overview: initialData.overview ?? "",
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function toggleAmenity(amenity) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.category) nextErrors.category = "Pick a category.";
    if (!(Number(form.hourlyRate) > 0))
      nextErrors.hourlyRate = "Hourly rate must be greater than 0.";
    if (!(Number(form.maxCapacity) >= 1))
      nextErrors.maxCapacity = "Max capacity must be at least 1.";
    if (!form.location.trim()) nextErrors.location = "Location is required.";
    if (!form.imageUrl.trim()) nextErrors.imageUrl = "Image URL is required.";
    else if (!URL_RE.test(form.imageUrl.trim()))
      nextErrors.imageUrl = "Enter a valid URL (https://…).";
    if (form.overview.trim().length < 20)
      nextErrors.overview = "Overview must be at least 20 characters.";
    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const endpoint = mode === "edit" ? `/api/studios/${studioId}` : "/api/studios";
    const method = mode === "edit" ? "PUT" : "POST";
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title.trim(),
        category: form.category,
        hourlyRate: Number(form.hourlyRate),
        securityDeposit: Number(form.securityDeposit) || 0,
        maxCapacity: Number(form.maxCapacity),
        location: form.location.trim(),
        imageUrl: form.imageUrl.trim(),
        amenities: form.amenities,
        overview: form.overview.trim(),
      }),
    }).catch(() => null);
    setSubmitting(false);

    if (!response) {
      toast.error("Network error — please try again.");
      return;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      // Surface field-level errors from the API when present.
      if (data.fields) setErrors(data.fields);
      toast.error(data.error || "Something went wrong.");
      return;
    }
    toast.success(
      mode === "edit" ? "Studio updated successfully" : "Studio listed successfully"
    );
    router.push("/my-listings");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            placeholder="Daylight Cyc Studio"
            className={inputClasses}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(errors.category)}
          >
            <option value="">Select a category…</option>
            {studioCategories.map((category) => (
              <option key={category.slug} value={category.label}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Location / Address
          </label>
          <input
            id="location"
            type="text"
            value={form.location}
            onChange={(event) => update("location", event.target.value)}
            placeholder="Brooklyn, NY"
            className={inputClasses}
            aria-invalid={Boolean(errors.location)}
          />
          {errors.location && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.location}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="hourly-rate" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Hourly Rate ($)
          </label>
          <input
            id="hourly-rate"
            type="number"
            min="1"
            step="1"
            value={form.hourlyRate}
            onChange={(event) => update("hourlyRate", event.target.value)}
            placeholder="45"
            className={inputClasses}
            aria-invalid={Boolean(errors.hourlyRate)}
          />
          {errors.hourlyRate && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.hourlyRate}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="security-deposit" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Security Deposit ($)
          </label>
          <input
            id="security-deposit"
            type="number"
            min="0"
            step="1"
            value={form.securityDeposit}
            onChange={(event) => update("securityDeposit", event.target.value)}
            placeholder="150"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="max-capacity" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Max Capacity
          </label>
          <input
            id="max-capacity"
            type="number"
            min="1"
            step="1"
            value={form.maxCapacity}
            onChange={(event) => update("maxCapacity", event.target.value)}
            placeholder="8"
            className={inputClasses}
            aria-invalid={Boolean(errors.maxCapacity)}
          />
          {errors.maxCapacity && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.maxCapacity}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="image-url" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Image URL
          </label>
          <input
            id="image-url"
            type="url"
            value={form.imageUrl}
            onChange={(event) => update("imageUrl", event.target.value)}
            placeholder="https://i.ibb.co/your-studio.jpg"
            className={inputClasses}
            aria-invalid={Boolean(errors.imageUrl)}
          />
          {errors.imageUrl ? (
            <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.imageUrl}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              Upload to imgbb or postimage and paste the direct link.
            </p>
          )}
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Amenities
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {AMENITY_OPTIONS.map((amenity) => {
              const selected = form.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  aria-pressed={selected}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    selected
                      ? "bg-amber-500 text-zinc-950"
                      : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  {amenity}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="overview" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Detailed Overview
          </label>
          <textarea
            id="overview"
            rows={5}
            value={form.overview}
            onChange={(event) => update("overview", event.target.value)}
            placeholder="Describe the space, gear included, access notes, and what kinds of shoots it suits best."
            className={inputClasses}
            aria-invalid={Boolean(errors.overview)}
          />
          {errors.overview && (
            <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.overview}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:col-span-2 dark:border-zinc-800 dark:bg-zinc-900/60">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            Hosted by
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {user?.name}{" "}
            <span className="text-zinc-400 dark:text-zinc-500">({user?.email})</span>
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
            Filled from your account — read-only.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting
          ? mode === "edit"
            ? "Saving…"
            : "Publishing…"
          : mode === "edit"
            ? "Save Changes"
            : "Publish Studio"}
      </button>
    </form>
  );
}
