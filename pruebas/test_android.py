from playwright.sync_api import sync_playwright
with sync_playwright() as p:
  b=p.chromium.launch(args=['--autoplay-policy=user-gesture-required'])
  dev=p.devices['Pixel 7']
  ctx=b.new_context(**dev); pg=ctx.new_page(); errs=[]
  pg.on('pageerror',lambda e: errs.append('PAGE '+str(e))); pg.on('console',lambda m: errs.append(m.type+' '+m.text) if m.type in('error','warning') else None)
  pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(500)
  for i in range(4): pg.tap('#tuN'); pg.wait_for_timeout(150)
  pg.tap('#tu2'); pg.wait_for_timeout(300)
  pg.tap('#bnav [data-go="mas"]'); pg.wait_for_timeout(200); pg.tap('[data-m="enfoque"]'); pg.wait_for_timeout(300)
  pg.tap('#fSnd'); pg.wait_for_timeout(300)
  pg.tap('[data-snd="coqui"]'); pg.wait_for_timeout(1500)
  print('ctx', pg.evaluate("Ambient.ctx && Ambient.ctx.state"), 'cur', pg.evaluate("Ambient.curId"), pg.evaluate("!!Ambient.cur"))
  # medir señal real
  lvl=pg.evaluate("""new Promise(r=>{const a=Ambient.ctx.createAnalyser();a.fftSize=2048;Ambient.master.connect(a);const d=new Float32Array(2048);let mx=0;let n=0;const iv=setInterval(()=>{a.getFloatTimeDomainData(d);for(const x of d)mx=Math.max(mx,Math.abs(x));if(++n>20){clearInterval(iv);r(mx)}},100)})""")
  print('nivel coquí', lvl)
  t0=pg.evaluate("performance.now()"); pg.tap('[data-snd="rain"]'); pg.wait_for_timeout(50); print('tiempo cambio sonido ms', pg.evaluate(f"performance.now()-{t0}"))
  print('errores', errs[:8])
  b.close()
