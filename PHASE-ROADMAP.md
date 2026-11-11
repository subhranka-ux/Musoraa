# Musora development roadmap

## Phase 1 — Foundation
Responsive landing page, brand system, navigation, learning-path overview, searchable/filterable course catalogue, theme switch and founder introduction.

## Phase 2 — Learning platform
Introductory structured lesson content for foundations, Western theory, Hindustani music and Carnatic music, with lesson explanations, examples, quizzes and local progress.

## Phase 3 — Interactive music lab
Virtual piano, chord and scale explorer, Circle of Fifths, metronome, interval ear training and guitar fretboard.

## Phase 4 — Practical musicianship
Instrument pathways, singing fundamentals, songwriting, composition, arrangement, MIDI and music-production lessons, melody sketchpad and local idea notebook.

## Phase 5 — Assessments and certificates
Course assessments, learner attestation, name confirmation, print-to-PDF certificates, unique IDs and browser-local lookup. Public verification is not implemented in this static release.

## Phase 6 — Integration and launch preparation
Cumulative source integration, PWA manifest, app-shell service worker, responsive metadata, documentation and packaging.

## Quality and accuracy
The source includes introductory material and educational tools, but it has not undergone a full independent music-theory audit, complete browser/device QA or successful production build in this environment. Before public launch:
1. Run `npm install`, `npm run check:syntax` and `npm run build`.
2. Test all navigation, course flows, browser audio, progress storage and certificate print flow on current mobile and desktop browsers.
3. Review every lesson and quiz with qualified teachers, especially tradition-specific Indian classical content.
4. Add a secure backend/database before offering public cross-device certificate verification.
5. Review accessibility, privacy, security, analytics and hosting configuration.

## Certificate status
Certificate records currently live in local browser storage. Clearing browser data or changing devices may make records unavailable. Local lookup does not prove authenticity to third parties. The founder signature is a decorative typeset name, not a handwritten or legally authorised signature.
