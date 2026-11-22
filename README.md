# matteoPhre — personal website

A clean-slate rebuild of the old Angular 11 portfolio in **Astro**. Static output, no framework
runtime in the browser. Three themes, SVG sprite icons and a text-scramble effect replace the
old global JavaScript and duplicated inline SVGs.

## Content

| Route | Source |
| --- | --- |
| `/` | Landing page (`src/pages/index.astro`) |
| `/about` | CV data in `src/data/profile.ts` (from `Profile.pdf`) |
| `/projects` | Curated public repos in `src/data/projects.ts` (GitHub API) |
| 404 | `src/pages/404.astro` |

Pseudonym `matteoPhre` is kept as the site brand; the real name (Matteo Selleri) appears on
`/about`.

## Text animation

`src/scramble.ts` powers the scramble/hero text. Edit the `data-scramble-phrases` JSON attribute
on each `[data-scramble]` element in `src/pages/index.astro` (and `404.astro`) to change the
rotating phrases. Hovering advances to the next phrase immediately; reduced-motion users see a
static phrase.

## Theming

CSS custom properties in `src/styles/tokens.css` define the three themes ported from the old app:
`zen-white`, `dark-knight`, `hackr-bleed`. The selected theme is stored in `localStorage` under
`@theme` and applied before first paint by an inline script in `BaseLayout.astro`.

## Commands

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # preview the build
```

## Deploy

Live at **https://matteoselleri.web.app** (free Firebase Hosting subdomain; the original
`personal-website-5f1d6.web.app` URL also still works).

Firebase Hosting config is included, pointing at `dist/` for both sites:

```sh
npm run build
firebase deploy --only hosting
```
