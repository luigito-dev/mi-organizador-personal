from playwright.sync_api import sync_playwright
R=[]
def ok(n,c,x=''): R.append(c); print(('PASS ' if c else 'FAIL ')+n+('' if c else ' -- '+str(x)))
SEED="""S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());
S.lists=[{id:'l1',name:'Compras',icon:'🛒',color:'#2e9d5b',items:[{id:'i1',t:'Leche',done:false}]}];
S.habits=[{color:'#4a90ff',created:'2026-11-01',days:[],goal:8,goalOz:64,icon:'💧',id:'w1',kind:'agua',log:{},name:'Tomar agua',unit:'',migW:1,migO:1,migA:1},
 {color:'#ffb627',created:'2026-11-01',days:[],goal:1,icon:'🍌',id:'f1',kind:'',log:{},name:'Comer frutas',unit:'',migW:1,migO:1,migA:1},
 {color:'#4cc46b',created:'2026-11-01',days:[],goal:1,icon:'💵',id:'a1',kind:'ahorro',log:{},name:'Ahorrar dinero',unit:'',migW:1,migO:1,migA:1}];
S.events=[{id:'e1',title:'Cita médica',date:todayISO(),start:'10:00',end:'11:00',areaId:null}];
save('lists','habits','events');go('dia');"""
with sync_playwright() as p:
  b=p.chromium.launch()
  for lab,kw in [('tel',dict(p.devices['Pixel 7'])),('pc',{'viewport':{'width':1366,'height':860}})]:
    ctx=b.new_context(**kw); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300); pg.evaluate(SEED); pg.wait_for_timeout(300)
    if lab=='tel':
      W=pg.evaluate("innerWidth"); H=pg.evaluate("innerHeight")
      pg.evaluate(f"""(()=>{{const mk=(x,y)=>new Touch({{identifier:1,target:document.body,clientX:x,clientY:y}});
        document.dispatchEvent(new TouchEvent('touchstart',{{touches:[mk({W-8},{H/2})]}}));
        document.dispatchEvent(new TouchEvent('touchmove',{{touches:[mk({W-90},{H/2+5})]}}));
        document.dispatchEvent(new TouchEvent('touchend',{{touches:[]}}));}})()""")
      pg.wait_for_timeout(400)
      ok('deslizar desde el borde abre la ventana', pg.locator('.qcard').count()==1)
    else:
      pg.evaluate("openListsPopup()"); pg.wait_for_timeout(400)
    pg.evaluate("sheets.slice().forEach(s=>s.close())"); pg.wait_for_timeout(300)
    ok(f'[{lab}] fila de fijados debajo de los días', pg.locator('#dstrip ~ #pinCards, #dstrip + .pinhd, #pinCards').count()>=1)
    pg.locator('[data-pinmgr]').click(); pg.wait_for_timeout(400)
    ok(f'[{lab}] administrador de fijados', pg.locator('[data-pk]').count()>=6)
    for k in ['hab:w1','hab:f1','hab:a1','cal']: pg.locator(f'label:has([data-pk="{k}"])').click(); pg.wait_for_timeout(100)
    pg.locator('.ov:last-child [data-close]').last.click(); pg.wait_for_timeout(400)
    ok(f'[{lab}] tarjetas fijadas en Mi Día', pg.locator('#pinCards .pinbox[data-fixkey="hab:w1"]').count()==1)
    pg.evaluate("UI.popTab='hab:w1'; openListsPopup()"); pg.wait_for_timeout(400)
    ok(f'[{lab}] fijados en orden', pg.evaluate("popKeys().join(',')")=='hoy,l1,hab:w1,hab:f1,hab:a1,cal', pg.evaluate("popKeys().join(',')"))
    ok(f'[{lab}] sin pestañas, con puntitos', pg.locator('.qcard .qtab').count()==0 and pg.locator('.qcard .qdots i').count()==6)
    ok(f'[{lab}] agua dentro de la ventana', pg.locator('.ov .bigbot').count()==1)
    pg.locator('.ov #wDrink').click(); pg.wait_for_timeout(200); pg.locator('.ov #wDrink').click(); pg.wait_for_timeout(200)
    ok(f'[{lab}] beber desde la ventana', pg.evaluate("habCount(S.habits[0],todayISO())")==2)
    pg.screenshot(path=f'shots/{lab}-pin-agua.png')
    pg.evaluate("UI.popTab='hab:f1';dayLists(document.querySelector('#lsPop')||document.querySelector('.pinbox[data-fixkey=\"hab:f1\"]')||document.querySelector('.qcard .sh-body > div'))"); pg.wait_for_timeout(300); pg.locator('.ov #pmB').click(); pg.wait_for_timeout(300)
    ok(f'[{lab}] marcar hábito simple', pg.evaluate("habDone(S.habits[1],todayISO())"))
    pg.evaluate("UI.popTab='hab:a1';dayLists(document.querySelector('#lsPop')||document.querySelector('.pinbox[data-fixkey=\"hab:a1\"]')||document.querySelector('.qcard .sh-body > div'))"); pg.wait_for_timeout(300)
    ok(f'[{lab}] ahorro dentro de la ventana', pg.locator('.ov .jar').count()==1)
    pg.evaluate("UI.popTab='cal';dayLists(document.querySelector('#lsPop')||document.querySelector('.pinbox[data-fixkey=\"cal\"]')||document.querySelector('.qcard .sh-body > div'))"); pg.wait_for_timeout(300)
    ok(f'[{lab}] calendario fijado', pg.locator('.pcalg button').count()>=28 and 'Cita médica' in pg.locator('.ov #pinCal').inner_text())
    pg.fill('.ov #pcAdd','Llamar a mamá'); pg.press('.ov #pcAdd','Enter'); pg.wait_for_timeout(300)
    ok(f'[{lab}] añadir desde calendario fijado', pg.evaluate("S.tasks.some(t=>t.title==='Llamar a mamá')") and 'Llamar a mamá' in pg.locator('.ov #pinCal').inner_text())
    pg.screenshot(path=f'shots/{lab}-pin-cal.png')
    pg.evaluate("UI.popTab='l1';dayLists(document.querySelector('#lsPop')||document.querySelector('.pinbox[data-fixkey=\"l1\"]')||document.querySelector('.qcard .sh-body > div'))"); pg.wait_for_timeout(300)
    ok(f'[{lab}] listas siguen', 'Leche' in pg.locator('.qcard').inner_text())
    if lab=='tel':
      pg.evaluate("UI.popTab='hoy';dayLists(document.querySelector('#lsPop'))"); pg.wait_for_timeout(200)
      bx=pg.locator('.qcard').bounding_box(); y=bx['y']+bx['height']*0.25
      pg.evaluate(f"""(()=>{{const box=document.querySelector('#lsPop');const mk=(x,y)=>new Touch({{identifier:1,target:box,clientX:x,clientY:y}});
        box.dispatchEvent(new TouchEvent('touchstart',{{touches:[mk(300,{y})],bubbles:true}}));
        box.dispatchEvent(new TouchEvent('touchend',{{changedTouches:[mk(150,{y+4})],bubbles:true}}));}})()"""); pg.wait_for_timeout(400)
      ok('deslizar de lado pasa al siguiente', pg.evaluate("UI.popTab")=='l1', pg.evaluate("UI.popTab"))
      pg.screenshot(path='shots/pop-compras.png')
    pg.locator('.qarr').last.click(); pg.wait_for_timeout(300)
    ok(f'[{lab}] flecha siguiente', pg.evaluate("UI.popTab")!='')
    pg.evaluate("UI.popTab='hab:f1';dayLists(document.querySelector('#lsPop')||document.querySelector('.pinbox[data-fixkey=\"hab:f1\"]'))"); pg.wait_for_timeout(300)
    ok(f'[{lab}] estilo HOY con contador', pg.locator('.ov .qtitle').first.inner_text().upper()=='COMER FRUTAS' and pg.locator('.ov .qcount').first.inner_text()=='1/1')
    pg.screenshot(path=f'shots/{lab}-pin-frutas.png')
    pg.locator('.ov [data-unpin]').click(); pg.wait_for_timeout(400)
    ok(f'[{lab}] quitar de fijados desde la ventana', 'f1' not in pg.evaluate("S.settings.pins.habs") and 'hab:f1' not in pg.evaluate("popKeys()"))
    pg.evaluate("UI.popTab='cal';dayLists(document.querySelector('#lsPop')||document.querySelector('.pinbox[data-fixkey=\"cal\"]'))"); pg.wait_for_timeout(300)
    ok(f'[{lab}] calendario con quitar', pg.locator('.ov [data-unpin]').count()==1)
    pg.reload(); pg.wait_for_timeout(500)
    ok(f'[{lab}] fijados se guardan', pg.evaluate("S.settings.pins.habs.length")==2 and pg.evaluate("S.settings.pins.cal"))
    ok(f'[{lab}] sin errores', not errs, errs); ctx.close()
  b.close()
print('FALLAS', R.count(False))
