# Musora deployment guide

## Option A — Cloudflare Pages (Git integration)

1. Extract the `Musora-Complete-Source.zip` archive.
2. Create a GitHub repository and upload the contents of the `musora/` folder (the folder containing `package.json`).
3. In Cloudflare, create a Pages project and connect that repository.
4. Set:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` if the repository root is the contents of the `musora/` folder.
5. Deploy. Cloudflare Pages serves the built site over HTTPS, which is required for service workers.

## Option B — Netlify

Netlify's manual drag-and-drop deploy expects the **built output**, not the React source ZIP.

1. Extract the archive on a computer with Node.js 20.19+ or 22.12+.
2. Open a terminal in the `musora/` folder.
3. Run `npm install`.
4. Run `npm run build`.
5. Open the generated `dist/` folder and drag the **contents of `dist/`** into Netlify's manual deploy area. Alternatively, connect the Git repository and use `npm run build` with `dist` as the publish directory.

## Local preview

```bash
npm install
npm run dev
```

For a production-like local preview:

```bash
npm run build
npm run preview
```

## Before announcing a public launch

- Run `npm run check:syntax` and `npm run build`.
- Test the home page and every navigation link on a phone and laptop.
- Test piano, chord/scale playback, metronome, interval ear training, guitar fretboard and melody sketchpad with sound enabled.
- Confirm browser audio starts only after a learner interacts with the page.
- Test course completion, saved notes, quiz feedback and certificate print-to-PDF.
- Test install prompt and offline fallback over HTTPS.
- Review the full curriculum with qualified teachers before describing it as exhaustive or error-free.
- Add a deployed, secure backend and database before claiming public certificate verification. The current certificate lookup is device-local only.

## Hosting and privacy notes

The website can be hosted as a static site, but hosting providers may impose free-tier quotas and terms. Local lesson progress and certificate records are stored in the learner's browser. Clearing site data can remove them. This project does not currently include accounts, cross-device sync, server-side certificate issuance or a public verification database.
