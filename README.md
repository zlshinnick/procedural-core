# Procedural Core

Research project page for *Procedural Core: A Compact Recurrent Initialization for Vision Transformers* (preprint, 2026).

Public address: https://zlshinnick.github.io/procedural-core-page/

## Run locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. No framework, build step, package installation, or remote runtime dependencies are required. Fonts are served locally.

## Publishing

GitHub Pages serves the root directory of the `main` branch. Push a commit to deploy. All resource paths are relative to support project Pages URLs.

## Content and provenance

- `assets/procedural-core-paper.pdf`: the supplied manuscript, marked Preprint. No conference acceptance or arXiv identifier is claimed.
- Main ImageNet values: paper Figure 2, 300 epochs, mean ± standard deviation over three seeds.
- The supplied raw log endpoints differed slightly from Figure 2. The page consistently uses the paper's reported summary, not the raw log endpoints.
- Spatial-task values: rounded values reported in the manuscript.
- Language results: paper Figure 4; a separately trained architecture-compatible GPT-style core.
- `assets/heatmaps.json` and `assets/stimuli/`: original supplied activation data and unmodified RGB stimuli from `ECCV2026/christian/iclr_arrays.npz`. Each map is independently normalized per model, stimulus, and layer. Values rounded to five decimal places for size.
- `assets/method.mp4`: silent 16-second explanatory schematic, not experimental footage. H.264, 1280×720, 24 fps.
- Code is labeled planned for release upon publication, matching the manuscript. Add the verified release link when available.

The page has no tracking, external scripts, analytics, or third-party embeds. Research claims, publication status, and citation details should be updated together if the manuscript changes.

Fonts: DM Sans and IBM Plex Mono, distributed under the SIL Open Font License; see `assets/font-licenses/`.
