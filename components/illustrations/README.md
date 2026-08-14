# Arcilla illustration components

Drop this folder into your Next.js project, e.g. `components/illustrations/`.

## Section mapping

| Component | Section on the site | Source file |
|---|---|---|
| `HeroIllustration` | Hero — phone + taqueria challenge | `illo_header.svg` (or `hero.webp`) |
| `SkillsDiagram` | "Not a game. Not passive practice." — four skills orbit | `v5PH…svg` (interactive) |
| `ChallengeIllustration` | "A personalized path to fluency" → **The challenge** card | `Group_3.svg` |
| `ProgressIllustration` | "A personalized path to fluency" → **Progress** card | `curve.svg` |
| `EarnArtIllustration` | **Earn art. Not points.** card | `ladder.svg` |
| `RealTeachingIllustration` | **Real teaching, encoded.** card | `encoded.svg` |

The node-labels strip (`2oXN…svg`) and favicons are in this folder as raw
assets — see notes below.

## The four card illustrations (Challenge / Progress / EarnArt / RealTeaching)

Pure inline SVG, no dependencies. Stroke defaults to `currentColor`, so the
line color follows the parent's text color — set it with CSS:

```jsx
<div style={{ color: "#222" }}>
  <ChallengeIllustration className="w-full" />
</div>
```

Override explicitly if you'd rather pin it:

```jsx
<ProgressIllustration stroke="#333" className="h-64" />
```

`ChallengeIllustration` also takes a `fill` prop (default `#030303`, the
original near-black layer fill).

## SkillsDiagram (interactive)

Reading / Writing / Listening / Speaking on two crossing orbits. Each label
glows white on hover — the hover CSS is scoped to the component (class prefix
`arcilla-skill`) so it won't collide with anything else on the page.

The labels are real `<text>` in a monospace face (the original baked them into
vector paths). If your design tokens define a specific mono font, change
`font-family` in the `<style>` block, or lift those rules into your global CSS.

```jsx
<SkillsDiagram className="mx-auto max-w-3xl" />
```

## HeroIllustration (static asset)

The hero SVG is ~751KB (it embeds a raster pattern behind a luminance mask), so
it's served from `/public`, not inlined.

1. Copy **`illo_header.svg`** → `public/illustrations/illo_header.svg`
   (or the lighter static raster `aGaSrwLiVomcIPH6QF1uk8qdc.webp`
   → `public/illustrations/hero.webp`).
2. Use the component:

```jsx
<HeroIllustration />                        {/* uses the SVG */}
<HeroIllustration src="/illustrations/hero.webp" />  {/* lighter, static */}
```

Trade-off: the SVG keeps crispness at any size; the webp is ~5× smaller but
static and raster. For a hero above the fold, the webp usually wins on load
time — test both.

## Favicons

`arcilla_favicon_light.png` and `arcilla_favicon_dark.png` are in this folder.
In the Next.js App Router, the simplest path is to drop a single favicon into
`app/` (e.g. `app/icon.png`), or wire both light/dark via `<link>` tags in
`app/layout.tsx` using `media="(prefers-color-scheme: dark)"`.

## Node-labels strip

`2oXNtHIxMmQCHSx10tAl8H5QlMY.svg` is the row of floating hero labels
("Worth keeping", "salsa verde", "Saved to your collection", etc.) exported as
one flat SVG strip. On the live site these float around the phone as separate
positioned cards. Recommendation: rather than reuse this baked strip, rebuild
those as small positioned `<div>`s or a tiny component so you can animate them
independently — but the raw strip is here if you want the exact artwork.
