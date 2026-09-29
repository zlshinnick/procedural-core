# Procedural Core

Research project page for *Procedural Core: A Compact Recurrent Initialization for Vision Transformers* (preprint, 2026).

Public address: https://zlshinnick.github.io/procedural-core-page/

## Run locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173 to preview the preserved full research page, or http://localhost:4173/docs/ to preview the temporary coming-soon page. No framework, build step, package installation, or remote runtime dependencies are required. Fonts are served locally.

## Publishing

GitHub Pages temporarily serves the `docs/` directory of the `main` branch. Only the coming-soon page and its own assets are published. The complete research site remains at the repository root, ready for launch.

The temporary page follows the Procedural Pretraining site's light academic theme: white and soft gray surfaces, Source Serif 4 headings, Inter body text, and restrained blue accents. Its fonts are served locally, with licenses in `docs/assets/font-licenses/`.

To launch the full site, change the GitHub Pages publishing source from `main /docs` to `main /` in repository Settings → Pages. The public address stays the same. Subsequent pushes deploy the selected source. All resource paths are relative to support project Pages URLs.

## Content and provenance

- `assets/procedural-core-paper.pdf`: the supplied manuscript, marked Preprint. No conference acceptance or arXiv identifier is claimed.
- Main ImageNet values: paper Figure 2, 300 epochs, mean ± standard deviation over three seeds.
- The supplied raw log endpoints differed slightly from Figure 2. The page consistently uses the paper's reported summary, not the raw log endpoints.
- Spatial-task values: rounded values reported in the manuscript.
- Language results: paper Figure 4; a separately trained architecture-compatible GPT-style core.
- `assets/heatmaps.json` and `assets/stimuli/`: original supplied activation data and unmodified RGB stimuli from `ECCV2026/christian/iclr_arrays.npz`. Each map is independently normalized per model, stimulus, and layer. Values rounded to five decimal places for size.
- `assets/method-sequence.mp4`: silent 31-second sequential explanation: abstract-data recurrence, matrix tiling, depth unrolling, then image training and paper-reported ImageNet performance. Diagrams are explanatory schematics. H.264, 1280×720, 24 fps.
- Code is labeled planned for release upon publication, matching the manuscript. Add the verified release link when available.

The interactive hero steps through learning, expansion, and training. Its width controls tile illustrative matrices at 1×, 2×, and 4×; depth controls build 6, 12, or 24 blocks with distinct first/last blocks. These controls are method illustrations, not performance predictions. Motion can be paused and respects reduced-motion preferences.

The header/footer logo and favicon depict a compact core expanding into a weight matrix. The blue accent matches the paper’s visual direction.

The page has no tracking, external scripts, analytics, or third-party embeds. Research claims, publication status, and citation details should be updated together if the manuscript changes.

Fonts: DM Sans and IBM Plex Mono, distributed under the SIL Open Font License; see `assets/font-licenses/`.
