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
  const REPO = 'luigito-dev/mi-organizador-personal';
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
        if (isDone(t) || !t.date) return;
        remsOf(t).forEach(r => { const at = reminderTime(t.date, t.time, r);
          if (at > now + 3000 && at < horizon) { const a = areaById(t.areaId); out.push({at, kind: 't', id: t.id, title: '🔔 ' + t.title, body: relDay(t.date) + (a ? ' · ' + a.name : '')}); } });
      });
      S.events.forEach(e => {
        remsOf(e).forEach(r => { const at = reminderTime(e.date, e.allDay ? null : e.start, r);
          if (at > now + 3000 && at < horizon) out.push({at, kind: 'e', id: e.id, title: evType(e.evType).icon + ' ' + e.title, body: relDay(e.date) + (e.place ? ' · ' + e.place : '')}); });
      });
      // Cuentas: aviso a las 9:00 a.m. del día, con el sonido elegido
      (S.settings.countdowns || []).forEach(c => {
        const snd = c.cdSound || 'campana'; if (snd === 'none' || !c.date) return;
        const d = parseISO(c.date), at = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9, 0).getTime();
        if (at > now + 3000 && at < horizon) out.push({at, kind: 'c', id: c.id, title: '🎉 ' + c.name, body: 'Hoy se cumple esta cuenta', channel: snd === 'telefono' ? 'recordatorios' : 'cuenta_' + snd});
      });
      if (typeof waterReminderList === 'function') waterReminderList(3).filter(x => x.at > now + 3000).forEach(x => out.push({at: x.at, kind: x.kind, id: x.id, title: x.title, body: x.body}));
      this.snoozes.filter(z => z.at > now + 1000).forEach(z => out.push(z));
      return out.sort((a, b) => a.at - b.at).slice(0, 60);
    },
    async reschedule() {
      try {
        const pend = await LN.getPending();
        if (pend.notifications && pend.notifications.length) await LN.cancel({notifications: pend.notifications.map(n => ({id: n.id}))});
        const base = this.upcoming(); if (!base.length) return;
        if (!(await this.ensurePermission(true))) return;
        // Tareas y eventos con aviso se repiten: el aviso y 2 repeticiones más, cada 2 minutos.
        // Una tarea deja de avisar al marcarla como hecha. Los eventos avisan 3 veces aunque no se marquen.
        const now = Date.now(), list = [];
        base.forEach(x => {
          list.push(x);
          if (x.kind === 't' || x.kind === 'e') [1, 2].forEach(n => { const at = x.at + n * 120000; if (at > now + 3000) list.push({...x, at, rep: n}); });
        });
        // Uno por uno: si un aviso falla, los demás igual se programan
        let fallos = 0;
        for (const x of list) {
          try {
            await LN.schedule({notifications: [{
              id: this.idOf(x.kind + x.id + x.at + (x.rep || '')), title: x.title, body: x.body || ' ',
              schedule: {at: new Date(x.at), allowWhileIdle: true}, channelId: x.channel || 'recordatorios',
              actionTypeId: x.kind === 't' ? 'TAREA' : x.kind === 'h' ? 'AGUA' : 'EVENTO', extra: {kind: x.kind, id: x.id},
              smallIcon: 'ic_stat_notify', iconColor: '#1F5FBF'
            }]});
          } catch (e) { fallos++; console.warn('aviso', e); }
        }
        if (fallos) console.warn('avisos que no se pudieron programar:', fallos);
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
      // Pendientes de TAREAS (no eventos) para el widget de calendario, desde 31 días atrás hasta 70 días adelante
      const pend = {};
      for (let i = -31; i <= 70; i++) {
        const d = addDays(todayISO(), i);
        const L = S.tasks.filter(t => t.date === d && !isDone(t)).map(t => ({id: t.id, n: t.title || '', h: t.time ? fmtTime(t.time) : ''}));
        if (L.length) pend[d] = L;
      }
      // Escena de hoy (festivo o evento con emoji) para el widget
      const hoy = todayISO(), fh = holidaysOn(hoy)[0];
      const colorFes = n => /puerto rico|puertorrique/i.test(n) ? '#c8102e' : /gracias/i.test(n) ? '#b8612a' : /año nuevo/i.test(n) ? '#7b2ff7' : /navidad/i.test(n) ? '#1e7d4a' : /reyes/i.test(n) ? '#b8860b' : /independencia|juneteenth/i.test(n) ? '#1f5fbf' : '#c0457a';
      const fe = S.events.find(e => e.date === hoy);
      const scene = fh ? {n: fh.name, e: holiEmoji(fh.name), c: colorFes(fh.name)} : fe ? {n: fe.title, e: (evType(fe.evType) || {}).icon || '📌', c: '#1F5FBF'} : null;
      // Agua, hábitos de hoy y comer saludable para sus widgets
      const HB = S.habits || [], td = todayISO();
      const aguaH = HB.find(h => habKind(h) === 'agua'), foodH = HB.find(h => h.food);
      const water = aguaH ? {id: aguaH.id, n: habCount(aguaH, td), g: habGoal(aguaH), oz: OZ} : null;
      const habs = HB.filter(h => h !== aguaH && h !== foodH && !h.challenge).slice(0, 5).map(h => ({id: h.id, n: h.name || '', i: h.icon || '', d: habDone(h, td) ? 1 : 0}));
      const fd = foodH ? ((foodH.food || {})[td] || {}) : null;
      const food = foodH ? {id: foodH.id, g: FOOD_GOAL(foodH), c: {v: fd.v || 0, f: fd.f || 0, g: fd.g || 0, p: fd.p || 0, l: fd.l || 0}} : null;
      return Org.updateWidget({data: JSON.stringify({days, stats, pend, scene, water, habs, food})}).catch(() => {});
    },
    /* Aplica los cambios hechos desde el widget (marcar tareas) */
    async applyWidgetChanges() {
      try {
        const r = await Org.takeWidgetChanges();
        const ch = JSON.parse((r && r.changes) || '[]');
        let changed = false;
        ch.forEach(c => {
          const t = S.tasks.find(x => x.id === c.id);
          if (t) { t.status = c.done ? 'Completada' : 'Pendiente'; t.completedAt = c.done ? Date.now() : null; changed = true; }
        });
        if (changed) { save('tasks'); render(); }
        // Agua, hábitos y porciones marcados desde los widgets
        const ex = JSON.parse((r && r.extra) || '[]');
        let hab = false;
        ex.forEach(x => {
          const h = S.habits.find(q => q.id === x.id) || (x.k === 'agua' ? S.habits.find(q => habKind(q) === 'agua') : x.k === 'food' ? S.habits.find(q => q.food) : null);
          if (!h) return;
          const d = x.d || todayISO();
          h.log = h.log || {};
          if (x.k === 'agua') { h.log[d] = Math.max(0, habCount(h, d) + (+x.oz || 0)); if (!h.log[d]) delete h.log[d]; hab = true; }
          if (x.k === 'hab') { h.log[d] = habDone(h, d) ? 0 : habGoal(h); hab = true; }
          if (x.k === 'food' && ['v', 'f', 'g', 'p', 'l'].includes(x.sec)) {
            h.food = h.food || {};
            const day = h.food[d] = h.food[d] || {f: 0, v: 0, g: 0, p: 0, l: 0, meals: {}};
            day[x.sec] = (day[x.sec] || 0) + 1; day.order = (day.order || '') + x.sec;
            const t = (day.f || 0) + (day.v || 0); if (t) h.log[d] = t; else delete h.log[d];
            hab = true;
          }
        });
        if (hab) { save('habits'); if (!sheets.length) render(); this.pushWidget(); }
      } catch (e) {}
    },
    handleAction(a) {
      whenReady(() => {
        if (a === 'nueva') { go('dia'); setTimeout(() => openTaskForm(), 150); }
        else if (a === 'listas') { go('listas'); render(); }
        else if (a === 'dia') go('dia');
        else if (a === 'calendario') go('calendario');
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
        // Un canal por sonido de cuenta (en Android el sonido se fija al crear el canal)
        for (const s of ['campana', 'arpa', 'fanfarria']) await LN.createChannel({id: 'cuenta_' + s, name: 'Cuentas: ' + s, description: 'Aviso de cuentas', importance: 5, visibility: 1, vibration: true, sound: 'sonido_' + s});
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
      App.addListener('resume', async () => { await this.applyWidgetChanges(); if (!sheets.length) render(); this.pushWidget(); this.reschedule(); });
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
