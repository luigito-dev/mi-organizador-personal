from playwright.sync_api import sync_playwright
R=[]
def ok(n,c,x=''): R.append(c); print(('PASS ' if c else 'FAIL ')+n+('' if c else ' -- '+str(x)))
SEED="""S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());
const t=todayISO(),A=n=>addDays(t,n);
S.events.push({id:'e1',title:'🥗 Almuerzo',date:t,start:'13:00',end:'14:00',place:'Café Minical',areaId:null,evType:'reunion'});
S.events.push({id:'e2',title:'🎨 Museo',date:t,start:'15:00',end:'16:30',areaId:null});
S.events.push({id:'e3',title:'Viaje a Japón',date:A(1),endDate:A(4),allDay:true,start:'09:00',end:'10:00',areaId:null});
S.tasks.push({id:'t1',title:'Pagar luz',date:A(2),done:false,areaId:null});
S.tasks.push({id:'t2',title:'Reporte',date:t,status:'Completada',areaId:null});
save('events');save('tasks');go('calendario');S.settings.calView='month';UI.selDate=t;renderView();"""
with sync_playwright() as p:
  b=p.chromium.launch()
  for lab,kw in [('tel',dict(p.devices['Pixel 7'])),('pc',{'viewport':{'width':1366,'height':860}})]:
    ctx=b.new_context(**kw); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300); pg.evaluate(SEED); pg.wait_for_timeout(300)
    t=pg.evaluate("todayISO()"); a2=pg.evaluate("addDays(todayISO(),2)"); a3=pg.evaluate("addDays(todayISO(),3)")
    if lab=='tel':
      ok('mes con detalle por defecto', pg.locator('.dmonth').count()==1)
      ok('nombres en el día', 'Almuerzo' in pg.locator(f'.dmday[data-day="{t}"]').inner_text())
      ok('emoji del nombre visible', pg.locator(f'.dmday[data-day="{t}"] .mlem').first.inner_text()=='🥗')
      ok('tarea con casilla', pg.locator(f'.dmday[data-day="{a2}"] .mlbox').count()==1)
      ok('tarea hecha tachada', pg.locator(f'.dmday[data-day="{t}"] .mlab.done').count()==1)
      ok('viaje corre varios días', pg.locator(f'.dmday[data-day="{a3}"] .mlab.span-mid, .dmday[data-day="{a3}"] .mlab.span-start').count()>=1 or pg.locator(f'.dmday[data-day="{a3}"] .mlab').count()>=1)
      ok('día elegido resaltado', pg.locator(f'.dmday.sel[data-day="{t}"]').count()==1)
      pg.screenshot(path='shots/mes-detalle.png',full_page=True)
      pg.tap(f'.dmday[data-day="{a2}"]'); pg.wait_for_timeout(300)
      ok('tocar día lo elige', pg.evaluate("UI.selDate")==a2)
      pg.tap('[data-ms="puntos"]'); pg.wait_for_timeout(300)
      ok('cambiar a Puntos', pg.locator('.cmonth').count()==1)
      pg.tap('[data-ms="detalle"]'); pg.wait_for_timeout(300)
      ok('volver a Detalle', pg.locator('.dmonth').count()==1)
    ok(f'[{lab}] viaje en el panel del día 3', 'Viaje a Japón' in pg.evaluate(f"sortedDay('{a3}').map(i=>i.x.title||i.x.name).join(',')"))
    pg.evaluate("S.settings.calView='forecast';UI.calDate=todayISO();renderView()"); pg.wait_for_timeout(300)
    ok(f'[{lab}] vista Próximos', pg.locator('.forecast .fday').count()>=3)
    ok(f'[{lab}] tarjeta con hora inicio y fin', pg.locator('.ftile[data-ev="e1"] .ftend').count()==1)
    ok(f'[{lab}] viaje como Todo el día', 'Todo el día' in pg.locator('.ftile[data-ev="e3"]').first.inner_text())
    pg.locator('.ftile [data-chk="t1"]').click(); pg.wait_for_timeout(300)
    ok(f'[{lab}] completar tarea desde Próximos', pg.evaluate("isDone(S.tasks.find(x=>x.id==='t1'))"))
    pg.screenshot(path=f'shots/{lab}-proximos.png')
    pg.evaluate("openEventForm(null,{date:todayISO()},'month')"); pg.wait_for_timeout(300)
    pg.fill('#eTitle','Congreso'); pg.fill('#eEnd', a3); pg.click('#eSave'); pg.wait_for_timeout(300)
    ok(f'[{lab}] formulario guarda fin de varios días', pg.evaluate("S.events.find(e=>e.title==='Congreso').endDate")==a3)
    ok(f'[{lab}] sin scroll horizontal', pg.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"))
    ok(f'[{lab}] sin errores', not errs, errs); ctx.close()
  b.close()
print('FALLAS', R.count(False))
