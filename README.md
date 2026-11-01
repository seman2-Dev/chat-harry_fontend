# StudioSpace

> Peer-to-peer creative workspace marketplace — find and book photo studios, podcast rooms, music suites, sound stages and art workshops.

**Live site:** [cat-harry-wine.vercel.app](https://cat-harry-wine.vercel.app)

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Express 5**, **Better Auth**, and **MongoDB**.

## Features

- **Home** — 5-slide autoplaying hero (fade), featured studios (Express API `limit(6)` with mock-data fallback), browse-by-category deep links, how-booking-works + host guarantee sections.
- **Browse studios** (`/studios`) — server-rendered grid with category/location/price filters, skeleton loader while streaming.
- **Studio details** (`/studios/[id]`) — gallery carousel, amenities, overview, host card, persisted reviews, sticky booking sidebar; falls back to sample listings when a studio isn't in MongoDB.
- **Book a studio** — modal collects date / start time / duration, computes total client-side, POSTs to `/api/bookings` with the studio snapshot; overlapping slots are rejected server-side.
- **My bookings** (`/my-bookings`) — status badges, pending cancellation, host confirmation and completion transitions.
- **Host a studio** (`/add-studio`) — shared `StudioForm` with validation, direct image upload through the API, and Sonner toasts.
- **My listings** (`/my-listings`) — edit / delete with a custom confirm modal (no `alert()`), empty state.
- **Edit studio** (`/studios/edit/[id]`) — server-fetched data + ownership guard (403 page for non-owners).
- **Dashboard** (`/dashboard`) — account overview with links to listings/bookings; protected by `src/proxy.js`.
- **Auth** — Better Auth email/password (register → login, password rules, toasts on every failure path), Google sign-in one env-var away (see `authentication.md`), avatar dropdown, `HttpOnly` session cookies.
- **Theme toggle** — light/dark switch persisted to `localStorage` (`studiospace-theme`); initial script in the root layout paints the right theme before hydration (no flash).
- **404** — custom illustration page for unknown routes.
- **Private routes** — `RequireAuth` waits for `isPending` before redirecting, so a logged-in user reloading `/dashboard` is never bounced to `/login`.
- Static pages: `/about`, `/how-it-works`, `/terms`, `/privacy`.

## Tech stack

- **Framework:** Next.js 16.4.3 (App Router, `cacheComponents`, React Compiler, Turbopack)
- **UI:** React 19, Tailwind CSS v4 (CSS-first `@theme` + `@custom-variant dark`), Swiper 14, Lucide icons, Sonner toasts
- **Auth:** Better Auth 1.7 (MongoDB adapter, Express Node handler, HttpOnly sessions)
- **API:** Express 5 routes for studios, bookings, uploads, wishlists, and reviews; proxied through Next rewrites
- **Database:** MongoDB driver (no ODM); frontend studio reads use the Express API, and seed/mock studios in `src/data/studios.js` provide an offline fallback

## API routes

| Route | Methods | Notes |
| --- | --- | --- |
| `/api/studios` | GET (list), POST (create) | POST requires session (401) + full-field validation |
| `/api/studios/[id]` | GET, PUT, DELETE | owner-only mutations (403 for others) |
| `/api/bookings` | GET (mine), POST (book) | POST requires session; rejects overlapping Pending/Confirmed slots |
| `/api/bookings/[id]` | PATCH | guests cancel; studio hosts confirm and complete |
| `/api/uploads` | POST | authenticated imgbb proxy; requires backend `IMGBB_API_KEY` |
| `/api/wishlist` | GET, POST, DELETE by studio id | private, user-scoped saved studios |
| `/api/studios/[id]/reviews` | GET, POST | signed-in user must have a completed booking to review |

## Local setup

```bash
cp .env.example .env.local    # then edit the values
npm install
npm run db:start              # starts local mongod (data in .mongodb-data/)
npm run dev                   # http://localhost:3000
```

Start the API in a second terminal from `../cat_harry_backend` with `npm install && npm run dev`.
Set `API_URL=http://localhost:5000` in the client `.env.local`, and use the same MongoDB URI
and `BETTER_AUTH_SECRET` in both apps. Set backend `BETTER_AUTH_URL=http://localhost:3000`.

`.env.local` variables (see `.env.example` for comments):

| Variable | Example |
| --- | --- |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/studiospace` |
| `BETTER_AUTH_SECRET` | `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `http://localhost:3000` |
| `API_URL` | `http://localhost:5000` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional — empty ⇒ Google button shows a "not configured" toast |

Checks (there is no test runner):

```bash
npm run lint
npm run build        # does not need the DB running (lazy connect)
npm run db:stop      # stop the local MongoDB
```

## Test account (examiner)

```
Email:    examiner@studiospace.dev
Password: Studio123
```

## Project structure

```
src/
  app/
    page.js                 # Home (hero slider, featured, categories, …)
    studios/                # list, [id] details + booking, edit/[id], loading.js
    add-studio/  my-listings/  my-bookings/  dashboard/
    login/  register/       # auth forms + metadata layouts
    about/  how-it-works/  terms/  privacy/
    not-found.js            # custom 404
  components/
    studios/                # StudioForm, StudioDetails, BookingModal, …
    auth/                   # RequireAuth, auth forms
    shared/                 # Header (with ThemeToggle), Footer, Logo, ConfirmModal, StatusBadge, EmptyState
  context/AuthContext.jsx   # useSession wrapper (user, isPending, logout)
  context/ThemeContext.jsx  # useSyncExternalStore theme store (localStorage)
  data/studios.js           # API data layer + 15 sample studios for fallback
  data/amenities.js         # AMENITY_OPTIONS (client-safe, no mongodb import)
  lib/auth-client.js  db.js  utils.js
  proxy.js                  # private-route edge guard (cookie presence check)
public/images/              # hero / studios / categories (Wikimedia Commons)
```

## Authentication notes

Implemented now: register/login forms exactly per the brief, password rules (uppercase + lowercase + ≥6 chars), redirect support (`?redirect=`), session-aware header, sign-out. Google OAuth, private-route protection (`src/proxy.js`), and deployment env are documented step-by-step in **[`authentication.md`](./authentication.md)** — including the deliberate omission of forgot-password/email-verification (rubric forbids them during the assignment).

## Notable implementation details

- **No login bounce on reload** — `RequireAuth` renders nothing (or its skeleton) while `isPending`, so a valid session cookie is honored before any `router.replace("/login?redirect=…")`.
- **No `alert()`** — mutations surface success/error through Sonner toasts; destructive actions (delete listing, cancel booking) use a shared `ConfirmModal`.
- **Client-bundle hygiene** — client components never import `mongodb` (amenities live in a separate module); user-supplied images use `unoptimized` + a permissive `remotePatterns` host.
- **Cache Components** — dynamic pages (`/studios/[id]`, `/studios/edit/[id]`) export `instant = false` and fetch via `connection()`; data reads are wrapped in `<Suspense>` so the static shell streams.
