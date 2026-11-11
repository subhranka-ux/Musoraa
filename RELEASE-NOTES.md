# Musora cumulative release — Phase 6

This archive combines the source from Phases 1–5 and Phase 6 integration work.

## Added in Phase 6
- PWA manifest and scalable SVG app icons.
- Service worker with app-shell caching and same-origin asset caching.
- Mobile viewport and browser theme metadata.
- Syntax-check script and deployment instructions.
- Updated documentation with honest limitations and pre-launch QA steps.

## Verification performed for this archive
- TypeScript/TSX syntax transpilation: passed for all six source files.
- ZIP integrity test: passed.
- Required source modules and PWA assets: present.
- Full npm dependency installation and Vite production build: not completed in this environment because package installation stalled. Run `npm install`, `npm run check:syntax` and `npm run build` locally before deployment.
- Live browser testing on physical phones/laptops: not performed here.

## Known limitations
- Course content is an introductory release, not a complete advanced conservatory curriculum.
- Certificate issuance and lookup are browser-local. There is no deployed server/database or public verification.
- Certificate signature is a typeset rendering of the founder's name, not a handwritten or legally authorised signature.
- PWA offline mode caches the app shell and assets encountered; it does not guarantee every feature or lesson is fully available offline.
