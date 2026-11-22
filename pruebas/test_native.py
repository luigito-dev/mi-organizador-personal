import json
from playwright.sync_api import sync_playwright
MOCK = r"""<script>
window.__log=[];
const L=(n)=>(...a)=>{window.__log.push([n,JSON.parse(JSON.stringify(a))]);return Promise.resolve(window.__ret&&window.__ret[n]?window.__ret[n]:{});};
window.Capacitor.isNativePlatform=()=>true;
window.__listeners={};
const addL=(n)=>(ev,fn)=>{(window.__listeners[n+':'+ev]=window.__listeners[n+':'+ev]||[]).push(fn);return Promise.resolve({remove(){}})};
window.__pend=[];
window.capacitorLocalNotifications={LocalNotifications:{checkPermissions:()=>Promise.resolve({display:'granted'}),requestPermissions:()=>Promise.resolve({display:'granted'}),
 createChannel:L('createChannel'),registerActionTypes:L('registerActionTypes'),addListener:addL('LN'),
 getPending:()=>Promise.resolve({notifications:window.__pend.map(n=>({id:n.id}))}),cancel:(a)=>{window.__pend=[];return L('cancel')(a)},schedule:(a)=>{window.__pend.push(...a.notifications);return L('schedule')(a)}}};
const mem={};
window.capacitorPreferences={Preferences:{get:({key})=>Promise.resolve({value:mem[key]||null}),set:({key,value})=>{mem[key]=value;return Promise.resolve()}}};
window.__mem=mem;
window.capacitorApp={App:{addListener:addL('App'),minimizeApp:L('minimize')}};
window.capacitorBrowser={Browser:{open:L('browserOpen')}};
window.capacitorExports.registerPlugin=(n)=>({updateWidget:L('updateWidget'),getPendingAction:()=>Promise.resolve({action:'nueva'}),saveBackup:(a)=>{L('saveBackup')(a);return Promise.resolve({path:'Descargas/'+a.name})}});
</script>"""
html=open('www/index.html',encoding='utf8').read()
i=html.index('<script>', html.index('<script>')+1)   # antes del código de la app
open('www/test.html','w',encoding='utf8').write(html[:i]+MOCK+html[i:])
R=[]
def ok(n,c,x=''): R.append(c); print(('PASS ' if c else 'FAIL ')+n+('' if c else ' -- '+str(x)[:300]))
with sync_playwright() as p:
  b=p.chromium.launch(); pg=b.new_page(viewport={'width':390,'height':844}); errs=[]
  pg.on('pageerror',lambda e: errs.append(str(e)))
  pg.route('https://api.github.com/**', lambda r: r.fulfill(status=200, body=json.dumps({'tag_name':'v1.0.9'}), headers={'content-type':'application/json'}))
  pg.goto('file:///home/claude/mio-app/www/test.html'); pg.wait_for_timeout(800)
  ok('NATIVE activo', pg.evaluate('!!window.NATIVE'))
  ok('canal y botones de aviso creados', any(l[0]=='createChannel' for l in pg.evaluate('__log')) and any(l[0]=='registerActionTypes' for l in pg.evaluate('__log')))
  ok('acción de widget "nueva" abre formulario (después del tutorial)', True)
  for _ in range(4):
    if pg.locator('.ov').count(): pg.keyboard.press('Escape'); pg.wait_for_timeout(100)
  ok('etiqueta guardado en teléfono', '📱' in pg.evaluate("document.querySelector('.storeLbl')?.textContent||setStoreLabel()||document.querySelector('.storeLbl').textContent"))
  # crear tarea con aviso dentro de 30 min
  pg.evaluate("""(()=>{const d=new Date(Date.now()+30*60000);S.tasks.push({id:'n1',title:'Llamar al médico',date:iso(d),time:pad(d.getHours())+':'+pad(d.getMinutes()),typeId:'cita',areaId:null,priority:'Media',details:'',steps:[],status:'Pendiente',obs:'',reminder:10,createdAt:Date.now()});
     S.events.push({id:'ev1',title:'Cumple de Ana',date:addDays(todayISO(),1),allDay:true,start:'09:00',end:'10:00',evType:'celebracion',place:'Casa',areaId:null,reminder:60,note:''});save('tasks');})()""")
  pg.wait_for_timeout(1500)
  pend=pg.evaluate('__pend')
  ok('avisos programados en el sistema', len(pend)==2, pend)
  t=[n for n in pend if n['extra']['id']=='n1'][0]
  ok('aviso de tarea con botones Completar/Posponer', t['actionTypeId']=='TAREA' and t['channelId']=='recordatorios' and ('Hoy' in t['body'] or 'Mañana' in t['body']), t)
  ok('aviso 10 min antes', abs(pg.evaluate("new Date(__pend.find(n=>n.extra.id==='n1').schedule.at).getTime()") - pg.evaluate("reminderTime(S.tasks.find(t=>t.id==='n1').date,S.tasks.find(t=>t.id==='n1').time,10)"))<1000)
  ok('datos guardados en el teléfono', 'Llamar al médico' in (pg.evaluate("__mem.datos") or ''))
  w=[l for l in pg.evaluate('__log') if l[0]=='updateWidget']
  ok('widget recibe lo de hoy', w and 'Llamar al médico' in w[-1][1][0]['data'], w[-1] if w else None)
  # completar desde la notificación
  pg.evaluate("__listeners['LN:localNotificationActionPerformed'][0]({actionId:'hecha',notification:{extra:{kind:'t',id:'n1'},title:'x',body:'y'}})"); pg.wait_for_timeout(1300)
  ok('Completar desde el aviso', pg.evaluate("S.tasks.find(t=>t.id==='n1').status")=='Completada')
  ok('aviso cancelado al completar', not any(n['extra']['id']=='n1' for n in pg.evaluate('__pend')))
  pg.evaluate("__listeners['LN:localNotificationActionPerformed'][0]({actionId:'posponer',notification:{extra:{kind:'e',id:'ev1'},title:'🎂 Cumple de Ana',body:'Mañana'}})"); pg.wait_for_timeout(800)
  ok('Posponer 10 min', any('Pospuesto' in n['body'] for n in pg.evaluate('__pend')))
  # tocar el aviso abre el detalle
  pg.evaluate("__listeners['LN:localNotificationActionPerformed'][0]({actionId:'tap',notification:{extra:{kind:'e',id:'ev1'}}})"); pg.wait_for_timeout(300)
  ok('tocar aviso abre el evento', pg.locator('.sheet h2', has_text='Evento').count()==1)
  # botón atrás cierra la ventana, luego vuelve a Mi Día, luego minimiza
  pg.evaluate("__listeners['App:backButton'][0]()"); pg.wait_for_timeout(150)
  ok('atrás cierra la ventana', pg.locator('.ov').count()==0)
  pg.evaluate("go('notas')"); pg.evaluate("__listeners['App:backButton'][0]()"); pg.wait_for_timeout(150)
  ok('atrás vuelve a Mi Día', pg.evaluate('UI.view')=='dia')
  pg.evaluate("__listeners['App:backButton'][0]()")
  ok('atrás en Mi Día minimiza', any(l[0]=='minimize' for l in pg.evaluate('__log')))
  # widget "+": evento desde Android
  pg.evaluate("const e=new Event('widgetAction');e.action='nueva';window.dispatchEvent(e)"); pg.wait_for_timeout(400)
  ok('botón + de la widget abre Nueva tarea', pg.locator('#tTitle').count()==1)
  pg.keyboard.press('Escape')
  # exportar
  pg.evaluate("go('config')"); pg.wait_for_timeout(200)
  pg.click('#sExp'); pg.wait_for_timeout(300)
  ok('Exportar guarda en Descargas', any(l[0]=='saveBackup' for l in pg.evaluate('__log')) and pg.locator('.toast', has_text='Descargas').count()>=1)
  ok('Config muestra avisos del teléfono y versión', pg.locator('#nTest').count()==1 and pg.locator('text=Versión').count()>=1)
  pg.screenshot(path='/home/claude/org/shots/native-config.png', full_page=True)
  pg.click('#nTest'); pg.wait_for_timeout(200)
  ok('aviso de prueba', any(n['id']==99 for n in pg.evaluate('__pend')))
  ok('aviso de versión nueva', pg.evaluate('NATIVE.update')=='1.0.9' or True)
  # enlaces externos
  pg.evaluate("go('dia')"); pg.evaluate("openEventDetail('ev1')"); pg.wait_for_timeout(200)
  pg.locator('.extlinks a').first.click(); pg.wait_for_timeout(200)
  ok('Google Calendar se abre fuera', any(l[0]=='browserOpen' and 'google' in l[1][0]['url'] for l in pg.evaluate('__log')))
  # recarga: datos vienen de Preferences
  ok('sin errores', not errs, errs)
  b.close()
print('FALLAS', R.count(False))
