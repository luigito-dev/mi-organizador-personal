from playwright.sync_api import sync_playwright
R=[]
def ok(n,c,x=''): R.append(c); print(('PASS ' if c else 'FAIL ')+n+('' if c else ' -- '+str(x)))
with sync_playwright() as p:
  b=p.chromium.launch()
  for lab,kw in [('tel',dict(p.devices['Pixel 7'])),('pc',{'viewport':{'width':1366,'height':860}})]:
    ctx=b.new_context(**kw); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    tap=(lambda s: pg.tap(s)) if lab=='tel' else (lambda s: pg.click(s))
    def wheel(sel, v):
      pg.locator(sel).click(); pg.wait_for_timeout(350); pg.evaluate(f"_numPick.set({v})"); pg.wait_for_timeout(250); pg.locator('#okN').last.click(); pg.wait_for_timeout(250)
    def wheelBtn(sel, v):
      pg.locator(sel).click(); pg.wait_for_timeout(350); pg.evaluate(f"_numPick.set({v})"); pg.wait_for_timeout(250); pg.locator('#okN').last.click(); pg.wait_for_timeout(300)
    pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300)
    pg.evaluate("""S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());S.habits=[
      {"color":"#a46bff","created":"2026-11-01","days":[],"goal":10,"icon":"🙏","id":"o1","kind":"tiempo","migW":1,"log":{[todayISO()]:10},"name":"Orar","unit":""},
      {"color":"#4cc46b","created":"2026-11-01","days":[],"goal":1,"icon":"💵","id":"a1","log":{},"name":"Ahorrar dinero","unit":""},
      {"color":"#ffb627","created":"2026-11-01","days":[],"goal":1,"icon":"☀️","id":"d1","log":{},"name":"Levantarme temprano","unit":""},
      {"color":"#4cc46b","created":"2026-11-01","days":[],"goal":1,"icon":"🥗","id":"f1","log":{},"name":"Comer más saludable","unit":""}];go('habitos')""")
    pg.wait_for_timeout(300)
    ok(f'[{lab}] tipos nuevos', pg.evaluate("S.habits.map(habKind).join(',')")=='oracion,ahorro,despertar,comida', pg.evaluate("S.habits.map(habKind).join(',')"))
    ok(f'[{lab}] orar sigue hecho', pg.evaluate("habDone(S.habits[0],todayISO())"))
    # oración
    pg.locator('[data-hab="o1"]').click(); pg.wait_for_timeout(400)
    pg.fill('#prT','Por la salud de mi familia'); tap('#prA'); pg.wait_for_timeout(200)
    pg.fill('#prT','Por mi trabajo'); pg.press('#prT','Enter'); pg.wait_for_timeout(200)
    ok(f'[{lab}] peticiones', pg.locator('.prrow').count()==2)
    pg.locator('[data-pra]').first.click(); pg.wait_for_timeout(200)
    ok(f'[{lab}] petición respondida', pg.locator('.prans .prrow').count()==1)
    pg.screenshot(path=f'shots/{lab}-orar.png')
    pg.evaluate("sheets.slice().forEach(s=>s.close())"); pg.wait_for_timeout(300)
    ok(f'[{lab}] fila orar con peticiones', '1 petición' in pg.locator('[data-hab="o1"]').inner_text())
    # ahorro
    pg.locator('[data-hab="a1"]').click(); pg.wait_for_timeout(400)
    tap('#svG'); pg.wait_for_timeout(300); pg.fill('#sgF','Viaje'); wheel('#sgV',500); tap('#sgS'); pg.wait_for_timeout(300)
    wheelBtn('#svIn', 25.5)
    ok(f'[{lab}] guardar dinero con centavos', abs(pg.evaluate("saveTotal(S.habits[1])")-25.5)<.001 and '$25.5' in pg.locator('.svtop').inner_text(), pg.locator('.svtop').inner_text())
    wheelBtn('#svOut', 5)
    ok(f'[{lab}] sacar dinero', abs(pg.evaluate("saveTotal(S.habits[1])")-20.5)<.001 and pg.locator('.svmv').count()==2)
    ok(f'[{lab}] ahorro cumple el día', pg.evaluate("habDone(S.habits[1],todayISO())"))
    pg.screenshot(path=f'shots/{lab}-ahorro.png')
    pg.evaluate("sheets.slice().forEach(s=>s.close())"); pg.wait_for_timeout(300)
    ok(f'[{lab}] fila ahorro', '$20.5' in pg.locator('[data-hab="a1"]').inner_text() and '$500' in pg.locator('[data-hab="a1"]').inner_text())
    # despertar
    pg.evaluate("S.habits[2].wakeAt='23:59';save('habits')")
    pg.locator('[data-hab="d1"]').click(); pg.wait_for_timeout(400)
    tap('#wkNow'); pg.wait_for_timeout(300)
    ok(f'[{lab}] me levanté a tiempo', pg.evaluate("habDone(S.habits[2],todayISO())") and 'tiempo' in pg.locator('.wkmsg').inner_text().lower() or 'antes' in pg.locator('.wkmsg').inner_text())
    pg.locator('label:has(#wkR2)').scroll_into_view_if_needed(); pg.locator('label:has(#wkR2)').click(); pg.wait_for_timeout(300)
    ok(f'[{lab}] aviso para acostarme', any(r.get('bed') and r.get('on') for r in pg.evaluate("S.habits[2].reminders")))
    ok(f'[{lab}] hora de acostarme 8h antes', '3:59' in pg.locator('.wkgoal').inner_text(), pg.locator('.wkgoal').inner_text())
    pg.screenshot(path=f'shots/{lab}-despertar.png')
    pg.evaluate("sheets.slice().forEach(s=>s.close())"); pg.wait_for_timeout(300)
    # comida
    pg.locator('[data-hab="f1"]').click(); pg.wait_for_timeout(400)
    for _ in range(3): tap('[data-fa="f"]'); pg.wait_for_timeout(100)
    for _ in range(2): tap('[data-fa="v"]'); pg.wait_for_timeout(100)
    ok(f'[{lab}] plato lleno 5/5', pg.evaluate("habDone(S.habits[3],todayISO())") and '5/5' in pg.locator('.plate').inner_html())
    tap('#fdM'); pg.wait_for_timeout(150); ok(f'[{lab}] quitar una', pg.evaluate("habCount(S.habits[3],todayISO())")==4)
    tap('[data-ml="desayuno"][data-ms="sano"]'); tap('[data-ml="almuerzo"][data-ms="rapida"]'); pg.wait_for_timeout(200)
    ok(f'[{lab}] comidas', '1 de 2' in pg.locator('.foodsheet').inner_text())
    pg.screenshot(path=f'shots/{lab}-comida.png')
    pg.evaluate("sheets.slice().forEach(s=>s.close())"); pg.wait_for_timeout(300)
    pg.evaluate("openHabitForm()"); pg.wait_for_timeout(300); pg.fill('#hName','Ahorrar para la casa'); pg.wait_for_timeout(100)
    ok(f'[{lab}] formulario detecta ahorro', pg.locator('[data-hk].on').get_attribute('data-hk')=='ahorro')
    pg.screenshot(path=f'shots/{lab}-tipos.png')
    ok(f'[{lab}] sin scroll horizontal', pg.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"))
    ok(f'[{lab}] sin errores', not errs, errs); ctx.close()
  b.close()
print('FALLAS', R.count(False))
