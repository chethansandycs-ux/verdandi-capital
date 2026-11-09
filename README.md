# Verdandi Capital — website

Static site (plain HTML/CSS/JS, no build step). Three pages: `index.html`, `about.html`, `portfolio.html`.

## Run locally

```bash
python -m http.server 5510 --directory verdandi-capital
```

Then open http://localhost:5510. Deploy by uploading the folder to any static host (Netlify, Vercel, GitHub Pages, S3).

## Structure

- `assets/css/styles.css`: all styles; colour and type tokens are at the top (`:root`)
- `assets/js/main.js`: portfolio data and filters, mobile nav, scroll reveals
- `assets/img/favicon.svg`: logo mark

## Design

Visual direction follows the client's reference (quinn-project-copy.webflow.io): black hero with a glowing glass orb, bold Inter type, soft grey sections, floating UI cards, a dark "board" on a lavender panel, and an input-style call to action. Copy and assets are Verdandi's own.

## Portfolio

**Tvashara** and **Rattonot** are real portfolio companies, shown first with featured (black) cards. Their description, sector, stage and year are still TODO in `assets/js/main.js`. Until a `sector` is set, they appear only under the "All" filter.

## Placeholder content to replace before launch

All of these are examples written for the design and are **not real**:

| What | Where |
|---|---|
| Example portfolio companies (everything except Tvashara and Rattonot) | `COMPANIES` array in `assets/js/main.js` |
| Floating cards on the home page (names, intros, timings) | `index.html`, "Building is hard" section |
| Team names, roles and bios; LinkedIn links | `about.html`, "The team" section |
| Investment terms (stage, cheque size, role, geography) | `index.html`, "How we invest" |
| Founding story | `about.html`, "Our story" |
| Testimonial quote | `portfolio.html` |
| Email addresses (`founders@` / `hello@verdandicapital.in`) | every page (header, CTAs, footer) |
| LinkedIn URL (`href="#"`) | footer on every page |

Each placeholder is also marked with a `<!-- PLACEHOLDER -->` comment in the HTML. Team portraits are monogram cards. To use photos, put an `<img>` inside `.portrait`.
