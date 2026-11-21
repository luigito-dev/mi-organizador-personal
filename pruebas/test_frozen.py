# La nube entrega datos "congelados" (solo lectura): la app debe poder cambiarlos igual
from playwright.sync_api import sync_playwright
MOCK = r"""<script>
const deep=o=>{Object.values(o).forEach(v=>{if(v&&typeof v==='object')deep(v)});return Object.freeze(o)};
window.__cloud = {meta:deep({settings:{tutorialSeen:true,focus:{mode:'pomo',sound:'rain',vol:0.6,style:'ring',act:'🎯 Enfoque',cdMin:30,acts:[]},hiddenAreas:[],motivUsed:[1,2]},types:[{id:'pendiente',name:'Pendiente',icon:'📝',color:'#6b7487',builtin:true}],savedAt:1000,v:1,weekGoals:{},focusLog:{},notified:{}}),
 tasks:deep({items:[{id:'old',title:'Tarea de la nube',date:'2030-01-01',status:'Pendiente',typeId:'pendiente',priority:'Media',steps:[{t:'paso',done:false}]}]}),
 lists:deep({items:[{id:'l1',name:'Compras',icon:'🛒',color:'#1f5fbf',items:[{id:'i1',t:'Leche',done:false}]}]})};
window.claude={use:async(n)=>{await new Promise(r=>setTimeout(r,300)); if(n==='user')return {id:async()=>'u_1'}; if(n==='db')return {doc:(path)=>{const k=path.split('/').pop();return {get:async()=>{const c=window.__cloud[k];return c?{exists:true,data:()=>c}:{exists:false}}, set:async()=>{}}}}; return null;}};
</script>"""
h=open('/home/claude/org/index.html').read().replace('<body>','<body>'+MOCK,1); open('/home/claude/org/frozen.html','w').write(h)
with sync_playwright() as p:
  b=p.chromium.launch(); dev=p.devices['Pixel 7']; ctx=b.new_context(**dev); pg=ctx.new_page(); errs=[]
  pg.on('pageerror',lambda e: errs.append(str(e)))
  pg.goto('file:///home/claude/org/frozen.html'); pg.wait_for_timeout(1500)
  print('cargó nube:', pg.evaluate("S.tasks.map(t=>t.title)"))
  pg.evaluate("go('enfoque')"); pg.wait_for_timeout(300)
  pg.tap('#fSnd'); pg.wait_for_timeout(200); pg.tap('[data-snd="coqui"]'); pg.wait_for_timeout(800)
  print('sonido elegido:', pg.evaluate("fcfg().sound"), '| sonando:', pg.evaluate("Ambient.curId"))
  pg.tap('.sheet [data-close]'); pg.tap('#fSty'); pg.tap('[data-fm="cd"]'); pg.wait_for_timeout(200)
  print('estilo/modo:', pg.evaluate("[fcfg().style, fcfg().mode]"))
  # tocar otras cosas que vienen de la nube
  pg.evaluate("setDone('old', true); openTaskDetail('old')"); pg.wait_for_timeout(200)
  pg.evaluate("go('tareas'); UI.taskMode='listas'; UI.openList='l1'; render()"); pg.wait_for_timeout(200)
  pg.tap('[data-li]'); pg.wait_for_timeout(200)
  print('lista marcada:', pg.evaluate("S.lists[0].items[0].done"), '| tarea completada:', pg.evaluate("S.tasks[0].status"))
  print('avisos:', [t.inner_text() for t in pg.locator('.toast').all()])
  print('errores:', errs); b.close()
