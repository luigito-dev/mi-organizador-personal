/* ========== Iconos ========== */
const IC = {
  dia: '<path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/><circle cx="12" cy="12" r="4"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  areas: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  rutina: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/><path d="M4 20v-5h5"/>',
  listas: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  tareas: '<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/>',
  enfoque: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
  notas: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  habitos: '<path d="M12 3c2 3 5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.5 1 2.5 2 3 0-3 0-5 1-7.5z"/>',
  progreso: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  config: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  mas: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'
};
const ic = (k, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;
const LOGO = `<svg width="34" height="34" viewBox="0 0 40 40"><rect x="4" y="7" width="32" height="29" rx="6" fill="#fff"/><rect x="4" y="7" width="32" height="9" rx="4" fill="#f08a24"/><rect x="4" y="12" width="32" height="4" fill="#f08a24"/><rect x="11" y="3" width="4" height="8" rx="2" fill="#fff" stroke="#174a96" stroke-width="1.5"/><rect x="25" y="3" width="4" height="8" rx="2" fill="#fff" stroke="#174a96" stroke-width="1.5"/><path d="M12.5 25.5l5 5 10-10" fill="none" stroke="#1f5fbf" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const SECTIONS = [
  ['dia', 'Mi Día', 'dia'], ['calendario', 'Calendario', 'cal'], ['areas', 'Áreas', 'areas'], ['rutina', 'Rutina semanal', 'rutina'],
  ['tareas', 'Tareas', 'tareas'], ['listas', 'Mis listas', 'listas'], ['habitos', 'Hábitos', 'habitos'], ['enfoque', 'Enfoque', 'enfoque'], ['notas', 'Mis notas', 'notas'], ['progreso', 'Progreso', 'progreso'], ['config', 'Configuración', 'config']
];
const UI = {freeShown: {}, daySel: null, view: 'dia', q: '', calDate: todayISO(), selDate: todayISO(), sumTab: 'hoy', taskTab: 'todo', filters: {area: '', type: '', prio: '', sort: 'fecha'}, showHiddenNotes: false, sideTab: 'citas', taskMode: 'tareas', openList: null, openArea: null, areaType: '', motivHidden: false, motiv: '', qWhen: 'hoy', qDate: null};
const isMobile = () => window.matchMedia('(max-width:820px)').matches;

/* ========== Estructura ========== */
function shell() {
  document.body.innerHTML = `<div class="app">
    <aside class="side"><div class="brand">${LOGO}<span>Mi Organizador<br>Personal</span></div><nav class="nav" id="nav">${SECTIONS.map(([k, n, i]) => `<button data-go="${k}">${ic(i)}${n}</button>`).join('')}</nav><div class="store storeLbl"></div></aside>
    <main class="main"><header class="top"><h1 id="vt"></h1><button class="iconbtn lsbtn hidden" id="lsBtn" aria-label="Hoy y mis listas"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="4" height="4" rx="1"/><path d="M4.5 7l1 1 1.5-2"/><rect x="3.5" y="14" width="4" height="4" rx="1"/><path d="M11 7h9M11 16h9"/></svg><span class="lsbadge" id="lsBadge"></span></button><button class="iconbtn sopen" id="sOpen" aria-label="Buscar">${ic('search')}</button><div class="search" id="sbox">${ic('search', 'si')}<input id="q" type="search" placeholder="Buscar…" autocomplete="off" aria-label="Buscar"><button class="sx hidden" id="qx" aria-label="Borrar">✕</button><div class="results hidden" id="res"></div></div></header>
    <section class="view" id="view"></section></main>
    <nav class="bottom" id="bnav"></nav>
    <button class="fab" id="fab" aria-label="Añadir">+</button><div id="mini"></div><div class="toasts" id="toasts"></div></div>`;
  buildBnav();
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
    else if (UI.view === 'habitos') openHabitForm();
    else if (UI.view === 'listas') { if (UI.openList && listById(UI.openList)) { const a = $('#liAdd'); a && a.focus(); } else openListForm(); }
    else openTaskForm(null, {areaId: UI.view === 'areas' ? UI.openArea : null});
  };
  const q = $('#q');
  $('#lsBtn').onclick = openListsPopup;
  $('#sOpen').onclick = () => { const t = $('.top'); t.classList.toggle('srch'); if (t.classList.contains('srch')) q.focus(); else { q.value = ''; UI.q = ''; $('#res').classList.add('hidden'); renderView(); } };
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
  UI.q = ''; $('#q').value = ''; $('#qx').classList.add('hidden'); $('#res').classList.add('hidden'); $('.top').classList.remove('srch');
  sheets.slice().forEach(s => s.close());
  render(); window.scrollTo(0, 0);
}
function bottomItems() {
  const b = (S.settings.navBar || []).filter(k => SECTIONS.some(x => x[0] === k));
  return b.length ? b.slice(0, 4) : ['dia', 'calendario', 'tareas', 'listas'];
}
function buildBnav() {
  const nav = $('#bnav'); if (!nav) return;
  nav.innerHTML = bottomItems().map(k => { const sec = SECTIONS.find(x => x[0] === k); return `<button data-go="${k}">${ic(sec[2])}${sec[1]}</button>`; }).join('') + `<button data-go="mas">${ic('mas')}Más</button>`;
}
function openNavEditor() {
  let sel = bottomItems().slice();
  const s = openSheet({title: 'Barra inferior', body: `<p class="small muted" style="margin:0 0 12px">Elige hasta 4 secciones. Las demás quedan en Más.</p><div class="pickgrid g">${SECTIONS.map(([k, n]) => `<button type="button" class="opt ${sel.includes(k) ? 'on' : ''}" data-nv="${k}">${n}</button>`).join('')}</div>`,
    foot: '<button class="btn ghost" id="nvReset">Restablecer</button><button class="btn" id="nvOk">Listo</button>',
    onMount: el => {
      el.querySelectorAll('[data-nv]').forEach(b => b.onclick = () => {
        const k = b.dataset.nv;
        if (sel.includes(k)) { if (sel.length > 1) sel = sel.filter(x => x !== k); }
        else if (sel.length < 4) sel.push(k);
        else { toast('Máximo 4 secciones en la barra'); return; }
        el.querySelectorAll('[data-nv]').forEach(x => x.classList.toggle('on', sel.includes(x.dataset.nv)));
      });
      el.querySelector('#nvReset').onclick = () => { S.settings.navBar = null; save('meta'); s.close(); render(); };
      el.querySelector('#nvOk').onclick = () => { S.settings.navBar = sel.slice(); save('meta'); s.close(); render(); };
    }});
}
function openMore() {
  const s = openSheet({title: 'Más', body: `<div class="more-grid">${SECTIONS.filter(x => !bottomItems().includes(x[0])).map(([k, n, i]) => `<button data-m="${k}">${ic(i)}${n}</button>`).join('')}</div><button class="btn ghost sm" id="nvEdit" style="margin:14px auto 0;display:block">Cambiar barra inferior</button><p class="xs muted storeLbl" style="text-align:center;margin-top:16px"></p>`,
    onMount: el => { setStoreLabel(); el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { s.close(); go(b.dataset.m); }); el.querySelector('#nvEdit').onclick = () => { s.close(); openNavEditor(); }; }});
}
function render() {
  buildBnav();
  const sec = SECTIONS.find(x => x[0] === UI.view);
  $('#vt').textContent = sec ? sec[1] : '';
  $$('#nav [data-go]').forEach(b => b.classList.toggle('on', b.dataset.go === UI.view));
  $$('#bnav [data-go]').forEach(b => b.classList.toggle('on', b.dataset.go === UI.view || (b.dataset.go === 'mas' && !bottomItems().includes(UI.view))));
  $('#sbox').classList.toggle('hidden', UI.view === 'enfoque'); $('#sOpen').classList.toggle('hidden', UI.view === 'enfoque');
  $('#q').placeholder = UI.view === 'listas' ? 'Buscar en listas…' : UI.view === 'tareas' ? 'Buscar en tareas…' : UI.view === 'notas' ? 'Buscar en notas…' : 'Buscar en toda la app…';
  $('#fab').classList.toggle('hidden', ['enfoque', 'progreso', 'config'].includes(UI.view));
  renderView(); renderMini(); setStoreLabel(); listBadge();
}
function renderView() {
  const v = $('#view');
  const fn = {dia: vDia2, calendario: vCal, areas: vAreas, rutina: vRutina, tareas: vTareas, listas: vListasView, habitos: vHabitos, enfoque: vEnfoque, notas: vNotas, progreso: vProgreso, config: vConfig}[UI.view];
  v.innerHTML = ''; fn(v); listBadge();
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
    else if (k === 'r') openRoutineForm(S.routines.find(x => x.id === id)); else if (k === 'l') { go('listas'); UI.openList = id; render(); } else if (k === 'a') { UI.openArea = id; UI.view = 'areas'; render(); }
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
/* ========== CALENDARIO ========== */
// Cuenta regresiva: días que faltan (o que pasaron) para fechas importantes
const CD_ICONS = ['🎂', '💰', '🎤', '🎆', '✈️', '💍', '👶', '🎓', '🏖️', '💼', '❤️', '🎄', '🏥', '⭐'];
function cdList() { return (S.settings.countdowns || []).slice().sort((a, b) => a.date.localeCompare(b.date)); }
const CD_COLORS = ['#f5c842', '#7dd3c0', '#f08a8a', '#9bb8f0', '#f4a6d0', '#b6e388', '#ffb36b'];
function calCuentas(body) {
  const t = todayISO(), list = cdList();
  const diff = c => dayDiff(t, c.date);
  const colorOf = c => c.color || CD_COLORS[Math.max(0, list.indexOf(c)) % CD_COLORS.length];
  const next = list.find(c => c.date >= t) || list.find(c => c.date < t);
  const row = c => { const n = diff(c), since = n < 0, hl = next && c.id === next.id; return `<button class="cdrow ${hl ? 'hl' : ''}" data-cd="${c.id}"><span class="cdi" style="background:${colorOf(c)}">${c.icon}</span><span class="cdn">${esc(c.name)}</span><span class="cdv"><b class="${since ? 'since' : ''}">${n === 0 ? 'Hoy' : Math.abs(n)}</b><small class="${since ? 'since' : ''}">${n === 0 ? '' : since ? 'Days Since' : 'Days Until'}</small></span></button>`; };
  const feat = next ? (() => { const n = diff(next), since = n < 0; return `<div class="cdfeat" style="${next.photo ? `background-image:url(${next.photo})` : `background:${colorOf(next)}`}">${next.photo ? '<div class="cdfshade"></div>' : ''}<div class="cdfbody"><b>${n === 0 ? 'Hoy' : Math.abs(n)}${n === 0 ? '' : '<small>D</small>'}</b><span>${esc(next.name)}</span><small class="cdfdate">${since ? 'Días desde' : 'Días para'} ${fmtShort(next.date)}</small></div></div>`; })() : '';
  body.innerHTML = `<div class="cdspace"><div class="row" style="margin-bottom:10px"><span class="sp"></span><button class="btn sm" id="cdNew">+ Nueva cuenta</button></div>
    ${feat}
    ${list.length ? list.map(row).join('') : '<div class="card empty"><div class="big">⏳</div>Aún no tienes cuentas. Toca “+ Nueva cuenta”.</div>'}</div>`;
  body.querySelector('#cdNew').onclick = () => openCountdownForm(null);
  body.querySelectorAll('[data-cd]').forEach(b => b.onclick = () => openCountdownForm(list.find(x => x.id === b.dataset.cd)));
}
function openCountdownForm(c) {
  const editing = !!c; let icon = c ? c.icon : CD_ICONS[0], photo = c ? c.photo || null : null;
  const s = openSheet({pin: editing ? 'cd:' + c.id : null, title: editing ? 'Editar cuenta' : 'Nueva cuenta', body: `
    <div class="fld"><label>Nombre</label><input class="inp" id="cdN" maxlength="40" value="${esc(c ? c.name : '')}" placeholder="Ej.: Cumpleaños de mamá"></div>
    <div class="fld"><label>Fecha</label><input class="inp" type="date" id="cdD" value="${c ? c.date : todayISO()}"></div>
    <div class="fld"><label>Ícono</label><div class="emojis" id="cdI">${CD_ICONS.map(x => `<button type="button" class="opt ${x === icon ? 'on' : ''}" data-ci="${x}">${x}</button>`).join('')}</div></div>
    <div class="fld"><label>Foto (opcional)</label><input class="inp" type="file" accept="image/*" id="cdP"><img id="cdPi" class="nfimg" alt="" ${photo ? `src="${photo}"` : 'hidden'}></div>`,
    foot: `${editing ? '<button class="btn sec" id="cdDel" aria-label="Eliminar" title="Eliminar"><i class="xdel"></i></button>' : ''}<button class="btn" id="cdS">Guardar</button>`,
    onMount: el => {
      const q = x => el.querySelector(x);
      el.querySelectorAll('[data-ci]').forEach(b => b.onclick = () => { icon = b.dataset.ci; el.querySelectorAll('[data-ci]').forEach(x => x.classList.toggle('on', x === b)); });
      q('#cdP').onchange = async e => { const f = e.target.files[0]; if (!f) return; const img = new Image(), url = URL.createObjectURL(f); img.onload = () => { const sc = Math.min(1, 320 / Math.max(img.width, img.height)), cv = document.createElement('canvas'); cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc); cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url); photo = cv.toDataURL('image/jpeg', .6); q('#cdPi').src = photo; q('#cdPi').hidden = false; }; img.src = url; };
      q('#cdS').onclick = () => {
        const name = (q('#cdN').value || '').trim(), date = q('#cdD').value;
        if (!name || !date) { toast('Pon un nombre y una fecha'); return; }
        S.settings.countdowns = S.settings.countdowns || [];
        if (editing) Object.assign(c, {name, date, icon, photo: photo || undefined});
        else S.settings.countdowns.push({id: uid(), name, date, icon, photo: photo || undefined});
        save('meta'); s.close(); renderView(); toast('Cuenta guardada');
      };
      const d = q('#cdDel'); if (d) d.onclick = async () => { if (await ask(`¿Eliminar “${esc(c.name)}”?`, {yes: 'Eliminar'})) { S.settings.countdowns = S.settings.countdowns.filter(x => x.id !== c.id); save('meta'); s.close(); renderView(); } };
    }});
}
// Espacio propio de eventos dentro de Calendario
function calEventos(body) {
  const t = todayISO();
  const list = S.events.filter(e => (e.date || '') >= t).sort((a, b) => (a.date + (a.start || '')).localeCompare(b.date + (b.start || ''))).slice(0, 80);
  const groups = []; list.forEach(e => { const g = groups.find(x => x[0] === e.date); g ? g[1].push(e) : groups.push([e.date, [e]]); });
  body.innerHTML = `<div class="evspace"><div class="row" style="margin-bottom:10px"><span class="sp"></span><button class="btn sm" id="evNew">+ Nuevo evento</button></div>
    ${groups.length ? groups.map(([dd, its]) => `<div class="sec-title">${cap(fmtLong(dd))}</div>${its.map(e => itemHTML('ev', e, {date: false})).join('')}`).join('') : '<div class="card empty"><div class="big">🗓️</div>No tienes eventos próximos. Toca “+ Nuevo evento”.</div>'}</div>`;
  body.querySelector('#evNew').onclick = () => openEventForm(null, {date: t});
  body.querySelectorAll('[data-ev]').forEach(b => b.onclick = e => { e.stopPropagation(); openEventDetail(b.dataset.ev); });
}
function calTitle(view, d) {
  const dd = parseISO(d);
  if (view === 'month') return cap(MESES[dd.getMonth()]) + ' ' + dd.getFullYear();
  if (view === 'day') return fmtLong(d) + ' ' + dd.getFullYear();
  if (view === 'eventos') return 'Mis eventos';
  if (view === 'cuentas') return 'Cuenta regresiva';
  if (view === 'forecast') { const e = parseISO(addDays(d, 13)); return `${dd.getDate()} ${MESES[dd.getMonth()].slice(0, 3)} – ${e.getDate()} ${MESES[e.getMonth()].slice(0, 3)} ${e.getFullYear()}`; }
  const w = weekDays8(d); const a = parseISO(w[0]), b = parseISO(w[w.length - 1]);
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
      <div class="seg">${[['month', 'Mes'], ['week', 'Semana'], ['day', 'Día'], ['forecast', 'Próximos'], ['eventos', 'Eventos'], ['cuentas', 'Cuentas']].map(([k, n]) => `<button data-cv="${k}" class="${view === k ? 'on' : ''}">${n}</button>`).join('')}</div>${view === 'month' ? '<button class="iconbtn" id="calBg" aria-label="Fondo del calendario" title="Fondo del calendario"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="M21 16l-5-5-8 9"/></svg></button>' : ''}</div>
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
  const step = n => { const x = parseISO(d); if (view === 'month') x.setMonth(x.getMonth() + n, 1); else x.setDate(x.getDate() + (view === 'week' ? 7 : view === 'forecast' ? 14 : 1) * n); UI.calDate = iso(x); if (view === 'day') UI.selDate = UI.calDate; renderView(); };
  $('#cPrev', v).onclick = () => step(-1); $('#cNext', v).onclick = () => step(1);
  $('#cToday', v).onclick = () => { UI.calDate = UI.selDate = todayISO(); renderView(); };
  const cb = $('#calBg', v); if (cb) cb.onclick = openCalBg;
  v.querySelectorAll('[data-cv]').forEach(b => b.onclick = () => { S.settings.calView = b.dataset.cv; if (b.dataset.cv !== 'month') UI.calDate = UI.selDate; save('meta'); renderView(); });
  const body = $('#calBody', v), extra = $('#calExtra', v);
  if (view === 'month') { calMonth(body, d); extra.innerHTML = '<div class="daypanel card" id="dp"></div>'; dayPanel($('#dp', v), UI.selDate); }
  else if (view === 'week') { calWeek(body, d); planner(extra, d); }
  else if (view === 'forecast') calForecast(body, d);
  else if (view === 'eventos') { calEventos(body); $('#cPrev', v).style.display = $('#cNext', v).style.display = $('#cToday', v).style.display = 'none'; }
  else if (view === 'cuentas') { calCuentas(body); $('#cPrev', v).style.display = $('#cNext', v).style.display = $('#cToday', v).style.display = 'none'; }
  else { UI.selDate = d; calDay(body, d); extra.innerHTML = '<div class="daypanel card" id="dp"></div>'; dayPanel($('#dp', v), d); }
}
function pillHTML(i) {
  const c = colorOf(i.k, i.x);
  if (i.k === 'ev') return `<span class="pill ev" style="background:${c}" data-ev="${i.x.id}">${evType(i.x.evType).icon} ${i.x.allDay ? '' : fmtTime(i.x.start).replace(/:00| /g, '').replace('a.m.', 'a').replace('p.m.', 'p') + ' '}${esc(i.x.title)}</span>`;
  if (i.k === 'tk') return `<span class="pill tk ${isDone(i.x) ? 'done' : ''}" style="border-color:${c}" data-tk="${i.x.id}">${typeById(i.x.typeId).icon} ${esc(i.x.title)}</span>`;
  return `<span class="pill rt" style="border-color:${c}" data-rt="${i.x.id}">🔁 ${esc(i.x.name)}</span>`;
}
function calMonth(body, d) {
  if (isMobile()) return S.settings.monthStyle === 'puntos' ? calMonthClean(body, d) : calMonthDetail(body, d);
  const cells = monthCells(d), m = parseISO(d).getMonth(), max = isMobile() ? 2 : 3;
  body.innerHTML = `<div class="month mbg ${calBgDark() ? 'bgdark' : ''}" style="${calBgStyle(m)}">${wdHeaders().map(w => `<div class="wd">${w}</div>`).join('')}${cells.map(c => {
    const its = sortedDay(c, {withDone: true}); const ho = holidaysOn(c);
    const pills = [...ho.map(h => `<span class="pill ho" title="${esc(h.name)}">🎉 ${esc(h.name)}</span>`), ...its.map(pillHTML)];
    return `<div class="mcell ${parseISO(c).getMonth() !== m ? 'out' : ''} ${c === todayISO() ? 'today' : ''} ${c === UI.selDate ? 'sel' : ''} ${ho.length ? 'holi' : ''}" data-day="${c}"><div class="n">${parseISO(c).getDate()}</div>${daySticker(c) ? `<span class="mstk">${daySticker(c)}</span>` : ''}${isMobile() ? `<div class="dots2">${its.slice(0, 6).map(i => `<i class="${i.k}" style="background:${colorOf(i.k, i.x)};color:${colorOf(i.k, i.x)}"></i>`).join('')}</div>${its.length > 6 ? '<div class="more">+' + (its.length - 6) + '</div>' : ''}` : pills.slice(0, max).join('') + (pills.length > max ? `<div class="more">+${pills.length - max} más</div>` : '')}</div>`;
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
  el.innerHTML = hlDay(d, sortedDay(d, {withDone: true}), {holidays: true});
  wireHl(el, () => openEventForm(null, {date: d}, S.settings.calView === 'month' ? 'month' : undefined));
}
const H0 = 0, H1 = 24, SLOT = 48;
function timeGrid(body, days, onSlot, opts = {}) {
  const cols = days.length;
  let h = `<div class="tgrid ${opts.cls || ''}" style="grid-template-columns:58px repeat(${cols},minmax(0,1fr))"><div class="hh"></div>`;
  days.forEach(d => { const ho = holidaysOn(d); h += `<div class="hh ${d === todayISO() ? 'today' : ''} ${ho.length ? 'holi' : ''}" ${opts.noHead ? '' : `data-hd="${d}"`} style="cursor:pointer">${opts.dayLabel ? opts.dayLabel(d) : DCORTO[dow(d)] + ' ' + parseISO(d).getDate()}${ho.length ? ' 🎉' : ''}</div>`; });
  if (!opts.noAllDay) {
    h += `<div class="tl" style="height:auto;transform:none;padding-top:4px">todo el día</div>`;
    days.forEach(d => { const ad = [...holidaysOn(d).map(x => `<span class="pill ho">🎉 ${esc(x.name)}</span>`), ...S.events.filter(e => evOn(e, d) && (e.date !== d || e.allDay) && areaVisible(e.areaId)).map(e => pillHTML({k: 'ev', x: e})), ...S.tasks.filter(t => t.date === d && !t.time && areaVisible(t.areaId)).map(t => pillHTML({k: 'tk', x: t}))]; h += `<div class="allday">${ad.join('')}</div>`; });
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
    <div class="card" style="border-top:6px solid ${a.color};margin-top:6px"><div class="row wrap"><h2 style="margin:0;font-size:20px">${esc(a.name)}</h2><span class="sp"></span><button class="btn sec sm" id="aEd">✎ Editar</button><button class="btn sec sm" id="aDel" aria-label="Eliminar área" title="Eliminar área"><i class="xdel"></i></button></div>
      <div class="small muted" style="margin-top:6px">${a.contact ? '👤 ' + esc(a.contact) + ' · ' : ''}${a.place ? '📍 ' + esc(a.place) : ''}</div>${a.obs ? `<div class="small" style="margin-top:6px;white-space:pre-wrap">${esc(a.obs)}</div>` : ''}
      <div class="row wrap" style="margin-top:12px"><button class="btn sm" id="adT">+ Tarea</button><button class="btn sm sec" id="adE">+ Evento</button><button class="btn sm sec" id="adR">+ Rutina</button><button class="btn sm sec" id="adN">+ Nota</button></div></div>
    <div class="sec-title">Actividades</div>
    ${usedTypes.length > 1 ? `<div class="chips" style="margin-bottom:8px"><button class="chip ${!UI.areaType ? 'on' : ''}" data-at="">Todas</button>${usedTypes.map(id => `<button class="chip ${UI.areaType === id ? 'on' : ''}" data-at="${id}">${typeById(id).icon} ${esc(typeById(id).name)}</button>`).join('')}</div>` : ''}
    ${pend.length ? pend.map(t => itemHTML('tk', t, {date: true})).join('') : '<div class="muted small">No hay tareas pendientes en esta área.</div>'}
    ${done.length ? `<div class="donesec"><div class="sec-title">Completadas (${done.length})</div>${done.sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0)).map(t => itemHTML('tk', t, {date: true})).join('')}</div>` : ''}
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
  UI.taskMode = 'tareas'; UI.taskHub = false;
  vTareasList(v);
}
function vListasView(v) {
  UI.taskMode = 'listas';
  vListas(v);
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
    <div id="tList">${list.length ? (() => { const groups = []; list.forEach(t => { const g = groups.find(x => x[0] === t.date); g ? g[1].push({k: 'tk', x: t}) : groups.push([t.date, [{k: 'tk', x: t}]]); }); return groups.map(([dd, its]) => hlDay(dd, its, {tasksView: true})).join(''); })() : `<div class="card empty"><div class="big">${UI.taskTab === 'done' ? '🏁' : '🎉'}</div>${q ? 'No hay tareas que coincidan con “' + esc(UI.q) + '”.' : UI.taskTab === 'late' ? '¡Nada atrasado! Vas al día.' : UI.taskTab === 'done' ? 'Aún no has completado tareas.' : 'No tienes tareas por hacer.'}</div>`}</div>`;
  v.querySelectorAll('[data-tt]').forEach(b => b.onclick = () => { UI.taskTab = b.dataset.tt; renderView(); });
  v.querySelectorAll('[data-rf]').forEach(b => b.onclick = () => { UI.filters[b.dataset.rf] = b.dataset.rf === 'sort' ? 'fecha' : ''; renderView(); });
  $('#tNew', v).onclick = () => openTaskForm();
  wireHl(v, null);
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
const F = {phase: 'idle', endAt: 0, remain: 0, total: 0, paused: false, blocks: 0, tick: null, startedAt: 0, swBase: 0, swAt: 0};
const presetNow = () => FOCUS_PRESETS[S.settings.focusPreset] || FOCUS_PRESETS[1];
const ACTS = [['🎯', 'Enfoque'], ['🧘', 'Meditar'], ['💼', 'Trabajo'], ['📖', 'Leer'], ['🏠', 'Casa'], ['🏃', 'Ejercicio'], ['✍️', 'Escribir'], ['🙏', 'Orar']];
function fcfg() {
  const d = {mode: 'pomo', sound: 'none', vol: 0.6, style: 'ring', act: '🎯 Enfoque', cdMin: 30, acts: [], customName: ''};
  let f = S.settings.focus || (S.settings.focus = {}); if (Object.isFrozen(f)) f = S.settings.focus = JSON.parse(JSON.stringify(f)); for (const k in d) if (f[k] === undefined) f[k] = d[k]; return f;
}
const isRunning = () => ['work', 'short', 'long', 'cd', 'sw'].includes(F.phase);
function focusLogAdd(min, block) {
  const d = todayISO(); const l = S.focusLog[d] || {blocks: 0, minutes: 0}; const m = Math.round(min);
  l.minutes += m; if (block) l.blocks++;
  if (m > 0) { l.acts = l.acts || {}; const a = fcfg().act; l.acts[a] = (l.acts[a] || 0) + m; }
  S.focusLog[d] = l; save('meta');
}
function soundFor() { const c = fcfg(); const want = (F.phase === 'work' || F.phase === 'cd' || F.phase === 'sw') && !F.paused ? c.sound : 'none'; if (Ambient.curId !== want) { Ambient.setVolume(c.vol); Ambient.play(want); } }
let wakeLock = null;
async function keepAwake(on) { try { if (on && !wakeLock && navigator.wakeLock) { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => wakeLock = null); } else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; } } catch (e) {} }
function focusStart(phase) {
  const [w, b] = presetNow(), c = fcfg();
  const mins = phase === 'work' ? w : phase === 'long' ? b * 3 : phase === 'cd' ? c.cdMin : b;
  F.phase = phase; F.paused = false; F.startedAt = Date.now();
  if (phase === 'sw') { F.swBase = 0; F.swAt = Date.now(); F.total = 0; F.remain = 0; }
  else { F.total = mins * 60; F.remain = F.total; F.endAt = Date.now() + F.total * 1000; }
  try { Ambient.init(); } catch (e) {}
  keepAwake(true); focusLoop();
}
const swElapsed = () => Math.floor((F.swBase + (F.paused ? 0 : Date.now() - F.swAt)) / 1000);
function focusLoop() {
  clearInterval(F.tick);
  F.tick = setInterval(() => {
    if (F.paused || !isRunning()) return;
    if (F.phase === 'sw') { F.remain = swElapsed(); paintFocus(); return; }
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
  } else if (F.phase === 'cd') {
    focusLogAdd(F.total / 60, true); clearInterval(F.tick); F.phase = 'idle'; keepAwake(false); toast('⏰ ¡Tiempo cumplido! Buen trabajo.'); paintFocus();
  } else { F.phase = 'wait'; clearInterval(F.tick); keepAwake(false); toast('Descanso terminado. ¿Listo para el siguiente?'); paintFocus(); }
}
async function focusStop(askSave = true) {
  const ph = F.phase;
  if (ph === 'sw') { const m = Math.floor(swElapsed() / 60); F.paused = true; if (m >= 1) focusLogAdd(m, false); if (m >= 1) toast(`Guardé ${m} minuto${m === 1 ? '' : 's'} de ${fcfg().act.replace(/^\S+\s/, '')}`); }
  else if ((ph === 'work' || ph === 'cd') && askSave) {
    const elapsed = (F.total - F.remain) / 60; F.paused = true; paintFocus();
    if (elapsed >= 1) {
      const r = await ask(`Terminaste antes de tiempo. ¿Guardar ${Math.floor(elapsed)} minuto${Math.floor(elapsed) === 1 ? '' : 's'} de enfoque?`, {yes: 'Guardar minutos', no: 'No guardar', danger: false});
      if (r === true) focusLogAdd(Math.floor(elapsed), false);
    }
  }
  clearInterval(F.tick); F.phase = 'idle'; F.paused = false; F.remain = 0; F.blocks = 0; keepAwake(false); paintFocus(); renderMini();
}
function focusTogglePause() {
  if (!isRunning()) return;
  if (F.phase === 'sw') { if (F.paused) { F.swAt = Date.now(); F.paused = false; } else { F.swBase += Date.now() - F.swAt; F.paused = true; } }
  else if (F.paused) { F.endAt = Date.now() + F.remain * 1000; F.paused = false; } else { F.remain = Math.max(0, Math.round((F.endAt - Date.now()) / 1000)); F.paused = true; }
  paintFocus();
}
function focusSkip() {
  if (F.phase === 'work') { F.blocks++; focusLogAdd((F.total - F.remain) / 60, false); focusStart(F.blocks % 4 === 0 ? 'long' : 'short'); }
  else if (F.phase === 'short' || F.phase === 'long') { F.phase = 'wait'; clearInterval(F.tick); paintFocus(); }
}
const mmss = s => s >= 3600 ? Math.floor(s / 3600) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60) : pad(Math.floor(s / 60)) + ':' + pad(s % 60);
function paintFocus() {
  soundFor();
  if (UI.view === 'enfoque') { const b = $('#fBody'); if (b) fillFocus(b); }
  paintFullscreen(); renderMini();
}
function renderMini() {
  const m = $('#mini'); if (!m) return;
  if (UI.view === 'enfoque' || F.phase === 'idle' || $('#fsOv')) { m.innerHTML = ''; return; }
  const lbl = F.phase === 'wait' ? 'Descanso listo' : (F.phase === 'short' || F.phase === 'long' ? '☕ ' : '🎯 ') + mmss(F.remain);
  m.innerHTML = `<div class="minitimer" role="timer"><span id="miniGo" style="cursor:pointer">${lbl}</span>${F.phase === 'wait' ? '' : `<button id="miniP" aria-label="Pausar">${F.paused ? '▶' : '❚❚'}</button>`}<button id="miniS" aria-label="Detener">■</button></div>`;
  $('#miniGo').onclick = () => go('enfoque');
  const mp = $('#miniP'); if (mp) mp.onclick = focusTogglePause;
  $('#miniS').onclick = () => focusStop(true);
}
function vEnfoque(v) {
  v.innerHTML = `<div class="focus-page"><div class="card focus-card"><div id="fBody" class="focus"></div></div><div class="card" id="fToday"></div></div>`;
  Ambient.warm();
  fillFocus($('#fBody', v));
}
function clockState() {
  const c = fcfg(), [w, br] = presetNow();
  const idleSecs = c.mode === 'pomo' ? w * 60 : c.mode === 'cd' ? c.cdMin * 60 : 0;
  const total = F.phase === 'idle' ? (idleSecs || 1) : F.phase === 'sw' ? 3600 : (F.total || 1);
  const rem = F.phase === 'idle' ? idleSecs : F.phase === 'wait' ? 0 : F.remain;
  const brk = F.phase === 'short' || F.phase === 'long';
  const lbl = F.paused ? 'En pausa' : {idle: 'Listo para empezar', work: 'Enfocado', short: 'Descanso corto', long: 'Descanso largo', wait: 'Descanso terminado', cd: 'Cuenta regresiva', sw: 'Cronómetro'}[F.phase];
  const frac = F.phase === 'sw' ? (rem % 3600) / 3600 : rem / total;
  return {rem, frac, lbl, color: brk || F.phase === 'wait' ? 'var(--teal)' : c.mode === 'sw' ? 'var(--purple)' : c.mode === 'cd' ? 'var(--blue)' : 'var(--orange)', w, br};
}
function clockHTML(big) {
  const c = fcfg(), st = clockState();
  if (c.style === 'flip') {
    const t = mmss(st.rem).split(':');
    return `<div class="flip ${big ? 'big' : ''}">${t.map((g, i) => `${i ? '<span class="fcol">:</span>' : ''}${g.split('').map(d => `<span class="fcard">${d}</span>`).join('')}`).join('')}</div><div class="flip-lbl">${st.lbl}</div>`;
  }
  const r = 118, cc = 2 * Math.PI * r;
  return `<div class="fring ${big ? 'big' : ''}"><svg width="100%" height="100%" viewBox="0 0 260 260"><circle cx="130" cy="130" r="${r}" stroke="var(--soft)" stroke-width="12" fill="none"/><circle cx="130" cy="130" r="${r}" stroke="${st.color}" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="${cc}" stroke-dashoffset="${cc * (1 - st.frac)}" style="transition:stroke-dashoffset .3s linear"/></svg><div class="c"><b>${mmss(st.rem)}</b><span>${st.lbl}</span></div></div>`;
}
function controlsHTML(prefix = 'f') {
  const c = fcfg();
  if (F.phase === 'idle') return `<button class="btn fgo" id="${prefix}Go">▶ Empezar</button>`;
  if (F.phase === 'wait') return `<button class="btn fgo" id="${prefix}Next">▶ Empezar siguiente</button><button class="btn sec" id="${prefix}End">Terminar</button>`;
  return `<button class="btn" id="${prefix}P">${F.paused ? '▶ Seguir' : '❚❚ Pausar'}</button>${c.mode === 'pomo' ? `<button class="btn sec" id="${prefix}Sk">⏭ Saltar</button>` : ''}<button class="btn sec" id="${prefix}End">■ ${c.mode === 'sw' ? 'Detener' : 'Terminar'}</button>`;
}
function wireControls(root, prefix = 'f') {
  const c = fcfg();
  const g = $('#' + prefix + 'Go', root); if (g) g.onclick = () => { try { Ambient.init(); } catch (e) {} F.blocks = 0; focusStart(c.mode === 'pomo' ? 'work' : c.mode); };
  const n = $('#' + prefix + 'Next', root); if (n) n.onclick = () => focusStart('work');
  const p = $('#' + prefix + 'P', root); if (p) p.onclick = focusTogglePause;
  const sk = $('#' + prefix + 'Sk', root); if (sk) sk.onclick = focusSkip;
  const e = $('#' + prefix + 'End', root); if (e) e.onclick = () => focusStop(true);
}
function fillFocus(b) {
  const c = fcfg(), st = clockState(), idle = F.phase === 'idle';
  const snd = SOUNDS.find(x => x[0] === c.sound) || SOUNDS[0];
  let setup = '';
  if (idle && c.mode === 'pomo') setup = `<div class="hscroll">${FOCUS_PRESETS.map(([a, d], i) => `<button class="chip ${S.settings.focusPreset === i ? 'on' : ''}" data-fp="${i}">${a} min <span class="cnt">☕ ${d}</span></button>`).join('')}</div>`;
  else if (idle && c.mode === 'cd') setup = `<div class="hscroll">${[5, 10, 15, 20, 30, 45, 60, 90].map(m => `<button class="chip ${c.cdMin === m ? 'on' : ''}" data-cd="${m}">${m} min</button>`).join('')}<button class="chip ${[5, 10, 15, 20, 30, 45, 60, 90].includes(c.cdMin) ? '' : 'on'}" id="cdOther">${[5, 10, 15, 20, 30, 45, 60, 90].includes(c.cdMin) ? 'Otro' : c.cdMin + ' min'}</button></div>`;
  else if (idle && c.mode === 'sw') setup = `<div class="small muted">Cuenta hacia arriba hasta que lo detengas.</div>`;
  else if (c.mode === 'pomo' && F.phase !== 'wait') setup = `<div class="small muted">Bloque ${F.phase === 'work' ? F.blocks + 1 : F.blocks} · ${st.w} min de enfoque, ${st.br} de descanso</div>`;
  b.innerHTML = `<div class="seg fmodes ${idle ? '' : 'locked'}">${[['pomo', 'Pomodoro'], ['cd', 'Cuenta regresiva'], ['sw', 'Cronómetro']].map(([k, n]) => `<button data-fm="${k}" class="${c.mode === k ? 'on' : ''}" ${idle ? '' : 'disabled'}>${n}</button>`).join('')}</div>
    <button class="actchip" id="fAct">${esc(c.act)} <span class="muted">▾</span></button>
    ${clockHTML(false)}
    <div class="fsetup">${setup}</div>
    <div class="fctl">${controlsHTML('f')}</div>
    <div class="ftools">
      <button id="fSnd" class="${c.sound !== 'none' ? 'on' : ''}"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${SOUND_ICONS[snd[0]]}</svg><span>${snd[0] === 'custom' && c.customName ? esc(c.customName.slice(0, 14)) : snd[1]}</span></button>
      <button id="fSty"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${c.style === 'flip' ? '<rect x="3" y="5" width="7" height="14" rx="2"/><rect x="14" y="5" width="7" height="14" rx="2"/><path d="M3 12h7M14 12h7"/>' : '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 8 8"/>'}</svg><span>${c.style === 'flip' ? 'Tarjetas' : 'Anillo'}</span></button>
      <button id="fFull"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg><span>Pantalla completa</span></button>
    </div>`;
  b.querySelectorAll('[data-fm]').forEach(x => x.onclick = () => { c.mode = x.dataset.fm; save('meta'); fillFocus(b); });
  b.querySelectorAll('[data-fp]').forEach(x => x.onclick = () => { S.settings.focusPreset = +x.dataset.fp; save('meta'); fillFocus(b); });
  b.querySelectorAll('[data-cd]').forEach(x => x.onclick = () => { c.cdMin = +x.dataset.cd; save('meta'); fillFocus(b); });
  const co = $('#cdOther', b); if (co) co.onclick = () => openCdOther(b);
  $('#fAct', b).onclick = openActivities;
  $('#fSnd', b).onclick = openSounds;
  $('#fSty', b).onclick = () => { c.style = c.style === 'flip' ? 'ring' : 'flip'; save('meta'); fillFocus(b); };
  $('#fFull', b).onclick = openFullscreen;
  wireControls(b, 'f');
  const ft = $('#fToday');
  if (ft) {
    const l = S.focusLog[todayISO()] || {blocks: 0, minutes: 0}; const acts = Object.entries(l.acts || {}).sort((x, y) => y[1] - x[1]);
    ft.innerHTML = `<h3>🎯 Hoy</h3><div class="stats" style="grid-template-columns:1fr 1fr;margin:0"><div class="stat"><b>${l.blocks}</b><span>Bloques completos</span></div><div class="stat"><b>${l.minutes}</b><span>Minutos de enfoque</span></div></div>${acts.length ? `<div class="chips" style="margin-top:10px">${acts.map(([a, m]) => `<span class="tag">${esc(a)} · ${m} min</span>`).join('')}</div>` : ''}<p class="xs muted" style="margin:10px 0 0">Enfoque es un temporizador aparte: no cambia tus tareas ni tu calendario. En Pomodoro, cada 4 bloques tienes un descanso largo.</p>`;
  }
}
function openCdOther(b) {
  const c = fcfg();
  const s = openSheet({title: 'Cuenta regresiva', cls: 'small', body: `<div class="fld"><label>Minutos</label><input class="inp" id="cdN" readonly inputmode="none" data-wheel data-min="1" data-max="300" data-unit="min" data-title="Minutos" value="${c.cdMin}"></div>`,
    foot: `<button class="btn sec" data-close>Cancelar</button><button class="btn" id="cdOk">Listo</button>`,
    onMount: el => { const i = el.querySelector('#cdN'); setTimeout(() => i.select(), 50); el.querySelector('#cdOk').onclick = () => { const v = Math.round(+i.value); if (!v || v < 1 || v > 600) { toast('Escribe entre 1 y 600 minutos'); return; } c.cdMin = v; save('meta'); s.close(); fillFocus(b); }; }});
}
function openActivities() {
  const c = fcfg();
  const s = openSheet({title: '¿En qué te vas a enfocar?', cls: 'small', body: '<div id="acL" class="opts"></div><details class="fold"><summary>Nueva actividad</summary><div class="goal"><input id="acN" placeholder="Ej. Pintar" maxlength="24"><button class="btn" id="acAdd">Añadir</button></div><div class="emojis" id="acE" style="margin-top:8px"></div></details>',
    onMount: el => {
      let em = '⭐';
      const paint = () => {
        const all = [...ACTS.map(([e, n]) => e + ' ' + n), ...c.acts];
        el.querySelector('#acL').innerHTML = all.map(a => `<button class="opt ${a === c.act ? 'on' : ''}" data-ac="${esc(a)}">${esc(a)}</button>`).join('');
        el.querySelectorAll('[data-ac]').forEach(x => x.onclick = () => { c.act = x.dataset.ac; save('meta'); s.close(); renderView(); paintFullscreen(); });
        el.querySelector('#acE').innerHTML = EMOJIS.map(e => `<button type="button" class="${e === em ? 'on' : ''}" data-e="${e}">${e}</button>`).join('');
        el.querySelectorAll('[data-e]').forEach(x => x.onclick = () => { em = x.dataset.e; paint(); });
      };
      paint();
      el.querySelector('#acAdd').onclick = () => { const n = el.querySelector('#acN').value.trim(); if (!n) return; const a = em + ' ' + n; if (!c.acts.includes(a)) c.acts.push(a); c.act = a; save('meta'); s.close(); renderView(); };
    }});
}
function openSounds() {
  const c = fcfg(); const running = isRunning() && !F.paused && F.phase !== 'short' && F.phase !== 'long';
  const s = openSheet({title: 'Sonido de ambiente', body: `<div class="sgrid" id="sg"></div>
      <div class="fld row"><span>🔈</span><input type="range" id="sVol" min="0" max="1" step="0.05" value="${c.vol}" style="flex:1;accent-color:var(--blue)" aria-label="Volumen"><span>🔊</span></div>
      <label class="btn sec full" style="cursor:pointer;margin-top:4px">⬆ Importar mi sonido<input type="file" id="sImpS" accept="audio/*" class="fileover"></label>
      <p class="xs muted" style="margin:10px 0 0">Toca un sonido para escucharlo. Suena mientras corre el reloj y se pausa en los descansos.</p>`,
    foot: `<button class="btn" data-close>Listo</button>`,
    onClose: () => { if (!running) Ambient.play('none'); else soundFor(); renderView(); },
    onMount: el => {
      const paint = () => {
        el.querySelector('#sg').innerHTML = SOUNDS.filter(x => x[0] !== 'custom' || c.customName).map(([k, n]) => `<button class="sitem ${c.sound === k ? 'on' : ''}" data-snd="${k}"><span class="scirc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${SOUND_ICONS[k]}</svg></span><span class="sname">${k === 'custom' ? esc(c.customName.slice(0, 16)) : n}</span></button>`).join('');
        el.querySelectorAll('[data-snd]').forEach(x => x.onclick = async () => { c.sound = x.dataset.snd; save('meta'); paint(); Ambient.setVolume(c.vol); const ok = await Ambient.play(c.sound); if (ok === false) toast('No pude reproducir ese sonido'); });
      };
      paint();
      el.querySelector('#sVol').oninput = e => { c.vol = +e.target.value; Ambient.setVolume(c.vol); };
      el.querySelector('#sVol').onchange = () => save('meta');
      el.querySelector('#sImpS').onchange = async e => {
        const f = e.target.files[0]; if (!f) return;
        if (f.size > 25 * 1024 * 1024) { toast('El audio es muy grande (máximo 25 MB)'); return; }
        try { await customSound.put(f); c.customName = f.name.replace(/\.[^.]+$/, ''); c.sound = 'custom'; save('meta'); paint(); Ambient.setVolume(c.vol); await Ambient.play('custom'); toast('Sonido importado ✓'); }
        catch (err) { toast('No pude guardar ese audio'); }
      };
    }});
}
/* Pantalla completa */
function openFullscreen() {
  if ($('#fsOv')) return;
  const ov = document.createElement('div'); ov.id = 'fsOv'; ov.className = 'fsov'; document.body.appendChild(ov);
  try { document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {}); } catch (e) {}
  keepAwake(true); paintFullscreen(); renderMini();
}
function closeFullscreen() { const o = $('#fsOv'); if (o) o.remove(); try { document.fullscreenElement && document.exitFullscreen(); } catch (e) {} if (!isRunning()) keepAwake(false); renderMini(); }
function paintFullscreen() {
  const ov = $('#fsOv'); if (!ov) return;
  ov.innerHTML = `<button class="fsx" id="fsX" aria-label="Salir de pantalla completa"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg></button><div class="fsact">${esc(fcfg().act)}</div>${clockHTML(true)}<div class="fctl">${controlsHTML('fs')}</div>`;
  $('#fsX').onclick = closeFullscreen; wireControls(ov, 'fs');
}
/* ========== NOTAS ========== */
function startVoiceNote(btn) {
  if (btn._rec) return;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toast('El dictado no está disponible en este teléfono'); return; }
  const rec = new SR(); rec.lang = 'es-PR'; rec.interimResults = true; rec.continuous = true;
  let text = '';
  rec.onresult = e => { text = Array.from(e.results).map(r => r[0].transcript).join(' ').trim(); };
  rec.onerror = () => { btn._rec = null; btn.classList.remove('rec'); toast('No pude escuchar. Intenta de nuevo'); };
  rec.onend = () => { btn._rec = null; btn.classList.remove('rec'); if (!text) return; S.notes.push({id: uid(), text, date: todayISO(), created: String(Date.now()), hidden: false, category: '', areaId: null}); save('notes'); UI.showHiddenNotes = false; renderView(); toast('Nota guardada ✓'); };
  btn._rec = rec; btn.classList.add('rec');
  try { rec.start(); } catch (err) { btn._rec = null; btn.classList.remove('rec'); toast('No se pudo iniciar el micrófono'); }
}
function stopVoiceNote(btn) { if (btn._rec) btn._rec.stop(); }
function vNotas(v) {
  const q = norm(UI.q.trim());
  let list = S.notes.filter(n => q ? (norm(n.text).includes(q) || norm(n.category || '').includes(q)) : true);
  const hidden = list.filter(n => n.hidden);
  list = UI.showHiddenNotes ? hidden : list.filter(n => !n.hidden);
  list.sort((a, b) => (b.date + (b.created || '')).localeCompare(a.date + (a.created || '')));
  v.innerHTML = `<div class="row" style="justify-content:flex-end;align-items:center;gap:8px;margin-bottom:6px"><span class="small muted">Mantén para grabar</span><button type="button" class="voicebtn" id="nVoice" aria-label="Mantén presionado para grabar una nota" title="Mantén presionado para grabar"><i class="rdot"></i></button></div><div class="card"><div class="note-new"><textarea class="inp" id="nNew" placeholder="Escribe una nota…"></textarea><button class="btn" id="nSave">Guardar</button></div></div>
    <div class="row" style="margin:14px 0 8px"><b>${UI.showHiddenNotes ? 'Notas ocultas' : 'Mis notas'}</b><span class="sp"></span>${hidden.length || UI.showHiddenNotes ? `<button class="btn ghost sm" id="nHid">${UI.showHiddenNotes ? '‹ Volver a mis notas' : `Ver ocultas (${hidden.length})`}</button>` : ''}</div>
    ${list.length ? list.map(n => { const a = areaById(n.areaId); return `<div class="nitem" data-note="${n.id}"><div class="body"><div class="t">${esc(noteTitle(n))}</div>${noteSnippet(n) ? `<div class="s">${esc(noteSnippet(n))}</div>` : ''}<div class="xs muted row" style="margin-top:3px"><span>${fmtShort(n.date)}</span>${n.category ? `<span class="tag">${esc(n.category)}</span>` : ''}${a ? `<span class="tag"><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</span>` : ''}</div></div>
      <div class="acts"><button data-nh="${n.id}" title="${n.hidden ? 'Mostrar' : 'Ocultar'}" aria-label="${n.hidden ? 'Mostrar' : 'Ocultar'}">${n.hidden ? '👁‍🗨' : '👁'}</button><button data-nd="${n.id}" title="Eliminar" aria-label="Eliminar"><i class="xdel"></i></button></div></div>`; }).join('')
      : `<div class="empty">${q ? 'No hay notas que coincidan con “' + esc(UI.q) + '”.' : UI.showHiddenNotes ? 'No hay notas ocultas.' : '<div class="big">🗒️</div>Escribe arriba tu primera nota.'}</div>`}`;
  const nn = $('#nNew', v);
  const vb = $('#nVoice', v);
  vb.addEventListener('pointerdown', e => { e.preventDefault(); startVoiceNote(vb); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => vb.addEventListener(ev, () => stopVoiceNote(vb)));
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
    <div class="set-row"><div class="lbl">Copia de seguridad<small>Guarda todo en un archivo, o recupéralo desde un archivo.</small></div><button class="btn sec sm" id="sExp">⬇ Exportar</button><label class="btn sec sm" style="cursor:pointer">⬆ Importar<input type="file" id="sImp" accept=".json,application/json" class="fileover"></label></div>
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
  const row = i => `<div class="item ${i.done ? 'done' : ''}" data-li="${i.id}"><button class="check ${i.done ? 'on' : ''}" data-lc="${i.id}" aria-label="${i.done ? 'Desmarcar' : 'Marcar'}">${i.done ? '✓' : ''}</button><div class="body"><div class="t" style="white-space:normal"><span class="hl" style="--hlbg:${hexA(itemHl(i), i.done ? .22 : .45)}">${esc(i.t)}</span></div></div><button class="btn ghost sm" data-ld="${i.id}" aria-label="Quitar de la lista" title="Quitar de la lista"><i class="xdel"></i></button></div>`;
  v.innerHTML = `<button class="btn ghost sm" id="lBack">‹ Todas las listas</button>
    <div class="card" style="border-top:6px solid ${l.color};margin-top:6px"><div class="row wrap"><h2 style="margin:0;font-size:20px">${l.icon} ${esc(l.name)}</h2><span class="sp"></span><button class="btn sm lpin ${l.hideOnDay ? 'sec' : 'on'}" id="lPin" aria-pressed="${l.hideOnDay ? 'false' : 'true'}">Acceso rápido</button><button class="btn sec sm" id="lEd">✎ Editar</button><button class="btn sec sm" id="lDel" aria-label="Eliminar lista" title="Eliminar lista"><i class="xdel"></i></button></div>
      <div class="small muted" style="margin-top:6px">${l.items.length ? `${l.items.length - nd} por hacer · ${nd} listo${nd === 1 ? '' : 's'}` : 'Lista vacía'}</div>
      <div class="goal" style="margin-top:12px"><input id="liAdd" placeholder="Añadir a la lista…" maxlength="300" autocomplete="off"><button class="btn" id="liBtn">Añadir</button></div>
      <div class="xs muted" style="margin-top:6px">Consejo: separa con comas para añadir varias cosas a la vez (leche, pan, huevos).</div></div>
    <div style="margin-top:12px">${pend.length ? pend.map(row).join('') : `<div class="empty small">${q ? 'Nada coincide con “' + esc(UI.q) + '”.' : l.items.length ? '🎉 ¡Todo listo en esta lista!' : 'Escribe arriba lo primero de la lista.'}</div>`}</div>
    ${done.length ? `<div class="donesec"><div class="sec-title">Listos (${done.length})</div>${done.map(row).join('')}<div class="row wrap" style="margin-top:6px"><button class="btn sec sm" id="lUn">↺ Desmarcar todos</button><button class="btn sec sm" id="lClr">Borrar los listos</button></div></div>` : ''}`;
  $('#lBack', v).onclick = () => { UI.openList = null; renderView(); };
  $('#lEd', v).onclick = () => openListForm(l);
  $('#lPin', v).onclick = () => { l.hideOnDay = !l.hideOnDay; save('lists'); renderView(); listBadge(); toast(l.hideOnDay ? 'Quitada del acceso rápido' : 'En el acceso rápido (botón de arriba)'); };
  $('#lDel', v).onclick = async () => { if (await ask(`¿Eliminar la lista “${esc(l.name)}” y todo lo que tiene?`)) { S.lists = S.lists.filter(x => x.id !== l.id); UI.openList = null; save('lists'); render(); toast('Lista eliminada'); } };
  const inp = $('#liAdd', v);
  const add = () => {
    const raw = inp.value.trim(); if (!raw) { inp.focus(); return; }
    raw.split(/\n|,/).map(x => x.trim()).filter(Boolean).forEach(t => l.items.push({id: uid(), t: cap(t), done: false}));
    save('lists'); renderView(); setTimeout(() => { const n = $('#liAdd'); n && n.focus(); }, 0);
  };
  $('#liBtn', v).onclick = add;
  inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); add(); } };
  const toggle = id => { const i = l.items.find(x => x.id === id); i.done = !i.done; save('lists'); renderView(); };
  v.querySelectorAll('[data-lc]').forEach(b => b.onclick = e => { e.stopPropagation(); toggle(b.dataset.lc); });
  v.querySelectorAll('[data-li]').forEach(b => b.onclick = () => toggle(b.dataset.li));
  v.querySelectorAll('[data-ld]').forEach(b => b.onclick = e => { e.stopPropagation(); const k = l.items.findIndex(x => x.id === b.dataset.ld), it = l.items[k]; l.items.splice(k, 1); save('lists'); renderView(); toast('“' + it.t + '” borrado', '', {label: 'Deshacer', fn: () => { l.items.splice(k, 0, it); save('lists'); renderView(); }}); });
  const un = $('#lUn', v); if (un) un.onclick = () => { l.items.forEach(i => i.done = false); save('lists'); renderView(); toast('Lista lista para usar otra vez'); };
  const cl = $('#lClr', v); if (cl) cl.onclick = async () => { if (await ask('¿Borrar de la lista todo lo que está marcado como listo?', {yes: 'Borrar'})) { l.items = l.items.filter(i => !i.done); save('lists'); renderView(); } };
}
function openListForm(list) {
  const editing = !!list; const l = list ? {...list} : {id: uid(), name: '', icon: '📝', color: AREA_COLORS[S.lists.length % AREA_COLORS.length], items: []};
  const s = openSheet({pin: editing ? 'list:' + list.id : null, title: editing ? 'Editar lista' : 'Nueva lista',
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
        save('lists'); s.close(); UI.view = 'listas'; UI.openList = l.id; render();
        if (!editing) setTimeout(() => { const a = $('#liAdd'); a && a.focus(); }, 60);
      };
      setTimeout(() => el.querySelector('#lN').focus(), 50);
    }});
}

/* Acceso rápido: tarjeta flotante con "Hoy" (estilo TODAY) y tus listas, desde el botón 📋 */
function quickCount() {
  const t = todayISO();
  const tk = S.tasks.filter(x => x.date === t && !isDone(x)).length + S.tasks.filter(isLate).length;
  const li = S.lists.filter(l => !l.hideOnDay).reduce((a, l) => a + l.items.filter(i => !i.done).length, 0);
  return tk + li;
}
function listBadge() {
  const b = $('#lsBtn'); if (!b) return;
  const n = quickCount();
  b.classList.toggle('hidden', UI.view === 'enfoque');
  $('#lsBadge').textContent = n ? (n > 99 ? '99+' : n) : '';
}
function openListsPopup() {
  openSheet({head: false, float: true, cls: 'qcard', body: '<div id="lsPop"></div>',
    onClose: () => { listBadge(); if (['dia', 'tareas'].includes(UI.view)) renderView(); },
    onMount: el => dayLists(el.querySelector('#lsPop'))});
}
function dayLists(box) {
  if (!box) return;
  if (box.dataset.fixkey) { UI.popTab = box.dataset.fixkey; if (!box._fx) { box._fx = 1; const fix = () => { UI.popTab = box.dataset.fixkey; }; ['click', 'keydown', 'pointerdown', 'change', 'input'].forEach(ev => box.addEventListener(ev, fix, true)); } }
  const t = todayISO(), lists = S.lists.filter(l => !l.hideOnDay);
  if (!UI.popTab || (UI.popTab !== 'hoy' && UI.popTab !== 'cal' && !/^(reto|hab|tk|nt|cd):/.test(String(UI.popTab)) && !lists.some(l => l.id === UI.popTab))) UI.popTab = 'hoy';
  const keys = popKeys(), ki = Math.max(0, keys.indexOf(UI.popTab)), kprev = keys[(ki - 1 + keys.length) % keys.length], knext = keys[(ki + 1) % keys.length];
  const tabs = `<div class="qnav">${keys.length > 1 ? `<button class="qarr" data-qt="${kprev}" aria-label="Anterior">‹</button>` : ''}<div class="qdots">${keys.map(k => `<i class="${k === UI.popTab ? 'on' : ''}"></i>`).join('')}</div>${keys.length > 1 ? `<button class="qarr" data-qt="${knext}" aria-label="Siguiente">›</button>` : ''}</div>`;
  if (!box.dataset.fixkey) popSwipe(box);
  if (UI.popTab === 'hoy' && pins().hoy === false) { const first = [...lists.map(l => l.id), ...retoHabits().map(h => 'reto:' + h.id), ...pinHabits().map(h => 'hab:' + h.id), ...(pins().cal ? ['cal'] : [])][0]; if (first) UI.popTab = first; }
  const wireTabs = () => { addUnpin(box); box.querySelectorAll('[data-qt]').forEach(b => b.onclick = () => { UI.popTab = b.dataset.qt; dayLists(box); listBadge(); }); box.querySelectorAll('[data-qpins]').forEach(b => b.onclick = () => openPinManager(() => dayLists(box))); };
  if (/^(tk|nt|cd):/.test(String(UI.popTab))) { const it = pinItemView(UI.popTab); if (it) { box.innerHTML = `<div class="qtop">${tabs}<button class="iconbtn qx" data-close aria-label="Cerrar">✕</button></div><div class="qhead" style="--lc:var(--blue)"><span class="qtitle ${it.title.length > 9 ? 'long' : ''}">${esc(it.title.toUpperCase())}</span><span class="qcount">${esc(it.pill)}</span></div><div class="pinhost">${it.html}</div><div class="row qfoot"><button class="btn ghost sm" id="qOpenIt">Abrir ›</button></div>`; box.querySelector('#qOpenIt').onclick = it.open; wireTabs(); return; } UI.popTab = 'hoy'; return dayLists(box); }
  if (String(UI.popTab).startsWith('hab:')) { const h = S.habits.find(x => 'hab:' + x.id === UI.popTab); if (h) { box.innerHTML = `<div class="qtop">${tabs}<button class="iconbtn qx" data-close aria-label="Cerrar">✕</button></div><div class="qhead" style="--lc:${h.color}"><span class="qtitle ${h.name.length > 9 ? 'long' : ''}">${esc(h.name.toUpperCase())}</span><span class="qcount">${habPill(h)}</span></div><div class="pinhost" id="pinHost"></div><div class="row qfoot"><span class="sp"></span><button class="btn ghost sm" id="qHab">Abrir hábito ›</button></div>`; box.querySelector('#qHab').onclick = () => { go('habitos'); }; pinHabit(h, box.querySelector('#pinHost'), () => dayLists(box)); wireTabs(); return; } UI.popTab = 'hoy'; return dayLists(box); }
  if (UI.popTab === 'cal') { box.innerHTML = `<div class="qtop">${tabs}<button class="iconbtn qx" data-close aria-label="Cerrar">✕</button></div><div class="qhead" style="--lc:var(--teal,#0f9d8f)"><span class="qtitle">CALENDARIO</span><span class="qcount">${sortedDay(todayISO()).length} hoy</span></div><div id="pinCal"></div>`; pinCalendar(box.querySelector('#pinCal')); wireTabs(); return; }
  if (String(UI.popTab).startsWith('reto:')) { const h = S.habits.find(x => 'reto:' + x.id === UI.popTab); if (h && h.challenge) { challengeBox(box, h, tabs, null); wireTabs(); return; } UI.popTab = 'hoy'; return dayLists(box); }
  let head, rows, addPh, foot;
  if (UI.popTab === 'hoy') {
    const late = S.tasks.filter(isLate), today = S.tasks.filter(x => x.date === t);
    const pend = [...late, ...today.filter(x => !isDone(x))].sort((a, b) => (a.date + (a.time || '99')).localeCompare(b.date + (b.time || '99')));
    const done = today.filter(isDone);
    const total = today.length + late.length;
    head = `<div class="qhead" style="--lc:var(--blue)"><span class="qtitle">HOY</span><span class="qcount">${done.length}/${total}</span></div>`;
    const tint = x => isLate(x) || x.priority === 'Urgente' ? 'r' : x.priority === 'Alta' ? 'o' : '';
    rows = [...pend, ...done].map(x => `<div class="qrow ${isDone(x) ? 'done' : ''} ${isDone(x) ? '' : tint(x)}" data-qtk="${x.id}" role="button" tabindex="0"><span class="qbox"></span><span class="qtx"><span class="hl" style="--hlbg:${hexA(hlColor({k: 'tk', x}), isDone(x) ? .22 : .45)}">${esc(x.title)}</span>${x.time ? ` <span class="qtime">${isLate(x) ? fmtShort(x.date) + ' · ' : ''}${fmtTime(x.time)}</span>` : isLate(x) ? ` <span class="qtime">${fmtShort(x.date)}</span>` : ''}</span><button class="qdel" data-qdel="${x.id}" aria-label="Borrar" title="Borrar"><i class="xdel"></i></button></div>`).join('') || '<div class="qempty">✓ Nada pendiente para hoy</div>';
    addPh = 'Añadir para hoy…';
    foot = `<button class="btn ghost sm" id="qGo">Ver Mi Día ›</button>`;
  } else {
    const l = lists.find(x => x.id === UI.popTab), done = l.items.filter(i => i.done);
    head = `<div class="qhead" style="--lc:${l.color}"><span class="qtitle">${esc(l.name.toUpperCase())}</span><span class="qcount">${done.length}/${l.items.length}</span></div>`;
    rows = [...l.items.filter(i => !i.done), ...done].map(i => `<div class="qrow ${i.done ? 'done' : ''}" data-qli="${i.id}" role="button" tabindex="0"><span class="qbox"></span><span class="qtx"><span class="hl" style="--hlbg:${hexA(itemHl(i), i.done ? .22 : .45)}">${esc(i.t)}</span></span><button class="qdel" data-qdel="${i.id}" aria-label="Borrar" title="Borrar"><i class="xdel"></i></button></div>`).join('') || '<div class="qempty">Lista vacía: añade lo primero abajo.</div>';
    addPh = 'Añadir a ' + l.name + '…';
    foot = `${done.length ? '<button class="btn ghost sm" id="qUndo">↺ Desmarcar todos</button>' : ''}<span class="sp"></span><button class="btn ghost sm" id="qOpen">Abrir la lista ›</button>`;
  }
  box.innerHTML = `<div class="qtop">${tabs}<button class="iconbtn qx" data-close aria-label="Cerrar">✕</button></div>${head}<div class="qrows">${rows}</div>
    <div class="qadd"><input id="dlAdd" placeholder="${esc(addPh)}" maxlength="300" autocomplete="off"><button class="btn" id="dlBtn" aria-label="Añadir">+</button></div>
    <div class="row qfoot">${foot}${UI.popTab === 'hoy' && !lists.length ? '<button class="btn ghost sm" id="qNewList">+ Nueva lista</button>' : ''}</div>`;
  const redraw = () => { dayLists(box); listBadge(); };
  box.querySelectorAll('[data-qt]').forEach(b => b.onclick = () => { UI.popTab = b.dataset.qt; redraw(); });
  box.querySelectorAll('[data-qpins]').forEach(b => b.onclick = () => openPinManager(() => dayLists(box)));
  addUnpin(box);
  box.querySelectorAll('[data-qdel]').forEach(b => b.onclick = async e => {
    e.stopPropagation(); const id = b.dataset.qdel;
    if (UI.popTab === 'hoy') {
      const x = S.tasks.find(y => y.id === id);
      if (await ask('¿Borrar la tarea “' + esc(x.title) + '”?')) { S.tasks = S.tasks.filter(y => y.id !== id); save('tasks'); redraw(); toast('Tarea borrada'); }
    } else {
      const l = S.lists.find(y => y.id === UI.popTab), k = l.items.findIndex(y => y.id === id), it = l.items[k];
      l.items.splice(k, 1); save('lists'); redraw();
      toast('“' + it.t + '” borrado', '', {label: 'Deshacer', fn: () => { l.items.splice(k, 0, it); save('lists'); redraw(); }});
    }
  });
  box.querySelectorAll('[data-qtk]').forEach(b => b.onclick = () => { const x = S.tasks.find(y => y.id === b.dataset.qtk); x.status = isDone(x) ? 'Pendiente' : 'Completada'; x.completedAt = isDone(x) ? Date.now() : null; save('tasks'); b.classList.toggle('done'); setTimeout(redraw, 180); });
  box.querySelectorAll('[data-qli]').forEach(b => b.onclick = () => { const l = S.lists.find(y => y.id === UI.popTab), i = l.items.find(y => y.id === b.dataset.qli); i.done = !i.done; save('lists'); b.classList.toggle('done'); setTimeout(redraw, 180); });
  const inp = $('#dlAdd', box);
  const add = () => {
    const raw = inp.value.trim(); if (!raw) { inp.focus(); return; }
    if (UI.popTab === 'hoy') { const g = guess(raw); S.tasks.push({id: uid(), title: raw, date: t, time: g.time, typeId: g.typeId, areaId: g.areaId, priority: 'Media', details: '', steps: [], status: 'Pendiente', obs: '', reminder: null, createdAt: Date.now()}); save('tasks'); }
    else { const l = S.lists.find(y => y.id === UI.popTab); raw.split(/\n|,/).map(x => x.trim()).filter(Boolean).forEach(x => l.items.push({id: uid(), t: cap(x), done: false})); save('lists'); }
    redraw(); const n = $('#dlAdd'); n && n.focus();
  };
  $('#dlBtn', box).onclick = add; inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); add(); } };
  const q = id => $(id, box);
  if (q('#qGo')) q('#qGo').onclick = () => go('dia');
  const dl = q('#dlBtn'); if (dl) {
    let t3 = null, fired = false;
    dl.addEventListener('pointerdown', () => { fired = false; clearTimeout(t3); t3 = setTimeout(() => { fired = true; toast('Grabando… suelta para guardar la nota'); startVoiceNote(dl); }, 3000); });
    const endHold = () => { clearTimeout(t3); t3 = null; if (fired) stopVoiceNote(dl); };
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => dl.addEventListener(ev, endHold));
    dl.addEventListener('click', e => { if (fired) { e.stopImmediatePropagation(); e.preventDefault(); fired = false; } }, true);
  }
  if (q('#qOpen')) q('#qOpen').onclick = () => { const id = UI.popTab; go('listas'); UI.openList = id; render(); };
  if (q('#qUndo')) q('#qUndo').onclick = () => { S.lists.find(y => y.id === UI.popTab).items.forEach(i => i.done = false); save('lists'); redraw(); };
  if (q('#qNewList')) q('#qNewList').onclick = () => { go('listas'); render(); openListForm(); };
}

/* ========== MI DÍA (v2): tira de días + línea de tiempo con gestos ========== */
function heroHTML() {
  const [wd, wt] = weekProgress(), dt = new Date();
  return `<div class="hero"><div class="hero-main"><div class="hero-top"><div><div class="date">${cap(DIAS[dt.getDay()])}, ${dt.getDate()} de ${MESES[dt.getMonth()]}</div><div class="hi">${greeting()} 👋</div></div>
    <div class="ring" title="Avance de la semana">${ringSVG(wd, wt)}<div class="lbl">${wd}/${wt}<small>semana</small></div></div></div>
    ${UI.motivHidden ? '' : `<div class="hero-msg" id="motiv"><p>✨ ${esc(UI.motiv)}</p><div class="hscroll"><button class="btn sm hb1" id="m1">Organizar mi día</button><button class="btn sm hb2" id="m2">Planificar mi semana</button><button class="btn sm hb2" id="m3">Modo enfoque</button></div></div>`}</div></div>`;
}
function wireHero(v) {
  if (UI.motivHidden) return;
  $('#m1', v).onclick = () => { UI.daySel = todayISO(); renderView(); setTimeout(() => { const q = $('#qIn'); q && (q.scrollIntoView({block: 'center', behavior: 'smooth'}), q.focus()); }, 50); };
  $('#m2', v).onclick = () => { S.settings.calView = 'week'; UI.calDate = todayISO(); save('meta'); go('calendario'); setTimeout(() => { const p = $('#planner'); p && p.scrollIntoView({behavior: 'smooth'}); }, 80); };
  $('#m3', v).onclick = () => go('enfoque');
}
function vDia2(v) {
  const t = todayISO();
  if (!UI.daySel || UI.daySel < t) UI.daySel = t;
  const d = UI.daySel, isToday = d === t, now = nowMin();
  const strip = [...Array(14)].map((_, i) => addDays(t, i));
  const late = isToday ? S.tasks.filter(isLate).sort((a, b) => a.date.localeCompare(b.date)) : [];
  const its = sortedDay(d, {all: true, withDone: true});
  const pendItems = its.filter(i => !(i.k === 'tk' && isDone(i.x)));
  const doneItems = its.filter(i => i.k === 'tk' && isDone(i.x));
  const nPend = its.filter(i => i.k === 'tk' && !isDone(i.x)).length, nDone = doneItems.length;
  const ho = holidaysOn(d);
  const dayName = isToday ? 'Hoy' : d === addDays(t, 1) ? 'Mañana' : cap(DIAS[dow(d)]);
  // línea de tiempo con "AHORA"
  let nowPlaced = !isToday, tl = '';
  const endOf = i => i.k === 'tk' ? (i.x.time ? toMin(i.x.time) + 30 : -1) : i.k === 'ev' ? (i.x.allDay ? -1 : toMin(i.x.end)) : toMin(i.x.end);
  pendItems.forEach(i => {
    const st = i.k === 'tk' ? (i.x.time ? toMin(i.x.time) : null) : i.k === 'ev' ? (i.x.allDay ? null : toMin(i.x.start)) : toMin(i.x.start);
    if (!nowPlaced && st !== null && st > now) { tl += `<div class="nowmark"><span>AHORA · ${fmtTime(fromMin(now))}</span></div>`; nowPlaced = true; }
    const past = isToday && st !== null && endOf(i) >= 0 && endOf(i) < now;
    tl += tlRow(i, past);
  });
  if (!nowPlaced && pendItems.length) tl += `<div class="nowmark"><span>AHORA · ${fmtTime(fromMin(now))}</span></div>`;
  v.innerHTML = `${heroHTML()}
    <div class="card daycard">
      <div class="dstrip hscroll" id="dstrip">${strip.map(x => { const it = sortedDay(x, {all: true}); const hol = holidaysOn(x).length; return `<button class="dpill ${x === d ? 'on' : ''} ${x === t ? 'today' : ''} ${hol ? 'holi' : ''}" data-dd="${x}"><span class="dw">${x === t ? 'Hoy' : DCORTO[dow(x)]}</span><span class="dn">${parseISO(x).getDate()}</span>${daySticker(x) ? `<span class="dstk">${daySticker(x)}</span>` : `<span class="ddots">${it.slice(0, 3).map(i => `<i style="background:${colorOf(i.k, i.x)}"></i>`).join('')}${hol ? '<i style="background:var(--red)"></i>' : ''}</span>`}</button>`; }).join('')}<button class="dpill more" id="dMore"><span class="dw">Otra</span><span class="dn">📅</span><span class="ddots"></span></button></div>
      ${pinCardsHTML()}
      <div class="dhead"><div><b>${dayName}</b><span class="muted"> · ${parseISO(d).getDate()} de ${MESES[parseISO(d).getMonth()]}</span>${ho.map(h => ` <span class="tag" style="background:var(--holi);color:var(--holiText)">🎉 ${esc(h.name)}</span>`).join('')}</div>
        <div class="muted small">${[nPend ? `${nPend} por hacer` : '', nDone ? `${nDone} hecha${nDone === 1 ? '' : 's'}` : ''].filter(Boolean).join(' · ')}</div></div>
      <div class="qadd daddbar"><input id="qIn" placeholder="Añadir a ${isToday ? 'hoy' : dayName.toLowerCase()}… (ej. dentista a las 3 pm)" maxlength="140" autocomplete="off"><button class="btn" id="qAdd" aria-label="Añadir">+</button></div>
      <div class="hint" id="qHint"></div>
      ${late.length ? `<div class="lateb"><div class="lateh">⚠️ Atrasadas (${late.length})<span class="sp"></span><button class="btn ghost sm" id="allToday">Traer todas a hoy</button></div>${late.map(x => `<div class="tlrow late" data-tk="${x.id}"><span class="tltime">${parseISO(x.date).getDate()} ${MESES[parseISO(x.date).getMonth()].slice(0, 3)}</span><div class="tlcard"><button class="check" data-chk="${x.id}" aria-label="Completar"></button><span class="em">${typeById(x.typeId).icon}</span><div class="body"><div class="t">${esc(x.title)}</div></div><button class="btn sec sm" data-totoday="${x.id}">A hoy</button></div></div>`).join('')}</div>` : ''}
      <div class="timeline" id="tline">${tl || (freeMsgOn(d) ? `<div class="tlempty" id="freeMsg">${isToday ? '✓ Día libre. Añade algo arriba o disfruta 🌿' : 'Nada para este día todavía.'}</div>` : '')}</div>
      ${doneItems.length ? `<div class="donesec"><div class="sec-title">Hechas (${doneItems.length})</div>${doneItems.map(i => tlRow(i, false)).join('')}</div>` : ''}
      ${pendItems.some(i => i.k === 'tk') ? `<div class="xs muted swipehint">${isMobile() ? 'Desliza una tarea → para completarla, ← para pasarla a mañana.' : 'Pasa el ratón sobre una tarea para completarla o pasarla a mañana.'}</div>` : ''}
    </div>`;
  wireHero(v);
  wireItems(v);
  const fm = $('#freeMsg', v);
  if (fm) { clearTimeout(UI.freeTimer); UI.freeTimer = setTimeout(() => { const m = $('#freeMsg'); if (m) { m.classList.add('fade'); setTimeout(() => m.remove(), 600); } }, Math.max(0, 35000 - (Date.now() - UI.freeShown[d]))); }
  v.querySelectorAll('[data-dd]').forEach(b => b.onclick = () => { UI.daySel = b.dataset.dd; renderView(); });
  wirePinCards(v);
  const sel = v.querySelector('.dpill.on'); if (sel && sel.scrollIntoView) { const strip = $('#dstrip', v); strip.scrollLeft = Math.max(0, sel.offsetLeft - 60); }
  $('#dMore', v).onclick = () => { const i = document.createElement('input'); i.type = 'date'; i.min = t; i.style.cssText = 'position:fixed;opacity:0;left:50%;top:50%'; document.body.appendChild(i); i.onchange = () => { if (i.value) { UI.daySel = i.value; renderView(); } i.remove(); }; i.onblur = () => setTimeout(() => i.remove(), 500); try { i.showPicker(); } catch (e) { i.click(); } };
  const at = $('#allToday', v); if (at) at.onclick = () => { S.tasks.filter(isLate).forEach(x => x.date = t); save('tasks'); renderView(); toast('Atrasadas movidas a hoy'); };
  v.querySelectorAll('[data-totoday]').forEach(b => b.onclick = e => { e.stopPropagation(); S.tasks.find(x => x.id === b.dataset.totoday).date = t; save('tasks'); renderView(); toast('Movida a hoy'); });
  v.querySelectorAll('[data-tom]').forEach(b => b.onclick = e => { e.stopPropagation(); postpone(b.dataset.tom); });
  v.querySelectorAll('[data-done]').forEach(b => b.onclick = e => { e.stopPropagation(); setDone(b.dataset.done, true); });
  v.querySelectorAll('[data-tdel]').forEach(b => b.onclick = async e => { e.stopPropagation(); const x = S.tasks.find(y => y.id === b.dataset.tdel); if (await ask('¿Borrar la tarea “' + esc(x.title) + '”?')) { S.tasks = S.tasks.filter(y => y.id !== x.id); save('tasks'); renderView(); toast('Tarea borrada'); } });
  wireSwipes(v);
  // añadir al día elegido
  const qIn = $('#qIn', v), hint = $('#qHint', v);
  qIn.oninput = () => { const tx = qIn.value.trim(); if (!tx) { hint.textContent = ''; return; } const g = guess(tx), a = areaById(g.areaId), ty = typeById(g.typeId); hint.textContent = `Se guardará como ${ty.icon} ${ty.name}${a ? ' en ' + a.name : ''}${g.time ? ' a las ' + fmtTime(g.time) : ''}`; };
  const addQ = () => {
    const tx = qIn.value.trim(); if (!tx) { qIn.focus(); return; }
    const g = guess(tx);
    S.tasks.push({id: uid(), title: tx, date: d, time: g.time, typeId: g.typeId, areaId: g.areaId, priority: 'Media', details: '', steps: [], status: 'Pendiente', obs: '', reminder: null, createdAt: Date.now()});
    save('tasks'); toast(`Añadido para ${isToday ? 'hoy' : dayName.toLowerCase()} ✓`); renderView(); setTimeout(() => { const n = $('#qIn'); n && n.focus(); }, 0);
  };
  $('#qAdd', v).onclick = addQ; qIn.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); addQ(); } };
}
function tlRow(i, past) {
  const x = i.x, c = colorOf(i.k, x);
  const time = i.k === 'tk' ? (x.time ? fmtTime(x.time) : '') : i.k === 'ev' ? (x.allDay ? 'Todo el día' : fmtTime(x.start)) : fmtTime(x.start);
  const tshort = time.replace(' a. m.', ' am').replace(' p. m.', ' pm');
  if (i.k === 'tk') {
    const ty = typeById(x.typeId), a = areaById(x.areaId), dn = isDone(x);
    return `<div class="tlrow ${past ? 'past' : ''}" data-tk="${x.id}"><span class="tltime">${tshort}</span><div class="tlcard swipe ${dn ? 'done' : ''} ${x.priority === 'Urgente' ? 'r' : x.priority === 'Alta' ? 'o' : ''}" data-sw="${x.id}" style="--c:${c}">
      <button class="check ${dn ? 'on' : ''}" data-chk="${x.id}" aria-label="Completar">${dn ? '✓' : ''}</button><span class="em">${ty.icon}</span>
      <div class="body"><div class="t">${esc(x.title)}</div>${a || x.reminder != null || (x.steps && x.steps.length) ? `<div class="m">${a ? `<span class="tag"><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</span>` : ''}${x.steps && x.steps.length ? `<span>☑ ${x.steps.filter(s => s.done).length}/${x.steps.length}</span>` : ''}${x.reminder != null ? '<span class="bell">🔔</span>' : ''}</div>` : ''}</div>
      ${dn ? '' : `<span class="hoveracts"><button class="btn sec sm" data-done="${x.id}" title="Completar">✓</button><button class="btn sec sm" data-tom="${x.id}" title="Pasar a mañana">→ Mañana</button><button class="btn sec sm" data-tdel="${x.id}" title="Borrar"><i class="xdel"></i></button></span>`}</div></div>`;
  }
  if (i.k === 'ev') { const et = evType(x.evType); return `<div class="tlrow ${past ? 'past' : ''}" data-ev="${x.id}"><span class="tltime">${tshort}</span><div class="tlcard ev" style="--c:${c}"><span class="em">${et.icon}</span><div class="body"><div class="t">${esc(x.title)}</div><div class="m">${x.allDay ? '' : `<span>hasta ${fmtTime(x.end)}</span>`}${x.place ? `<span>📍 ${esc(x.place)}</span>` : ''}${x.reminder != null ? '<span class="bell">🔔</span>' : ''}</div></div></div></div>`; }
  return `<div class="tlrow ${past ? 'past' : ''}" data-rt="${x.id}"><span class="tltime">${tshort}</span><div class="tlcard rt" style="--c:${c}"><span class="em">🔁</span><div class="body"><div class="t">${esc(x.name)}</div><div class="m"><span>hasta ${fmtTime(x.end)}</span>${x.place ? `<span>📍 ${esc(x.place)}</span>` : ''}</div></div></div></div>`;
}
function postpone(id) {
  const x = S.tasks.find(y => y.id === id); if (!x) return;
  const base = x.date < todayISO() ? todayISO() : x.date; x.date = addDays(base, 1); save('tasks'); renderView();
  toast('Pasada a ' + (x.date === addDays(todayISO(), 1) ? 'mañana' : fmtShort(x.date)) + ' →');
}
// Gestos: deslizar → completar, ← pasar a mañana
function wireSwipes(root) {
  root.querySelectorAll('.tlcard.swipe:not(.done)').forEach(card => {
    let x0 = null, y0 = 0, dx = 0, lock = null;
    card.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') return; x0 = e.clientX; y0 = e.clientY; dx = 0; lock = null; });
    card.addEventListener('pointermove', e => {
      if (x0 === null) return; const ddx = e.clientX - x0, ddy = e.clientY - y0;
      if (!lock) { if (Math.abs(ddx) > 10 && Math.abs(ddx) > Math.abs(ddy)) lock = 'x'; else if (Math.abs(ddy) > 10) { lock = 'y'; x0 = null; return; } else return; }
      dx = ddx; card.style.transform = `translateX(${dx}px)`; card.classList.toggle('sw-ok', dx > 60); card.classList.toggle('sw-tom', dx < -60);
      card.parentElement.dataset.swdir = dx > 0 ? 'ok' : 'tom';
    });
    const end = () => {
      if (x0 === null) return; x0 = null; const id = card.dataset.sw;
      if (dx > 90) { card.style.transition = 'transform .2s'; card.style.transform = 'translateX(110%)'; setTimeout(() => setDone(id, true), 180); }
      else if (dx < -90) { card.style.transition = 'transform .2s'; card.style.transform = 'translateX(-110%)'; setTimeout(() => postpone(id), 180); }
      else { card.style.transition = 'transform .2s'; card.style.transform = ''; setTimeout(() => { card.style.transition = ''; card.classList.remove('sw-ok', 'sw-tom'); }, 220); }
      if (Math.abs(dx) > 10) { const stop = ev => { ev.stopPropagation(); ev.preventDefault(); }; card.addEventListener('click', stop, {capture: true, once: true}); setTimeout(() => card.removeEventListener('click', stop, {capture: true}), 300); }
    };
    card.addEventListener('pointerup', end); card.addEventListener('pointercancel', end);
  });
}

// El mensaje verde de "día libre" se ve 35 segundos y desaparece (no vuelve ese día mientras la app siga abierta)
function freeMsgOn(d) { const now = Date.now(); if (!UI.freeShown[d]) UI.freeShown[d] = now; return now - UI.freeShown[d] < 35000; }

/* ===== Estilo "All Tasks": fecha grande a la izquierda, tareas con resaltador y hora a la derecha ===== */
// Colores tipo resaltador; si la tarea es gris (sin área ni tipo de color), se le da uno alegre fijo
const HL_PASTEL = ['#ff6b8a', '#ffb627', '#4cc46b', '#4a90ff', '#a46bff', '#ff8a3d', '#22c1c3'];
function hlColor(i) {
  const c = colorOf(i.k, i.x);
  if (/^#?6b7487$/i.test(String(c).trim())) { const id = String(i.x.id || i.x.title || ''); let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) | 0; return HL_PASTEL[Math.abs(h) % HL_PASTEL.length]; }
  return c;
}
function hlRow(i) {
  const x = i.x, c = hlColor(i);
  const time = (i.k === 'tk' ? (x.time ? fmtTime(x.time) : '') : i.k === 'ev' ? (x.allDay ? 'Todo el día' : fmtTime(x.start)) : fmtTime(x.start)).replace(' a. m.', ' am').replace(' p. m.', ' pm');
  const title = i.k === 'rt' ? x.name : x.title;
  const dn = i.k === 'tk' && isDone(x);
  const lead = i.k === 'tk' ? `<button class="hlbox ${dn ? 'on' : ''}" data-chk="${x.id}" aria-label="${dn ? 'Desmarcar' : 'Completar'}"></button>`
    : `<span class="hlico">${i.k === 'ev' ? evType(x.evType).icon : '🔁'}</span>`;
  const flag = i.k === 'tk' && !dn && (x.priority === 'Urgente' || x.priority === 'Alta') ? `<span class="hlflag ${x.priority === 'Urgente' ? 'u' : ''}">!</span>` : '';
  const late = i.k === 'tk' && isLate(x);
  return `<div class="hlrow ${dn ? 'done' : ''}" ${i.k === 'tk' ? `data-tk="${x.id}"` : i.k === 'ev' ? `data-ev="${x.id}"` : `data-rt="${x.id}"`}>${lead}<span class="hltx"><span class="hl" style="--hlbg:${hexA(c, dn ? .22 : .45)}">${esc(title)}</span>${flag}${x.reminder != null && !dn ? ' <span class="bell">🔔</span>' : ''}</span><span class="hltime ${late ? 'late' : ''}">${time}</span></div>`;
}
function hlDay(d, items, {holidays = false, tasksView = false} = {}) {
  const dd = parseISO(d), ho = holidays ? holidaysOn(d) : [], t = todayISO();
  const rows = items.map(hlRow).join('');
  return `<div class="hlday ${d === t ? 'today' : ''} ${d < t && tasksView ? 'past' : ''}">
    <div class="hldate"><div class="hlnum">${dd.getDate()}</div><div class="hlwd">${cap(DCORTO[dd.getDay()])}, ${MESES[dd.getMonth()].slice(0, 3)}</div>${d === t ? '<div class="hltoday">Hoy</div>' : ''}<button class="hladd" data-hladd="${d}" aria-label="Añadir en esta fecha">+</button></div>
    <div class="hllist">${ho.map(h => `<div class="hlholi">🎉 ${esc(h.name)}</div>`).join('')}${rows || `<div class="hlempty">Nada para este día.</div>`}</div></div>`;
}
function wireHl(root, onAdd) {
  wireItems(root);
  root.querySelectorAll('[data-hladd]').forEach(b => b.onclick = e => { e.stopPropagation(); onAdd ? onAdd(b.dataset.hladd) : openTaskForm(null, {date: b.dataset.hladd}); });
}
/* Mes limpio (teléfono): números sueltos, puntitos de colores, 🎂 en celebraciones, se puede plegar */
function calMonthClean(body, d) {
  const cells = monthCells(d), m = parseISO(d).getMonth(), t = todayISO();
  let show = cells;
  if (UI.monthFold) { const k = Math.max(0, cells.indexOf(UI.selDate)); const r = Math.floor(k / 7) * 7; show = cells.slice(r, r + 7); }
  body.innerHTML = `<div class="cmonth ${calBgDark() ? 'bgdark' : ''}" style="${calBgStyle(m)}">
    <div class="cmwd">${wdHeaders().map(w => `<span>${w}</span>`).join('')}</div>
    <div class="cmgrid">${show.map(c => {
      const its = sortedDay(c, {withDone: true}), ho = holidaysOn(c), out = parseISO(c).getMonth() !== m;
      const cake = daySticker(c);
      const colors = [...new Set(its.map(i => hlColor(i)))].slice(0, 4);
      return `<button class="cmday ${out ? 'out' : ''} ${c === t ? 'today' : ''} ${c === UI.selDate ? 'sel' : ''} ${ho.length ? 'holi' : ''}" data-day="${c}"><span class="cmn">${parseISO(c).getDate()}</span>${cake ? `<span class="cmcake">${cake}</span>` : `<span class="cmdots">${colors.map(col => `<i style="background:${col}"></i>`).join('')}${ho.length ? '<i style="background:var(--red)"></i>' : ''}</span>`}</button>`;
    }).join('')}</div>
    <div class="cmfoot"><button class="cmfold" id="cmFold" aria-label="${UI.monthFold ? 'Ver el mes' : 'Plegar el mes'}">${UI.monthFold ? '▾ Ver todo el mes' : '▴ Plegar'}</button>${monthStyleSwitch()}</div></div>`;
  body.querySelectorAll('[data-day]').forEach(c => c.onclick = () => {
    const day = c.dataset.day;
    if (UI.selDate === day) { openEventForm(null, {date: day}, 'month'); return; }
    UI.selDate = day; if (parseISO(day).getMonth() !== m) UI.calDate = day; renderView();
  });
  $('#cmFold', body).onclick = () => { UI.monthFold = !UI.monthFold; renderView(); };
  wireMonthStyle(body);
}

function hexA(c, a) { const m = String(c).trim().match(/^#?([0-9a-f]{6})$/i); if (!m) return 'rgba(31,95,191,' + a + ')'; const n = parseInt(m[1], 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }

// Color de resaltador de cada cosa de una lista (fijo para cada una)
function itemHl(i) { let h = 0; for (const ch of String(i.id || i.t)) h = (h * 31 + ch.charCodeAt(0)) | 0; return HL_PASTEL[Math.abs(h) % HL_PASTEL.length]; }

/* ===== Stickers del día y fondo del calendario ===== */
const EMOJI_RE = /(\p{Extended_Pictographic}(\uFE0F|\u200D\p{Extended_Pictographic})*)/u;
const titleEmoji = t => { const m = String(t || '').match(EMOJI_RE); return m ? m[0] : ''; };
function daySticker(d) {
  const e = S.events.find(x => evOn(x, d) && x.sticker && areaVisible(x.areaId)) || S.tasks.find(x => x.date === d && x.sticker && areaVisible(x.areaId));
  if (e) return e.sticker;
  const te = S.events.find(x => evOn(x, d) && titleEmoji(x.title) && areaVisible(x.areaId)) || S.tasks.find(x => x.date === d && titleEmoji(x.title) && areaVisible(x.areaId));
  if (te) return titleEmoji(te.title);
  return S.events.some(x => x.date === d && x.evType === 'celebracion' && areaVisible(x.areaId)) ? '🎂' : '';
}
const svgBg = (body, bg) => 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice"><rect width="400" height="300" fill="${bg}"/>${body}</svg>`);

/* Fondos de temporada, uno por mes (se ven según el mes que estás mirando) */
const SEASON_BGS = (() => {
  const turkey = (x, y) => `<g transform="translate(${x} ${y})">${['#ffb48a', '#ffd08a', '#f7a07a', '#ffc6a0', '#f9b97c', '#ffd8a8', '#f7a07a'].map((c, i) => `<ellipse cx="0" cy="-40" rx="13" ry="46" fill="${c}" transform="rotate(${-75 + i * 25} 0 0)"/>`).join('')}<ellipse cx="0" cy="4" rx="30" ry="28" fill="#d9b08c"/><circle cx="0" cy="-28" r="15" fill="#e2bc98"/><circle cx="-5" cy="-31" r="2.4" fill="#5b4a3a"/><circle cx="5" cy="-31" r="2.4" fill="#5b4a3a"/><path d="M-4-25h8l-4 7z" fill="#ffcf6a"/><path d="M2-20c3 4 2 10-2 12" stroke="#f28b8b" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-10 30v10M10 30v10" stroke="#e0b070" stroke-width="4" stroke-linecap="round"/></g>`;
  const pie = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="8" rx="42" ry="10" fill="#efe2cf"/><path d="M-38 0h76l-6 10h-64z" fill="#e7b984"/><ellipse cx="0" cy="0" rx="38" ry="9" fill="#f3a86a"/><ellipse cx="8" cy="-3" rx="9" ry="4" fill="#fff6e8"/></g>`;
  const star = (x, y, r, c) => `<path d="M${x} ${y - r}l${r * .29} ${r * .6} ${r * .66} .1-${r * .48} ${r * .46} .12 ${r * .66}-${r * .59}-${r * .31}-${r * .59} ${r * .31} .12-${r * .66}-${r * .48}-${r * .46} ${r * .66}-.1z" fill="${c}"/>`;
  const heart = (x, y, s, c) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 6C-6-4-18 2-12 12L0 24 12 12C18 2 6-4 0 6z" fill="${c}"/>`;
  const flower = (x, y, c, r = 9) => [0, 72, 144, 216, 288].map(a => `<ellipse cx="${x}" cy="${y - r}" rx="${r * .6}" ry="${r}" fill="${c}" transform="rotate(${a} ${x} ${y})"/>`).join('') + `<circle cx="${x}" cy="${y}" r="${r * .55}" fill="#ffe18a"/>`;
  const stem = (x, y) => `<path d="M${x} 300V${y}" stroke="#a9d9b2" stroke-width="4"/>`;
  const leaf = (x, y, a, c) => `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0c10-14 26-14 34 0-10 14-26 14-34 0z" fill="${c}"/>`;
  const sun = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
  const waves = (c1, c2) => `<path d="M0 235c50-20 100 20 150 0s100 20 150 0 75 10 100 0v65H0z" fill="${c1}"/><path d="M0 262c50-18 100 18 150 0s100 18 150 0 75 9 100 0v38H0z" fill="${c2}"/>`;
  const palm = (x) => `<path d="M${x} 300c0-60 6-100 14-125" stroke="#cbb08a" stroke-width="6" fill="none"/><path d="M${x + 14} 175c-30-6-50 4-60 20 20-8 40-8 60-20zm0 0c26-14 50-10 64 2-22-3-42 1-64-2zm0 0c10-24 30-34 50-34-15 10-30 22-50 34zm0 0c-14-20-34-26-54-22 18 4 36 12 54 22z" fill="#a8d8ad"/>`;
  const pumpkin = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="26" ry="20" fill="#ffc28a"/><ellipse cx="-10" cy="0" rx="10" ry="19" fill="#ffb576"/><ellipse cx="10" cy="0" rx="10" ry="19" fill="#ffb576"/><path d="M0-19c0-8 4-12 8-14" stroke="#9cc79e" stroke-width="4" fill="none"/></g>`;
  const coqui = (x, y) => `<g transform="translate(${x} ${y})" fill="#b9dcae"><ellipse cx="0" cy="0" rx="16" ry="11"/><circle cx="-8" cy="-11" r="5"/><circle cx="8" cy="-11" r="5"/><circle cx="-8" cy="-11" r="2" fill="#5b6b5a"/><circle cx="8" cy="-11" r="2" fill="#5b6b5a"/><path d="M-14 6l-10 10M14 6l10 10" stroke="#b9dcae" stroke-width="4" stroke-linecap="round"/></g>`;
  const tree = (x) => `<path d="M${x} 150l-48 80h20l-30 45h116l-30-45h20z" fill="#b5dbb9"/><rect x="${x - 7}" y="275" width="14" height="25" fill="#d7bfa0"/>${star(x, 145, 12, '#ffd56a')}<circle cx="${x - 18}" cy="215" r="5" fill="#ff9aa8"/><circle cx="${x + 15}" cy="240" r="5" fill="#9cc6ff"/><circle cx="${x - 5}" cy="258" r="5" fill="#ffd56a"/>`;
  const gift = (x, y, c) => `<rect x="${x}" y="${y}" width="34" height="28" rx="4" fill="${c}"/><rect x="${x + 14}" y="${y}" width="6" height="28" fill="#fff" opacity=".7"/><path d="M${x + 17} ${y}c-10-12-20-4-10 0m10 0c10-12 20-4 10 0" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>`;
  const crown = (x, y, c) => `<path transform="translate(${x} ${y})" d="M0 22L-4 0l12 10L16-4l8 14L36 0l-4 22z" fill="${c}"/>`;
  const firework = (x, y, c) => [...Array(10)].map((_, i) => { const a = i * 36 * Math.PI / 180; return `<path d="M${x + Math.cos(a) * 8} ${y + Math.sin(a) * 8}L${x + Math.cos(a) * 26} ${y + Math.sin(a) * 26}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`; }).join('');
  const drop = (x, y) => `<path d="M${x} ${y}c-5 8-6 11-6 13a6 6 0 0 0 12 0c0-2-1-5-6-13z" fill="#a9cdf5"/>`;
  const fallLeaf = (x, y, a, c) => `<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0c4-12 18-16 26-12-2 10-10 20-26 12z" fill="${c}"/>`;
  const g = (body, bg) => svgBg(`<g opacity=".55">${body}</g>`, bg);
  return [
    ['Enero · Reyes', g(`${star(200, 60, 22, '#ffd56a')}${crown(110, 220, '#ffd88a')}${crown(185, 235, '#f7c2ff')}${crown(260, 220, '#a9d3ff')}<path d="M0 285h400v15H0z" fill="#f1e4cc"/>`, '#fbf8ff')],
    ['Febrero · Amor', g(`${heart(60, 60, 1.4, '#ffb3c4')}${heart(320, 50, 1, '#ffc9d6')}${heart(280, 200, 1.8, '#ffa7bb')}${heart(90, 210, 1.1, '#ffd0dc')}${heart(190, 130, .8, '#ffbccc')}`, '#fff7f9')],
    ['Marzo · Primavera', g(`${stem(60, 230)}${flower(60, 230, '#ffc6d9')}${stem(120, 250)}${flower(120, 250, '#d8c6ff')}${stem(300, 240)}${flower(300, 240, '#ffe09a')}${stem(350, 260)}${flower(350, 260, '#bfe6ff')}<path transform="translate(220 90)" d="M0 0c-14-14-30-4-20 10 6 8 14 6 20-10zm0 0c14-14 30-4 20 10-6 8-14 6-20-10z" fill="#ffd1a6"/>`, '#fbfdf7')],
    ['Abril · Lluvias', g(`${[[40, 40], [90, 90], [150, 50], [230, 30], [300, 80], [360, 40], [60, 150], [330, 150], [200, 120]].map(([x, y]) => drop(x, y)).join('')}<path d="M150 230a60 60 0 0 1 120 0z" fill="#ffc0cc"/><path d="M210 230v50c0 10-14 10-14 0" stroke="#c9b6a0" stroke-width="5" fill="none"/>${stem(320, 260)}${flower(320, 260, '#ffe09a', 8)}`, '#f6fbff')],
    ['Mayo · Flores', g(`${sun(330, 60, 26, '#ffe2a8')}${[40, 90, 140, 260, 310, 360].map((x, i) => stem(x, 230 + (i % 2) * 20) + flower(x, 230 + (i % 2) * 20, ['#ffc6d9', '#ffd59a', '#d8c6ff'][i % 3])).join('')}`, '#fffaf6')],
    ['Junio · Playa', g(`${sun(320, 70, 34, '#ffe2a8')}${waves('#bfe3f5', '#a9d8ef')}<path d="M0 287h400v13H0z" fill="#f4e3c2"/>${palm(60)}`, '#f3faff')],
    ['Julio · Verano', g(`${firework(90, 70, '#ffb3c4')}${firework(300, 60, '#a9d3ff')}${firework(200, 110, '#ffd88a')}${waves('#bfe3f5', '#a9d8ef')}<path d="M0 287h400v13H0z" fill="#f4e3c2"/>`, '#f7f9ff')],
    ['Agosto · Sol', g(`${sun(200, 90, 40, '#ffd79a')}${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M${200 + Math.cos(a * Math.PI / 180) * 52} ${90 + Math.sin(a * Math.PI / 180) * 52}L${200 + Math.cos(a * Math.PI / 180) * 70} ${90 + Math.sin(a * Math.PI / 180) * 70}" stroke="#ffd79a" stroke-width="6" stroke-linecap="round"/>`).join('')}${palm(40)}${palm(320)}<path d="M0 285h400v15H0z" fill="#f4e3c2"/>`, '#fffbf3')],
    ['Septiembre · Brisa', g(`<path d="M20 80h160a30 30 0 1 0-30-30M20 120h230a30 30 0 1 1-30 30M60 160h90" stroke="#c4d8ee" stroke-width="6" fill="none" stroke-linecap="round"/>${fallLeaf(280, 70, 20, '#ffd08a')}${fallLeaf(330, 130, -30, '#ffb98a')}${fallLeaf(240, 200, 60, '#f7d89c')}${leaf(80, 250, -20, '#cfe6c1')}`, '#f8fbfd')],
    ['Octubre · Otoño', g(`${pumpkin(90, 265, 1.3)}${pumpkin(160, 275, .9)}${pumpkin(320, 268, 1.1)}${fallLeaf(60, 60, 10, '#ffc08a')}${fallLeaf(200, 40, -40, '#ffd08a')}${fallLeaf(330, 90, 30, '#f7b07a')}${fallLeaf(260, 160, 70, '#ffd8a0')}`, '#fffaf4')],
    ['Noviembre · Acción de Gracias', g(`${fallLeaf(40, 50, 10, '#ffc08a')}${fallLeaf(140, 30, -30, '#ffd08a')}${fallLeaf(220, 80, 40, '#f7b07a')}${fallLeaf(360, 40, -10, '#ffd8a0')}${fallLeaf(80, 150, 60, '#f7c58a')}${turkey(310, 240)}${pie(110, 270)}${pumpkin(200, 275, .75)}<path d="M0 285h400v15H0z" fill="#f3e6d3"/>`, '#fffaf4')],
    ['Diciembre · Navidad', g(`${tree(310)}${gift(60, 262, '#ffb3c4')}${gift(105, 270, '#a9d3ff')}${gift(150, 262, '#ffd88a')}${[[40, 40], [120, 70], [200, 30], [260, 90], [360, 50]].map(([x, y]) => star(x, y, 6, '#ffe39a')).join('')}`, '#f8fbff')]
  ];
})();
const CAL_BGS = {
  escritorio: ['Escritorio', svgBg('<g opacity=".55"><rect x="230" y="150" width="130" height="120" rx="12" fill="#e3ecfb" stroke="#b9cdee" stroke-width="3"/><rect x="230" y="150" width="130" height="28" rx="10" fill="#cfdcf5"/>' + [0,1,2,3,4,5,6,7].map(i => `<circle cx="${245 + i * 15}" cy="146" r="6" fill="none" stroke="#b9cdee" stroke-width="3"/>`).join('') + '<path d="M245 195h100M245 215h100M245 235h100M265 185v80M290 185v80M315 185v80" stroke="#c7d6f1" stroke-width="2"/><path d="M70 230h90l-8 50H78z" fill="#eaf2fb" stroke="#c8d9ef" stroke-width="3"/><path d="M160 240c25 0 25 30 0 30" fill="none" stroke="#c8d9ef" stroke-width="3"/><path d="M95 215c-8-12 8-18 0-30M120 215c-8-12 8-18 0-30" stroke="#d3e0f2" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="0" y="278" width="400" height="22" fill="#eef3fb"/></g>', '#f6f9fe')],
  plantas: ['Plantas', svgBg('<g opacity=".5" fill="#bfe3c9"><path d="M40 300c0-90 40-150 90-170-30 50-40 110-40 170z"/><path d="M90 300c10-70 60-120 120-130-50 40-70 90-80 130z" fill="#cfead6"/><path d="M360 300c0-80-30-140-80-160 25 45 35 105 30 160z"/><path d="M330 300c-5-60-40-100-90-115 40 35 55 75 55 115z" fill="#d8efde"/><circle cx="320" cy="60" r="28" fill="#fdebc8"/></g>', '#f5fbf6')],
  playa: ['Playa', svgBg('<g opacity=".6"><circle cx="320" cy="70" r="34" fill="#ffe2a8"/><path d="M0 220c50-20 100 20 150 0s100 20 150 0 75 10 100 0v80H0z" fill="#bfe3f5"/><path d="M0 250c50-18 100 18 150 0s100 18 150 0 75 9 100 0v50H0z" fill="#a9d8ef"/><path d="M0 285h400v15H0z" fill="#f4e3c2"/><path d="M70 285c0-60 6-100 14-120" stroke="#cbb08a" stroke-width="6" fill="none"/><path d="M84 165c-30-5-50 5-60 20 20-8 40-8 60-20zm0 0c25-15 50-12 65 0-22-2-42 2-65 0zm0 0c10-25 30-35 50-35-15 10-30 22-50 35z" fill="#b5ddb9"/></g>', '#f3faff')],
  montanas: ['Montañas', svgBg('<g opacity=".55"><circle cx="90" cy="80" r="30" fill="#ffe0b8"/><path d="M0 300l110-150 70 80 60-110 160 180z" fill="#d9e2f2"/><path d="M0 300l80-90 60 60 80-70 180 100z" fill="#c9d6ec"/><path d="M240 120l-20 28h40z" fill="#fff"/></g>', '#f7f9fd')],
  noche: ['Noche', svgBg('<g opacity=".8"><circle cx="320" cy="70" r="30" fill="#f6f1c8"/><circle cx="333" cy="62" r="26" fill="#25335a"/>' + [[40,40],[90,90],[150,30],[210,80],[60,150],[260,140],[120,190],[360,170],[30,230],[190,220]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#e8ecff"/>`).join('') + '<path d="M0 300c60-40 120-30 200-10s150 0 200-20v30z" fill="#1d2a4c"/></g>', '#2b3a64'), true],
  flores: ['Flores', svgBg('<g opacity=".5">' + [[50,250,'#ffc9d6'],[110,270,'#ffe0a3'],[300,255,'#d9c8ff'],[360,275,'#ffc9d6'],[200,280,'#c8ecff']].map(([x, y, col]) => `<path d="M${x} 300v-${300 - y}" stroke="#bfe0c4" stroke-width="4"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${x}" cy="${y - 12}" rx="7" ry="13" fill="${col}" transform="rotate(${a} ${x} ${y})"/>`).join('')}<circle cx="${x}" cy="${y}" r="6" fill="#ffe7a0"/>`).join('') + '</g>', '#fff9fb')]
};
function calBgStyle(month) {
  const k = S.settings.calBg || 'auto';
  if (k === 'none') return '';
  if (k === 'auto') { const b = SEASON_BGS[month ?? new Date().getMonth()]; return `background-image:url('${b[1]}');background-size:cover;background-position:center bottom`; }
  if (k === 'custom') { if (UI.bgUrl) return `background-image:linear-gradient(rgba(255,255,255,.72),rgba(255,255,255,.72)),url('${UI.bgUrl}');background-size:cover;background-position:center`; loadCustomBg(); return ''; }
  const b = CAL_BGS[k]; return b ? `background-image:url('${b[1]}');background-size:cover;background-position:center bottom` : '';
}
// Tu foto de fondo: se guarda en el dispositivo y, si se puede, en tu cuenta (así funciona aunque un almacén esté bloqueado)
const BG_LS = 'mi-organizador-fondo';
const blobToDataURL = blob => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(blob); });
async function saveCustomBg(blob) {
  let ok = false;
  try { const d = await customSound.db(); await new Promise((r, j) => { const t = d.transaction('s', 'readwrite'); t.objectStore('s').put(blob, 'calbg'); t.oncomplete = r; t.onerror = () => j(t.error); }); ok = true; } catch (e) {}
  const url = await blobToDataURL(blob);
  try { localStorage.setItem(BG_LS, url); ok = true; } catch (e) {}
  try { if (Store.db && Store.uid && url.length < 240000) { await Store.db.doc('data/users/' + Store.uid + '/calbg').set({img: url}); ok = true; } } catch (e) {}
  return {ok, url};
}
async function loadCustomBg() {
  if (UI.bgLoading || UI.bgUrl) return; UI.bgLoading = true;
  let url = null;
  try { const d = await customSound.db(); const blob = await new Promise(r => { const q = d.transaction('s').objectStore('s').get('calbg'); q.onsuccess = () => r(q.result || null); q.onerror = () => r(null); }); if (blob) url = URL.createObjectURL(blob); } catch (e) {}
  if (!url) { try { url = localStorage.getItem(BG_LS); } catch (e) {} }
  if (!url) { try { if (Store.db && Store.uid) { const snap = await Store.db.doc('data/users/' + Store.uid + '/calbg').get(); if (snap.exists) url = snap.data().img; } } catch (e) {} }
  UI.bgLoading = false;
  if (url) { UI.bgUrl = url; if (UI.view === 'calendario') renderView(); }
}
function openCalBg() {
  const cur = S.settings.calBg || 'auto';
  const mm = parseISO(UI.calDate || todayISO()).getMonth();
  const s = openSheet({title: '🎨 Fondo del calendario', body: `<div class="bggrid">
      <button class="bgopt ${cur === 'auto' ? 'on' : ''}" data-bg="auto"><span class="bgprev" style="background-image:url('${SEASON_BGS[mm][1]}')"></span><span>Según el mes ✨</span></button>
      <button class="bgopt ${cur === 'none' ? 'on' : ''}" data-bg="none"><span class="bgprev" style="background:var(--card)"></span><span>Sin fondo</span></button>
      ${Object.entries(CAL_BGS).map(([k, [n, url]]) => `<button class="bgopt ${cur === k ? 'on' : ''}" data-bg="${k}"><span class="bgprev" style="background-image:url('${url}')"></span><span>${n}</span></button>`).join('')}
      <label class="bgopt ${cur === 'custom' ? 'on' : ''}" style="cursor:pointer"><span class="bgprev bgup" style="${UI.bgUrl ? `background-image:url(${UI.bgUrl})` : ''}">${UI.bgUrl ? '' : '📷'}</span><span>${UI.bgUrl ? 'Mi foto · cambiar' : 'Subir mi foto'}</span><input type="file" id="bgFile" accept="image/*" class="fileover"></label>
    </div><p class="xs muted" style="margin:10px 0 0">“Según el mes” cambia el dibujo cada mes: Reyes, San Valentín, primavera, lluvias, playa, verano, otoño, Acción de Gracias, Navidad…</p>`,
    onMount: el => {
      el.querySelectorAll('[data-bg]').forEach(b => b.onclick = () => { S.settings.calBg = b.dataset.bg; save('meta'); s.close(); renderView(); });
      el.querySelector('#bgFile').onchange = async e => {
        const f = e.target.files[0]; if (!f) return;
        toast('Preparando tu foto…');
        let blob;
        try { blob = await shrinkImage(f, 800); if (blob.size > 170000) blob = await shrinkImage(f, 600); }
        catch (err) { toast('⚠️ No pude abrir esa imagen (' + String(err && err.message || err).slice(0, 40) + '). Prueba con otra foto.'); return; }
        const r = await saveCustomBg(blob);
        UI.bgUrl = r.url; S.settings.calBg = 'custom'; save('meta'); s.close(); renderView();
        toast(r.ok ? 'Fondo listo 🎨' : 'Fondo puesto 🎨 (no se pudo guardar: se perderá al cerrar la app)');
      };
    }});
}

const calBgDark = () => { const b = CAL_BGS[S.settings.calBg]; return !!(b && b[2]); };
function shrinkImage(file, max = 900) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => { try { const k = Math.min(1, max / Math.max(img.width, img.height)), cv = document.createElement('canvas'); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k); cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(img.src); cv.toBlob(b => b ? res(b) : rej(new Error('imagen')), 'image/jpeg', 0.8); } catch (e) { rej(e); } };
    img.onerror = () => rej(new Error('formato no compatible'));
    img.src = URL.createObjectURL(file);
  });
}

/* ===== Mes con detalle (teléfono): nombres con barrita de color, casillas y eventos de varios días ===== */
function monthStyleSwitch() { const st = S.settings.monthStyle === 'puntos' ? 'puntos' : 'detalle'; return `<span class="mstyle"><button data-ms="detalle" class="${st === 'detalle' ? 'on' : ''}">Detalle</button><button data-ms="puntos" class="${st === 'puntos' ? 'on' : ''}">Puntos</button></span>`; }
function wireMonthStyle(root) { root.querySelectorAll('[data-ms]').forEach(b => b.onclick = e => { e.stopPropagation(); S.settings.monthStyle = b.dataset.ms; save('meta'); renderView(); }); }
function calMonthDetail(body, d) {
  const cells = monthCells(d), m = parseISO(d).getMonth(), t = todayISO(), MAX = 3;
  let show = cells;
  if (UI.monthFold) { const k = Math.max(0, cells.indexOf(UI.selDate)); const r = Math.floor(k / 7) * 7; show = cells.slice(r, r + 7); }
  const lab = (i, c) => {
    const x = i.x, col = fcColor(i), cont = i.k === 'ev' && x.date !== c, startOfRow = (cells.indexOf(c) % 7) === 0;
    const em = i.k === 'ev' ? (x.sticker || titleEmoji(x.title) || '') : i.k === 'tk' ? (x.sticker || '') : '';
    const title = (i.k === 'rt' ? x.name : x.title).replace(em, '').trim();
    const box = i.k === 'tk' ? `<span class="mlbox ${isDone(x) ? 'on' : ''}"></span>` : '';
    const span = i.k === 'ev' && x.endDate ? (cont ? (c === x.endDate ? 'span-end' : 'span-mid') : 'span-start') : '';
    return `<span class="mlab ${i.k} ${span} ${i.k === 'tk' && isDone(x) ? 'done' : ''}" style="--c:${col};--cb:${hexA(col, i.k === 'ev' ? .28 : .16)}" ${i.k === 'tk' ? `data-tk="${x.id}"` : i.k === 'ev' ? `data-ev="${x.id}"` : `data-rt="${x.id}"`}>${box}${cont && !startOfRow ? '&nbsp;' : `${em ? `<b class="mlem">${em}</b>` : ''}${esc(title)}`}</span>`;
  };
  body.innerHTML = `<div class="dmonth ${calBgDark() ? 'bgdark' : ''}" style="${calBgStyle(m)}">
    <div class="cmwd">${wdHeaders().map(w => `<span>${w}</span>`).join('')}</div>
    <div class="dmgrid">${show.map(c => {
      const its = sortedDay(c, {withDone: true}), ho = holidaysOn(c), out = parseISO(c).getMonth() !== m;
      const labs = [...ho.map(h => `<span class="mlab ho">🎉 ${esc(h.name)}</span>`), ...its.map(i => lab(i, c))];
      return `<div class="dmday ${out ? 'out' : ''} ${c < t ? 'past' : ''} ${c === t ? 'today' : ''} ${c === UI.selDate ? 'sel' : ''} ${ho.length ? 'holi' : ''}" data-day="${c}"><span class="dmn">${parseISO(c).getDate()}</span>${labs.slice(0, MAX).join('')}${labs.length > MAX ? `<span class="mmore">+${labs.length - MAX}</span>` : ''}</div>`;
    }).join('')}</div>
    <div class="cmfoot"><button class="cmfold" id="cmFold">${UI.monthFold ? '▾ Ver todo el mes' : '▴ Plegar'}</button>${monthStyleSwitch()}</div></div>`;
  body.querySelectorAll('[data-day]').forEach(c => c.onclick = () => {
    const day = c.dataset.day;
    if (UI.selDate === day) { openEventForm(null, {date: day}, 'month'); return; }
    UI.selDate = day; if (parseISO(day).getMonth() !== m) UI.calDate = day; renderView();
    setTimeout(() => { const p = $('#dp'); p && p.scrollIntoView({behavior: 'smooth', block: 'nearest'}); }, 60);
  });
  $('#cmFold', body).onclick = () => { UI.monthFold = !UI.monthFold; renderView(); };
  wireMonthStyle(body);
}
/* ===== Vista "Próximos" (como Forecast): tarjetas de colores por día ===== */
function calForecast(body, d) {
  const days = [...Array(14)].map((_, i) => addDays(d, i)), t = todayISO();
  const html = days.map(x => {
    const its = sortedDay(x, {withDone: true}), ho = holidaysOn(x);
    if (!its.length && !ho.length) return '';
    const dd = parseISO(x);
    const tile = i => {
      const o = i.x, col = fcColor(i), dn = i.k === 'tk' && isDone(o);
      const allDay = i.k === 'ev' ? (o.allDay || o.date !== x) : i.k === 'tk' ? !o.time : false;
      const start = i.k === 'ev' ? o.start : i.k === 'tk' ? o.time : o.start, end = i.k === 'ev' ? o.end : i.k === 'rt' ? o.end : null;
      const title = i.k === 'rt' ? o.name : o.title, em = o.sticker && !title.includes(o.sticker) ? ' ' + o.sticker : '';
      const shortT = v => fmtTime(v).replace(' a. m.', ' am').replace(' p. m.', ' pm');
      return `<div class="ftile ${i.k} ${dn ? 'done' : ''}" style="--fb:${hexA(col, .3)};--fc:${col}" ${i.k === 'tk' ? `data-tk="${o.id}"` : i.k === 'ev' ? `data-ev="${o.id}"` : `data-rt="${o.id}"`}>
        <div class="fthead">${i.k === 'tk' ? `<button class="mlbox ${dn ? 'on' : ''}" data-chk="${o.id}" aria-label="Completar"></button>` : ''}<b>${allDay ? 'Todo el día' : shortT(start)}</b>${i.k === 'rt' ? '<span class="ftk">🔁</span>' : ''}</div>
        <div class="fttl">${esc(title)}${em}</div>${o.place ? `<div class="ftpl">📍 ${esc(o.place)}</div>` : ''}
        ${end && !allDay ? `<div class="ftend">${shortT(end)}</div>` : o.endDate && i.k === 'ev' ? `<div class="ftend">hasta ${parseISO(o.endDate).getDate()} ${MESES[parseISO(o.endDate).getMonth()].slice(0, 3)}</div>` : ''}</div>`;
    };
    return `<div class="fday ${x === t ? 'today' : ''}"><div class="fdate"><span>${cap(DCORTO[dd.getDay()])}</span><b>${dd.getDate()}</b><span>${MESES[dd.getMonth()].slice(0, 3)}</span></div>
      <div class="fgrid">${ho.map(h => `<div class="ftile ho" style="--fb:var(--holi);--fc:var(--holiText)"><div class="fthead"><b>Todo el día</b></div><div class="fttl">🎉 ${esc(h.name)}</div></div>`).join('')}${its.map(tile).join('')}</div></div>`;
  }).join('');
  body.innerHTML = `<div class="forecast">${html || '<div class="card empty"><div class="big">🌤️</div>Nada en estos 14 días. Toca “+” para añadir.</div>'}</div>`;
  wireItems(body);
}

// Color variado (como en tu imagen) para lo que no tiene área; si tiene área, usa el color del área
function fcColor(i) { if (i.x.areaId && S.areas.some(a => a.id === i.x.areaId)) return colorOf(i.k, i.x); const id = String(i.x.id || i.x.title || ''); let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) | 0; return HL_PASTEL[Math.abs(h) % HL_PASTEL.length]; }

/* ========== HÁBITOS ========== */
const HAB_ICONS = ['😊','💧','🍳','🍌','☀️','😴','📖','📘','💪','🧘','🌈','🧹','💬','🤸','🧖','👁️','🌳','🚶','🏃','💵','⚖️','🌱','🍎','🥗','🙏','💊','🦷','🛏️','📵','🍦','🍷','🍭','🎮','📺','🎸','📷','✍️','🚴','🏊','🐶'];
const HAB_SUG = [['💧', 'Tomar agua', 8, 'agua'], ['🚶', 'Caminar', 30, 'actividad'], ['📖', 'Leer', 1, 'lectura'], ['🧘', 'Meditar', 10, 'tiempo'], ['☀️', 'Levantarme temprano', 1, 'despertar'], ['🥗', 'Comer saludable', 5, 'comida'], ['💵', 'Ahorrar dinero', 1, 'ahorro'], ['🙏', 'Orar', 10, 'oracion']];
const OZ = 16; // onzas por botella
const habKind = h => h.kind || (h.unit === 'agua' ? 'agua' : h.unit === 'lectura' ? 'lectura' : h.unit === 'tiempo' ? 'tiempo' : '');
const isTimeKind = h => ['tiempo', 'actividad', 'oracion'].includes(habKind(h));
const habGoal = h => habKind(h) === 'lectura' ? 1 : habKind(h) === 'agua' ? (+h.goalOz > 0 ? +h.goalOz : Math.max(1, +h.goal || 1) * 8) : isTimeKind(h) ? Math.max(1, +h.goal || 10) : Math.max(1, +h.goal || 1);
const habBottles = h => Math.ceil(habGoal(h) / OZ);
const habCount = (h, d) => (h.log && h.log[d]) || 0;
const habDone = (h, d) => (habKind(h) === 'ahorro' ? habCount(h, d) > 0 : habKind(h) === 'despertar' ? wakeOnTime(h, d) : habCount(h, d) >= habGoal(h)) || (habKind(h) === 'actividad' && +h.goalDist > 0 && actDist(h, d) >= +h.goalDist) || (habKind(h) === 'actividad' && +h.goalSteps > 0 && actSteps(h, d) >= +h.goalSteps);
const habDue = (h, d) => (!h.days || !h.days.length || h.days.includes(parseISO(d).getDay())) && (!h.created || d >= h.created);
const habTotal = h => [...new Set([...Object.keys(h.log || {}), ...Object.keys(h.dist || {}), ...Object.keys(h.woke || {})])].filter(d => habDone(h, d)).length;
function habStreak(h, upto) { let n = 0, d = upto; if (!habDone(h, d)) d = addDays(d, -1); for (let k = 0; k < 800; k++) { if (!habDue(h, d)) { if (h.created && d < h.created) break; d = addDays(d, -1); continue; } if (!habDone(h, d)) break; n++; d = addDays(d, -1); } return n; }
function habUndo(h, d) { const c = habCount(h, d); if (!c) return; h.log = h.log || {}; if (c <= 1) delete h.log[d]; else h.log[d] = c - 1; save('habits'); }
function bottleSVG(h, oz) {
  const g = habGoal(h), full = oz >= g, lvl = oz === 0 ? 0 : (oz % OZ === 0 ? 1 : (oz % OZ) / OZ), id = 'bt' + h.id;
  return `<svg class="bottle" viewBox="0 0 40 60" aria-hidden="true"><defs><clipPath id="${id}"><path d="M15 12h10v5c5 2 8 5 8 10v25a6 6 0 0 1-6 6H13a6 6 0 0 1-6-6V27c0-5 3-8 8-10z"/></clipPath></defs>
    <rect x="14" y="3" width="12" height="7" rx="2" fill="${full ? '#2bc48a' : '#7fb4ff'}"/>
    <g clip-path="url(#${id})"><rect x="0" y="0" width="40" height="60" fill="#eaf4ff"/><rect class="water" x="0" y="${58 - 40 * lvl}" width="40" height="60" fill="${full ? '#5ad1a0' : '#5aa8ff'}"/>${[1,2,3,4,5,6,7].map(i => `<line x1="7" x2="11" y1="${58 - 5 * i}" y2="${58 - 5 * i}" stroke="#fff" stroke-width="1"/>`).join('')}</g>
    <path d="M15 12h10v5c5 2 8 5 8 10v25a6 6 0 0 1-6 6H13a6 6 0 0 1-6-6V27c0-5 3-8 8-10z" fill="none" stroke="#5aa8ff" stroke-width="1.6"/></svg>`;
}
const isHabPinned = id => (pins().habs || []).includes(id);
function toggleHabPin(id) { const P = pins(), was = isHabPinned(id); P.habs = (P.habs || []).filter(x => x !== id); if (!was) P.habs.push(id); save('meta'); toast(was ? 'Quitado de fijados' : 'Fijado en Mi Día'); }
const habPages = h => Object.values(h.log || {}).reduce((a, b) => a + (+b || 0), 0);
function habTap(h, d) {
  if (habKind(h) === 'lectura') return openBook(h, d);
  if (habKind(h) === 'ahorro') return openSave(h, d);
  if (habKind(h) === 'despertar') return openWake(h, d);
  if (habKind(h) === 'comida') return openFood(h, d);
  if (isTimeKind(h)) return openTimer(h, d);
  if (habKind(h) === 'agua' && !habTap.direct) return openWater(h, d);
  if (habKind(h) === 'agua') { const g = habGoal(h), c = habCount(h, d); h.log = h.log || {}; h.log[d] = c + 1; save('habits');
    if ((c + 1) % OZ === 0) toast(`💧 ¡Botella ${(c + 1) / OZ} llena!`);
    if (c + 1 >= g && c < g) setTimeout(() => toast('🎉 ¡Meta de agua cumplida!'), 400);
    if (navigator.vibrate) try { navigator.vibrate(10); } catch (e) {} return; }
  const g = habGoal(h), c = habCount(h, d); h.log = h.log || {};
  if (c >= g) delete h.log[d]; else h.log[d] = c + 1;
  save('habits');
  if (habDone(h, d) && c < g) { toast(`${h.icon} ¡${h.name} listo!`); if (navigator.vibrate) try { navigator.vibrate(15); } catch (e) {} }
}
function vHabitos(v) {
  migrateHabits();
  UI.habTab = UI.habTab || 'hoy'; UI.habDay = UI.habDay || todayISO();
  v.innerHTML = `<div class="habtop"><div class="seg">${[['hoy', 'Hoy'], ['informe', 'Informe']].map(([k, n]) => `<button data-ht="${k}" class="${UI.habTab === k ? 'on' : ''}">${n}</button>`).join('')}</div><button class="btn sm" id="hNew">+ Hábito</button></div><div id="habBody"></div>`;
  v.querySelectorAll('[data-ht]').forEach(b => b.onclick = () => { UI.habTab = b.dataset.ht; renderView(); });
  $('#hNew', v).onclick = () => openHabitForm();
  const body = $('#habBody', v);
  if (!S.habits.length) {
    body.innerHTML = `<div class="card habempty"><div class="big">🌱</div><h3>Crea tus hábitos</h3><p>Marca cada día lo que haces y mira tu progreso. Toca uno para empezar:</p><div class="habsug">${HAB_SUG.map((x, i) => `<button data-sug="${i}"><span>${x[0]}</span>${x[1]}${x[3] === 'agua' ? ' <small>botella de 16 oz</small>' : x[3] === 'lectura' ? ' <small>con 🔖</small>' : x[3] === 'tiempo' || x[3] === 'actividad' || x[3] === 'oracion' ? ` <small>${x[2]} min</small>` : x[3] === 'despertar' ? ' <small>6:00 am</small>' : x[3] === 'comida' ? ' <small>5 porciones</small>' : x[3] === 'ahorro' ? ' <small>con meta</small>' : ''}</button>`).join('')}</div><button class="btn" id="hNew2">+ Crear mi propio hábito</button></div>`;
    wireHabSug(body);
    $('#hNew2', body).onclick = () => openHabitForm();
    return;
  }
  if (UI.habTab === 'informe') return habReport(body);
  const t = todayISO(), d = UI.habDay, w = weekDays(d);
  const due = S.habits.filter(h => habDue(h, d)), done = due.filter(h => habDone(h, d)).length;
  body.innerHTML = `<div class="card habcard">
    <div class="habweek">${w.map(x => { const dd = parseISO(x), dueX = S.habits.filter(h => habDue(h, x)), all = dueX.length && dueX.every(h => habDone(h, x)); return `<button data-hd="${x}" class="${x === d ? 'on' : ''} ${x === t ? 'today' : ''} ${x > t ? 'fut' : ''}"><span>${DCORTO[dd.getDay()].slice(0, 1).toUpperCase()}</span><b>${dd.getDate()}</b><i class="${all ? 'all' : ''}"></i></button>`; }).join('')}</div>
    <div class="habprog"><span>${d === t ? 'Hoy' : cap(fmtLong(d))}</span><span><b>${done}</b> de ${due.length} listos</span></div>
    <div class="habbar"><i style="width:${due.length ? done / due.length * 100 : 0}%"></i></div>
    <div class="hablist">${S.habits.map(h => {
      const g = habGoal(h), c = habCount(h, d), ok = c >= g, isDue = habDue(h, d), st = habStreak(h, t), kd = habKind(h);
      if (kd === 'agua') { const nb = Math.floor(c / OZ), gb = habBottles(h), cur = c % OZ;
        return `<div class="habrow water ${ok ? 'ok' : ''} ${isDue ? '' : 'off'}" data-hab="${h.id}" role="button" tabindex="0">
        <span class="habbot">${bottleSVG(h, c)}${ok ? '<em>✓</em>' : ''}</span>
        <span class="habtx"><b>${esc(h.name)}</b><small>${!isDue ? 'Descanso hoy' : `<b class="ozn">${cur} de ${OZ} oz</b> · ${nb} de ${gb} botellas`}${(h.reminders || []).some(r => r.on !== false) && h.remOn !== false ? ' · ⏰' : ''}${st > 1 ? ` · 🔥 ${st}` : ''}</small><span class="botrow">${[...Array(Math.max(gb, nb))].map((_, i) => `<i class="${i < nb ? 'on' : ''}"></i>`).join('')}</span></span>
        <span class="habtot"><b>${c}</b><small>oz hoy</small></span>
        <span class="habside"><button class="habmore" data-hed="${h.id}" aria-label="Editar">⋯</button>${c ? `<button class="habminus" data-hmin="${h.id}" aria-label="Quitar 1 onza">−1</button>` : ''}</span></div>`; }
      if (['ahorro', 'despertar', 'comida', 'oracion'].includes(kd)) { const info = habRowInfo(h, d);
        return `<div class="habrow ${ok ? 'ok' : ''} ${isDue ? '' : 'off'}" data-hab="${h.id}" role="button" tabindex="0">
        <span class="habic" style="--hc:${hexA(h.color, .28)};--hr:${h.color};--hp:${info.p * 100}%">${h.icon}${ok ? '<em>✓</em>' : ''}</span>
        <span class="habtx"><b>${esc(h.name)}</b><small>${!isDue ? 'Descanso hoy' : info.sub}${st > 1 ? ` · 🔥 ${st}` : ''}</small>${info.pill ? `<span class="calpill ${info.pc || ''}">${info.pill}</span>` : ''}</span>
        <span class="habtot"><b>${info.big}</b><small>${info.bigl}</small></span>
        <button class="habmore" data-hed="${h.id}" aria-label="Editar">⋯</button></div>`; }
      if (kd === 'actividad') { const run = UI.habTimer && UI.habTimer.id === h.id, ds = actDist(h, d), u = h.unitD || 'mi', cal = actCalories(h, d);
        return `<div class="habrow ${ok ? 'ok' : ''} ${isDue ? '' : 'off'}" data-hab="${h.id}" role="button" tabindex="0">
        <span class="habic" style="--hc:${hexA(h.color, .28)};--hr:${h.color};--hp:${Math.min(1, Math.max(c / g, +h.goalDist ? ds / h.goalDist : 0)) * 100}%">${actMode(h, d) === 'correr' ? '🏃' : h.icon}${ok ? '<em>✓</em>' : ''}</span>
        <span class="habtx"><b>${esc(h.name)}</b><small>${!isDue ? 'Descanso hoy' : run ? '⏱ Contando tiempo…' : `${c}/${g} min${+h.goalDist || ds ? ` · ${fmtD(ds)}${+h.goalDist ? '/' + fmtD(h.goalDist) : ''} ${u}` : ''}${+h.goalSteps || actSteps(h, d) ? ` · 👣 ${fmtPasos(actSteps(h, d))}${+h.goalSteps ? '/' + fmtPasos(h.goalSteps) : ''}` : ''}`}${st > 1 ? ` · 🔥 ${st}` : ''}</small>${cal ? `<span class="calpill">🔥 ~${cal} cal</span>` : ''}</span>
        <span class="habtot"><b>${c}</b><small>min hoy</small></span>
        <button class="habmore" data-hed="${h.id}" aria-label="Editar">⋯</button></div>`; }
      if (kd === 'tiempo') { const run = UI.habTimer && UI.habTimer.id === h.id;
        return `<div class="habrow ${ok ? 'ok' : ''} ${isDue ? '' : 'off'}" data-hab="${h.id}" role="button" tabindex="0">
        <span class="habic" style="--hc:${hexA(h.color, .28)};--hr:${h.color};--hp:${Math.min(1, c / g) * 100}%">${h.icon}${ok ? '<em>✓</em>' : ''}</span>
        <span class="habtx"><b>${esc(h.name)}</b><small>${!isDue ? 'Descanso hoy' : run ? '⏱ Contando tiempo…' : `${c} de ${g} min`}${st > 1 ? ` · 🔥 ${st}` : ''}</small></span>
        <span class="habtot"><b>${c}</b><small>min hoy</small></span>
        <button class="habmore" data-hed="${h.id}" aria-label="Editar">⋯</button></div>`; }
      if (kd === 'lectura') return `<div class="habrow read ${ok ? 'ok' : ''} ${isDue ? '' : 'off'}" data-hab="${h.id}" role="button" tabindex="0">
        <span class="habic" style="--hc:${hexA(h.color, .28)};--hr:${h.color};--hp:${ok ? 100 : 0}%">${h.icon}${ok ? '<em>✓</em>' : ''}</span>
        <span class="habtx"><b>${esc(h.name)}</b><small>${!isDue ? 'Descanso hoy' : c ? `${c} páginas ${d === t ? 'hoy' : 'ese día'}` : 'Toca para anotar páginas'}${st > 1 ? ` · 🔥 ${st}` : ''}</small>${h.bookmark || h.book ? `<span class="bkpill">🔖 ${h.bookmark ? `pág. ${h.bookmark}` : ''}${h.book ? `${h.bookmark ? ' · ' : ''}${esc(h.book)}` : ''}</span>` : ''}</span>
        <span class="habtot"><b>${habPages(h)}</b><small>páginas leídas</small></span>
        <button class="habmore" data-hed="${h.id}" aria-label="Editar">⋯</button></div>`;
      return `<div class="habrow ${ok ? 'ok' : ''} ${isDue ? '' : 'off'}" data-hab="${h.id}" role="button" tabindex="0">
        <span class="habic" style="--hc:${hexA(h.color, .28)};--hr:${h.color};--hp:${Math.min(1, c / g) * 100}%">${h.icon}${ok ? '<em>✓</em>' : ''}</span>
        <span class="habtx"><b>${esc(h.name)}</b><small>${!isDue ? 'Descanso hoy' : g > 1 ? `${c}/${g} ${esc(h.unit || '')}` : ok ? '¡Hecho!' : 'Toca para marcar'}${st > 1 ? ` · 🔥 ${st} días seguidos` : ''}</small></span>
        <span class="habtot"><b>${habTotal(h)}</b><small>días en total</small></span>
        <button class="habmore" data-hed="${h.id}" aria-label="Editar">⋯</button></div>`;
    }).join('')}</div>
    ${d > t ? '<p class="hint">Este día todavía no llega: podrás marcarlo cuando sea el día.</p>' : ''}</div>
    ${HAB_SUG.some(x => !S.habits.some(h => h.name === x[1])) ? `<div class="habideas"><span>Ideas:</span>${HAB_SUG.map((x, i) => S.habits.some(h => h.name === x[1]) ? '' : `<button data-sug="${i}">${x[0]} ${x[1]}</button>`).join('')}</div>` : ''}`;
  body.querySelectorAll('[data-hd]').forEach(b => b.onclick = () => { UI.habDay = b.dataset.hd; renderView(); });
  wireHabSug(body);
  body.querySelectorAll('[data-hed]').forEach(b => b.onclick = e => { e.stopPropagation(); openHabitForm(S.habits.find(h => h.id === b.dataset.hed)); });
  body.querySelectorAll('[data-hmin]').forEach(b => b.onclick = e => { e.stopPropagation(); habUndo(S.habits.find(h => h.id === b.dataset.hmin), d); renderView(); });
  body.querySelectorAll('[data-hab]').forEach(r => r.onclick = () => { if (d > t) { toast('Ese día todavía no llega'); return; } const h = S.habits.find(x => x.id === r.dataset.hab); habTap(h, d); renderView(); });
}
function habReport(body) {
  UI.habRep = UI.habRep || 'semana'; UI.habRef = UI.habRef || todayISO();
  const t = todayISO(), ref = UI.habRef, rp = UI.habRep, r = parseISO(ref);
  let days, title;
  if (rp === 'semana') { days = weekDays(ref); const a = parseISO(days[0]), b = parseISO(days[6]); title = `${a.getDate()} ${MESES[a.getMonth()].slice(0, 3)} – ${b.getDate()} ${MESES[b.getMonth()].slice(0, 3)}`; }
  else if (rp === 'mes') { const n = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate(); days = [...Array(n)].map((_, i) => iso(new Date(r.getFullYear(), r.getMonth(), i + 1))); title = cap(MESES[r.getMonth()]) + ' ' + r.getFullYear(); }
  else { days = []; for (let x = iso(new Date(r.getFullYear(), 0, 1)); parseISO(x).getFullYear() === r.getFullYear(); x = addDays(x, 1)) days.push(x); title = String(r.getFullYear()); }
  const past = days.filter(x => x <= t);
  // estadísticas
  let due = 0, ok = 0; const perfect = [];
  past.forEach(x => { const hs = S.habits.filter(h => habDue(h, x)); hs.forEach(h => { due++; if (habDone(h, x)) ok++; }); if (hs.length && hs.every(h => habDone(h, x))) perfect.push(x); });
  let best = 0, run = 0; past.forEach(x => { if (perfect.includes(x)) { run++; best = Math.max(best, run); } else run = 0; });
  const pct = due ? Math.round(ok / due * 100) : 0;
  const cell = (h, x) => { if (!habDue(h, x)) return '<span class="hq rest"></span>'; const dn = habDone(h, x), part = !dn && habCount(h, x) > 0; return `<span class="hq ${dn ? 'on' : ''} ${x > t ? 'fut' : ''}" style="--hc:${h.color};--hl:${hexA(h.color, part ? .45 : .18)}" title="${fmtShort(x)}"></span>`; };
  let grid;
  if (rp === 'semana') {
    grid = `<table class="hgrid"><thead><tr><th></th>${days.map(x => `<th><span class="hwd">${DCORTO[parseISO(x).getDay()].slice(0, 1).toUpperCase()}</span></th>`).join('')}<th></th></tr></thead><tbody>
      ${S.habits.map(h => { const dd = days.filter(x => habDue(h, x) && x <= t), perf = dd.length && dd.length === days.filter(x => habDue(h, x)).length && dd.every(x => habDone(h, x)); return `<tr><td class="hname"><span>${h.icon}</span>${esc(h.name)}</td>${days.map(x => `<td>${cell(h, x)}</td>`).join('')}<td>${perf ? '<span class="hbadge" title="¡Perfecto!">🏅</span>' : ''}</td></tr>`; }).join('')}
      <tr class="hbest"><td class="hname">Día perfecto</td>${days.map(x => `<td>${perfect.includes(x) ? '🏵️' : ''}</td>`).join('')}<td>${perfect.length === 7 ? '👑' : ''}</td></tr></tbody></table>`;
  } else if (rp === 'mes') {
    grid = `<div class="hmonth">${S.habits.map(h => `<div class="hmrow"><div class="hname"><span>${h.icon}</span>${esc(h.name)}<small>${days.filter(x => habDone(h, x)).length} días</small></div><div class="hmcells">${days.map(x => cell(h, x)).join('')}</div></div>`).join('')}</div>`;
  } else {
    grid = `<div class="hmonth">${S.habits.map(h => `<div class="hmrow"><div class="hname"><span>${h.icon}</span>${esc(h.name)}<small>${days.filter(x => habDone(h, x)).length} días</small></div><div class="hyear">${MESES.map((m, i) => { const md = days.filter(x => parseISO(x).getMonth() === i && x <= t && habDue(h, x)), n = md.filter(x => habDone(h, x)).length, p = md.length ? n / md.length : 0; return `<span style="--hl:${hexA(h.color, md.length ? .12 + p * .88 : .06)}" title="${cap(m)}: ${n} días"><b>${m.slice(0, 1).toUpperCase()}</b></span>`; }).join('')}</div></div>`).join('')}</div>`;
  }
  body.innerHTML = `<div class="card habrep">
    <div class="seg hrseg">${[['semana', 'Semanal'], ['mes', 'Mensual'], ['año', 'Anual']].map(([k, n]) => `<button data-hr="${k}" class="${rp === k ? 'on' : ''}">${n}</button>`).join('')}</div>
    <div class="hrtitle"><span class="hrsun">☀️</span><h2>Mis hábitos</h2><span class="hrsun">🌙</span></div>
    <div class="hrnav"><button class="hrarr" id="hrP" aria-label="Anterior">‹</button><span class="hl" style="--hlbg:#fff27a">${title}</span><button class="hrarr" id="hrN" aria-label="Siguiente">›</button></div>
    ${grid}
    <div class="hstats"><div><b style="color:#ff4d5e">${pct}<small>%</small></b><span>Cumplido</span></div><div><b style="color:#4a90ff">${perfect.length}<small>d</small></b><span>Días perfectos</span></div><div><b style="color:#2bc48a">${ok}</b><span>Total hechos</span></div><div><b style="color:#ff9a3d">${best}<small>d</small></b><span>Mejor racha</span></div></div>
  </div>`;
  body.querySelectorAll('[data-hr]').forEach(b => b.onclick = () => { UI.habRep = b.dataset.hr; renderView(); });
  const mv = n => { const x = parseISO(UI.habRef); if (rp === 'semana') x.setDate(x.getDate() + 7 * n); else if (rp === 'mes') x.setMonth(x.getMonth() + n, 1); else x.setFullYear(x.getFullYear() + n, 0, 1); UI.habRef = iso(x); renderView(); };
  $('#hrP', body).onclick = () => mv(-1); $('#hrN', body).onclick = () => mv(1);
}
function openHabitForm(h) {
  const isNew = !h; h = h ? JSON.parse(JSON.stringify(h)) : {id: uid(), icon: '😊', name: '', goal: 1, unit: '', color: HL_PASTEL[S.habits.length % HL_PASTEL.length], days: [], log: {}, created: todayISO()};
  const s = openSheet({title: isNew ? 'Nuevo hábito' : 'Editar hábito', body: `
    <div class="fld"><label>Nombre</label><input class="inp" id="hName" value="${esc(h.name)}" placeholder="Ej.: Tomar agua" maxlength="40"></div>
    <div class="fld"><label>Ícono</label><div class="habicons">${HAB_ICONS.map(i => `<button type="button" data-hi="${i}" class="${h.icon === i ? 'on' : ''}">${i}</button>`).join('')}</div></div>
    <div class="fld"><label>Color</label><div class="habcols">${HL_PASTEL.map(c => `<button type="button" data-hc="${c}" class="${h.color === c ? 'on' : ''}" style="background:${c}" aria-label="Color"></button>`).join('')}</div></div>
    <div class="fld"><label>Tipo</label><div class="habkinds">${HAB_KINDS.map(([k, n]) => `<button type="button" data-hk="${k}" class="${habKind(h) === k ? 'on' : ''}">${n}</button>`).join('')}</div><small class="hint" id="hkHint"></small></div>
    <div class="fld hk-lectura"><small class="hint">📖 Lectura: sin límite por día. Cada día anotas cuántas páginas leíste y guardas tu 🔖 marcador.</small></div>
    <div class="fld hk-agua"><label>Meta de agua por día (en onzas)</label><div class="habgoal"><button type="button" class="btn sec sm" id="hbM">−</button><input class="inp rdnum" id="hbOz" readonly inputmode="none" data-wheel data-min="1" data-max="300" data-title="Meta de agua" data-unit="oz" value="${habKind(h) === 'agua' ? habGoal(h) : 64}"><button type="button" class="btn sec sm" id="hbP">+</button><span class="hint">oz</span></div><div class="rdquick">${[32, 48, 64, 80, 100].map(n => `<button type="button" data-goz="${n}">${n}</button>`).join('')}</div><small class="hint">Escribe la meta que quieras. Cada botella es de 8 oz.</small></div>
    <div class="fld hk-tiempo"><label>Meta de minutos por día</label><div class="habgoal"><button type="button" class="btn sec sm" id="htM">−</button><input class="inp rdnum" id="htV" readonly inputmode="none" data-wheel data-min="1" data-max="300" data-title="Minutos por día" data-unit="min" value="${habKind(h) === 'tiempo' ? habGoal(h) : 10}"><button type="button" class="btn sec sm" id="htP">+</button><span class="hint">min</span></div><small class="hint">Para meditar, caminar, orar, hacer ejercicio… Tiene cronómetro.</small></div>
    <div class="fld hk-actividad"><label>Metas por día</label><div class="habgoal"><button type="button" class="btn sec sm" id="haM">−</button><input class="inp rdnum" id="haV" readonly inputmode="none" data-wheel data-min="1" data-max="300" data-title="Minutos por día" data-unit="min" value="${isTimeKind(h) ? habGoal(h) : 30}"><button type="button" class="btn sec sm" id="haP">+</button><span class="hint">min</span></div>
      <div class="habgoal" style="margin-top:8px"><input class="inp rdnum" id="haD" readonly inputmode="none" data-wheel data-min="0" data-max="60" data-dec="1" data-title="Meta de distancia" data-blank="1" value="${+h.goalDist || ''}" placeholder="0"><div class="seg"><button type="button" data-hu="mi" class="${(h.unitD || 'mi') === 'mi' ? 'on' : ''}">millas</button><button type="button" data-hu="km" class="${h.unitD === 'km' ? 'on' : ''}">km</button></div></div>
      <small class="hint">Pon el tiempo, la distancia o las dos. Se cumple al llegar a cualquiera.</small></div>
    <div class="fld hk-"><label>Meta por día</label><div class="habgoal"><button type="button" class="btn sec sm" id="hgM">−</button><b id="hgV">${habGoal(h)}</b><button type="button" class="btn sec sm" id="hgP">+</button><input class="inp" id="hUnit" value="${esc(h.unit || '')}" placeholder="vasos, páginas, minutos…"></div><small class="hint">Con meta 1 se marca de un toque. Con más, cada toque suma uno.</small></div>
    <div class="fld"><label>Días</label><div class="habdays">${[0,1,2,3,4,5,6].map(i => `<button type="button" data-hdw="${i}" class="${!h.days.length || h.days.includes(i) ? 'on' : ''}">${DCORTO[i].slice(0, 1).toUpperCase()}</button>`).join('')}</div><small class="hint">Los días apagados son de descanso y no cuentan en contra.</small></div>`,
    foot: `${isNew ? '' : '<button type="button" class="pinround" id="hPin" aria-pressed="false"><i class="pdot"></i><span>Fijar</span></button><button class="btn sec" id="hDel" aria-label="Eliminar" title="Eliminar"><i class="xdel"></i></button>'}<button class="btn" id="hSave">Guardar</button>`,
    onMount: el => {
      const q = x => el.querySelector(x);
      const hp = q('#hPin');
      if (hp) { const isPinned = () => (pins().habs || []).includes(h.id), paint = () => { const on = isPinned(); hp.classList.toggle('on', on); hp.setAttribute('aria-pressed', on); hp.querySelector('span').textContent = on ? 'Fijado' : 'Fijar'; }; paint();
        hp.onclick = () => { const was = isPinned(), P = pins(); P.habs = (P.habs || []).filter(x => x !== h.id); if (!was) P.habs.push(h.id); save('meta'); paint(); toast(was ? 'Quitado de fijados' : 'Fijado en Mi Día'); }; }
      el.querySelectorAll('[data-hi]').forEach(b => b.onclick = () => { h.icon = b.dataset.hi; el.querySelectorAll('[data-hi]').forEach(x => x.classList.toggle('on', x === b)); });
      el.querySelectorAll('[data-hc]').forEach(b => b.onclick = () => { h.color = b.dataset.hc; el.querySelectorAll('[data-hc]').forEach(x => x.classList.toggle('on', x === b)); });
      q('#hName').addEventListener('input', () => { const nm = q('#hName').value; if (isNew && !kind) { if (/agua/i.test(nm)) { el.querySelector('[data-hk="agua"]').click(); } else if (/^(leer|lectura)/i.test(nm)) { el.querySelector('[data-hk="lectura"]').click(); } else if (/ahorr/i.test(nm)) { el.querySelector('[data-hk="ahorro"]').click(); } else if (/levant|despert|madrug/i.test(nm)) { el.querySelector('[data-hk="despertar"]').click(); } else if (/comer|comida|saludable|dieta/i.test(nm)) { el.querySelector('[data-hk="comida"]').click(); } else if (/^or(ar|aci)/i.test(nm)) { el.querySelector('[data-hk="oracion"]').click(); } else if (ACT_RE.test(nm)) { el.querySelector('[data-hk="actividad"]').click(); } else if (TIME_RE.test(nm)) { el.querySelector('[data-hk="tiempo"]').click(); } } });
      q('#hgM').onclick = () => { h.goal = Math.max(1, habGoal(h) - 1); q('#hgV').textContent = h.goal; };
      q('#hgP').onclick = () => { h.goal = Math.min(99, habGoal(h) + 1); q('#hgV').textContent = h.goal; };
      el.querySelectorAll('[data-hdw]').forEach(b => b.onclick = () => b.classList.toggle('on'));
      let kind = habKind(h);
      const showK = () => { el.querySelectorAll('[class*="hk-"]').forEach(x => { const ks = [...x.classList].filter(c => c.startsWith('hk-')).map(c => c.slice(3)); x.style.display = ks.includes(kind) || (kind === 'oracion' && ks.includes('tiempo')) ? '' : 'none'; }); el.querySelectorAll('[data-hk]').forEach(b => b.classList.toggle('on', b.dataset.hk === kind)); q('#hkHint').textContent = (HAB_KINDS.find(x => x[0] === kind) || [])[2] || ''; };
      el.querySelectorAll('[data-hk]').forEach(b => b.onclick = () => { kind = b.dataset.hk; const di = {ahorro: '💵', despertar: '☀️', comida: '🥗', oracion: '🙏'}[kind]; if (di && h.icon === '😊') { h.icon = di; el.querySelectorAll('[data-hi]').forEach(x => x.classList.toggle('on', x.dataset.hi === di)); } if (kind === 'agua' && h.icon === '😊') { h.icon = '💧'; el.querySelectorAll('[data-hi]').forEach(x => x.classList.toggle('on', x.dataset.hi === '💧')); } if (kind === 'actividad' && h.icon === '😊') { h.icon = '🚶'; el.querySelectorAll('[data-hi]').forEach(x => x.classList.toggle('on', x.dataset.hi === '🚶')); } if (kind === 'tiempo' && h.icon === '😊') { h.icon = '🧘'; el.querySelectorAll('[data-hi]').forEach(x => x.classList.toggle('on', x.dataset.hi === '🧘')); } if (kind === 'lectura' && h.icon === '😊') { h.icon = '📖'; el.querySelectorAll('[data-hi]').forEach(x => x.classList.toggle('on', x.dataset.hi === '📖')); } showK(); });
      const oz = () => Math.max(1, Math.min(400, parseInt(q('#hbOz').value, 10) || 64)), mn = () => Math.max(1, Math.min(600, parseInt(q('#htV').value, 10) || 10));
      q('#hbM').onclick = () => q('#hbOz').value = Math.max(1, oz() - 8); q('#hbP').onclick = () => q('#hbOz').value = oz() + 8;
      el.querySelectorAll('[data-goz]').forEach(b => b.onclick = () => q('#hbOz').value = b.dataset.goz);
      q('#htM').onclick = () => q('#htV').value = Math.max(1, mn() - 5); q('#htP').onclick = () => q('#htV').value = mn() + 5;
      let unitD = h.unitD || 'mi';
      el.querySelectorAll('[data-hu]').forEach(b => b.onclick = () => { unitD = b.dataset.hu; el.querySelectorAll('[data-hu]').forEach(x => x.classList.toggle('on', x === b)); });
      const am = () => Math.max(1, Math.min(600, parseInt(q('#haV').value, 10) || 30));
      q('#haM').onclick = () => q('#haV').value = Math.max(1, am() - 5); q('#haP').onclick = () => q('#haV').value = am() + 5;
      showK();
      q('#hSave').onclick = () => {
        h.name = q('#hName').value.trim(); if (!h.name) { toast('Escribe el nombre del hábito'); q('#hName').focus(); return; }
        h.unit = q('#hUnit').value.trim(); h.kind = kind; h.migW = 1;
        if (kind === 'agua') { h.goalOz = oz(); h.goal = Math.ceil(h.goalOz / OZ); h.unit = ''; }
        if (kind === 'tiempo' || kind === 'oracion') { h.goal = mn(); h.unit = ''; }
        if (kind === 'comida') { h.goal = h.goal > 1 && h.goal <= 12 ? h.goal : 5; h.unit = ''; }
        if (kind === 'despertar') { h.wakeAt = h.wakeAt || '06:00'; h.goal = 1; h.unit = ''; }
        if (kind === 'ahorro') { h.goal = 1; h.unit = ''; }
        if (kind === 'actividad') { h.goal = am(); h.goalDist = Math.max(0, parseFloat(q('#haD').value) || 0) || null; h.unitD = unitD; h.unit = ''; }
        if (kind === 'lectura') { h.unit = ''; }
        const on = [...el.querySelectorAll('[data-hdw].on')].map(b => +b.dataset.hdw); if (!on.length) { toast('Elige al menos un día'); return; }
        h.days = on.length === 7 ? [] : on;
        const k = S.habits.findIndex(x => x.id === h.id); if (k >= 0) S.habits[k] = h; else S.habits.push(h);
        save('habits'); s.close(); if (UI.view === 'habitos') renderView(); else go('habitos'); toast(isNew ? `${h.icon} Hábito creado` : 'Guardado');
      };
      const del = q('#hDel'); if (del) del.onclick = async () => { if (await ask(`¿Eliminar “${esc(h.name)}” y todo su historial?`, {yes: 'Eliminar'})) { S.habits = S.habits.filter(x => x.id !== h.id); save('habits'); s.close(); renderView(); } };
      if (isNew) setTimeout(() => q('#hName').focus(), 250);
    }});
}

function wireHabSug(root) { root.querySelectorAll('[data-sug]').forEach(b => b.onclick = () => { const x = HAB_SUG[+b.dataset.sug]; S.habits.push({id: uid(), icon: x[0], name: x[1], goal: x[2], unit: '', kind: HAB_KINDS.some(k => k[0] === x[3]) ? x[3] : '', migO: 1, wakeAt: x[3] === 'despertar' ? '06:00' : undefined, migA: 1, unitD: 'mi', goalOz: x[3] === 'agua' ? 64 : undefined, migW: 1, color: HL_PASTEL[S.habits.length % HL_PASTEL.length], days: [], log: {}, created: todayISO()}); save('habits'); toast(`${x[0]} ${x[1]} añadido`); renderView(); }); }

// Convierte los hábitos de agua y lectura creados antes (vasos / páginas con meta)
function migrateHabits() { let ch = false; (S.habits || []).forEach(h => {
  if (!h.migO) {
    const nm = h.name || '';
    if ((!h.kind || h.kind === 'tiempo') && /^or(ar|aci)/i.test(nm)) { if (!h.kind) { const l = {}; Object.keys(h.log || {}).forEach(d => { if (h.log[d] >= (+h.goal || 1)) l[d] = 10; }); h.log = l; h.goal = 10; } h.kind = 'oracion'; h.migO = h.migW = 1; ch = true; return; }
    if (!h.kind && /ahorr/i.test(nm)) { h.legacy = h.log; h.log = {}; h.kind = 'ahorro'; h.goal = 1; h.migO = h.migW = 1; ch = true; return; }
    if (!h.kind && /levant|despert|madrug/i.test(nm)) { h.kind = 'despertar'; h.wakeAt = '06:00'; h.woke = {}; Object.keys(h.log || {}).forEach(d => { if (h.log[d]) h.woke[d] = 'ok'; }); h.goal = 1; h.migO = h.migW = 1; ch = true; return; }
    if (!h.kind && /comer|comida|saludable/i.test(nm)) { const l = {}; Object.keys(h.log || {}).forEach(d => { if (h.log[d] >= (+h.goal || 1)) l[d] = 5; }); h.log = l; h.kind = 'comida'; h.goal = 5; h.migO = h.migW = 1; ch = true; return; }
    h.migO = 1;
  }
  if (!h.migA && ACT_RE.test(h.name || '') && (!h.kind || h.kind === 'tiempo')) { if (!h.kind) { const l = {}; Object.keys(h.log || {}).forEach(d => l[d] = h.log[d] >= (+h.goal || 1) ? 30 : 0); h.log = l; h.goal = 30; } h.kind = 'actividad'; h.migA = 1; h.migW = 1; h.unitD = h.unitD || 'mi'; h.unit = ''; ch = true; return; }
  if (!h.kind && !h.migW && (/agua/i.test(h.name || '') || h.icon === '💧')) { h.kind = 'agua'; h.migW = 1; h.goal = h.unit === 'vasos' ? Math.max(1, +h.goal || 8) : 8; if (h.unit === 'vasos') { const l = {}; Object.keys(h.log || {}).forEach(d => l[d] = h.log[d] * 8); h.log = l; } h.unit = ''; ch = true; return; }
  if (!h.kind && !h.migW && TIME_RE.test(h.name || '')) { h.kind = 'tiempo'; h.migW = 1; const def = /camin|ejerc|correr/i.test(h.name) ? 30 : 10; const l = {}; Object.keys(h.log || {}).forEach(d => l[d] = h.log[d] >= (+h.goal || 1) ? def : 0); h.log = l; h.goal = def; h.unit = ''; ch = true; return; }
  if (!h.kind && !h.migW && /^(leer|lectura)/i.test(h.name || '')) { h.kind = 'lectura'; h.migW = 1; h.goal = 1; h.unit = ''; ch = true; return; }
  if (!h.kind && h.name === 'Tomar agua' && h.unit === 'vasos') { h.kind = 'agua'; const l = {}; Object.keys(h.log || {}).forEach(d => l[d] = h.log[d] * 8); h.log = l; h.goal = Math.max(1, +h.goal || 8); h.unit = ''; ch = true; }
  if (!h.kind && h.name === 'Leer' && h.unit === 'páginas') { h.kind = 'lectura'; h.goal = 1; h.unit = ''; ch = true; }
}); if (ch) save('habits'); }

/* ===== Recordatorios de agua (editables) ===== */
const WATER_REM_DEF = [['08:00', 'Agua al despertar'], ['10:00', 'Media mañana'], ['12:00', 'Con el almuerzo'], ['15:00', 'Media tarde'], ['18:00', 'Antes de la cena'], ['20:00', 'Último vaso del día']];
function openWaterReminders(h) {
  let rem = JSON.parse(JSON.stringify(h.reminders || [])), on = h.remOn !== false;
  const s = openSheet({title: '⏰ Recordatorios de agua', body: '<div id="wrBody"></div>', foot: '<button class="btn" id="wrS">Guardar</button>',
    onMount: el => {
      const draw = () => {
        rem.sort((a, b) => a.time.localeCompare(b.time));
        el.querySelector('#wrBody').innerHTML = `
          <label class="wrsw"><span><b>Recordarme tomar agua</b><small>Te aviso a cada hora que pongas aquí.</small></span><input type="checkbox" id="wrOn" ${on ? 'checked' : ''}><i></i></label>
          <div class="wrlist ${on ? '' : 'off'}">${rem.length ? rem.map(r => `<div class="wrrow" data-wr="${r.id}"><input class="inp wrt" readonly inputmode="none" value="${fmtTime(r.time)}" data-wrt="${r.id}" data-t="${r.time}"><input class="inp wrl" value="${esc(r.label || '')}" placeholder="Mensaje" data-wrl="${r.id}" maxlength="40"><label class="mini-sw"><input type="checkbox" data-wro="${r.id}" ${r.on !== false ? 'checked' : ''}><i></i></label><button class="wrdel" data-wrd="${r.id}" aria-label="Eliminar">${'<i class="xdel"></i>'}</button></div>`).join('') : '<div class="hint" style="padding:8px 2px">No tienes recordatorios. Añade uno o usa el horario sugerido.</div>'}</div>
          <div class="wradd"><button class="btn sec" id="wrAdd">+ Añadir hora</button><button class="btn ghost" id="wrSug">Usar horario sugerido</button></div>
          ${window.NATIVE ? '<small class="hint">Te llegan aunque la app esté cerrada. Si ya cumpliste la meta del día, no te avisa.</small>' : '<small class="hint">En esta versión web el aviso sale mientras la app está abierta. En la app de Android te llega aunque esté cerrada.</small>'}`;
        const sync = () => { el.querySelectorAll('[data-wrt]').forEach(i => { const r = rem.find(x => x.id === i.dataset.wrt); if (r && i.dataset.t) r.time = i.dataset.t; }); el.querySelectorAll('[data-wrl]').forEach(i => { const r = rem.find(x => x.id === i.dataset.wrl); if (r) r.label = i.value.trim(); }); el.querySelectorAll('[data-wro]').forEach(i => { const r = rem.find(x => x.id === i.dataset.wro); if (r) r.on = i.checked; }); on = el.querySelector('#wrOn').checked; };
        el.querySelectorAll('[data-wrt]').forEach(i => i.onclick = async () => { const t = await pickTime(i.dataset.t, {title: 'Hora del recordatorio'}); if (t) { i.dataset.t = t; i.value = fmtTime(t); } });
        el.querySelector('#wrOn').onchange = () => { sync(); draw(); };
        el.querySelectorAll('[data-wrd]').forEach(b => b.onclick = () => { sync(); rem = rem.filter(x => x.id !== b.dataset.wrd); draw(); });
        el.querySelector('#wrAdd').onclick = () => { sync(); const last = rem.length ? rem[rem.length - 1].time : '07:00'; const [hh, mm] = last.split(':').map(Number); rem.push({id: uid(), time: `${String(Math.min(23, hh + 2)).padStart(2, '0')}:${String(mm).padStart(2, '0')}`, label: 'Hora de tomar agua', on: true}); on = true; draw(); };
        el.querySelector('#wrSug').onclick = () => { sync(); WATER_REM_DEF.forEach(([t, l]) => { if (!rem.some(r => r.time === t)) rem.push({id: uid(), time: t, label: l, on: true}); }); on = true; draw(); };
        el.sync = sync;
      };
      draw();
      el.querySelector('#wrS').onclick = async () => {
        el.sync(); h.reminders = rem; h.remOn = on; save('habits'); s.close();
        if (on && rem.some(r => r.on !== false)) {
          if (window.NATIVE) { await NATIVE.ensurePermission(); NATIVE.reschedule(); }
          else if ('Notification' in window && Notification.permission === 'default') { try { await Notification.requestPermission(); S.settings.notif = Notification.permission === 'granted'; save('meta'); } catch (e) {} }
          toast(`⏰ ${rem.filter(r => r.on !== false).length} recordatorios de agua listos`);
        } else toast('Recordatorios de agua apagados');
        if (UI.view === 'habitos' && !sheets.length) renderView();
      };
    }});
}
// Próximos avisos de agua (para la web y para Android)
function waterReminderList(days = 3) {
  const out = [], now = Date.now();
  (S.habits || []).forEach(h => {
    if (!['agua', 'despertar'].includes(habKind(h)) || h.remOn === false) return;
    for (let k = 0; k < days; k++) {
      const d = addDays(todayISO(), k); if (!habDue(h, d)) continue;
      (h.reminders || []).forEach(r => {
        if (r.on === false || !r.time) return;
        const [hh, mm] = r.time.split(':').map(Number), dt = parseISO(d); dt.setHours(hh, mm, 0, 0);
        if (habKind(h) === 'despertar') { out.push({at: dt.getTime(), d, h, r, kind: 'hd', id: h.id, title: r.label || '☀️ ¡Buenos días!', body: r.bed ? `Para dormir 8 horas y levantarte a las ${fmtTime(h.wakeAt || '06:00')}` : 'Toca para anotar que te levantaste a tiempo'}); return; }
        out.push({at: dt.getTime(), d, h, r, kind: 'h', id: h.id, title: '💧 ' + (r.label || 'Hora de tomar agua'), body: k === 0 ? `Llevas ${habCount(h, d)} de ${habGoal(h)} oz hoy. ¡Toca para anotar!` : `Meta: ${habGoal(h)} oz (${habGoal(h) / OZ} botellas)`});
      });
    }
  });
  return out.filter(x => !(x.d === todayISO() && habDone(x.h, x.d) && !(x.r && x.r.bed)) && x.at > now - 6 * 3600000);
}

const TIME_RE = /^(meditar|caminar|orar|hacer ejercicio|ejercicio|correr|estirar|yoga|respirar)/i;
/* ===== Agua: botella que se sube deslizando ===== */
function bigBottle(oz) {
  const lvl = Math.max(0, Math.min(1, oz / OZ)), y = 262 - 214 * lvl;
  return `<svg class="bigbot" viewBox="0 0 200 280" aria-hidden="true"><defs>
    <clipPath id="bbClip"><path d="M72 40h56v22c26 10 40 26 40 52v128a24 24 0 0 1-24 24H56a24 24 0 0 1-24-24V114c0-26 14-42 40-52z"/></clipPath>
    <linearGradient id="bbW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fa2ff"/><stop offset="1" stop-color="#1565ff"/></linearGradient></defs>
    <rect x="66" y="8" width="68" height="30" rx="8" fill="#2f7de1"/><rect x="66" y="22" width="68" height="4" fill="#5aa8ff"/>
    <g clip-path="url(#bbClip)"><rect width="200" height="280" fill="#e6efff"/>
      <g class="bbwater" style="transform:translateY(${y}px)"><path class="wv2" fill="#8cc4ff" d="M-200 10 q25 -12 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 V300 H-200z"/><path class="wv1" fill="url(#bbW)" d="M-200 14 q25 10 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 V300 H-200z"/>
        <circle class="bub b1" cx="80" cy="120" r="4" fill="#fff" opacity=".35"/><circle class="bub b2" cx="120" cy="160" r="3" fill="#fff" opacity=".35"/><circle class="bub b3" cx="100" cy="200" r="5" fill="#fff" opacity=".3"/></g>
      ${[1,2,3,4,5,6,7].map(i => `<g><line x1="36" x2="50" y1="${262 - 26.75 * i}" y2="${262 - 26.75 * i}" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><text x="54" y="${266 - 26.75 * i}" font-size="11" fill="#fff" fill-opacity=".85">${i}</text></g>`).join('')}</g>
    <path d="M72 40h56v22c26 10 40 26 40 52v128a24 24 0 0 1-24 24H56a24 24 0 0 1-24-24V114c0-26 14-42 40-52z" fill="none" stroke="#9cc6ff" stroke-width="3"/>
    <path d="M48 120v110" stroke="#fff" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/></svg>`;
}
function openWater(h, d, host) {
  let just = false, empty = false;
  const draw = el => {
    const c = habCount(h, d), g = habGoal(h), gb = habBottles(h), nb = Math.floor(c / OZ);
    const cur = just ? OZ : c % OZ, base = c - cur; // al llenar una botella se ve llena un momento y pasa sola a la botella siguiente
    const nr = (h.reminders || []).filter(r => r.on !== false).length;
    const hy = oz => 262 - 214 * (oz / OZ);
    el.querySelector('#wBody').innerHTML = `
      <div class="wtop"><span>${d === todayISO() ? 'Hoy' : cap(fmtLong(d))}</span><b>${c} oz</b></div><div class="wgoalrow"><button class="wgoal" id="wGoal">Meta del día: <b>${g} oz</b> <span>Cambiar ✎</span></button></div>
      <div class="wnum"><b id="wN">${cur}</b><span>oz</span></div><div class="wbot" id="wBot">${bigBottle(cur)}
        <div class="whandle" id="wH" style="top:${Math.max(72, hy(cur))}px" role="slider" aria-label="Onzas en la botella" aria-valuemin="0" aria-valuemax="${OZ}" aria-valuenow="${cur}" tabindex="0"><svg viewBox="0 0 24 24"><path d="M12 5l6 6H6zM12 19l-6-6h12z" fill="#fff"/></svg></div></div>
      <div class="wtip">Desliza el botón verde para subir o bajar el agua</div>
      <div class="wbottles">${[...Array(Math.max(gb, nb))].map((_, i) => `<span class="${i < nb ? 'on' : ''} ${just && i === nb - 1 ? 'pop' : ''}">${bottleSVG({id: 'w' + i, goal: 99}, i < nb ? OZ : 0)}</span>`).join('')}</div>
      <div class="wmsg">${c >= g ? '🎉 ¡Meta del día cumplida!' : `${nb} de ${gb} botellas · faltan ${g - c} oz`}</div>
      <div class="wacts"><button class="wsmall wminus" id="wMinus" ${c ? '' : 'disabled'} aria-label="Quitar 1 onza">−1<small>oz</small></button><button class="wdrink" id="wDrink">+ BEBER <small>1 oz</small></button><button class="wsmall" id="wRem" aria-label="Recordatorios">⏰${nr ? `<i>${nr}</i>` : ''}</button></div>`;
    let emptyNext = false;
    const commit = total => {
      const before = habCount(h, d); h.log = h.log || {}; if (total > 0) h.log[d] = total; else delete h.log[d]; save('habits');
      const filled = total > before && Math.floor(total / OZ) > Math.floor(before / OZ);
      just = filled; empty = emptyNext; emptyNext = false;
      if (filled) { toast(`💧 ¡Botella ${Math.floor(total / OZ)} llena!`); if (total >= g && before < g) setTimeout(() => toast('🎉 ¡Meta de agua cumplida!'), 400); if (navigator.vibrate) try { navigator.vibrate(25); } catch (e) {} }
      draw(el);
      if (filled) setTimeout(() => { just = false; if (el.isConnected) draw(el); }, 1200); else just = false;
    };
    // deslizar
    const bot = el.querySelector('#wBot'), H = el.querySelector('#wH'), N = el.querySelector('#wN'), W = bot.querySelector('.bbwater');
    let drag = false, val = cur;
    const at = e => { const r = bot.getBoundingClientRect(), y = (e.clientY - r.top) * (280 / r.height); return Math.max(0, Math.min(OZ, Math.round((262 - y) / 214 * OZ))); };
    const show = v => { val = v; N.textContent = v; H.style.top = Math.max(72, hy(v)) + 'px'; W.style.transform = `translateY(${hy(v)}px)`; H.setAttribute('aria-valuenow', v); };
    bot.addEventListener('pointerdown', e => { if (d > todayISO()) { toast('Ese día todavía no llega'); return; } drag = true; bot.setPointerCapture(e.pointerId); bot.classList.add('drag'); show(at(e)); e.preventDefault(); });
    bot.addEventListener('pointermove', e => { if (drag) { const v = at(e); if (v !== val && navigator.vibrate) try { navigator.vibrate(5); } catch (x) {} show(v); } });
    const up = () => { if (!drag) return; drag = false; bot.classList.remove('drag'); if (val !== cur) { emptyNext = val === 0; commit(base + val); } };
    bot.addEventListener('pointerup', up); bot.addEventListener('pointercancel', up);
    H.onkeydown = e => { if (e.key === 'ArrowUp') commit(base + Math.min(OZ, cur + 1)); if (e.key === 'ArrowDown') commit(base + Math.max(0, cur - 1)); };
    el.querySelector('#wDrink').onclick = () => { if (d > todayISO()) { toast('Ese día todavía no llega'); return; } commit(habCount(h, d) + 1); };
    el.querySelector('#wMinus').onclick = () => { const c2 = habCount(h, d); if (c2) commit(c2 - 1); };
    el.querySelector('#wRem').onclick = () => openWaterReminders(h);
    el.querySelector('#wGoal').onclick = () => openWaterGoal(h, () => draw(el));
  };
  hostOrSheet(host, {title: `💧 ${esc(h.name)}`, cls: 'watersheet', body: '<div id="wBody"></div>', onMount: draw, onClose: () => { if (UI.view === 'habitos') renderView(); }});
}
function openWaterGoal(h, done) {
  const s = openSheet({title: '🎯 Meta de agua', body: `<div class="fld"><label>¿Cuántas onzas quieres tomar al día?</label><div class="habgoal"><button type="button" class="btn sec" id="gM">−</button><input class="inp rdnum" id="gV" readonly inputmode="none" data-wheel data-min="1" data-max="300" data-title="Meta de agua" data-unit="oz" value="${habGoal(h)}"><button type="button" class="btn sec" id="gP">+</button><span class="hint">oz</span></div>
    <div class="rdquick">${[32, 48, 64, 80, 100].map(n => `<button type="button" data-goz="${n}">${n}</button>`).join('')}</div><small class="hint" id="gB"></small></div>`,
    foot: '<button class="btn" id="gS">Guardar meta</button>',
    onMount: el => {
      const q = x => el.querySelector(x), v = () => Math.max(1, Math.min(400, parseInt(q('#gV').value, 10) || 64));
      const hint = () => q('#gB').textContent = `Son ${Math.ceil(v() / OZ)} botellas de ${OZ} oz.`; hint();
      q('#gV').oninput = hint; q('#gM').onclick = () => { q('#gV').value = Math.max(1, v() - 8); hint(); }; q('#gP').onclick = () => { q('#gV').value = v() + 8; hint(); };
      el.querySelectorAll('[data-goz]').forEach(b => b.onclick = () => { q('#gV').value = b.dataset.goz; hint(); });
      q('#gS').onclick = () => { h.goalOz = v(); h.goal = Math.ceil(h.goalOz / OZ); save('habits'); s.close(); toast(`🎯 Meta: ${h.goalOz} oz al día`); done && done(); };
    }});
}
/* ===== Lectura: un libro con páginas, marcador y notas ===== */
function openBook(h, d, host) {
  h.notes = h.notes || []; let keepFn = null;
  const draw = el => {
    const c = habCount(h, d), tot = +h.bookPages || 0, bm = +h.bookmark || 0, pct = tot && bm ? Math.min(100, Math.round(bm / tot * 100)) : 0;
    el.querySelector('#bkBody').innerHTML = `
      <div class="book">
        <div class="bpage left">
          <div id="bkRib">${bm ? `<div class="ribbon" title="Marcador"><span>${bm}</span></div>` : ''}</div>
          <input class="bktitle" id="bkT" value="${esc(h.book || '')}" placeholder="Título del libro" maxlength="60">
          <div class="bkline"><span>Me quedé en la página</span></div>
          <div class="bkmark"><button class="bkb" id="bmM" aria-label="Página anterior">‹</button><input class="bknum" id="bkB" readonly inputmode="none" data-wheel data-min="0" data-max="3000" data-title="Me quedé en la página" data-blank="1" value="${bm || ''}" placeholder="—"><button class="bkb" id="bmP" aria-label="Página siguiente">›</button></div>
          <div class="bkline"><span>de</span><input class="bktot" id="bkTot" readonly inputmode="none" data-wheel data-min="0" data-max="3000" data-title="Páginas del libro" data-blank="1" value="${tot || ''}" placeholder="¿?"><span>páginas</span></div>
          <div id="bkPr">${tot ? `<div class="bkprog"><i style="width:${pct}%"></i></div><div class="bkpct">${pct >= 100 ? '🎉 ¡Terminado!' : pct + '% del libro'}</div>` : ''}</div>
        </div>
        <div class="bpage right">
          <div class="bkline"><span>${d === todayISO() ? 'Hoy leí' : 'Ese día leí'}</span></div>
          <div class="bktoday"><b id="bkC">${c}</b><span>páginas</span></div>
          <div class="bkq">${[1, 5, 10, 20].map(n => `<button data-bq="${n}">+${n}</button>`).join('')}</div>
          <button class="bkminus" id="bkM" ${c ? '' : 'disabled'}>−1</button>
          <div class="bkall">Total leído: <b>${habPages(h)}</b></div>
        </div>
      </div>
      <div class="bknotes"><div class="bknh"><b>📝 Notas del libro</b><span>${h.notes.length}</span></div>
        <div class="bknadd"><input class="inp bknp" id="bnP" readonly inputmode="none" data-wheel data-min="0" data-max="3000" data-title="Página de la nota" data-blank="1" placeholder="Pág." value="${bm || ''}"><input class="inp" id="bnT" placeholder="Escribe una idea, frase o pensamiento…" maxlength="300"><button class="btn" id="bnA" aria-label="Añadir nota">+</button></div>
        ${h.notes.slice().reverse().map(n => `<div class="bknote"><span class="bkpg">${n.page ? 'pág. ' + n.page : '—'}</span><p>${esc(n.text)}</p><button class="wrdel" data-bnd="${n.id}" aria-label="Eliminar nota"><i class="xdel"></i></button></div>`).join('') || '<div class="hint" style="padding:6px 2px">Aún no hay notas. Guarda aquí lo que te gustó del libro.</div>'}
      </div>
      <div class="bkfoot"><button class="btn ghost" id="bkNew">📚 Empezar otro libro</button>${(h.shelf || []).length ? `<button class="btn ghost" id="bkShelf">Mis libros (${h.shelf.length})</button>` : ''}</div>`;
    const q = x => el.querySelector(x);
    const keep = () => { if (!q('#bkT')) return; h.book = q('#bkT').value.trim(); const b = parseInt(q('#bkB').value, 10); h.bookmark = b > 0 ? b : null; const t = parseInt(q('#bkTot').value, 10); h.bookPages = t > 0 ? t : null; save('habits'); };
    keepFn = keep;
    const addPages = n => { if (d > todayISO()) { toast('Ese día todavía no llega'); return; } keep(); const before = habCount(h, d); h.log = h.log || {}; const v = Math.max(0, before + n); if (v) h.log[d] = v; else delete h.log[d]; if (h.bookmark || n > 0) h.bookmark = Math.max(1, (h.bookmark || 0) + n); save('habits'); if (!before && v) toast(`📖 ¡${v} páginas! Sigue así`); draw(el); };
    el.querySelectorAll('[data-bq]').forEach(b => b.onclick = () => addPages(+b.dataset.bq));
    q('#bkM').onclick = () => addPages(-1);
    q('#bmM').onclick = () => { keep(); h.bookmark = Math.max(1, (h.bookmark || 1) - 1); save('habits'); draw(el); };
    q('#bmP').onclick = () => { keep(); h.bookmark = (h.bookmark || 0) + 1; save('habits'); draw(el); };
    const bits = () => { const tot = +h.bookPages || 0, bm = +h.bookmark || 0, pct = tot && bm ? Math.min(100, Math.round(bm / tot * 100)) : 0;
      q('#bkRib').innerHTML = bm ? `<div class="ribbon" title="Marcador"><span>${bm}</span></div>` : '';
      q('#bkPr').innerHTML = tot ? `<div class="bkprog"><i style="width:${pct}%"></i></div><div class="bkpct">${pct >= 100 ? '🎉 ¡Terminado!' : pct + '% del libro'}</div>` : ''; };
    ['#bkT', '#bkB', '#bkTot'].forEach(x => q(x).addEventListener('input', () => { keep(); bits(); }));
    q('#bnA').onclick = () => { const t = q('#bnT').value.trim(); if (!t) { q('#bnT').focus(); return; } keep(); h.notes.push({id: uid(), page: parseInt(q('#bnP').value, 10) || null, text: t, date: todayISO()}); save('habits'); toast('📝 Nota guardada'); draw(el); };
    q('#bnT').onkeydown = e => { if (e.key === 'Enter') q('#bnA').click(); };
    el.querySelectorAll('[data-bnd]').forEach(b => b.onclick = async () => { if (await ask('¿Eliminar esta nota?', {yes: 'Eliminar'})) { h.notes = h.notes.filter(n => n.id !== b.dataset.bnd); save('habits'); draw(el); } });
    q('#bkNew').onclick = async () => { keep(); if (!(await ask(`¿Empezar otro libro? “${esc(h.book || 'Este libro')}” y sus notas se guardan en “Mis libros”.`, {yes: 'Empezar otro'}))) return;
      h.shelf = h.shelf || []; if (h.book || h.notes.length) h.shelf.push({id: uid(), book: h.book || 'Sin título', pages: h.bookPages, bookmark: h.bookmark, notes: h.notes, ended: todayISO()});
      h.book = ''; h.bookmark = null; h.bookPages = null; h.notes = []; save('habits'); draw(el); setTimeout(() => { const t = q('#bkT'); t && t.focus(); }, 100); };
    const sh = q('#bkShelf'); if (sh) sh.onclick = () => openSheet({title: '📚 Mis libros', body: h.shelf.slice().reverse().map(b => `<div class="card shelfbk"><b>📕 ${esc(b.book)}</b><small>${b.bookmark ? `Llegaste a la pág. ${b.bookmark}${b.pages ? ' de ' + b.pages : ''} · ` : ''}${fmtShort(b.ended)}</small>${(b.notes || []).map(n => `<div class="bknote"><span class="bkpg">${n.page ? 'pág. ' + n.page : '—'}</span><p>${esc(n.text)}</p></div>`).join('')}</div>`).join('')});
  };
  hostOrSheet(host, {title: `${h.icon} ${esc(h.name)}`, cls: 'booksheet', body: '<div id="bkBody"></div>', onMount: draw, onClose: () => { keepFn && keepFn(); if (UI.view === 'habitos') renderView(); }});
}
/* ===== Tiempo: aro con cronómetro (meditar, caminar, orar…) ===== */
function openTimer(h, d, host) {
  let tick = null; const act = habKind(h) === 'actividad';
  const ring = el => {
    const c = habCount(h, d), g = habGoal(h), run = UI.habTimer && UI.habTimer.id === h.id;
    const extra = run ? (Date.now() - UI.habTimer.start) / 60000 : 0, shown = c + extra, p = Math.min(1, shown / g), R = 92, L = 2 * Math.PI * R;
    const secs = run ? Math.floor((Date.now() - UI.habTimer.start) / 1000) : 0;
    el.querySelector('#tmRing').innerHTML = `<div class="tmring ${run ? 'run' : ''}"><svg viewBox="0 0 220 220"><circle cx="110" cy="110" r="${R}" fill="none" stroke="${hexA(h.color, .2)}" stroke-width="16"/><circle cx="110" cy="110" r="${R}" fill="none" stroke="${h.color}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="${L * (1 - p)}" transform="rotate(-90 110 110)" style="transition:stroke-dashoffset .5s"/></svg>
        <div class="tmin"><span class="tmic">${act && actMode(h, d) === 'correr' ? '🏃' : h.icon}</span><b>${Math.floor(shown)}</b><span>de ${g} min</span>${run ? `<em>⏱ ${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}</em>` : ''}</div></div>
      <div class="wmsg">${habDone(h, d) || shown >= g ? '🎉 ¡Meta del día cumplida!' : `Faltan ${Math.ceil(g - shown)} min`}</div>`;
    const go = el.querySelector('#tmGo'); if (go) go.textContent = run ? '⏸ PARAR' : '▶ EMPEZAR';
  };
  const draw = el => {
    const u = h.unitD || 'mi', ds = actDist(h, d), md = actMode(h, d);
    el.querySelector('#tmBody').innerHTML = `
      ${act ? `<div class="seg acmode">${[['caminar', '🚶 Caminar'], ['correr', '🏃 Correr']].map(([k, n]) => `<button data-am="${k}" class="${md === k ? 'on' : ''}">${n}</button>`).join('')}</div>` : ''}
      <div id="tmRing"></div>
      <div class="bkq tmq"><button data-tq="-5">−5</button><button data-tq="5">+5</button><button data-tq="10">+10</button><button data-tq="15">+15</button></div>
      ${act ? `<div class="accard">
        <div class="acrow"><span>📏 Distancia hoy</span><div class="acdist"><button data-dq="-0.1">−</button><input id="acD" readonly inputmode="none" data-wheel data-min="0" data-max="60" data-dec="1" data-unit="${u}" data-title="Distancia de hoy" data-blank="1" value="${ds ? fmtD(ds) : ''}" placeholder="0"><span>${u}</span><button data-dq="0.1">+</button></div></div>
        <div class="acrow"><span>👣 Pasos hoy</span><div class="acdist"><button data-pq="-500">−</button><input id="acP" readonly inputmode="none" data-wheel data-min="0" data-max="100000" data-title="Pasos de hoy" data-unit="pasos" data-blank="1" value="${actSteps(h, d) || ''}" placeholder="0"><span>pasos</span><button data-pq="500">+</button></div></div>
        <div class="acstats" id="acS"></div>
        <button class="acgoal" id="acG">Meta: <b>${habGoal(h)} min</b>${+h.goalDist ? ` · <b>${fmtD(h.goalDist)} ${u}</b>` : ''}${+h.goalSteps ? ` · <b>${fmtPasos(h.goalSteps)} pasos</b>` : ''} <span>Cambiar ✎</span></button>
      </div>` : `<button class="acgoal" id="acG">Meta: <b>${habGoal(h)} min</b> <span>Cambiar ✎</span></button>`}
      ${habKind(h) === 'oracion' ? prayerHTML(h) : ''}
      <div class="wacts"><button class="wdrink tmgo" id="tmGo" style="--g1:${h.color}">▶ EMPEZAR</button></div>`;
    ring(el); if (act) stats(el);
    const q = x => el.querySelector(x), g = habGoal(h);
    const setMin = v => { const before = habCount(h, d); v = Math.max(0, v); h.log = h.log || {}; if (v) h.log[d] = v; else delete h.log[d]; save('habits'); if (habDone(h, d) && before < g && v >= g) toast(`${h.icon} ¡${h.name} listo!`); };
    el.querySelectorAll('[data-tq]').forEach(b => b.onclick = () => { if (d > todayISO()) { toast('Ese día todavía no llega'); return; } setMin(habCount(h, d) + +b.dataset.tq); draw(el); });
    q('#tmGo').onclick = () => {
      if (d > todayISO()) { toast('Ese día todavía no llega'); return; }
      const run = UI.habTimer && UI.habTimer.id === h.id;
      if (run) { const m = Math.round((Date.now() - UI.habTimer.start) / 60000); UI.habTimer = null; if (m > 0) { setMin(habCount(h, d) + m); toast(`${h.icon} +${m} min`); } else toast('Menos de un minuto: no se anotó'); draw(el); }
      else { UI.habTimer = {id: h.id, start: Date.now(), d}; ring(el); }
    };
    q('#acG').onclick = () => openActGoal(h, () => draw(el));
    if (habKind(h) === 'oracion') wirePrayer(el, h, () => draw(el));
    if (act) {
      const setD = v => { if (d > todayISO()) { toast('Ese día todavía no llega'); return; } const was = habDone(h, d); h.dist = h.dist || {}; v = Math.max(0, Math.round(v * 100) / 100); if (v) h.dist[d] = v; else delete h.dist[d]; save('habits'); if (!was && habDone(h, d)) toast(`${h.icon} ¡Meta de distancia cumplida!`); };
      el.querySelectorAll('[data-dq]').forEach(b => b.onclick = () => { setD(actDist(h, d) + +b.dataset.dq); draw(el); });
      const setP = v => { if (d > todayISO()) { toast('Ese día todavía no llega'); return; } const was = habDone(h, d); v = Math.max(0, Math.round(v)); h.steps = h.steps || {}; if (v) h.steps[d] = v; else delete h.steps[d]; save('habits'); if (!was && habDone(h, d)) toast(`${h.icon} ¡Meta de pasos cumplida!`); };
      el.querySelectorAll('[data-pq]').forEach(b => b.onclick = () => { setP(actSteps(h, d) + +b.dataset.pq); draw(el); });
      q('#acP').addEventListener('input', () => { setP(parseInt(q('#acP').value, 10) || 0); stats(el); ring(el); });
      q('#acD').addEventListener('input', () => { setD(parseFloat(q('#acD').value) || 0); stats(el); ring(el); });
      el.querySelectorAll('[data-am]').forEach(b => b.onclick = () => { h.modeLog = h.modeLog || {}; h.modeLog[d] = b.dataset.am; h.mode = b.dataset.am; save('habits'); draw(el); });
    }
  };
  const stats = el => {
    const box = el.querySelector('#acS'); if (!box) return;
    const cal = actCalories(h, d), m = habCount(h, d), ds = actDist(h, d), u = h.unitD || 'mi', pace = m && ds ? m / ds : 0;
    box.innerHTML = `<div><b>🔥 ${cal ? '~' + cal : '0'}</b><span>calorías aprox.</span></div><div><b>${pace ? `${Math.floor(pace)}:${String(Math.round((pace % 1) * 60)).padStart(2, '0')}` : '—'}</b><span>min por ${u}</span></div><div><b>${m && ds ? fmtD(ds / (m / 60)) : '—'}</b><span>${u}/hora</span></div>
      <button class="acw" id="acW">${S.settings.pesoLb ? `Calculado con tu peso: ${S.settings.pesoLb} lb ✎` : 'Calculado con 160 lb. Pon tu peso para más exactitud ✎'}</button>`;
    box.querySelector('#acW').onclick = () => {
      const w = openSheet({title: '⚖️ Tu peso', body: `<div class="fld"><label>Peso en libras</label><input class="inp rdnum" id="pwV" readonly inputmode="none" data-wheel data-min="60" data-max="500" data-title="Tu peso" data-unit="lb" data-def="160" value="${S.settings.pesoLb || ''}" placeholder="160" style="max-width:none"><small class="hint">Solo se usa para calcular las calorías aproximadas. Se queda en tu app.</small></div>`, foot: '<button class="btn" id="pwS">Guardar</button>',
        onMount: e2 => { e2.querySelector('#pwS').onclick = () => { const n = parseFloat(e2.querySelector('#pwV').value); S.settings.pesoLb = n > 50 && n < 700 ? Math.round(n) : null; save('meta'); w.close(); stats(el); toast(S.settings.pesoLb ? `⚖️ ${S.settings.pesoLb} lb guardado` : 'Se usará 160 lb'); }; }});
    };
  };
  hostOrSheet(host, {pin: 'hab:' + h.id, title: `${h.icon} ${esc(h.name)}`, cls: 'timersheet', body: '<div id="tmBody"></div>', onMount: el => { draw(el); tick = setInterval(() => { if (!el.isConnected) { clearInterval(tick); return; } if (UI.habTimer && UI.habTimer.id === h.id) ring(el); }, 1000); }, onClose: () => { clearInterval(tick); if (UI.view === 'habitos') renderView(); }});
}
function openActGoal(h, done) {
  const act = habKind(h) === 'actividad', u0 = h.unitD || 'mi';
  const s = openSheet({title: '🎯 Mi meta diaria', body: `
    <div class="fld"><label>Tiempo (minutos)</label><div class="habgoal"><button type="button" class="btn sec" id="gaM">−</button><input class="inp rdnum" id="gaV" readonly inputmode="none" data-wheel data-min="1" data-max="300" data-title="Minutos por día" data-unit="min" value="${habGoal(h)}"><button type="button" class="btn sec" id="gaP">+</button><span class="hint">min</span></div>
      <div class="rdquick">${[10, 20, 30, 45, 60].map(n => `<button type="button" data-gm="${n}">${n}</button>`).join('')}</div></div>
    ${act ? `<div class="fld"><label>Pasos</label><div class="habgoal"><input class="inp rdnum" id="gaP" readonly inputmode="none" data-wheel data-min="0" data-max="100000" data-title="Meta de pasos" data-unit="pasos" data-blank="1" value="${+h.goalSteps || ''}" placeholder="0"><span class="hint">pasos</span></div>
<small class="hint">Déjalo en blanco si no quieres meta de pasos. Los pasos los anotas tú cada día.</small></div>` : ''}
    ${act ? `<div class="fld"><label>Distancia</label><div class="habgoal"><input class="inp rdnum" id="gaD" readonly inputmode="none" data-wheel data-min="0" data-max="60" data-dec="1" data-title="Meta de distancia" data-blank="1" value="${+h.goalDist || ''}" placeholder="0"><div class="seg"><button type="button" data-gu="mi" class="${u0 === 'mi' ? 'on' : ''}">millas</button><button type="button" data-gu="km" class="${u0 === 'km' ? 'on' : ''}">km</button></div></div>
<small class="hint">Déjalo en blanco si solo quieres meta de tiempo. La meta se cumple al llegar al tiempo o a la distancia.</small></div>` : ''}`,
    foot: '<button class="btn" id="gaS">Guardar meta</button>',
    onMount: el => {
      const q = x => el.querySelector(x), v = () => Math.max(1, Math.min(600, parseInt(q('#gaV').value, 10) || 30)); let u = u0;
      q('#gaM').onclick = () => q('#gaV').value = Math.max(1, v() - 5); q('#gaP').onclick = () => q('#gaV').value = v() + 5;
      el.querySelectorAll('[data-gm]').forEach(b => b.onclick = () => q('#gaV').value = b.dataset.gm);
      el.querySelectorAll('[data-gd]').forEach(b => b.onclick = () => q('#gaD').value = b.dataset.gd);
      el.querySelectorAll('[data-gu]').forEach(b => b.onclick = () => { u = b.dataset.gu; el.querySelectorAll('[data-gu]').forEach(x => x.classList.toggle('on', x === b)); });
      q('#gaS').onclick = () => { h.goal = v(); if (act) { h.goalSteps = Math.max(0, parseInt(q('#gaP').value, 10) || 0) || null; h.goalDist = Math.max(0, parseFloat(q('#gaD').value) || 0) || null; if (u !== u0) { const f = u === 'km' ? 1.609344 : 1 / 1.609344; h.dist = Object.fromEntries(Object.entries(h.dist || {}).map(([k, x]) => [k, Math.round(x * f * 100) / 100])); } h.unitD = u; } save('habits'); s.close(); toast('🎯 Meta guardada'); done && done(); };
    }});
}
const ACT_RE = /^(caminar|correr|trotar|caminata|corrida)/i;
const fmtD = x => { x = +x || 0; return Number.isInteger(x) ? String(x) : x.toFixed(2).replace(/0$/, ''); };
const actDist = (h, d) => +((h.dist || {})[d]) || 0;
const actSteps = (h, d) => +((h.steps || {})[d]) || 0;
const fmtPasos = n => Math.round(n).toLocaleString('es-PR');
const actMode = (h, d) => (h.modeLog || {})[d] || h.mode || (/correr|trotar|corrida/i.test(h.name || '') ? 'correr' : 'caminar');
// Calorías aproximadas con valores MET (Compendio de Actividades Físicas): MET × peso (kg) × horas
function actCalories(h, d) {
  let min = habCount(h, d), mi = actDist(h, d) * ((h.unitD || 'mi') === 'km' ? 0.621371 : 1); const mode = actMode(h, d);
  if (!min && !mi) return 0;
  if (!min) min = mi / (mode === 'correr' ? 6 : 3) * 60;
  const lerp = (tab, x) => { if (x <= tab[0][0]) return tab[0][1]; for (let i = 1; i < tab.length; i++) if (x <= tab[i][0]) { const [a, ma] = tab[i - 1], [b, mb] = tab[i]; return ma + (mb - ma) * (x - a) / (b - a); } return tab[tab.length - 1][1]; };
  const WALK = [[2, 2.8], [2.5, 3.0], [3, 3.5], [3.5, 4.3], [4, 5.0], [4.5, 7.0]], RUN = [[4, 6.0], [5, 8.3], [6, 9.8], [7, 11.0], [8, 11.8], [9, 12.8], [10, 14.5]];
  const mph = mi ? mi / (min / 60) : 0;
  const met = mph ? (mode === 'correr' || mph > 4.6 ? lerp(RUN, mph) : lerp(WALK, mph)) : (mode === 'correr' ? 9.8 : 3.5);
  const kg = (S.settings.pesoLb || 160) * 0.4536;
  return Math.round(met * kg * min / 60);
}

const HAB_KINDS = [['', '✓ Marcar', 'Un toque y listo.'], ['agua', '💧 Agua', 'Botella de 16 oz que se llena deslizando, con recordatorios.'], ['lectura', '📖 Lectura', 'Un libro con páginas, marcador 🔖 y notas.'], ['actividad', '🚶 Caminar/Correr', 'Tiempo, distancia y calorías aproximadas.'], ['tiempo', '⏱ Tiempo', 'Aro con cronómetro (meditar, estirar…).'], ['oracion', '🙏 Oración', 'Cronómetro y tu lista de peticiones y respuestas.'], ['ahorro', '💵 Ahorro', 'Alcancía que se llena hasta tu meta de dinero.'], ['despertar', '☀️ Despertar', 'Hora meta, “¡Me levanté!” y aviso para acostarte.'], ['comida', '🥗 Comer sano', 'Plato con frutas y vegetales, y cómo comiste.']];
const money = n => { n = +n || 0; const s = Math.abs(n).toFixed(2).replace(/\.00$/, ''); return (n < 0 ? '−$' : '$') + s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
const saveTotal = h => (h.moves || []).reduce((a, m) => a + (+m.amt || 0), 0);
const toMinT = t => { const [a, b] = String(t || '0:0').split(':').map(Number); return a * 60 + b; };
const wakeOnTime = (h, d) => { const w = (h.woke || {})[d]; if (!w) return false; if (w === 'ok') return true; return toMinT(w) <= toMinT(h.wakeAt || '06:00') + 5; };
const FOOD_GOAL = h => Math.max(1, +h.goal || 5);
function habRowInfo(h, d) {
  const k = habKind(h), c = habCount(h, d);
  if (k === 'ahorro') { const t = saveTotal(h), g = +h.saveGoal || 0; return {p: g ? Math.min(1, t / g) : (c > 0 ? 1 : 0), sub: c ? `Hoy +${money(c)}` : (h.saveFor ? `Para: ${esc(h.saveFor)}` : 'Toca para anotar lo ahorrado'), pill: g ? `🐷 ${money(t)} de ${money(g)}` : '', pc: 'money', big: money(t), bigl: 'ahorrado'}; }
  if (k === 'despertar') { const w = (h.woke || {})[d], on = wakeOnTime(h, d); return {p: on ? 1 : 0, sub: w && w !== 'ok' ? `Hoy ${fmtTime(w)} ${on ? '✓ a tiempo' : '· tarde'}` : w === 'ok' ? 'Hoy ✓' : `Meta: ${fmtTime(h.wakeAt || '06:00')}`, big: habTotal(h), bigl: 'días a tiempo'}; }
  if (k === 'comida') { const g = FOOD_GOAL(h), f = (h.food || {})[d] || {}, ml = Object.values(f.meals || {}), sano = ml.filter(x => x === 'sano').length; return {p: Math.min(1, c / g), sub: `${c} de ${g} frutas y vegetales`, pill: ml.length ? `🥗 ${sano} de ${ml.length} comidas sanas` : '', pc: 'green', big: habTotal(h), bigl: 'días en total'}; }
  if (k === 'oracion') { const g = habGoal(h), pend = (h.prayers || []).filter(p => !p.ans).length, run = UI.habTimer && UI.habTimer.id === h.id; return {p: Math.min(1, c / g), sub: run ? '⏱ Orando…' : `${c} de ${g} min`, pill: pend ? `🙏 ${pend} ${pend === 1 ? 'petición' : 'peticiones'}` : '', pc: 'violet', big: c, bigl: 'min hoy'}; }
  return {p: 0, sub: '', big: '', bigl: ''};
}
/* ===== Oración: peticiones y respuestas ===== */
function prayerHTML(h) {
  const P = h.prayers || [], pend = P.filter(p => !p.ans), ans = P.filter(p => p.ans);
  return `<div class="prcard"><div class="bknh"><b>🙏 Mis peticiones</b><span>${pend.length}</span></div>
    <div class="bknadd"><input class="inp" id="prT" placeholder="¿Por qué o por quién quieres orar?" maxlength="200"><button class="btn" id="prA" aria-label="Añadir">+</button></div>
    ${pend.map(p => `<div class="prrow"><button class="prchk" data-pra="${p.id}" aria-label="Marcar como respondida"></button><span>${esc(p.t)}<small>Desde ${fmtShort(p.date)}</small></span><button class="wrdel" data-prd="${p.id}" aria-label="Eliminar"><i class="xdel"></i></button></div>`).join('') || '<div class="hint" style="padding:4px 2px">Escribe tus peticiones y márcalas cuando sean respondidas.</div>'}
    ${ans.length ? `<div class="prans"><b>🙌 Respondidas (${ans.length})</b>${ans.slice().reverse().map(p => `<div class="prrow done"><button class="prchk on" data-pra="${p.id}" aria-label="Quitar respondida">✓</button><span>${esc(p.t)}<small>Respondida ${fmtShort(p.ans)}</small></span><button class="wrdel" data-prd="${p.id}" aria-label="Eliminar"><i class="xdel"></i></button></div>`).join('')}</div>` : ''}</div>`;
}
function wirePrayer(el, h, redraw) {
  const q = x => el.querySelector(x);
  q('#prA').onclick = () => { const t = q('#prT').value.trim(); if (!t) { q('#prT').focus(); return; } h.prayers = h.prayers || []; h.prayers.push({id: uid(), t, date: todayISO(), ans: null}); save('habits'); redraw(); };
  q('#prT').onkeydown = e => { if (e.key === 'Enter') q('#prA').click(); };
  el.querySelectorAll('[data-pra]').forEach(b => b.onclick = () => { const p = h.prayers.find(x => x.id === b.dataset.pra); p.ans = p.ans ? null : todayISO(); save('habits'); if (p.ans) toast('🙌 ¡Gloria a Dios! Petición respondida'); redraw(); });
  el.querySelectorAll('[data-prd]').forEach(b => b.onclick = async () => { if (await ask('¿Eliminar esta petición?', {yes: 'Eliminar'})) { h.prayers = h.prayers.filter(x => x.id !== b.dataset.prd); save('habits'); redraw(); } });
}
/* ===== Ahorro: alcancía que se llena ===== */
function jarSVG(p, drop) {
  const y = 232 - 170 * Math.max(0, Math.min(1, p));
  return `<svg class="jar" viewBox="0 0 200 250" aria-hidden="true"><defs><clipPath id="jarC"><path d="M50 52h100v10c18 8 26 24 26 44v104a26 26 0 0 1-26 26H50a26 26 0 0 1-26-26V106c0-20 8-36 26-44z"/></clipPath>
    <linearGradient id="coinG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd54a"/><stop offset="1" stop-color="#f0a500"/></linearGradient></defs>
    <rect x="44" y="30" width="112" height="24" rx="8" fill="#c58a2a"/><rect x="82" y="38" width="36" height="5" rx="2.5" fill="#6b4512"/>
    <g clip-path="url(#jarC)"><rect width="200" height="250" fill="#eef6ee"/>
      <g style="transform:translateY(${y}px);transition:transform .7s cubic-bezier(.3,1.3,.5,1)"><rect y="0" width="200" height="260" fill="url(#coinG)"/>
      ${[...Array(28)].map((_, i) => `<ellipse cx="${(i * 37) % 180 + 14}" cy="${8 + Math.floor(i / 5) * 18}" rx="13" ry="6" fill="#ffe27a" stroke="#d99400" stroke-width="1.5"/>`).join('')}</g></g>
    <path d="M50 52h100v10c18 8 26 24 26 44v104a26 26 0 0 1-26 26H50a26 26 0 0 1-26-26V106c0-20 8-36 26-44z" fill="none" stroke="#9cc59c" stroke-width="3"/>
    <path d="M42 110v90" stroke="#fff" stroke-opacity=".6" stroke-width="7" stroke-linecap="round"/>
    ${drop ? '<g class="coindrop"><ellipse cx="100" cy="20" rx="14" ry="14" fill="url(#coinG)" stroke="#d99400" stroke-width="2"/><text x="100" y="26" text-anchor="middle" font-size="16" font-weight="800" fill="#8a5a00">$</text></g>' : ''}</svg>`;
}
function savePlan(h) {
  const t = saveTotal(h), g = +h.saveGoal || 0; if (!g || !h.saveBy) return null;
  const start = h.saveStart || todayISO(), end = h.saveBy, today = todayISO();
  const total = Math.max(1, dayDiff(start, end)), left = Math.max(0, dayDiff(today, end)), gone = Math.min(total, Math.max(0, dayDiff(start, today)));
  const rest = Math.max(0, g - t), expected = g * gone / total;
  return {t, g, start, end, total, left, rest, perDay: left ? rest / left : rest, perWeek: left ? rest / Math.max(1, left / 7) : rest, perMonth: left ? rest / Math.max(1, left / 30.44) : rest, diff: t - expected};
}
const dayDiff = (a, b) => Math.round((parseISO(b) - parseISO(a)) / 86400000);
function openSave(h, d, host) {
  chMigrate(h); let drop = false;
  const draw = el => {
    const t = saveTotal(h), g = +h.saveGoal || 0, today = habCount(h, d), mv = (h.moves || []).slice().sort((a, b) => b.date.localeCompare(a.date) || b.at - a.at);
    el.querySelector('#svBody').innerHTML = `
      <div class="svtop"><b>${money(t)}</b><span>${g ? `de ${money(g)}${h.saveFor ? ' para ' + esc(h.saveFor) : ''}` : 'ahorrado en total'}</span></div>
      <div class="wgoalrow"><button class="wgoal" id="svG">Meta: <b>${g ? money(g) : 'sin meta'}</b>${h.saveBy ? ` · ${durTxtD(dayDiff(h.saveStart || todayISO(), h.saveBy))}` : ''} <span>Cambiar ✎</span></button></div>
      <div class="svjar">${jarSVG(g ? t / g : Math.min(1, t / 500), drop)}${g ? `<div class="svpct">${Math.min(100, Math.round(t / g * 100))}%</div>` : ''}</div>
      <div class="wmsg">${g && t >= g ? '🎉 ¡Llegaste a tu meta!' : g ? `Faltan ${money(g - t)}` : ''}${today ? `${g ? ' · ' : ''}Hoy ${today > 0 ? '+' : ''}${money(today)}` : ''}</div>
      <div class="wacts"><button class="wsmall" id="svOut" aria-label="Sacar dinero">−$</button><button class="wdrink svin" id="svIn">+ AHORRADO</button><button class="wsmall" id="svCh" aria-label="Reto de ahorro">🏆</button></div>
      <div class="svlist"><div class="bknh"><b>Movimientos</b><span>${mv.length}</span></div>${mv.slice(0, 40).map(m => `<div class="svmv ${m.amt < 0 ? 'out' : ''}"><span>${m.amt < 0 ? '↘︎' : m.cell != null ? '🏆' : '🪙'}</span><span class="d">${fmtShort(m.date)}${m.note ? ' · ' + esc(m.note) : ''}</span><b>${m.amt > 0 ? '+' : ''}${money(m.amt)}</b><button class="wrdel" data-svd="${m.id}" aria-label="Eliminar"><i class="xdel"></i></button></div>`).join('') || '<div class="hint" style="padding:4px 2px">Cada vez que ahorres dinero, anótalo aquí.</div>'}</div>`;
    drop = false;
    const q = x => el.querySelector(x);
    const add = async sign => {
      if (d > todayISO()) { toast('Ese día todavía no llega'); return; }
      const P = savePlan(h), sug = P && sign > 0 ? Math.max(1, Math.round(P.perDay * 100) / 100) : sign > 0 ? 5 : 1;
      const v = await pickNumber(Math.round(sug), {min: 0, max: 10000, unit: '$', title: sign > 0 ? '¿Cuánto ahorraste?' : '¿Cuánto sacaste?'});
      if (!v) return;
      h.moves = h.moves || []; h.moves.push({id: uid(), date: d, amt: sign * v, at: Date.now()}); recalcSave(h); save('habits');
      if (sign > 0) { drop = true; toast(`🐷 +${money(v)} ahorrado`); goalCheer(h, v); }
      draw(el);
    };
    q('#svIn').onclick = () => add(1); q('#svOut').onclick = () => add(-1);
    q('#svG').onclick = () => openSaveGoal(h, () => draw(el));
    q('#svCh').onclick = () => h.challenge ? openChallengeTable(h, d, () => draw(el)) : openChallengeForm(h, () => draw(el));
    el.querySelectorAll('[data-svd]').forEach(b => b.onclick = async () => { if (await ask('¿Eliminar este movimiento?', {yes: 'Eliminar'})) { h.moves = h.moves.filter(x => x.id !== b.dataset.svd); recalcSave(h); save('habits'); draw(el); } });
  };
  hostOrSheet(host, {title: `${h.icon} ${esc(h.name)}`, cls: 'savesheet', body: '<div id="svBody"></div>', onMount: draw, onClose: () => { if (UI.view === 'habitos') renderView(); }});
}
function goalCheer(h, v) { const t = saveTotal(h); if (+h.saveGoal && t >= h.saveGoal && t - v < h.saveGoal) setTimeout(() => toast('🎉 ¡Meta de ahorro cumplida!'), 500); }
const durTxtD = n => n % 365 === 0 ? `${n / 365} ${n === 365 ? 'año' : 'años'}` : n % 30 === 0 && n >= 30 ? `${n / 30} ${n === 30 ? 'mes' : 'meses'}` : n % 7 === 0 && n >= 7 ? `${n / 7} ${n === 7 ? 'semana' : 'semanas'}` : `${n} días`;
function recalcSave(h) { const l = {}; (h.moves || []).forEach(m => l[m.date] = Math.round(((l[m.date] || 0) + m.amt) * 100) / 100); h.log = {}; Object.keys(l).forEach(k => { if (l[k]) h.log[k] = l[k]; }); }
function openSaveGoal(h, done) {
  const UN = [['dias', 'días', 1], ['semanas', 'semanas', 7], ['meses', 'meses', 30], ['anos', 'años', 365]];
  const span = h.saveBy ? dayDiff(h.saveStart || todayISO(), h.saveBy) : 365;
  let unit = span % 365 === 0 ? 'anos' : span % 30 === 0 ? 'meses' : span % 7 === 0 ? 'semanas' : 'dias';
  const qty0 = span / UN.find(u => u[0] === unit)[2];
  const s = openSheet({title: '🐷 Meta de ahorro', body: `<div class="fld"><label>¿Para qué ahorras?</label><input class="inp" id="sgF" value="${esc(h.saveFor || '')}" placeholder="Ej.: Viaje, emergencias, carro…" maxlength="40"></div>
    <div class="fld"><label>¿Cuánto quieres ahorrar?</label><input class="inp rdnum" id="sgV" readonly inputmode="none" data-wheel data-min="0" data-max="20000" data-step="25" data-unit="$" data-title="Meta de ahorro" value="${+h.saveGoal || ''}" placeholder="Sin meta" style="max-width:none"></div>
    <div class="fld"><label>¿En cuánto tiempo?</label><label class="wrsw" style="padding:0 2px 8px"><span><b>Ponerle fecha a la meta</b></span><input type="checkbox" id="sgOn" ${h.saveBy || !h.saveGoal ? 'checked' : ''}><i></i></label>
      <div id="sgT"><div class="habgoal"><input class="inp rdnum" id="sgQ" readonly inputmode="none" data-wheel data-min="1" data-max="365" data-title="¿Cuánto tiempo?" value="${qty0}" style="max-width:110px"><div class="seg sgu">${UN.map(([k, n]) => `<button type="button" data-su="${k}" class="${unit === k ? 'on' : ''}">${n}</button>`).join('')}</div></div><small class="hint" id="sgH"></small></div></div>`,
    foot: '<button class="btn" id="sgS">Guardar</button>',
    onMount: el => {
      const q = x => el.querySelector(x);
      const days = () => (parseInt(q('#sgQ').value, 10) || 1) * UN.find(u => u[0] === unit)[2];
      const hint = () => { const g = parseFloat(q('#sgV').value) || 0, n = days(), rest = Math.max(0, g - saveTotal(h)); q('#sgT').style.display = q('#sgOn').checked ? '' : 'none'; q('#sgH').textContent = g ? `Hasta el ${fmtShort(addDays(todayISO(), n))} ${parseISO(addDays(todayISO(), n)).getFullYear()}: ${money(rest / n)} al día · ${money(rest / Math.max(1, n / 7))} a la semana · ${money(rest / Math.max(1, n / 30.44))} al mes` : 'Pon primero cuánto quieres juntar.'; };
      el.querySelectorAll('[data-su]').forEach(b => b.onclick = () => { unit = b.dataset.su; el.querySelectorAll('[data-su]').forEach(x => x.classList.toggle('on', x === b)); hint(); });
      ['#sgV', '#sgQ'].forEach(x => q(x).addEventListener('change', hint)); q('#sgOn').onchange = hint; hint();
      q('#sgS').onclick = () => { h.saveFor = q('#sgF').value.trim(); h.saveGoal = parseFloat(q('#sgV').value) || null;
        if (q('#sgOn').checked && h.saveGoal) { h.saveStart = todayISO(); h.saveBy = addDays(todayISO(), days()); } else { h.saveBy = null; }
        save('habits'); s.close(); toast('🐷 Meta guardada'); done && done(); };
    }});
}
/* ===== Retos de ahorro: tabla con la cantidad dividida ===== */
const chSaved = ch => Object.keys(ch.marked || {}).reduce((a, i) => a + (ch.vals[i] || 0), 0);
function chValues(amount, n, style) {
  const C = Math.round(amount * 100), out = [];
  if (style === 'creciente') { const W = n * (n + 1) / 2; let acc = 0; for (let i = 1; i <= n; i++) { const v = i === n ? C - acc : Math.round(C * i / W); out.push(v); acc += v; } }
  else if (style === 'variado') {
    let seed = n * 7919 + C % 9973; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const avg = C / n, unit = avg >= 500 ? 100 : avg >= 100 ? 25 : 1, w = [...Array(n)].map(() => .3 + rnd() * 1.4), W = w.reduce((a, b) => a + b, 0);
    let acc = 0; w.forEach((x, i) => { const v = Math.max(unit, Math.round(C * x / W / unit) * unit); out.push(v); acc += v; });
    let diff = C - acc, k = 0; while (diff !== 0 && k < n * 50) { const i = k % n, step = Math.sign(diff) * Math.min(Math.abs(diff), unit); if (out[i] + step >= unit || step > 0) { out[i] += step; diff -= step; } k++; }
    if (diff) out[0] += diff;
  } else { const base = Math.floor(C / n); let r = C - base * n; for (let i = 0; i < n; i++) out.push(base + (r-- > 0 ? 1 : 0)); }
  return out.map(v => v / 100);
}
const CH_PRESETS = [['$1,000 en 1 año (por semana)', 1000, 52, 'variado', 'semana'], ['$1,000 en 1 año (por día)', 1000, 365, 'variado', 'dia'], ['Reto 52 semanas', 1378, 52, 'creciente', 'semana'], ['$500 en 100 días', 500, 100, 'variado', 'dia'], ['$100 en 30 días', 100, 30, 'igual', 'dia']];
const CH_FREQ = {dia: ['Diario', 'día', 'días', 365], semana: ['Semanal', 'semana', 'semanas', 52], quin: ['Cada 2 semanas', '2 semanas', '2 semanas', 26], mes: ['Mensual', 'mes', 'meses', 12]};
function openChallengeForm(h, done) {
  const c = h.challenge || {};
  let freq = c.freq || 'semana', style = c.style === 'variado' ? 'variado' : 'igual', color = c.color || '#d99400', span = c.span || 12, view = c.ready ? 'circulos' : c.view || 'circulos', tab = c.vals && !c.ready ? 'crear' : 'listos';
  const s = openSheet({title: '🏆 Reto de ahorro', body: `
    <div class="fld chnamef"><label>Nombre del reto <small class="muted">(opcional)</small></label><input class="inp" id="chNL" maxlength="40" placeholder="Ej.: Viaje a Japón" value="${esc(c.userName || '')}"></div>
    <div class="chcolrow"><span>Color</span><div class="chcols hscroll">${CH_COLORS.map(x => `<button type="button" data-chcol="${x}" class="${(c.color || '#d99400') === x ? 'on' : ''}" style="--sw:${x}" aria-label="Color"></button>`).join('')}</div></div>${c.vals ? '<button type="button" class="btn ghost sm chcolsave" id="chColSave">Aplicar nombre y color a mi reto actual</button>' : ''}
    ${c.ready ? '' : `<div class="seg chtabs"><button type="button" data-ctab="listos" class="${tab === 'listos' ? 'on' : ''}">🏆 Retos listos</button><button type="button" data-ctab="crear" class="${tab === 'crear' ? 'on' : ''}">✏️ Crear el mío</button></div>`}
    <div data-tp="listos">${c.ready ? `<div class="chnote"><span class="chnote-k">Reto listo</span> <b>${esc(c.name)}</b></div>` : ''}    <div class="chready">${CH_READY.map((r, i) => { const t = r.vals().reduce((a, b) => a + b, 0); return `<button type="button" class="chrd" data-crd="${i}"><span class="chrdi ${r.view}">${r.view === 'sobres' ? ENV_SVG : r.view === 'circulos' ? '<b></b><b></b><b></b>' : '<i></i><i></i>'}</span><span class="chrdt"><b>${esc(r.name)}</b><small>${esc(r.sub)}</small></span><span class="chrdm">${money(t)}</span></button>`; }).join('')}<button type="button" class="chrd chrdown" data-ctab-go="crear"><span class="chrdi">✏️</span><span class="chrdt"><b>Crear el mío</b><small>Escoge la cantidad, el plazo y cómo marcar</small></span><span class="chrdm">›</span></button></div></div>
    <div class="chown" data-tp="crear">
      <div class="chstep"><span>1</span><label>¿Cuánto quieres ahorrar?</label></div>
      <input class="inp rdnum chbig" id="chA" readonly inputmode="none" data-wheel data-min="10" data-max="50000" data-step="10" data-unit="$" data-title="¿Cuánto quieres ahorrar?" value="${!c.ready && c.amount ? c.amount : 1000}">
      <div class="chstep"><span>2</span><label>¿En cuánto tiempo?</label></div>
      <div class="chchips">${CH_SPANS.map(([m, n]) => `<button type="button" data-csp="${m}" class="${span === m ? 'on' : ''}">${n}</button>`).join('')}</div>
      <div class="chstep"><span>3</span><label>¿Cada cuánto ahorras?</label></div>
      <div class="chchips">${Object.entries(CH_FREQ).map(([k, v]) => `<button type="button" data-cf="${k}" class="${freq === k ? 'on' : ''}">Cada ${v[1]}</button>`).join('')}</div>
      <div class="chres" id="chRes"></div>
      <div class="chstep"><span>4</span><label>¿Cómo lo quieres marcar?</label></div>
      <div class="seg chvseg">${[['sobres', ENV_SVG, 'Sobres'], ['circulos', '<i class="dot"></i>', 'Círculos'], ['lista', '<i class="bar"></i>', 'Lista']].map(([k, ic2, n]) => `<button type="button" data-cvw="${k}" class="${view === k ? 'on' : ''}"><span class="cvi ${k}">${ic2}</span>${n}</button>`).join('')}</div>
      <label class="wrsw chvar"><span><b>Cantidades variadas</b><small>Apagado: siempre la misma cantidad.</small></span><input type="checkbox" id="chV" ${style === 'variado' ? 'checked' : ''}><i></i></label>
    </div>
    ${c.vals ? '<small class="hint">Al cambiar cantidades, empieza de nuevo sin casillas marcadas.</small>' : ''}`,
    foot: `${c.vals ? '<button class="btn sec" id="chDel" aria-label="Quitar reto" title="Quitar reto"><i class="xdel"></i></button>' : ''}<button class="btn" id="chS">Crear mi reto</button>`,
    onMount: el => {
      const q = x => el.querySelector(x);
      const showTab = () => { el.querySelectorAll('[data-tp]').forEach(x => x.style.display = x.dataset.tp === tab ? '' : 'none'); el.querySelectorAll('[data-ctab]').forEach(b => b.classList.toggle('on', b.dataset.ctab === tab)); q('#chS').style.display = tab === 'crear' ? '' : 'none'; };
      el.querySelectorAll('[data-ctab]').forEach(b => b.onclick = () => { tab = b.dataset.ctab; showTab(); });
      el.querySelectorAll('[data-ctab-go]').forEach(b => b.onclick = () => { tab = b.dataset.ctabGo; showTab(); });
      const A = () => parseFloat(q('#chA').value) || 0;
      const N = () => spanCount(span, freq), vals = () => style === 'igual' ? chValues(A(), N(), 'igual') : chValues(A(), N(), 'variado');
      const upd = () => {
        const F = CH_FREQ[freq], n = N(), t = A(), v = vals(), per = t / n;
        q('#chRes').innerHTML = `<div class="chres1">Ahorras <button type="button" class="chper" id="chPer">${style === 'igual' ? money(Math.round(per * 100) / 100) : `entre ${money(Math.min(...v))} y ${money(Math.max(...v))}`} ✎</button> cada ${F[1]}</div><div class="chres2">${n} ${n === 1 ? 'vez' : 'veces'} · ${money(t)} en total · <b>${money(t / span * 12)} al año</b></div>`;
        q('#chPer').onclick = async () => { const x = await pickNumber(Math.round(per), {min: 1, max: 5000, unit: '$', title: `¿Cuánto cada ${F[1]}?`}); if (x) { q('#chA').value = Math.round(x * n * 100) / 100; style = 'igual'; q('#chV').checked = false; upd(); } };
      };
      el.querySelectorAll('[data-csp]').forEach(b => b.onclick = () => { span = +b.dataset.csp; el.querySelectorAll('[data-csp]').forEach(x => x.classList.toggle('on', x === b)); upd(); });
      el.querySelectorAll('[data-cf]').forEach(b => b.onclick = () => { freq = b.dataset.cf; el.querySelectorAll('[data-cf]').forEach(x => x.classList.toggle('on', x === b)); upd(); });
      el.querySelectorAll('[data-cvw]').forEach(b => b.onclick = () => { view = b.dataset.cvw; el.querySelectorAll('[data-cvw]').forEach(x => x.classList.toggle('on', x === b)); });
      q('#chV').onchange = () => { style = q('#chV').checked ? 'variado' : 'igual'; upd(); };
      el.querySelectorAll('[data-chcol]').forEach(b => b.onclick = () => { color = b.dataset.chcol; el.querySelectorAll('[data-chcol]').forEach(x => x.classList.toggle('on', x === b)); });
      const cs = q('#chColSave'); if (cs) cs.onclick = () => { const uN = (q('#chNL').value || '').trim(), ch = h.challenge; ch.autoTitle = ch.autoTitle || ch.title; ch.color = color; ch.userName = uN || undefined; ch.title = uN || ch.autoTitle; save('habits'); s.close(); toast('🎨 Color cambiado'); done && done(); openChallengeTable(h, todayISO(), done); };
      el.querySelectorAll('[data-crd]').forEach(b => b.onclick = async () => {
        const r = CH_READY[+b.dataset.crd], vals = r.vals(), t = Math.round(vals.reduce((a, x) => a + x, 0) * 100) / 100, uN = (q('#chNL').value || '').trim();
        if (h.challenge && Object.keys(h.challenge.marked || {}).length && !(await ask(`¿Cambiar tu reto actual por “${esc(r.name)}”? Empieza de nuevo sin casillas marcadas.`, {yes: 'Cambiar'}))) return;
        h.challenge = {ready: 1, cols: r.cols, name: r.name, autoTitle: r.title || money(t), userName: uN || undefined, title: uN || r.title || money(t), sub: r.sub, amount: t, style: r.style || 'lista', vals, marked: {}, start: todayISO(), freq: r.freq, view: r.view, color, indep: 1, indep2: 1};
        save('habits'); s.close(); toast(`🏆 ${r.name}`); done && done(); openChallengeTable(h, todayISO(), done);
      });
      q('#chA').addEventListener('change', upd); upd(); showTab();
      q('#chS').onclick = () => {
        const n = N(), t = A(); if (!t) { toast('Pon una cantidad'); return; }
        const F = CH_FREQ[freq], sp = (CH_SPANS.find(x => x[0] === span) || [0, span + ' meses'])[1];
        const uN = (q('#chNL').value || '').trim();
        h.challenge = {span, fixR: 1, userName: uN || undefined, name: uN || `${money(t)} en ${sp}`, autoTitle: money(t), title: uN || money(t), sub: uN ? `${money(t)} en ${sp} · cada ${F[1]}` : `${sp} · cada ${F[1]}`, amount: t, style, vals: vals(), marked: {}, start: todayISO(), freq, view, color, indep: 1, indep2: 1};
        save('habits'); s.close(); toast('🏆 Reto creado'); done && done(); openChallengeTable(h, todayISO(), done);
      };
      const del = q('#chDel'); if (del) del.onclick = async () => { if (await ask('¿Quitar el reto y sus casillas marcadas? Tu ahorro regular no cambia.', {yes: 'Quitar'})) { h.challenge = null; save('habits'); s.close(); done && done(); } };
    }});
}
const chStep = f => f === 'semana' ? 7 : f === 'quin' ? 14 : 1;
function chDate(ch, i) { if (ch.freq === 'mes') { const x = parseISO(ch.start || todayISO()); x.setMonth(x.getMonth() + i); return iso(x); } return addDays(ch.start || todayISO(), i * chStep(ch.freq)); }
function chCur(ch) { let k; if (ch.freq === 'mes') { const a = parseISO(ch.start || todayISO()), b = new Date(); k = (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth() - (b.getDate() < a.getDate() ? 1 : 0); } else k = Math.floor(dayDiff(ch.start || todayISO(), todayISO()) / chStep(ch.freq)); return Math.max(0, Math.min(ch.vals.length - 1, k)); }
function chMigrate(h) { const ch = h.challenge;
  if (ch && !ch.ready && !ch.fixR && !Object.keys(ch.marked || {}).length) { ch.fixR = 1; const r = CH_READY.find(r => Math.round(r.vals().reduce((a, b) => a + b, 0)) === Math.round(ch.amount) && r.view === ch.view); if (r) { const v = r.vals(); Object.assign(ch, {ready: 1, name: r.name, title: r.title || money(ch.amount), sub: r.sub, vals: v, freq: r.freq, cols: r.cols, style: 'lista'}); } save('habits'); } if (ch && !ch.indep2) { ch.indep2 = 1; if (+h.saveGoal === +ch.amount && !h.saveFor) { h.saveGoal = null; h.saveBy = null; } save('habits'); } if (!ch || ch.indep) return; ch.indep = 1; ch.freq = ch.freq || 'dia'; if ((h.moves || []).some(m => m.cell != null)) { h.moves = h.moves.filter(m => m.cell == null); recalcSave(h); } save('habits'); }
function challengeBox(box, h, tabs, onChange) {
  const ch = h.challenge; chMigrate(h);
  const N = ch.vals.length, n = Object.keys(ch.marked || {}).length, sv = chSaved(ch), cur = chCur(ch), per = ch.freq === 'semana' ? 'Semana' : ch.freq === 'quin' ? 'Quincena' : ch.freq === 'mes' ? 'Mes' : 'Día';
  const col = ch.color || '#d99400'; box.style.setProperty('--chc', col); box.style.setProperty('--chl', hexA(col, .18));
  box.innerHTML = `<div class="qtop">${tabs}<button class="iconbtn qx" data-close aria-label="Cerrar">✕</button></div>
    <button class="qhead chedit" data-ched style="--lc:${col}" aria-label="Editar el reto"><span class="qtitle">RETO ${esc(money(ch.amount))}</span><span class="qcount">${n}/${N}</span><span class="chpen">✎</span></button>
    <div class="chsub"><b>${money(sv)}</b> ahorrado de ${money(ch.amount)} · ${ch.sub ? esc(ch.sub) : `${ch.style === 'igual' ? 'fijo' : 'variado'} ${ch.freq === 'semana' ? 'por semana' : ch.freq === 'quin' ? 'cada 2 semanas' : ch.freq === 'mes' ? 'por mes' : 'por día'}`}</div>
    <div class="habbar chbar"><i style="width:${sv / ch.amount * 100}%"></i></div>
    ${ch.view === 'circulos' || ch.view === 'sobres' ? `<div class="qrows chrows chcirc"><div class="chposter"><b>${esc(ch.title || money(ch.amount))}</b><i>Reto de ahorro</i><small>${esc(ch.sub || ch.name.replace(money(ch.amount) + ' en ', ''))}</small></div><div class="chdots ${ch.view === 'sobres' ? 'env' : ''} ${ch.cols ? 'cols' : ''}" style="${ch.cols ? `--cols:${ch.cols}` : ''}">${ch.vals.map((v, i) => ch.view === 'sobres' ? `<button class="chenv ${ch.marked[i] ? 'on' : ''}" data-chc="${i}" title="Sobre ${i + 1}">${envSVG(!ch.marked[i], money(v).replace('.00', ''))}${ch.marked[i] ? '' : `<span>${money(v).replace('.00', '')}</span>`}</button>` : `<button class="chdot ${ch.marked[i] ? 'on' : ''} ${i === cur && !ch.marked[i] ? 'cur' : ''}" data-chc="${i}" title="${per} ${i + 1} · ${fmtShort(chDate(ch, i))}">${money(v).replace('.00', '')}</button>`).join('')}<span class="chdeq">= ${esc(money(ch.amount))}</span></div><div class="chtip">Toca ${ch.view === 'sobres' ? 'un sobre' : 'un círculo'} cada ${ch.freq === 'semana' ? 'semana' : ch.freq === 'mes' ? 'mes' : 'día'}, ahorra esa cantidad y se colorea.</div></div>` : `<div class="qrows chrows">${ch.vals.map((v, i) => { const on = !!ch.marked[i], dt = chDate(ch, i); return `<div class="qrow ${on ? 'done' : ''} ${i === cur && !on ? 'cur' : ''} ${!on && i < cur ? 'late' : ''}" data-chc="${i}" role="button" tabindex="0"><span class="qbox"></span><span class="qtx"><span class="hl" style="--hlbg:${i === cur ? 'rgba(255,207,63,.55)' : 'transparent'}">${per} ${i + 1}</span> <span class="qtime">${i === cur ? (ch.freq === 'semana' ? 'esta semana' : ch.freq === 'mes' ? 'este mes' : 'hoy') + ' · ' : ''}${fmtShort(dt)}</span></span><b class="chamt">${money(v)}</b></div>`; }).join('')}</div>`}
    <div class="row qfoot"><button class="btn ghost sm" id="chEd">Cambiar reto</button><span class="sp"></span>${n === N ? '<b style="color:#1e7a36">🎉 ¡Reto completado!</b>' : `<span class="qtime">Faltan ${money(ch.amount - sv)}</span>`}</div>`;
  box.querySelectorAll('[data-ched]').forEach(b => b.onclick = e => { e.stopPropagation(); box.querySelector('#chEd').click(); });
  box.querySelectorAll('[data-chv]').forEach(b => b.onclick = () => { ch.view = b.dataset.chv; save('habits'); box._scrolled = 0; challengeBox(box, h, tabs, onChange); });
  box.querySelectorAll('[data-chc]').forEach(r => r.onclick = () => {
    const i = +r.dataset.chc;
    if (ch.marked[i]) delete ch.marked[i]; else { ch.marked[i] = todayISO(); toast(`🏆 +${money(ch.vals[i])} en el reto`); if (Object.keys(ch.marked).length === N) setTimeout(() => toast('🎉 ¡Completaste el reto!'), 600); }
    save('habits'); r.classList.toggle('done'); const st = box.querySelector('.chrows').scrollTop; setTimeout(() => { challengeBox(box, h, tabs, onChange); box.querySelector('.chrows').scrollTop = st; onChange && onChange(); }, 160);
  });
  box.querySelector('#chEd').onclick = () => { const sh = sheets.find(x => x.el.contains(box)); sh && sh.close(); openChallengeForm(h, onChange); };
  requestAnimationFrame(() => { const c = box.querySelector('.qrow.cur, .chdot.cur') || box.querySelector('.qrow:not(.done), .chdot:not(.on)'); if (c && !box._scrolled && ch.view !== 'sobres' && !(ch.view === 'circulos' && cur < 15)) { box._scrolled = 1; const rows = box.querySelector('.chrows'); rows.scrollTop = Math.max(0, c.offsetTop - rows.offsetTop - 40); } });
}
function openChallengeTable(h, d, done) {
  if (!h.challenge) return;
  openSheet({head: false, float: true, cls: 'qcard', body: '<div id="chPop"></div>', onClose: () => { done && done(); },
    onMount: el => { const box = el.querySelector('#chPop'); challengeBox(box, h, `<div class="qtabs hscroll"><button class="qtab on" data-ched style="--lc:${h.challenge.color || '#d99400'}">🏆 ${esc(h.challenge.name)} ✎</button></div>`, null); }});
}
/* ===== Despertar: hora meta, cielo y aviso para acostarse ===== */
function skySVG(h, w) {
  const tgt = toMinT(h.wakeAt || '06:00'), m = w && w !== 'ok' ? toMinT(w) : null, diff = m == null ? 0 : m - tgt;
  const sunY = m == null ? 150 : Math.max(40, Math.min(150, 120 + diff * 1.2));
  const sky = m == null ? ['#1e2a55', '#4b5aa0'] : diff <= 5 ? ['#ffb36b', '#ffe3a8'] : ['#8fc8ff', '#d9eeff'];
  return `<svg class="sky" viewBox="0 0 320 170" aria-hidden="true"><defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>
    <rect width="320" height="170" rx="20" fill="url(#skyG)"/>
    ${m == null ? [[40, 30], [90, 55], [150, 25], [220, 45], [280, 28], [260, 80], [60, 90]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#fff" opacity=".8"/>`).join('') + '<circle cx="250" cy="50" r="18" fill="#fdf3c4"/><circle cx="258" cy="44" r="16" fill="#2c3a72"/>' : ''}
    <circle class="sun" cx="160" cy="${sunY}" r="30" fill="#ffcf3f" style="filter:drop-shadow(0 0 14px #ffcf3f)"/>
    <path d="M0 140 Q60 110 120 135 T240 128 T320 132 V170 H0z" fill="#5a9b5a"/><path d="M0 150 Q80 128 160 148 T320 144 V170 H0z" fill="#3f7d45"/></svg>`;
}
function openWake(h, d, host) {
  const draw = el => {
    h.woke = h.woke || {}; const w = h.woke[d], tgt = h.wakeAt || '06:00', today = d === todayISO();
    const diff = w && w !== 'ok' ? toMinT(w) - toMinT(tgt) : null, bed = fromMin((toMinT(tgt) - 8 * 60 + 1440) % 1440);
    const week = weekDays(d).map(x => ({x, w: h.woke[x]}));
    const R = h.reminders || [];
    el.querySelector('#wkBody').innerHTML = `
      ${skySVG(h, w)}
      <div class="wkmsg">${!w ? (today ? '¿Ya te levantaste?' : 'Ese día no está anotado') : w === 'ok' ? '✓ Marcado' : diff <= 0 ? `☀️ ${fmtTime(w)} · ${diff < 0 ? durTxt(-diff) + ' antes. ¡Excelente!' : '¡Justo a tiempo!'}` : diff <= 5 ? `☀️ ${fmtTime(w)} · ¡A tiempo!` : `⏰ ${fmtTime(w)} · ${durTxt(diff)} tarde. ¡Mañana lo logras!`}</div>
      <div class="wacts">${!w && today ? '<button class="wdrink wkbtn" id="wkNow">☀️ ¡ME LEVANTÉ!</button>' : ''}<button class="btn sec" id="wkSet">${w ? 'Cambiar hora' : 'Poner la hora'}</button>${w ? '<button class="wrdel" id="wkDel" aria-label="Borrar"><i class="xdel"></i></button>' : ''}</div>
      <div class="wkgoal"><button class="acgoal" id="wkG">Meta: <b>${fmtTime(tgt)}</b> <span>Cambiar ✎</span></button><div class="hint">🌙 Para dormir 8 horas, acuéstate a las <b>${fmtTime(bed)}</b></div></div>
      <div class="wkweek">${week.map(({x, w: ww}) => { const on = wakeOnTime(h, x), mm = ww && ww !== 'ok' ? toMinT(ww) : null, hh = mm == null ? 0 : Math.max(12, Math.min(70, 40 - (mm - toMinT(tgt)) * 0.8)); return `<div class="wkd ${x === d ? 'sel' : ''}"><i class="${ww ? (on ? 'on' : 'late') : ''}" style="height:${ww ? hh : 6}px"></i><b>${ww && ww !== 'ok' ? fmtTime(ww).replace(/ ?[ap]\. ?m\./, '') : '–'}</b><span>${DCORTO[parseISO(x).getDay()].slice(0, 1).toUpperCase()}</span></div>`; }).join('')}</div>
      <div class="prcard"><div class="bknh"><b>⏰ Avisos</b></div>
        <label class="wrsw"><span><b>Aviso a la hora de levantarme</b><small>${fmtTime(tgt)}</small></span><input type="checkbox" id="wkR1" ${R.some(r => !r.bed && r.on !== false) ? 'checked' : ''}><i></i></label>
        <label class="wrsw"><span><b>Aviso para acostarme</b><small>${fmtTime(bed)} (8 horas antes)</small></span><input type="checkbox" id="wkR2" ${R.some(r => r.bed && r.on !== false) ? 'checked' : ''}><i></i></label>
        <small class="hint">${window.NATIVE ? 'Te llegan aunque la app esté cerrada.' : 'En la web el aviso sale si la app está abierta. En Android te llega aunque esté cerrada.'}</small></div>`;
    const q = x => el.querySelector(x);
    const setW = t => { h.woke[d] = t; h.log = h.log || {}; if (wakeOnTime(h, d)) h.log[d] = 1; else delete h.log[d]; save('habits'); if (wakeOnTime(h, d)) toast('☀️ ¡Buenos días! Te levantaste a tiempo'); draw(el); };
    const nw = q('#wkNow'); if (nw) nw.onclick = () => { const n = new Date(); setW(pad(n.getHours()) + ':' + pad(n.getMinutes())); };
    q('#wkSet').onclick = async () => { const t = await pickTime(w && w !== 'ok' ? w : tgt, {title: '¿A qué hora te levantaste?'}); if (t) setW(t); };
    const dl = q('#wkDel'); if (dl) dl.onclick = () => { delete h.woke[d]; if (h.log) delete h.log[d]; save('habits'); draw(el); };
    q('#wkG').onclick = async () => { const t = await pickTime(tgt, {title: 'Hora meta para levantarme'}); if (!t) return; h.wakeAt = t; syncWakeRem(h); Object.keys(h.woke).forEach(x => { h.log = h.log || {}; if (wakeOnTime(h, x)) h.log[x] = 1; else delete h.log[x]; }); save('habits'); draw(el); };
    const rem = async () => { h.wakeRem = q('#wkR1').checked; h.bedRem = q('#wkR2').checked; syncWakeRem(h); save('habits'); if (h.wakeRem || h.bedRem) { if (window.NATIVE) { await NATIVE.ensurePermission(); NATIVE.reschedule(); } else if ('Notification' in window && Notification.permission === 'default') { try { await Notification.requestPermission(); } catch (e) {} } toast('⏰ Avisos listos'); } };
    q('#wkR1').onchange = rem; q('#wkR2').onchange = rem;
  };
  hostOrSheet(host, {title: `${h.icon} ${esc(h.name)}`, cls: 'wakesheet', body: '<div id="wkBody"></div>', onMount: draw, onClose: () => { if (UI.view === 'habitos') renderView(); }});
}
function syncWakeRem(h) { const tgt = h.wakeAt || '06:00', bed = fromMin((toMinT(tgt) - 480 + 1440) % 1440); h.remOn = true; h.reminders = [{id: 'wk', time: tgt, label: '☀️ ¡Buenos días! Hora de levantarte', on: !!h.wakeRem}, {id: 'bd', time: bed, label: '🌙 Hora de acostarte', on: !!h.bedRem, bed: true}]; }
/* ===== Comer sano: plato con frutas y vegetales ===== */
const FOOD_TIPS = ['Llena la mitad de tu plato con vegetales.', 'Una fruta es la mejor merienda.', 'Toma agua antes de cada comida.', 'Prefiere lo asado o al horno en vez de frito.', 'Come despacio: tu cuerpo tarda 20 min en sentirse lleno.', 'Cambia el refresco por agua con limón.', 'Añade un vegetal al desayuno.', 'Lee las etiquetas: menos azúcar y sodio.', 'Arroz integral o habichuelas: más fibra.', 'Prepara tu almuerzo la noche antes.', 'Pon frutas a la vista en la cocina.', 'Come colores distintos: cada uno aporta algo.'];
const MEALS = [['desayuno', '🍳 Desayuno'], ['almuerzo', '🍽️ Almuerzo'], ['cena', '🌙 Cena'], ['merienda', '🍎 Merienda']];
const MEAL_ST = [['sano', '🥗', 'Sano'], ['regular', '😐', 'Regular'], ['rapida', '🍔', 'Comida rápida']];
function plateSVG(f) {
  // MiPlato (USDA): mitad frutas y vegetales, un cuarto granos, un cuarto proteína; el lácteo va aparte
  const R = 98, cx = 110, cy = 110, pt = a => [cx + R * Math.cos(a * Math.PI / 180), cy + R * Math.sin(a * Math.PI / 180)];
  const seg = (a0, a1) => { const [x0, y0] = pt(a0), [x1, y1] = pt(a1); return `M${cx} ${cy} L${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1}Z`; };
  const parts = [['v', '#b9e8a6', '🥦', -180, -90], ['f', '#ffd3b0', '🍎', -90, 0], ['g', '#f7e3b5', '🍚', 0, 90], ['p', '#f6c1c1', '🍗', 90, 180]];
  return `<svg class="plate" viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="108" fill="#f4f4f2" stroke="#e0e0da" stroke-width="2"/>
    ${parts.map(([k, col, em, a0, a1]) => { const n = f[k] || 0, m = (a0 + a1) / 2, rad = 52, x = cx + rad * Math.cos(m * Math.PI / 180), y = cy + rad * Math.sin(m * Math.PI / 180); return `<path d="${seg(a0, a1)}" fill="${n ? col : '#fafaf7'}" stroke="#fff" stroke-width="3" data-sec="${k}" class="plsec"/><text x="${x}" y="${y + 6}" text-anchor="middle" font-size="22">${em}</text>${n ? `<text x="${x}" y="${y + 26}" text-anchor="middle" font-size="13" font-weight="800" fill="#333">×${n}</text>` : ''}`; }).join('')}
  </svg>`;
}
const NUT_FOODS = [
  ['Arroz blanco · 1 taza', 'g', 205, 4.3, 45, 0.4], ['Arroz integral · 1 taza', 'g', 216, 5, 45, 1.8],
  ['Habichuelas cocidas · ½ taza', 'p', 120, 7.5, 22, 0.5], ['Pollo a la plancha · 100 g', 'p', 165, 31, 0, 3.6],
  ['Pescado (filete) · 100 g', 'p', 110, 22, 0, 2], ['Huevo grande · 1', 'p', 72, 6.3, 0.4, 4.8],
  ['Nueces · 1 oz (≈ 14 mitades)', 'p', 185, 4, 4, 18], ['Pan integral · 1 rebanada', 'g', 70, 3.6, 12, 1],
  ['Batata (camote) · 1 mediana', 'g', 112, 2, 26, 0.1], ['Plátano maduro · 1 mediano', 'g', 180, 1.3, 47, 0.4],
  ['Brócoli · 1 taza', 'v', 31, 2.6, 6, 0.3], ['Ensalada verde · 1 taza', 'v', 10, 0.7, 2, 0.1],
  ['Manzana · 1 mediana', 'f', 95, 0.5, 25, 0.3], ['Guineo · 1 mediano', 'f', 105, 1.3, 27, 0.4],
  ['Aguacate · ½ unidad', 'f', 114, 1.4, 6, 10.5], ['Leche descremada · 1 taza', 'l', 83, 8.3, 12.2, 0.2],
  ['Yogur natural · 1 taza', 'l', 130, 9, 12, 3], ['Queso · 1 oz', 'l', 110, 7, 0.9, 9],
  ['Hamburguesa con pan · 1', '', 500, 25, 40, 25], ['Papas fritas · porción pequeña', '', 220, 2.7, 27, 11]
];
const NUT_EDU = {
  v: {t: 'Vegetales', d: 'Un cuarto del plato. Aportan fibra, vitaminas y minerales con pocas calorías.', ej: 'Brócoli, espinaca, ensalada verde, zanahoria, berenjena, habichuelas tiernas.', porc: '≈ 1 taza'},
  f: {t: 'Frutas', d: 'Otro cuarto del plato. Dan fibra, vitamina C y potasio. Prefiérelas enteras en vez de jugo.', ej: 'Guineo, manzana, naranja, guayaba, papaya, uvas.', porc: '≈ 1 fruta mediana o 1 taza picada'},
  g: {t: 'Granos', d: 'Un cuarto del plato. Dale preferencia a los integrales: tienen más fibra y te llenan por más tiempo.', ej: 'Arroz integral, avena, pan integral, batata, quinoa, maíz.', porc: '≈ ½ a 1 taza cocida'},
  p: {t: 'Proteína', d: 'Un cuarto del plato. Ayuda a construir y reparar músculo. Escoge magras y prepara a la plancha o al horno.', ej: 'Pollo sin piel, pescado, huevo, habichuelas, tofu, nueces.', porc: '≈ 100 g (la palma de tu mano)'},
  l: {t: 'Lácteos', d: 'Aparte del plato. Aportan calcio y proteína. Escoge versiones bajas en grasa o sin azúcar añadida.', ej: 'Leche descremada, yogur natural, queso bajo en grasa.', porc: '≈ 1 taza de leche o yogur'}
};
function openFood(h, d, host) {
  const draw = el => {
    h.food = h.food || {}; const f = h.food[d] = h.food[d] || {f: 0, v: 0, g: 0, p: 0, l: 0, meals: {}}, g = FOOD_GOAL(h), n = (f.f || 0) + (f.v || 0), tot = ['f', 'v', 'g', 'p', 'l'].reduce((a, k) => a + (f[k] || 0), 0);
    const tk = x => (x.entries || []).reduce((a, en) => ({kcal: a.kcal + en.kcal, p: a.p + en.p, c: a.c + en.c, g: a.g + en.g}), {kcal: 0, p: 0, c: 0, g: 0}); const tt = tk(f); tt.p = Math.round(tt.p * 10) / 10; tt.c = Math.round(tt.c * 10) / 10; tt.g = Math.round(tt.g * 10) / 10;
    const ml = Object.values(f.meals || {}), sano = ml.filter(x => x === 'sano').length, tip = FOOD_TIPS[(parseISO(d).getDate() + parseISO(d).getMonth()) % FOOD_TIPS.length];
    el.querySelector('#fdBody').innerHTML = `
      <div class="fdplate">${plateSVG(f)}</div>
      <div class="wmsg">${n >= g ? '🎉 ¡Meta de frutas y vegetales cumplida!' : `Te ${g - n === 1 ? 'falta 1 porción' : `faltan ${g - n} porciones`} de frutas o vegetales`}</div>
      <div class="fdbtns"><button class="fdb veg" data-fa="v">🥦 Vegetal <b>+1</b></button><button class="fdb fruit" data-fa="f">🍎 Fruta <b>+1</b></button><button class="fdb grain" data-fa="g">🍚 Granos <b>+1</b></button><button class="fdb prot" data-fa="p">🍗 Proteína <b>+1</b></button><button class="fdb dairy" data-fa="l">🥛 Lácteo <b>+1</b></button><button class="wsmall" id="fdM" ${tot ? '' : 'disabled'} aria-label="Quitar una">−1</button></div>
      <div class="prcard"><div class="bknh"><b>¿Cómo comiste hoy?</b>${ml.length ? `<span>${sano} de ${ml.length} sanas</span>` : ''}</div>
        ${MEALS.map(([k, n2]) => `<div class="fdmeal"><span>${n2}</span><div class="fdst">${MEAL_ST.map(([sk, e, lbl]) => `<button data-ml="${k}" data-ms="${sk}" class="${f.meals[k] === sk ? 'on ' + sk : ''}" aria-label="${lbl}" title="${lbl}">${e}</button>`).join('')}</div></div>`).join('')}
        <small class="hint">🥗 Sano · 😐 Regular · 🍔 Comida rápida. Toca otra vez para quitar.</small></div>
      <div class="fdedu" id="fdEdu">${(() => { const k = UI.foodSec || 'v', e = NUT_EDU[k]; return `<div class="fdedu-h">${e.t} <small>· ${e.porc}</small></div><p>${e.d}</p><small class="muted">Ejemplos: ${e.ej}</small>`; })()}</div>
      <div class="fdtot"><b>Hoy</b> ${tt.kcal} kcal · Proteína ${tt.p} g · Carbohidratos ${tt.c} g · Grasa ${tt.g} g</div>
      <button class="btn sec sm fdadd" id="fdAdd">+ Registrar comida con foto o alimento</button>
      ${(f.entries || []).length ? `<div class="fdlist">${f.entries.map(en => `<div class="fdrow">${en.photo ? `<img src="${en.photo}" alt="">` : `<span class="fdno">🍽️</span>`}<div class="fdt"><b>${esc(en.name)}</b><small>${MEALS.find(m => m[0] === en.meal)?.[1] || ''} · ${en.q} · ${en.kcal} kcal · P ${en.p} g · C ${en.c} g · G ${en.g} g</small></div><button class="wrdel" data-fdel="${en.id}" aria-label="Quitar"><i class="xdel"></i></button></div>`).join('')}</div>` : ''}
      <div class="fdtip">💡 ${tip}</div>
      <button class="acgoal" id="fdG">Meta: <b>${g} porciones al día</b> <span>Cambiar ✎</span></button>`;
    const q = x => el.querySelector(x);
    const setLog = () => { h.log = h.log || {}; const t = (f.f || 0) + (f.v || 0); if (t) h.log[d] = t; else delete h.log[d]; save('habits'); };
    el.querySelectorAll('[data-fa]').forEach(b => b.onclick = () => { if (d > todayISO()) { toast('Ese día todavía no llega'); return; } const was = habDone(h, d), k = b.dataset.fa; f[k] = (f[k] || 0) + 1; f.order = (f.order || '') + k; setLog(); if (!was && habDone(h, d)) toast('🥗 ¡Meta cumplida! Sigue así'); draw(el); });
    q('#fdM').onclick = () => { const last = (f.order || '').slice(-1); const k = f[last] ? last : ['v', 'f', 'g', 'p', 'l'].find(x => f[x]); if (k) f[k]--; f.order = (f.order || '').slice(0, -1); setLog(); draw(el); };
    el.querySelectorAll('[data-ml]').forEach(b => b.onclick = () => { const k = b.dataset.ml; f.meals[k] = f.meals[k] === b.dataset.ms ? undefined : b.dataset.ms; if (!f.meals[k]) delete f.meals[k]; save('habits'); draw(el); });
    el.querySelectorAll('[data-sec]').forEach(pth => pth.onclick = () => { UI.foodSec = pth.dataset.sec; draw(el); });
    const r1 = x => Math.round(x * 10) / 10;
    const pickPhoto = file => new Promise(res => { const img = new Image(), url = URL.createObjectURL(file); img.onload = () => { const sc = Math.min(1, 260 / Math.max(img.width, img.height)), c = document.createElement('canvas'); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', .6)); }; img.onerror = () => res(null); img.src = url; });
    const openAdd = () => {
      if (d > todayISO()) { toast('Ese día todavía no llega'); return; }
      const hr = new Date().getHours(), defMeal = hr < 11 ? 'desayuno' : hr < 16 ? 'almuerzo' : 'cena';
      let meal = defMeal, qty = 1, photo = null;
      const sh = openSheet({title: 'Registrar comida', body: `
        <div class="fld"><label>¿Cuál comida?</label><div class="chchips">${MEALS.map(([k, n2]) => `<button type="button" data-nm="${k}" class="${k === meal ? 'on' : ''}">${n2}</button>`).join('')}</div></div>
        <div class="fld"><label>Alimento</label><select class="inp" id="nfF">${NUT_FOODS.map((x, i) => `<option value="${i}">${x[0]}</option>`).join('')}</select></div>
        <div class="fld"><label>Porciones</label><div class="habgoal"><button type="button" class="btn sec sm" id="nfM">−</button><b id="nfQv">1</b><button type="button" class="btn sec sm" id="nfP">+</button></div></div>
        <div class="fld"><label>Foto (opcional)</label><input class="inp" type="file" accept="image/*" capture="environment" id="nfPh"><img id="nfImg" class="nfimg" alt="" hidden></div>
        <div class="nfres" id="nfRes"></div>
        <small class="hint">Valores aproximados por porción. Para exactitud, usa la etiqueta del producto.</small>`,
        foot: '<button class="btn" id="nfS">Guardar comida</button>',
        onMount: sel => {
          const qq = x => sel.querySelector(x);
          const upd = () => { const food = NUT_FOODS[+qq('#nfF').value]; qq('#nfQv').textContent = qty; qq('#nfRes').innerHTML = `<b>${Math.round(food[2] * qty)} kcal</b> · Proteína ${r1(food[3] * qty)} g · Carbohidratos ${r1(food[4] * qty)} g · Grasa ${r1(food[5] * qty)} g`; };
          sel.querySelectorAll('[data-nm]').forEach(b => b.onclick = () => { meal = b.dataset.nm; sel.querySelectorAll('[data-nm]').forEach(x => x.classList.toggle('on', x === b)); });
          qq('#nfF').onchange = upd;
          qq('#nfM').onclick = () => { qty = Math.max(0.5, qty - 0.5); upd(); };
          qq('#nfP').onclick = () => { qty = qty + 0.5; upd(); };
          qq('#nfPh').onchange = async e => { const file = e.target.files[0]; if (!file) return; photo = await pickPhoto(file); const im = qq('#nfImg'); if (photo) { im.src = photo; im.hidden = false; } };
          qq('#nfS').onclick = () => {
            const food = NUT_FOODS[+qq('#nfF').value], sec = food[1], en = {id: uid(), meal, name: food[0], sec, q: qty, kcal: Math.round(food[2] * qty), p: r1(food[3] * qty), c: r1(food[4] * qty), g: r1(food[5] * qty), photo: photo || undefined, at: Date.now(), secN: 0};
            if (sec) { en.secN = Math.max(1, Math.round(qty)); f[sec] = (f[sec] || 0) + en.secN; f.order = (f.order || '') + sec.repeat(en.secN); }
            f.entries = f.entries || []; f.entries.push(en); save('habits'); setLog(); sh.close(); toast('Comida guardada'); draw(el);
          };
          upd();
        }});
    };
    const fa = el.querySelector('#fdAdd'); if (fa) fa.onclick = openAdd;
    el.querySelectorAll('[data-fdel]').forEach(b => b.onclick = () => { const en = (f.entries || []).find(x => x.id === b.dataset.fdel); if (!en) return; f.entries = f.entries.filter(x => x !== en); if (en.sec && en.secN) { f[en.sec] = Math.max(0, (f[en.sec] || 0) - en.secN); for (let i = 0; i < en.secN; i++) f.order = (f.order || '').replace(new RegExp(en.sec + '(?=[^' + en.sec + ']*$)'), ''); } save('habits'); setLog(); draw(el); });
    q('#fdG').onclick = async () => { const v = await pickNumber(g, {min: 1, max: 12, unit: 'porciones', title: 'Frutas y vegetales al día'}); if (v) { h.goal = v; setLog(); draw(el); } };
  };
  hostOrSheet(host, {title: `${h.icon} ${esc(h.name)}`, cls: 'foodsheet', body: '<div id="fdBody"></div>', onMount: draw, onClose: () => { if (UI.view === 'habitos') renderView(); }});
}

const durTxt = m => m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ''}`;

const retoHabits = () => (S.habits || []).filter(h => h.challenge && h.challenge.vals && Object.keys(h.challenge.marked || {}).length < h.challenge.vals.length && !(pins().noReto || []).includes(h.id));

const ENV_SVG = '<svg class="envi" viewBox="0 0 40 28" aria-hidden="true"><rect x="1.5" y="1.5" width="37" height="25" rx="3" fill="var(--envf,none)" stroke="currentColor" stroke-width="2.4"/><path d="M2.5 3l17.5 13 17.5-13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg>';
const rng = (a, b, f = x => x) => Array.from({length: b - a + 1}, (_, i) => f(a + i));
const CH_READY = [
  {cols: 10, name: 'Reto de los 100 sobres', sub: '$1 al $100 · un sobre al día', freq: 'dia', view: 'sobres', vals: () => rng(1, 100)},
  {cols: 10, name: 'Reto de los 50 sobres', sub: '$1 al $50 · un sobre al día', freq: 'dia', view: 'sobres', vals: () => rng(1, 50)},
  {cols: 7, name: 'Reto de 52 semanas', sub: '$1 la 1.ª semana… $52 la última', freq: 'semana', view: 'circulos', vals: () => rng(1, 52)},
  {cols: 7, name: '$1,000 en un año', title: '$1,000', sub: '$20 cada semana · 50 semanas', freq: 'semana', view: 'circulos', vals: () => Array(50).fill(20)},
  {cols: 7, name: '$800 en 36 días', title: '$800 en 36 días', sub: 'De $10 a $40 cada día', freq: 'dia', view: 'circulos', vals: () => [20, 10, 15, 20, 25, 20, 25, 10, 25, 15, 20, 30, 20, 10, 30, 15, 20, 25, 40, 15, 10, 40, 25, 30, 20, 10, 15, 30, 30, 10, 30, 40, 25, 20, 40, 15]},
  {cols: 7, name: '$1,000 en 30 días', title: '$1,000 en 30 días', sub: 'Cantidades variadas cada día', freq: 'dia', view: 'circulos', vals: () => chValues(1000, 30, 'variado')},
  {cols: 7, name: '$500 en 100 días', title: '$500', sub: 'Cantidades variadas · 100 días', freq: 'dia', view: 'circulos', vals: () => chValues(500, 100, 'variado')},
  {name: '$1,200 en 12 meses', title: '$1,200', sub: '$100 cada mes', freq: 'mes', view: 'circulos', vals: () => Array(12).fill(100)}
];

const CH_COLORS = ['#d99400', '#f5b301', '#f08a24', '#e5383b', '#b91c1c', '#c2185b', '#ec4899', '#f472b6', '#a855f7', '#6d28d9', '#4f46e5', '#2f7de1', '#0ea5e9', '#0891b2', '#0f9d8f', '#14b8a6', '#2e9d5b', '#65a30d', '#795548', '#475569', '#111827'];// Sobre abierto (sin marcar) o cerrado con la cantidad escrita dentro
function envSVG(open, amt) {
  if (open) return '<svg class="envi open" viewBox="0 0 44 40" aria-hidden="true"><path d="M3 17L22 3l19 14" fill="var(--chl,#fff4d6)" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><rect x="2" y="16" width="40" height="22" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M3 17l19 12 19-12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" opacity=".55"/></svg>';
  return `<svg class="envi shut" viewBox="0 0 44 40" aria-hidden="true"><rect x="2" y="10" width="40" height="28" rx="3" fill="var(--chc,#d99400)" stroke="var(--chc,#d99400)" stroke-width="2.2"/><path d="M3 11l19 13 19-13" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" opacity=".8"/><text x="22" y="35" text-anchor="middle" font-size="${amt.length > 4 ? 9 : 11}" font-weight="800" fill="#fff" font-family="Roboto Condensed,Arial Narrow,sans-serif">${amt}</text></svg>`;
}

const CH_SPANS = [[1, '1 mes'], [3, '3 meses'], [6, '6 meses'], [12, '1 año'], [24, '2 años']];
const spanCount = (m, f) => f === 'mes' ? m : f === 'quin' ? Math.round(m * 52 / 12 / 2) : f === 'semana' ? Math.round(m * 52 / 12) : (m % 12 === 0 ? m / 12 * 365 : Math.round(m * 30.42));

/* ===== 📌 Fijados: acceso rápido que se abre deslizando ===== */
const pins = () => { S.settings.pins = S.settings.pins || {hoy: true, cal: false, habs: [], noReto: []}; return S.settings.pins; };
const pinItems = () => { const P = pins(); P.items = P.items || []; return P.items; };
const itemExists = k => { const id = k.slice(3); if (k.startsWith('tk:')) return S.tasks.some(x => x.id === id); if (k.startsWith('nt:')) return S.notes.some(x => x.id === id); if (k.startsWith('cd:')) return (S.settings.countdowns || []).some(x => x.id === id); return false; };
function isPinnedKey(k) {
  if (k.startsWith('hab:')) return (pins().habs || []).includes(k.slice(4));
  if (k.startsWith('list:')) { const l = S.lists.find(x => x.id === k.slice(5)); return !!l && !l.hideOnDay; }
  return pinItems().includes(k);
}
function togglePinKey(k, quiet = false) {
  const was = isPinnedKey(k), P = pins();
  if (k.startsWith('hab:')) { const id = k.slice(4); P.habs = (P.habs || []).filter(x => x !== id); if (!was) P.habs.push(id); save('meta'); }
  else if (k.startsWith('list:')) { const l = S.lists.find(x => x.id === k.slice(5)); if (l) { l.hideOnDay = was; save('lists'); } }
  else { P.items = pinItems().filter(x => x !== k); if (!was) P.items.push(k); save('meta'); }
  if (!quiet) toast(was ? 'Quitado de fijados' : 'Fijado');
  listBadge();
}
function pinItemView(k) {
  const id = k.slice(3);
  if (k.startsWith('tk:')) { const t = S.tasks.find(x => x.id === id); if (!t) return null; return {title: t.title, pill: t.status || '', html: `<div class="small muted" style="padding:10px 4px">${fmtLong(t.date)}${t.time ? ' · ' + fmtTime(t.time) : ''}</div>`, open: () => openTaskDetail(id)}; }
  if (k.startsWith('nt:')) { const n = S.notes.find(x => x.id === id); if (!n) return null; return {title: noteTitle(n), pill: fmtShort(n.date), html: `<div class="small" style="padding:10px 4px;white-space:pre-wrap">${esc(n.text).slice(0, 300)}</div>`, open: () => openNote(id)}; }
  if (k.startsWith('cd:')) { const c = (S.settings.countdowns || []).find(x => x.id === id); if (!c) return null; const n = dayDiff(todayISO(), c.date); return {title: c.name, pill: n === 0 ? 'Hoy' : `${Math.abs(n)} ${n < 0 ? 'días desde' : 'días para'}`, html: `<div class="small muted" style="padding:10px 4px">${fmtShort(c.date)}</div>`, open: () => openCountdownForm(c)}; }
  return null;
}
const pinHabits = () => (pins().habs || []).map(id => (S.habits || []).find(h => h.id === id)).filter(Boolean);
function hostOrSheet(host, o) {
  if (!host) return openSheet(o);
  host.className = 'pinhost ' + (o.cls || ''); host.innerHTML = o.body; o.onMount && o.onMount(host);
  return {el: host, close() {}};
}
function pinHabit(h, host, redraw) {
  const d = todayISO(), k = habKind(h);
  const fn = {agua: openWater, lectura: openBook, ahorro: openSave, despertar: openWake, comida: openFood}[k] || (isTimeKind(h) ? openTimer : null);
  if (fn) return fn(h, d, host);
  const ok = habDone(h, d);
  host.className = 'pinhost';
  host.innerHTML = `<div class="pinmark"><button class="pinbig ${ok ? 'on' : ''}" id="pmB" style="--hc:${h.color}"><span>${h.icon}</span>${ok ? '<em>✓</em>' : ''}</button><b>${esc(h.name)}</b><small>${ok ? '¡Hecho hoy! Toca para desmarcar' : 'Toca para marcarlo como hecho'}</small><div class="pinst">🔥 ${habStreak(h, d)} días seguidos · ${habTotal(h)} en total</div></div>`;
  host.querySelector('#pmB').onclick = () => { habTap(h, d); redraw(); };
}
function pinCalendar(box) {
  UI.pinDay = UI.pinDay || todayISO();
  const d = UI.pinDay, m = parseISO(d), cells = monthCells(iso(new Date(m.getFullYear(), m.getMonth(), 1))), t = todayISO();
  const its = sortedDay(d, {withDone: true});
  box.innerHTML = `<div class="pcal">
    <div class="pcalh"><button class="iconbtn" id="pcP" aria-label="Mes anterior">‹</button><b>${cap(MESES[m.getMonth()])} ${m.getFullYear()}</b><button class="iconbtn" id="pcN" aria-label="Mes siguiente">›</button></div>
    <div class="pcalg">${wdHeaders().map(w => `<span class="wd">${w.slice(0, 1)}</span>`).join('')}${cells.map(c => { const n = sortedDay(c).length, st = daySticker(c), out = parseISO(c).getMonth() !== m.getMonth(); return `<button data-pcd="${c}" class="${c === d ? 'sel' : ''} ${c === t ? 'today' : ''} ${out ? 'out' : ''}">${parseISO(c).getDate()}${st ? `<i class="st">${st}</i>` : n ? '<i class="dt"></i>' : ''}</button>`; }).join('')}</div>
    <div class="pcald"><b>${d === t ? 'Hoy' : cap(fmtLong(d))}</b><span>${its.length ? its.length + ' cosas' : 'Libre'}</span></div>
    <div class="qrows">${its.map(i => { const x = i.x, title = i.k === 'rt' ? x.name : x.title, tm = i.k === 'ev' ? (x.allDay || x.date !== d ? 'Todo el día' : fmtTime(x.start)) : i.k === 'tk' ? (x.time ? fmtTime(x.time) : '') : fmtTime(x.start); return `<div class="qrow ${i.k === 'tk' && isDone(x) ? 'done' : ''}" ${i.k === 'tk' ? `data-pctk="${x.id}"` : i.k === 'ev' ? `data-pcev="${x.id}"` : ''} role="button" tabindex="0">${i.k === 'tk' ? '<span class="qbox"></span>' : `<span class="pcdot" style="background:${colorOf(i.k, x)}"></span>`}<span class="qtx">${esc(title)}${tm ? ` <span class="qtime">${tm}</span>` : ''}</span></div>`; }).join('') || '<div class="qempty">✓ Nada para este día</div>'}</div>
    <div class="qadd"><input id="pcAdd" placeholder="Añadir a este día…" maxlength="200" autocomplete="off"><button class="btn" id="pcBtn" aria-label="Añadir">+</button></div>
    <div class="row qfoot"><span class="sp"></span><button class="btn ghost sm" id="pcGo">Abrir calendario ›</button></div></div>`;
  const q = x => box.querySelector(x), redraw = () => pinCalendar(box);
  q('#pcP').onclick = () => { const x = parseISO(d); x.setMonth(x.getMonth() - 1, 1); UI.pinDay = iso(x); redraw(); };
  q('#pcN').onclick = () => { const x = parseISO(d); x.setMonth(x.getMonth() + 1, 1); UI.pinDay = iso(x); redraw(); };
  box.querySelectorAll('[data-pcd]').forEach(b => b.onclick = () => { UI.pinDay = b.dataset.pcd; redraw(); });
  box.querySelectorAll('[data-pctk]').forEach(r => r.onclick = () => { const x = S.tasks.find(y => y.id === r.dataset.pctk); setDone(x.id, !isDone(x)); setTimeout(redraw, 120); });
  box.querySelectorAll('[data-pcev]').forEach(r => r.onclick = () => openEventDetail(r.dataset.pcev));
  const add = () => { const raw = q('#pcAdd').value.trim(); if (!raw) { q('#pcAdd').focus(); return; } const g = guess(raw); S.tasks.push({id: uid(), title: raw, date: d, time: g.time, typeId: g.typeId, areaId: g.areaId, priority: 'Media', details: '', steps: [], status: 'Pendiente', obs: '', reminder: null, createdAt: Date.now()}); save('tasks'); toast('Añadido'); redraw(); };
  q('#pcBtn').onclick = add; q('#pcAdd').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); add(); } };
  q('#pcGo').onclick = () => { UI.calDate = UI.selDate = d; go('calendario'); };
  const pop = box.closest('.qcard .sh-body > div'); if (pop) addUnpin(pop);
}
function openPinManager(done) {
  const P = pins(), retos = (S.habits || []).filter(h => h.challenge && h.challenge.vals);
  const row = (key, icon, name, on, sub = '') => `<label class="wrsw pinrow"><span><b>${icon} ${esc(name)}</b>${sub ? `<small>${sub}</small>` : ''}</span><input type="checkbox" data-pk="${key}" ${on ? 'checked' : ''}><i></i></label>`;
  const s = openSheet({title: 'Fijar en el acceso rápido', body: `<p class="hint" style="margin-top:0">
    <div class="pingrp"><b>Básicos</b>${row('hoy', '☀️', 'Hoy', P.hoy !== false, 'Tareas de hoy')}${row('cal', '📅', 'Calendario', !!P.cal, 'Mes y cosas del día')}</div>
    ${S.lists.length ? `<div class="pingrp"><b>Listas</b>${S.lists.map(l => row('list:' + l.id, l.icon, l.name, !l.hideOnDay)).join('')}</div>` : ''}
    ${(S.habits || []).length ? `<div class="pingrp"><b>Hábitos</b>${S.habits.map(h => row('hab:' + h.id, h.icon, h.name, (P.habs || []).includes(h.id))).join('')}</div>` : ''}
    ${retos.length ? `<div class="pingrp"><b>Retos de ahorro</b>${retos.map(h => row('reto:' + h.id, '🏆', h.challenge.name, !(P.noReto || []).includes(h.id))).join('')}</div>` : ''}`,
    foot: '<button class="btn" data-close>Listo</button>',
    onClose: () => { done && done(); },
    onMount: el => el.querySelectorAll('[data-pk]').forEach(c => c.onchange = () => {
      const k = c.dataset.pk, on = c.checked, P2 = pins();
      if (k === 'hoy') P2.hoy = on; else if (k === 'cal') P2.cal = on;
      else if (k.startsWith('list:')) { const l = S.lists.find(x => 'list:' + x.id === k); if (l) { l.hideOnDay = !on; save('lists'); } }
      else if (k.startsWith('hab:')) { const id = k.slice(4); P2.habs = (P2.habs || []).filter(x => x !== id); if (on) P2.habs.push(id); }
      else if (k.startsWith('reto:')) { const id = k.slice(5); P2.noReto = (P2.noReto || []).filter(x => x !== id); if (!on) P2.noReto.push(id); }
      save('meta'); toast(on ? 'Fijado' : 'Quitado del acceso rápido');
    })});
}
// Deslizar desde el borde derecho abre los fijados
(function edgeSwipe() {
  let sx = null, sy = 0, st = 0;
  document.addEventListener('touchstart', e => { const t = e.touches[0]; sx = t.clientX > window.innerWidth - 28 && !sheets.length ? t.clientX : null; sy = t.clientY; st = Date.now(); }, {passive: true});
  document.addEventListener('touchmove', e => { if (sx == null) return; const t = e.touches[0], dx = sx - t.clientX, dy = Math.abs(t.clientY - sy); if (dy > 40) { sx = null; return; } if (dx > 55 && Date.now() - st < 800) { sx = null; openListsPopup(); } }, {passive: true});
  document.addEventListener('touchend', () => { sx = null; }, {passive: true});
})();

/* Fila de fijados debajo de los días en Mi Día */
function pinChips() {
  const t = todayISO(), P = pins(), out = [];
  if (P.cal) out.push(['cal', '📅', 'Calendario', '']);
  S.lists.filter(l => !l.hideOnDay).forEach(l => { const n = l.items.filter(i => !i.done).length; out.push([l.id, l.icon, l.name, n ? n : '']); });
  retoHabits().forEach(h => { const ch = h.challenge; out.push(['reto:' + h.id, '🏆', 'Reto', `${Object.keys(ch.marked || {}).length}/${ch.vals.length}`]); });
  pinHabits().forEach(h => { const k = habKind(h), c = habCount(h, t); out.push(['hab:' + h.id, h.icon, h.name.split(' ').slice(0, 2).join(' '), habDone(h, t) ? '✓' : k === 'agua' ? `${c} oz` : isTimeKind(h) ? `${c} min` : '']); });
  return out.map(([k, ic, n, st]) => `<button class="pinchip" data-pin="${k}">${ic} <span>${esc(n)}</span>${st !== '' ? `<b>${st}</b>` : ''}</button>`).join('') + '<button class="pinchip add" data-pinmgr aria-label="Escoger qué fijar">📌 Fijar</button>';
}
function wirePinBar(v) {
  v.querySelectorAll('[data-pin]').forEach(b => b.onclick = () => { UI.popTab = b.dataset.pin; openListsPopup(); });
  v.querySelectorAll('[data-pinmgr]').forEach(b => b.onclick = () => openPinManager(() => renderView()));
}

// Orden de lo fijado en la ventana flotante (se pasa de uno a otro deslizando de lado)
function popKeys() {
  const P = pins();
  return [...(P.hoy === false ? [] : ['hoy']), ...S.lists.filter(l => !l.hideOnDay).map(l => l.id), ...retoHabits().map(h => 'reto:' + h.id), ...pinHabits().map(h => 'hab:' + h.id), ...(P.cal ? ['cal'] : []), ...pinItems().filter(itemExists)];
}
function popSwipe(box) {
  if (box._sw) return; box._sw = 1;
  let x0 = null, y0 = 0, t0 = 0, ok = true;
  box.addEventListener('touchstart', e => { const t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; t0 = Date.now(); ok = !e.target.closest('input,textarea,.wbot,.hscroll,.pcalg'); }, {passive: true});
  box.addEventListener('touchend', e => {
    if (x0 == null || !ok) return; const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0; x0 = null;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.7 || Date.now() - t0 > 700) return;
    const keys = popKeys(); if (keys.length < 2) return;
    const i = Math.max(0, keys.indexOf(UI.popTab)); UI.popTab = keys[(i + (dx < 0 ? 1 : -1) + keys.length) % keys.length];
    box.classList.remove('slideL', 'slideR'); void box.offsetWidth; box.classList.add(dx < 0 ? 'slideL' : 'slideR');
    dayLists(box); listBadge();
  }, {passive: true});
}

function habPill(h) {
  const d = todayISO(), k = habKind(h), c = habCount(h, d), g = habGoal(h);
  if (k === 'agua') return `${c}/${g} oz`;
  if (k === 'lectura') return `${c} pág.`;
  if (isTimeKind(h)) return `${c}/${g} min`;
  if (k === 'ahorro') return money(saveTotal(h));
  if (k === 'despertar') { const w = (h.woke || {})[d]; return w && w !== 'ok' ? fmtTime(w) : w ? '✓' : fmtTime(h.wakeAt || '06:00'); }
  if (k === 'comida') return `${c}/${g}`;
  return habDone(h, d) ? '1/1' : '0/1';
}
// Botón para quitar de fijados desde la misma ventana
function addUnpin(box) {
  const f = box.querySelector('.qtop'); if (!f || f.querySelector('[data-unpin]')) return;
  const b = document.createElement('button'); b.className = 'pinplus qunpin on'; b.textContent = '+'; b.dataset.unpin = UI.popTab; b.setAttribute('aria-label', 'Quitar de fijados'); b.title = 'Quitar de fijados';
  f.insertBefore(b, f.querySelector('[data-close]'));
  b.onclick = () => {
    const k = b.dataset.unpin, P = pins();
    if (k === 'hoy') P.hoy = false; else if (k === 'cal') P.cal = false;
    else if (k.startsWith('reto:')) { P.noReto = (P.noReto || []).filter(x => x !== k.slice(5)); P.noReto.push(k.slice(5)); }
    else if (/^(hab|tk|nt|cd):/.test(k)) togglePinKey(k, true);
    else { const l = S.lists.find(x => x.id === k); if (l) { l.hideOnDay = true; save('lists'); } }
    save('meta'); toast('Quitado de fijados'); if (box.dataset.fixkey) { UI.pinIdx = Math.max(0, (UI.pinIdx || 0) - 1); renderView(); return; } if (UI.view === 'dia') renderView();
    const keys = popKeys(); if (!keys.length) { const sh = sheets.find(x => x.el.contains(box)); sh && sh.close(); return; }
    UI.popTab = keys[0]; dayLists(box); listBadge();
  };
}

/* Fijados en Mi Día: una tarjeta a la vez, se pasan de lado */
function pinCardsHTML() {
  const keys = popKeys();
  if (!keys.length) return '<div class="pinhd"><b>Fijados</b><button class="btn ghost sm" data-pinmgr>Editar</button></div>';
  return `<div class="pinhd"><b>Fijados</b><span class="sp"></span><button class="btn ghost sm" data-pinmgr>Editar</button></div>
    <div class="pincards" id="pinCards">${keys.map(k => `<div class="pincard"><div class="pinbox" data-fixkey="${esc(k)}"></div></div>`).join('')}</div>
    ${keys.length > 1 ? `<div class="pindots">${keys.map((k, i) => `<i data-pdi="${i}"></i>`).join('')}</div>` : ''}`;
}
function wirePinCards(v) {
  v.querySelectorAll('[data-pinmgr]').forEach(b => b.onclick = () => openPinManager(() => renderView()));
  const wrap = v.querySelector('#pinCards'); if (!wrap) return;
  const keep = UI.popTab;
  wrap.querySelectorAll('.pinbox').forEach(b => dayLists(b));
  UI.popTab = keep;
  const n = wrap.children.length, dots = [...v.querySelectorAll('[data-pdi]')];
  UI.pinIdx = Math.min(UI.pinIdx || 0, n - 1);
  const mark = () => dots.forEach((d, i) => d.classList.toggle('on', i === UI.pinIdx));
  requestAnimationFrame(() => { wrap.scrollLeft = UI.pinIdx * wrap.clientWidth; mark(); });
  let t; wrap.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(() => { UI.pinIdx = Math.round(wrap.scrollLeft / wrap.clientWidth); mark(); }, 80); }, {passive: true});
  dots.forEach((d, i) => d.onclick = () => wrap.scrollTo({left: i * wrap.clientWidth, behavior: 'smooth'}));
}
