import sys, base64, numpy as np, wave
from playwright.sync_api import sync_playwright
import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
SRC='/home/claude/mio-app/web/src/sounds.js'
ids = sys.argv[1].split(',') if len(sys.argv)>1 else ['coqui']
secs = float(sys.argv[2]) if len(sys.argv)>2 else 10
html = '<html><body><script>'+open(SRC).read()+r'''
async function renderId(id, secs){ const sr=44100; const ctx=new OfflineAudioContext(2, sr*secs, sr); const comp=ctx.createDynamicsCompressor(); comp.connect(ctx.destination); const g=ctx.createGain(); g.gain.value=0.8; g.connect(comp);
 runRecipe(ctx, id, g, {live:false, until:secs}); const buf=await ctx.startRendering(); const L=buf.getChannelData(0), R=buf.getChannelData(1); const out=new Int16Array(L.length*2);
 for(let i=0;i<L.length;i++){out[2*i]=Math.max(-1,Math.min(1,L[i]))*32767; out[2*i+1]=Math.max(-1,Math.min(1,R[i]))*32767;}
 let s=''; const u=new Uint8Array(out.buffer); for(let i=0;i<u.length;i+=32768) s+=String.fromCharCode.apply(null,u.subarray(i,i+32768)); return btoa(s); }
</script></body></html>'''
open('h.html','w').write(html)
with sync_playwright() as p:
  b=p.chromium.launch(); pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type=='error' else None)
  pg.goto('file:///home/claude/sonidos/h.html')
  for i in ids:
    data=base64.b64decode(pg.evaluate(f"renderId('{i}',{secs})"))
    a=np.frombuffer(data,dtype=np.int16).reshape(-1,2)
    w=wave.open(f'{i}.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(44100); w.writeframes(a.tobytes()); w.close()
    m=a.mean(axis=1)/32768
    rms=np.sqrt((m**2).mean()); peak=np.abs(m).max()
    fig,ax=plt.subplots(figsize=(12,4)); ax.specgram(m,NFFT=1024,Fs=44100,noverlap=768,cmap='magma',vmin=-110); ax.set_ylim(0,9000); ax.set_title(f'{i} rms={rms:.3f} peak={peak:.2f}'); fig.tight_layout(); fig.savefig(f'{i}.png',dpi=70); plt.close(fig)
    print(i,'rms',round(rms,3),'peak',round(peak,2))
  print('errores',errs)
  b.close()
