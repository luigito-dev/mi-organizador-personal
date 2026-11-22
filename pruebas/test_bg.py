from playwright.sync_api import sync_playwright
R=[]
def ok(n,c,x=''): R.append(c); print(('PASS ' if c else 'FAIL ')+n+('' if c else ' -- '+str(x)))
BLOCK = "<script>Object.defineProperty(window,'indexedDB',{get(){throw new DOMException('bloqueado','SecurityError')}});</script>"
CLOUD = r"""<script>window.__docs={};window.claude={use:async(n)=>{await new Promise(r=>setTimeout(r,100)); if(n==='user')return {id:async()=>'u_1'}; if(n==='db')return {doc:(p)=>({get:async()=>{const d=window.__docs[p];return d?{exists:true,data:()=>d}:{exists:false}}, set:async(d)=>{window.__docs[p]=JSON.parse(JSON.stringify(d))}})}; return null;}};</script>"""
h=open('index.html').read()
open('bg_block.html','w').write(h.replace('<body>','<body>'+BLOCK+CLOUD,1))
with sync_playwright() as p:
  b=p.chromium.launch(); ctx=b.new_context(**p.devices['Pixel 7']); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
  # meses
  pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300)
  pg.evaluate("S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());go('calendario');S.settings.calView='month';renderView()"); pg.wait_for_timeout(300)
  ok('fondo según el mes por defecto', 'svg' in (pg.locator('.cmonth').get_attribute('style') or ''))
  s1=pg.locator('.cmonth').get_attribute('style'); pg.tap('#cNext'); pg.wait_for_timeout(300); s2=pg.locator('.cmonth').get_attribute('style')
  ok('cambia al pasar de mes', s1!=s2)
  pg.screenshot(path='shots/tel-mes-dic.png')
  for m in range(12):
    pg.evaluate(f"UI.calDate=iso(new Date(2026,{m},10));renderView()"); pg.wait_for_timeout(120); pg.screenshot(path=f'shots/mes-{m+1:02d}.png', clip={'x':0,'y':140,'width':412,'height':420})
  ctx.close()
  # foto con almacén bloqueado + nube
  ctx=b.new_context(**p.devices['Pixel 7']); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
  pg.goto('file:///home/claude/org/bg_block.html'); pg.wait_for_timeout(800)
  pg.evaluate("S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());go('calendario');S.settings.calView='month';renderView()"); pg.wait_for_timeout(300)
  pg.tap('#calBg'); pg.wait_for_timeout(300); pg.set_input_files('#bgFile','/tmp/foto.jpg'); pg.wait_for_timeout(1500)
  ok('con almacén bloqueado la foto se pone', 'data:image/jpeg' in (pg.locator('.cmonth').get_attribute('style') or ''), [t.inner_text() for t in pg.locator('.toast').all()])
  ok('se guardó en la cuenta', pg.evaluate("!!window.__docs['data/users/u_1/calbg']"))
  pg.evaluate("localStorage.removeItem('mi-organizador-fondo'); UI.bgUrl=null; renderView()"); pg.wait_for_timeout(800)
  ok('se recupera desde la cuenta', 'data:image/jpeg' in (pg.locator('.cmonth').get_attribute('style') or ''))
  ok('sin errores', not errs, errs); b.close()
print('FALLAS', R.count(False))
