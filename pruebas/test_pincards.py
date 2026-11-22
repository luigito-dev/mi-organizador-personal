from playwright.sync_api import sync_playwright
R=[]
def ok(n,c,x=''): R.append(c); print(('PASS ' if c else 'FAIL ')+n+('' if c else ' -- '+str(x)))
SEED="""S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());
S.lists=[{id:'l1',name:'Compras',icon:'🛒',color:'#2e9d5b',items:[{id:'i1',t:'Leche',done:false},{id:'i2',t:'Pan',done:false}]}];
S.tasks=[{id:'t1',title:'Llamar al banco',date:todayISO(),time:'10:00',status:'Pendiente',priority:'Media',typeId:'pendiente',steps:[]}];
S.habits=[{color:'#4a90ff',created:'2026-11-01',days:[],goal:8,goalOz:64,icon:'💧',id:'w1',kind:'agua',log:{[todayISO()]:20},name:'Tomar agua',unit:'',migW:1,migO:1,migA:1}];
S.settings.pins={hoy:true,cal:true,habs:['w1'],noReto:[]};save('lists','tasks','habits','meta');go('dia');"""
with sync_playwright() as p:
  b=p.chromium.launch()
  for lab,kw in [('tel',dict(p.devices['Pixel 7'])),('pc',{'viewport':{'width':1366,'height':860}})]:
    ctx=b.new_context(**kw); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300); pg.evaluate(SEED); pg.wait_for_timeout(500)
    ok(f'[{lab}] tarjetas debajo de los días', pg.locator('#pinCards .pincard').count()==4 and pg.evaluate("document.querySelector('#dstrip').nextElementSibling.classList.contains('pinhd')"))
    w=pg.evaluate("document.querySelector('#pinCards').clientWidth"); cw=pg.evaluate("document.querySelector('.pincard').offsetWidth")
    ok(f'[{lab}] una sola tarjeta, sin asomar la otra', abs(w-cw)<=1, (w,cw))
    ok(f'[{lab}] primera es HOY', 'HOY' in pg.locator('.pincard').nth(0).inner_text())
    pg.locator('.pincard').nth(0).locator('[data-qtk]').first.click(); pg.wait_for_timeout(400)
    ok(f'[{lab}] marcar tarea desde la tarjeta', pg.evaluate("isDone(S.tasks[0])"))
    pg.evaluate("document.querySelector('#pinCards').scrollLeft=document.querySelector('#pinCards').clientWidth"); pg.wait_for_timeout(400)
    ok(f'[{lab}] deslizar a Compras', pg.evaluate("UI.pinIdx")==1 and pg.locator('.pindots i.on').count()==1)
    box=pg.locator('.pincard').nth(1)
    box.locator('#dlAdd').fill('Café'); box.locator('#dlBtn').click(); pg.wait_for_timeout(300)
    ok(f'[{lab}] añadir a Compras', any(i['t']=='Café' for i in pg.evaluate("S.lists[0].items")))
    pg.evaluate("document.querySelector('#pinCards').scrollLeft=2*document.querySelector('#pinCards').clientWidth"); pg.wait_for_timeout(400)
    pg.locator('.pincard').nth(2).locator('#wDrink').click(); pg.wait_for_timeout(300)
    ok(f'[{lab}] beber agua desde la tarjeta', pg.evaluate("habCount(S.habits[0],todayISO())")==21)
    pg.screenshot(path=f'shots/{lab}-pincards.png')
    pg.locator('.pincard').nth(3).locator('[data-unpin]').click(); pg.wait_for_timeout(500)
    ok(f'[{lab}] quitar de fijados', pg.locator('#pinCards .pincard').count()==3 and not pg.evaluate("S.settings.pins.cal"))
    ok(f'[{lab}] sin scroll horizontal', pg.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"))
    ok(f'[{lab}] sin errores', not errs, errs); ctx.close()
  b.close()
print('FALLAS', R.count(False))
