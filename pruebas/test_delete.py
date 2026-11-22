from playwright.sync_api import sync_playwright
R=[]
def ok(n,c,x=''): R.append(c); print(('PASS ' if c else 'FAIL ')+n+('' if c else ' -- '+str(x)))
with sync_playwright() as p:
  b=p.chromium.launch()
  for lab,kw in [('tel',dict(p.devices['Pixel 7'])),('pc',{'viewport':{'width':1366,'height':860}})]:
    ctx=b.new_context(**kw); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    tap=(lambda s: pg.tap(s)) if lab=='tel' else (lambda s: pg.click(s))
    pg.goto('file:///home/claude/org/index.html'); pg.wait_for_timeout(300)
    pg.evaluate("""S.settings.tutorialSeen=true;sheets.slice().forEach(s=>s.close());const t=todayISO();
      const T=(id,title)=>({id,title,date:t,time:null,typeId:'pendiente',areaId:null,priority:'Media',details:'',steps:[],status:'Pendiente',obs:'',reminder:null,createdAt:1});
      S.tasks.push(T('a','Tarea A'),T('b','Tarea B'));
      S.lists.push({id:'c',name:'Compras',icon:'🛒',color:'#2e9d5b',items:[{id:'1',t:'Leche',done:false},{id:'2',t:'Pan',done:false}]});UI.popTab='hoy';save();go('dia')""")
    tap('#lsBtn'); pg.wait_for_timeout(300)
    tap('[data-qdel="a"]'); pg.wait_for_timeout(300)
    ok(f'[{lab}] borrar tarea pide confirmación', pg.locator('.sheet', has_text='¿Borrar la tarea').count()==1 and pg.evaluate("S.tasks.length")==2)
    tap('[data-a="yes"]'); pg.wait_for_timeout(300)
    ok(f'[{lab}] tarea borrada y sin marcar otra', pg.evaluate("S.tasks.map(t=>t.id).join()")=='b' and pg.evaluate("S.tasks[0].status")=='Pendiente')
    pg.evaluate("UI.popTab='c';dayLists(document.querySelector('#lsPop')||document.querySelector('.qcard .sh-body > div'))"); pg.wait_for_timeout(300)
    tap('[data-qdel="1"]'); pg.wait_for_timeout(300)
    ok(f'[{lab}] borrar de la lista al momento', pg.evaluate("S.lists[0].items.map(i=>i.t).join()")=='Pan')
    pg.screenshot(path=f'shots/{lab}-borrar.png')
    tap('.toast .tact'); pg.wait_for_timeout(300)
    ok(f'[{lab}] deshacer', pg.evaluate("S.lists[0].items.map(i=>i.t).join()")=='Leche,Pan' and pg.locator('.qrow').count()==2)
    if lab=='pc':
      tap('.qx'); pg.wait_for_timeout(200)
      c=pg.locator('.tlcard.swipe', has_text='Tarea B'); c.hover(); c.locator('[data-tdel]').click(); pg.wait_for_timeout(200); pg.click('[data-a="yes"]'); pg.wait_for_timeout(300)
      ok('[pc] borrar desde la línea de tiempo', pg.evaluate("S.tasks.length")==0)
    ok(f'[{lab}] sin errores', not errs, errs); ctx.close()
  b.close()
print('FALLAS', R.count(False))
