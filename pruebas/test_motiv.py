from playwright.sync_api import sync_playwright
with sync_playwright() as p:
  b=p.chromium.launch()
  for W,H,lab in [(1366,860,'pc'),(390,844,'tel')]:
    pg=b.new_page(viewport={'width':W,'height':H}); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(400)
    pg.evaluate("S.settings.tutorialSeen=true;save();sheets.slice().forEach(s=>s.close())")
    seen=[pg.locator('.hero-msg p').inner_text()]
    for i in range(5):
      pg.evaluate("go('notas')"); pg.evaluate("go('dia')"); seen.append(pg.locator('.hero-msg p').inner_text())
    for i in range(3):
      pg.reload(); pg.wait_for_timeout(300); seen.append(pg.locator('.hero-msg p').inner_text())
    print(lab,'distintos', len(set(seen))==len(seen), len(seen), 'dentro del saludo', pg.locator('.hero .hero-msg').count()==1, 'errores', errs)
    allm=pg.evaluate("(()=>{S.settings.motivUsed=[];const a=[];for(let i=0;i<MOTIV.length;i++)a.push(nextMotiv());return [new Set(a).size,MOTIV.length]})()")
    print(' ciclo completo sin repetir', allm)
    pg.evaluate("go('notas');go('dia')"); pg.screenshot(path=f'shots/{lab}-hero.png'); pg.close()
  b.close()
