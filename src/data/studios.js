// Studio data layer. Server-rendered pages read the Express API; these mock
// rows keep the catalog usable when the API is empty or unavailable.

import { connection } from "next/server";
import { safeImageSrc } from "@/lib/images";

export const allStudios = [
  {
    id: "frame-and-focus-product-studio",
    title: "Frame & Focus Product Studio",
    category: "Photo Studio",
    hourlyRate: 45,
    securityDeposit: 150,
    maxCapacity: 8,
    rating: 4.9,
    reviewCount: 42,
    location: "Chicago, IL",
    image: "/images/studios/product-studio.jpg",
    gallery: [
      "/images/studios/product-studio.jpg",
      "/images/categories/photo-studios.jpg",
      "/images/hero/cyc-studio.jpg",
    ],
    alt: "Product photography studio with softbox lights and a shooting table",
    overview:
      "A daylight-balanced product studio built for e-commerce teams and editorial shooters. Fourteen-foot seamless rolls, tethered capture station, and a dedicated prop closet keep small crews moving without a load-in headache.",
    amenities: ["Wi-Fi", "Natural Light", "Kitchen", "Parking", "Makeup Station"],
    host: { name: "Maya Chen", email: "maya.frameandfocus@example.com", avatar: null },
  },
  {
    id: "backlot-film-stage",
    title: "Backlot Film Stage",
    category: "Sound Stage",
    hourlyRate: 120,
    securityDeposit: 500,
    maxCapacity: 30,
    rating: 4.8,
    reviewCount: 27,
    location: "Burbank, CA",
    image: "/images/hero/cyc-studio.jpg",
    gallery: [
      "/images/hero/cyc-studio.jpg",
      "/images/categories/sound-stages.jpg",
      "/images/hero/sound-stage.jpg",
    ],
    alt: "Empty cinema sound stage with a white cyc wall and studio lighting",
    overview:
      "A 4,000 sq ft sound stage with a 22-foot grid, drive-in access, and a full grip package available on request. Power drops every 20 feet and a blackout-ready cyc wall on the north side.",
    amenities: ["Loading Dock", "Parking", "Wi-Fi", "Soundproofing", "Blackout Curtains"],
    host: { name: "Darius King", email: "darius.backlot@example.com", avatar: null },
  },
  {
    id: "podcave-recording-lounge",
    title: "Podcave Recording Lounge",
    category: "Podcast Lounge",
    hourlyRate: 30,
    securityDeposit: 75,
    maxCapacity: 5,
    rating: 4.7,
    reviewCount: 61,
    location: "Austin, TX",
    image: "/images/studios/podcast-lounge.jpg",
    gallery: [
      "/images/studios/podcast-lounge.jpg",
      "/images/categories/podcast-rooms.jpg",
    ],
    alt: "Podcast table with boom-arm microphones and headphones",
    overview:
      "A treated four-mic podcast lounge with a broadcast table, headphone cues, and a live-switched camera angle. Walk in, press record — the interface is preconfigured for Riverside and Riverside-style remote guests.",
    amenities: ["Podcast Mics", "Soundproofing", "Wi-Fi", "Kitchen"],
    host: { name: "Priya Nair", email: "priya.podcave@example.com", avatar: null },
  },
  {
    id: "analog-dreams-music-suite",
    title: "Analog Dreams Music Suite",
    category: "Music Suite",
    hourlyRate: 55,
    securityDeposit: 200,
    maxCapacity: 10,
    rating: 4.9,
    reviewCount: 38,
    location: "Nashville, TN",
    image: "/images/studios/music-suite.jpg",
    gallery: [
      "/images/studios/music-suite.jpg",
      "/images/categories/music-suites.jpg",
      "/images/hero/control-room.jpg",
    ],
    alt: "Recording studio control room lined with analog racks and a mixing desk",
    overview:
      "A hybrid analog/digital tracking suite centered on a restored console and outboard chain. Iso booth, vocal chain, and a library of backline instruments are included in the hourly rate.",
    amenities: ["Soundproofing", "PA System", "Drum Kit", "Wi-Fi", "Parking"],
    host: { name: "Levi Brooks", email: "levi.analogdreams@example.com", avatar: null },
  },
  {
    id: "creators-booth",
    title: "The Creator's Booth",
    category: "Podcast Lounge",
    hourlyRate: 28,
    securityDeposit: 50,
    maxCapacity: 4,
    rating: 4.6,
    reviewCount: 19,
    location: "Toronto, ON",
    image: "/images/studios/creators-booth.jpg",
    gallery: [
      "/images/studios/creators-booth.jpg",
      "/images/categories/podcast-rooms.jpg",
    ],
    alt: "Home-style podcast booth with mixer, laptop, and microphone",
    overview:
      "A cozy two-person booth with a warm wood aesthetic — ideal for interview shows and solo video podcasts. Ring lights and a clean backdrop wall are already rigged.",
    amenities: ["Podcast Mics", "Wi-Fi", "Natural Light"],
    host: { name: "Sam Okafor", email: "sam.creatorsbooth@example.com", avatar: null },
  },
  {
    id: "brass-and-ivy-session-room",
    title: "Brass & Ivy Session Room",
    category: "Music Suite",
    hourlyRate: 50,
    securityDeposit: 150,
    maxCapacity: 8,
    rating: 4.8,
    reviewCount: 23,
    location: "New Orleans, LA",
    image: "/images/studios/vintage-keys.jpg",
    gallery: [
      "/images/studios/vintage-keys.jpg",
      "/images/categories/music-suites.jpg",
    ],
    alt: "Sunlit vintage music room with piano, turntable, and warm wood floors",
    overview:
      "A sunlit session room with upright piano, vintage keys, and a live room that flatters acoustic ensembles. Perfect for tracking demos, scoring cues, and intimate listening sessions.",
    amenities: ["Natural Light", "PA System", "Wi-Fi", "Kitchen"],
    host: { name: "Elodie Fleur", email: "elodie.brassivy@example.com", avatar: null },
  },
  {
    id: "clay-and-kiln-workshop",
    title: "Clay & Kiln Workshop",
    category: "Art Workshop",
    hourlyRate: 35,
    securityDeposit: 100,
    maxCapacity: 12,
    rating: null,
    reviewCount: 0,
    location: "Portland, OR",
    image: "/images/categories/art-workshops.jpg",
    gallery: [
      "/images/categories/art-workshops.jpg",
      "/images/hero/cyc-studio.jpg",
    ],
    alt: "Hands shaping clay on a pottery wheel in a bright art workshop",
    overview:
      "A shared ceramics workshop with eight wheels, two kilns, and washable worktables. Great for maker classes, brand workshops, and process-content shoots that need real mess.",
    amenities: ["Pottery Wheel", "Easels & Tables", "Parking", "Kitchen", "Wi-Fi"],
    host: { name: "Jonah Reed", email: "jonah.claykiln@example.com", avatar: null },
  },
  {
    id: "daylight-cyc-studio",
    title: "Daylight Cyc Studio",
    category: "Photo Studio",
    hourlyRate: 65,
    securityDeposit: 250,
    maxCapacity: 15,
    rating: null,
    reviewCount: 0,
    location: "Brooklyn, NY",
    image: "/images/hero/cyc-studio.jpg",
    gallery: [
      "/images/hero/cyc-studio.jpg",
      "/images/categories/photo-studios.jpg",
    ],
    alt: "Photographer shooting on a white cyclorama wall under daylight",
    overview:
      "A 1,200 sq ft daylight cyc with a 16-foot infinity wall and north-facing windows. Drive-in access, client lounge, and a blackout option for strobe-only setups.",
    amenities: ["Cyc Wall", "Natural Light", "Loading Dock", "Parking", "Wi-Fi", "Kitchen"],
    host: { name: "Rosa Alvarez", email: "rosa.daylightcyc@example.com", avatar: null },
  },
  {
    id: "the-edit-suite",
    title: "The Edit Suite",
    category: "Photo Studio",
    hourlyRate: 38,
    securityDeposit: 100,
    maxCapacity: 4,
    rating: 4.8,
    reviewCount: 16,
    location: "Seattle, WA",
    image: "/images/studios/product-studio.jpg",
    gallery: ["/images/studios/product-studio.jpg", "/images/hero/cyc-studio.jpg"],
    alt: "Product studio with camera, softbox lights, and an empty shooting table",
    overview:
      "A compact, ready-to-shoot product studio with adjustable softboxes, seamless backdrops, and a dedicated tabletop setup for catalog and editorial work.",
    amenities: ["Softbox Lighting", "Cyc Wall", "Wi-Fi", "Parking"],
    host: { name: "Taylor Morgan", email: "taylor.editsuite@example.com", avatar: null },
  },
  {
    id: "north-room-audio",
    title: "North Room Audio",
    category: "Podcast Lounge",
    hourlyRate: 32,
    securityDeposit: 80,
    maxCapacity: 6,
    rating: 4.9,
    reviewCount: 31,
    location: "Denver, CO",
    image: "/images/studios/podcast-lounge.jpg",
    gallery: ["/images/studios/podcast-lounge.jpg", "/images/studios/creators-booth.jpg"],
    alt: "Empty podcast room with microphones, headphones, and a recording desk",
    overview:
      "A quiet, treated recording room with a four-microphone setup, headphone distribution, and a simple control desk ready for interviews and voice work.",
    amenities: ["Podcast Mics", "Soundproofing", "Headphones", "Wi-Fi"],
    host: { name: "Alex Rivera", email: "alex.northroom@example.com", avatar: null },
  },
  {
    id: "the-ceramic-lightroom",
    title: "The Ceramic Lightroom",
    category: "Art Workshop",
    hourlyRate: 42,
    securityDeposit: 120,
    maxCapacity: 10,
    rating: 4.7,
    reviewCount: 12,
    location: "San Diego, CA",
    image: "/images/categories/art-workshops.jpg",
    gallery: ["/images/categories/art-workshops.jpg", "/images/hero/cyc-studio.jpg"],
    alt: "Clay and pottery workspace with tools on a worktable, no faces visible",
    overview:
      "A bright maker space with washable worktables, pottery tools, and generous natural light for small workshops, product shoots, and hands-on creative sessions.",
    amenities: ["Easels & Tables", "Natural Light", "Kitchen", "Wi-Fi"],
    host: { name: "Jamie Park", email: "jamie.ceramiclightroom@example.com", avatar: null },
  },
  {
    id: "softbox-corner-studio",
    title: "Softbox Corner Studio",
    category: "Photo Studio",
    hourlyRate: 40,
    securityDeposit: 100,
    maxCapacity: 6,
    rating: 4.8,
    reviewCount: 14,
    location: "Boston, MA",
    image: "/images/studios/product-studio.jpg",
    gallery: ["/images/studios/product-studio.jpg", "/images/hero/cyc-studio.jpg"],
    alt: "Compact product photography studio with a tabletop set and softbox lights",
    overview: "A flexible tabletop studio with adjustable softboxes and clean backdrops for product, food, and catalog photography.",
    amenities: ["Softbox Lighting", "Natural Light", "Wi-Fi", "Parking"],
    host: { name: "Avery Brooks", email: "avery.softbox@example.com", avatar: null },
  },
  {
    id: "cedar-podcast-room",
    title: "Cedar Podcast Room",
    category: "Podcast Lounge",
    hourlyRate: 34,
    securityDeposit: 75,
    maxCapacity: 5,
    rating: 4.7,
    reviewCount: 9,
    location: "Minneapolis, MN",
    image: "/images/categories/podcast-rooms.jpg",
    gallery: ["/images/categories/podcast-rooms.jpg", "/images/studios/podcast-lounge.jpg"],
    alt: "Podcast microphone and headphones in a sound-treated recording room",
    overview: "A quiet recording room with broadcast microphones, monitoring headphones, and acoustic treatment for interviews and voice work.",
    amenities: ["Podcast Mics", "Headphones", "Soundproofing", "Wi-Fi"],
    host: { name: "Morgan Ellis", email: "morgan.cedarroom@example.com", avatar: null },
  },
  {
    id: "violet-hour-mix-suite",
    title: "Violet Hour Mix Suite",
    category: "Music Suite",
    hourlyRate: 60,
    securityDeposit: 180,
    maxCapacity: 6,
    rating: 4.9,
    reviewCount: 21,
    location: "Atlanta, GA",
    image: "/images/hero/control-room.jpg",
    gallery: ["/images/hero/control-room.jpg", "/images/studios/music-suite.jpg"],
    alt: "Music mixing suite with studio monitors, acoustic panels, and a mixing desk",
    overview: "A treated mixing room with accurate nearfield monitors, a spacious console, and a comfortable setup for focused production sessions.",
    amenities: ["Soundproofing", "Studio Monitors", "Wi-Fi", "Kitchen"],
    host: { name: "Jordan Miles", email: "jordan.violethour@example.com", avatar: null },
  },
  {
    id: "open-floor-maker-studio",
    title: "Open Floor Maker Studio",
    category: "Art Workshop",
    hourlyRate: 38,
    securityDeposit: 100,
    maxCapacity: 14,
    rating: null,
    reviewCount: 0,
    location: "Philadelphia, PA",
    image: "/images/categories/art-workshops.jpg",
    gallery: ["/images/categories/art-workshops.jpg", "/images/hero/cyc-studio.jpg"],
    alt: "Bright art workshop with a spacious worktable and pottery tools",
    overview: "An adaptable maker space with washable tables, open floor area, and natural light for small classes, crafts, and creative projects.",
    amenities: ["Easels & Tables", "Natural Light", "Kitchen", "Parking"],
    host: { name: "Casey Nguyen", email: "casey.openfloor@example.com", avatar: null },
  },
];

export function normalizeStudio(doc) {
  return {
    id: String(doc._id ?? doc.id),
    title: doc.title,
    category: doc.category,
    hourlyRate: Number(doc.hourlyRate) || 0,
    securityDeposit: Number(doc.securityDeposit) || 0,
    maxCapacity: Number(doc.maxCapacity) || 0,
    rating: doc.rating == null ? null : Number(doc.rating),
    reviewCount: Number(doc.reviewCount) || 0,
    location: doc.location,
    image: safeImageSrc(doc.imageUrl || doc.image),
    gallery:
      Array.isArray(doc.gallery) && doc.gallery.length > 0
        ? doc.gallery.map((entry) => safeImageSrc(entry))
        : [safeImageSrc(doc.imageUrl || doc.image)],
    alt: doc.alt || doc.title,
    overview: doc.overview || "",
    amenities: Array.isArray(doc.amenities) ? doc.amenities : [],
    host: {
      name: doc.ownerName || doc.host?.name || "StudioSpace Host",
      email: doc.ownerEmail || doc.host?.email || "",
      avatar: doc.host?.avatar || null,
    },
    ownerEmail: doc.ownerEmail || doc.host?.email || "",
  };
}

const API_URL = (
  process.env.API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://cat-harry-backend-sable.vercel.app"
    : "http://localhost:5000")
).replace(/\/$/, "");

async function fetchStudiosFromApi(path = "") {
  const response = await fetch(`${API_URL}/api/studios${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(3000),
  });
  if (!response.ok) return null;
  return response.json();
}

export async function getAllStudios() {
  // Wait for the real request so studios added via CRUD appear immediately
  // instead of being frozen into a prerendered page.
  await connection();
  try {
    const data = await fetchStudiosFromApi("?limit=100");
    if (data?.studios?.length > 0) return data.studios.map(normalizeStudio);
  } catch {
    // API unavailable or empty → fall back to the local sample data.
  }
  return allStudios;
}

export async function getFeaturedStudios() {
  await connection();
  let fromApi = [];
  try {
    // Rubric: newest or top-rated studios, limited to 6.
    const data = await fetchStudiosFromApi("/featured");
    if (data?.studios?.length > 0) fromApi = data.studios.map(normalizeStudio);
  } catch {
    // API unavailable → fall through to the local sample data.
  }
  // Always surface 6 cards: API/MongoDB first (newest), then top-rated samples.
  const featured = fromApi.slice(0, 6);
  if (featured.length >= 6) return featured;
  const seen = new Set(featured.map((studio) => studio.id));
  const seenTitles = new Set(featured.map((studio) => studio.title.toLowerCase()));
  const fillers = [...allStudios]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .filter((studio) => !seen.has(studio.id) && !seenTitles.has(studio.title.toLowerCase()));
  return [...featured, ...fillers].slice(0, 6);
}

export async function getStudioById(id) {
  await connection();
  try {
    const data = await fetchStudiosFromApi(`/${encodeURIComponent(id)}`);
    if (data?.studio) return normalizeStudio(data.studio);
  } catch {
    // API unavailable → fall back to the local sample data.
  }
  return allStudios.find((studio) => studio.id === id) || null;
}
