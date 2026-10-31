// Canonical studio categories shared across the app:
// - Home category cards use `slug` for /studios links and `plural` for labels.
// - Explore Studios filter chips use `slug` for matching and `label`, which is
//   exactly what each studio card shows as its category badge.
// - The future Add Studio form should use these slugs/labels too.

export const studioCategories = [
  { slug: "photo-studio", label: "Photo Studio", plural: "Photo Studios" },
  { slug: "sound-stage", label: "Sound Stage", plural: "Sound Stages" },
  { slug: "podcast-room", label: "Podcast Lounge", plural: "Podcast Rooms" },
  { slug: "music-suite", label: "Music Suite", plural: "Music Suites" },
  { slug: "art-workshop", label: "Art Workshop", plural: "Art Workshops" },
];

export function categoryLabelForSlug(slug) {
  return studioCategories.find((category) => category.slug === slug)?.label ?? null;
}
