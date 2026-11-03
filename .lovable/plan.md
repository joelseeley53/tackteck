# TackTech Landing Page Plan

## Overview

A single-page marketing site for TackTech ("Technology with Purpose") built on the project's existing stack: TanStack Start (React 19 + Vite + TypeScript), Tailwind CSS v4 with design tokens, shadcn/ui, Lucide icons, Framer Motion, react-hook-form + zod. The brief asks for a one-page site with smooth-scroll anchor navigation, which we build as one route (`/`) with anchored sections.

## Brand assets (from your uploads)

- `TackTech_Logo.jpeg` — full logo on white. Derive variants in `src/assets/brand/`:
  - `tacktech-logo.png` — background removed (transparent) for white backgrounds.
  - `tacktech-logo-reverse.png` — derived reverse: "Tack" recoloured to white, "Tech" gold kept, for navy backgrounds (navbar, footer, CTA, OG image).
  - `tacktech-icon.png` / `tacktech-icon-reverse.png` — the T-mark alone, cropped square.
  - `favicon-512.png` — from the icon; copied square into `public/` as `favicon.png` (plus apple-touch-icon). Default `public/favicon.ico` removed.
- Portfolio screenshots → `src/assets/portfolio/` via CDN asset pointers: `radiance.png`, `mit-system.png`, `nawiri.png` (used exactly as uploaded; `object-cover object-top` inside a fixed 9:18 phone frame).
- Open Graph image: 1200×630 navy canvas with the reverse logo centred, produced with image tooling, served through a CDN asset pointer; the route builds its absolute URL from the request origin.

## Design system (strict, in `src/styles.css`)

- Tokens: Midnight Navy `#101F3D` (dominant), Premium Gold `#C49A45` (accents only), Pure White `#FFFFFF`, Slate Grey `#667085` — mapped to Tailwind theme tokens; no hardcoded colours in components.
- Fonts loaded via `<link>` in the root head: Montserrat (headings/subheadings), Inter (body, buttons, labels).
- No gradients, glows or heavy shadows. Check gold-on-navy text contrast and adjust usage if any pairing fails AA.

## Page structure (route `/`, one component per section under `src/components`)

1. **Navbar** — sticky navy; full-reverse logo (icon-reverse on mobile), links to each section, gold CTA "Start a Conversation"; mobile menu in a shadcn Sheet.
2. **Hero** — navy; headline with "Purpose" in gold; supporting line; primary + secondary CTAs. No logo in the hero.
3. **Problem** — white; the five pain points; closing line.
4. **Services** — white; four cards with Lucide icons, descriptions and the exact bullet lists from the brief.
5. **How we work** — white; five-step timeline (01–05) plus closing line.
6. **Our Work** — white; three phone-frame cards (Radiance, MIT System, Nawiri) with tags, titles, descriptions and the exact features; swipe-snap carousel on mobile, hover lift + gold underline on desktop.
7. **Why TackTech** — white; six-item grid, exact one-liners.
8. **Who we serve** — white; eight-item grid plus closing line.
9. **Five Ts** — compact strip of five values.
10. **About** — white; vision + mission, "Established 2025 · Kenya".
11. **Closing CTA band** — navy with gold button.
12. **Contact** — form (name, organisation, email, organisation type dropdown of the eight markets, "What do you need?") with react-hook-form + zod validation and a success toast (sonner); client-side submission only. Phone +254 723 259 914, Kenya, `hello@tacktech.co.ke` with `// TODO: replace email`, WhatsApp button to `https://wa.me/254723259914`.
13. **Footer** — navy; full-reverse logo (no repeated tagline), quick links, social placeholders with TODOs, © 2025, Five-Ts strip line.

## Content & architecture

- All copy lives in `src/data/content.ts` exactly as written in the brief, so it's editable in one place. No invented statistics, testimonials or awards; banned words avoided.
- Reusable `Logo` component with `variant` prop: `full | full-reverse | icon | icon-reverse`. Alt text: "TackTech: Technology with Purpose." No recolour/distort/crop beyond the derived brand variants; clear space preserved.
- Framer Motion scroll reveals (subtle, `whileInView`), hover states, mobile-first responsive layout, visible focus states.
- SEO: `head()` on the index route with title "TackTech | Technology with Purpose.", description, og/twitter tags, og:image absolute URL; root head updated with fonts and favicon.
- Anchor navigation via smooth scroll; each section gets an `id` matching the navbar links.

## Dependencies

Add `framer-motion`; wire sonner's `<Toaster />` in the root; everything else (shadcn components, lucide, react-hook-form, zod) already exists.

## Verification

- Build passes and `/` renders with no console errors.
- Playwright check: desktop (navbar, hero, all sections, contact form submits with a toast) and mobile (Sheet menu, carousel snap).
- Gold-on-navy contrast checked; no placeholder pages left.
