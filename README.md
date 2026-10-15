# Stable review copy

This repository keeps Joe’s review links available after the editable source repository transfers to Akanksh. It is a review snapshot, not an automatic mirror. The editable handover repository is [akanksh-caimi-portfolio](https://github.com/joe-hireable/akanksh-caimi-portfolio); that link redirects after the transfer is accepted.

# Akanksh Caimi — applied AI portfolio concepts

Three working concepts, built around the same verified project material:

- **Threshold** (`dist/threshold/`): obsidian and acid lime. Explore the reported accuracy–coverage trade-off from the MSc dissertation.
- **Latent Atlas** (`dist/latent/`): mineral white and ultramarine. Explore an editorial map of AI, application and systems projects.
- **Signal Path** (`dist/signal/`): graphite and coral. Step through explanations of the LLM pipeline, booking application and RISC-V simulator.

The concept hub is `dist/index.html`. These are static HTML, CSS and JavaScript sites. There is no subscription-dependent CMS, application database, API key or model bill. All three support small screens and reduced motion. Project evidence is linked in each case study. The interactions explain real code and reported results; they do not execute models, make medical predictions or create bookings.

## Edit content

1. Edit `dist/assets/content.json`. `person` holds identity and positioning, `projects` holds the seven shared case studies, and `cv` is the editable source copy used for the CV.
2. Run `node scripts/sync-content.cjs` from this folder. This refreshes `dist/assets/portfolio-data.js`, used by Threshold and Latent Atlas. Signal reads the JSON directly.
3. Static hero/about text and the short project teasers live in each concept's `index.html`; update those when changing the positioning. Signal's step-by-step explanations live in `dist/signal/app.js`.
4. The measured research data and provenance live at the beginning of `dist/threshold/app.js`. Only change these from an identified source; the four threshold values are measured operating points, not a continuous prediction model.

Adding a project also requires a map position in `dist/latent/app.js` and a corresponding project row in `dist/threshold/index.html`. The current set is deliberately curated rather than an unlimited CMS.

## Edit the design

Each concept has one `style.css`. Colour tokens are at the top. Layout uses ordinary responsive CSS. The hub and Signal/Latent use locally bundled Archivo Black and Source Sans 3 fonts. Threshold uses DM Sans and IBM Plex Mono from Google Fonts with system fallbacks. Font licences are included in `dist/assets/font-licences/`.

## Update the CV

The website buttons all download `dist/assets/Akanksh_Caimi_CV.docx`, using the selected **Kiln — cream and rust** design. Replace this file with the new Word document and replace `Akanksh_Caimi_CV.pdf` for the PDF preview. Keep those filenames to preserve every link.

The Word document uses native paragraphs, lists, hyperlinks, named styles and fully embedded fonts. Edit the named styles rather than formatting individual runs. The cream/ivory background is a Word page colour; printing it requires Word's “Print background colours and images” setting. The supplied PDF already includes the page colour.

## Preview locally

Serve `dist/` with any static HTTP server; for example, from that folder run `python -m http.server 8080`. Open `http://localhost:8080/`. Use HTTP rather than opening files directly, because Signal fetches the shared JSON.

All navigation and asset URLs are relative, so the concepts work at a domain root or under a GitHub Pages repository path. Keep the three concepts and shared `assets/` folder together.

## Publish with GitHub Pages

In the repository's **Settings → Pages**, choose **GitHub Actions** as the source. The included workflow checks JavaScript syntax, verifies local links and the Word document, then publishes `dist/` on every push to `main`. You can also run **Deploy portfolio to GitHub Pages** manually from the Actions tab. No build step, dependency installation or paid service is required.

Run the same content checks locally with `python scripts/check-site.py`. The checker reads the current Word file, so replacing the CV does not require updating a hard-coded checksum.

Joe's stable preview is [joe-hireable.github.io/akanksh-caimi-portfolio-preview](https://joe-hireable.github.io/akanksh-caimi-portfolio-preview/). That separate preview remains under Joe's account; edits here do not automatically update it.

## Handover to Akanksh

This repository is prepared for transfer to the GitHub account **AkankshCaimi**. Accept GitHub's transfer invitation while signed in to that account. After transfer, check **Settings → Pages → Source: GitHub Actions** and run the deployment workflow. Once deployment succeeds, GitHub shows the live address under Settings → Pages; with the repository name unchanged, it will be `https://akankshcaimi.github.io/akanksh-caimi-portfolio/`.

The new owner can edit the files directly in GitHub or clone the repository. The workflow, Word CV, source content and font licences travel with the repository. There are no API keys or external CMS credentials to hand over. GitHub Pages URLs can change with ownership, so use the deployment's confirmed address when sharing the personal portfolio.

## Verification and evidence

Checked on 15 October 2026: responsive layouts down to 320 px; keyboard controls and modal focus; reduced motion; all 12 measured threshold states; all 15 Signal stages; seven case studies; real Word downloads; two-page Microsoft Word rendering; OOXML validation and embedded-font decoding. Saved research results were checked, not re-trained. Independent Codex reviewers checked the work. A Claude review was attempted, but its expired OAuth session could not be refreshed; no cross-family review is claimed.

Qualification remains “MSc Applied Artificial Intelligence”, with a predicted result, pending final award confirmation. Publication acceptance is not asserted. Team work is labelled. The community-centre application is in development and its repository acknowledges AI assistance.
