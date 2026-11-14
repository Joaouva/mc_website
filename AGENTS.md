<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Visual language

- Use `--site-paper` and `--site-ink` for public-facing surfaces and text. The public site is deliberately monochrome; do not introduce terracotta, gradients, rounded cards, or drop shadows into redesigned routes.
- The public interface uses `General Sans` as its sole family. Use 400–500 weights, sentence case, and tight, factual labels rather than uppercase decorative headings.
- Desktop public pages reserve `--site-rail-width` for the fixed left navigation rail. Collapse to the compact top bar at 768px and below.
- The spacing rhythm is `--space-page`, `--space-section`, and `--space-major`. Prefer large quiet gaps and full-bleed image bands over boxed sections.
- Borders are hairlines (`--site-rule`); radii and shadows are absent. Image motion is limited to a gentle scale transition; respect `prefers-reduced-motion`.
