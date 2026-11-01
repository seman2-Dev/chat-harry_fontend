<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Next.js 16.4.3 App Router for assignment 8: rebuild it as **StudioSpace**, a peer-to-peer creative workspace marketplace. The full brief is in `Requirments.md` (filename is intentionally misspelled).

- JavaScript only (`jsconfig.json`); no TypeScript, no tests, no typecheck script.
- `next.config.mjs` enables `cacheComponents`, `partialPrefetching`, `reactCompiler` (babel-plugin-react-compiler), and `experimental.agentFeedback`; Tailwind v4 via the `@tailwindcss/turbopack` loader rule with `@import "tailwindcss"` + `@theme` in `src/app/globals.css`, and no `tailwind.config.js`. Path alias: `@/*` → `./src/*`.
- Client calls its own Next route handlers in `src/app/api/**`; home/explore server components read Mongo via `src/data/studios.js` (mock fallback when the collection is empty).

## Commands

```bash
cp .env.example .env.local && npm install
npm run db:start   # local mongod, data in .mongodb-data/
npm run db:stop
npm run dev         # :3000
npm run lint        # eslint flat config (eslint.config.mjs); the only check available
npm run build       # no DB needed
```

No test runner exists — verify changes with `npm run lint && npm run build`.

## Auth / UX rules (grading traps)

- No `alert()`; Sonner toasts / custom modals only.
- Logged-in users must never be bounced to Login on reload of a private route: `RequireAuth` waits for `isPending`; the proxy (`src/proxy.js`) optimistic cookie check is backed by client-side enforcement and API 401s.
- Rubric: ≥15 client commits.

## Git

This folder is its own git repo root (verified via `git rev-parse --show-toplevel`), not the PH-B14 course monorepo root. The working tree contains unrelated changes across other milestones. Always commit from here and stage explicit paths — never `git add -A` / `git add .`.
