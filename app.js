/* Procedural Core. Static page; interactions use only the supplied research data. */
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next]); tabs[next].focus(); }
  });
});

const svg = document.getElementById('imagenet-chart');
const ns = 'http://www.w3.org/2000/svg';
function draw(tag, attrs, text) {
  const node = document.createElementNS(ns, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  if (text !== undefined) node.textContent = text;
  svg.appendChild(node);
  return node;
}
const x = value => 300 + (value - 76) * 108;
for (let tick = 76; tick <= 81; tick++) {
  draw('line', {x1:x(tick),x2:x(tick),y1:32,y2:271,stroke:'#2c3135','stroke-dasharray':'3 6'});
  draw('text', {x:x(tick),y:302,'text-anchor':'middle',fill:'#a6abae','font-size':14}, tick + '%');
}
const results = [{name:'Default initialization',mean:77.6,sd:.2},{name:'Mimetic initialization',mean:79.5,sd:.7},{name:'Procedural warm-up',mean:79.4,sd:.3},{name:'Procedural Core',mean:79.8,sd:.6}];
results.forEach((result, i) => {
  const y = 59 + i * 62;
  const color = i === 3 ? '#c6ff6b' : '#9ba7ac';
  if (i === 3) draw('rect', {x:0,y:y-28,width:977,height:56,rx:5,fill:'#c6ff6b09'});
  draw('text', {x:18,y:y+6,fill:i===3?'#c6ff6b':'#d5dad7','font-size':17},result.name);
  draw('line',{x1:x(result.mean-result.sd),x2:x(result.mean+result.sd),y1:y,y2:y,stroke:color,'stroke-width':2});
  [result.mean-result.sd,result.mean+result.sd].forEach(v => draw('line',{x1:x(v),x2:x(v),y1:y-7,y2:y+7,stroke:color,'stroke-width':2}));
  draw('circle',{cx:x(result.mean),cy:y,r:i===3?7:5,fill:color});
  draw('text',{x:965,y:y+5,fill:color,'font-size':17,'text-anchor':'end'},result.mean.toFixed(1)+' ± '+result.sd.toFixed(1));
});

const slider = document.getElementById('layer-slider');
const stimulusButtons = [...document.querySelectorAll('[data-stimulus]')];
let heatmaps;
let selectedStimulus = 0;
const colors = [[68,1,84],[65,68,135],[42,120,142],[34,168,132],[122,209,81],[253,231,37]];
function colorAt(value) {
  const pos = Math.max(0, Math.min(1, value)) * (colors.length - 1);
  const start = Math.min(Math.floor(pos), colors.length - 2);
  const fraction = pos - start;
  return 'rgb(' + colors[start].map((c,i)=>Math.round(c + (colors[start+1][i]-c)*fraction)).join(',') + ')';
}
function renderHeatmaps() {
  if (!heatmaps) return;
  const layer = Number(slider.value) - 1;
  const stimulus = heatmaps.stimuli[selectedStimulus];
  const input = document.getElementById('stimulus-image');
  input.src = 'assets/stimuli/' + stimulus.source_stimulus_index + '.png';
  input.alt = stimulus.label + ' example used in the token-norm experiment';
  [['baseline','baseline-map','Default initialization'],['procedural','core-map','Procedural Core']].forEach(([model,id,label]) => {
    const canvas = document.getElementById(id);
    const context = canvas.getContext('2d');
    const grid = stimulus.models[model][layer];
    grid.forEach((row,y)=>row.forEach((value,x)=>{context.fillStyle=colorAt(value);context.fillRect(x*20,y*20,20,20);}));
    canvas.setAttribute('aria-label', label + ' normalized token norms for ' + stimulus.label + ', layer ' + (layer+1) + ' of 12. Independently normalized.');
  });
  document.getElementById('layer-output').textContent = (layer + 1) + ' / 12';
  document.getElementById('map-status').textContent = stimulus.label + ' · Layer ' + (layer + 1) + ' of 12';
}
slider.addEventListener('input', renderHeatmaps);
stimulusButtons.forEach(button => button.addEventListener('click', () => {
  selectedStimulus = Number(button.dataset.stimulus);
  stimulusButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  renderHeatmaps();
}));
fetch('assets/heatmaps.json').then(response => { if(!response.ok) throw new Error('Unavailable'); return response.json(); }).then(data => {heatmaps = data;renderHeatmaps();}).catch(() => {
  document.getElementById('map-status').textContent = 'Activation maps could not load. Please reload, or see the figures in the paper.';
  slider.disabled = true;
  stimulusButtons.forEach(button=>button.disabled=true);
});

const copyButton = document.getElementById('copy-citation');
copyButton.addEventListener('click', async () => {
  const citation = document.getElementById('bibtex').textContent;
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(citation);
    status.textContent = 'BibTeX copied to clipboard.';
    copyButton.innerHTML = 'Copied <span aria-hidden="true">✓</span>';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('bibtex'));
    const selection = window.getSelection();
    selection.removeAllRanges(); selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
  }
});
const video = document.getElementById('method-video');
document.addEventListener('visibilitychange', () => {if(document.hidden) video.pause();});
