# ARTEMIS II — Design System
### *Mission to the Moon* · Website Design Reference

---

## The Vibe

**Cinematic mission control.** Not a NASA brochure. Not a fan site. This is a *broadcast*—the kind of visual language you'd see on a $50M documentary title card or a live network news special. Heavy type, vast negative space, editorial gravity. The cosmos doesn't do pastels and drop shadows. It does void, light, and consequence.

**Reference points:** ABC News Artemis II broadcast graphics, space documentary title sequences (IMAX), editorial science journalism (Quanta Magazine, The Atlantic science issues), NASA's own mission patch culture.

**What makes it unforgettable:** The tension between the absolute black of deep space and the violent, electric luminescence of the Earth's limb. Every design decision either belongs to the void or belongs to the light.

---

## Color System

```css
:root {
  /* The Void */
  --color-space:        #050508;   /* near-black, slightly blue-tinted */
  --color-deep:         #0a0b12;   /* page backgrounds */
  --color-surface:      #0f1018;   /* cards, panels */
  --color-border:       #1a1c2a;   /* subtle dividers */

  /* Earth's Atmosphere — the electric horizon */
  --color-atmosphere:   #1a8aff;   /* the blue of the limb glow */
  --color-atmosphere-2: #0d4fa3;   /* deeper blue */
  --color-corona:       #4dc3ff;   /* bright edge highlights */
  --color-horizon:      #7dd4fc;   /* lightest sky */

  /* The Sun / Accent */
  --color-flare:        #ff4d2e;   /* the mission red — exactly from the subtitle */
  --color-flare-2:      #e8391b;   /* hover/active red */
  --color-gold:         #f5c842;   /* lens flare warm gold, use sparingly */
  --color-sunrise:      #ffb347;   /* warm horizon glow, decorative only */

  /* Typography */
  --color-text-primary: #f0f2f8;   /* headline white — cool-tinted, not pure white */
  --color-text-secondary: #8a9ab5; /* muted body — blue-grey */
  --color-text-muted:   #4a566e;   /* metadata, captions */

  /* Moon */
  --color-moon:         #c8cdd6;   /* moon surface grey */
  --color-moon-shadow:  #1e2130;   /* crater shadows */
}
```

**Usage rules:**
- Backgrounds are always `--color-space` or `--color-deep`. Never white. Never grey.
- `--color-flare` is the single red accent. Use it for: section labels, mission stats, CTAs, the word "ARTEMIS II" wherever it appears in smaller contexts.
- `--color-atmosphere` and `--color-corona` for: links, active states, glows, data visualizations, horizontal rules.
- `--color-gold` appears maximum twice per page. Lens flare decorative element only.
- No gradients involving purple. No gradients involving green.

---

## Typography

### Typeface Stack

```css
/* Display — the big loud headline voice */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');

/* Editorial body — readable, slightly cold, precise */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

/* Data / Technical — mission telemetry feel */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Barlow Condensed', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;
}
```

**Why these:**
- **Barlow Condensed** — wide tracking at massive weights reads like broadcast title cards. It's the closest free match to the actual Artemis II logo typography. At 900 weight and wide letter-spacing it's cinematic, not generic.
- **DM Sans** — warm geometric sans for body. Reads beautifully at small sizes, has personality without distraction.
- **IBM Plex Mono** — mission data, coordinates, dates, stats. Adds the technical authenticity of actual NASA documentation.

### Type Scale

```css
:root {
  /* Display sizes */
  --type-hero:    clamp(64px, 12vw, 160px);   /* "ARTEMIS II" hero heading */
  --type-title:   clamp(40px, 6vw, 88px);     /* section titles */
  --type-heading: clamp(24px, 3vw, 40px);     /* subsection headings */

  /* Body sizes */
  --type-lead:    clamp(18px, 2vw, 22px);     /* intro paragraphs */
  --type-body:    16px;                        /* standard body */
  --type-small:   13px;                        /* captions, metadata */
  --type-label:   11px;                        /* mission stats labels, overlines */

  /* Tracking (letter-spacing) */
  --track-hero:   0.04em;    /* condensed display needs slight open */
  --track-label:  0.25em;    /* ALL-CAPS labels get wide tracking */
  --track-mono:   0.05em;    /* mono data reads cleaner slightly open */
}
```

### Type Rules

- Hero headlines (`--font-display`, weight 900): ALL CAPS. Slight letter-spacing. The "II" in ARTEMIS II should always be in `--color-text-primary`.
- Mission subtitle ("MISSION TO THE MOON"): `--font-display` weight 700, ALL CAPS, `--color-flare`, `--track-label` spacing.
- Section overlines: `--font-mono`, ALL CAPS, `--color-flare`, 11px, wide tracking. Always precede section headings. E.g. `// MISSION OVERVIEW`.
- Body: `--font-body` 300–400 weight. Line height 1.7. Max width 680px. `--color-text-secondary`.
- Data / stats: `--font-mono`. Numbers in `--color-text-primary`. Labels in `--color-text-muted`.

---

## Layout & Spatial Composition

### Grid

```css
:root {
  --grid-max:     1280px;
  --grid-gutter:  clamp(24px, 5vw, 80px);
  --section-gap:  clamp(80px, 12vw, 160px);
}
```

**Philosophy:** Think in full-viewport sections separated by near-void space. Each section is a frame. Content never touches edges. Headings break out of the body column into the margins.

### Section Structure

```
HERO
  Full-bleed background (the uploaded image or a recreation)
  Centered title stack
  Subtle scroll indicator

MISSION BRIEF
  Left-rail overline label
  Massive headline breaks to the right margin
  Body text in narrow 600px column
  One pull-quote in --color-atmosphere at 28px

CREW (if applicable)
  Horizontal scroll or 4-column grid
  Each card: grayscale photo → color on hover
  Red mission role label above name

MISSION TIMELINE
  Vertical spine with dots
  --font-mono timestamps in left column
  Brief entries right
  Active/upcoming in --color-atmosphere

DATA / KEY NUMBERS
  Large monospaced numbers in --color-text-primary
  Red labels underneath
  4-column on desktop, 2 on mobile

FOOTER
  Minimal. NASA wordmark (text). Year. Mission designation.
  One horizontal rule in --color-border.
```

### Asymmetry Rules
- Section headings: left-align with a single right-margin bleed word (break "MISSION / CONTROL" across columns intentionally).
- Occasionally offset images 15–20% outside their grid column.
- Use `position: absolute` decorative elements: coordinate grids, faint circle arcs (moon orbit suggestion), single-pixel horizontal rules at unexpected vertical positions.

---

## Visual Texture & Atmosphere

### Backgrounds

The page should never feel flat. Layer these:

```css
/* Base starfield feel — very subtle */
background: 
  radial-gradient(ellipse at 50% 0%, #0d2545 0%, transparent 60%),
  radial-gradient(ellipse at 80% 100%, #0a1a30 0%, transparent 50%),
  var(--color-deep);

/* Section divider glow — the Earth horizon effect */
.section-horizon {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-atmosphere-2) 20%,
    var(--color-corona) 50%,
    var(--color-atmosphere-2) 80%,
    transparent 100%
  );
  box-shadow: 0 0 20px 2px var(--color-atmosphere);
}
```

### The Hero Section

Recreate the image's essence in CSS/HTML (don't rely on the jpg as a crutch—the design should work independently):

```css
.hero {
  background:
    /* Moon glow top-center */
    radial-gradient(ellipse 300px 200px at 50% -5%, #c8cdd620 0%, transparent 70%),
    /* Earth horizon luminescence */
    radial-gradient(ellipse 100% 40% at 50% 110%, #1a8aff25 0%, transparent 60%),
    /* Lens flare warmth */
    radial-gradient(ellipse 200px 100px at 52% 72%, #ffb34715 0%, transparent 60%),
    /* Deep space */
    #050508;
}
```

Add 1–2px white dots scattered with CSS (or an SVG noise overlay at 3% opacity) for stars.

### Decorative Elements

- **Orbit arc:** A single `border-radius: 50%` circle, 600px, 1px `--color-atmosphere` border, 8% opacity. Positioned behind hero content, partially cropped. No fill.
- **Coordinate crosshair:** Two 1px lines intersecting, `--color-border`, in section corners. Very quiet. Suggests targeting/precision.
- **Scan line:** Optional. A very slow (8s) top-to-bottom gradient sweep at 2% opacity on the hero. CSS animation only.
- **Section numbers:** `01 / 02 / 03` in `--font-mono`, 80px, `--color-border` color (so they're barely visible). Absolute positioned in section top-right corners.

---

## Motion

Keep it purposeful. This is a space mission, not a gaming site.

```css
/* Page load: staggered fade-up for hero text */
@keyframes riseUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-overline  { animation: riseUp 0.6s ease-out 0.2s both; }
.hero-title     { animation: riseUp 0.8s ease-out 0.4s both; }
.hero-subtitle  { animation: riseUp 0.6s ease-out 0.7s both; }
.hero-cta       { animation: riseUp 0.5s ease-out 1.0s both; }

/* Hover on links/cards */
transition: color 0.2s ease, opacity 0.2s ease;

/* Horizon glow pulse — very slow, barely perceptible */
@keyframes horizonPulse {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1.0; }
}
.section-horizon { animation: horizonPulse 4s ease-in-out infinite; }
```

**Rules:**
- No entrance animations below the fold (use IntersectionObserver for scroll triggers).
- Hover states: color shift only. No scale transforms on text.
- Cards: `transform: translateY(-4px)` on hover with `box-shadow: 0 12px 40px #1a8aff15`.
- Never animate the background. Let it be the void.

---

## Components

### Mission Stat Block

```html
<div class="stat">
  <span class="stat__value">10</span>
  <span class="stat__unit">DAYS</span>
  <span class="stat__label">Mission Duration</span>
</div>
```

```css
.stat__value  { font: 900 64px/1 var(--font-display); color: var(--color-text-primary); }
.stat__unit   { font: 500 11px/1 var(--font-mono); color: var(--color-flare); letter-spacing: var(--track-label); }
.stat__label  { font: 400 12px/1 var(--font-mono); color: var(--color-text-muted); letter-spacing: var(--track-label); margin-top: 6px; }
```

### Section Overline

```html
<p class="overline">// MISSION OVERVIEW</p>
```

```css
.overline {
  font: 500 11px/1 var(--font-mono);
  color: var(--color-flare);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  margin-bottom: 16px;
}
```

### Crew Card

```css
.crew-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 24px;
  transition: border-color 0.2s, transform 0.2s;
}
.crew-card:hover {
  border-color: var(--color-atmosphere);
  transform: translateY(-4px);
}
.crew-card img {
  filter: grayscale(100%) contrast(1.1);
  transition: filter 0.3s;
}
.crew-card:hover img { filter: grayscale(0%); }
```

### CTA Button

```css
.btn-primary {
  font: 700 12px/1 var(--font-mono);
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--color-space);
  background: var(--color-atmosphere);
  border: none;
  padding: 14px 32px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: var(--color-corona); }

.btn-ghost {
  background: transparent;
  color: var(--color-atmosphere);
  border: 1px solid var(--color-atmosphere);
}
.btn-ghost:hover {
  background: var(--color-atmosphere);
  color: var(--color-space);
}
```

---

## What NOT To Do

| ❌ Avoid | ✓ Instead |
|---|---|
| White or light backgrounds | Space black `#050508` |
| Purple gradients | Blue atmosphere gradients |
| Drop shadows on text | Glow (`text-shadow: 0 0 40px #1a8aff40`) |
| Rounded corners > 4px | Sharp corners or `border-radius: 2px` max |
| Inter or Roboto | Barlow Condensed + DM Sans |
| Busy patterns/grids | Void + single accent elements |
| Parallax scroll overload | One subtle background layer, that's all |
| Hero carousels/sliders | Single full-bleed hero, held |
| Green or teal accents | Red (`--color-flare`) or blue (`--color-atmosphere`) only |
| Glassmorphism blur cards | Solid `--color-surface` with 1px borders |

---

## The One Rule

> **Every element either belongs to the void or to the light. There is no middle ground.**

Dark backgrounds. Cold blue glow. Hot red accent. Massive type. Sparse content. This is a mission brief, not a marketing website.

---

*Design reference derived from ABC News Artemis II broadcast graphic identity · April 2026*
