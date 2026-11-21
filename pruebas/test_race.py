# Simula la nube que tarda en llegar: lo que el usuario escribe antes no se debe perder
from playwright.sync_api import sync_playwright
MOCK = r"""<script>
window.__cloud = {meta:{exists:true,data:{settings:{tutorialSeen:true},types:[],savedAt:1000,v:1}}, tasks:{exists:true,data:{items:[{id:'old',title:'Tarea vieja de la nube',date:'2026-01-01',status:'Pendiente',typeId:'pendiente',priority:'Media',steps:[]}]}}};
window.__writes=[];
window.claude={use:async(n)=>{await new Promise(r=>setTimeout(r,2500)); if(n==='user')return {id:async()=>'u_1'}; if(n==='db')return {doc:(path)=>{const k=path.split('/').pop();return {get:async()=>{const c=window.__cloud[k];return c?{exists:true,data:()=>c.data}:{exists:false}}, set:async(d)=>{window.__writes.push([k,d])}}}}; return null;}};
</script>"""
h=open('/home/claude/org/index.html').read().replace('<body>','<body>'+MOCK,1); open('/home/claude/org/race.html','w').write(h)
with sync_playwright() as p:
  b=p.chromium.launch(); pg=b.new_page(viewport={'width':390,'height':844}); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
  # caso 1: dispositivo nuevo, escribe antes de que llegue la nube
  pg.goto('file:///home/claude/org/race.html'); pg.wait_for_timeout(400)
  pg.evaluate("sheets.slice().forEach(s=>s.close());S.settings.tutorialSeen=true")
  pg.fill('#qIn','Comprar pan'); pg.press('#qIn','Enter'); pg.wait_for_timeout(3500)
  print('caso 1 – lo escrito sigue:', [t['title'] for t in pg.evaluate('S.tasks')], '| subió a la nube:', any(w[0]=='tasks' and any(i['title']=='Comprar pan' for i in w[1]['items']) for w in pg.evaluate('__writes')))
  # caso 2: abre sin escribir: debe cargar la nube
  pg.evaluate("localStorage.clear()"); pg.goto('file:///home/claude/org/race.html'); pg.wait_for_timeout(3500)
  print('caso 2 – cargó la nube:', [t['title'] for t in pg.evaluate('S.tasks')])
  print('errores', errs)
  b.close()
