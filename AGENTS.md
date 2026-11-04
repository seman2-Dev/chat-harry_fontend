<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Next.js 16.4.3 App Router for assignment 8: rebuild it as **StudioSpace**, a peer-to-peer creative workspace marketplace. The full brief is in `Requirments.md` (filename is intentionally misspelled).

- JavaScript only (`jsconfig.json`); no TypeScript, no tests, no typecheck script.
- `next.config.mjs` enables `cacheComponents`, `partialPrefetching`, `reactCompiler` (babel-plugin-react-compiler), and `experimental.agentFeedback`; Tailwind v4 via the `@tailwindcss/turbopack` loader rule with `@import "tailwindcss"` + `@theme` in `src/app/globals.css`, and no `tailwind.config.js`. Path alias: `@/*` → `./src/*`.
- Client API calls use Next rewrites to the Express service (`API_URL`: `http://localhost:5000` in dev, hardcoded Vercel URL in production); home, explore, detail, and edit server components fetch studio data from that API through `src/data/studios.js` (15 local sample studios remain as a fallback).
- Auth: `/api/auth/*` is rewritten to Express, which owns Better Auth; there is no local Next auth route (the old `src/app/api/auth/[...all]/route.js` + `src/lib/auth.js` pair was removed — the rewrite shadows it anyway, and `MONGO_URI` crashed the build). `src/proxy.js` is Next 16's middleware (renamed from Middleware): optimistic `better-auth.session_token` cookie check only; real enforcement is `RequireAuth` + API 401s.

## Commands

```bash
npm install            # a populated gitignored .env is required; .env.example was deleted (b314ae8)
npm run db:start       # local mongod, data in .mongodb-data/ (used only if .env points at it)
npm run db:stop
npm run dev            # :3000
npm run lint           # eslint flat config (eslint.config.mjs); passes
npm run build          # passes — the dead /api/auth/[...all] route and src/lib/auth.js (MONGO_URI crash) were removed; Express owns /api/auth/* via the rewrite
```

No test runner exists — verify changes with `npm run lint && npm run build`.

## Auth / UX rules (grading traps)

- No `alert()`; Sonner toasts / custom modals only.
- Logged-in users must never be bounced to Login on reload of a private route: `RequireAuth` waits for `isPending`; the proxy (`src/proxy.js`) optimistic cookie check is backed by client-side enforcement and API 401s.
- Rubric: ≥15 client commits.

## Git

This folder is its own git repo root (`git rev-parse --show-toplevel` → this directory; remote `chat-harry_fontend`), not the PH-B14 course monorepo root — the assignment-8 parent has an empty `.git/` that silently resolves to the course repo. Always commit from here and stage explicit paths — never `git add -A` / `git add .`.

`.gitignore` now lists `AGENTS.md` (tooling appended it), but the file is tracked, so the rule is inert — commit `AGENTS.md` changes anyway to keep the `nextjs-agent-rules` block in sync.
