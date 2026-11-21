# Cada sonido debe funcionar en cualquier velocidad de audio (teléfonos usan 48.000; otros 44.100, 16.000…)
from playwright.sync_api import sync_playwright
ids='coqui,rain,storm,waves,stream,forest,birds,cicada,fire,wind,boil,cafe,wood,far,white,tick'.split(',')
bad=[]
with sync_playwright() as p:
  b=p.chromium.launch(); pg=b.new_page(); pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300)
  for sr in [48000, 44100, 32000, 22050, 16000]:
    for i in ids:
      r=pg.evaluate("""(async([id,sr])=>{try{const off=new OfflineAudioContext(2,sr*3,sr);const g=off.createGain();g.connect(off.destination);runRecipe(off,id,g,{live:false,until:3});const b=await off.startRendering();let m=0;const d=b.getChannelData(0);for(let k=sr;k<d.length;k++)m=Math.max(m,Math.abs(d[k]));return m}catch(e){return 'ERROR '+e.message}})""",[i,sr])
      if isinstance(r,str) or (i!='tick' and r<0.003): bad.append((sr,i,r))
  # en vivo a 48.000 como un Android
  r=pg.evaluate("""(async()=>{const ctx=new AudioContext({sampleRate:48000});await ctx.resume();const out=[];for(const id of %s){try{const x=runRecipe(ctx,id,ctx.destination);x.stop();out.push('ok')}catch(e){out.push(id+': '+e.message)}}return out.filter(x=>x!=='ok')})()""" % ids)
  print('en vivo 48k fallos:', r)
  b.close()
print('fallos:', bad if bad else 'ninguno')
