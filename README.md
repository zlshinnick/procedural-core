# Procedural Core

Research project page for *Procedural Core: A Compact Recurrent Initialization for Vision Transformers* (preprint, 2026).

Public address: https://zlshinnick.github.io/procedural-core/

## Run locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173 to preview the preserved full research page, or http://localhost:4173/docs/ to preview the GitHub Pages production copy. No framework, build step, package installation, or remote runtime dependencies are required. Fonts are served locally.

## Publishing

GitHub Pages serves the `docs/` directory of the `main` branch at the public address above. The full, video-free production page and its referenced assets are mirrored from the repository root into `docs/`; the Pages source configuration is unchanged. Update both copies together when changing the production site. The root remains the editable local preview.

The production page retains the reference site's blue academic styling, local fonts, paper-correct copy, figures and interactive results. Standalone method videos and their renderers are not embedded or required by the site. All resource paths are relative to support project Pages URLs.

## Content and provenance

- `assets/procedural-core-paper.pdf`: the supplied manuscript, marked Preprint. The preserved supplied PDF remains available locally; primary reading links and citation now point to arXiv:2609.37631. No conference acceptance is claimed.
- Main ImageNet values: paper Figure 2, 300 epochs, mean ± standard deviation over three seeds.
- The supplied raw log endpoints differed slightly from Figure 2. The page consistently uses the paper's reported summary, not the raw log endpoints.
- Spatial-task values: rounded values reported in the manuscript.
- Language results: paper Figure 4; a separately trained architecture-compatible GPT-style core.
- `assets/heatmaps.json` and `assets/stimuli/`: original supplied activation data and unmodified RGB stimuli from `ECCV2026/christian/iclr_arrays.npz`. Each map is independently normalized per model, stimulus, and layer. Values rounded to five decimal places for size.
- `assets/method-sequence.mp4`: silent 45-second sequential explanation: abstract-data recurrence, matrix tiling, depth unrolling, then image training and paper-reported ImageNet performance. Diagrams are explanatory schematics. H.264, 1280×720, 24 fps.
- Code is labeled planned for release upon publication, matching the manuscript. Add the verified release link when available.

The interactive hero steps through learning, expansion, and training. Its width controls tile illustrative matrices at 1×, 2×, and 4×; depth controls build 6, 12, or 24 blocks with distinct first/last blocks. These controls are method illustrations, not performance predictions. Motion can be paused and respects reduced-motion preferences.

The header/footer logo and favicon depict a compact core expanding into a weight matrix. The blue accent matches the paper’s visual direction.

The page has no tracking, external scripts, analytics, or third-party embeds. Research claims, publication status, and citation details should be updated together if the manuscript changes.

Fonts: locally served Inter and Source Serif 4, plus the existing IBM Plex Mono assets; see `assets/font-licenses/`. Original DM Sans files are retained.

## Local production review — 2 October 2026

The `production-page` branch uses the light academic visual language of the verified reference https://zlshinnick.github.io/procedural-pretraining-page/ (linked by the personal homepage). The similarly named `/procedural-pretraining/` URL is not that website. Existing interactive demonstrations and original result datasets are preserved. `academic.css` contains the typography and shared layout refinements.

The unmodified Figure 1 asset from arXiv v1 (CC BY 4.0) is retained locally for reference; it is no longer displayed in the hero. Primary reading links go to the official arXiv PDF to avoid presenting an older supplied manuscript as current. The title and author order follow arXiv. Neither paper is described as accepted, and website source is not presented as released experiment code.

This review was initially local only. The October launch prepares the reviewed production page under the existing `main /docs` publishing source, following the author’s explicit publication request.

## Rebuilding the method animation

`tools/render-method-video.py` is the editable, deterministic local renderer. Install `tools/requirements-video.txt` into a Python environment, then run `python tools/render-method-video.py`. It writes the H.264 MP4 and first-scene poster into `assets/`; use `--stills-only` for review frames. All fonts and stimulus images are local. The 45-second, 24 fps animation uses Source Serif 4, Inter and JetBrains Mono with the reference blue/light theme. Matrix cells and flow pulses are explanatory schematics, not measured weights or training trajectories. Final accuracy and uncertainty come from the paper's ImageNet summary. English descriptive captions are available; no autoplay, and reduced-motion preferences disable looping.

The revised first scene visibly feeds balanced bracket sequences into the first block, then illustrates three recurrent passes through one shared middle block. The pass count is schematic. Width and depth expansion animate weight copies with minimal labels. The ending shows authentic per-token hidden-state norms from `assets/heatmaps.json`, for the golf-flag input, side by side at matching layers1–12. It uses the same color mapping as the site's interactive heatmap. Each map is independently normalized, so colors do not establish absolute norm differences across panels. These are token norms, not attention maps.

The method videos are standalone deliverables only. Video players, video captions, download links and playback hooks have been removed from the project page at the author's request. MP4s, posters, subtitle files and editable renderers are retained for separate use.
