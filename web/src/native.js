/* ========== Funciones del teléfono (solo en la app de Android) ========== */
(function () {
  const C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  const core = window.capacitorExports;
  const LN = window.capacitorLocalNotifications.LocalNotifications;
  const Pref = window.capacitorPreferences.Preferences;
  const App = window.capacitorApp.App;
  const Browser = window.capacitorBrowser.Browser;
  const Org = core.registerPlugin('Organizador');
  const REPO = 'luigito-dev/mi-organizador';
  const APK = 'https://github.com/' + REPO + '/releases/latest/download/mi-organizador.apk';
  let ready = false; const queue = [];
  const whenReady = fn => ready ? fn() : queue.push(fn);
  const relDay = d => d === todayISO() ? 'Hoy' : d === addDays(todayISO(), 1) ? 'Mañana' : fmtShort(d);

  const N = window.NATIVE = {
    version: '__APP_VERSION__',
    update: null,
    snoozes: [],

    /* ---- Datos: se guardan en el teléfono ---- */
    async load() {
      try { const r = await Pref.get({key: 'datos'}); if (r && r.value) return JSON.parse(r.value); } catch (e) {}
      return Store.loadLocal();
    },
    persist() { return Pref.set({key: 'datos', value: JSON.stringify(S)}).catch(() => {}); },
    onSave(parts) {
      clearTimeout(this._p); this._p = setTimeout(() => this.persist(), 300);
      if (!parts || parts.some(p => ['tasks', 'events', 'routines', 'meta', 'areas', 'habits'].includes(p))) {
        clearTimeout(this._s); this._s = setTimeout(() => { this.reschedule(); this.pushWidget(); }, 700);
      }
    },
    saveBackup(name, text) { return Org.saveBackup({name, text}); },

    /* ---- Notificaciones ---- */
    async ensurePermission(silent) {
      try {
        let p = await LN.checkPermissions();
        if (p.display !== 'granted' && !silent) p = await LN.requestPermissions();
        if (p.display !== 'granted') { if (!silent) toast('Para recibir avisos, permite las notificaciones de Mi Organizador en los Ajustes del teléfono.'); return false; }
        return true;
      } catch (e) { return false; }
    },
    idOf(s) { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h) % 2000000000 + 1; },
    upcoming() {
      const now = Date.now(), horizon = now + 60 * 86400000, out = [];
      S.tasks.forEach(t => {
        if (t.reminder == null || isDone(t) || !t.date) return;
        const at = reminderTime(t.date, t.time, t.reminder);
        if (at > now + 3000 && at < horizon) { const a = areaById(t.areaId); out.push({at, kind: 't', id: t.id, title: '🔔 ' + t.title, body: relDay(t.date) + (t.time ? ' a las ' + fmtTime(t.time) : '') + (a ? ' · ' + a.name : '')}); }
      });
      S.events.forEach(e => {
        if (e.reminder == null) return;
        const at = reminderTime(e.date, e.allDay ? null : e.start, e.reminder);
        if (at > now + 3000 && at < horizon) out.push({at, kind: 'e', id: e.id, title: evType(e.evType).icon + ' ' + e.title, body: relDay(e.date) + (e.allDay ? ' · todo el día' : ' a las ' + fmtTime(e.start)) + (e.place ? ' · ' + e.place : '')});
      });
      if (typeof waterReminderList === 'function') waterReminderList(3).filter(x => x.at > now + 3000).forEach(x => out.push({at: x.at, kind: x.kind, id: x.id, title: x.title, body: x.body}));
      this.snoozes.filter(z => z.at > now + 1000).forEach(z => out.push(z));
      return out.sort((a, b) => a.at - b.at).slice(0, 60);
    },
    async reschedule() {
      try {
        const pend = await LN.getPending();
        if (pend.notifications && pend.notifications.length) await LN.cancel({notifications: pend.notifications.map(n => ({id: n.id}))});
        const list = this.upcoming(); if (!list.length) return;
        if (!(await this.ensurePermission(true))) return;
        await LN.schedule({notifications: list.map(x => ({
          id: this.idOf(x.kind + x.id + x.at), title: x.title, body: x.body,
          schedule: {at: new Date(x.at), allowWhileIdle: true}, channelId: 'recordatorios',
          actionTypeId: x.kind === 't' ? 'TAREA' : x.kind === 'h' ? 'AGUA' : 'EVENTO', extra: {kind: x.kind, id: x.id},
          smallIcon: 'ic_stat_notify', iconColor: '#1F5FBF'
        }))});
      } catch (e) { console.warn('avisos', e); }
    },
    async snooze(n) {
      const ex = n.extra || {};
      this.snoozes = this.snoozes.filter(z => z.at > Date.now());
      this.snoozes.push({at: Date.now() + 10 * 60000, kind: ex.kind, id: ex.id, title: n.title, body: 'Pospuesto · ' + (n.body || '')});
      await Pref.set({key: 'pospuestos', value: JSON.stringify(this.snoozes)}).catch(() => {});
      await this.reschedule(); toast('Te aviso otra vez en 10 minutos ⏰');
    },
    async testNotification() {
      if (!(await this.ensurePermission())) return;
      await LN.schedule({notifications: [{id: 99, title: '🔔 Aviso de prueba', body: '¡Funciona! Así te avisaré aunque la app esté cerrada.', schedule: {at: new Date(Date.now() + 10000), allowWhileIdle: true}, channelId: 'recordatorios', smallIcon: 'ic_stat_notify', iconColor: '#1F5FBF'}]});
      toast('Cierra la app: en 10 segundos te llega el aviso de prueba.');
    },

    /* ---- Widget ---- */
    pushWidget() {
      const days = {};
      for (let i = 0; i < 8; i++) {
        const d = addDays(todayISO(), i);
        days[d] = sortedDay(d, {all: true}).map(it => ({
          i: it.k === 'ev' ? evType(it.x.evType).icon : it.k === 'rt' ? '🔁' : typeById(it.x.typeId).icon,
          h: it.k === 'ev' ? (it.x.allDay ? 'Todo el día' : fmtTime(it.x.start)) : it.k === 'rt' ? fmtTime(it.x.start) : (it.x.time ? fmtTime(it.x.time) : ''),
          n: it.x.title || it.x.name
        }));
      }
      const stats = {}; Object.keys(days).forEach(d => { const tk = S.tasks.filter(x => x.date === d); stats[d] = [tk.filter(isDone).length, tk.length]; });
      return Org.updateWidget({data: JSON.stringify({days, stats})}).catch(() => {});
    },
    handleAction(a) {
      whenReady(() => {
        if (a === 'nueva') { go('dia'); setTimeout(() => openTaskForm(), 150); }
        else if (a === 'listas') { go('tareas'); UI.taskMode = 'listas'; UI.taskHub = false; render(); }
        else if (a === 'dia') go('dia');
      });
    },

    /* ---- Actualizaciones ---- */
    newer(a, b) { const pa = a.replace(/^v/, '').split('.').map(Number), pb = b.replace(/^v/, '').split('.').map(Number); for (let i = 0; i < 3; i++) { if ((pa[i] || 0) > (pb[i] || 0)) return true; if ((pa[i] || 0) < (pb[i] || 0)) return false; } return false; },
    async checkUpdate(manual) {
      if (!/^\d/.test(this.version)) { if (manual) toast('Versión de prueba'); return; }
      try {
        const r = await fetch('https://api.github.com/repos/' + REPO + '/releases/latest', {cache: 'no-store'});
        if (!r.ok) throw 0; const j = await r.json(); const tag = (j.tag_name || '').replace(/^v/, '');
        if (tag && this.newer(tag, this.version)) { this.update = tag; this.showBanner(); if (UI.view === 'config') renderView(); }
        else if (manual) toast('Ya tienes la versión más reciente ✓');
      } catch (e) { if (manual) toast('No pude revisar ahora. ¿Tienes internet?'); }
    },
    download() { Browser.open({url: APK}); toast('Cuando termine de bajar, abre el archivo para instalar la versión nueva. Tus datos se quedan.'); },
    showBanner() {
      if (!this.update || $('#updBan') || this._banHidden) return;
      const b = document.createElement('div'); b.id = 'updBan'; b.className = 'toast';
      b.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:calc(150px + env(safe-area-inset-bottom));z-index:150;width:min(420px,92vw);background:var(--blue);color:#fff';
      b.innerHTML = `<span class="sp">✨ Hay una versión nueva (${esc(this.update)})</span><button class="btn sm" style="background:#fff;color:var(--blue-d)" id="updGo">Actualizar</button><button style="color:#fff;padding:4px 8px" id="updX" aria-label="Cerrar">✕</button>`;
      document.body.appendChild(b);
      $('#updGo').onclick = () => { this.download(); b.remove(); };
      $('#updX').onclick = () => { this._banHidden = true; b.remove(); };
    },

    /* ---- Configuración ---- */
    decorateConfig(v) {
      const rn = $('#rowNotif', v);
      if (rn) {
        rn.innerHTML = `<div class="lbl">Avisos del teléfono<small>Te llegan aunque la app esté cerrada o el teléfono bloqueado. Enciende la campanita 🔔 en una tarea o evento.</small><small id="nState"></small></div><button class="btn sec sm" id="nPerm">Permitir avisos</button><button class="btn sec sm" id="nTest">Probar un aviso</button>`;
        LN.checkPermissions().then(p => { const s = $('#nState'); if (s) s.textContent = p.display === 'granted' ? '✓ Avisos permitidos' : '⚠️ Los avisos no están permitidos todavía'; if (p.display === 'granted') { const b = $('#nPerm'); if (b) b.remove(); } }).catch(() => {});
        $('#nPerm', v).onclick = async () => { if (await this.ensurePermission()) { toast('Avisos permitidos 🔔'); this.reschedule(); renderView(); } };
        $('#nTest', v).onclick = () => this.testNotification();
      }
      const rd = $('#rowData', v);
      if (rd) rd.innerHTML = `<div class="lbl">Dónde se guardan<small>📱 Guardado en este teléfono</small><small>Tus datos viven solo en este teléfono. Si borras la app o cambias de teléfono, se pierden: haz copias con “Exportar” (se guardan en la carpeta Descargas) y guárdalas en tu correo o Drive.</small></div>`;
      const card = v.querySelector('.card:last-of-type');
      const row = document.createElement('div'); row.className = 'set-row';
      row.innerHTML = `<div class="lbl">Versión ${esc(this.version)}<small>${this.update ? '✨ Hay una versión nueva: ' + esc(this.update) : 'Las mejoras nuevas se instalan encima sin perder tus datos.'}</small></div>${this.update ? '<button class="btn sm" id="vUp">Actualizar</button>' : '<button class="btn sec sm" id="vChk">Buscar actualización</button>'}`;
      card.appendChild(row);
      const up = $('#vUp', v); if (up) up.onclick = () => this.download();
      const ck = $('#vChk', v); if (ck) ck.onclick = () => this.checkUpdate(true);
    },

    /* ---- Arranque ---- */
    async start() {
      try { const z = await Pref.get({key: 'pospuestos'}); if (z && z.value) this.snoozes = JSON.parse(z.value).filter(x => x.at > Date.now()); } catch (e) {}
      try {
        await LN.createChannel({id: 'recordatorios', name: 'Recordatorios', description: 'Avisos de tus tareas y eventos', importance: 5, visibility: 1, vibration: true});
        await LN.registerActionTypes({types: [
          {id: 'TAREA', actions: [{id: 'hecha', title: '✓ Completar'}, {id: 'posponer', title: 'Posponer 10 min'}]},
          {id: 'EVENTO', actions: [{id: 'posponer', title: 'Posponer 10 min'}]},
          {id: 'AGUA', actions: [{id: 'bebi', title: '💧 Bebí 16 oz'}, {id: 'posponer', title: 'Posponer 10 min'}]}
        ]});
        LN.addListener('localNotificationActionPerformed', ev => whenReady(() => {
          const n = ev.notification || {}, ex = n.extra || {};
          if (ev.actionId === 'hecha' && ex.kind === 't') setDone(ex.id, true);
          else if (ev.actionId === 'bebi' && ex.kind === 'h') { const h = (S.habits || []).find(x => x.id === ex.id); if (h) { const d = todayISO(); h.log = h.log || {}; h.log[d] = habCount(h, d) + OZ; save('habits'); if (UI.view === 'habitos') renderView(); toast('💧 +16 oz anotadas'); } }
          else if (ev.actionId === 'posponer') this.snooze(n);
          else if (ex.kind === 't' && S.tasks.some(t => t.id === ex.id)) openTaskDetail(ex.id);
          else if (ex.kind === 'e' && S.events.some(e => e.id === ex.id)) openEventDetail(ex.id);
          else if (ex.kind === 'hd') { const h = (S.habits || []).find(x => x.id === ex.id); if (h) { go('habitos'); habTap(h, todayISO()); } }
          else if (ex.kind === 'h') { const h = (S.habits || []).find(x => x.id === ex.id); if (h) { go('habitos'); openWater(h, todayISO()); } }
        }));
      } catch (e) { console.warn(e); }
      // Botón de atrás de Android
      App.addListener('backButton', () => {
        if (sheets.length) sheets[sheets.length - 1].close();
        else if (UI.view === 'tareas' && UI.openList) { UI.openList = null; renderView(); }
        else if (UI.view === 'areas' && UI.openArea) { UI.openArea = null; renderView(); }
        else if (UI.view !== 'dia') go('dia');
        else App.minimizeApp();
      });
      App.addListener('pause', () => this.persist());
      App.addListener('resume', () => { if (!sheets.length) render(); this.pushWidget(); this.reschedule(); });
      window.addEventListener('widgetAction', e => this.handleAction(e.action));
      // Enlaces a Google Calendar / Outlook: abrir fuera de la app
      document.addEventListener('click', e => { const a = e.target.closest('a[target=_blank]'); if (a) { e.preventDefault(); Browser.open({url: a.href}); } }, true);
      ready = true; queue.splice(0).forEach(f => f());
      try { const r = await Org.getPendingAction(); if (r && r.action) this.handleAction(r.action); } catch (e) {}
      this.pushWidget(); this.reschedule();
      setTimeout(() => this.checkUpdate(false), 4000);
    }
  };
})();
