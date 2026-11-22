'use strict';
/* ========== Utilidades ========== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(2, '0');
const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const parseISO = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const todayISO = () => iso(new Date());
const addDays = (s, n) => { const d = parseISO(s); d.setDate(d.getDate() + n); return iso(d); };
const dow = s => parseISO(s).getDay();
const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const DIAS = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const DCORTO = ['dom','lun','mar','mié','jue','vie','sáb'];
const DLETRA = ['D','L','M','M','J','V','S'];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const fmtLong = s => { const d = parseISO(s); return cap(DIAS[d.getDay()]) + ', ' + d.getDate() + ' de ' + MESES[d.getMonth()]; };
const fmtShort = s => { const d = parseISO(s); return DCORTO[d.getDay()] + ' ' + d.getDate() + ' ' + MESES[d.getMonth()].slice(0, 3); };
const toMin = t => { if (!t) return null; const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const fromMin = m => pad(Math.floor(m / 60) % 24) + ':' + pad(m % 60);
function fmtTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  if (S.settings.hour24) return pad(h) + ':' + pad(m);
  const ap = h < 12 ? 'a. m.' : 'p. m.'; const hh = h % 12 || 12;
  return hh + ':' + pad(m) + ' ' + ap;
}
const fmtHourLabel = h => S.settings.hour24 ? pad(h) + ':00' : ((h % 12 || 12) + (h < 12 ? ' a. m.' : ' p. m.'));
function weekStartOf(s) { const d = parseISO(s); const ws = S.settings.weekStart; const diff = (d.getDay() - ws + 7) % 7; d.setDate(d.getDate() - diff); return iso(d); }
const weekDays = s => { const st = weekStartOf(s); return [0,1,2,3,4,5,6].map(i => addDays(st, i)); };
// Vista Semana y planificador: de domingo a domingo (8 días)
const weekDays8 = s => weekDays(s); // la semana es de domingo a sábado (un solo domingo)
const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };

/* ========== Datos por defecto ========== */
const DEFAULT_TYPES = [
  {id:'pendiente', name:'Pendiente', icon:'📝', color:'#6b7487'},
  {id:'hogar', name:'Hogar', icon:'🏠', color:'#c97b2a'},
  {id:'trabajo', name:'Trabajo', icon:'💼', color:'#1f5fbf'},
  {id:'salud', name:'Salud', icon:'🩺', color:'#e0566b'},
  {id:'finanzas', name:'Finanzas', icon:'💰', color:'#2e9d5b'},
  {id:'familia', name:'Familia', icon:'👨‍👩‍👧', color:'#b3519c'},
  {id:'compras', name:'Compras', icon:'🛒', color:'#d4a017'},
  {id:'mandados', name:'Mandados', icon:'🚗', color:'#5c6bc0'},
  {id:'cita', name:'Cita', icon:'📅', color:'#0f9d8f'},
  {id:'ejercicio', name:'Ejercicio', icon:'🏃', color:'#f08a24'},
  {id:'recordatorio', name:'Recordatorio', icon:'🔔', color:'#7b4fd6'}
];
const EVENT_TYPES = [
  {id:'evento', name:'Evento', icon:'🗓️'}, {id:'reunion', name:'Reunión', icon:'👥'}, {id:'cita', name:'Cita', icon:'🩺'},
  {id:'celebracion', name:'Celebración', icon:'🎂'}, {id:'social', name:'Social', icon:'🎉'}, {id:'deporte', name:'Deporte', icon:'🏃'}
];
const EMOJIS = ['📝','🏠','💼','🩺','💰','👨‍👩‍👧','🛒','🚗','📅','🏃','🔔','⭐','🎯','🐶','🙏','✈️'];
const STICKERS = ['🎂', '🎉', '🎁', '❤️', '⭐', '✈️', '🏖️', '🩺', '💼', '🏋️', '⚽', '🎵', '🍽️', '🐶', '⛪', '💍', '👶', '🎄', '🧳', '🚗', '💈', '💰', '🏠', '🌴'];
const AREA_COLORS = ['#1f5fbf','#0f9d8f','#2e9d5b','#e0566b','#f08a24','#7b4fd6','#b3519c','#c97b2a','#5c6bc0','#d4a017','#00838f','#6b7487'];
const PRIOS = ['Baja','Media','Alta','Urgente'];
const REMINDERS = [[0,'En el momento'],[5,'5 min antes'],[10,'10 min antes'],[15,'15 min antes'],[30,'30 min antes'],[45,'45 min antes'],[60,'1 hora antes'],[120,'2 horas antes'],[180,'3 horas antes'],[360,'6 horas antes'],[720,'12 horas antes'],[1440,'1 día antes'],[2880,'2 días antes'],[4320,'3 días antes'],[10080,'1 semana antes']];
const remLabel = m => (REMINDERS.find(r => r[0] === m) || [0, 'En el momento'])[1];
const FOCUS_PRESETS = [[15,3],[25,5],[30,5],[45,10],[50,10],[60,15]];
const MOTIV = [
  "Un paso a la vez también es avanzar.",
  "Hoy es un buen día para tachar algo de la lista.",
  "Lo que planificas hoy te da tranquilidad mañana.",
  "No tienes que hacerlo todo, solo lo importante.",
  "Pequeños hábitos, grandes cambios.",
  "Respira, organiza y empieza.",
  "Tu tiempo vale: úsalo en lo que te importa.",
  "Terminar algo pequeño da energía para lo grande.",
  "Cuida de ti: también es una prioridad.",
  "Lo que se anota no se olvida.",
  "Avanza a tu ritmo, pero avanza.",
  "Un hogar ordenado empieza con una sola tarea.",
  "Celebra lo que ya lograste esta semana.",
  "Planifica tu semana y la semana te rendirá más.",
  "Empieza por lo que más te pesa y el resto será más fácil.",
  "Hoy no tiene que ser perfecto, solo tiene que ser tuyo.",
  "La constancia le gana al entusiasmo de un día.",
  "Lo difícil se vuelve fácil cuando lo divides en partes.",
  "Haz hoy algo que tu yo de mañana te agradezca.",
  "Tu energía es valiosa: dásela a lo que suma.",
  "Un buen plan hoy es mejor que uno perfecto mañana.",
  "Decir “no” a veces es decirte “sí” a ti.",
  "La calma también es productiva.",
  "Cada día es una página nueva: escríbela con intención.",
  "Lo importante primero, lo urgente después.",
  "No esperes motivación: empieza y llegará.",
  "El orden afuera ayuda a la paz adentro.",
  "Diez minutos bien usados pueden cambiar tu día.",
  "Tu familia agradece tu presencia más que tu prisa.",
  "Descansar también es parte del plan.",
  "Lo que repites cada día se convierte en quien eres.",
  "Mira cuánto has avanzado, no solo cuánto falta.",
  "Una lista corta y cumplida vale más que una larga y olvidada.",
  "Hoy puedes con más de lo que crees.",
  "Sé amable contigo cuando las cosas no salgan como esperabas.",
  "Agradece algo bueno de hoy antes de seguir.",
  "Un día organizado deja espacio para disfrutar.",
  "Hazlo simple: una cosa, luego la otra.",
  "El mejor momento para empezar es ahora.",
  "Tus metas merecen un espacio en tu calendario.",
  "Cuidar tu salud es cuidar todo lo demás.",
  "Las finanzas en orden traen noches tranquilas.",
  "No compares tu camino con el de nadie.",
  "Hoy suma, aunque sea un poquito.",
  "El progreso silencioso también es progreso.",
  "Un hogar en paz se construye con detalles.",
  "Tu esfuerzo de hoy es la tranquilidad de mañana.",
  "Prioriza lo que te acerca a la vida que quieres.",
  "Un respiro profundo y a seguir.",
  "Hasta los días ocupados tienen un momento para ti.",
  "Lo que no se planifica, se improvisa: elige planificar.",
  "Tu disciplina es un regalo para tu futuro.",
  "Las rutinas buenas te cuidan aunque no tengas ganas.",
  "Pide ayuda cuando la necesites: también es fortaleza.",
  "Haz espacio para lo que te hace sonreír.",
  "El cansancio pasa; lo logrado se queda.",
  "Escoge tres cosas importantes para hoy y hazlas bien.",
  "La vida no es una carrera: disfruta el camino.",
  "Hoy es una oportunidad, no una obligación.",
  "Un “ya está hecho” se siente mejor que un “lo haré luego”.",
  "Tus pequeños logros también merecen celebración.",
  "Ordena tu día y tu mente te lo agradecerá.",
  "Cuando todo parece mucho, empieza por lo más pequeño.",
  "Un buen día empieza con una buena decisión.",
  "Confía en tu proceso.",
  "Lo que cuidas, florece.",
  "Haz las paces con lo que no pudiste hacer ayer.",
  "Hoy es suficiente con dar lo mejor que tienes hoy.",
  "La paciencia también es una forma de avanzar.",
  "Que tu agenda refleje lo que de verdad te importa.",
  "Sonríe: ya diste el primer paso al abrir tu organizador.",
  "Las cosas grandes se hacen con muchos días pequeños.",
  "Libera tu mente: anótalo y sigue.",
  "Tu bienestar no es un premio, es una necesidad.",
  "La organización es una forma de cariño contigo.",
  "Hazlo con calma, pero hazlo.",
  "Mañana agradecerás lo que hagas hoy.",
  "Comparte tiempo con quienes quieres: eso también cuenta.",
  "Un poco de orden cada día evita el caos de fin de semana.",
  "Atrévete a empezar aunque no tengas todo claro.",
  "Lo que hoy parece pesado, mañana será experiencia.",
  "Tienes permiso para ir despacio.",
  "Tu tiempo libre también merece un lugar en tu agenda.",
  "Elige el progreso sobre la perfección.",
  "La gratitud convierte lo que tienes en suficiente.",
  "Hoy cuenta. Tú cuentas.",
  "Cada tarea completada es una promesa cumplida contigo.",
  "Hazle espacio a lo nuevo soltando lo que ya no sirve.",
  "Tu actitud marca el ritmo de tu día.",
  "No subestimes el poder de una buena noche de descanso.",
  "Un plan claro quita la mitad del estrés.",
  "Muévete un poco: tu cuerpo te lo agradecerá.",
  "Lo que hoy siembras, mañana lo cosechas.",
  "Sé tu propio aliado, no tu crítico más duro.",
  "Una cosa bien hecha vale más que diez a medias.",
  "Termina el día sabiendo que hiciste lo posible.",
  "Hoy es buen día para ponerte al día.",
  "Lo pendiente se hace liviano cuando le pones fecha.",
  "Mantén tu enfoque en lo que sí puedes controlar.",
  "Una mente tranquila decide mejor.",
  "Agradece, organiza y avanza.",
  "La alegría también se planifica: agenda algo que disfrutes.",
  "Tus sueños necesitan pasos, no solo deseos.",
  "Hoy puedes empezar de nuevo las veces que haga falta.",
  "El esfuerzo constante abre puertas.",
  "Ordena una gaveta, ordena una idea, ordena tu día.",
  "Tu hogar es tu refugio: cuídalo con cariño.",
  "Hoy es un buen día para cumplirte a ti.",
  "Lo poco que hagas hoy es más que nada.",
  "Valora tu tiempo como valoras el de los demás.",
  "Un día a la vez, una tarea a la vez.",
  "Cree en ti tanto como crees en los que quieres.",
  "El primer paso no tiene que ser grande, solo tiene que darse.",
  "Ponle fecha a tus metas y se volverán planes.",
  "Que tu semana tenga trabajo, descanso y alegría.",
  "Hoy te toca brillar a tu manera.",
  "Lo que haces con amor sale mejor.",
  "Estás haciendo un gran trabajo, aunque nadie lo diga.",
  "Sigue adelante: lo estás logrando."
];
// Elige un mensaje que no se haya mostrado antes; solo se reinicia cuando se usaron todos.
function nextMotiv() {
  let used = Array.isArray(S.settings.motivUsed) ? S.settings.motivUsed.filter(i => i < MOTIV.length) : [];
  let free = MOTIV.map((_, i) => i).filter(i => !used.includes(i));
  if (!free.length) { const last = used[used.length - 1]; used = []; free = MOTIV.map((_, i) => i).filter(i => i !== last); }
  const pick = free[Math.floor(Math.random() * free.length)];
  used.push(pick); S.settings.motivUsed = used; Store.quiet = true; save('meta'); Store.quiet = false;
  return MOTIV[pick];
}

function blankState() {
  return {
    v: 1, areas: [], tasks: [], events: [], routines: [], notes: [], lists: [],
    types: DEFAULT_TYPES.map(t => ({...t, builtin: true})),
    settings: {theme: 'auto', weekStart: 0, hour24: false, showHolidays: true, notif: false, tutorialSeen: false, focusPreset: 1, hiddenAreas: [], calView: 'month'},
    weekGoals: {}, focusLog: {}, notified: {}
  };
}
let S = blankState();

/* ========== Guardado (nube del usuario o navegador) ========== */
const LS_KEY = 'mi-organizador-personal-v1';
const PARTS = ['areas', 'tasks', 'events', 'routines', 'notes', 'lists', 'meta'];
const Store = {
  mode: 'local', db: null, uid: null, timers: {}, writing: {}, again: {}, lastSent: {},
  partData(p) {
    if (p === 'meta') return {types: S.types, settings: S.settings, weekGoals: S.weekGoals, focusLog: S.focusLog, notified: S.notified, v: S.v, savedAt: S.savedAt || 0};
    return {items: S[p]};
  },
  saveLocal() { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {} },
  loadLocal() { try { const r = localStorage.getItem(LS_KEY); if (r) return JSON.parse(r); } catch (e) {} return null; },
  save(parts) {
    if (!Store.quiet) S.savedAt = Date.now();
    this.saveLocal();
    if (window.NATIVE) { NATIVE.onSave(parts); return; }
    if (this.mode !== 'cloud') return;
    (parts || PARTS).forEach(p => { clearTimeout(this.timers[p]); this.timers[p] = setTimeout(() => this.push(p), 600); });
  },
  async push(p) {
    if (this.writing[p]) { this.again[p] = true; return; }
    const body = this.partData(p); const js = JSON.stringify(body);
    if (this.lastSent[p] === js) return;
    this.writing[p] = true;
    try {
      await this.db.doc('data/users/' + this.uid + '/' + p).set(JSON.parse(js));
      this.lastSent[p] = js; setStoreLabel();
    } catch (e) {
      if (e && e.code === 'quota_exceeded') toast('La nube está llena. Borra notas o actividades viejas.');
      else if (e && e.code === 'unavailable') setTimeout(() => this.push(p), 1500 + Math.random() * 1500);
      else if (e && (e.code === 'invalid_argument' || e.code === 'revoked' || e.code === 'not_granted')) { this.mode = 'local'; setStoreLabel(); }
    }
    this.writing[p] = false;
    if (this.again[p]) { this.again[p] = false; this.push(p); }
  },
  async connect() {
    if (window.NATIVE) return;
    try {
      for (let i = 0; i < 40 && !(window.claude && window.claude.use); i++) await new Promise(r => setTimeout(r, 250));
      if (!window.claude || !window.claude.use) return;
      const timeout = new Promise(r => setTimeout(() => r(null), 10000));
      const [db, user] = await Promise.race([Promise.all([window.claude.use('db'), window.claude.use('user')]), timeout.then(() => [null, null])]);
      if (!db || !user) return;
      const id = await user.id(); if (!id) return;
      this.db = db; this.uid = id;
      const snaps = await Promise.race([Promise.all(PARTS.map(p => db.doc('data/users/' + id + '/' + p).get())), timeout.then(() => null)]);
      if (!snaps) return;
      const any = snaps.some(s => s.exists);
      const metaSnap = snaps[PARTS.indexOf('meta')];
      const cloudAt = metaSnap && metaSnap.exists ? (metaSnap.data().savedAt || 0) : 0;
      if (any && (S.savedAt || 0) > cloudAt && (S.tasks.length || S.lists.length || S.events.length || S.notes.length || S.areas.length || S.routines.length)) {
        // lo de este dispositivo es más nuevo: se combina con lo de la nube (sin perder nada) y se sube
        snaps.forEach((s, i) => {
          const p = PARTS[i]; if (!s.exists || p === 'meta') return;
          const items = JSON.parse(JSON.stringify(s.data().items || [])), have = new Set(S[p].map(x => x.id));
          items.forEach(x => { if (x && x.id && !have.has(x.id)) S[p].push(x); });
        });
        applyTheme(); render();
        this.mode = 'cloud'; this.save();
      } else if (any) {
        const ns = blankState();
        snaps.forEach((s, i) => {
          if (!s.exists) return; const d = s.data(); const p = PARTS[i];
          if (p === 'meta') { const dd = JSON.parse(JSON.stringify(d)); Object.assign(ns, dd); ns.settings = Object.assign(blankState().settings, dd.settings || {}); }
          else ns[p] = JSON.parse(JSON.stringify(d.items || []));
          this.lastSent[p] = JSON.stringify(d);
        });
        S = normalize(JSON.parse(JSON.stringify(ns))); this.mode = 'cloud'; this.saveLocal();
        applyTheme(); render();
      } else {
        this.mode = 'cloud';
        const hasLocal = S.tasks.length || S.lists.length || S.events.length || S.notes.length || S.areas.length || S.routines.length || S.settings.tutorialSeen;
        if (hasLocal) this.save();
      }
      setStoreLabel();
    } catch (e) { this.mode = 'local'; setStoreLabel(); }
  }
};
function setStoreLabel() {
  const t = window.NATIVE ? '📱 Guardado en este teléfono' : Store.mode === 'cloud' ? '☁️ Guardado en tu cuenta de Claude' : '💾 Guardado en este navegador';
  $$('.storeLbl').forEach(el => el.textContent = t);
}
function normalize(st) {
  const b = blankState();
  for (const k of Object.keys(b)) if (st[k] === undefined) st[k] = b[k];
  st.settings = Object.assign(b.settings, st.settings || {});
  if (!Array.isArray(st.types) || !st.types.length) st.types = b.types;
  ['areas','tasks','events','routines','notes','lists'].forEach(k => { if (!Array.isArray(st[k])) st[k] = []; });
  return st;
}
function save(...parts) { Store.save(parts.length ? parts : null); }

/* ========== Búsquedas de datos ========== */
const typeById = id => S.types.find(t => t.id === id) || S.types[0] || DEFAULT_TYPES[0];
const areaById = id => S.areas.find(a => a.id === id);
const evType = id => EVENT_TYPES.find(t => t.id === id) || EVENT_TYPES[0];
const isLate = t => t.status !== 'Completada' && !!t.date && t.date < todayISO();
const isDone = t => t.status === 'Completada';
const areaVisible = id => !id || !S.settings.hiddenAreas.includes(id);
const routineOn = (r, d) => r.days.includes(dow(d)) && (!r.from || d >= r.from) && (!r.to || d <= r.to);
function itemsOn(d, opts = {}) {
  const ev = S.events.filter(e => e.date === d && (opts.all || areaVisible(e.areaId)));
  const tk = S.tasks.filter(t => t.date === d && (opts.all || areaVisible(t.areaId)) && (opts.withDone || !isDone(t)));
  const rt = S.routines.filter(r => routineOn(r, d) && (opts.all || areaVisible(r.areaId)));
  return {ev, tk, rt};
}
function sortedDay(d, opts) {
  const {ev, tk, rt} = itemsOn(d, opts);
  const arr = [
    ...ev.map(x => ({k: 'ev', x, m: x.allDay ? -1 : toMin(x.start)})),
    ...tk.map(x => ({k: 'tk', x, m: x.time ? toMin(x.time) : 1500})),
    ...rt.map(x => ({k: 'rt', x, m: toMin(x.start)}))
  ];
  return arr.sort((a, b) => a.m - b.m);
}
function colorOf(k, x) {
  const a = areaById(x.areaId);
  if (a) return a.color;
  if (k === 'ev') return getComputedStyle(document.documentElement).getPropertyValue('--teal').trim() || '#0f9d8f';
  if (k === 'tk') return typeById(x.typeId).color;
  return '#7b4fd6';
}

/* ========== Feriados EE. UU. y Puerto Rico ========== */
function nthWeekday(y, m, wd, n) { const d = new Date(y, m, 1); const off = (wd - d.getDay() + 7) % 7; return new Date(y, m, 1 + off + (n - 1) * 7); }
function lastWeekday(y, m, wd) { const d = new Date(y, m + 1, 0); d.setDate(d.getDate() - ((d.getDay() - wd + 7) % 7)); return d; }
function easter(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3),
    h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
    month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(y, month - 1, day);
}
const holiCache = {};
function holidaysOfYear(y) {
  if (holiCache[y]) return holiCache[y];
  const L = []; const F = (m, d) => new Date(y, m, d);
  const add = (date, name, fed, fixed) => L.push({date, name, fed, fixed});
  add(F(0, 1), 'Año Nuevo', true, true);
  add(F(0, 6), 'Día de Reyes', false, true);
  add(nthWeekday(y, 0, 1, 3), 'Martin Luther King Jr.', true, false);
  add(nthWeekday(y, 1, 1, 3), 'Presidentes y Próceres', true, false);
  add(F(2, 2), 'Ciudadanía Americana', false, true);
  add(F(2, 22), 'Abolición de la Esclavitud', false, true);
  const gf = easter(y); gf.setDate(gf.getDate() - 2); add(gf, 'Viernes Santo', false, false);
  add(lastWeekday(y, 4, 1), 'Recordación (Memorial Day)', true, false);
  add(F(5, 19), 'Juneteenth (EE. UU.)', true, true);
  add(F(6, 4), 'Independencia de EE. UU.', true, true);
  add(F(6, 25), 'Constitución de Puerto Rico', false, true);
  add(F(6, 27), 'José Celso Barbosa', false, true);
  add(nthWeekday(y, 8, 1, 1), 'Día del Trabajo', true, false);
  add(nthWeekday(y, 9, 1, 2), 'Día de la Raza', true, false);
  add(F(10, 11), 'Día del Veterano', true, true);
  add(F(10, 19), 'Puertorriqueñidad', false, true);
  add(nthWeekday(y, 10, 4, 4), 'Acción de Gracias', true, false);
  add(F(11, 25), 'Navidad', true, true);
  const out = [];
  L.forEach(h => {
    out.push({date: iso(h.date), name: h.name});
    if (h.fixed && h.date.getDay() === 0) { const n = new Date(h.date); n.setDate(n.getDate() + 1); out.push({date: iso(n), name: h.name + ' (se observa)'}); }
    if (h.fixed && h.fed && h.date.getDay() === 6) { const n = new Date(h.date); n.setDate(n.getDate() - 1); out.push({date: iso(n), name: h.name + ' (se observa)'}); }
  });
  holiCache[y] = out; return out;
}
function holidaysOn(d) {
  if (!S.settings.showHolidays) return [];
  const y = +d.slice(0, 4);
  return [...holidaysOfYear(y), ...holidaysOfYear(y + 1)].filter(h => h.date === d);
}

/* ========== Adivinar tipo y área por palabras ========== */
const KW = [
  ['cita', /\b(cita|dentista|m[eé]dic[oa]|doctor[a]?|pediatra|terapia|laboratorio|veterinari[oa]|oftalm|ginec|cardi[oó]log)/i],
  ['salud', /\b(medicina|pastilla|vacuna|farmacia|presi[oó]n|salud|receta)/i],
  ['finanzas', /\b(pagar|pago|factura|banco|luz|agua|renta|alquiler|hipoteca|pr[eé]stamo|tarjeta|seguro|impuesto|planilla|presupuesto|ahorr)/i],
  ['compras', /\b(comprar|compra|supermercado|colmado|tienda|mercado|amazon)/i],
  ['ejercicio', /\b(gimnasio|gym|correr|caminar|ejercicio|yoga|nadar|entrenar|bicicleta)/i],
  ['trabajo', /\b(reuni[oó]n|informe|jefe|oficina|trabajo|proyecto|correo|email|cliente|presentaci[oó]n|entregar)/i],
  ['familia', /\b(mam[aá]|pap[aá]|hij[oa]s?|ni[ñn][oa]s?|abuel[oa]|familia|esposa?o?|t[ií][oa]|sobrin|cumplea[ñn]os)/i],
  ['mandados', /\b(recoger|llevar|buscar|mandado|gasolina|carro|taller|correo postal|lavander[ií]a|banco)/i],
  ['hogar', /\b(limpiar|lavar|casa|cocinar|barrer|ropa|plantas|basura|arreglar|reparar|hogar|cuarto|patio)/i],
  ['recordatorio', /\b(recordar|acu[eé]rdate|no olvidar|recordatorio)/i]
];
const TYPE_TO_AREA = {cita: 'salud', salud: 'salud', finanzas: 'finanzas', compras: 'hogar', ejercicio: 'salud', trabajo: 'trabajo', familia: 'familia', hogar: 'hogar', mandados: 'hogar'};
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function guess(text) {
  let typeId = 'pendiente';
  for (const [id, re] of KW) if (re.test(text) && S.types.some(t => t.id === id)) { typeId = id; break; }
  const nt = norm(text);
  let area = S.areas.find(a => nt.includes(norm(a.name)));
  if (!area && TYPE_TO_AREA[typeId]) area = S.areas.find(a => norm(a.name) === TYPE_TO_AREA[typeId] || norm(a.name).startsWith(TYPE_TO_AREA[typeId]));
  if (!area) { const tn = norm(typeById(typeId).name); area = S.areas.find(a => norm(a.name) === tn); }
  let time = null;
  const m = text.match(/\b(?:a las|a la)\s+(\d{1,2})(?::(\d{2}))?\s*(a\.?\s?m\.?|p\.?\s?m\.?)?/i) || text.match(/\b(\d{1,2})(?::(\d{2}))?\s*(a\.?\s?m\.?|p\.?\s?m\.?)/i);
  if (m) {
    let h = +m[1]; const mi = +(m[2] || 0); const ap = (m[3] || '').toLowerCase().replace(/[\s.]/g, '');
    if (ap === 'pm' && h < 12) h += 12; if (ap === 'am' && h === 12) h = 0;
    if (!ap && h >= 1 && h <= 6) h += 12;
    if (h < 24 && mi < 60) time = pad(h) + ':' + pad(mi);
  }
  return {typeId, areaId: area ? area.id : null, time};
}

/* ========== Enlaces a Google Calendar y Outlook ========== */
function calLinks(o) {
  // o: {title, date, start, end, allDay, details, place}
  const st = o.start || '09:00'; const en = o.end || fromMin(Math.min(toMin(st) + 60, 23 * 60 + 59));
  const dc = o.date.replace(/-/g, '');
  let gd;
  if (o.allDay) gd = dc + '/' + addDays(o.date, 1).replace(/-/g, '');
  else gd = dc + 'T' + st.replace(':', '') + '00/' + dc + 'T' + en.replace(':', '') + '00';
  const g = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(o.title) + '&dates=' + gd +
    '&details=' + encodeURIComponent(o.details || '') + '&location=' + encodeURIComponent(o.place || '');
  const ost = o.allDay ? o.date : o.date + 'T' + st + ':00'; const oen = o.allDay ? addDays(o.date, 1) : o.date + 'T' + en + ':00';
  const out = 'https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=' + encodeURIComponent(o.title) +
    '&startdt=' + encodeURIComponent(ost) + '&enddt=' + encodeURIComponent(oen) + '&body=' + encodeURIComponent(o.details || '') +
    '&location=' + encodeURIComponent(o.place || '') + (o.allDay ? '&allday=true' : '');
  return `<div class="extlinks"><a class="btn sec sm" href="${esc(g)}" target="_blank" rel="noopener">📆 Enviar a Google Calendar</a><a class="btn sec sm" href="${esc(out)}" target="_blank" rel="noopener">📧 Enviar a Outlook</a></div>`;
}

/* ========== Avisos ========== */
function toast(msg, cls = '', action) {
  const box = $('#toasts'); const el = document.createElement('div'); el.className = 'toast ' + cls;
  const sp = document.createElement('span'); sp.textContent = msg; sp.style.flex = '1'; el.appendChild(sp);
  if (action) { const b = document.createElement('button'); b.className = 'tact'; b.textContent = action.label; b.onclick = () => { action.fn(); el.remove(); }; el.appendChild(b); }
  box.appendChild(el); setTimeout(() => el.remove(), action ? 5000 : cls === 'rem' ? 9000 : 2800);
}
function reminderTime(dateStr, timeStr, before) {
  const d = parseISO(dateStr); const m = timeStr ? toMin(timeStr) : 9 * 60; d.setHours(0, m, 0, 0);
  return d.getTime() - before * 60000;
}
function checkReminders() {
  if (window.NATIVE) return; // en Android los avisos los da el sistema
  const now = Date.now(); let changed = false;
  const fire = (key, title, when) => {
    if (S.notified[key]) return;
    if (when <= now && now - when < 6 * 3600 * 1000) {
      S.notified[key] = 1; changed = true;
      toast('🔔 ' + title, 'rem'); beep(2);
      if (S.settings.notif && 'Notification' in window && Notification.permission === 'granted') { try { new Notification('Mi Organizador Personal', {body: title}); } catch (e) {} }
    }
  };
  S.tasks.forEach(t => { if (t.reminder != null && !isDone(t) && t.date) fire('t' + t.id + t.date + (t.time || '') + t.reminder, t.title, reminderTime(t.date, t.time, t.reminder)); });
  S.events.forEach(e => { if (e.reminder != null) fire('e' + e.id + e.date + (e.start || '') + e.reminder, e.title, reminderTime(e.date, e.allDay ? null : e.start, e.reminder)); });
  if (changed) { const keys = Object.keys(S.notified); if (keys.length > 400) keys.slice(0, keys.length - 300).forEach(k => delete S.notified[k]); Store.quiet = true; save('meta'); Store.quiet = false; }
}
let audioCtx = null;
function beep(n = 3) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    for (let i = 0; i < n; i++) {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain(); o.type = 'sine'; o.frequency.value = 880;
      const t0 = audioCtx.currentTime + i * 0.35; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.3, t0 + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);
      o.connect(g).connect(audioCtx.destination); o.start(t0); o.stop(t0 + 0.3);
    }
  } catch (e) {}
}

/* Si algo falla, avisar en pantalla (ayuda a encontrar el problema) */
let _errShown = 0;
window.addEventListener('error', e => { if (_errShown++ < 2 && window.toast && document.getElementById('toasts')) toast('⚠️ Algo falló: ' + String(e.message || e).slice(0, 90)); });
window.addEventListener('unhandledrejection', e => { const m = String((e.reason && (e.reason.message || e.reason.code)) || e.reason || ''); if (/AbortError|NotAllowed|play\(\)/i.test(m)) return; if (_errShown++ < 2 && document.getElementById('toasts')) toast('⚠️ Algo falló: ' + m.slice(0, 90)); });
