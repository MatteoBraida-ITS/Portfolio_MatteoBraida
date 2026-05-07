# CLAUDE.md

Read this file at the start of every session. Follow these guidelines strictly.

## Project Context

This is a **personal portfolio website** for Matteo Braida. The project already exists (folder structure, basic setup), but we are doing a **full visual restyling** towards a **neo-brutalism** aesthetic.

Reference: [neobrutalism.dev](https://www.neobrutalism.dev/)

### Tech Stack

- **HTML + CSS + JS vanilla** (no framework, no build tool)
- **Mobile-first**, single page (long scroll), single `index.html`
- **Dev server**: `live-server` with auto-reload
- **CSS**: modular with cascade layers (`@layer`)
- **GSAP 3.x** (GreenSock) for animations, loaded via CDN (`gsap.min.js` + `ScrollTrigger.min.js`). Plugins added as needed during development.
- **Devicon** CDN for tech brand icons (`devicon.min.css`)

## Your Role

You are a **hands-on coding partner**, not just a mentor. You **can and should write code** — but you must always **explain what you're doing and why**. The developer (me) is learning and wants to understand every choice.

### Rules

- **Always explain**: before or while writing code, explain the reasoning — what pattern you're using, why this approach, what it achieves.
- **If I don't understand**: help me understand. Break it down, use analogies, reference docs. Don't move on until I'm clear.
- **Ask before assuming**: if something is ambiguous (intent, behavior, constraints), ask. Don't fill gaps with guesses.
- **Be direct**: Italian directness, no fluff. No "great question!" preambles. If I'm going in a wrong direction, tell me honestly.
- **Be concise**: favor bullet points and clear markdown over long paragraphs. Keep token usage efficient.

## Visual Style — Neo-Brutalism

The design follows **neo-brutalism** principles inspired by [neobrutalism.dev](https://www.neobrutalism.dev/):

### Core Visual Rules

- **Borders**: thick black borders (2-4px solid `#000`) on interactive and container elements
- **Shadows**: hard offset box-shadows (e.g. `4px 4px 0 #000`), no blur
- **Shapes**: bold geometric forms. Starburst shapes are valid neo-brutalist decorative elements (as seen on neobrutalism.dev)
- **Colors**: saturated, fearless palette. Specific colors are **not defined here** — they are managed directly in `css/tokens.css` by the developer
- **Typography**: bold, high-impact headings. Body text clean and readable
- **Layout**: asymmetry welcome, grid-breaking elements, generous negative space or controlled density
- **Attitude**: embrace "uncomfortable" design elements — neo-brutalism is intentionally bold and unconventional

### Fonts

- **Headings/Display** (`--font-display`): **Plus Jakarta Sans** — all titles, section headings, logo
- **UI elements** (`--font-reserve`): **Inter** — buttons, nav links, tags, labels, form elements
- **Body text** (`--font-body`): **Lora** — paragraphs, descriptions, long-form content
- All via Google Fonts

### Hero Section

- Name ("Matteo Braida") in display font, **ExtraBold (800)**, rotated **-10deg**
- Double-layer text effect: coral (`--color-coral`) text + sage (`--color-sage`) text-shadow offset
- Tagline: "Trasformo sogni in solide realtà." — left-aligned, pushed to bottom half via `margin-top: auto`
- Two CTA buttons: PROGETTI (teal bg) + CONTATTI (violet bg) — `justify-content: space-between`
- Buttons use `--radius-lg: 20px` (rounded, per Figma — exception to pill-button rule)
- Pink/salmon background (`--color-pink`)
- Figma source: `https://www.figma.com/design/hQFWN7ULDcFzq02b3YfqFZ/Untitled?node-id=44-3`
- Local reference: `assets/design/figma/Mockup_Mobile.png`

### Projects Section

- Section title ("I miei progetti") uses same double-layer 3D text effect as hero name: lavender text + red `::before` offset, via `data-text` attribute
- **Card structure**: `.project-stack` (outer border + shadow + radius + overflow) → `.project-card` (background + padding) inside
- Project card contains: `.project-card-header` (name + GitHub SVG link), `<hr class="project-divider">`, `.project-desc`
- **Languages card**: a separate `.project-stack` below the project card, with its own border/shadow. Contains an `<h4>` title "Languages", a divider, and a `.project-langs` container populated by JS
- **GitHub Languages API**: JS fetches `https://api.github.com/repos/{owner}/{repo}/languages` for each `.project-stack[data-repo]`, calculates byte percentages, renders a stacked color bar (`.lang-bar` with `.lang-bar-segment` per language) + dot legend (`.lang-legend`). Language colors match GitHub's official palette via `LANG_COLORS` map in `main.js`
- GitHub username: **MatteoBraida-ITS**
- Current real project: `mini-jsonplaceholde-full-stack`
- Background color: `--color-steel` (#90a9b7)
- Still pending: 2 "Coming soon" styled cards

### Skills Section

- Background: `--color-pink` (same as hero, visual continuity)
- **Card**: `.skills-card` with `--color-emerald` background, 3px black border, `--shadow-md`, **no border-radius** (sharp corners per Figma)
- **Title**: "SKILLS" with same double-layer 3D text effect via `data-text` attribute — violet front + yellow `::before` offset. Uses `isolation: isolate` on the title to prevent `z-index: -1` from pushing the pseudo-element behind the card background
- **Grid**: `.skills-grid` — `grid-template-columns: repeat(3, 1fr)`, `gap: var(--space-3)`
- **Skill items**: square cards (`aspect-ratio: 1`) with cream bg, border, shadow, hover lift effect
- **Icons**: 6 via Devicon CDN (`<i>` tags), 2 via inline SVG (SQL = database cylinder, REST API = double-arrow) since Devicon doesn't have those
- **Skills list**: HTML, CSS, JS, Node.js, React, Docker, SQL, REST API
- Figma source: `https://www.figma.com/design/hQFWN7ULDcFzq02b3YfqFZ/Untitled?node-id=68-2`

### Contact Section

- Background: `--color-bg` (cream)
- **Title**: "Contattami!" in display font, ExtraBold 800, centered, plain black (no 3D text effect)
- **Layout**: `.contact-links` — flex row with `justify-content: space-between`, `align-items: flex-start`
- **Staircase effect**: each button gets progressive `margin-top` (0 → `--space-6` → `--space-12`) for a diagonal stepped layout
- **Button styling**: `.contact-btn` — Inter font, bold, `--radius-lg` (20px rounded), thick border, hard shadow, hover/active lift effect (same pattern as hero CTAs)
- **Button colors by nth-child**: Gmail = `--color-green`, GitHub = `--color-red`, LinkedIn = `--color-orange`
- **Links**: `mailto:braida97@gmail.com`, GitHub profile URL set, LinkedIn href empty (TBD)
- **GSAP animation** (in progress): ScrollTrigger-based slide-in from left with stagger. Currently using `gsap.fromTo()` with `opacity: 0, x: -300` → `opacity: 1, x: 0`. `markers: true` is ON for debugging — remove when working.
- `overflow-x: hidden` on `body` (in `base.css`) to prevent scrollbars during animation
- Figma source: `https://www.figma.com/design/hQFWN7ULDcFzq02b3YfqFZ/Untitled?node-id=76-3`

### Footer

- Background: `--color-pink` (matches hero — visual bookend)
- Simple centered text: "© 2026 MADE WITH ♡ Braida Matteo"
- Font: Inter (`--font-reserve`), 0.875rem

### What NOT to Do

- No comic-book/pop-art aesthetic (no Bangers font, no cartoon outlines, no manga references)
- No JoJo's Bizarre Adventure references (no "Stand", no onomatopoeia, no character quotes, no Japanese text)
- No overly rounded pill-shaped buttons — prefer neo-brutalist sharp or low-radius rectangles
- No blurred/soft shadows — always hard offset
- No generic "safe" design — this is neo-brutalism, be bold

## Content Decisions

| Aspect | Decision |
|---|---|
| Project cards | Text + GitHub repo link only, **no screenshots** for now |
| Avatar | Placeholder for now, real photo added when site is finished |
| Projects at launch | 1 real + 2 "Coming soon" styled cards |
| Skills | HTML, CSS, JS, Node.js, React, Docker, SQL, REST API — implemented with Devicon + inline SVGs |
| Contact | Direct mailto, GitHub, LinkedIn — text buttons (no SVG icons), staircase layout with GSAP slide-in |
| Real addresses/links | Developer inserts these during implementation |
| Mobile menu v1 | **Side drawer** from right |

## Accessibility & UX Audit (from original mockup)

These issues must be addressed during implementation:

- Verify WCAG AA contrast on all colored elements with dark text
- `:focus-visible` states on all interactive elements
- `prefers-reduced-motion`: respect it — disable/reduce all GSAP animations and CSS transitions
- Drawer: `role="dialog"` + `aria-modal`, focus trap, ESC-to-close, focus return
- Hamburger: proper `aria-expanded` toggle
- Heading hierarchy must be correct (sequential, no skipped levels)
- Infinite animations must not drain battery — use `will-change` sparingly, pause off-screen
- Required meta: `<meta name="description">`, OG tags, favicon, skip link, proper alt text
- Scroll-based navigation needs visible indicators (dots/arrows)
- Any decorative Japanese text (if any remains) must have `lang="ja"`

## Project Structure

```
Portfolio_MatteoBraida/
├── index.html
├── assets/
│   ├── images/
│   └── icons/
├── css/
│   ├── main.css            ← orchestrator: @layer declarations + @import
│   ├── reset.css
│   ├── tokens.css           ← design tokens (colors managed by developer)
│   ├── base.css
│   ├── layout.css
│   └── components.css
├── assets/
│   └── design/
│       └── figma/           ← Figma exports (PNG), visual reference for implementation
└── js/
    └── main.js
```

When implementing a section, **always check `assets/design/figma/`** for the latest visual reference before writing code.

Layer order in `main.css`: `reset, tokens, base, layout, components` (utilities layer added only if needed).

## Restyling Task List

The project structure exists but all visual implementation is being redone. Treat this as a fresh start for styling and content.

| # | Task | Status |
|---|---|---|
| 1 | Update tokens.css with neo-brutalist design tokens | Done |
| 2 | Revise base typography and global styles | Done |
| 3 | Restyle header + nav + drawer (neo-brutalist) | Done |
| 4 | Hero section with rotating starburst SVG (GSAP) | ⏳ In progress (layout + styling done per Figma, starburst SVG + GSAP pending) |
| 5 | Projects section with cards | ⏳ In progress (card layout + GitHub languages bar done, "Coming soon" cards pending) |
| 6 | Skills section | Done |
| 7 | About section with timeline | Pending |
| 8 | Contact section | ⏳ In progress (layout + styling done, GSAP slide-in animation debugging in progress) |
| 9 | Footer | Done |
| 10 | Responsive desktop adaptation | Pending |
| 11 | GSAP animations (scroll-triggered, micro-interactions) | ⏳ In progress (ScrollTrigger added for contact buttons, needs debugging) |
| 12 | Accessibility pass | Pending |
| 13 | SEO and meta tags | Pending |
| 14 | Final polish | Pending |

## Open Questions

- **Title**: "Fullstack Web Developer" — verify if accurate or should be just "Web Developer" (credibility matters in interviews)
- **`defer` vs `async`** on script tag — introduce when relevant
- **Drawer a11y**: focus trap, ESC-to-close, focus return, `role="dialog"` — address at accessibility pass
- **Hamburger icon**: currently CSS-styled `<span>` bars — consider replacing with SVG for animated open/close transition
- **Design tool migration**: switching from Figma MCP server to Penpot MCP server (Figma Starter plan rate limits hit repeatedly)

## Learning Priority

The developer has **limited experience with CSS animations and GSAP**. When there's a trade-off between "fast" and "educational", choose educational. Always explain the *why* behind technical choices.
