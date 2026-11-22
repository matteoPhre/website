# Future Development Plan

> **Status: implemented in `Developer/website-next/` (Astro).** The original Angular 11 app in
> this folder is untouched and kept for reference. See `website-next/README.md` for the new
> project. Decisions applied: Astro, keep the `matteoPhre` pseudonym, CV-derived `/about`,
> GitHub-derived `/projects`, no blog/tags routes.

## Direction

**Clean-slate rebuild, no incremental bumps.** Scaffold a fresh project on the current stack
and port the design/content over, rather than upgrading Angular 11 → 22 through 11 `ng update`
hops (the existing code is mostly technical debt).

**Recommended stack: Astro** (static, content-first, ~0 KB framework JS, native Markdown/MDX
content collections for blog + tags, ideal for a portfolio/security blog deployed to Firebase).

**Alternative:** fresh Angular 22 standalone + signals — only if keeping the Angular ecosystem
is a priority (e.g. professional use).

## What stays / what goes

- **Keep (port):** terminal aesthetic, 3 themes (Zen White, Dark Knight, Hackr Bleed),
  blinking cursor, text-scramble effect, SVG icons, social links, blog/tags concept.
- **Drop:** NgModules, `ViewEncapsulation.None`, Bootstrap (v4/v5 mismatch), external theme
  JSON fetches, global `declare var` script, `innerHTML` injection, dead `GithubService` code.

## Phases

1. **Decisions** — framework (Astro recommended), branding (pseudonym vs real name), routes
   (keep blog/tags/crondaily or trim), target Node/versions.
2. **Scaffold + content model** — `npm create astro@latest`, strict TS, typed profile data
   (`src/data/profile.ts`), blog content collection with frontmatter (title, date, tags, draft).
3. **Design system** — port theme tokens to `themes.css`; small theme island persisting to
   `localStorage` and respecting `prefers-color-scheme`; one global stylesheet, no Bootstrap,
   update footer year to 2026.
4. **SVG + animation** — single `Icon` component backed by an SVG symbol sprite with
   `fill="currentColor"`; replace all repeated inline paths. Rewrite scrambler as typed TS with
   proper `cancelAnimationFrame`/`AbortController` teardown, theme-driven accent, no `innerHTML`;
   keep autoplay + replay-on-hover.
5. **Pages** — `index.astro` (landing), `about.astro` (real CV/LinkedIn content, replaces
   `whoami` "In Progress!"), blog post + tag pages from the content collection, `404.astro`
   ("LOST?").
6. **Ship** — build, a11y/Lighthouse check, verify 3 themes + mobile breakpoints, point Firebase
   hosting at the new output, update README.

## Open inputs needed

- CV file / LinkedIn data export / pasted experience + skills (LinkedIn pages block scraping,
  so a bare profile URL is not enough) — needed to fill `about`.
- Decisions from Phase 1 above.

## Suggested workflow

Scaffold the new site in a separate folder (e.g. `website-next/`) so the current app stays
untouched until the rebuild is approved, then swap it in.
