from playwright.sync_api import sync_playwright
R=[]
def ok(n,c,x=''): R.append(c); print(('PASS ' if c else 'FAIL ')+n+('' if c else ' -- '+str(x)))
SEED="""S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());const t=todayISO();
 const T=(id,title,time,date)=>({id,title,date:date||t,time:time||null,typeId:'pendiente',areaId:null,priority:'Media',details:'',steps:[],status:'Pendiente',obs:'',reminder:null,createdAt:1});
 S.tasks.push(T('a','Tarea uno'),T('b','Tarea dos','23:50'),T('l1','Atrasada uno',null,addDays(t,-3)),T('l2','Atrasada dos',null,addDays(t,-1)));
 S.events.push({id:'e1',title:'Evento mañana',date:addDays(t,1),allDay:true,start:'09:00',end:'10:00',evType:'evento',place:'',areaId:null,reminder:null,note:''});
 UI.motivHidden=true;save();go('notas');go('dia')"""
def swipe(pg,ctx,loc,dist):
  loc.evaluate("e=>e.scrollIntoView({block:'center'})"); pg.wait_for_timeout(150)
  bb=loc.bounding_box(); cdp=ctx.new_cdp_session(pg); y=bb['y']+bb['height']/2; x=bb['x']+40 if dist>0 else bb['x']+bb['width']-40
  cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
  for k in range(1,13): cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+dist*k/12,'y':y}]}); pg.wait_for_timeout(15)
  cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]}); pg.wait_for_timeout(500)
with sync_playwright() as p:
  b=p.chromium.launch()
  ctx=b.new_context(**p.devices['Pixel 7']); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
  pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300); pg.evaluate(SEED); pg.wait_for_timeout(300)
  ok('[tel] tira de 14 días', pg.locator('[data-dd]').count()==14)
  ok('[tel] AHORA en la línea', pg.locator('.nowmark').count()==1)
  ok('[tel] atrasadas arriba', pg.locator('.lateb .tlrow').count()==2)
  swipe(pg,ctx,pg.locator('.tlcard.swipe', has_text='Tarea uno'),160)
  ok('[tel] deslizar → completa', pg.evaluate("S.tasks.find(t=>t.id==='a').status")=='Completada')
  swipe(pg,ctx,pg.locator('.tlcard.swipe', has_text='Tarea dos'),-160)
  ok('[tel] deslizar ← pasa a mañana', pg.evaluate("S.tasks.find(t=>t.id==='b').date")==pg.evaluate("addDays(todayISO(),1)"))
  pg.evaluate("window.scrollTo(0,0)"); pg.tap('[data-totoday="l1"]'); pg.wait_for_timeout(300)
  ok('[tel] "A hoy" mueve atrasada', pg.evaluate("S.tasks.find(t=>t.id==='l1').date")==pg.evaluate("todayISO()"))
  pg.tap('#allToday'); pg.wait_for_timeout(300)
  ok('[tel] traer todas a hoy', pg.locator('.lateb').count()==0)
  pg.locator('.tlcard', has_text='Atrasada uno').scroll_into_view_if_needed(); pg.locator('.tlcard', has_text='Atrasada uno').tap(); pg.wait_for_timeout(300)
  ok('[tel] tocar abre detalle (sin gesto)', pg.locator('.sheet h2', has_text='Tarea').count()==1)
  pg.keyboard.press('Escape')
  tom=pg.evaluate("addDays(todayISO(),1)")
  pg.tap(f'[data-dd="{tom}"]'); pg.wait_for_timeout(300)
  ok('[tel] elegir mañana muestra lo de mañana', pg.locator('#tline >> text=Evento mañana').count()==1 and pg.locator('#tline >> text=Tarea dos').count()==1 and pg.locator('.nowmark').count()==0)
  pg.fill('#qIn','Lavar el carro'); pg.press('#qIn','Enter'); pg.wait_for_timeout(300)
  ok('[tel] añadir va al día elegido', pg.evaluate(f"S.tasks.find(t=>t.title==='Lavar el carro').date")==tom)
  ok('[tel] sin scroll horizontal', pg.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"))
  ok('[tel] sin errores', not errs, errs); ctx.close()
  # computadora: botones al pasar el ratón
  ctx=b.new_context(viewport={'width':1366,'height':860}); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
  pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300); pg.evaluate(SEED); pg.wait_for_timeout(300)
  c=pg.locator('.tlcard.swipe', has_text='Tarea uno'); c.hover(); pg.wait_for_timeout(100)
  ok('[pc] botones al pasar el ratón', c.locator('[data-tom]').is_visible())
  c.locator('[data-tom]').click(); pg.wait_for_timeout(300)
  ok('[pc] → Mañana', pg.evaluate("S.tasks.find(t=>t.id==='a').date")==pg.evaluate("addDays(todayISO(),1)"))
  c=pg.locator('.tlcard.swipe', has_text='Tarea dos'); c.hover(); c.locator('[data-done]').click(); pg.wait_for_timeout(300)
  ok('[pc] ✓ completa', pg.evaluate("S.tasks.find(t=>t.id==='b').status")=='Completada')
  pg.screenshot(path='shots/pc-dia2.png')
  ok('[pc] sin errores', not errs, errs); b.close()
print('FALLAS', R.count(False))
