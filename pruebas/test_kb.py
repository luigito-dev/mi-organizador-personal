from playwright.sync_api import sync_playwright
with sync_playwright() as p:
  b=p.chromium.launch(); pg=b.new_page(viewport={'width':390,'height':844},has_touch=True); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
  pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300)
  pg.evaluate("S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());go('tareas');UI.taskMode='listas';render()")
  pg.click('#fab'); pg.wait_for_timeout(200); pg.click('[data-tpl=\"🛒|Compras\"]'); pg.click('#lS'); pg.wait_for_timeout(300)
  for name,sel in [('lista','#liAdd')]:
    pg.click(sel); pg.set_viewport_size({'width':390,'height':500}); pg.wait_for_timeout(100)
    pg.keyboard.type('Arroz, habichuelas', delay=30); pg.wait_for_timeout(400)
    print(name,'texto conservado:', pg.input_value(sel)); pg.keyboard.press('Enter'); pg.wait_for_timeout(200)
    print(' añadidos:', pg.evaluate("S.lists[0].items.map(i=>i.t)"), 'foco sigue:', pg.evaluate("document.activeElement.id"))
    pg.set_viewport_size({'width':390,'height':844}); pg.wait_for_timeout(300)
  pg.evaluate("go('dia')"); pg.click('#qIn'); pg.set_viewport_size({'width':390,'height':500}); pg.keyboard.type('pagar la luz',delay=20); pg.wait_for_timeout(400)
  print('Mi Día texto conservado:', pg.input_value('#qIn'))
  pg.set_viewport_size({'width':390,'height':844}); pg.evaluate("go('notas')"); pg.click('#nNew'); pg.set_viewport_size({'width':390,'height':500}); pg.keyboard.type('nota de prueba',delay=20); pg.wait_for_timeout(400)
  print('Notas texto conservado:', pg.input_value('#nNew'), 'errores', errs)
  b.close()
