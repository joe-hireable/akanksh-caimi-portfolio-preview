(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  const projects = data.projects;
  const positions = {abstention:[51,30],community:[80,49],pneumonia:[27,20],zappfix:[36,70],hostel:[62,75],riscv:[17,54],diabetes:[73.5,17]};
  const shortNames = {abstention:'LLM abstention',community:'Community bookings',pneumonia:'X-ray classification',zappfix:'ZAPPFIX',hostel:'Hostel portal',riscv:'RISC-V',diabetes:'Diabetes study'};
  const map = document.querySelector('.map');
  const nodes = document.getElementById('map-nodes');
  const list = document.getElementById('project-list');
  const dialog = document.getElementById('case-dialog');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = projects[0].id;
  let filter = 'All';
  let openId = null;
  let returnFocus = null;
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number = value => String(value + 1).padStart(2, '0');
  const visibleProjects = () => projects.filter(p => filter === 'All' || p.category === filter);
  const stack = items => items.map(item => `<span>${escapeHTML(item)}</span>`).join('');

  projects.forEach((project, index) => {
    const [x,y] = positions[project.id];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'map-node';
    button.dataset.project = project.id;
    button.style.setProperty('--x', `${x}%`);
    button.style.setProperty('--y', `${y}%`);
    button.setAttribute('aria-label', `Select ${project.subtitle}`);
    button.setAttribute('aria-pressed', String(project.id === selected));
    button.innerHTML = `<span class="node-dot" aria-hidden="true">${number(index)}</span><span class="node-label">${escapeHTML(shortNames[project.id])}</span>`;
    button.addEventListener('click', () => selectProject(project.id));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const visible = visibleProjects();
      const current = visible.findIndex(p => p.id === project.id);
      const target = event.key === 'Home' ? 0 : event.key === 'End' ? visible.length - 1 : (current + (['ArrowLeft','ArrowUp'].includes(event.key) ? -1 : 1) + visible.length) % visible.length;
      selectProject(visible[target].id);
      nodes.querySelector(`[data-project="${visible[target].id}"]`).focus();
    });
    nodes.append(button);
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'index-item';
    row.setAttribute('aria-label', `Read ${project.subtitle} case study`);
    row.innerHTML = `<span class="mono">${number(index)}</span><b>${escapeHTML(project.subtitle)}</b><small>${escapeHTML(project.category)} · ${escapeHTML(project.stack.slice(0,2).join(' / '))}</small><span aria-hidden="true">↗</span>`;
    row.addEventListener('click', () => openCase(project.id, row));
    list.append(row);
  });

  function selectProject(id, announce = true) {
    const project = projects.find(p => p.id === id);
    selected = id;
    nodes.querySelectorAll('.map-node').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.project === id)));
    document.getElementById('preview-number').textContent = `${number(projects.indexOf(project))} / ${String(projects.length).padStart(2,'0')}`;
    document.getElementById('preview-category').textContent = project.category;
    document.getElementById('preview-subtitle').textContent = project.subtitle;
    document.getElementById('preview-title').textContent = project.title;
    document.getElementById('preview-question').textContent = project.question;
    document.getElementById('preview-stack').innerHTML = stack(project.stack);
    document.getElementById('preview-status').textContent = project.status;
    document.getElementById('open-preview').setAttribute('aria-label', `Open ${project.subtitle} case study`);
    const preview = document.querySelector('.project-preview');
    preview.classList.remove('changing');
    if (!reducedMotion.matches) requestAnimationFrame(() => preview.classList.add('changing'));
    if (announce) document.getElementById('map-status').textContent = `${project.subtitle} selected. ${project.question}`;
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => {b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button));});
    nodes.querySelectorAll('.map-node').forEach(node => {node.hidden = !visibleProjects().some(p => p.id === node.dataset.project);});
    if (!visibleProjects().some(p => p.id === selected)) selectProject(visibleProjects()[0].id, false);
    document.getElementById('map-status').textContent = `${visibleProjects().length} ${filter === 'All' ? '' : filter + ' '}projects shown.`;
  }));

  function visual(project) {
    if (project.id === 'abstention') return `<section class="evidence-visual" aria-label="Reported Mistral results: threshold zero, 343 correct, 146 incorrect, 11 abstained; threshold 0.9, 198 correct, 15 incorrect, 287 abstained, out of 500 questions."><h3>Fewer errors. Fewer answers.</h3><p>Reported tuned Mistral results / 500 held-out TriviaQA questions</p><div class="bar-row"><div class="bar-meta"><span>Threshold 0</span><span>97.8% answered</span></div><div class="result-bar" aria-hidden="true"><span class="bar-correct" style="width:68.6%"></span><span class="bar-incorrect" style="width:29.2%"></span><span class="bar-abstain" style="width:2.2%"></span></div></div><div class="bar-row"><div class="bar-meta"><span>Threshold 0.9</span><span>42.6% answered</span></div><div class="result-bar" aria-hidden="true"><span class="bar-correct" style="width:39.6%"></span><span class="bar-incorrect" style="width:3%"></span><span class="bar-abstain" style="width:57.4%"></span></div></div><div class="legend"><span><i class="bar-correct"></i>Correct</span><span><i class="bar-incorrect"></i>Incorrect</span><span><i class="bar-abstain"></i>Abstained</span></div></section>`;
    const labels = project.id === 'community' ? ['Request','Validate','Review','Decide'] : project.id === 'riscv' ? ['Fetch','Decode','Execute','Write back'] : null;
    if (!labels) return '';
    return `<section class="evidence-visual"><h3>${project.id === 'community' ? 'A workflow with explicit states.' : 'From instruction to machine state.'}</h3><p>Illustrative flow / ${project.id === 'community' ? 'not a live booking system' : 'not a browser-based emulator'}</p><div class="workflow-visual">${labels.map((label,index) => `${index ? '<i aria-hidden="true">→</i>' : ''}<span><b>${number(index)}</b>${label}</span>`).join('')}</div></section>`;
  }

  function renderCase(id) {
    const project = projects.find(p => p.id === id);
    openId = id;
    const index = projects.indexOf(project);
    document.getElementById('case-location').textContent = `ATLAS / CASE ${number(index)}`;
    document.getElementById('case-count').textContent = `${number(index)} / ${String(projects.length).padStart(2,'0')}`;
    document.getElementById('case-content').innerHTML = `<div class="case-hero"><p class="eyebrow">${escapeHTML(project.status)}</p><h2 id="case-title" tabindex="-1">${escapeHTML(project.title)}</h2><p>${escapeHTML(project.question)}</p><div class="stack">${stack(project.stack)}</div></div><div class="case-body">${visual(project)}<section class="case-section"><h3>Contribution</h3><p>${escapeHTML(project.contribution)}</p></section><section class="case-section"><h3>Implementation</h3><p>${escapeHTML(project.implementation)}</p></section><section class="case-section"><h3>Evidence</h3><p>${escapeHTML(project.evidence)}</p></section><section class="case-section limit"><h3>Context & limits</h3><p>${escapeHTML(project.limits)}</p></section><div class="case-links">${project.links.map(link => `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)} <span aria-hidden="true">↗</span></a>`).join('')}</div></div>`;
    dialog.scrollTop = 0;
  }
  function openCase(id, trigger = document.activeElement) {
    returnFocus = trigger;
    renderCase(id);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.getElementById('close-case').focus({preventScroll:true});
  }
  function closeCase() { dialog.close(); }
  document.getElementById('open-preview').addEventListener('click', event => openCase(selected, event.currentTarget));
  document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openCase(button.dataset.open, button)));
  document.getElementById('close-case').addEventListener('click', closeCase);
  dialog.addEventListener('click', event => {if (event.target === dialog && event.clientX < dialog.getBoundingClientRect().left) closeCase();});
  dialog.addEventListener('close', () => {document.body.style.overflow = ''; openId = null; if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});});
  for (const [id,step] of [['previous-case',-1],['next-case',1]]) document.getElementById(id).addEventListener('click', () => {const index=projects.findIndex(p => p.id === openId);renderCase(projects[(index+step+projects.length)%projects.length].id);document.getElementById('case-title').focus({preventScroll:true});});
  map.addEventListener('pointermove', event => {if(reducedMotion.matches || event.pointerType !== 'mouse')return;const rect=map.getBoundingClientRect();map.style.setProperty('--px',((event.clientX-rect.left)/rect.width-.5).toFixed(2));map.style.setProperty('--py',((event.clientY-rect.top)/rect.height-.5).toFixed(2));});
  map.addEventListener('pointerleave', () => {map.style.setProperty('--px','0');map.style.setProperty('--py','0');});
  selectProject(selected, false);
})();
