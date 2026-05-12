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
- Double-layer text effect: coral (`--color-coral`) text + sage (`--color-sage`) `::before` offset. `position: relative` on `.name`, `z-index: -1` on `::before`
- **Starburst** (mobile): 16-point star SVG (`.hero-starburst`) centered behind the name via `.hero-name-wrap` wrapper
  - Wrapper: `position: relative; isolation: isolate` — starburst at `top: 50%; left: 50%; margin: -150px` (half of 300px), `z-index: -1`
  - Size: 300×300px, `color: var(--color-yellow)`, `stroke: #000; stroke-width: 4` on the `path`
  - `aria-hidden="true"` (decorative)
  - GSAP selector: `.hero-name-wrap .hero-starburst` (targets only the mobile one) — `rotation: 360, duration: 40, repeat: -1, ease: "none"`
- Tagline: "Cerco la precisione in ogni riga. Non sempre ci riesco, ma ci metto tutto me stesso!" — wrapped in `#hero-tagline` flex div, centered; color uses `--color-tagline` (`#000` light / `#ffffff` dark)
- Background: `--color-sections` (`#dcebfe` light / `#20294b` dark), `border-bottom: var(--border)`
- Figma source: `https://www.figma.com/design/hQFWN7ULDcFzq02b3YfqFZ/Untitled?node-id=44-3`
- Local reference: `assets/design/figma/Mockup_Mobile.png`

#### Hero Desktop Layout (`@media (min-width: 1024px)`)

- `.hero-inner` switches to `display: grid; grid-template-columns: 1fr 1fr`
- **Left column** (`.hero-left`): `display: none` on mobile, `display: flex` on desktop
  - `.hero-photo-wrap`: `position: relative; width: 100%; max-width: 340px` — sizing context for photo + sparkle
  - `.hero-photo`: `aspect-ratio: 3/4`, `--color-steel` bg placeholder, `border`, `--shadow-lg`, `overflow: hidden` (clips future photo)
  - `.hero-sparkle`: 4-pointed sparkle SVG (`--color-lime`, black stroke), `position: absolute; top: 0; left: 0; transform: translate(-50%, -50%) rotate(20deg)` — centers the sparkle exactly on the frame's upper-left corner. Does NOT rotate (GSAP targets only `.hero-name-wrap .hero-starburst`)
- **Right column** (`.hero-right`): `display: flex; flex-direction: column; gap: var(--space-8)` — contains `.hero-name-wrap` + `#hero-tagline`

### About Section

- Placed between Hero and Projects in page order
- **No timeline** — career change context (driver/warehouse → dev) makes a timeline look sparse; two cards is cleaner
- **Background**: `--color-bg` (differentiates from `--color-sections` used by hero/skills/footer)
- **Title**: "Chi sono" with double-layer 3D text effect — coral front + teal `::before` offset. `data-text="Chi sono"` (capital C)
- **Layout**: `.about-inner` (`max-width: 1280px; margin-inline: auto`) → `.about-grid` (flex column mobile, flex row desktop)
- **Bio card** (`.about-bio`): `--color-yellow` bg, border, `--shadow-md`, `flex: 2` on desktop. Body text in `--font-body`, `line-height: 1.7`
- **Education card** (`.about-edu`): `--color-teal` bg, border, `--shadow-md`, `flex: 1` on desktop. Contains heading "Formazione", divider, ITS program name + "in corso" date
- **Desktop**: `flex-direction: row; align-items: flex-start` on `.about-grid` — `flex-start` prevents edu card from stretching to bio card height
- **Nav link**: "Chi sono" added as 2nd nav item (`href="#about"`). Nav `nth-child` colors updated to 5 items: Home=yellow, Chi sono=coral, Progetti=steel, Skills=emerald, Contatti=blue

### Projects Section

- Section title ("I miei progetti") uses same double-layer 3D text effect as hero name: lavender text + red `::before` offset, via `data-text` attribute
- **Carousel structure**: `.projects-carousel` (horizontal snap scroll container) → `.project-slide` (one per project) → `.project-stack` cards inside each slide
  - `.projects-carousel`: `display: flex`, `overflow-x: auto`, `scroll-snap-type: x mandatory`, `gap`, `scrollbar-width: none` (scrollbar hidden)
  - `.project-slide`: `flex: 0 0 100%`, `min-width: 0` (prevents text from expanding slide), `scroll-snap-align: start`
  - `padding-bottom` and `padding-right` on carousel to prevent `overflow: auto` from clipping card shadows
- **Desktop layout** (`@media (min-width: 1024px)`): carousel overrides to `display: grid; grid-template-columns: repeat(3, 1fr); overflow-x: visible; scroll-snap-type: none` — all 3 slides visible side by side. `max-width: 1280px; margin-inline: auto` on both carousel and section title
  - **Important**: these desktop overrides must live in a `@media` block placed **after** all base section styles in `components.css` — earlier media query rules lose to later base rules of equal specificity
- **Card structure**: `.project-stack` (outer border + shadow + radius + overflow) → `.project-card` (background + padding) inside
- Project card contains: `.project-card-header` (name + GitHub SVG link), `<hr class="project-divider">`, `.project-desc`
- **`.project-desc`**: `max-height: 100px`, `overflow-y: auto`, custom black scrollbar via `::-webkit-scrollbar` + `scrollbar-color` (Firefox)
- **Languages card**: a separate `.project-stack` inside the same `.project-slide`, with its own border/shadow. Contains an `<h4>` title "Languages", a divider, and a `.project-langs` container populated by JS
- **GitHub Languages API**: JS fetches `https://api.github.com/repos/{owner}/{repo}/languages` for each `.project-stack[data-repo]`, calculates byte percentages, renders a stacked color bar (`.lang-bar` with `.lang-bar-segment` per language) + dot legend (`.lang-legend`). Language colors match GitHub's official palette via `LANG_COLORS` map in `main.js`
- GitHub username: **MatteoBraida-ITS**
- Current real project: `mini-jsonplaceholde-full-stack`
- **2 "Coming soon" cards**: same `.project-stack` + `.project-card` structure, no GitHub link, no languages bar, text "Coming soon..." in both name and description
- Background color: `--color-steel` (#90a9b7)

### Skills Section

- Background: `--color-sections` (same as hero, visual continuity; theme-aware)
- **Card**: `.skills-card` with `--color-emerald` background, 3px black border, `--shadow-md`, **no border-radius** (sharp corners per Figma)
- **Title**: "SKILLS" with same double-layer 3D text effect via `data-text` attribute — violet front + yellow `::before` offset. Uses `isolation: isolate` on the title to prevent `z-index: -1` from pushing the pseudo-element behind the card background
- **Grid**: `.skills-grid` — `grid-template-columns: repeat(3, 1fr)`, `gap: var(--space-3)`. Desktop: `repeat(4, 1fr)` — 2 rows of 4. `.skills-card` gets `max-width: 1280px; margin-inline: auto` on desktop
- **Skill items**: square cards (`aspect-ratio: 1`) with cream bg, border, shadow, hover lift effect
- **Icons**: 6 via Devicon CDN (`<i>` tags), 2 via inline SVG (SQL = database cylinder, REST API = double-arrow) since Devicon doesn't have those
- **Skills list**: HTML, CSS, JS, Node.js, React, Docker, SQL, REST API
- Figma source: `https://www.figma.com/design/hQFWN7ULDcFzq02b3YfqFZ/Untitled?node-id=68-2`

### Contact Section

- **Card wrapper**: `.contact-card` with blue background (`#0267c1`), 5px black border, `4px 8px 0` hard shadow, no border-radius (sharp corners)
- **Title**: "Contattami!" with double-layer 3D text effect via `data-text` attribute — mint `#99e1d9` front (with 1px black stroke) + black `::before` offset 3px right. Font: display, weight 400. Uses `isolation: isolate` to keep pseudo behind text but above card background
- **Layout**: `.contact-links` — mobile: `flex-direction: column`. Desktop: `flex-direction: row; justify-content: space-between`, all buttons at same level (no staircase). `.contact-card` gets `max-width: 1280px; margin-inline: auto` on desktop
- **Button styling**: `.contact-btn` — display font (Plus Jakarta Sans), weight 400, 0.9375rem (15px), 1px black border, `border-radius: 10px`, `2px 4px 0` hard shadow, hover/active lift effect
- **Button colors by nth-child**: Gmail = `#c3f73a` (lime), GitHub = `#93032e` (maroon), LinkedIn = `#f4743b` (orange)
- **Button icons**: inline SVGs (`.contact-icon`, 1em sized, `fill="currentColor"`) from Simple Icons — Gmail envelope, GitHub octocat, LinkedIn logo. `gap: var(--space-2)` between icon and text
- **Links**: `mailto:braida97@gmail.com`, GitHub profile URL set, LinkedIn href empty (TBD)
- **GSAP animation**: ScrollTrigger-based pop effect. `gsap.fromTo()` with `scale: 0, opacity: 0` → `scale: 1, opacity: 1`, `ease: "back.out(2)"` for bounce overshoot, `stagger: 0.15`, trigger at `top 80%`
- `overflow-x: hidden` on `#contact` (in `components.css`) to prevent scrollbars during animation — moved from `body` to avoid clipping absolutely-positioned decorative elements in other sections
- Penpot source: "Component 6" board in Page 1

### Graph Paper Grid

- **Class**: `.has-grid` — applied to all sections (`#hero`, `#projects`, `#skills`, `#contact`) and `footer`
- **CSS**: `::before` pseudo-element with `position: absolute; inset: 0; z-index: -1; pointer-events: none`
  - Grid via two `linear-gradient` layers: horizontal + vertical lines, `black` color, 1px wide, `background-size: 30px 30px`
  - Position driven by CSS custom property `--grid-pos` (default `0 0`)
  - `isolation: isolate` on `.has-grid` scopes the `z-index: -1` to the section's stacking context
- **JS** (`main.js`): `gsap.ticker.add` fires every frame
  - Accumulates `gridY` at `+= 0.1` px/frame (diagonal: X = Y)
  - Per-section offset formula: `bgY = ((gridY - section.offsetTop) % 30 + 30) % 30` — ensures lines align seamlessly across section boundaries regardless of section height
  - `sectionTops` array rebuilt on `resize`
  - Entire block guarded by `prefers-reduced-motion` check
- **Speed**: change `gridY += 0.1` — this is px/frame at ~60fps (0.1 = 6px/sec)
- **Cell size**: `GRID_SIZE = 30` in JS must match `background-size` in CSS — keep them in sync

### Dark Mode

- **Mechanism**: `[data-theme="dark"]` attribute toggled on `<html>` by JS. CSS overrides tokens that need to change:
  ```css
  [data-theme="dark"] {
    --color-bg: oklch(23.93% 0 0);
    --color-sections: #20294b;
    --color-tagline: #ffffff;
    --color-ink: #f0ece0;
  }
  ```
- **Token separation**: `--color-border: #000` is a dedicated token (never changes between themes). `--border` and all `--shadow-*` tokens use `--color-border`, not `--color-ink` — this keeps borders and shadows black in both themes while text color flips
- **JS logic** (`main.js`): `applyTheme(theme)` sets `data-theme` on `document.documentElement` and saves to `localStorage`. On page load: reads `localStorage` first, falls back to `window.matchMedia("(prefers-color-scheme: dark)")`, defaults to light
- **Fixed-background elements**: any element with a non-theme background (e.g. `.project-card` with `--color-steel`) must have `color: #000` pinned explicitly, otherwise `--color-ink` bleeds in and text turns light
- **Dark mode button** (`#darkMode-Btn`): see Header section below

### Header / Dark Mode Button

- **HTML structure**: `.header-brand` > `.header-logo` (logo only) + `.header-links` (nav + buttons container)
- **Mobile**: nav hidden (`display: none`), hamburger + dark mode buttons visible
- **Desktop** (`@media (min-width: 1024px)`):
  - Nav shown inline (`display: flex; position: static`) — resets all drawer styles
  - Nav `ul` switches to `flex-direction: row`
  - Nav links styled as neo-brutalist buttons: `border`, `--shadow-sm`, `border-radius: var(--radius-sm)`, `transition`
  - Colors by `nth-child`: Home=`--color-yellow`, Progetti=`--color-steel`, Skills=`--color-emerald`, Contatti=`--color-blue`
  - Hover press animation via `@media (hover: hover)` nested inside desktop breakpoint: `translate(3px, 3px) + box-shadow: none`
  - `.header-brand`: `display: flex; flex: 1; justify-content: center; gap: var(--space-8)` — centers logo+nav in available space, `--space-8` keeps elements grouped without excess spread
  - `#menu-button`: `display: none`
- **`header button` base**: 40×40px, yellow bg, `var(--border)`, `var(--shadow-sm)`, `transition: transform, box-shadow` (CSS handles all animations — no GSAP)
- **`#darkMode-Btn`**: `color: #000` pinned; `:active` for mobile tap; `:hover` inside `@media (hover: hover)` for desktop
- **Sun icon** (`id="sun"`, `viewBox="0 0 512 512"`) — shown in light mode
- **Moon icon** (`id="moon"`, `viewBox="0 0 20 20"`) — shown in dark mode. Two nested `<g transform>` to offset path coordinates. `fill-rule="evenodd"` for crescent shape
- **CSS show/hide**:
  ```css
  #darkMode-Btn #moon { display: none; }
  [data-theme="dark"] #darkMode-Btn #sun { display: none; }
  [data-theme="dark"] #darkMode-Btn #moon { display: block; }
  ```
- `aria-label="Toggle dark mode"` on the button

### Footer

- Background: `--color-sections` (matches hero — visual bookend, theme-aware), `border-top: var(--border)`
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
| Contact | Direct mailto, GitHub, LinkedIn — buttons with inline SVG icons, flat row layout, GSAP pop-in animation |
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
| 0 | Dark mode (toggle button, CSS token swap, localStorage + OS preference) | Done |
| 1 | Update tokens.css with neo-brutalist design tokens | Done |
| 2 | Revise base typography and global styles | Done |
| 3 | Restyle header + nav + drawer (neo-brutalist) | Done |
| 4 | Hero section with rotating starburst SVG (GSAP) | Done (starburst on mobile, desktop 2-col layout with photo frame + sparkle, CTA buttons removed — nav links replace them) |
| 5 | Projects section with cards | Done (carousel snap scroll, scrollable desc, 2 coming soon cards) |
| 6 | Skills section | Done |
| 7 | About section with timeline | Done (no timeline — bio card + education card, 2/3+1/3 desktop split) |
| 8 | Contact section | Done (card layout, 3D title, button icons, pop animation — styled per Penpot) |
| 9 | Footer | Done |
| 10 | Responsive desktop adaptation | Done (container max-width 1280px, header gap `--space-8`, projects 3-col grid, skills 4-col grid, contact buttons row) |
| 11 | GSAP animations (scroll-triggered, micro-interactions) | ⏳ In progress (contact pop-in done, hero starburst done, graph paper grid done — remaining sections pending) |
| 12 | Accessibility pass | Pending |
| 13 | SEO and meta tags | Pending |
| 14 | Final polish | Pending |

## Open Questions

- **Title**: "Fullstack Web Developer" — verify if accurate or should be just "Web Developer" (credibility matters in interviews)
- **`defer` vs `async`** on script tag — introduce when relevant
- **Drawer a11y**: focus trap, ESC-to-close, focus return, `role="dialog"` — address at accessibility pass
- **Hamburger icon**: currently CSS-styled `<span>` bars — consider replacing with SVG for animated open/close transition
- **Design tool migration**: now using Penpot MCP server for new designs (contact section onwards). Figma references remain for older sections (hero, projects, skills)
- **Grid line color**: currently `black` (high contrast, neo-brutalist). Could tone down to `rgba(0,0,0,0.06)` for subtlety — developer's call
- **Button hover press animation**: `.btn` and `.contact-btn` still need `@media (hover: hover)` wrapping to avoid stuck hover state on touch devices — deferred to accessibility pass.
- **New tokens added**: `--color-chartreuse: #7acc00` (sparkle fill), `--color-lime: #00ff19` (currently used for sparkle — may consolidate with chartreuse), `--color-sections` (theme-aware bg for hero/skills/footer: `#dcebfe` light / `#20294b` dark), `--color-tagline` (hero tagline text: `#000` light / `#ffffff` dark)

## Learning Priority

The developer has **limited experience with CSS animations and GSAP**. When there's a trade-off between "fast" and "educational", choose educational. Always explain the *why* behind technical choices.
