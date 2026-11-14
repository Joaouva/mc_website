# MCA reference-led redesign

## Status

- Done: Phase 0 — Survey; Phase 1 — Design system; homepage; project index; project-detail template
- Doing: Visual verification
- Not done: Studio/contact template redesign and browser screenshot comparison

## Reference

The visual direction is based on [AA Arquitectos](https://www.aa-arquitectos.pt/?projeto=casas-no-salao), specifically its project-detail experience: editorial image-led layouts, a restrained near-black / warm-paper palette, General Sans typography, and an immersive fixed desktop navigation rail.

## Templates

| MCA route(s) | Template | Reference direction |
| --- | --- | --- |
| `/` | Home | Replace the conventional hero and cards with a calm project-led landing composition. |
| `/projects` | Project index | Editorial image grid with minimal labels and filters. |
| `/projects/[slug]` | Project detail | Full-bleed visual sequence, three-column desktop rhythm, project data and narrative integrated between images. |
| `/practice`, `/team` | Studio | Text-first, spacious profile and team layout. |
| `/contact` | Contact | Minimal information-first contact presentation. |
| `/admin` | CMS | Functional route; retain its existing interface unless explicitly included in the redesign. |

## Reference system captured

- Palette: `#101010` ink and `#efeeeb` paper; light and dark modes retain the same two-material feel.
- Type: General Sans with variable weights around 350–500; body/project content is `1.125rem` at `1.55` line-height.
- Structure: desktop uses a fixed left rail, `clamp(11rem, 22vw, 22rem)` wide; mobile collapses at `48rem` / 768px.
- Spacing: page inset `clamp(1.25rem, 5vw, 3.5rem)`, paired content gap `3rem`, large editorial breaks of `clamp(5.5rem, 10vw, 7.5rem)` and `clamp(8.5rem, 15vw, 11rem)`.
- Project details: a three-column full-viewport grid that alternates tall images, project data, prose, landscape banners, and a gallery/lightbox.
- Motion: low-key opacity and transform transitions; image hover scale is 1.05 over 550ms with `cubic-bezier(.22,1,.36,1)`.

## Existing MCA constraints

- The current project data is repository JSON and has four project records. Preserve this content model.
- Existing image assets are mostly remote Unsplash URLs; no reference assets will be copied.
- The existing local-only save endpoint remains local-development functionality and must not become a production CMS.

## Cannot come across as-is

- AA's bespoke logo, 3D wireframe viewer, project photography, and copy are their assets and will not be reused.
- The reference's external image-lightbox implementation can be recreated with MCA's own images if desired; it is not part of the present MCA data model.
- No destination for the MCA contact form is currently configured.

## Verification plan

Compare the MCA homepage and project-detail template against the intended reference direction at 1440px and 390px after the design-system and homepage work. Preserve functional routes and verify root-path routing locally and on Vercel.

## Implementation update

- The homepage now opens with an image-led intro sequence, with an explicit skip action and reduced-motion fallback.
- The projects index now has project pills that update the feature image and content on hover, keyboard focus, or click; each project links to its generated detail route.
- Project detail routes now use an editorial hero, project facts, and image sequence.
