<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Next.js 16.4.3 App Router scaffold (`src/app/`) for assignment 8: rebuild it as **StudioSpace**, a peer-to-peer creative workspace marketplace. The full brief is in `Requirments.md` (filename is intentionally misspelled). The app is still the default create-next-app output — most of `src/app/` will be replaced.

- JavaScript only (`jsconfig.json`); no TypeScript, no tests, no typecheck script.
- `next.config.mjs` enables `cacheComponents`, `partialPrefetching`, `reactCompiler` (babel-plugin-react-compiler), and Tailwind v4 via the `@tailwindcss/turbopack` loader rule. `cacheComponents` changes data-fetching defaults — check `node_modules/next/dist/docs/` before writing data access.
- Tailwind v4: `@import "tailwindcss"` + `@theme` in `src/app/globals.css`; there is no `tailwind.config.js`.
- Path alias: `@/*` → `./src/*`.

## Commands

```bash
npm run dev    # dev server (also regenerates the agent-rules block above)
npm run build
npm run lint   # eslint flat config (eslint.config.mjs); the only check available
```

No test runner exists — verify changes with `npm run build` and `npm run lint`.

## Git

The git repo root is `/home/semanto-bolbol/PH-B14` (a large course-material monorepo), not this app. The working tree contains many unrelated changes across other milestones. Always commit from this directory and stage explicit paths (`git add cat_harry/...` or paths relative to cwd) — never `git add -A` / `git add .` from the repo root.
