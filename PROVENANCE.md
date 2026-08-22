# Provenance and ownership

Audit date: 2026-08-22

The current production site is an original, repository-native implementation for Saurabh Shubham. Its HTML, CSS, JavaScript, written content, favicon, social preview artwork, validation scripts, and test code contain no vendored template, theme, copied snippet, remote font, remote script, stock image, analytics tag, or third-party runtime component.

The visual system uses Saurabh's `SS` identity, custom page composition, custom color tokens, custom cards, and custom responsive rules. Common web conventions—semantic HTML, system fonts, CSS layout primitives, metadata vocabularies, keyboard focus, reduced-motion support, and light/dark themes—are interoperability standards, not copied visual assets.

`@playwright/test` is an npm development-only test dependency and is not sent to site visitors. The resume build uses third-party TeX tooling and packages; generated resume content and layout source remain repository-authored. Product names, employer names, and trademarks identify factual experience and remain owned by their respective holders.

Audit method: reviewed every tracked current-head file; searched for template, attribution, license, copied-source, remote asset, and framework markers; checked all production `href`, `src`, CSS `url()`, and script references; confirmed production delivery is static and self-contained. This audit covers the repository's current tree, not the independent history or source code of external tools.
