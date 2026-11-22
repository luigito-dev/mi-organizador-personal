/* ========== Ventanas emergentes ========== */
const sheets = [];
function openSheet({title = '', body = '', foot = '', cls = '', onMount, onClose, head = true, float = false}) {
  const ov = document.createElement('div'); ov.className = 'ov' + (float ? ' float' : '');
  ov.innerHTML = `<div class="sheet ${cls}" role="dialog" aria-modal="true"><div class="grab"></div>${head ? `<div class="sh-head"><h2>${title}</h2><button class="iconbtn" data-close aria-label="Cerrar">✕</button></div>` : ''}<div class="sh-body">${body}</div>${foot ? `<div class="sh-foot">${foot}</div>` : ''}</div>`;
  document.body.appendChild(ov);
  const api = {el: ov.firstElementChild, close: () => { ov.remove(); const i = sheets.indexOf(api); if (i >= 0) sheets.splice(i, 1); onClose && onClose(); }};
  ov.addEventListener('mousedown', e => { if (e.target === ov) api.downOut = true; });
  ov.addEventListener('click', e => { if (e.target === ov && api.downOut) api.close(); api.downOut = false; if (e.target.closest('[data-close]')) api.close(); });
  sheets.push(api);
  onMount && onMount(api.el, api);
  return api;
}
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sheets.length) sheets[sheets.length - 1].close(); });
function ask(msg, {yes = 'Eliminar', no = 'Cancelar', danger = true, extra} = {}) {
  return new Promise(res => {
    let done = false;
    const s = openSheet({title: 'Confirmar', cls: 'small', body: `<p style="margin:6px 0 4px">${msg}</p>`,
      foot: `<button class="btn sec" data-a="no">${no}</button>${extra ? `<button class="btn sec" data-a="extra">${extra}</button>` : ''}<button class="btn ${danger ? 'danger' : ''}" data-a="yes">${yes}</button>`,
      onClose: () => { if (!done) res(false); },
      onMount: el => el.addEventListener('click', e => { const a = e.target.closest('[data-a]'); if (!a) return; done = true; res(a.dataset.a === 'yes' ? true : a.dataset.a === 'extra' ? 'extra' : false); s.close(); })});
  });
}

/* ========== Rueda (reloj tipo iPhone) ========== */
function makeColumn(values, {circular = false, selected = 0, wide = false, labels}) {
  const n = values.length, REP = circular ? 21 : 1, H = 40;
  const col = document.createElement('div'); col.className = 'wcol' + (wide ? ' wide' : '');
  let html = '<div class="pad"></div>';
  for (let r = 0; r < REP; r++) values.forEach((v, i) => html += `<div class="wi" data-i="${i}">${esc(labels ? labels[i] : v)}</div>`);
  col.innerHTML = html + '<div class="pad"></div>';
  const mid = circular ? Math.floor(REP / 2) * n : 0;
  const api = {col, get value() { return values[api.index]; }, index: selected, onChange: null};
  const mark = () => { const items = col.querySelectorAll('.wi'); const ci = Math.round(col.scrollTop / H); items.forEach((it, k) => it.classList.toggle('sel', k === ci)); };
  api.set = (i, smooth) => { api.index = i; col.scrollTo({top: (mid + i) * H, behavior: smooth ? 'smooth' : 'auto'}); mark(); };
  let t;
  col.addEventListener('scroll', () => {
    mark(); clearTimeout(t);
    t = setTimeout(() => {
      let ci = Math.round(col.scrollTop / H); const i = ((ci % n) + n) % n;
      if (circular && Math.abs(ci - (mid + i)) >= n * 3) col.scrollTop = (mid + i) * H;
      if (api.index !== i) { api.index = i; api.onChange && api.onChange(i); }
      mark();
    }, 90);
  });
  col.addEventListener('click', e => {
    const it = e.target.closest('.wi'); if (!it) return;
    const all = Array.from(col.querySelectorAll('.wi')); const k = all.indexOf(it);
    col.scrollTo({top: k * H, behavior: 'smooth'});
  });
  requestAnimationFrame(() => api.set(selected));
  setTimeout(() => api.set(api.index), 30);
  return api;
}
// Devuelve una promesa con 'HH:MM' o null
function pickTime(current, {title = 'Elegir hora', durations, base} = {}) {
  return new Promise(res => {
    let h24 = 9, m = 0;
    if (current) { [h24, m] = current.split(':').map(Number); m = Math.round(m / 5) * 5; if (m === 60) { m = 0; h24 = (h24 + 1) % 24; } }
    const mins = Array.from({length: 12}, (_, i) => i * 5);
    let done = false;
    const s = openSheet({title, cls: 'small',
      body: (durations && base ? `<div class="quickdur">${[[30,'30 min'],[60,'1 h'],[90,'1 h 30'],[120,'2 h'],[180,'3 h']].map(([v, l]) => `<button class="chip" data-dur="${v}">${l}</button>`).join('')}</div>` : '') + `<div class="wheel" id="wh"></div>`,
      foot: `<button class="btn sec" data-close>Cancelar</button><button class="btn" id="okT">Listo</button>`,
      onClose: () => { if (!done) res(undefined); },
      onMount: el => {
        const wh = el.querySelector('#wh'); let H, M, A;
        if (S.settings.hour24) {
          H = makeColumn(Array.from({length: 24}, (_, i) => i), {circular: true, selected: h24, labels: Array.from({length: 24}, (_, i) => pad(i))});
        } else {
          const hs = Array.from({length: 12}, (_, i) => i + 1); H = makeColumn(hs, {circular: true, selected: ((h24 % 12) || 12) - 1});
          A = makeColumn(['a. m.', 'p. m.'], {selected: h24 < 12 ? 0 : 1});
        }
        M = makeColumn(mins, {circular: true, selected: m / 5, labels: mins.map(pad)});
        wh.append(H.col, M.col); if (A) wh.append(A.col);
        const read = () => { let hh; if (S.settings.hour24) hh = H.value; else { hh = H.value % 12; if (A.index === 1) hh += 12; } return pad(hh) + ':' + pad(M.value); };
        el.querySelector('#okT').onclick = () => { done = true; res(read()); s.close(); };
        el.querySelectorAll('[data-dur]').forEach(b => b.onclick = () => { done = true; res(fromMin(Math.min(toMin(base) + +b.dataset.dur, 23 * 60 + 55))); s.close(); });
      }});
  });
}
// Rueda para números (como el reloj). opts: min, max, step, dec (1 = un decimal), unit, title
function pickNumber(current, {min = 0, max = 100, step = 1, dec = 0, unit = '', title = 'Elegir número'} = {}) {
  return new Promise(res => {
    let done = false; const cur = Math.min(max, Math.max(min, +current || 0));
    const s = openSheet({title, cls: 'small', body: `<div class="wheel" id="wh"></div>`,
      foot: `<button class="btn sec" data-close>Cancelar</button><button class="btn" id="okN">Listo</button>`,
      onClose: () => { if (!done) res(undefined); },
      onMount: el => {
        const wh = el.querySelector('#wh'), ints = [];
        for (let v = Math.floor(min); v <= max; v += dec ? 1 : step) ints.push(v);
        const I = makeColumn(ints, {selected: Math.max(0, ints.indexOf(dec ? Math.floor(cur) : Math.round(cur / step) * step))});
        let D = null; wh.append(I.col);
        if (dec) { const ds = Array.from({length: dec === 2 ? 100 : 10}, (_, i) => i), f = dec === 2 ? 100 : 10; D = makeColumn(ds, {selected: Math.round((cur % 1) * f) % f, labels: ds.map(x => '.' + (dec === 2 ? pad(x) : x))}); wh.append(D.col); }
        if (unit === '$') { const U = document.createElement('div'); U.className = 'wunit'; U.textContent = '$'; wh.prepend(U); unit = ''; }
        if (unit) { const U = document.createElement('div'); U.className = 'wunit'; U.textContent = unit; wh.append(U); }
        const read = () => dec ? Math.round((I.value + D.value / (dec === 2 ? 100 : 10)) * 100) / 100 : I.value;
        window._numPick = {set: v => { I.set(Math.max(0, ints.indexOf(dec ? Math.floor(v) : v))); if (D) D.set(Math.round((v % 1) * (dec === 2 ? 100 : 10))); }};
        el.querySelector('#okN').onclick = () => { done = true; res(read()); s.close(); };
      }});
  });
}
// Cualquier <input data-wheel> se llena con la rueda en vez del teclado
document.addEventListener('click', async e => {
  const inp = e.target.closest && e.target.closest('input[data-wheel]'); if (!inp) return;
  e.preventDefault(); inp.blur();
  const o = inp.dataset; const v = await pickNumber(parseFloat(inp.value) || +o.def || 0, {min: +(o.min || 0), max: +(o.max || 100), step: +(o.step || 1), dec: +(o.dec || 0), unit: o.unit || '', title: o.title || 'Elegir número'});
  if (v === undefined) return;
  inp.value = v === 0 && o.blank ? '' : v;
  inp.dispatchEvent(new Event('input', {bubbles: true})); inp.dispatchEvent(new Event('change', {bubbles: true}));
}, true);
function pickReminder(current) {
  return new Promise(res => {
    let done = false; const idx = Math.max(0, REMINDERS.findIndex(r => r[0] === current));
    const s = openSheet({title: '¿Cuándo te aviso?', cls: 'small', body: `<div class="wheel" id="wh"></div>`,
      foot: `<button class="btn sec" data-close>Cancelar</button><button class="btn" id="okR">Listo</button>`,
      onClose: () => { if (!done) res(undefined); },
      onMount: el => {
        const C = makeColumn(REMINDERS.map(r => r[0]), {selected: idx, wide: true, labels: REMINDERS.map(r => r[1])});
        el.querySelector('#wh').append(C.col);
        el.querySelector('#okR').onclick = () => { done = true; res(C.value); s.close(); };
      }});
  });
}
// Campanita: estado en obj.reminder (null = apagado). onSave opcional para guardar al instante.
function bellHTML(val) {
  const on = val != null;
  return `<button type="button" class="bellrow ${on ? 'on' : ''}" data-bell aria-label="Recordatorio"><span class="b">🔔</span><span class="switch ${on ? 'on' : ''}"></span>${on ? `<span class="lbl">${remLabel(val)}</span>` : ''}</button>`;
}
function wireBell(root, obj, onSave) {
  const btn = root.querySelector('[data-bell]'); if (!btn) return;
  const paint = () => { btn.outerHTML = bellHTML(obj.reminder); wireBell(root, obj, onSave); };
  btn.onclick = async e => {
    const onSwitch = e.target.closest('.switch');
    if (obj.reminder != null && onSwitch) { obj.reminder = null; paint(); onSave && onSave(); return; }
    const v = await pickReminder(obj.reminder ?? 0);
    if (v === undefined) return;
    obj.reminder = v; paint(); onSave && onSave();
    if (window.NATIVE) NATIVE.ensurePermission();
  };
}

/* ========== Formulario de TAREA ========== */
function typeButtons(sel) {
  return S.types.map(t => `<button type="button" class="opt ${t.id === sel ? 'on' : ''}" data-type="${t.id}" style="${t.id === sel ? `border-color:${t.color};background:${t.color}22;color:${t.color}` : ''}">${t.icon} ${esc(t.name)}</button>`).join('') +
    `<button type="button" class="opt" data-newtype>+ Nuevo tipo</button><button type="button" class="opt" data-edittypes>✎ Editar tipos</button>`;
}
function areaButtons(sel) {
  return `<button type="button" class="opt ${!sel ? 'on' : ''}" data-area="">Ninguna</button>` +
    S.areas.map(a => `<button type="button" class="opt ${a.id === sel ? 'on' : ''}" data-area="${a.id}" style="${a.id === sel ? `border-color:${a.color};background:${a.color}22;color:${a.color}` : ''}"><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</button>`).join('');
}
function openTaskForm(task, preset = {}) {
  const editing = !!task;
  const t = task ? JSON.parse(JSON.stringify(task)) : {id: uid(), title: preset.title || '', date: preset.date || todayISO(), time: preset.time || null, typeId: preset.typeId || 'pendiente', areaId: preset.areaId || null, priority: 'Media', details: '', steps: [], status: 'Pendiente', obs: '', reminder: null, createdAt: Date.now()};
  const dateMode = () => t.date === todayISO() ? 'hoy' : t.date === addDays(todayISO(), 1) ? 'man' : 'otra';
  const body = `
    ${editing ? '' : `<div class="toggle2"><button type="button" data-sw="ev">📅 Evento</button><button type="button" class="on">✅ Tarea</button></div>`}
    <input class="inp title" id="tTitle" placeholder="¿Qué tienes que hacer?" value="${esc(t.title)}" maxlength="140">
    <div class="fld"><label>¿Para cuándo?</label><div class="opts" id="tWhen">
      <button type="button" class="opt" data-w="hoy">Hoy</button><button type="button" class="opt" data-w="man">Mañana</button><button type="button" class="opt" data-w="otra">Otra fecha</button>
      <input type="date" class="inp" id="tDate" style="width:auto;padding:6px 10px" value="${t.date}"></div></div>
    <div class="fld row" id="tTimeRow" style="flex-wrap:nowrap"></div>
    <div class="fld"><label>Tipo</label><div class="opts hscroll" id="tTypes"></div></div>
    <div class="fld"><label>Área</label><div class="opts hscroll" id="tAreas"></div></div>
<div class="fld"><label>Sticker en el calendario</label><div class="opts hscroll stk" id="tStk"></div></div>
    <div class="fld"><label>Prioridad</label><div class="seg full" id="tPrio">${PRIOS.map(p => `<button type="button" class="opt" data-p="${p}">${p}</button>`).join('')}</div></div>
    <details class="fold" ${t.details ? 'open' : ''}><summary>Añadir más detalles</summary>
      <div class="fld"><label>¿De qué se trata?</label><textarea class="inp" id="tDet" placeholder="Escribe aquí… Usa “+ Añadir” para crear pasos con •">${esc(t.details)}</textarea>
      <button type="button" class="btn ghost sm" id="tAddLine">+ Añadir</button></div></details>
    ${editing ? `<div class="fld"><label>Estado</label><div class="opts" id="tStatus">${['Pendiente','En progreso','Completada'].map(s => `<button type="button" class="opt" data-s="${s}">${s}</button>`).join('')}</div></div>
    <div class="fld"><label>Observaciones</label><textarea class="inp" id="tObs">${esc(t.obs)}</textarea></div>` : ''}`;
  const s = openSheet({title: editing ? 'Editar tarea' : 'Nueva tarea', body,
    foot: `<button class="btn sec" data-close>Cancelar</button><button class="btn" id="tSave">${editing ? 'Guardar cambios' : 'Guardar tarea'}</button>`,
    onMount: el => {
      const paintWhen = () => { el.querySelectorAll('[data-w]').forEach(b => b.classList.toggle('on', b.dataset.w === dateMode())); el.querySelector('#tDate').style.display = dateMode() === 'otra' ? '' : 'none'; el.querySelector('#tDate').value = t.date; };
      el.querySelectorAll('[data-w]').forEach(b => b.onclick = () => {
        if (b.dataset.w === 'hoy') t.date = todayISO(); else if (b.dataset.w === 'man') t.date = addDays(todayISO(), 1);
        else { if (dateMode() !== 'otra') t.date = addDays(todayISO(), 2); paintWhen(); const di = el.querySelector('#tDate'); try { di.showPicker && di.showPicker(); } catch (e) {} return; }
        paintWhen();
      });
      el.querySelector('#tDate').onchange = e => { if (e.target.value) t.date = e.target.value; paintWhen(); };
      paintWhen();
      const paintTime = () => {
        el.querySelector('#tTimeRow').innerHTML = (t.time ? `<button type="button" class="chip on" id="tTimeBtn">🕒 ${fmtTime(t.time)}</button><button type="button" class="btn ghost sm" id="tNoTime" title="Quitar hora" aria-label="Quitar hora" style="padding:6px 8px">✕<span class="qh"> Quitar hora</span></button>` : `<button type="button" class="btn sec sm" id="tTimeBtn">🕒 Añadir hora</button>`) + `<span class="sp"></span>` + bellHTML(t.reminder);
        el.querySelector('#tTimeBtn').onclick = async () => {
          const nh = pad((new Date().getHours() + 1) % 24) + ':00';
          const v = await pickTime(t.time || nh, {title: 'Hora'}); if (v) { t.time = v; paintTime(); }
        };
        const nt = el.querySelector('#tNoTime'); if (nt) nt.onclick = () => { t.time = null; paintTime(); };
        wireBell(el.querySelector('#tTimeRow'), t);
      };
      paintTime();
      const paintTypes = () => {
        el.querySelector('#tTypes').innerHTML = typeButtons(t.typeId);
        el.querySelectorAll('[data-type]').forEach(b => b.onclick = () => { t.typeId = b.dataset.type; paintTypes(); });
        el.querySelector('[data-newtype]').onclick = () => openTypeForm(null, nt => { t.typeId = nt.id; paintTypes(); });
        el.querySelector('[data-edittypes]').onclick = () => openTypesManager(() => { if (!S.types.some(x => x.id === t.typeId)) t.typeId = S.types[0].id; paintTypes(); });
      };
      paintTypes();
      const paintAreas = () => { el.querySelector('#tAreas').innerHTML = areaButtons(t.areaId); el.querySelectorAll('[data-area]').forEach(b => b.onclick = () => { t.areaId = b.dataset.area || null; paintAreas(); }); };
      paintAreas();
      const paintPrio = () => el.querySelectorAll('[data-p]').forEach(b => { b.classList.toggle('on', b.dataset.p === t.priority); b.onclick = () => { t.priority = b.dataset.p; paintPrio(); }; });
      paintPrio();
      wireStickers(el.querySelector('#tStk'), t);
      if (editing) { const ps = () => el.querySelectorAll('[data-s]').forEach(b => { b.classList.toggle('on', b.dataset.s === t.status); b.onclick = () => { t.status = b.dataset.s; ps(); }; }); ps(); }
      el.querySelector('#tAddLine').onclick = () => { const ta = el.querySelector('#tDet'); ta.value = ta.value.replace(/\s*$/, '') + (ta.value.trim() ? '\n' : '') + '• '; ta.focus(); ta.selectionStart = ta.selectionEnd = ta.value.length; };
      const sw = el.querySelector('[data-sw]'); if (sw) sw.onclick = () => { const title = el.querySelector('#tTitle').value; s.close(); openEventForm(null, {title, date: t.date, start: t.time}); };
      el.querySelector('#tSave').onclick = () => {
        t.title = el.querySelector('#tTitle').value.trim();
        if (!t.title) { el.querySelector('#tTitle').focus(); toast('Escribe qué tienes que hacer'); return; }
        if (!t.date) { toast('Elige una fecha'); return; }
        t.details = el.querySelector('#tDet').value;
        const oldSteps = t.steps || [];
        t.steps = t.details.split('\n').filter(l => /^\s*•/.test(l)).map(l => l.replace(/^\s*•\s*/, '').trim()).filter(Boolean).map(txt => ({t: txt, done: !!(oldSteps.find(o => o.t === txt) || {}).done}));
        if (editing) { t.obs = el.querySelector('#tObs').value; if (t.status === 'Completada' && !t.completedAt) t.completedAt = Date.now(); if (t.status !== 'Completada') t.completedAt = null; }
        if (editing) S.tasks[S.tasks.findIndex(x => x.id === t.id)] = t; else S.tasks.push(t);
        save('tasks'); s.close(); render(); toast(editing ? 'Tarea actualizada' : 'Tarea guardada ✓');
      };
      if (!editing) setTimeout(() => el.querySelector('#tTitle').focus(), 60);
    }});
}
function setDone(id, done) {
  const t = S.tasks.find(x => x.id === id); if (!t) return;
  t.status = done ? 'Completada' : 'Pendiente'; t.completedAt = done ? Date.now() : null;
  save('tasks'); render(); if (done) toast('¡Bien hecho! ✓');
}
function openTaskDetail(id) {
  const t = S.tasks.find(x => x.id === id); if (!t) return;
  const ty = typeById(t.typeId), a = areaById(t.areaId);
  const desc = (t.details || '').split('\n').filter(l => !/^\s*•/.test(l)).join('\n').trim();
  const body = `<div class="row" style="margin-bottom:8px"><span style="font-size:26px">${ty.icon}</span><div><div style="font-size:18px;font-weight:700" class="${isDone(t) ? 'muted' : ''}">${esc(t.title)}</div>
    <div class="row wrap small muted"><span>${ty.name}</span>${a ? `<span class="tag"><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</span>` : ''}<span class="prio ${t.priority}">${t.priority}</span></div></div></div>
    <div class="kv"><span class="k">Fecha</span><span>${fmtLong(t.date)} ${isLate(t) ? '<span class="late">· Atrasada</span>' : ''}</span></div>
    <div class="kv"><span class="k">Hora</span><span>${t.time ? fmtTime(t.time) : 'Sin hora'}</span></div>
    <div class="kv"><span class="k">Estado</span><span>${isLate(t) ? 'Atrasada' : t.status}</span></div>
    <div class="kv"><span class="k">Recordatorio</span><span id="dBell">${bellHTML(t.reminder)}</span></div>
    ${desc ? `<div class="fld"><div class="lab">De qué se trata</div><div style="white-space:pre-wrap">${esc(desc)}</div></div>` : ''}
    ${t.steps && t.steps.length ? `<div class="fld"><div class="lab">Pasos (${t.steps.filter(x => x.done).length}/${t.steps.length})</div><div class="steps">${t.steps.map((st, i) => `<label><input type="checkbox" data-step="${i}" ${st.done ? 'checked' : ''}><span class="${st.done ? 'done' : ''}">${esc(st.t)}</span></label>`).join('')}</div></div>` : ''}
    ${t.obs ? `<div class="fld"><div class="lab">Observaciones</div><div style="white-space:pre-wrap">${esc(t.obs)}</div></div>` : ''}
    ${calLinks({title: t.title, date: t.date, start: t.time, allDay: !t.time, details: desc})}`;
  const s = openSheet({title: 'Tarea', body,
    foot: `<button class="btn sec" id="dDel"><i class="xdel"></i> Eliminar</button><button class="btn sec" id="dEdit">✎ Editar</button><button class="btn" id="dDone">${isDone(t) ? '↺ Reabrir' : '✓ Completar'}</button>`,
    onMount: el => {
      wireBell(el.querySelector('#dBell'), t, () => { save('tasks'); render(); toast(t.reminder == null ? 'Recordatorio apagado' : 'Recordatorio: ' + remLabel(t.reminder)); });
      el.querySelectorAll('[data-step]').forEach(c => c.onchange = () => { t.steps[+c.dataset.step].done = c.checked; c.nextElementSibling.classList.toggle('done', c.checked); save('tasks'); render(); });
      el.querySelector('#dDone').onclick = () => { s.close(); setDone(t.id, !isDone(t)); };
      el.querySelector('#dEdit').onclick = () => { s.close(); openTaskForm(t); };
      el.querySelector('#dDel').onclick = async () => { if (await ask('¿Eliminar la tarea “' + esc(t.title) + '”?')) { S.tasks = S.tasks.filter(x => x.id !== t.id); save('tasks'); s.close(); render(); toast('Tarea eliminada'); } };
    }});
}

/* ========== Formulario de EVENTO ========== */
// mode: 'month' | 'week' | 'day' | undefined
function openEventForm(ev, preset = {}, mode) {
  const editing = !!ev;
  const e = ev ? JSON.parse(JSON.stringify(ev)) : {id: uid(), title: preset.title || '', date: preset.date || todayISO(), allDay: mode === 'month' ? true : !!preset.allDay, start: preset.start || '09:00', end: preset.end || null, evType: 'evento', place: '', areaId: preset.areaId || null, reminder: null, note: ''};
  if (!e.end) e.end = fromMin(Math.min(toMin(e.start) + 60, 23 * 60 + 55));
  const days = mode === 'week' ? new Set([e.date]) : null;
  const wk = mode === 'week' ? weekDays8(e.date) : [];
  const title = editing ? 'Editar evento' : mode === 'month' ? 'Nuevo en el calendario' : mode === 'week' ? 'Planificar en la semana' : mode === 'day' ? 'Agendar a las ' + fmtTime(e.start) : 'Nuevo evento';
  const cls = mode === 'week' ? 'purple' : mode === 'day' ? 'bluehd' : '';
  const dd = parseISO(e.date);
  const body = `
    ${editing ? '' : `<div class="toggle2"><button type="button" class="on">📅 Evento</button><button type="button" data-sw="tk">✅ Tarea</button></div>`}
    ${mode === 'month' ? `<div class="bigday"><div class="mo">${MESES[dd.getMonth()]}</div><div class="dn">${dd.getDate()}</div><div class="wd">${DIAS[dd.getDay()]}</div></div>` : ''}
    <input class="inp title" id="eTitle" placeholder="Nombre del evento" value="${esc(e.title)}" maxlength="140">
    ${mode === 'week' ? `<div class="fld"><label>¿Qué días de esta semana?</label><div class="opts" id="eDays">${wk.map(d => `<button type="button" class="opt" data-d="${d}">${DCORTO[dow(d)]} ${parseISO(d).getDate()}</button>`).join('')}</div></div>`
      : mode ? '' : `<div class="fld"><label>Fecha</label><input type="date" class="inp" id="eDate" value="${e.date}"></div>`}
    ${editing ? `<div class="fld"><label>Fecha</label><input type="date" class="inp" id="eDate" value="${e.date}"></div>` : ''}
    <div class="fld"><button type="button" class="row" id="eAllRow" style="padding:4px 0;font-weight:600"><span class="switch blue ${e.allDay ? 'on' : ''}" id="eAll"></span>Todo el día</button></div>
    ${mode === 'week' ? '' : `<div class="fld"><label>Termina otro día (para eventos de varios días)</label><input type="date" class="inp" id="eEnd" value="${e.endDate || ''}" min="${e.date}"></div>`}
    <div class="fld row" id="eTimes"></div>
    <div class="fld"><label>Tipo de evento</label><div class="opts hscroll" id="eTypes"></div></div>
    <div class="fld"><label>Sticker en el calendario</label><div class="opts hscroll stk" id="eStk"></div></div>
    <div class="fld"><label>Lugar</label><input class="inp" id="ePlace" value="${esc(e.place)}" placeholder="¿Dónde?"></div>
    <div class="fld"><label>Área</label><div class="opts hscroll" id="eAreas"></div></div>
    <div class="fld row"><span class="lab" style="margin:0">Recordatorio</span><span class="sp"></span><span id="eBell">${bellHTML(e.reminder)}</span></div>
    <details class="fold" ${e.note ? 'open' : ''}><summary>Añadir una nota</summary><textarea class="inp" id="eNote">${esc(e.note)}</textarea></details>`;
  const s = openSheet({title, cls, body,
    foot: `<button class="btn sec" data-close>Cancelar</button><button class="btn" id="eSave">${editing ? 'Guardar cambios' : 'Guardar evento'}</button>`,
    onMount: el => {
      if (days) { const pd = () => el.querySelectorAll('[data-d]').forEach(b => { b.classList.toggle('on', days.has(b.dataset.d)); b.onclick = () => { days.has(b.dataset.d) ? days.delete(b.dataset.d) : days.add(b.dataset.d); pd(); }; }); pd(); }
      const paintTimes = () => {
        const box = el.querySelector('#eTimes'); box.style.display = e.allDay ? 'none' : '';
        box.innerHTML = `<button type="button" class="timebtn" id="eSt"><small>Inicio</small><b>${fmtTime(e.start)}</b></button><button type="button" class="timebtn" id="eEn"><small>Fin</small><b>${fmtTime(e.end)}</b></button>`;
        box.querySelector('#eSt').onclick = async () => { const v = await pickTime(e.start, {title: 'Hora de inicio'}); if (v) { const dur = toMin(e.end) - toMin(e.start); e.start = v; e.end = fromMin(Math.min(toMin(v) + (dur > 0 ? dur : 60), 23 * 60 + 55)); paintTimes(); } };
        box.querySelector('#eEn').onclick = async () => { const v = await pickTime(e.end, {title: 'Hora de fin', durations: true, base: e.start}); if (v) { e.end = v; paintTimes(); } };
      };
      paintTimes();
      el.querySelector('#eAllRow').onclick = () => { e.allDay = !e.allDay; el.querySelector('#eAll').classList.toggle('on', e.allDay); paintTimes(); };
      const pt = () => { el.querySelector('#eTypes').innerHTML = EVENT_TYPES.map(t => `<button type="button" class="opt ${t.id === e.evType ? 'on' : ''}" data-et="${t.id}">${t.icon} ${t.name}</button>`).join(''); el.querySelectorAll('[data-et]').forEach(b => b.onclick = () => { e.evType = b.dataset.et; if (e.evType === 'celebracion' && !e.sticker) { e.sticker = '🎂'; wireStickers(el.querySelector('#eStk'), e); } pt(); }); };
      wireStickers(el.querySelector('#eStk'), e);
      pt();
      const pa = () => { el.querySelector('#eAreas').innerHTML = areaButtons(e.areaId); el.querySelectorAll('[data-area]').forEach(b => b.onclick = () => { e.areaId = b.dataset.area || null; pa(); }); };
      pa();
      wireBell(el.querySelector('#eBell'), e);
      const sw = el.querySelector('[data-sw]'); if (sw) sw.onclick = () => { const tt = el.querySelector('#eTitle').value; s.close(); openTaskForm(null, {title: tt, date: e.date, time: e.allDay ? null : e.start}); };
      el.querySelector('#eSave').onclick = () => {
        e.title = el.querySelector('#eTitle').value.trim();
        if (!e.title) { el.querySelector('#eTitle').focus(); toast('Escribe el nombre del evento'); return; }
        const di = el.querySelector('#eDate'); if (di && di.value) e.date = di.value;
        const ed = el.querySelector('#eEnd'); e.endDate = ed && ed.value && ed.value > e.date ? ed.value : null;
        if (!e.allDay && !e.endDate && toMin(e.end) <= toMin(e.start)) { toast('La hora de fin debe ser después del inicio'); return; }
        e.place = el.querySelector('#ePlace').value.trim(); e.note = el.querySelector('#eNote').value;
        if (editing) S.events[S.events.findIndex(x => x.id === e.id)] = e;
        else if (days) { if (!days.size) { toast('Elige al menos un día'); return; } [...days].sort().forEach(d => S.events.push({...JSON.parse(JSON.stringify(e)), id: uid(), date: d})); }
        else S.events.push(e);
        save('events'); s.close(); render(); toast(editing ? 'Evento actualizado' : days && days.size > 1 ? `Evento creado en ${days.size} días ✓` : 'Evento guardado ✓');
      };
      if (!editing) setTimeout(() => el.querySelector('#eTitle').focus(), 60);
    }});
}
function openEventDetail(id) {
  const e = S.events.find(x => x.id === id); if (!e) return;
  const t = evType(e.evType), a = areaById(e.areaId);
  const body = `<div class="row" style="margin-bottom:8px"><span style="font-size:26px">${t.icon}</span><div><div style="font-size:18px;font-weight:700">${esc(e.title)}</div><div class="row wrap small muted"><span>${t.name}</span>${a ? `<span class="tag"><span class="dot" style="background:${a.color}"></span>${esc(a.name)}</span>` : ''}</div></div></div>
    <div class="kv"><span class="k">Fecha</span><span>${fmtLong(e.date)}</span></div>
    ${e.endDate ? `<div class="kv"><span class="k">Hasta</span><span>${fmtLong(e.endDate)}</span></div>` : ''}<div class="kv"><span class="k">Horario</span><span>${e.allDay ? 'Todo el día' : fmtTime(e.start) + ' – ' + fmtTime(e.end)}</span></div>
    ${e.place ? `<div class="kv"><span class="k">Lugar</span><span>${esc(e.place)}</span></div>` : ''}
    <div class="kv"><span class="k">Recordatorio</span><span id="dBell">${bellHTML(e.reminder)}</span></div>
    ${e.note ? `<div class="fld"><div class="lab">Nota</div><div style="white-space:pre-wrap">${esc(e.note)}</div></div>` : ''}
    ${calLinks({title: e.title, date: e.date, start: e.start, end: e.end, allDay: e.allDay, details: e.note, place: e.place})}`;
  const s = openSheet({title: 'Evento', body, foot: `<button class="btn sec" id="dDel"><i class="xdel"></i> Eliminar</button><button class="btn" id="dEdit">✎ Editar</button>`,
    onMount: el => {
      wireBell(el.querySelector('#dBell'), e, () => { save('events'); render(); toast(e.reminder == null ? 'Recordatorio apagado' : 'Recordatorio: ' + remLabel(e.reminder)); });
      el.querySelector('#dEdit').onclick = () => { s.close(); openEventForm(e); };
      el.querySelector('#dDel').onclick = async () => { if (await ask('¿Eliminar el evento “' + esc(e.title) + '”?')) { S.events = S.events.filter(x => x.id !== e.id); save('events'); s.close(); render(); toast('Evento eliminado'); } };
    }});
}

/* ========== Tipos ========== */
function openTypeForm(type, after) {
  const editing = !!type; const t = type ? {...type} : {id: 'u' + uid(), name: '', icon: '⭐', color: AREA_COLORS[5]};
  const s = openSheet({title: editing ? 'Editar tipo' : 'Nuevo tipo', cls: 'small',
    body: `<div class="fld"><label>Nombre</label><input class="inp" id="tyN" value="${esc(t.name)}" maxlength="30"></div>
      <div class="fld"><label>Ícono</label><div class="emojis" id="tyE"></div></div>
      <div class="fld"><label>Color</label><div class="colors" id="tyC"></div></div>`,
    foot: `<button class="btn sec" data-close>Cancelar</button><button class="btn" id="tyS">Guardar</button>`,
    onMount: el => {
      const pe = () => { el.querySelector('#tyE').innerHTML = EMOJIS.map(e => `<button type="button" class="${e === t.icon ? 'on' : ''}" data-e="${e}">${e}</button>`).join(''); el.querySelectorAll('[data-e]').forEach(b => b.onclick = () => { t.icon = b.dataset.e; pe(); }); };
      const pc = () => { el.querySelector('#tyC').innerHTML = AREA_COLORS.map(c => `<button type="button" class="${c === t.color ? 'on' : ''}" data-c="${c}" style="background:${c}" aria-label="color"></button>`).join(''); el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { t.color = b.dataset.c; pc(); }); };
      pe(); pc();
      el.querySelector('#tyS').onclick = () => {
        t.name = el.querySelector('#tyN').value.trim(); if (!t.name) { toast('Escribe un nombre'); return; }
        if (editing) { const i = S.types.findIndex(x => x.id === t.id); S.types[i] = {...S.types[i], ...t}; } else S.types.push(t);
        save('meta'); s.close(); render(); after && after(t);
      };
      setTimeout(() => el.querySelector('#tyN').focus(), 50);
    }});
}
function openTypesManager(after) {
  const s = openSheet({title: 'Tipos de actividad', body: '<div id="tyL"></div>', foot: `<button class="btn sec" id="tyR">Restaurar originales</button><button class="btn" id="tyNew">+ Nuevo tipo</button>`,
    onClose: () => after && after(),
    onMount: el => {
      const paint = () => {
        el.querySelector('#tyL').innerHTML = S.types.map(t => {
          const used = S.tasks.filter(x => x.typeId === t.id).length;
          return `<div class="item" style="cursor:default"><span class="em">${t.icon}</span><span class="dot" style="background:${t.color}"></span><div class="body"><div class="t">${esc(t.name)}</div><div class="m">${t.builtin ? 'Original' : 'Creado por ti'} · ${used} actividad${used === 1 ? '' : 'es'}</div></div>
            <button class="btn ghost sm" data-ed="${t.id}">Editar</button>${t.builtin ? '' : `<button class="btn ghost sm" data-del="${t.id}"><i class="xdel"></i> Eliminar</button>`}</div>`;
        }).join('');
        el.querySelectorAll('[data-ed]').forEach(b => b.onclick = () => openTypeForm(S.types.find(x => x.id === b.dataset.ed), paint));
        el.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
          const t = S.types.find(x => x.id === b.dataset.del);
          if (S.tasks.some(x => x.typeId === t.id)) { toast('No se puede eliminar: hay actividades que usan este tipo'); return; }
          if (await ask('¿Eliminar el tipo “' + esc(t.name) + '”?')) { S.types = S.types.filter(x => x.id !== t.id); save('meta'); paint(); render(); }
        });
      };
      paint();
      el.querySelector('#tyNew').onclick = () => openTypeForm(null, paint);
      el.querySelector('#tyR').onclick = async () => {
        if (!(await ask('¿Restaurar nombre, ícono y color de los tipos originales? Tus tipos propios se quedan.', {yes: 'Restaurar', danger: false}))) return;
        DEFAULT_TYPES.forEach(d => { const i = S.types.findIndex(x => x.id === d.id); if (i >= 0) S.types[i] = {...d, builtin: true}; else S.types.push({...d, builtin: true}); });
        save('meta'); paint(); render(); toast('Tipos originales restaurados');
      };
    }});
}

/* ========== Áreas ========== */
function openAreaForm(area, after) {
  const editing = !!area; const a = area ? {...area} : {id: uid(), name: '', color: AREA_COLORS[S.areas.length % AREA_COLORS.length], contact: '', place: '', obs: ''};
  const s = openSheet({title: editing ? 'Editar área' : 'Nueva área',
    body: `<input class="inp title" id="aN" placeholder="Nombre del área (ej. Hogar, Salud)" value="${esc(a.name)}" maxlength="40">
      <div class="fld"><label>Color</label><div class="colors" id="aC"></div></div>
      <div class="fld"><label>Persona de contacto</label><input class="inp" id="aP" value="${esc(a.contact)}"></div>
      <div class="fld"><label>Lugar</label><input class="inp" id="aL" value="${esc(a.place)}"></div>
      <div class="fld"><label>Observaciones</label><textarea class="inp" id="aO">${esc(a.obs)}</textarea></div>`,
    foot: `<button class="btn sec" data-close>Cancelar</button><button class="btn" id="aS">Guardar área</button>`,
    onMount: el => {
      const pc = () => { el.querySelector('#aC').innerHTML = AREA_COLORS.map(c => `<button type="button" class="${c === a.color ? 'on' : ''}" data-c="${c}" style="background:${c}" aria-label="color"></button>`).join(''); el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { a.color = b.dataset.c; pc(); }); };
      pc();
      el.querySelector('#aS').onclick = () => {
        a.name = el.querySelector('#aN').value.trim(); if (!a.name) { toast('Escribe el nombre del área'); return; }
        a.contact = el.querySelector('#aP').value.trim(); a.place = el.querySelector('#aL').value.trim(); a.obs = el.querySelector('#aO').value;
        if (editing) S.areas[S.areas.findIndex(x => x.id === a.id)] = a; else S.areas.push(a);
        save('areas'); s.close(); render(); toast(editing ? 'Área actualizada' : 'Área creada ✓'); after && after(a);
      };
      setTimeout(() => el.querySelector('#aN').focus(), 50);
    }});
}
async function deleteArea(id) {
  const a = areaById(id); if (!a) return false;
  const n = S.tasks.filter(t => t.areaId === id).length + S.events.filter(t => t.areaId === id).length + S.routines.filter(t => t.areaId === id).length + S.notes.filter(t => t.areaId === id).length;
  let r;
  if (n) r = await ask(`El área “${esc(a.name)}” tiene ${n} elemento${n === 1 ? '' : 's'}. ¿Qué hago con ellos?`, {yes: 'Eliminarlos también', extra: 'Conservarlos sin área', no: 'Cancelar'});
  else r = await ask(`¿Eliminar el área “${esc(a.name)}”?`);
  if (!r) return false;
  if (r === true && n) { ['tasks', 'events', 'routines', 'notes'].forEach(k => S[k] = S[k].filter(x => x.areaId !== id)); }
  else ['tasks', 'events', 'routines', 'notes'].forEach(k => S[k].forEach(x => { if (x.areaId === id) x.areaId = null; }));
  S.areas = S.areas.filter(x => x.id !== id); S.settings.hiddenAreas = S.settings.hiddenAreas.filter(x => x !== id);
  save(); render(); toast('Área eliminada'); return true;
}

/* ========== Rutina ========== */
function openRoutineForm(r0, preset = {}) {
  const editing = !!r0;
  const r = r0 ? JSON.parse(JSON.stringify(r0)) : {id: uid(), name: '', areaId: preset.areaId || null, days: preset.days || [dow(todayISO())], start: '08:00', end: '09:00', place: '', from: '', to: ''};
  const order = [0,1,2,3,4,5,6].map(i => (i + S.settings.weekStart) % 7);
  const s = openSheet({title: editing ? 'Editar rutina' : 'Nueva rutina',
    body: `<input class="inp title" id="rN" placeholder="Nombre (ej. Gimnasio, Turno de trabajo)" value="${esc(r.name)}" maxlength="60">
      <div class="fld"><label>Área</label><div class="opts hscroll" id="rA"></div></div>
      <div class="fld"><label>¿Qué días?</label><div class="opts" id="rD">${order.map(d => `<button type="button" class="opt" data-d="${d}">${DCORTO[d]}</button>`).join('')}</div></div>
      <div class="fld row" id="rT"></div>
      <div class="fld"><label>Lugar</label><input class="inp" id="rL" value="${esc(r.place)}"></div>
      <details class="fold" ${r.from || r.to ? 'open' : ''}><summary>Fechas de inicio y fin</summary><div class="cols">
        <div class="fld"><label>Empieza</label><input type="date" class="inp" id="rF" value="${r.from}"></div><div class="fld"><label>Termina</label><input type="date" class="inp" id="rTo" value="${r.to}"></div></div></details>`,
    foot: `${editing ? '<button class="btn sec" id="rDel"><i class="xdel"></i> Eliminar</button>' : '<button class="btn sec" data-close>Cancelar</button>'}<button class="btn" id="rS">Guardar rutina</button>`,
    onMount: el => {
      const pa = () => { el.querySelector('#rA').innerHTML = areaButtons(r.areaId); el.querySelectorAll('[data-area]').forEach(b => b.onclick = () => { r.areaId = b.dataset.area || null; pa(); }); }; pa();
      const pd = () => el.querySelectorAll('[data-d]').forEach(b => { const d = +b.dataset.d; b.classList.toggle('on', r.days.includes(d)); b.onclick = () => { r.days = r.days.includes(d) ? r.days.filter(x => x !== d) : [...r.days, d]; pd(); }; }); pd();
      const pt = () => {
        const box = el.querySelector('#rT');
        box.innerHTML = `<button type="button" class="timebtn" id="rSt"><small>Inicio</small><b>${fmtTime(r.start)}</b></button><button type="button" class="timebtn" id="rEn"><small>Fin</small><b>${fmtTime(r.end)}</b></button>`;
        box.querySelector('#rSt').onclick = async () => { const v = await pickTime(r.start, {title: 'Hora de inicio'}); if (v) { const dur = toMin(r.end) - toMin(r.start); r.start = v; r.end = fromMin(Math.min(toMin(v) + (dur > 0 ? dur : 60), 23 * 60 + 55)); pt(); } };
        box.querySelector('#rEn').onclick = async () => { const v = await pickTime(r.end, {title: 'Hora de fin', durations: true, base: r.start}); if (v) { r.end = v; pt(); } };
      }; pt();
      const del = el.querySelector('#rDel');
      if (del) del.onclick = async () => { if (await ask('¿Eliminar la rutina “' + esc(r.name) + '”? Dejará de aparecer todas las semanas.')) { S.routines = S.routines.filter(x => x.id !== r.id); save('routines'); s.close(); render(); toast('Rutina eliminada'); } };
      el.querySelector('#rS').onclick = () => {
        r.name = el.querySelector('#rN').value.trim();
        if (!r.name && r.areaId) r.name = areaById(r.areaId).name;
        if (!r.name) { toast('Escribe un nombre o elige un área'); return; }
        if (!r.days.length) { toast('Elige al menos un día'); return; }
        if (toMin(r.end) <= toMin(r.start)) { toast('La hora de fin debe ser después del inicio'); return; }
        r.place = el.querySelector('#rL').value.trim(); r.from = el.querySelector('#rF').value; r.to = el.querySelector('#rTo').value;
        if (r.from && r.to && r.to < r.from) { toast('La fecha de fin es antes del inicio'); return; }
        if (editing) S.routines[S.routines.findIndex(x => x.id === r.id)] = r; else S.routines.push(r);
        save('routines'); s.close(); render(); toast(editing ? 'Rutina actualizada' : 'Rutina guardada: se repetirá cada semana ✓');
      };
    }});
}

/* ========== Notas ========== */
const noteTitle = n => (n.text.split('\n').find(l => l.trim()) || 'Nota sin texto').trim().slice(0, 80);
const noteSnippet = n => n.text.split('\n').filter(l => l.trim()).slice(1).join(' ').slice(0, 120);
function openNote(id) {
  const n = S.notes.find(x => x.id === id); if (!n) return;
  const s = openSheet({title: 'Nota · ' + fmtShort(n.date),
    body: `<textarea class="inp" id="nT" style="min-height:180px">${esc(n.text)}</textarea>
      <details class="fold" ${n.category || n.areaId ? 'open' : ''}><summary>Más opciones</summary>
        <div class="fld"><label>Categoría</label><input class="inp" id="nC" value="${esc(n.category || '')}" placeholder="Ej. Ideas, Recetas, Compras"></div>
        <div class="fld"><label>Área</label><div class="opts hscroll" id="nA"></div></div></details>`,
    foot: `<button class="btn sec" id="nDel"><i class="xdel"></i></button><button class="btn sec" id="nTask">→ Convertir en tarea</button><button class="btn" id="nS">Guardar</button>`,
    onMount: el => {
      let areaId = n.areaId || null;
      const pa = () => { el.querySelector('#nA').innerHTML = areaButtons(areaId); el.querySelectorAll('[data-area]').forEach(b => b.onclick = () => { areaId = b.dataset.area || null; pa(); }); }; pa();
      const apply = () => { n.text = el.querySelector('#nT').value; n.category = el.querySelector('#nC').value.trim(); n.areaId = areaId; };
      el.querySelector('#nS').onclick = () => { apply(); if (!n.text.trim()) { toast('La nota está vacía'); return; } save('notes'); s.close(); render(); toast('Nota guardada ✓'); };
      el.querySelector('#nDel').onclick = async () => { if (await ask('¿Eliminar esta nota?')) { S.notes = S.notes.filter(x => x.id !== n.id); save('notes'); s.close(); render(); toast('Nota eliminada'); } };
      el.querySelector('#nTask').onclick = () => {
        apply(); save('notes'); s.close();
        const g = guess(n.text);
        const rest = n.text.split('\n').filter(l => l.trim()).slice(1).join('\n');
        openTaskForm(null, {title: noteTitle(n), typeId: g.typeId, areaId: n.areaId || g.areaId});
        setTimeout(() => { const d = $('#tDet'); if (d && rest) { d.value = rest; d.closest('details').open = true; } }, 80);
      };
    }});
}

// Selector de sticker: lo que eliges aquí aparece en el día del calendario
function wireStickers(box, obj) {
  if (!box) return;
  const paint = () => {
    box.innerHTML = `<button type="button" class="opt ${!obj.sticker ? 'on' : ''}" data-stk="">Ninguno</button>` + STICKERS.map(s => `<button type="button" class="opt stkb ${obj.sticker === s ? 'on' : ''}" data-stk="${s}">${s}</button>`).join('');
    box.querySelectorAll('[data-stk]').forEach(b => b.onclick = () => { obj.sticker = b.dataset.stk || null; paint(); });
  };
  paint();
}
