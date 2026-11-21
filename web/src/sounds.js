/* ========== Sonidos de ambiente (generados en el momento, sin archivos) ========== */
const SOUNDS = [
  ['none', 'Silencio'], ['tick', 'Tic-tac'], ['rain', 'Lluvia'], ['storm', 'Tormenta'],
  ['waves', 'Olas'], ['stream', 'Río'], ['forest', 'Bosque'], ['birds', 'Mañana'],
  ['coqui', 'Coquíes'], ['cicada', 'Verano'], ['fire', 'Fogata'], ['wind', 'Viento'],
  ['boil', 'Hervir'], ['cafe', 'Cafetería'], ['wood', 'Pez de madera'], ['far', 'Lejano'],
  ['white', 'Ruido blanco'], ['custom', 'Mi sonido']
];
const SOUND_ICONS = {
  none: '<path d="M9 18V6l10-2v10"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="14" r="2.5"/><path d="M3 3l18 18"/>',
  tick: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M10 2h4"/>',
  rain: '<path d="M7 15a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 7.5a3.8 3.8 0 0 1 .5 7.5z"/><path d="M8 19l-1 2M12 19l-1 2M16 19l-1 2"/>',
  storm: '<path d="M7 14a4 4 0 0 1-.6-8A5.5 5.5 0 0 1 17 6.5a3.8 3.8 0 0 1 .5 7.5"/><path d="M12 12l-2.5 4.5h4L11 21"/>',
  waves: '<path d="M2 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 13c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>',
  stream: '<path d="M4 20c4-1 3-5 7-6s5-4 3-8M9 20c4-1 4-4 8-5"/><path d="M3 9l4-5 4 5"/>',
  forest: '<path d="M7 3L3 11h3l-3 5h8l-3-5h3zM7 16v5M17 6l-3 6h2l-2 4h6l-2-4h2zM17 16v5"/>',
  birds: '<path d="M4 15c3-6 7-7 12-6l4-3-1 5c-1 4-5 7-10 7l-3 3v-4"/><circle cx="16" cy="9.5" r=".6" fill="currentColor"/>',
  coqui: '<ellipse cx="12" cy="14" rx="6" ry="4.5"/><circle cx="9" cy="9" r="2"/><circle cx="15" cy="9" r="2"/><path d="M6 17l-3 3M18 17l3 3M10 15.5c1 .8 3 .8 4 0"/>',
  cicada: '<path d="M12 4c-2.5 0-4 2-4 4.5S10 20 12 20s4-9 4-11.5S14.5 4 12 4z"/><path d="M8 9l-4 3 4 1M16 9l4 3-4 1M10 4l-1-2M14 4l1-2"/>',
  fire: '<path d="M12 21c4 0 6-2.5 6-6 0-4-3-6-4-10-2 2-3 4-3 6-1-1-1.5-2-1.5-3C7 10 6 12.5 6 15c0 3.5 2 6 6 6z"/><path d="M12 21c-1.5 0-2.5-1-2.5-2.5S11 15 12 14c1 1 2.5 2.5 2.5 4.5S13.5 21 12 21z"/>',
  wind: '<path d="M3 9h11a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3M3 19h7"/>',
  boil: '<path d="M5 11h14v6a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3zM3 11h18M9 7.5V7M12 6V5M15 7.5V7"/>',
  cafe: '<path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 11h1.5a2.5 2.5 0 0 1 0 5H16M8 3v3M11 2v4M14 3v3"/>',
  wood: '<ellipse cx="11" cy="15" rx="7" ry="5"/><path d="M7 15h7M14 3l6 6M18 3l-4 4"/>',
  far: '<path d="M2 20l6-9 4 5 3-4 7 8z"/><circle cx="17" cy="6" r="2.5"/>',
  white: '<path d="M3 12h2l2-6 3 12 3-9 2 6 2-3h4"/>',
  custom: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>'
};
const Ambient = {
  ctx: null, master: null, cur: null, curId: 'none', vol: 0.6, audioEl: null, buffers: {},
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return true; }
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain(); this.master.gain.value = this.vol; this.master.connect(this.ctx.destination);
      const sr = this.ctx.sampleRate, len = sr * 4;
      const mk = kind => {
        const b = this.ctx.createBuffer(1, len, sr), d = b.getChannelData(0); let last = 0, b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < len; i++) {
          const w = Math.random() * 2 - 1;
          if (kind === 'white') d[i] = w * 0.5;
          else if (kind === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; }
          else { b0 = 0.99765 * b0 + w * 0.099046; b1 = 0.963 * b1 + w * 0.2965164; b2 = 0.57 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.12; }
        }
        return b;
      };
      this.buffers = {white: mk('white'), pink: mk('pink'), brown: mk('brown')};
      return true;
    } catch (e) { return false; }
  },
  setVolume(v) { this.vol = v; if (this.master) this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05); if (this.audioEl) this.audioEl.volume = v; },
  noise(kind, out, gain = 1) {
    const s = this.ctx.createBufferSource(); s.buffer = this.buffers[kind]; s.loop = true; s.loopStart = Math.random();
    const g = this.ctx.createGain(); g.gain.value = gain; s.connect(g); g.connect(out); s.start(0, Math.random() * 3); return {src: s, gain: g};
  },
  filter(type, freq, q = 1) { const f = this.ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; return f; },
  lfo(param, rate, depth, base) { const o = this.ctx.createOscillator(), g = this.ctx.createGain(); o.frequency.value = rate; g.gain.value = depth; o.connect(g); g.connect(param); if (base !== undefined) param.value = base; o.start(); return o; },
  // Golpe corto de tono (para tic-tac, madera, coquí, pájaros, burbujas)
  blip(out, {f0, f1 = f0, dur = 0.1, type = 'sine', gain = 0.3, at = 0, attack = 0.005}) {
    const t = this.ctx.currentTime + at, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + 0.05);
  },
  burst(out, {dur = 0.02, freq = 3000, q = 1, type = 'bandpass', gain = 0.4, at = 0, kind = 'white'}) {
    const t = this.ctx.currentTime + at, s = this.ctx.createBufferSource(); s.buffer = this.buffers[kind];
    const f = this.filter(type, freq, q), g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random() * 3); s.stop(t + dur + 0.05);
  },
  every(min, max, fn, timers) { let alive = true; const loop = () => { if (!alive) return; fn(); timers.push(setTimeout(loop, (min + Math.random() * (max - min)) * 1000)); }; timers.push(setTimeout(loop, Math.random() * min * 1000)); return () => alive = false; },
  build(id) {
    const c = this.ctx, out = c.createGain(); out.gain.value = 0; out.connect(this.master);
    const nodes = [], timers = [], stops = [];
    const N = (k, dest, g) => { const n = this.noise(k, dest, g); nodes.push(n.src); return n; };
    if (id === 'white') N('pink', out, 0.6);
    else if (id === 'rain' || id === 'storm') {
      const hp = this.filter('highpass', 500), lp = this.filter('lowpass', 7000); hp.connect(lp); lp.connect(out); N('pink', hp, 1.2);
      const lo = this.filter('lowpass', 900); lo.connect(out); N('brown', lo, 0.35);
      stops.push(this.every(0.03, 0.12, () => this.burst(out, {dur: 0.015, freq: 2500 + Math.random() * 4000, q: 2, gain: 0.08 + Math.random() * 0.12}), timers));
      if (id === 'storm') stops.push(this.every(9, 22, () => {
        const t = c.currentTime, s = c.createBufferSource(); s.buffer = this.buffers.brown; const f = this.filter('lowpass', 140), g = c.createGain();
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(2.2, t + 0.4 + Math.random()); g.gain.exponentialRampToValueAtTime(0.0001, t + 5 + Math.random() * 3);
        s.connect(f); f.connect(g); g.connect(out); s.start(t); s.stop(t + 9);
      }, timers));
    } else if (id === 'waves') {
      const lp = this.filter('lowpass', 600), g = c.createGain(); lp.connect(g); g.connect(out); N('pink', lp, 1.4); N('brown', lp, 0.8);
      nodes.push(this.lfo(g.gain, 0.09, 0.45, 0.55), this.lfo(lp.frequency, 0.09, 400, 800));
    } else if (id === 'stream') {
      const b1 = this.filter('bandpass', 900, 0.8), b2 = this.filter('bandpass', 2600, 1.2); b1.connect(out); b2.connect(out); N('white', b1, 0.5); N('white', b2, 0.25);
      stops.push(this.every(0.15, 0.4, () => { b1.frequency.setTargetAtTime(700 + Math.random() * 600, c.currentTime, 0.1); b2.frequency.setTargetAtTime(2000 + Math.random() * 1600, c.currentTime, 0.08); }, timers));
      stops.push(this.every(0.05, 0.2, () => this.blip(out, {f0: 500 + Math.random() * 900, f1: 1400 + Math.random() * 1200, dur: 0.04, gain: 0.04}), timers));
    } else if (id === 'wind') {
      const bp = this.filter('bandpass', 500, 1.6); bp.connect(out); N('pink', bp, 2.4);
      stops.push(this.every(1.5, 3.5, () => { bp.frequency.setTargetAtTime(250 + Math.random() * 700, c.currentTime, 1.2); }, timers));
      const g = c.createGain(); bp.disconnect(); bp.connect(g); g.connect(out); nodes.push(this.lfo(g.gain, 0.07, 0.35, 0.65));
    } else if (id === 'fire') {
      const lp = this.filter('lowpass', 450); lp.connect(out); N('brown', lp, 1.1);
      stops.push(this.every(0.04, 0.35, () => { const k = 1 + Math.floor(Math.random() * 3); for (let i = 0; i < k; i++) this.burst(out, {dur: 0.004 + Math.random() * 0.02, freq: 1500 + Math.random() * 3500, type: 'highpass', gain: 0.1 + Math.random() * 0.4, at: i * 0.02}); }, timers));
    } else if (id === 'boil') {
      const lp = this.filter('lowpass', 300); lp.connect(out); N('brown', lp, 0.9);
      stops.push(this.every(0.02, 0.09, () => { const f = 250 + Math.random() * 500; this.blip(out, {f0: f, f1: f * (1.6 + Math.random()), dur: 0.03 + Math.random() * 0.05, gain: 0.05 + Math.random() * 0.1}); }, timers));
    } else if (id === 'tick') {
      let k = 0; const step = () => { this.burst(out, {dur: 0.018, freq: k++ % 2 ? 2400 : 3200, q: 6, gain: 0.9}); this.blip(out, {f0: k % 2 ? 1800 : 2200, dur: 0.02, gain: 0.05}); };
      step(); const iv = setInterval(step, 1000); stops.push(() => clearInterval(iv));
    } else if (id === 'wood') {
      const hit = () => { this.blip(out, {f0: 720, f1: 690, dur: 0.18, gain: 0.5, attack: 0.002}); this.blip(out, {f0: 1650, f1: 1600, dur: 0.07, gain: 0.15, attack: 0.002}); this.burst(out, {dur: 0.01, freq: 2500, q: 3, gain: 0.3}); };
      hit(); const iv = setInterval(hit, 1100); stops.push(() => clearInterval(iv));
    } else if (id === 'birds' || id === 'forest') {
      const bp = this.filter('bandpass', id === 'forest' ? 1800 : 3000, 0.6), g = c.createGain(); bp.connect(g); g.connect(out); N('pink', bp, id === 'forest' ? 0.9 : 0.25);
      if (id === 'forest') nodes.push(this.lfo(g.gain, 0.11, 0.4, 0.6));
      const song = () => { const base = 2500 + Math.random() * 2500, n = 2 + Math.floor(Math.random() * 5), sp = 0.07 + Math.random() * 0.09; for (let i = 0; i < n; i++) this.blip(out, {f0: base * (0.85 + Math.random() * 0.3), f1: base * (1.1 + Math.random() * 0.5), dur: 0.05 + Math.random() * 0.07, gain: (id === 'forest' ? 0.05 : 0.09) * (0.5 + Math.random()), at: i * sp}); };
      stops.push(this.every(id === 'forest' ? 2.5 : 0.5, id === 'forest' ? 7 : 2.5, song, timers));
    } else if (id === 'coqui') {
      const hp = this.filter('highpass', 3000); hp.connect(out); N('pink', hp, 0.15);
      for (let k = 0; k < 4; k++) {
        const pitch = 0.9 + k * 0.08, g = 0.05 + Math.random() * 0.08;
        stops.push(this.every(1.4, 4.5, () => { this.blip(out, {f0: 1150 * pitch, f1: 1100 * pitch, dur: 0.1, gain: g}); this.blip(out, {f0: 1900 * pitch, f1: 2350 * pitch, dur: 0.16, gain: g * 1.1, at: 0.16}); }, timers));
      }
    } else if (id === 'cicada') {
      const bp = this.filter('bandpass', 4600, 6), am = c.createGain(), sw = c.createGain(); bp.connect(am); am.connect(sw); sw.connect(out); N('white', bp, 2.2);
      am.gain.value = 0.5; nodes.push(this.lfo(am.gain, 48, 0.5)); nodes.push(this.lfo(sw.gain, 0.08, 0.45, 0.55));
    } else if (id === 'cafe') {
      const bp = this.filter('bandpass', 600, 0.8), g = c.createGain(); bp.connect(g); g.connect(out); N('pink', bp, 2.2); N('brown', out, 0.15);
      stops.push(this.every(0.12, 0.35, () => { g.gain.setTargetAtTime(0.5 + Math.random() * 0.6, c.currentTime, 0.08); bp.frequency.setTargetAtTime(350 + Math.random() * 700, c.currentTime, 0.1); }, timers));
      stops.push(this.every(3, 9, () => { const f = 2600 + Math.random() * 1800; this.blip(out, {f0: f, dur: 0.35, gain: 0.04}); this.blip(out, {f0: f * 2.7, dur: 0.2, gain: 0.015}); }, timers));
    } else if (id === 'far') {
      const lp = this.filter('lowpass', 900), g = c.createGain(); lp.connect(g); g.connect(out); g.gain.value = 0.5;
      [110, 164.8, 220, 277.2, 329.6].forEach((f, i) => { const o = c.createOscillator(); o.type = i % 2 ? 'sine' : 'triangle'; o.frequency.value = f; o.detune.value = (Math.random() - 0.5) * 12; const og = c.createGain(); og.gain.value = 0.09; o.connect(og); og.connect(lp); o.start(); nodes.push(o, this.lfo(og.gain, 0.05 + i * 0.02, 0.06)); });
      N('pink', this.filter('lowpass', 400), 0);
    }
    out.gain.setTargetAtTime(1, c.currentTime, 0.4);
    return {stop: () => { stops.forEach(s => s()); timers.forEach(t => clearTimeout(t)); out.gain.setTargetAtTime(0, c.currentTime, 0.25); setTimeout(() => { nodes.forEach(n => { try { n.stop(); } catch (e) {} }); out.disconnect(); }, 900); }};
  },
  async play(id) {
    this.stop();
    this.curId = id;
    if (id === 'none') return;
    if (id === 'custom') {
      const blob = await customSound.get(); if (!blob) return false;
      this.audioEl = new Audio(URL.createObjectURL(blob)); this.audioEl.loop = true; this.audioEl.volume = this.vol;
      try { await this.audioEl.play(); } catch (e) {} return true;
    }
    if (!this.init()) return false;
    this.cur = this.build(id); return true;
  },
  stop() {
    if (this.cur) { this.cur.stop(); this.cur = null; }
    if (this.audioEl) { this.audioEl.pause(); URL.revokeObjectURL(this.audioEl.src); this.audioEl = null; }
  }
};
// Sonido importado: se guarda en el dispositivo (IndexedDB)
const customSound = {
  db() { return new Promise((res, rej) => { try { const r = indexedDB.open('mi-organizador-sonidos', 1); r.onupgradeneeded = () => r.result.createObjectStore('s'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); } catch (e) { rej(e); } }); },
  async put(file) { const d = await this.db(); return new Promise((res, rej) => { const t = d.transaction('s', 'readwrite'); t.objectStore('s').put(file, 'mio'); t.oncomplete = () => res(); t.onerror = () => rej(t.error); }); },
  async get() { try { const d = await this.db(); return await new Promise(res => { const r = d.transaction('s').objectStore('s').get('mio'); r.onsuccess = () => res(r.result || null); r.onerror = () => res(null); }); } catch (e) { return null; } }
};
