---
name: Balam-Nah
description: A living lagoon ledger for a place shaped by water, land, and community.
colors:
  water: "#073b4c"
  water-deep: "#042a38"
  lagoon-cyan: "#7ee8dc"
  sun-yellow: "#ffd166"
  paper: "#f3f0e5"
  ink: "#092f3d"
  warm-white: "#fffdf7"
  water-mist: "#d7f3ef"
  ledger-line: "rgba(7, 59, 76, 0.24)"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(4rem, 11.5vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(2.8rem, 6vw, 5.7rem)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Recursive, monospace"
    fontSize: "0.68rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.08em"
spacing:
  edge: "1rem"
  compact: "0.75rem"
  content: "1.5rem"
  block: "2.5rem"
  section: "clamp(7rem, 12vw, 12rem)"
components:
  action-primary:
    backgroundColor: "{colors.water}"
    textColor: "{colors.warm-white}"
    typography: "{typography.body}"
    padding: "0.95rem 1rem"
  action-primary-hover:
    backgroundColor: "{colors.water-deep}"
    textColor: "{colors.warm-white}"
  action-sun:
    backgroundColor: "{colors.sun-yellow}"
    textColor: "{colors.water-deep}"
    padding: "0 1rem"
    height: "2.7rem"
  ledger:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "1.5rem"
  map-label:
    backgroundColor: "{colors.sun-yellow}"
    textColor: "{colors.water-deep}"
    typography: "{typography.label}"
    padding: "0.4rem 0.65rem"
---

# Design System: Balam-Nah

## Overview

**Creative North Star: "The Living Lagoon Ledger"**

Balam-Nah is documented like a field record that happens to be alive: monumental names, precise coordinates, folio indexes, route traces, and practical entries sit directly against documentary photographs of the lagoon and property. The system is confident and place-specific rather than resort-polished. Water is both the subject and the organizing device.

Its visual rhythm moves between immersive photographic fields and emphatic blocks of cyan, yellow, paper, and deep blue. Editorial asymmetry, oversized type, square-edged panels, and sparse map notation keep the experience grounded in evidence while giving it a recognizable authored voice.

**Key Characteristics:**
- Monumental condensed display type paired with plainspoken body copy and monospaced field labels.
- Documentary photography used at architectural scale, never as incidental decoration.
- Route lines, coordinates, folio indexes, captions, and ledger rows as recurring information devices.
- The approved logo traces connected lagoons with careful jaguar tracks, expressing watchfulness without aggression.
- Hard-edged color fields and offset structural shadows rather than soft lifestyle styling.
- Responsive compositions that preserve hierarchy while changing from grids to stacked or horizontal-snap sequences.

## Colors

The palette moves between dark lagoon water, high-visibility field marks, warm paper, and restrained pale-water text.

### Primary
- **Deep Water:** The principal brand field for immersive sections, actions, and dark photographic overlays.
- **Lagoon Cyan:** The bright water marker for visit surfaces, annotations, hover offsets, and highlighted phrases.

### Secondary
- **Sun Yellow:** The route and action signal, reserved for traced paths, focus outlines, navigation indicators, and major color fields.

### Neutral
- **Water Deep:** The deepest structural ground, image wash, shadow color, and footer field.
- **Ledger Paper:** The warm reading surface for editorial sections, navigation overlays, and the visit ledger.
- **Lagoon Ink:** The default text color on light fields.
- **Warm White:** The primary text color on water fields and photography.
- **Water Mist:** Supporting copy on dark water fields.
- **Ledger Line:** The quiet rule used to divide records without turning the page into a boxed grid.

### Named Rules

**The Field Mark Rule.** Cyan and yellow behave as map annotations and signals; use them decisively, not as ambient decorative gradients.

**The Water Leads Rule.** Deep blue establishes the world, but real lagoon photography is the strongest color field whenever credible imagery is available.

## Typography

**Display Font:** Archivo Black (with sans-serif fallback)  
**Body Font:** Manrope (with sans-serif fallback)  
**Label/Mono Font:** Recursive (with monospace fallback)

**Character:** Archivo Black supplies compact, monumental berth-like staging; Manrope keeps bilingual visitor information calm and readable. Recursive turns coordinates, captions, dates, source notes, and folio language into a coherent field-document layer.

### Hierarchy
- **Display** (400, fluid 4–10rem, 0.82 line-height): Reserved for the hero and the largest brand wordmarks.
- **Headline** (400, fluid 2.8–5.7rem, 0.94 line-height): Section propositions set as dense, balanced blocks.
- **Title** (400, fluid 1.6–2.8rem, 1 line-height): Names experiences directly over documentary images.
- **Body** (400–700, 1–1.18rem, 1.6 line-height): Visitor explanation and practical information, usually constrained to 38rem or less.
- **Label** (600, about 0.67–0.74rem, tracked and often uppercase): Coordinates, captions, map tags, sources, and ledger headings.

### Named Rules

**The Three Registers Rule.** Archivo Black names the place, Manrope explains it, and Recursive records it. Do not exchange their jobs.

**The Monument and Note Rule.** Large headings should feel nearly architectural; supporting labels should remain compact enough to read as notation.

## Layout

The desktop system uses a 90rem maximum page measure with fluid 1–4.5rem edge gutters and deliberately uneven grids. Sections are expansive, commonly using 7–12rem vertical space, and alternate between full-bleed photographic fields and bounded editorial layouts. Image groups vary in width, vertical offset, and rotation rather than settling into equal cards.

At 980px, primary navigation becomes a full-screen folio menu and multi-column stories simplify to one or two columns. At 680px, major layouts stack, edge gutters resolve to 1rem, the experience sequence becomes a horizontal snap track, and ornamental vertical indexing disappears. Mobile retains the monumental display scale, practical ledger, route imagery, and full-width actions rather than becoming a reduced desktop page.

**The Uneven Shoreline Rule.** Repeated media may share a family, but its widths, offsets, and crops should form an intentional landscape rather than an equal-card row.

**The One Strong Axis Rule.** Each section establishes one dominant reading axis—split, vertical, or horizontal track—then uses annotations as counterpoints.

## Elevation & Depth

Depth is structural, not atmospheric. Most surfaces stay flat and are separated by strong tonal fields, image overlays, one-pixel rules, and physical offsets. Shadows appear on the fixed header after scroll, on the hero ledger, as text relief over photography, and as a crisp cyan hover offset on the header action.

### Shadow Vocabulary
- **Ledger Offset** (`12px 14px 0 rgba(4, 42, 56, 0.4)`): Gives the practical visit record the weight of a placed folio.
- **Header Lift** (`0 12px 30px rgba(4, 42, 56, 0.12)`): Separates the paper header from content only after scrolling.
- **Action Offset** (`4px 5px 0 #7ee8dc`): A crisp hover response for the yellow header action.
- **Monument Relief** (`7px 9px 0 rgba(4, 42, 56, 0.22)`): Keeps the giant wordmark legible over aerial water.

### Named Rules

**The Placed Paper Rule.** Offset shadows belong to ledger-like objects and tactile actions, never to every content surface.

## Shapes

The form language is square and documentary. Panels, actions, labels, image frames, and navigation surfaces have no corner rounding. Shape comes from image crops, slight rotations, offset outline frames, irregular grid proportions, dashed routes, circular waypoints, and underlined text actions.

**The No Soft Capsule Rule.** Do not introduce pills or rounded lifestyle cards; map labels are compact rectangles and actions are hard-edged bars.

### Brand mark

The approved logo combines the connected lagoon system with measured jaguar tracks. The lagoon chain remains the dominant form; tracks weave around it to communicate caution, attention, and respectful movement through the property rather than threat. Use the dark-lettered transparent lockup on light fields and the warm-white lockup on Deep Water, Water Deep, or dark photography. The descriptor version belongs only at sizes where `LAGUNA · NATURALEZA · COMUNIDAD` stays legible.

## Components

### Buttons
- **Shape:** Square-edged bars with compact, confident spacing.
- **Primary:** Deep Water with Warm White text; icon, label, and directional arrow occupy a single aligned row.
- **Hover / Focus:** Primary actions deepen in color; the yellow header action shifts up-left and gains a cyan offset. All keyboard focus uses a 3px Sun Yellow outline with a 4px offset.
- **Text Action:** Bold inline copy with a two-pixel current-color underline is used for lower-priority inquiries.

### Cards / Containers
- **Visit Ledger:** A paper panel with 1.5rem padding, ruled definition-list rows, compact monospaced heading, and a hard Water Deep offset shadow.
- **Experience Panel:** A tall edge-to-edge documentary image with lower dark-water gradient, bottom-anchored title, and restrained image scale on hover.
- **Image Figure:** Square-cropped photography with plain monospaced captions and occasional offset outline or slight rotation.

### Navigation

The fixed desktop header is transparent over the hero, then changes to paper with a subtle lift after 24px of scroll. Links are compact bold Manrope with a yellow underline drawn on hover. Below 980px, navigation becomes a full-screen paper folio: monumental Archivo Black links, ruled rows, and a compact place note.

### Folio and Map Notation

Recursive labels, thin ledger rules, vertical indexes, dashed yellow routes, circular cyan waypoints, and rectangular map tags connect practical visitor information to the landscape. These marks should carry real orientation, category, chronology, or source meaning.

## Do's and Don'ts

### Do:
- **Do** let original photography occupy full sections or substantial grid areas.
- **Do** pair each expressive composition with practical information, labels, or a clear action.
- **Do** use route traces, rules, captions, and coordinates when they organize genuine place-based information.
- **Do** maintain full Spanish and English behavior without shrinking the intended hierarchy.
- **Do** preserve visible keyboard focus and reduced-motion behavior.

### Don't:
- **Don't** round panels, actions, labels, or image frames into generic hospitality components.
- **Don't** substitute stock eco-resort imagery or decorative tropical motifs for documentary evidence.
- **Don't** use yellow or cyan as unstructured decoration; each bright mark should signal, locate, or separate.
- **Don't** flatten repeated photographs into equal cards when an uneven editorial sequence can tell the story.
- **Don't** style X-Hazil Sur or Maya community context as exotic texture; keep historical notes sourced, restrained, and legible.
