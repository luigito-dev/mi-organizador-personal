from playwright.sync_api import sync_playwright
R=[]
def ok(n,c,x=''): R.append(c); print(('PASS ' if c else 'FAIL ')+n+('' if c else ' -- '+str(x)))
SEED="""S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());const t=todayISO();
 S.areas.push({id:'a1',name:'Salud',color:'#e0566b'},{id:'a2',name:'Hogar',color:'#d4a017'});
 const T=(id,title,time,ty,ar,st,date,pr)=>({id,title,date:date||t,time,typeId:ty,areaId:ar||null,priority:pr||'Media',details:'',steps:[],status:st||'Pendiente',obs:'',reminder:null,createdAt:1});
 S.tasks.push(T('1','Tomar un vaso de agua','07:00','salud','a1'),T('2','Correr en la mañana','07:30','ejercicio','a2'),T('3','Almuerzo con Jenny','12:00','familia',null,null,null,'Alta'),T('4','Enviar correo a Tim','13:30','trabajo',null,'Completada'),T('5','Ir al supermercado','15:00','compras',null,'Completada'),T('6','Lavar el carro',null,'hogar','a2',null,addDays(t,1)));
 S.events.push({id:'e1',title:'Cumpleaños de Ana',date:addDays(t,3),allDay:true,start:'09:00',end:'10:00',evType:'celebracion',place:'',areaId:null,reminder:null,note:''},{id:'e2',title:'Dentista',date:addDays(t,5),allDay:false,start:'15:00',end:'16:00',evType:'cita',place:'',areaId:'a1',reminder:null,note:''});
 S.routines.push({id:'r1',name:'Gimnasio',areaId:'a1',days:[1,3,5],start:'06:00',end:'07:00',place:'',from:'',to:''});
 save();go('calendario');S.settings.calView='month';UI.selDate=t;UI.calDate=t;renderView()"""
with sync_playwright() as p:
  b=p.chromium.launch()
  for lab,kw in [('tel',dict(p.devices['Pixel 7'])),('pc',{'viewport':{'width':1366,'height':860}})]:
    ctx=b.new_context(**kw); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    tap=(lambda s: pg.tap(s)) if lab=='tel' else (lambda s: pg.click(s))
    pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300); pg.evaluate(SEED); pg.wait_for_timeout(300)
    if lab=='tel':
      ok('[tel] mes limpio', pg.locator('.cmonth .cmday').count()>=35)
      ok('[tel] 🎂 en el cumpleaños', pg.locator('.cmcake').count()==1)
      ok('[tel] puntitos de colores', pg.locator('.cmdots i').count()>=5)
      pg.screenshot(path='shots/tel-cm.png', full_page=True)
      tap('#cmFold'); pg.wait_for_timeout(200); ok('[tel] plegar deja una semana', pg.locator('.cmday').count()==7)
      tap('#cmFold'); pg.wait_for_timeout(200)
    ok(f'[{lab}] día en estilo All Tasks', pg.locator('#dp .hlday .hlrow').count()>=5 and pg.locator('#dp .hlnum').count()==1)
    ok(f'[{lab}] hechas tachadas', pg.locator('#dp .hlrow.done').count()==2)
    pg.locator('#dp .hlrow', has_text='Tomar un vaso de agua').locator('.hlbox').click(); pg.wait_for_timeout(300)
    ok(f'[{lab}] marcar con la casilla', pg.evaluate("S.tasks.find(t=>t.id==='1').status")=='Completada')
    pg.locator('#dp .hlrow', has_text='Correr').locator('.hltx').click(); pg.wait_for_timeout(300)
    ok(f'[{lab}] tocar abre detalle', pg.locator('.sheet h2', has_text='Tarea').count()==1); pg.keyboard.press('Escape')
    pg.locator('#dp .hladd').click(); pg.wait_for_timeout(300); ok(f'[{lab}] + abre formulario', pg.locator('#eTitle').count()==1); pg.keyboard.press('Escape')
    pg.evaluate("go('tareas')"); pg.wait_for_timeout(300)
    ok(f'[{lab}] Tareas agrupadas por fecha', pg.locator('#tList .hlday').count()==2)
    pg.locator('#tList .hladd').first.click(); pg.wait_for_timeout(300)
    ok(f'[{lab}] + en Tareas abre nueva tarea con esa fecha', pg.locator('#tTitle').count()==1); pg.keyboard.press('Escape')
    pg.screenshot(path=f'shots/{lab}-alltasks.png')
    ok(f'[{lab}] sin scroll horizontal', pg.evaluate("document.documentElement.scrollWidth<=document.documentElement.clientWidth"))
    ok(f'[{lab}] sin errores', not errs, errs); ctx.close()
  b.close()
print('FALLAS', R.count(False))
