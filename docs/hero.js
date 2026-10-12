/* Standalone interactive hero. No dependencies or global names. */
(() => {
  const root = document.getElementById('hero-explorer');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-hx-stage]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  function selectStage(stage, focusTab = false) {
    tabs.forEach((tab, index) => {
      const selected = tab.dataset.hxStage === stage;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[index].hidden = !selected;
      if (selected && focusTab) tab.focus();
    });
    root.dataset.stage = stage;
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectStage(tab.dataset.hxStage));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectStage(tabs[next].dataset.hxStage, true);
      }
    });
  });
  root.querySelectorAll('[data-hx-next]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => selectStage(button.dataset.hxNext, true));
  });
  root.querySelector('.hx-tabs').hidden = false;
  selectStage('learn');

  const widthInputs = [...root.querySelectorAll('input[name="hx-width"]')];
  const depthInput = root.querySelector('[data-hx-depth]');
  const tiles = root.querySelector('[data-hx-tiles]');
  const copies = root.querySelector('[data-hx-copies]');
  const middleLabel = root.querySelector('[data-hx-middle-label]');
  const status = root.querySelector('#hx-expand-status');
  function updateExpansion() {
    const multiplier = Number(widthInputs.find(input => input.checked).value);
    const depth = Number(depthInput.value);
    tiles.style.setProperty('--hx-multiplier', multiplier);
    const tileFragment = document.createDocumentFragment();
    for (let tile = 0; tile < multiplier * multiplier; tile++) {
      const matrix = document.createElement('div');
      matrix.className = 'hx-matrix';
      matrix.style.setProperty('--hx-tile-index', tile);
      for (let cell = 0; cell < 9; cell++) matrix.appendChild(document.createElement('i'));
      tileFragment.appendChild(matrix);
    }
    tiles.replaceChildren(tileFragment);
    const layerFragment = document.createDocumentFragment();
    for (let layer = 0; layer < depth - 2; layer++) {
      const block = document.createElement('i');
      block.style.setProperty('--hx-layer-index', layer);
      layerFragment.appendChild(block);
    }
    copies.replaceChildren(layerFragment);
    copies.dataset.depth = String(depth);
    middleLabel.textContent = `Middle × ${depth - 2}`;
    status.textContent = `${multiplier}× width · ${depth} target blocks · ${depth - 2} middle copies`;
  }
  widthInputs.forEach(input => input.addEventListener('change', updateExpansion));
  depthInput.addEventListener('change', updateExpansion);
  updateExpansion();

  const motionButton = root.querySelector('.hx-motion');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  function updateMotion() {
    const paused = reducedMotion.matches || userPaused || document.hidden;
    root.classList.toggle('hx-paused', paused);
    motionButton.disabled = reducedMotion.matches;
    motionButton.textContent = reducedMotion.matches ? 'Reduced motion' : userPaused ? '▷ Play motion' : 'Ⅱ Pause motion';
  }
  motionButton.addEventListener('click', () => { userPaused = !userPaused; updateMotion(); });
  reducedMotion.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  motionButton.hidden = false;
  updateMotion();
})();
