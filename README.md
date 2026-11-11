# Musora — Music Education for Everyone

Musora is a responsive, free music-learning website for complete beginners through advancing learners. It introduces Western music theory, Hindustani and Carnatic traditions, practical musicianship, songwriting and music production.

## Included in this cumulative project

### Phase 1 — Website foundation
- Responsive homepage, navigation, learning-path cards and course discovery
- Dark/light theme switch
- Founder information: Subhranka Chandra Pradhan
- Course search, category filters and saved-course controls

### Phase 2 — Music academy
- Introductory lesson library covering foundations, Western theory, Hindustani music and Carnatic music
- Structured explanations, examples, context notes and knowledge checks
- Local lesson completion and progress

### Phase 3 — Interactive music lab
- Browser-audio virtual piano
- Chord builder and major/natural-minor scale explorer
- Circle of Fifths
- Metronome
- Interval ear training
- Standard-tuning guitar fretboard

### Phase 4 — Practical musicianship
- Piano/keyboard, guitar, bass and drum learning paths
- Singing foundations
- Songwriting, melody, composition and arrangement lessons
- DAW, MIDI, recording and mixing fundamentals
- Melody sketchpad and local songwriting notebook

### Phase 5 — Assessments and certificates
- Course assessments with an 80% pass threshold
- Learner completion attestation and name confirmation
- Certificate print-to-PDF workflow
- Founder credit and decorative typeset founder-name signature
- Unique certificate IDs and local certificate lookup

**Certificate verification limitation:** Current certificate records are stored in the learner's browser. The lookup is local to that browser and is not public, tamper-proof or cross-device verification. Do not represent these prototype certificates as independently verified credentials. A production public verification service requires a deployed backend and database.

### Phase 6 — Integration and launch preparation
- Installable PWA manifest and service worker app-shell caching
- Responsive metadata and app icons
- Updated deployment and testing instructions
- Cumulative source packaging

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Browser audio requires a user gesture before playback in modern browsers.

## Check source syntax

```bash
npm run check:syntax
```

This checks TypeScript/TSX syntax transpilation. It is not a substitute for the full type check or browser testing.

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`. Deploy the **contents** of `dist/` to a static host such as Cloudflare Pages or Netlify. Service workers require HTTPS in production (localhost is also supported for development).

## Install as an app
After deployment over HTTPS, open Musora in a supported browser and use its browser menu's **Install app** or **Add to Home Screen** option. Offline support is an app-shell/cache fallback, not a promise that every feature or all lesson content works offline.

## Project structure

```text
musora/
├── index.html
├── package.json
├── vite.config.ts
├── public/
│   ├── manifest.webmanifest
│   ├── sw.js
│   └── icons/
└── src/
    ├── App.tsx
    ├── LearningAcademy.tsx
    ├── MusicLab.tsx
    ├── PracticalStudio.tsx
    ├── CertificateCenter.tsx
    ├── main.tsx
    └── styles.css
```

## Important notes
- This is a cumulative development release, not a claim of a fully audited production service.
- Lesson content is an introductory foundation and does not yet constitute an exhaustive advanced curriculum.
- Indian classical traditions are presented separately; terminology and practice can vary by gharana, lineage, region and pedagogy.
- The website is free to use; hosting, domains and any future backend may have third-party usage limits or costs.
- Founder-name signature is a decorative typeset rendering, not a handwritten or legally authorised signature.
\nSee [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting instructions and the pre-launch QA checklist.\n