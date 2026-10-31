# Authentication — status & remaining tasks

StudioSpace uses [Better Auth](https://www.better-auth.com/) 1.7.x with MongoDB.

## What is already implemented (verified end-to-end)

| Piece | File(s) | Status |
| --- | --- | --- |
| Server config (MongoDB adapter, `minPasswordLength: 6`, `autoSignIn: false`, conditional Google, `nextCookies`) | `src/lib/auth.js` | ✅ |
| Auth HTTP routes (`/api/auth/*`) | `src/app/api/auth/[...all]/route.js` | ✅ |
| React client (`useSession`, `signIn`, `signUp`, `signOut`) | `src/lib/auth-client.js` | ✅ |
| Session context (`user`, `isPending`, `logout`) | `src/context/AuthContext.jsx` | ✅ |
| Header: pending skeleton, avatar dropdown, async logout | `src/components/shared/Header.jsx` | ✅ |
| Login form (Email, Password, Forgot Password, Login, Register link, Google) | `src/app/login/page.js` | ✅ |
| Register form (Name, Email, Photo URL, Password + client rules, Google) | `src/app/register/page.js` | ✅ |
| Metadata for auth pages | `src/app/login/layout.js`, `src/app/register/layout.js` | ✅ |
| Env template | `.env.example` → copy to `.env.local` | ✅ |
| Local MongoDB | `npm run db:start` / `npm run db:stop` | ✅ |

Verified with `curl` against a running server:

- Sign-up valid → `200`, user + image persisted to `user`/`account` collections, `token: null` (autoSignIn off → user lands on Login, per rubric).
- Sign-up weak password → `400 PASSWORD_TOO_SHORT` (server) + blocked client-side.
- Sign-up duplicate email → `200` with a **synthetic** user, no duplicate row created. This is deliberate Better Auth anti-enumeration behavior when `autoSignIn: false` (see Gotchas). Registration "succeeds"; the truth is decided at login.
- Sign-in correct → `200`, `better-auth.session_token` cookie set with `HttpOnly` flag.
- Sign-in wrong password / unknown email → `401` with generic "Invalid email or password" (no user enumeration).
- `get-session` with cookie → returns session + user; after `sign-out` (+ `Origin` header) → `null`.
- Google sign-in without credentials → `404 PROVIDER_NOT_FOUND` handled by the UI with a friendly toast (app does not crash).

Seeded test account (also in README):

```
Email:    examiner@studiospace.dev
Password: Studio123
```

---

## Remaining tasks (ordered)

### 1. Google OAuth credentials (blocking real social login)

1. <https://console.cloud.google.com> → **APIs & Services → OAuth consent screen** → External → fill app name (`StudioSpace`), support email, save.
2. **Credentials → Create credentials → OAuth client ID → Web application**.
3. Authorized JavaScript origins: `http://localhost:3000` (and your production URL later).
4. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google` (and `https://<prod-url>/api/auth/callback/google` later).
5. Copy Client ID + Client Secret into `.env.local`:
   ```bash
   GOOGLE_CLIENT_ID=....apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-...
   ```
6. Restart the dev server. Test: **Login → Continue with Google** → Google consent → back on `/` with the avatar in the header. The "isn't configured yet" toast must disappear.

> The Google provider is only registered in `src/lib/auth.js` when both env vars are non-empty, so nothing breaks while they are missing.

### 2. Private-route protection (needed for the CRUD / dashboard section)

Two mechanisms, both required by the assignment rules:

**a. `src/proxy.js` (Next 16 renamed Middleware → Proxy — do not create `middleware.js`).**
Create `src/proxy.js` (no Suspense issues here — proxy runs on the edge of every request):

```js
import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/add-studio",
  "/my-listings",
  "/my-bookings",
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const hasSessionCookie = request.cookies.has("better-auth.session_token");
  // Optimistic check only — never call auth.api.getSession here (proxy cannot
  // reach the DB reliably and better-auth docs forbid it).
  if (!hasSessionCookie) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/add-studio/:path*", "/my-listings/:path*", "/my-bookings/:path*"],
};
```

**b. Server-side session check inside each protected page.**
Because `cacheComponents` is on, a raw `await auth.api.getSession(...)` in a page body **cannot be prerendered** — wrap it in `<Suspense>` (Key Rule 4), or run it only in a client component. Recommended server pattern per protected page:

```js
import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function SessionGate({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  return children;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading…</p>}>
      <SessionGate>{/* page content */}</SessionGate>
    </Suspense>
  );
}
```

**c. Client guard (for interactivity) — beware Key Rule 5.**
`authClient.useSession()` returns `isPending: true` on first paint. **Do not redirect while `isPending`** — logged-in users would be bounced to `/login` on every reload. Wait for the settled state:

```js
const { data: session, isPending } = authClient.useSession();

if (isPending) return <Skeleton />;        // never redirect here
if (!session) redirect("/login");          // only when definitely logged out
```

**Reload checklist (must pass):**

- [ ] Logged in → hard-reload `/dashboard` → stays on `/dashboard`.
- [ ] Logged out → visit `/dashboard` → redirected to `/login?redirect=/dashboard`.
- [ ] Logged in via `/login?redirect=/dashboard` → lands back on `/dashboard`.
- [ ] Open-redirect guard: `/login?redirect=https://evil.com` → must ignore the absolute URL (the login page already ignores anything not starting with `/`).

### 3. Protecting data mutations (Challenge 1)

- Cookies are already `HttpOnly` (verified via curl cookie jar) — JavaScript cannot read the token. That alone is the answer to "what is the biggest challenge keeping user credentials safe"; the second half is:
- Every server mutation (`app/api/**/route.js` or server action) must call `auth.api.getSession({ headers: await headers() })` and return `401` when null, e.g. adding/deleting studios or creating bookings.
- Better Auth's `nextCookies` plugin is last in the chain — keep it there; it enables setting session cookies from server actions.

### 4. Deliberately skipped per rubric — enable only after grading

The rubric forbids these during the assignment. When allowed later:

- **Forgot password**: add `emailAndPassword: { sendResetPasswordOnForgotPassword: true, forgotPassword: { sendOnForgotPassword: true } }` (see Better Auth docs for exact option names in your version), an SMTP provider (Resend/Nodemailer), and a `/forgot-password` + `/reset-password` page. Wire the existing "Forgot Password?" button (`handleForgotPassword` in `login/page.js` currently shows an info toast).
- **Email verification**: `emailVerification: { sendOnSignUp: true, sendVerificationEmail: ... }` + `/verify-email` page. Users now register with `emailVerified: false`.

### 5. Deployment env (Vercel)

1. MongoDB Atlas free cluster → connect string → `MONGODB_URI` (add your IP to the allow-list; standalone Atlas M0 supports the adapter's non-transactional mode used here).
2. `BETTER_AUTH_SECRET` — same value or new (`openssl rand -base64 32`).
3. `BETTER_AUTH_URL` — exact production origin, e.g. `https://studiospace.vercel.app` (used to build OAuth callback URLs).
4. Add the Google production origin + redirect URI from step 1.4.
5. Set all four vars in Vercel → Project → Settings → Environment Variables → redeploy.

### 6. Verification commands

```bash
npm run lint && npm run build     # both must pass (build does not need the DB — connect is lazy)
npm run db:start                  # local mongod (data in .mongodb-data/, gitignored)
# API smoke test:
curl -s -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"name":"T","email":"t@example.com","password":"Str0ngPass"}'
```

---

## Gotchas learned the hard way

1. **`autoSignIn: false` (we set this so Register → Login page) makes Better Auth return a generic success for duplicate emails** — it generates a synthetic user response instead of `USER_ALREADY_EXISTS` to prevent account enumeration. No duplicate is written to the DB. Do not "fix" this by removing `autoSignIn`; handle the truth at login time.
2. **`sign-out` requires an `Origin` header** (CSRF protection). Browsers send it automatically; raw `curl` needs `-H "Origin: http://localhost:3000"` and `-d '{}'`.
3. **Password rules**: `minPasswordLength: 6` in `src/lib/auth.js` matches the rubric (default is 8). Uppercase/lowercase rules are client-side only; server enforces length.
4. **Collection names are singular**: `user`, `account` (no `usePlural`). Inspect with `mongosh mongodb://127.0.0.1:27017/studiospace --eval 'db.user.countDocuments()'`.
5. **Standalone MongoDB**: pass only the db object to `mongodbAdapter(db)` (no client arg) so transactions are disabled — required for `mongod` without a replica set.
6. **`cacheComponents` (Next 16)**: any server-side `auth.api.getSession()` inside a page must sit behind `<Suspense>` or the prerender aborts with "Route ... used new Date()..." / dynamic-API errors. That is why the Header uses the *client* `useSession()` — no Suspense needed there.
7. **Next 16 renames `middleware` to Proxy** — `src/proxy.js`, `export function proxy(request)`, plus a `config.matcher`. The generated docs in `node_modules/next/dist/docs/` are the source of truth.
