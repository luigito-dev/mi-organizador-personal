/* ========== Iconos ========== */
const IC = {
  dia: '<path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/><circle cx="12" cy="12" r="4"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  areas: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  rutina: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M4 20v-5h5"/>',
  tareas: '<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/>',
  enfoque: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
  notas: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  progreso: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  config: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  mas: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'
};
const ic = (k, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;
const LOGO = `<svg width="34" height="34" viewBox="0 0 40 40"><rect x="4" y="7" width="32" height="29" rx="6" fill="#fff"/><rect x="4" y="7" width="32" height="9" rx="4" fill="#f08a24"/><rect x="4" y="12" width="32" height="4" fill="#f08a24"/><rect x="11" y="3" width="4" height="8" rx="2" fill="#fff" stroke="#174a96" stroke-width="1.5"/><rect x="25" y="3" width="4" height="8" rx="2" fill="#fff" stroke="#174a96" stroke-width="1.5"/><path d="M12.5 25.5l5 5 10-10" fill="none" stroke="#1f5fbf" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SECTIONS = [
  ['dia', 'Mi Día', 'dia'], ['calendario', 'Calendario', 'cal'], ['areas', 'Áreas', 'areas'], ['rutina', 'Rutina semanal', 'rutina'],
  ['tareas', 'Tareas', 'tareas'], ['enfoque', 'Enfoque', 'enfoque'], ['notas', 'Mis notas', 'notas'], ['progreso', 'Progreso', 'progreso'], ['config', 'Configuración', 'config']
];
const UI = {view: 'dia', q: '', calDate: todayISO(), selDate: todayISO(), sumTab: 'hoy', taskTab: 'todo', filters: {area: '', type: '', prio: '', sort: 'fecha'}, showHiddenNotes: false, taskMode: 'tareas', openList: null, openArea: null, areaType: '', motivHidden: false, motiv: '', qWhen: 'hoy', qDate: null};
const isMobile = () => window.matchMedia('(max-width:820px)').matches;

/* ========== Estructura ========== */
function shell() {
  document.body.innerHTML = `<div class="app">
    <aside class="side"><div class="brand">${LOGO}<span>Mi Organizador<br>Personal</span></div><nav class="nav" id="nav">${SECTIONS.map(([k, n, i]) => `<button data-go="${k}">${ic(i)}${n}</button>`).join('')}</nav><div class="store storeLbl"></div></aside>
    <main class="main"><header class="top"><h1 id="vt"></h1><div class="search" id="sbox">${ic('search', 'si')}<input id="q" type="search" placeholder="Buscar…" autocomplete="off" aria-label="Buscar"><button class="sx hidden" id="qx" aria-label="Borrar">✕</button><div class="results hidden" id="res"></div></div></header>
    <section class="view" id="view"></section></main>
    <nav class="bottom" id="bnav">${[['dia', 'Mi Día', 'dia'], ['calendario', 'Calendario', 'cal'], ['tareas', 'Tareas', 'tareas'], ['notas', 'Notas', 'notas'], ['mas', 'Más', 'mas']].map(([k, n, i]) => `<button data-go="${k}">${ic(i)}${n}</button>`).join('')}</nav>
    <button class="fab" id="fab" aria-label="Añadir">+</button><div id="mini"></div><div class="toasts" id="toasts"></div></div>`;
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-go]'); if (!g) return;
    if (g.dataset.go === 'mas') { openMore(); return; }
    go(g.dataset.go);
  });
  $('#fab').onclick = () => {
    if (UI.view === 'calendario') openEventForm(null, {date: UI.selDate});
    else if (UI.view === 'notas') { const t = $('#nNew'); if (t) t.focus(); }
    else if (UI.view === 'areas' && !UI.openArea) openAreaForm();
    else if (UI.view === 'rutina') openRoutineForm();
    else if (UI.view === 'tareas' && UI.taskMode === 'listas') { if (UI.openList && listById(UI.openList)) { const a = $('#liAdd'); a && a.focus(); } else openListForm(); }
    else openTaskForm(null, {areaId: UI.view === 'areas' ? UI.openArea : null});
  };
  const q = $('#q');
  q.addEventListener('input', () => { UI.q = q.value; $('#qx').classList.toggle('hidden', !UI.q); if (UI.view === 'tareas' || UI.view === 'notas') renderView(); else globalResults(); });
  q.addEventListener('focus', () => { if (UI.q && UI.view !== 'tareas' && UI.view !== 'notas') globalResults(); });
  $('#qx').onclick = () => { q.value = ''; UI.q = ''; $('#qx').classList.add('hidden'); $('#res').classList.add('hidden'); renderView(); };
  document.addEventListener('click', e => { if (!e.target.closest('#sbox')) $('#res').classList.add('hidden'); });
  // Al abrir el teclado del teléfono solo cambia el alto: no redibujar (borraría lo que se escribe)
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    clearTimeout(window._rz);
    window._rz = setTimeout(() => {
      if (window.innerWidth === lastW) return;
      const a = document.activeElement; if (a && /INPUT|TEXTAREA/.test(a.tagName) && $('#view').contains(a)) return;
      lastW = window.innerWidth; renderView();
    }, 150);
  });
}
function go(v) {
  if (v === 'dia' && UI.view !== 'dia') { UI.motiv = nextMotiv(); UI.motivHidden = false; clearTimeout(motivTimer); motivTimer = null; }
  UI.view = v; if (v !== 'areas') UI.openArea = null; if (v !== 'tareas') UI.openList = null;
  UI.q = ''; $('#q').value = ''; $('#qx').classList.add('hidden'); $('#res').classList.add('hidden');
  sheets.slice().forEach(s => s.close());
  render(); window.scrollTo(0, 0);
}
function openMore() {
  const s = openSheet({title: 'Más', body: `<div class="more-grid">${SECTIONS.filter(x => !['dia', 'calendario', 'tareas', 'notas'].includes(x[0])).map(([k, n, i]) => `<button data-m="${k}">${ic(i)}${n}</button>`).join('')}</div><p class="xs muted storeLbl" style="text-align:center;margin-top:16px"></p>`,
    onMount: el => { setStoreLabel(); el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { s.close(); go(b.dataset.m); }); }});
}
function render() {
  const sec = SECTIONS.find(x => x[0] === UI.view);
  $('#vt').textContent = sec ? sec[1] : '';
  $$('#nav [data-go]').forEach(b => b.classList.toggle('on', b.dataset.go === UI.view));
  $$('#bnav [data-go]').forEach(b => b.classList.toggle('on', b.dataset.go === UI.view || (b.dataset.go === 'mas' && !['dia', 'calendario', 'tareas', 'notas'].includes(UI.view))));
  $('#sbox').classList.toggle('hidden', UI.view === 'enfoque');
  $('#q').placeholder = UI.view === 'tareas' ? (UI.taskMode === 'listas' ? 'Buscar en listas…' : 'Buscar en tareas…') : UI.view === 'notas' ? 'Buscar en notas…' : 'Buscar en toda la app…';
  $('#fab').classList.toggle('hidden', ['enfoque', 'progreso', 'config'].includes(UI.view));
  renderView(); renderMini(); setStoreLabel();
}
function renderView() {
  const v = $('#view');
  const fn = {dia: vDia, calendario: vCal, areas: vAreas, rutina: vRutina, tareas: vTareas, enfoque: vEnfoque, notas: vNotas, progreso: vProgreso, config: vConfig}[UI.view];
  v.innerHTML = ''; fn(v);
}

/* ========== Búsqueda global ========== */
function globalResults() {
  const box = $('#res'); const q = norm(UI.q.trim());
  if (!q) { box.classList.add('hidden'); return; }
  const m = s => norm(s || '').includes(q);
  const tk = S.tasks.filter(t => m(t.title) || m(t.details) || m(t.obs)).slice(0, 8);
  const ev = S.events.filter(e => m(e.title) || m(e.place) || m(e.note)).slice(0, 8);
  const nt = S.notes.filter(n => m(n.text) || m(n.category)).slice(0, 8);
  const ar = S.areas.filter(a => m(a.name) || m(a.obs) || m(a.contact) || m(a.place)).slice(0, 5);
  const rt = S.routines.filter(r => m(r.name) || m(r.place)).slice(0, 5);
  const ls = S.lists.filter(l => m(l.name) || l.items.some(i => m(i.t))).slice(0, 6);
  let h = '';
  if (ls.length) h += '<div class="grp">Listas</div>' + ls.map(l => { const hit = l.items.find(i => m(i.t)); return `<button data-r="l:${l.id}"><span>${l.icon}</span><span class="sp">${esc(l.name)}${hit && !m(l.name) ? ` <span class="xs muted">· ${esc(hit.t)}</span>` : ''}</span><span class="xs muted">${l.items.filter(i => !i.done).length} por hacer</span></button>`; }).join('');
  if (tk.length) h += '<div class="grp">Tareas</div>' + tk.map(t => `<button data-r="t:${t.id}"><span>${typeById(t.typeId).icon}</span><span class="sp ${isDone(t) ? 'muted' : ''}">${esc(t.title)}</span><span class="xs muted">${fmtShort(t.date)}</span></button>`).join('');
  if (ev.length) h += '<div class="grp">Eventos</div>' + ev.map(e => `<button data-r="e:${e.id}"><span>${evType(e.evType).icon}</span><span class="sp">${esc(e.title)}</span><span class="xs muted">${fmtShort(e.date)}</span></button>`).join('');
  if (rt.length) h += '<div class="grp">Rutinas</div>' + rt.map(r => `<button data-r="r:${r.id}"><span>🔁</span><span class="sp">${esc(r.name)}</span><span class="xs muted">${r.days.map(d => DCORTO[d]).join(', ')}</span></button>`).join('');
  if (nt.length) h += '<div class="grp">Notas</div>' + nt.map(n => `<button data-r="n:${n.id}"><span>🗒️</span><span class="sp">${esc(noteTitle(n))}</span><span class="xs muted">${fmtShort(n.date)}</span></button>`).join('');
  if (ar.length) h += '<div class="grp">Áreas</div>' + ar.map(a => `<button data-r="a:${a.id}"><span class="dot" style="background:${a.color}"></span><span class="sp">${esc(a.name)}</span></button>`).join('');
  box.innerHTML = h || '<div class="empty small">No encontré nada con “' + esc(UI.q) + '”.</div>';
  box.classList.remove('hidden');
  box.querySelectorAll('[data-r]').forEach(b => b.onclick = () => {
    const [k, id] = b.dataset.r.split(':'); box.classList.add('hidden');
    if (k === 't') openTaskDetail(id); else if (k === 'e') openEventDetail(id); else if (k === 'n') openNote(id);
    else if (k === 'r') openRoutineForm(S.routines.find(x => x.id === id)); else if (k === 'l') { go('tareas'); UI.taskMode = 'listas'; UI.openList = id; render(); } else if (k === 'a') { UI.openArea = id; UI.view = 'areas'; render(); }
  });
}

/* ========== Elementos de lista ========== */
function itemHTML(k, x, opt = {}) {
  if (k === 'tk') {
    const ty = typeById(x.typeId), a = areaById(x.areaId), late = isLate(x);
    const st = x.steps && x.steps.length ? `<span>☑ ${x.steps.filter(s => s.done).length}/${x.steps.length}</span>` : '';
    return `<div class="item ${isDone(x) ? 'done' : ''}" data-tk="${x.id}"><span class="bar" style="background:${a ? a.color : ty.color}"></span><button class="check ${isDone(x) ? 'on' : ''}" data-chk="${x.id}" aria-label="Completar">${isDone(x) ? '✓' : ''}</button><span class="em">${ty.icon}</span>
      <div class="body"><div class="t">${esc(x.title)}</div><div class="m">${opt.date ? `<span class="${late ? 'late' : ''}">${fmtShort(x.date)}</span>` : ''}${x.time ? `<span>🕒 ${fmtTime(x.time)}</span>` : ''}${late && !opt.date ? '<span class="late">Atrasada</span>' : ''}${a ? `<span class="tag"><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</span>` : ''}${x.priority !== 'Media' ? `<span class="prio ${x.priority}">${x.priority}</span>` : ''}${x.status === 'En progreso' ? '<span class="tag">En progreso</span>' : ''}${st}${x.reminder != null ? '<span class="bell">🔔</span>' : ''}</div></div></div>`;
  }
  if (k === 'ev') {
    const t = evType(x.evType), a = areaById(x.areaId);
    return `<div class="item ev" data-ev="${x.id}"><span class="bar" style="background:${colorOf('ev', x)}"></span><span class="em">${t.icon}</span><div class="body"><div class="t">${esc(x.title)}</div><div class="m">${opt.date ? `<span>${fmtShort(x.date)}</span>` : ''}<span>${x.allDay ? 'Todo el día' : fmtTime(x.start) + ' – ' + fmtTime(x.end)}</span>${x.place ? `<span>📍 ${esc(x.place)}</span>` : ''}${a ? `<span class="tag"><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</span>` : ''}${x.reminder != null ? '<span class="bell">🔔</span>' : ''}</div></div></div>`;
  }
  const a = areaById(x.areaId);
  return `<div class="item rt" data-rt="${x.id}"><span class="bar" style="background:${colorOf('rt', x)}"></span><span class="em">🔁</span><div class="body"><div class="t">${esc(x.name)}</div><div class="m"><span>${fmtTime(x.start)} – ${fmtTime(x.end)}</span>${x.place ? `<span>📍 ${esc(x.place)}</span>` : ''}${a ? `<span class="tag"><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</span>` : ''}<span>Rutina</span></div></div></div>`;
}
function wireItems(root) {
  root.querySelectorAll('[data-chk]').forEach(b => b.onclick = e => { e.stopPropagation(); const t = S.tasks.find(x => x.id === b.dataset.chk); setDone(t.id, !isDone(t)); });
  root.querySelectorAll('[data-tk]').forEach(b => b.onclick = () => openTaskDetail(b.dataset.tk));
  root.querySelectorAll('[data-ev]').forEach(b => b.onclick = e => { e.stopPropagation(); openEventDetail(b.dataset.ev); });
  root.querySelectorAll('[data-rt]').forEach(b => b.onclick = e => { e.stopPropagation(); openRoutineForm(S.routines.find(x => x.id === b.dataset.rt)); });
}

/* ========== MI DÍA ========== */
function greeting() { const h = new Date().getHours(); return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'; }
function weekProgress() {
  const wd = weekDays(todayISO()); const tk = S.tasks.filter(t => wd.includes(t.date));
  return [tk.filter(isDone).length, tk.length];
}
function ringSVG(done, total, size = 74, stroke = 7, color = '#fff', bg = 'rgba(255,255,255,.25)') {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, p = total ? done / total : 0;
  return `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke="${bg}" stroke-width="${stroke}" fill="none"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke="${color}" stroke-width="${stroke}" fill="none" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}" style="transition:stroke-dashoffset .4s"/></svg>`;
}
function rangeDays(tab) {
  const t = todayISO();
  if (tab === 'hoy') return [t];
  if (tab === 'man') return [addDays(t, 1)];
  if (tab === 'sem') { const w = weekDays(t); return w.filter(d => d >= t); }
  return weekDays(addDays(weekStartOf(t), 7));
}
let motivTimer = null;
function vDia(v) {
  const [wd, wt] = weekProgress();
  const days = rangeDays(UI.sumTab);
  const now = nowMin(), t = todayISO();
  const nextIt = sortedDay(t).find(i => (i.k === 'ev' && !i.x.allDay && toMin(i.x.end) > now) || (i.k === 'rt' && toMin(i.x.end) > now) || (i.k === 'tk' && i.x.time && toMin(i.x.time) >= now - 15));
  const inRange = d => days.includes(d);
  const pend = S.tasks.filter(x => inRange(x.date) && !isDone(x)).length;
  const comp = S.tasks.filter(x => inRange(x.date) && isDone(x)).length;
  const late = S.tasks.filter(isLate).length;
  const upc = S.events.filter(e => inRange(e.date) && (e.date > t || e.allDay || toMin(e.end) > now)).length;
  const lim = addDays(t, 60);
  const citas = S.events.filter(e => e.date >= t && e.date <= lim && (e.date > t || e.allDay || toMin(e.end) > now)).sort((a, b) => (a.date + (a.start || '')).localeCompare(b.date + (b.start || ''))).slice(0, 5);
  const rems = [...S.tasks.filter(x => x.reminder != null && !isDone(x) && x.date >= t).map(x => ['tk', x, x.date + (x.time || '')]), ...S.events.filter(e => e.reminder != null && e.date >= t).map(e => ['ev', e, e.date + (e.start || '')])].sort((a, b) => a[2].localeCompare(b[2])).slice(0, 5);
  const doneList = S.tasks.filter(x => isDone(x) && (UI.sumTab === 'hoy' ? x.date === t || (x.completedAt && iso(new Date(x.completedAt)) === t) : inRange(x.date))).sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0)).slice(0, 8);
  const dt = new Date();
  v.innerHTML = `
    <div class="hero"><div class="hero-main"><div class="hero-top"><div><div class="date">${cap(DIAS[dt.getDay()])}, ${dt.getDate()} de ${MESES[dt.getMonth()]} de ${dt.getFullYear()}</div><div class="hi">${greeting()} 👋</div></div>
      <div class="ring" title="Avance de la semana">${ringSVG(wd, wt)}<div class="lbl">${wd}/${wt}<small>semana</small></div></div></div>
      ${UI.motivHidden ? '' : `<div class="hero-msg" id="motiv"><button class="x" id="mX" aria-label="Cerrar mensaje">✕</button><p>✨ ${esc(UI.motiv)}</p><div class="row wrap"><button class="btn sm hb1" id="m1">Organizar mi día</button><button class="btn sm hb2" id="m2">Planificar mi semana</button><button class="btn sm hb2" id="m3">Modo enfoque</button></div></div>`}</div></div>
    <div class="card quick"><h3>¿Qué tienes pendiente?</h3><div class="in"><input id="qIn" placeholder="Ej. cita con el dentista a las 3 pm" maxlength="140"><button class="btn" id="qAdd">Añadir</button></div>
      <div class="row wrap" style="margin-top:8px"><button class="chip" data-qw="hoy">Hoy</button><button class="chip" data-qw="man">Mañana</button><button class="chip" data-qw="otra">Otra fecha</button><input type="date" id="qDate" class="inp" style="width:auto;padding:5px 10px;display:none"></div><div class="hint" id="qHint"></div></div>
    ${nextIt ? `<div class="next"><span style="font-size:22px">${nextIt.k === 'ev' ? evType(nextIt.x.evType).icon : nextIt.k === 'rt' ? '🔁' : typeById(nextIt.x.typeId).icon}</span><div class="sp"><div class="k">Lo próximo</div><div style="font-weight:600">${esc(nextIt.x.title || nextIt.x.name)}</div></div><b>${fmtTime(nextIt.k === 'tk' ? nextIt.x.time : nextIt.x.start)}</b></div>`
      : `<div class="next"><span style="font-size:22px">🌿</span><div class="sp"><div class="k">Lo próximo</div><div>No tienes nada más con hora hoy.</div></div></div>`}
    <div class="grid g2" style="margin-top:14px">
      <div class="card"><h3>Tu resumen</h3><div class="chips">${[['hoy', 'Hoy'], ['man', 'Mañana'], ['sem', 'Semana'], ['prox', 'Próxima']].map(([k, n]) => `<button class="chip ${UI.sumTab === k ? 'on' : ''}" data-st="${k}">${n}</button>`).join('')}</div>
        <div class="stats"><div class="stat"><b>${pend}</b><span>Pendientes</span></div><div class="stat ok"><b>${comp}</b><span>Completadas</span></div><div class="stat ${late ? 'warn' : ''}"><b>${late}</b><span>Atrasadas</span></div><div class="stat"><b>${upc}</b><span>Próximos compromisos</span></div></div>
        ${late ? `<button class="btn sec sm" id="seeLate" style="margin-bottom:6px">⚠️ Ver ${late} atrasada${late === 1 ? '' : 's'}</button>` : ''}
        <div id="agenda"></div></div>
      <div class="grid" style="align-content:start">
        <div class="card"><h3>📅 Próximas citas</h3>${citas.length ? citas.map(e => itemHTML('ev', e, {date: true})).join('') : '<div class="muted small">Nada agendado por ahora.</div>'}</div>
        <div class="card"><h3>🔔 Recordatorios personales</h3>${rems.length ? rems.map(([k, x]) => itemHTML(k, x, {date: true})).join('') : '<div class="muted small">Enciende la campanita 🔔 en una tarea o evento para verla aquí.</div>'}</div>
        <div class="card"><h3>✅ Completadas</h3>${doneList.length ? doneList.map(x => itemHTML('tk', x)).join('') : '<div class="muted small">Lo que completes aparecerá aquí.</div>'}</div>
      </div></div>`;
  const ag = $('#agenda', v);
  ag.innerHTML = days.map(d => {
    const its = sortedDay(d); const ho = holidaysOn(d);
    const lbl = d === t ? 'Hoy · ' + fmtLong(d) : d === addDays(t, 1) ? 'Mañana · ' + fmtLong(d) : fmtLong(d);
    return `<div class="dayblock"><div class="dayhead">${lbl}${ho.map(h => `<span class="tag" style="background:var(--holi);color:var(--holiText)">🎉 ${esc(h.name)}</span>`).join('')}</div>${its.length ? its.map(i => itemHTML(i.k, i.x)).join('') : '<div class="alldone">✓ Todo listo</div>'}</div>`;
  }).join('');
  wireItems(v);
  // Motivación
  if (!UI.motivHidden) {
    if (!motivTimer) motivTimer = setTimeout(() => { UI.motivHidden = true; const m = $('#motiv'); if (m) m.remove(); }, 60000);
    $('#mX', v).onclick = () => { UI.motivHidden = true; $('#motiv').remove(); };
    $('#m1', v).onclick = () => { UI.sumTab = 'hoy'; renderView(); $('#qIn').focus(); };
    $('#m2', v).onclick = () => { S.settings.calView = 'week'; UI.calDate = todayISO(); save('meta'); go('calendario'); setTimeout(() => { const p = $('#planner'); p && p.scrollIntoView({behavior: 'smooth'}); }, 80); };
    $('#m3', v).onclick = () => go('enfoque');
  }
  v.querySelectorAll('[data-st]').forEach(b => b.onclick = () => { UI.sumTab = b.dataset.st; renderView(); });
  const sl = $('#seeLate', v); if (sl) sl.onclick = () => { UI.taskTab = 'late'; go('tareas'); };
  // Entrada rápida
  const qIn = $('#qIn', v), hint = $('#qHint', v), qd = $('#qDate', v);
  const paintQW = () => { v.querySelectorAll('[data-qw]').forEach(b => b.classList.toggle('on', b.dataset.qw === UI.qWhen)); qd.style.display = UI.qWhen === 'otra' ? '' : 'none'; if (UI.qWhen === 'otra') qd.value = UI.qDate || addDays(t, 2); };
  paintQW();
  v.querySelectorAll('[data-qw]').forEach(b => b.onclick = () => { UI.qWhen = b.dataset.qw; if (UI.qWhen === 'otra' && !UI.qDate) UI.qDate = addDays(t, 2); paintQW(); if (UI.qWhen === 'otra') { try { qd.showPicker && qd.showPicker(); } catch (e) {} } qIn.focus(); });
  qd.onchange = () => UI.qDate = qd.value;
  const showHint = () => {
    const tx = qIn.value.trim(); if (!tx) { hint.textContent = ''; return; }
    const g = guess(tx); const a = areaById(g.areaId); const ty = typeById(g.typeId);
    hint.textContent = `Se guardará como ${ty.icon} ${ty.name}${a ? ' en ' + a.name : ''}${g.time ? ' a las ' + fmtTime(g.time) : ''}`;
  };
  qIn.oninput = showHint;
  const addQ = () => {
    const tx = qIn.value.trim(); if (!tx) { qIn.focus(); return; }
    const g = guess(tx);
    const date = UI.qWhen === 'hoy' ? t : UI.qWhen === 'man' ? addDays(t, 1) : (qd.value || UI.qDate || addDays(t, 2));
    S.tasks.push({id: uid(), title: tx, date, time: g.time, typeId: g.typeId, areaId: g.areaId, priority: 'Media', details: '', steps: [], status: 'Pendiente', obs: '', reminder: null, createdAt: Date.now()});
    save('tasks'); toast(`Añadido para ${date === t ? 'hoy' : date === addDays(t, 1) ? 'mañana' : fmtShort(date)} ✓`);
    renderView(); setTimeout(() => { const n = $('#qIn'); n && n.focus(); }, 0);
  };
  $('#qAdd', v).onclick = addQ;
  qIn.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); addQ(); } };
}

/* ========== CALENDARIO ========== */
function calTitle(view, d) {
  const dd = parseISO(d);
  if (view === 'month') return cap(MESES[dd.getMonth()]) + ' ' + dd.getFullYear();
  if (view === 'day') return fmtLong(d) + ' ' + dd.getFullYear();
  const w = weekDays8(d); const a = parseISO(w[0]), b = parseISO(w[7]);
  return a.getMonth() === b.getMonth() ? `${a.getDate()} – ${b.getDate()} de ${MESES[b.getMonth()]} ${b.getFullYear()}` : `${a.getDate()} ${MESES[a.getMonth()].slice(0, 3)} – ${b.getDate()} ${MESES[b.getMonth()].slice(0, 3)} ${b.getFullYear()}`;
}
function monthCells(d) {
  const dd = parseISO(d); const first = iso(new Date(dd.getFullYear(), dd.getMonth(), 1));
  const st = weekStartOf(first); const cells = [];
  for (let i = 0; i < 42; i++) cells.push(addDays(st, i));
  const lastRowStart = cells[35]; if (parseISO(lastRowStart).getMonth() !== dd.getMonth()) cells.length = 35;
  return cells;
}
const wdHeaders = () => [0,1,2,3,4,5,6].map(i => DCORTO[(i + S.settings.weekStart) % 7]);
function vCal(v) {
  const view = S.settings.calView || 'month', d = UI.calDate;
  v.innerHTML = `<div class="cal-wrap"><div class="cal-side"><div class="card mini" id="mini1"></div><div class="card" style="margin-top:12px"><h3>Mis áreas</h3><div class="areas-list" id="aList"></div></div></div>
    <div><div class="calbar"><button class="iconbtn" id="cPrev" aria-label="Anterior">‹</button><button class="iconbtn" id="cNext" aria-label="Siguiente">›</button><button class="btn sec sm" id="cToday">Hoy</button><h2>${calTitle(view, d)}</h2><span class="sp"></span>
      <div class="seg">${[['month', 'Mes'], ['week', 'Semana'], ['day', 'Día']].map(([k, n]) => `<button data-cv="${k}" class="${view === k ? 'on' : ''}">${n}</button>`).join('')}</div></div>
      <div id="calBody"></div><div id="calExtra"></div></div></div>`;
  // Minicalendario
  const mc = monthCells(d), md = parseISO(d);
  $('#mini1', v).innerHTML = `<div class="mh"><button class="btn ghost sm" id="mp">‹</button><span>${cap(MESES[md.getMonth()])} ${md.getFullYear()}</span><button class="btn ghost sm" id="mn">›</button></div><div class="mg">${wdHeaders().map(w => `<span class="muted">${w[0].toUpperCase()}</span>`).join('')}${mc.map(c => { const it = itemsOn(c); const has = it.ev.length + it.tk.length; return `<button data-md="${c}" class="${parseISO(c).getMonth() !== md.getMonth() ? 'out' : ''} ${c === todayISO() ? 'today' : ''} ${c === UI.selDate ? 'sel' : ''} ${has ? 'has' : ''}">${parseISO(c).getDate()}</button>`; }).join('')}</div>`;
  $('#mp', v).onclick = () => { const x = parseISO(d); x.setMonth(x.getMonth() - 1, 1); UI.calDate = iso(x); renderView(); };
  $('#mn', v).onclick = () => { const x = parseISO(d); x.setMonth(x.getMonth() + 1, 1); UI.calDate = iso(x); renderView(); };
  v.querySelectorAll('[data-md]').forEach(b => b.onclick = () => { UI.calDate = UI.selDate = b.dataset.md; renderView(); });
  $('#aList', v).innerHTML = S.areas.length ? S.areas.map(a => `<label><input type="checkbox" data-ha="${a.id}" ${areaVisible(a.id) ? 'checked' : ''}><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</label>`).join('') : '<div class="muted small">Aún no tienes áreas. Créalas en la sección Áreas.</div>';
  v.querySelectorAll('[data-ha]').forEach(c => c.onchange = () => { const id = c.dataset.ha; S.settings.hiddenAreas = c.checked ? S.settings.hiddenAreas.filter(x => x !== id) : [...S.settings.hiddenAreas, id]; save('meta'); renderView(); });
  // Navegación
  const step = n => { const x = parseISO(d); if (view === 'month') x.setMonth(x.getMonth() + n, 1); else x.setDate(x.getDate() + (view === 'week' ? 7 : 1) * n); UI.calDate = iso(x); if (view === 'day') UI.selDate = UI.calDate; renderView(); };
  $('#cPrev', v).onclick = () => step(-1); $('#cNext', v).onclick = () => step(1);
  $('#cToday', v).onclick = () => { UI.calDate = UI.selDate = todayISO(); renderView(); };
  v.querySelectorAll('[data-cv]').forEach(b => b.onclick = () => { S.settings.calView = b.dataset.cv; if (b.dataset.cv !== 'month') UI.calDate = UI.selDate; save('meta'); renderView(); });
  const body = $('#calBody', v), extra = $('#calExtra', v);
  if (view === 'month') { calMonth(body, d); extra.innerHTML = '<div class="daypanel card" id="dp"></div>'; dayPanel($('#dp', v), UI.selDate); }
  else if (view === 'week') { calWeek(body, d); planner(extra, d); }
  else { UI.selDate = d; calDay(body, d); extra.innerHTML = '<div class="daypanel card" id="dp"></div>'; dayPanel($('#dp', v), d); }
}
function pillHTML(i) {
  const c = colorOf(i.k, i.x);
  if (i.k === 'ev') return `<span class="pill ev" style="background:${c}" data-ev="${i.x.id}">${evType(i.x.evType).icon} ${i.x.allDay ? '' : fmtTime(i.x.start).replace(/:00| /g, '').replace('a.m.', 'a').replace('p.m.', 'p') + ' '}${esc(i.x.title)}</span>`;
  if (i.k === 'tk') return `<span class="pill tk ${isDone(i.x) ? 'done' : ''}" style="border-color:${c}" data-tk="${i.x.id}">${typeById(i.x.typeId).icon} ${esc(i.x.title)}</span>`;
  return `<span class="pill rt" style="border-color:${c}" data-rt="${i.x.id}">🔁 ${esc(i.x.name)}</span>`;
}
function calMonth(body, d) {
  const cells = monthCells(d), m = parseISO(d).getMonth(), max = isMobile() ? 2 : 3;
  body.innerHTML = `<div class="month">${wdHeaders().map(w => `<div class="wd">${w}</div>`).join('')}${cells.map(c => {
    const its = sortedDay(c, {withDone: true}); const ho = holidaysOn(c);
    const pills = [...ho.map(h => `<span class="pill ho" title="${esc(h.name)}">🎉 ${esc(h.name)}</span>`), ...its.map(pillHTML)];
    return `<div class="mcell ${parseISO(c).getMonth() !== m ? 'out' : ''} ${c === todayISO() ? 'today' : ''} ${c === UI.selDate ? 'sel' : ''} ${ho.length ? 'holi' : ''}" data-day="${c}"><div class="n">${parseISO(c).getDate()}</div>${pills.slice(0, max).join('')}${pills.length > max ? `<div class="more">+${pills.length - max} más</div>` : ''}<div class="dots2">${its.slice(0, 6).map(i => `<i style="background:${colorOf(i.k, i.x)}"></i>`).join('')}</div></div>`;
  }).join('')}</div>`;
  body.querySelectorAll('[data-day]').forEach(c => c.onclick = e => {
    if (e.target.closest('[data-ev],[data-tk],[data-rt]') && !isMobile()) return;
    const day = c.dataset.day;
    if (UI.selDate === day) { openEventForm(null, {date: day}, 'month'); return; }
    UI.selDate = day; if (parseISO(day).getMonth() !== m) UI.calDate = day;
    renderView(); if (isMobile()) setTimeout(() => { const p = $('#dp'); p && p.scrollIntoView({behavior: 'smooth', block: 'nearest'}); }, 50);
  });
  if (!isMobile()) wireItems(body);
}
function dayPanel(el, d) {
  const its = sortedDay(d, {withDone: true}); const ho = holidaysOn(d);
  el.innerHTML = `<h3>${fmtLong(d)}<span class="sp"></span><button class="btn sm" id="dpAdd">+ Añadir</button></h3>
    ${ho.map(h => `<div class="tag" style="background:var(--holi);color:var(--holiText);margin-bottom:6px">🎉 ${esc(h.name)}</div>`).join('')}
    ${its.length ? its.map(i => itemHTML(i.k, i.x)).join('') : '<div class="muted small">Nada para este día. Toca el día otra vez o “+ Añadir” para agendar.</div>'}`;
  wireItems(el);
  $('#dpAdd', el).onclick = () => openEventForm(null, {date: d}, S.settings.calView === 'month' ? 'month' : undefined);
}
const H0 = 0, H1 = 24, SLOT = 48;
function timeGrid(body, days, onSlot, opts = {}) {
  const cols = days.length;
  let h = `<div class="tgrid ${opts.cls || ''}" style="grid-template-columns:58px repeat(${cols},minmax(0,1fr))"><div class="hh"></div>`;
  days.forEach(d => { const ho = holidaysOn(d); h += `<div class="hh ${d === todayISO() ? 'today' : ''} ${ho.length ? 'holi' : ''}" ${opts.noHead ? '' : `data-hd="${d}"`} style="cursor:pointer">${opts.dayLabel ? opts.dayLabel(d) : DCORTO[dow(d)] + ' ' + parseISO(d).getDate()}${ho.length ? ' 🎉' : ''}</div>`; });
  if (!opts.noAllDay) {
    h += `<div class="tl" style="height:auto;transform:none;padding-top:4px">todo el día</div>`;
    days.forEach(d => { const ad = [...holidaysOn(d).map(x => `<span class="pill ho">🎉 ${esc(x.name)}</span>`), ...S.events.filter(e => e.date === d && e.allDay && areaVisible(e.areaId)).map(e => pillHTML({k: 'ev', x: e})), ...S.tasks.filter(t => t.date === d && !t.time && areaVisible(t.areaId)).map(t => pillHTML({k: 'tk', x: t}))]; h += `<div class="allday">${ad.join('')}</div>`; });
  }
  for (let hr = H0; hr < H1; hr++) {
    h += `<div class="tl">${hr === 0 ? '' : fmtHourLabel(hr)}</div>`;
    days.forEach((d, ci) => h += `<div class="slot" data-slot="${d}|${hr}" style="grid-column:${ci + 2}"></div>`);
  }
  h += '</div>';
  body.innerHTML = h;
  const grid = body.firstElementChild;
  // Bloques posicionados
  requestAnimationFrame(() => {
    days.forEach(d => {
      const first = grid.querySelector(`[data-slot="${d}|${H0}"]`); if (!first) return;
      const top0 = first.offsetTop, left = first.offsetLeft, w = first.offsetWidth;
      const blocks = [];
      if (!opts.only || opts.only === 'all') {
        S.events.filter(e => e.date === d && !e.allDay && areaVisible(e.areaId)).forEach(e => blocks.push({k: 'ev', x: e, s: toMin(e.start), e: toMin(e.end)}));
        S.tasks.filter(t => t.date === d && t.time && areaVisible(t.areaId)).forEach(t => blocks.push({k: 'tk', x: t, s: toMin(t.time), e: toMin(t.time) + 30}));
      }
      S.routines.filter(r => (opts.only === 'rt' ? r.days.includes(dow(d)) : routineOn(r, d)) && areaVisible(r.areaId)).forEach(r => blocks.push({k: 'rt', x: r, s: toMin(r.start), e: toMin(r.end)}));
      blocks.forEach(b => { if (b.e - b.s < 30) b.e = b.s + 30; });
      blocks.sort((a, b) => a.s - b.s || b.e - a.e);
      // grupos que se solapan: cada grupo reparte su propio ancho
      let group = [], gEnd = -1; const groups = [];
      blocks.forEach(b => { if (b.s >= gEnd && group.length) { groups.push(group); group = []; gEnd = -1; } group.push(b); gEnd = Math.max(gEnd, b.e); });
      if (group.length) groups.push(group);
      groups.forEach(g => { const lanes = []; g.forEach(b => { let l = lanes.findIndex(end => end <= b.s); if (l < 0) { l = lanes.length; lanes.push(0); } lanes[l] = b.e; b.lane = l; }); g.forEach(b => b.nl = lanes.length); });
      blocks.forEach(b => { const nl = b.nl;
        const el = document.createElement('div'); const c = colorOf(b.k, b.x);
        el.className = 'blk ' + b.k + (b.k === 'tk' && isDone(b.x) ? ' done' : '');
        el.style.top = (top0 + (b.s - H0 * 60) / 60 * SLOT) + 'px'; el.style.height = Math.max(20, (b.e - b.s) / 60 * SLOT - 2) + 'px';
        el.style.left = (left + 2 + b.lane * (w - 4) / nl) + 'px'; el.style.width = ((w - 4) / nl - 2) + 'px'; el.style.right = 'auto';
        if (b.k === 'ev') el.style.background = c; else el.style.borderColor = c;
        const icon = b.k === 'ev' ? evType(b.x.evType).icon : b.k === 'tk' ? typeById(b.x.typeId).icon : '🔁';
        el.innerHTML = b.e - b.s <= 30 ? `<b>${icon} ${esc(b.x.title || b.x.name)}</b> <span style="opacity:.85">${fmtTime(b.k === 'tk' ? b.x.time : b.x.start)}</span>` : `<b>${icon} ${esc(b.x.title || b.x.name)}</b><br>${fmtTime(b.k === 'tk' ? b.x.time : b.x.start)}`;
        el.title = (b.x.title || b.x.name) + ' · ' + fmtTime(b.k === 'tk' ? b.x.time : b.x.start);
        el.dataset[b.k] = b.x.id; if (b.k === 'tk' && isDone(b.x)) el.style.opacity = .55;
        grid.appendChild(el);
      });
      if (d === todayISO() && !opts.noNow) { const nl2 = document.createElement('div'); nl2.className = 'nowline'; nl2.style.top = (top0 + nowMin() / 60 * SLOT) + 'px'; nl2.style.left = left + 'px'; nl2.style.width = w + 'px'; nl2.style.right = 'auto'; grid.appendChild(nl2); }
    });
    wireItems(grid);
    const f = grid.querySelector(`[data-slot="${days[0]}|7"]`); if (f) grid.scrollTop = f.offsetTop - 60;
  });
  grid.querySelectorAll('[data-slot]').forEach(s => s.onclick = () => { const [d, hr] = s.dataset.slot.split('|'); onSlot && onSlot(d, +hr); });
  grid.querySelectorAll('[data-hd]').forEach(s => s.onclick = () => { UI.calDate = UI.selDate = s.dataset.hd; S.settings.calView = 'day'; save('meta'); renderView(); });
  wireItems(grid);
}
function calWeek(body, d) {
  const days = weekDays8(d);
  if (isMobile()) {
    body.innerHTML = days.map(x => {
      const its = sortedDay(x, {withDone: true}), ho = holidaysOn(x);
      return `<div class="wkday ${x === todayISO() ? 'today' : ''} ${ho.length ? 'holi' : ''}"><div class="dh">${fmtLong(x)}${ho.map(h => `<span class="tag" style="background:transparent;color:var(--holiText)">🎉 ${esc(h.name)}</span>`).join('')}<span class="sp"></span><button class="iconbtn" data-wplus="${x}" aria-label="Añadir" style="color:var(--purple)">+</button></div>${its.length ? its.map(i => itemHTML(i.k, i.x)).join('') : '<div class="muted small">Libre</div>'}</div>`;
    }).join('');
    body.querySelectorAll('[data-wplus]').forEach(b => b.onclick = () => openEventForm(null, {date: b.dataset.wplus}, 'week'));
    wireItems(body);
  } else timeGrid(body, days, (dd, hr) => openEventForm(null, {date: dd, start: pad(hr) + ':00'}, 'week'));
}
function calDay(body, d) {
  timeGrid(body, [d], (dd, hr) => openEventForm(null, {date: dd, start: pad(hr) + ':00', end: pad(Math.min(hr + 1, 23)) + (hr + 1 > 23 ? ':55' : ':00')}, 'day'), {dayLabel: x => fmtLong(x), noHead: true});
}
function planner(el, d) {
  const days = weekDays8(d), wk = days[0], t = todayISO();
  const tk = S.tasks.filter(x => days.includes(x.date)), ev = S.events.filter(x => days.includes(x.date));
  const rtN = days.reduce((n, x) => n + S.routines.filter(r => routineOn(r, x)).length, 0);
  const pending = S.tasks.filter(x => !isDone(x) && (!x.date || isLate(x))).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  el.innerHTML = `<div class="card planner" id="planner"><h3>🗓️ Planifica tu semana</h3>
    <div class="fld"><label>🎯 Meta principal de la semana</label><div class="goal"><input id="goal" placeholder="Ej. Dejar la casa organizada para la visita" value="${esc(S.weekGoals[wk] || '')}" maxlength="140"><button class="btn" id="goalS">Guardar</button></div></div>
    <div class="stats" style="grid-template-columns:repeat(3,1fr)"><div class="stat"><b>${tk.length}</b><span>Tareas</span></div><div class="stat"><b>${ev.length}</b><span>Eventos</span></div><div class="stat"><b>${rtN}</b><span>Rutinas</span></div></div>
    <div class="sec-title">Por planificar (${pending.length})</div>
    ${pending.length ? pending.map(x => `<div class="item" data-tk="${x.id}" style="flex-wrap:wrap"><span class="em">${typeById(x.typeId).icon}</span><div class="body"><div class="t">${esc(x.title)}</div><div class="m">${x.date ? `<span class="late">Era para ${fmtShort(x.date)}</span>` : '<span>Sin fecha</span>'}</div></div>
      <div class="daybtns">${days.map(dd => `<button data-asg="${x.id}|${dd}" ${dd < t ? 'disabled' : ''} title="${fmtLong(dd)}">${DLETRA[dow(dd)]}</button>`).join('')}</div></div>`).join('') : '<div class="muted small">✓ No tienes tareas atrasadas por acomodar.</div>'}</div>`;
  $('#goalS', el).onclick = () => { const val = $('#goal', el).value.trim(); if (val) S.weekGoals[wk] = val; else delete S.weekGoals[wk]; save('meta'); toast('Meta de la semana guardada 🎯'); };
  $('#goal', el).onkeydown = e => { if (e.key === 'Enter') $('#goalS', el).click(); };
  el.querySelectorAll('[data-asg]').forEach(b => b.onclick = e => { e.stopPropagation(); const [id, dd] = b.dataset.asg.split('|'); const x = S.tasks.find(y => y.id === id); x.date = dd; save('tasks'); renderView(); toast('Movida para ' + fmtShort(dd)); });
  wireItems(el);
}

/* ========== ÁREAS ========== */
function vAreas(v) {
  if (UI.openArea && areaById(UI.openArea)) return vAreaDetail(v, areaById(UI.openArea));
  UI.openArea = null;
  v.innerHTML = `<div class="row" style="margin-bottom:12px"><p class="muted small" style="margin:0">Organiza tu vida por áreas: Hogar, Trabajo, Salud, Familia…</p><span class="sp"></span><button class="btn" id="aNew">+ Añadir área</button></div>
    ${S.areas.length ? `<div class="grid g4">${S.areas.map(a => {
      const tk = S.tasks.filter(t => t.areaId === a.id && !isDone(t)); const late = tk.filter(isLate).length;
      const nx = [...S.events.filter(e => e.areaId === a.id && e.date >= todayISO()).map(e => [e.date + (e.allDay ? '' : e.start), e.title]), ...tk.filter(t => t.date >= todayISO()).map(t => [t.date + (t.time || ''), t.title])].sort((x, y) => x[0].localeCompare(y[0]))[0];
      return `<div class="acard" data-oa="${a.id}" style="border-top-color:${a.color}"><h4>${esc(a.name)}</h4><div class="small"><b>${tk.length}</b> pendiente${tk.length === 1 ? '' : 's'}</div>${late ? `<div class="small late">⚠️ ${late} atrasada${late === 1 ? '' : 's'}</div>` : ''}<div class="xs muted" style="margin-top:6px">${nx ? 'Lo próximo: ' + esc(nx[1]) + ' · ' + fmtShort(nx[0].slice(0, 10)) : 'Nada próximo'}</div></div>`;
    }).join('')}</div>` : `<div class="card empty"><div class="big">🗂️</div><b>Aún no tienes áreas</b><p class="small">Crea tu primera área para agrupar tus tareas, eventos, rutinas y notas.</p><button class="btn" id="aNew2">+ Añadir mi primera área</button></div>`}`;
  $('#aNew', v).onclick = () => openAreaForm(); const a2 = $('#aNew2', v); if (a2) a2.onclick = () => openAreaForm();
  v.querySelectorAll('[data-oa]').forEach(c => c.onclick = () => { UI.openArea = c.dataset.oa; UI.areaType = ''; renderView(); window.scrollTo(0, 0); });
}
function vAreaDetail(v, a) {
  const tks = S.tasks.filter(t => t.areaId === a.id), evs = S.events.filter(e => e.areaId === a.id), rts = S.routines.filter(r => r.areaId === a.id), nts = S.notes.filter(n => n.areaId === a.id);
  const usedTypes = [...new Set(tks.map(t => t.typeId))];
  const fT = UI.areaType ? tks.filter(t => t.typeId === UI.areaType) : tks;
  const pend = fT.filter(t => !isDone(t)).sort((x, y) => (x.date + (x.time || '')).localeCompare(y.date + (y.time || ''))), done = fT.filter(isDone);
  v.innerHTML = `<button class="btn ghost sm" id="back">‹ Todas las áreas</button>
    <div class="card" style="border-top:6px solid ${a.color};margin-top:6px"><div class="row wrap"><h2 style="margin:0;font-size:20px">${esc(a.name)}</h2><span class="sp"></span><button class="btn sec sm" id="aEd">✎ Editar</button><button class="btn sec sm" id="aDel">🗑 Eliminar</button></div>
      <div class="small muted" style="margin-top:6px">${a.contact ? '👤 ' + esc(a.contact) + ' · ' : ''}${a.place ? '📍 ' + esc(a.place) : ''}</div>${a.obs ? `<div class="small" style="margin-top:6px;white-space:pre-wrap">${esc(a.obs)}</div>` : ''}
      <div class="row wrap" style="margin-top:12px"><button class="btn sm" id="adT">+ Tarea</button><button class="btn sm sec" id="adE">+ Evento</button><button class="btn sm sec" id="adR">+ Rutina</button><button class="btn sm sec" id="adN">+ Nota</button></div></div>
    <div class="sec-title">Actividades</div>
    ${usedTypes.length > 1 ? `<div class="chips" style="margin-bottom:8px"><button class="chip ${!UI.areaType ? 'on' : ''}" data-at="">Todas</button>${usedTypes.map(id => `<button class="chip ${UI.areaType === id ? 'on' : ''}" data-at="${id}">${typeById(id).icon} ${esc(typeById(id).name)}</button>`).join('')}</div>` : ''}
    ${pend.length ? pend.map(t => itemHTML('tk', t, {date: true})).join('') : '<div class="muted small">No hay tareas pendientes en esta área.</div>'}
    ${done.length ? `<details class="fold"><summary>Completadas (${done.length})</summary>${done.map(t => itemHTML('tk', t, {date: true})).join('')}</details>` : ''}
    <div class="sec-title">Eventos</div>${evs.filter(e => e.date >= todayISO()).sort((x, y) => x.date.localeCompare(y.date)).map(e => itemHTML('ev', e, {date: true})).join('') || '<div class="muted small">Sin eventos próximos.</div>'}
    <div class="sec-title">Rutinas</div>${rts.map(r => itemHTML('rt', r)).join('') || '<div class="muted small">Sin rutinas.</div>'}
    <div class="sec-title">Notas</div>${nts.map(n => `<div class="nitem" data-note="${n.id}"><div class="body"><div class="t">${esc(noteTitle(n))}</div><div class="s">${fmtShort(n.date)}</div></div></div>`).join('') || '<div class="muted small">Sin notas.</div>'}`;
  $('#back', v).onclick = () => { UI.openArea = null; renderView(); };
  $('#aEd', v).onclick = () => openAreaForm(a);
  $('#aDel', v).onclick = async () => { if (await deleteArea(a.id)) { UI.openArea = null; renderView(); } };
  $('#adT', v).onclick = () => openTaskForm(null, {areaId: a.id});
  $('#adE', v).onclick = () => openEventForm(null, {areaId: a.id});
  $('#adR', v).onclick = () => openRoutineForm(null, {areaId: a.id});
  $('#adN', v).onclick = () => { const n = {id: uid(), text: a.name + ' – nota', date: todayISO(), hidden: false, category: '', areaId: a.id}; S.notes.unshift(n); save('notes'); openNote(n.id); setTimeout(() => { const ta = $('#nT'); if (ta) { ta.select(); ta.focus(); } }, 60); };
  v.querySelectorAll('[data-at]').forEach(b => b.onclick = () => { UI.areaType = b.dataset.at; renderView(); });
  v.querySelectorAll('[data-note]').forEach(b => b.onclick = () => openNote(b.dataset.note));
  wireItems(v);
}

/* ========== RUTINA SEMANAL ========== */
function vRutina(v) {
  const order = [0,1,2,3,4,5,6].map(i => (i + S.settings.weekStart) % 7);
  v.innerHTML = `<div class="row" style="margin-bottom:12px"><p class="muted small" style="margin:0">Compromisos que se repiten cada semana: turnos, gimnasio, iglesia, recoger a los niños…</p><span class="sp"></span><button class="btn" id="rNew">+ Añadir rutina</button></div><div id="rBody"></div>`;
  $('#rNew', v).onclick = () => openRoutineForm();
  const body = $('#rBody', v);
  if (!S.routines.length) { body.innerHTML = `<div class="card empty"><div class="big">🔁</div><b>Aún no tienes rutinas</b><p class="small">Registra una vez y se repetirá sola cada semana en tu calendario y en Mi Día.</p><button class="btn" id="rNew2">+ Registrar mi rutina</button></div>`; $('#rNew2', v).onclick = () => openRoutineForm(); return; }
  if (isMobile()) {
    body.innerHTML = order.map(d => { const rs = S.routines.filter(r => r.days.includes(d)).sort((a, b) => a.start.localeCompare(b.start)); return `<div class="wkday ${d === dow(todayISO()) ? 'today' : ''}"><div class="dh">${cap(DIAS[d])}<span class="sp"></span><button class="iconbtn" data-rplus="${d}" aria-label="Añadir">+</button></div>${rs.map(r => itemHTML('rt', r)).join('') || '<div class="muted small">Libre</div>'}</div>`; }).join('');
    body.querySelectorAll('[data-rplus]').forEach(b => b.onclick = () => openRoutineForm(null, {days: [+b.dataset.rplus]}));
    wireItems(body);
  } else {
    const days = weekDays(todayISO());
    timeGrid(body, days, (d, hr) => openRoutineForm(null, {days: [dow(d)]}), {only: 'rt', noAllDay: true, noNow: true, dayLabel: x => DIAS[dow(x)], noHead: true});
  }
}

/* ========== TAREAS ========== */
function vTareas(v) {
  v.innerHTML = `<div class="toggle2" style="max-width:420px;margin-bottom:12px"><button data-tm="tareas" class="${UI.taskMode === 'tareas' ? 'on' : ''}">✅ Mis tareas</button><button data-tm="listas" class="${UI.taskMode === 'listas' ? 'on' : ''}">📋 Mis listas</button></div><div id="tmBody"></div>`;
  v.querySelectorAll('[data-tm]').forEach(b => b.onclick = () => { UI.taskMode = b.dataset.tm; UI.openList = null; render(); });
  const body = $('#tmBody', v);
  if (UI.taskMode === 'listas') vListas(body); else vTareasList(body);
}
function vTareasList(v) {
  const f = UI.filters, q = norm(UI.q.trim());
  let list = S.tasks.slice();
  const counts = {todo: list.filter(t => !isDone(t) && !isLate(t)).length, late: list.filter(isLate).length, done: list.filter(isDone).length};
  if (UI.taskTab === 'todo') list = list.filter(t => !isDone(t) && !isLate(t)); else if (UI.taskTab === 'late') list = list.filter(isLate); else list = list.filter(isDone);
  if (f.area) list = list.filter(t => f.area === '_none' ? !t.areaId : t.areaId === f.area);
  if (f.type) list = list.filter(t => t.typeId === f.type);
  if (f.prio) list = list.filter(t => t.priority === f.prio);
  if (q) list = list.filter(t => norm(t.title).includes(q) || norm(t.details || '').includes(q) || norm(t.obs || '').includes(q));
  const pr = p => PRIOS.indexOf(p);
  const sorters = {fecha: (a, b) => (a.date + (a.time || '99')).localeCompare(b.date + (b.time || '99')), prioridad: (a, b) => pr(b.priority) - pr(a.priority) || a.date.localeCompare(b.date), nombre: (a, b) => a.title.localeCompare(b.title, 'es'), creada: (a, b) => (b.createdAt || 0) - (a.createdAt || 0)};
  list.sort(sorters[f.sort] || sorters.fecha);
  if (UI.taskTab === 'done' && f.sort === 'fecha') list.reverse();
  const active = [['area', f.area ? (f.area === '_none' ? 'Sin área' : (areaById(f.area) || {}).name) : ''], ['type', f.type ? typeById(f.type).icon + ' ' + typeById(f.type).name : ''], ['prio', f.prio], ['sort', f.sort !== 'fecha' ? 'Orden: ' + f.sort : '']].filter(x => x[1]);
  v.innerHTML = `<div class="row wrap" style="margin-bottom:10px"><div class="chips">${[['todo', 'Por hacer'], ['late', 'Atrasadas'], ['done', 'Completadas']].map(([k, n]) => `<button class="chip ${UI.taskTab === k ? 'on' : ''}" data-tt="${k}">${n} <span class="cnt">${counts[k]}</span></button>`).join('')}</div><span class="sp"></span>
    <button class="btn sec sm" id="fBtn">⚙︎ Filtros${active.length ? ` (${active.length})` : ''}</button><button class="btn sm" id="tNew">+ Nueva tarea</button></div>
    ${active.length ? `<div class="chips" style="margin-bottom:10px">${active.map(([k, n]) => `<span class="tag">${esc(n)}<button data-rf="${k}" aria-label="Quitar">✕</button></span>`).join('')}</div>` : ''}
    <div id="tList">${list.length ? list.map(t => itemHTML('tk', t, {date: true})).join('') : `<div class="card empty"><div class="big">${UI.taskTab === 'done' ? '🏁' : '🎉'}</div>${q ? 'No hay tareas que coincidan con “' + esc(UI.q) + '”.' : UI.taskTab === 'late' ? '¡Nada atrasado! Vas al día.' : UI.taskTab === 'done' ? 'Aún no has completado tareas.' : 'No tienes tareas por hacer.'}</div>`}</div>`;
  v.querySelectorAll('[data-tt]').forEach(b => b.onclick = () => { UI.taskTab = b.dataset.tt; renderView(); });
  v.querySelectorAll('[data-rf]').forEach(b => b.onclick = () => { UI.filters[b.dataset.rf] = b.dataset.rf === 'sort' ? 'fecha' : ''; renderView(); });
  $('#tNew', v).onclick = () => openTaskForm();
  $('#fBtn', v).onclick = openFilters;
  wireItems(v);
}
function openFilters() {
  const f = {...UI.filters};
  const s = openSheet({title: 'Filtros', body: '<div id="fB"></div>', foot: `<button class="btn sec" id="fClr">Quitar filtros</button><button class="btn" id="fOk">Aplicar</button>`,
    onMount: el => {
      const paint = () => {
        el.querySelector('#fB').innerHTML = `<div class="fld"><label>Área</label><div class="opts">${[['', 'Todas'], ['_none', 'Sin área'], ...S.areas.map(a => [a.id, a.name])].map(([k, n]) => `<button class="opt ${f.area === k ? 'on' : ''}" data-fa="${k}">${esc(n)}</button>`).join('')}</div></div>
          <div class="fld"><label>Tipo</label><div class="opts"><button class="opt ${!f.type ? 'on' : ''}" data-ft="">Todos</button>${S.types.map(t => `<button class="opt ${f.type === t.id ? 'on' : ''}" data-ft="${t.id}">${t.icon} ${esc(t.name)}</button>`).join('')}</div></div>
          <div class="fld"><label>Prioridad</label><div class="opts"><button class="opt ${!f.prio ? 'on' : ''}" data-fp="">Todas</button>${PRIOS.map(p => `<button class="opt ${f.prio === p ? 'on' : ''}" data-fp="${p}">${p}</button>`).join('')}</div></div>
          <div class="fld"><label>Ordenar por</label><div class="opts">${[['fecha', 'Fecha'], ['prioridad', 'Prioridad'], ['nombre', 'Nombre'], ['creada', 'Más recientes']].map(([k, n]) => `<button class="opt ${f.sort === k ? 'on' : ''}" data-fs="${k}">${n}</button>`).join('')}</div></div>`;
        el.querySelectorAll('[data-fa]').forEach(b => b.onclick = () => { f.area = b.dataset.fa; paint(); });
        el.querySelectorAll('[data-ft]').forEach(b => b.onclick = () => { f.type = b.dataset.ft; paint(); });
        el.querySelectorAll('[data-fp]').forEach(b => b.onclick = () => { f.prio = b.dataset.fp; paint(); });
        el.querySelectorAll('[data-fs]').forEach(b => b.onclick = () => { f.sort = b.dataset.fs; paint(); });
      };
      paint();
      el.querySelector('#fOk').onclick = () => { UI.filters = f; s.close(); renderView(); };
      el.querySelector('#fClr').onclick = () => { UI.filters = {area: '', type: '', prio: '', sort: 'fecha'}; s.close(); renderView(); };
    }});
}

/* ========== ENFOQUE ========== */
const F = {phase: 'idle', endAt: 0, remain: 0, total: 0, paused: false, blocks: 0, tick: null, startedAt: 0};
const presetNow = () => FOCUS_PRESETS[S.settings.focusPreset] || FOCUS_PRESETS[1];
function focusLogAdd(min, block) { const d = todayISO(); const l = S.focusLog[d] || {blocks: 0, minutes: 0}; l.minutes += Math.round(min); if (block) l.blocks++; S.focusLog[d] = l; save('meta'); }
function focusStart(phase) {
  const [w, b] = presetNow();
  const mins = phase === 'work' ? w : phase === 'long' ? b * 3 : b;
  F.phase = phase; F.total = mins * 60; F.remain = F.total; F.endAt = Date.now() + F.total * 1000; F.paused = false; F.startedAt = Date.now();
  focusLoop();
}
function focusLoop() {
  clearInterval(F.tick);
  F.tick = setInterval(() => {
    if (F.paused || F.phase === 'idle' || F.phase === 'wait') return;
    F.remain = Math.max(0, Math.round((F.endAt - Date.now()) / 1000));
    if (F.remain <= 0) focusPhaseEnd(); else paintFocus();
  }, 250);
  paintFocus();
}
function focusPhaseEnd() {
  beep(3);
  if (F.phase === 'work') {
    F.blocks++; focusLogAdd(F.total / 60, true); toast('¡Bloque completo! Toma un descanso ☕');
    focusStart(F.blocks % 4 === 0 ? 'long' : 'short');
  } else { F.phase = 'wait'; clearInterval(F.tick); toast('Descanso terminado. ¿Listo para el siguiente?'); paintFocus(); }
}
async function focusStop(askSave = true) {
  const wasWork = F.phase === 'work'; const elapsed = (F.total - F.remain) / 60;
  const p = F.paused; F.paused = true;
  if (wasWork && askSave && elapsed >= 1) {
    const r = await ask(`Terminaste antes de tiempo. ¿Guardar ${Math.floor(elapsed)} minuto${Math.floor(elapsed) === 1 ? '' : 's'} de enfoque?`, {yes: 'Guardar minutos', no: 'No guardar', danger: false});
    if (r === true) focusLogAdd(Math.floor(elapsed), false);
  }
  clearInterval(F.tick); F.phase = 'idle'; F.paused = false; F.remain = 0; F.blocks = 0; paintFocus(); renderMini();
  void p;
}
function focusTogglePause() {
  if (F.phase === 'idle' || F.phase === 'wait') return;
  if (F.paused) { F.endAt = Date.now() + F.remain * 1000; F.paused = false; } else { F.remain = Math.max(0, Math.round((F.endAt - Date.now()) / 1000)); F.paused = true; }
  paintFocus();
}
function focusSkip() {
  if (F.phase === 'work') { F.blocks++; focusLogAdd((F.total - F.remain) / 60, false); focusStart(F.blocks % 4 === 0 ? 'long' : 'short'); }
  else if (F.phase === 'short' || F.phase === 'long') { F.phase = 'wait'; clearInterval(F.tick); paintFocus(); }
}
const mmss = s => pad(Math.floor(s / 60)) + ':' + pad(s % 60);
function paintFocus() {
  if (UI.view === 'enfoque') { const b = $('#fBody'); if (b) fillFocus(b); }
  renderMini();
}
function renderMini() {
  const m = $('#mini'); if (!m) return;
  if (UI.view === 'enfoque' || F.phase === 'idle') { m.innerHTML = ''; return; }
  const lbl = F.phase === 'wait' ? 'Descanso listo' : (F.phase === 'work' ? '🎯 ' : '☕ ') + mmss(F.remain);
  m.innerHTML = `<div class="minitimer" role="timer"><span id="miniGo" style="cursor:pointer">${lbl}</span>${F.phase === 'wait' ? '' : `<button id="miniP" aria-label="Pausar">${F.paused ? '▶' : '❚❚'}</button>`}<button id="miniS" aria-label="Detener">■</button></div>`;
  $('#miniGo').onclick = () => go('enfoque');
  const mp = $('#miniP'); if (mp) mp.onclick = focusTogglePause;
  $('#miniS').onclick = () => focusStop(true);
}
function vEnfoque(v) {
  v.innerHTML = `<div class="grid g2"><div class="card"><div id="fBody" class="focus"></div></div><div class="grid" style="align-content:start"><div class="card" id="fToday"></div><div class="card"><h3>¿Cómo funciona?</h3><p class="small muted" style="margin:0">Trabaja concentrado un bloque, descansa unos minutos y repite. Cada 4 bloques tienes un descanso largo. Enfoque es un temporizador independiente: no cambia tus tareas ni tu calendario.</p></div></div></div>`;
  fillFocus($('#fBody', v));
}
function fillFocus(b) {
  const [w, br] = presetNow();
  const color = F.phase === 'work' ? 'var(--orange)' : F.phase === 'idle' ? 'var(--orange)' : 'var(--teal)';
  const total = F.phase === 'idle' ? w * 60 : F.total || 1, rem = F.phase === 'idle' ? w * 60 : F.phase === 'wait' ? 0 : F.remain;
  const r = 118, c = 2 * Math.PI * r;
  const lbl = {idle: 'Listo para empezar', work: F.paused ? 'En pausa' : 'Enfocado', short: F.paused ? 'En pausa' : 'Descanso corto', long: F.paused ? 'En pausa' : 'Descanso largo', wait: 'Descanso terminado'}[F.phase];
  b.innerHTML = `${F.phase === 'idle' ? `<div class="lab" style="text-align:center">Elige tu tiempo</div><div class="chips" style="justify-content:center">${FOCUS_PRESETS.map(([a, d], i) => `<button class="chip ${S.settings.focusPreset === i ? 'on' : ''}" data-fp="${i}">${a} min <span class="cnt">☕ ${d}</span></button>`).join('')}</div>` : `<div class="small muted">Bloque ${F.phase === 'work' ? F.blocks + 1 : F.blocks} · ${w} min de enfoque, ${br} de descanso</div>`}
    <div class="fring"><svg width="100%" height="100%" viewBox="0 0 260 260"><circle cx="130" cy="130" r="${r}" stroke="var(--soft)" stroke-width="14" fill="none"/><circle cx="130" cy="130" r="${r}" stroke="${color}" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - rem / total)}"/></svg><div class="c"><b>${mmss(rem)}</b><span>${lbl}</span></div></div>
    <div class="row wrap" style="justify-content:center">${F.phase === 'idle' ? `<button class="btn" id="fGo" style="padding:12px 34px;background:var(--orange)">▶ Empezar</button>` : F.phase === 'wait' ? `<button class="btn" id="fNext" style="background:var(--orange)">▶ Empezar siguiente</button><button class="btn sec" id="fEnd">Terminar</button>` : `<button class="btn" id="fP">${F.paused ? '▶ Seguir' : '❚❚ Pausar'}</button><button class="btn sec" id="fSk">⏭ Saltar</button><button class="btn sec" id="fEnd">■ Terminar</button>`}</div>`;
  b.querySelectorAll('[data-fp]').forEach(x => x.onclick = () => { S.settings.focusPreset = +x.dataset.fp; save('meta'); fillFocus(b); });
  const g = $('#fGo', b); if (g) g.onclick = () => { try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); audioCtx.resume && audioCtx.resume(); } catch (e) {} F.blocks = 0; focusStart('work'); };
  const n = $('#fNext', b); if (n) n.onclick = () => focusStart('work');
  const p = $('#fP', b); if (p) p.onclick = focusTogglePause;
  const sk = $('#fSk', b); if (sk) sk.onclick = focusSkip;
  const e = $('#fEnd', b); if (e) e.onclick = () => focusStop(true);
  const ft = $('#fToday'); if (ft) { const l = S.focusLog[todayISO()] || {blocks: 0, minutes: 0}; ft.innerHTML = `<h3>🎯 Hoy</h3><div class="stats" style="grid-template-columns:1fr 1fr;margin:0"><div class="stat"><b>${l.blocks}</b><span>Bloques completos</span></div><div class="stat"><b>${l.minutes}</b><span>Minutos de enfoque</span></div></div>`; }
}

/* ========== NOTAS ========== */
function vNotas(v) {
  const q = norm(UI.q.trim());
  let list = S.notes.filter(n => q ? (norm(n.text).includes(q) || norm(n.category || '').includes(q)) : true);
  const hidden = list.filter(n => n.hidden);
  list = UI.showHiddenNotes ? hidden : list.filter(n => !n.hidden);
  list.sort((a, b) => (b.date + (b.created || '')).localeCompare(a.date + (a.created || '')));
  v.innerHTML = `<div class="card"><div class="note-new"><textarea class="inp" id="nNew" placeholder="Escribe una nota…"></textarea><button class="btn" id="nSave">Guardar</button></div></div>
    <div class="row" style="margin:14px 0 8px"><b>${UI.showHiddenNotes ? 'Notas ocultas' : 'Mis notas'}</b><span class="sp"></span>${hidden.length || UI.showHiddenNotes ? `<button class="btn ghost sm" id="nHid">${UI.showHiddenNotes ? '‹ Volver a mis notas' : `Ver ocultas (${hidden.length})`}</button>` : ''}</div>
    ${list.length ? list.map(n => { const a = areaById(n.areaId); return `<div class="nitem" data-note="${n.id}"><div class="body"><div class="t">${esc(noteTitle(n))}</div>${noteSnippet(n) ? `<div class="s">${esc(noteSnippet(n))}</div>` : ''}<div class="xs muted row" style="margin-top:3px"><span>${fmtShort(n.date)}</span>${n.category ? `<span class="tag">${esc(n.category)}</span>` : ''}${a ? `<span class="tag"><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</span>` : ''}</div></div>
      <div class="acts"><button data-nh="${n.id}" title="${n.hidden ? 'Mostrar' : 'Ocultar'}" aria-label="${n.hidden ? 'Mostrar' : 'Ocultar'}">${n.hidden ? '👁‍🗨' : '👁'}</button><button data-nd="${n.id}" title="Eliminar" aria-label="Eliminar">🗑</button></div></div>`; }).join('')
      : `<div class="empty">${q ? 'No hay notas que coincidan con “' + esc(UI.q) + '”.' : UI.showHiddenNotes ? 'No hay notas ocultas.' : '<div class="big">🗒️</div>Escribe arriba tu primera nota.'}</div>`}`;
  const nn = $('#nNew', v);
  $('#nSave', v).onclick = () => { const tx = nn.value.trim(); if (!tx) { nn.focus(); return; } S.notes.push({id: uid(), text: tx, date: todayISO(), created: String(Date.now()), hidden: false, category: '', areaId: null}); save('notes'); UI.showHiddenNotes = false; renderView(); toast('Nota guardada ✓'); };
  nn.onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) $('#nSave', v).click(); };
  const hb = $('#nHid', v); if (hb) hb.onclick = () => { UI.showHiddenNotes = !UI.showHiddenNotes; renderView(); };
  v.querySelectorAll('[data-note]').forEach(b => b.onclick = () => openNote(b.dataset.note));
  v.querySelectorAll('[data-nh]').forEach(b => b.onclick = e => { e.stopPropagation(); const n = S.notes.find(x => x.id === b.dataset.nh); n.hidden = !n.hidden; save('notes'); renderView(); toast(n.hidden ? 'Nota oculta' : 'Nota visible de nuevo'); });
  v.querySelectorAll('[data-nd]').forEach(b => b.onclick = async e => { e.stopPropagation(); if (await ask('¿Eliminar esta nota?')) { S.notes = S.notes.filter(x => x.id !== b.dataset.nd); save('notes'); renderView(); toast('Nota eliminada'); } });
}

/* ========== PROGRESO ========== */
function vProgreso(v) {
  const wd = weekDays(todayISO());
  const tk = S.tasks.filter(t => wd.includes(t.date));
  const done = tk.filter(isDone).length, pend = tk.filter(t => !isDone(t)).length, late = S.tasks.filter(isLate).length;
  const pct = tk.length ? Math.round(done / tk.length * 100) : 0;
  const per = wd.map(d => S.tasks.filter(t => isDone(t) && t.completedAt && iso(new Date(t.completedAt)) === d).length);
  const mx = Math.max(1, ...per);
  const fl = wd.reduce((a, d) => { const l = S.focusLog[d]; if (l) { a.m += l.minutes; a.b += l.blocks; } return a; }, {m: 0, b: 0});
  const msg = !tk.length ? 'Añade algunas tareas para esta semana y aquí verás tu avance.' : pct >= 80 ? '¡Semana excelente! Estás cumpliendo casi todo lo que te propusiste. 🌟' : pct >= 50 ? 'Vas muy bien: más de la mitad hecha. ¡Sigue así! 💪' : done > 0 ? 'Cada tarea completada cuenta. Paso a paso se llega lejos. 🌱' : 'La semana todavía tiene espacio. Empieza por algo pequeño. ✨';
  v.innerHTML = `<p class="muted small" style="margin-top:0">Semana del ${fmtShort(wd[0])} al ${fmtShort(wd[6])}</p>
    <div class="stats g4" style="margin-top:0"><div class="stat ok"><b>${done}</b><span>Completadas</span></div><div class="stat"><b>${pend}</b><span>Pendientes</span></div><div class="stat ${late ? 'warn' : ''}"><b>${late}</b><span>Atrasadas</span></div><div class="stat"><b>${pct}%</b><span>Cumplimiento</span></div></div>
    <div class="card" style="margin-bottom:14px;background:var(--orange-l)"><b>${msg}</b></div>
    <div class="grid g2"><div class="card"><h3>Completadas por día</h3><div class="bars">${wd.map((d, i) => `<div class="b"><small class="xs">${per[i] || ''}</small><i style="height:${per[i] / mx * 100}%;${d === todayISO() ? 'background:var(--orange)' : ''}"></i><span>${DCORTO[dow(d)]}</span></div>`).join('')}</div></div>
      <div class="card"><h3>🎯 Enfoque esta semana</h3><div class="stats" style="grid-template-columns:1fr 1fr;margin:0"><div class="stat"><b>${fl.m}</b><span>Minutos</span></div><div class="stat"><b>${fl.b}</b><span>Bloques</span></div></div></div></div>
    <div class="card" style="margin-top:14px"><h3>Avance por área (esta semana)</h3>${S.areas.length ? S.areas.map(a => { const at = tk.filter(t => t.areaId === a.id); const ad = at.filter(isDone).length; const p = at.length ? ad / at.length * 100 : 0; return `<div style="margin:10px 0"><div class="row small"><span class="dot" style="background:${a.color}"></span><b>${esc(a.name)}</b><span class="sp"></span><span class="muted">${ad}/${at.length}</span></div><div class="hbar" style="margin-top:5px"><i style="width:${p}%;background:${a.color}"></i></div></div>`; }).join('') : '<div class="muted small">Crea áreas para ver tu avance en cada una.</div>'}</div>`;
}

/* ========== CONFIGURACIÓN ========== */
function vConfig(v) {
  const st = S.settings;
  v.innerHTML = `<div class="card"><h3>Apariencia</h3>
    <div class="set-row"><div class="lbl">Tema</div><div class="seg">${[['light', 'Claro'], ['dark', 'Oscuro'], ['auto', 'Automático']].map(([k, n]) => `<button data-th="${k}" class="${st.theme === k ? 'on' : ''}">${n}</button>`).join('')}</div></div>
    <div class="set-row"><div class="lbl">Primer día de la semana</div><div class="seg"><button data-ws="0" class="${st.weekStart === 0 ? 'on' : ''}">Domingo</button><button data-ws="1" class="${st.weekStart === 1 ? 'on' : ''}">Lunes</button></div></div>
    <div class="set-row"><div class="lbl">Formato de hora</div><div class="seg"><button data-h24="0" class="${!st.hour24 ? 'on' : ''}">12 horas</button><button data-h24="1" class="${st.hour24 ? 'on' : ''}">24 horas</button></div></div>
    <div class="set-row"><div class="lbl">Días feriados<small>EE. UU. y Puerto Rico en el calendario</small></div><button class="switch blue ${st.showHolidays ? 'on' : ''}" id="sHol" aria-label="Mostrar feriados"></button></div></div>
    <div class="card" style="margin-top:14px"><h3>Recordatorios</h3>
    <div class="set-row" id="rowNotif"><div class="lbl">Avisos del navegador<small>Solo avisan mientras la app está abierta. Para que el teléfono te avise con la app cerrada, usa los botones “Enviar a Google Calendar” u “Outlook” en cada tarea o evento.</small></div><button class="switch blue ${st.notif ? 'on' : ''}" id="sNot" aria-label="Avisos"></button></div></div>
    <div class="card" style="margin-top:14px"><h3>Actividades y Enfoque</h3>
    <div class="set-row"><div class="lbl">Tipos de actividad<small>Crear, editar o restaurar los originales</small></div><button class="btn sec sm" id="sTypes">Editar tipos</button></div>
    <div class="set-row"><div class="lbl">Tiempo de Enfoque predeterminado</div><div class="chips">${FOCUS_PRESETS.map(([a, d], i) => `<button class="chip ${st.focusPreset === i ? 'on' : ''}" data-sfp="${i}">${a}/${d}</button>`).join('')}</div></div>
    <div class="set-row"><div class="lbl">Tutorial</div><button class="btn sec sm" id="sTut">Volver a ver el tutorial</button></div></div>
    <div class="card" style="margin-top:14px"><h3>Tus datos</h3>
    <div class="set-row" id="rowData"><div class="lbl">Dónde se guardan<small class="storeLbl"></small><small>${Store.mode === 'cloud' ? 'Tus datos están en tu cuenta de Claude: los ves desde cualquier dispositivo donde abras esta app con tu cuenta. Además, se guarda una copia en este navegador.' : 'Tus datos están en este navegador. Si borras los datos del navegador o cambias de dispositivo, no estarán. Haz copias de seguridad.'}</small></div></div>
    <div class="set-row"><div class="lbl">Copia de seguridad<small>Guarda todo en un archivo, o recupéralo desde un archivo.</small></div><button class="btn sec sm" id="sExp">⬇ Exportar</button><label class="btn sec sm" style="cursor:pointer">⬆ Importar<input type="file" id="sImp" accept=".json,application/json" hidden></label></div>
    <div class="set-row"><div class="lbl">Borrar todos los datos<small>Elimina todo y deja la app como nueva.</small></div><button class="btn danger sm" id="sDel">Borrar todo</button></div></div>
    <p class="xs muted" style="text-align:center;margin-top:16px">Mi Organizador Personal · versión ${window.NATIVE ? NATIVE.version : '1.0'}</p>`;
  v.querySelectorAll('[data-th]').forEach(b => b.onclick = () => { st.theme = b.dataset.th; save('meta'); applyTheme(); renderView(); });
  v.querySelectorAll('[data-ws]').forEach(b => b.onclick = () => { st.weekStart = +b.dataset.ws; save('meta'); renderView(); });
  v.querySelectorAll('[data-h24]').forEach(b => b.onclick = () => { st.hour24 = b.dataset.h24 === '1'; save('meta'); renderView(); });
  v.querySelectorAll('[data-sfp]').forEach(b => b.onclick = () => { st.focusPreset = +b.dataset.sfp; save('meta'); renderView(); });
  $('#sHol', v).onclick = () => { st.showHolidays = !st.showHolidays; save('meta'); renderView(); };
  $('#sNot', v).onclick = async () => {
    if (st.notif) { st.notif = false; save('meta'); renderView(); return; }
    let ok = false;
    try { if ('Notification' in window) { const p = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission(); ok = p === 'granted'; } } catch (e) {}
    st.notif = true; save('meta'); renderView();
    toast(ok ? 'Avisos activados 🔔' : 'Te avisaré dentro de la app (con sonido) mientras esté abierta.');
  };
  $('#sTypes', v).onclick = () => openTypesManager();
  $('#sTut', v).onclick = () => tutorial(0);
  $('#sExp', v).onclick = exportData;
  $('#sImp', v).onchange = e => { const f = e.target.files[0]; if (f) importData(f); e.target.value = ''; };
  $('#sDel', v).onclick = async () => {
    if (!(await ask('¿Seguro que quieres borrar <b>todos</b> tus datos? Esto no se puede deshacer.', {yes: 'Sí, continuar'}))) return;
    if (!(await ask('Última confirmación: se borrarán todas tus áreas, tareas, eventos, rutinas y notas.', {yes: 'Borrar todo definitivamente'}))) return;
    const keep = {theme: st.theme}; S = blankState(); S.settings.theme = keep.theme; S.settings.tutorialSeen = true; save(); applyTheme(); render(); toast('Se borraron todos los datos');
  };
  setStoreLabel();
  if (window.NATIVE) NATIVE.decorateConfig(v);
}
async function exportData() {
  const data = JSON.stringify({app: 'mi-organizador-personal', exportedAt: new Date().toISOString(), data: S}, null, 1);
  const name = 'mi-organizador-copia-' + todayISO() + '.json';
  if (window.NATIVE) {
    try { const r = await NATIVE.saveBackup(name, data); toast('Copia guardada en ' + r.path + ' ✓'); return; } catch (e) { /* si falla, se muestra el texto para copiar */ }
  } else try {
    const dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
    if (dl) { await dl.save({filename: name, data}); toast('Copia guardada ✓'); return; }
  } catch (e) { if (e && e.code === 'declined') return; }
  try {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], {type: 'application/json'})); a.download = name; document.body.appendChild(a); a.click(); a.remove();
  } catch (e) {}
  openSheet({title: 'Copia de seguridad', body: `<p class="small">Si no se descargó el archivo, copia este texto y guárdalo en una nota o un correo. Para recuperarlo, pégalo en un archivo .json y usa “Importar”.</p><textarea class="inp" style="min-height:200px;font-size:12px" readonly id="bkT"></textarea>`, foot: `<button class="btn" id="bkC">Copiar texto</button>`,
    onMount: el => { el.querySelector('#bkT').value = data; el.querySelector('#bkC').onclick = async () => { try { await navigator.clipboard.writeText(data); toast('Copiado ✓'); } catch (e) { el.querySelector('#bkT').select(); toast('Selecciona y copia el texto'); } }; }});
}
function importData(file) {
  const r = new FileReader();
  r.onload = async () => {
    try {
      const j = JSON.parse(r.result); const d = j.data || j;
      if (!d || !Array.isArray(d.tasks) || !d.settings) throw new Error('formato');
      if (!(await ask('Esto reemplazará tus datos actuales por los del archivo. ¿Continuar?', {yes: 'Importar', danger: false}))) return;
      S = normalize(d); save(); applyTheme(); render(); toast('Datos importados ✓');
    } catch (e) { toast('Ese archivo no es una copia válida de Mi Organizador'); }
  };
  r.readAsText(file);
}

/* ========== TEMA ========== */
function applyTheme() {
  const t = S.settings.theme; const dark = t === 'dark' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const mc = document.querySelector('meta[name=theme-color]'); if (mc) mc.content = dark ? '#0f141d' : '#1f5fbf';
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (S.settings.theme === 'auto') applyTheme(); });

/* ========== TUTORIAL ========== */
const TUT = [
  ['¡Bienvenido!', 'Mi Organizador Personal te ayuda a planificar tu día, tu semana y tu mes en un solo lugar.', `<svg viewBox="0 0 220 140"><rect x="40" y="20" width="140" height="110" rx="16" fill="#e8f0fc"/><rect x="40" y="20" width="140" height="30" rx="14" fill="#f08a24"/><rect x="40" y="36" width="140" height="14" fill="#f08a24"/><path d="M80 88l20 20 42-42" stroke="#1f5fbf" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`],
  ['Añade tus áreas', 'Agrupa tu vida en áreas: Hogar, Trabajo, Salud, Familia… Cada una con su color.', `<svg viewBox="0 0 220 140"><rect x="18" y="20" width="86" height="48" rx="10" fill="#fff" stroke="#e3e7ef"/><rect x="18" y="20" width="86" height="8" rx="4" fill="#1f5fbf"/><rect x="116" y="20" width="86" height="48" rx="10" fill="#fff" stroke="#e3e7ef"/><rect x="116" y="20" width="86" height="8" rx="4" fill="#0f9d8f"/><rect x="18" y="78" width="86" height="48" rx="10" fill="#fff" stroke="#e3e7ef"/><rect x="18" y="78" width="86" height="8" rx="4" fill="#e0566b"/><rect x="116" y="78" width="86" height="48" rx="10" fill="#fff" stroke="#e3e7ef"/><rect x="116" y="78" width="86" height="8" rx="4" fill="#f08a24"/><text x="30" y="52" font-size="13" fill="#1d2433" font-family="sans-serif">🏠 Hogar</text><text x="128" y="52" font-size="13" fill="#1d2433" font-family="sans-serif">💼 Trabajo</text><text x="30" y="110" font-size="13" fill="#1d2433" font-family="sans-serif">🩺 Salud</text><text x="128" y="110" font-size="13" fill="#1d2433" font-family="sans-serif">👨‍👩‍👧 Familia</text></svg>`],
  ['Registra tu rutina', 'Lo que se repite cada semana (trabajo, gimnasio, iglesia) se anota una vez y aparece solo.', `<svg viewBox="0 0 220 140"><defs><pattern id="st" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="5" height="10" fill="#f0eafd"/></pattern></defs>${[0,1,2,3,4].map(i => `<rect x="${20 + i * 38}" y="20" width="32" height="104" rx="6" fill="#f4f6fa"/>`).join('')}${[0,2,4].map(i => `<rect x="${20 + i * 38}" y="40" width="32" height="30" rx="5" fill="url(#st)" stroke="#7b4fd6" stroke-width="2"/>`).join('')}${[1,3].map(i => `<rect x="${20 + i * 38}" y="80" width="32" height="26" rx="5" fill="url(#st)" stroke="#0f9d8f" stroke-width="2"/>`).join('')}</svg>`],
  ['Anota tus actividades', 'Escribe lo que tienes pendiente y la app adivina el tipo y el área. Los eventos van en el calendario.', `<svg viewBox="0 0 220 140"><rect x="20" y="26" width="180" height="36" rx="10" fill="#fff" stroke="#1f5fbf" stroke-width="2"/><text x="32" y="49" font-size="13" fill="#6b7487" font-family="sans-serif">cita con el dentista…</text><rect x="20" y="76" width="180" height="26" rx="8" fill="#dff5f2"/><text x="30" y="94" font-size="12" fill="#0f9d8f" font-family="sans-serif">📅 Cita · Salud · 3:00 p. m.</text><rect x="20" y="108" width="140" height="22" rx="8" fill="#e8f0fc"/><text x="30" y="123" font-size="12" fill="#1f5fbf" font-family="sans-serif">✅ Pagar la luz · Finanzas</text></svg>`],
  ['¡Listo!', 'Ya puedes empezar. Tus datos se guardan solos.', `<svg viewBox="0 0 220 140"><circle cx="110" cy="70" r="52" fill="#dff5f2"/><path d="M84 72l18 18 36-38" stroke="#2e9d5b" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="30" y="34" font-size="22">🎉</text><text x="168" y="118" font-size="22">✨</text></svg>`]
];
function tutorial(i) {
  sheets.slice().forEach(s => s.close());
  const [h, p, art] = TUT[i]; const last = i === TUT.length - 1;
  const s = openSheet({head: false, cls: 'small', body: `<div class="tut">${art}<h2>${h}</h2><p>${p}</p><div class="dots">${TUT.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div></div>`,
    foot: last ? `<button class="btn sec" id="tu1">Añadir mi primera área</button><button class="btn" id="tu2">Empezar a planificar</button>` : `<button class="btn sec" id="tuS">Saltar</button><button class="btn" id="tuN">Siguiente</button>`,
    onClose: () => { if (!S.settings.tutorialSeen) { S.settings.tutorialSeen = true; save('meta'); } },
    onMount: el => {
      const fin = () => { S.settings.tutorialSeen = true; save('meta'); s.close(); };
      if (last) { el.querySelector('#tu1').onclick = () => { fin(); go('areas'); setTimeout(() => openAreaForm(), 50); }; el.querySelector('#tu2').onclick = () => { fin(); go('dia'); setTimeout(() => { const q = $('#qIn'); q && q.focus(); }, 50); }; }
      else { el.querySelector('#tuS').onclick = fin; el.querySelector('#tuN').onclick = () => { s.close(); tutorial(i + 1); }; }
    }});
}

/* ========== INICIO ========== */
async function init() {
  const loc = window.NATIVE ? await NATIVE.load() : Store.loadLocal(); if (loc) S = normalize(loc);
  UI.motiv = nextMotiv();
  applyTheme(); shell(); render();
  if (!S.settings.tutorialSeen) setTimeout(() => tutorial(0), 300);
  Store.connect();
  setInterval(checkReminders, 20000); setTimeout(checkReminders, 3000);
  if (window.NATIVE) NATIVE.start();
  let lastDay = todayISO();
  setInterval(() => { if (todayISO() !== lastDay) { lastDay = todayISO(); UI.selDate = UI.calDate = lastDay; render(); } else if (UI.view === 'dia' && !sheets.length && document.activeElement && document.activeElement.id !== 'qIn') { /* refrescar "Lo próximo" */ const y = window.scrollY; renderView(); window.scrollTo(0, y); } }, 60000);
}
document.addEventListener('DOMContentLoaded', init);

/* ========== LISTAS ========== */
const listById = id => S.lists.find(l => l.id === id);
const LIST_TEMPLATES = [['🛒', 'Compras'], ['🏠', 'Casa'], ['✈️', 'Viaje'], ['🎁', 'Regalos'], ['💊', 'Farmacia'], ['📝', 'Pendientes']];
function vListas(v) {
  if (UI.openList && listById(UI.openList)) return vListaDetalle(v, listById(UI.openList));
  UI.openList = null;
  const q = norm(UI.q.trim());
  const lists = S.lists.filter(l => !q || norm(l.name).includes(q) || l.items.some(i => norm(i.t).includes(q)));
  v.innerHTML = `<div class="row" style="margin-bottom:12px"><p class="muted small" style="margin:0">Listas para ir marcando: compras, cosas de la casa, lo que llevar de viaje… Cada una por separado.</p><span class="sp"></span><button class="btn" id="lNew">+ Nueva lista</button></div>
    ${lists.length ? `<div class="grid g4">${lists.map(l => { const n = l.items.length, d = l.items.filter(i => i.done).length; const hit = q && !norm(l.name).includes(q) ? l.items.filter(i => norm(i.t).includes(q)).map(i => i.t).slice(0, 2).join(', ') : '';
      return `<div class="acard" data-ol="${l.id}" style="border-top-color:${l.color}"><h4>${l.icon} ${esc(l.name)}</h4><div class="small">${n ? `<b>${n - d}</b> por hacer · ${d} de ${n} listo${n === 1 ? '' : 's'}` : '<span class="muted">Vacía</span>'}</div>${n ? `<div class="hbar" style="margin-top:8px"><i style="width:${d / n * 100}%;background:${l.color}"></i></div>` : ''}${hit ? `<div class="xs muted" style="margin-top:6px">Encontrado: ${esc(hit)}</div>` : ''}</div>`; }).join('')}</div>`
      : q ? `<div class="empty">No hay listas que coincidan con “${esc(UI.q)}”.</div>` : `<div class="card empty"><div class="big">📋</div><b>Aún no tienes listas</b><p class="small">Crea una lista para ir marcando lo que vas haciendo o comprando.</p><button class="btn" id="lNew2">+ Crear mi primera lista</button></div>`}`;
  $('#lNew', v).onclick = () => openListForm();
  const n2 = $('#lNew2', v); if (n2) n2.onclick = () => openListForm();
  v.querySelectorAll('[data-ol]').forEach(c => c.onclick = () => { UI.openList = c.dataset.ol; UI.q = ''; $('#q').value = ''; $('#qx').classList.add('hidden'); renderView(); window.scrollTo(0, 0); });
}
function vListaDetalle(v, l) {
  const q = norm(UI.q.trim());
  const its = l.items.filter(i => !q || norm(i.t).includes(q));
  const pend = its.filter(i => !i.done), done = its.filter(i => i.done);
  const nd = l.items.filter(i => i.done).length;
  const row = i => `<div class="item ${i.done ? 'done' : ''}" data-li="${i.id}"><button class="check ${i.done ? 'on' : ''}" data-lc="${i.id}" aria-label="${i.done ? 'Desmarcar' : 'Marcar'}">${i.done ? '✓' : ''}</button><div class="body"><div class="t" style="white-space:normal">${esc(i.t)}</div></div><button class="btn ghost sm" data-ld="${i.id}" aria-label="Quitar de la lista" title="Quitar de la lista" style="color:var(--muted)">✕</button></div>`;
  v.innerHTML = `<button class="btn ghost sm" id="lBack">‹ Todas las listas</button>
    <div class="card" style="border-top:6px solid ${l.color};margin-top:6px"><div class="row wrap"><h2 style="margin:0;font-size:20px">${l.icon} ${esc(l.name)}</h2><span class="sp"></span><button class="btn sec sm" id="lEd">✎ Editar</button><button class="btn sec sm" id="lDel">🗑 Eliminar lista</button></div>
      <div class="small muted" style="margin-top:6px">${l.items.length ? `${l.items.length - nd} por hacer · ${nd} listo${nd === 1 ? '' : 's'}` : 'Lista vacía'}</div>
      <div class="goal" style="margin-top:12px"><input id="liAdd" placeholder="Añadir a la lista…" maxlength="300" autocomplete="off"><button class="btn" id="liBtn">Añadir</button></div>
      <div class="xs muted" style="margin-top:6px">Consejo: separa con comas para añadir varias cosas a la vez (leche, pan, huevos).</div></div>
    <div style="margin-top:12px">${pend.length ? pend.map(row).join('') : `<div class="empty small">${q ? 'Nada coincide con “' + esc(UI.q) + '”.' : l.items.length ? '🎉 ¡Todo listo en esta lista!' : 'Escribe arriba lo primero de la lista.'}</div>`}</div>
    ${done.length ? `<details class="fold" ${UI.showDoneItems ? 'open' : ''} id="lDone"><summary>Listos (${done.length})</summary>${done.map(row).join('')}<div class="row wrap" style="margin-top:6px"><button class="btn sec sm" id="lUn">↺ Desmarcar todos</button><button class="btn sec sm" id="lClr">Borrar los listos</button></div></details>` : ''}`;
  $('#lBack', v).onclick = () => { UI.openList = null; renderView(); };
  $('#lEd', v).onclick = () => openListForm(l);
  $('#lDel', v).onclick = async () => { if (await ask(`¿Eliminar la lista “${esc(l.name)}” y todo lo que tiene?`)) { S.lists = S.lists.filter(x => x.id !== l.id); UI.openList = null; save('lists'); render(); toast('Lista eliminada'); } };
  const inp = $('#liAdd', v);
  const add = () => {
    const raw = inp.value.trim(); if (!raw) { inp.focus(); return; }
    raw.split(/\n|,/).map(x => x.trim()).filter(Boolean).forEach(t => l.items.push({id: uid(), t: cap(t), done: false}));
    save('lists'); renderView(); setTimeout(() => { const n = $('#liAdd'); n && n.focus(); }, 0);
  };
  $('#liBtn', v).onclick = add;
  inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); add(); } };
  const ldn = $('#lDone', v); if (ldn) ldn.ontoggle = () => UI.showDoneItems = ldn.open;
  const toggle = id => { const i = l.items.find(x => x.id === id); i.done = !i.done; save('lists'); renderView(); };
  v.querySelectorAll('[data-lc]').forEach(b => b.onclick = e => { e.stopPropagation(); toggle(b.dataset.lc); });
  v.querySelectorAll('[data-li]').forEach(b => b.onclick = () => toggle(b.dataset.li));
  v.querySelectorAll('[data-ld]').forEach(b => b.onclick = e => { e.stopPropagation(); l.items = l.items.filter(x => x.id !== b.dataset.ld); save('lists'); renderView(); });
  const un = $('#lUn', v); if (un) un.onclick = () => { l.items.forEach(i => i.done = false); save('lists'); renderView(); toast('Lista lista para usar otra vez'); };
  const cl = $('#lClr', v); if (cl) cl.onclick = async () => { if (await ask('¿Borrar de la lista todo lo que está marcado como listo?', {yes: 'Borrar'})) { l.items = l.items.filter(i => !i.done); save('lists'); renderView(); } };
}
function openListForm(list) {
  const editing = !!list; const l = list ? {...list} : {id: uid(), name: '', icon: '📝', color: AREA_COLORS[S.lists.length % AREA_COLORS.length], items: []};
  const s = openSheet({title: editing ? 'Editar lista' : 'Nueva lista',
    body: `${editing ? '' : `<div class="fld"><label>Ideas rápidas</label><div class="opts">${LIST_TEMPLATES.map(([i, n]) => `<button type="button" class="opt" data-tpl="${i}|${n}">${i} ${n}</button>`).join('')}</div></div>`}
      <input class="inp title" id="lN" placeholder="Nombre de la lista" value="${esc(l.name)}" maxlength="40">
      <div class="fld"><label>Ícono</label><div class="emojis" id="lE"></div></div>
      <div class="fld"><label>Color</label><div class="colors" id="lC"></div></div>`,
    foot: `<button class="btn sec" data-close>Cancelar</button><button class="btn" id="lS">${editing ? 'Guardar' : 'Crear lista'}</button>`,
    onMount: el => {
      const icons = ['🛒', '🏠', '✈️', '🎁', '💊', '📝', '🧹', '🍽️', '🎒', '🐶', '💼', '⭐', '🎉', '🔧', '🧺', '❤️'];
      const pe = () => { el.querySelector('#lE').innerHTML = icons.map(e => `<button type="button" class="${e === l.icon ? 'on' : ''}" data-e="${e}">${e}</button>`).join(''); el.querySelectorAll('[data-e]').forEach(b => b.onclick = () => { l.icon = b.dataset.e; pe(); }); };
      const pc = () => { el.querySelector('#lC').innerHTML = AREA_COLORS.map(c => `<button type="button" class="${c === l.color ? 'on' : ''}" data-c="${c}" style="background:${c}" aria-label="color"></button>`).join(''); el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { l.color = b.dataset.c; pc(); }); };
      pe(); pc();
      el.querySelectorAll('[data-tpl]').forEach(b => b.onclick = () => { const [i, n] = b.dataset.tpl.split('|'); l.icon = i; el.querySelector('#lN').value = n; pe(); });
      el.querySelector('#lS').onclick = () => {
        l.name = el.querySelector('#lN').value.trim(); if (!l.name) { toast('Escribe el nombre de la lista'); el.querySelector('#lN').focus(); return; }
        if (editing) { const o = listById(l.id); o.name = l.name; o.icon = l.icon; o.color = l.color; } else S.lists.push(l);
        save('lists'); s.close(); UI.view = 'tareas'; UI.taskMode = 'listas'; UI.openList = l.id; render();
        if (!editing) setTimeout(() => { const a = $('#liAdd'); a && a.focus(); }, 60);
      };
      setTimeout(() => el.querySelector('#lN').focus(), 50);
    }});
}
