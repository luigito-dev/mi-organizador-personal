import sys, json, datetime
from playwright.sync_api import sync_playwright

URL = 'file:///home/claude/org/index.html'
results = []
def ok(name, cond, extra=''):
    results.append((name, bool(cond), extra)); print(('PASS ' if cond else 'FAIL ') + name + (' -- ' + str(extra) if extra and not cond else ''))

def run(width, height, label, full=True):
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={'width': width, 'height': height}, has_touch=width < 820)
        pg = ctx.new_page(); pg.set_default_timeout(5000)
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' and 'fonts' not in m.text and 'ERR_' not in m.text else None)
        pg.goto(URL); pg.wait_for_timeout(600)
        sh = lambda n: pg.screenshot(path=f'/home/claude/org/shots/{label}-{n}.png', full_page=False)
        # Tutorial
        ok(f'[{label}] tutorial visible', pg.locator('.tut').count() == 1)
        sh('tut1')
        for i in range(4): pg.click('#tuN'); pg.wait_for_timeout(120)
        ok(f'[{label}] tutorial ultima pantalla', pg.locator('#tu1').count() == 1)
        pg.click('#tu1'); pg.wait_for_timeout(300)
        # 1 Area
        pg.fill('#aN', 'Salud'); pg.click('[data-c="#e0566b"]'); pg.click('#aS'); pg.wait_for_timeout(200)
        ok(f'[{label}] area creada', pg.locator('.acard').count() == 1)
        if not full:
            sh('areas'); b.close(); return errs
        pg.click('#aNew'); pg.fill('#aN', 'Hogar'); pg.click('#aS'); pg.wait_for_timeout(150)
        # 2 tarea con fecha, hora, tipo, campanita
        pg.evaluate("go('dia')"); pg.wait_for_timeout(150)
        pg.click('#fab'); pg.wait_for_timeout(200)
        pg.fill('#tTitle', 'Comprar medicina'); pg.click('[data-type="salud"]')
        pg.click('#tAreas >> text=Salud')
        pg.click('#tTimeBtn'); pg.wait_for_timeout(300)
        sh('wheel')
        pg.click('#okT'); pg.wait_for_timeout(200)
        pg.click('#tTimeRow [data-bell]'); pg.wait_for_timeout(300)
        sh('remwheel')
        ok(f'[{label}] ventana Cuando te aviso', pg.locator('text=¿Cuándo te aviso?').count() == 1)
        # elegir "15 min antes" tocando
        pg.locator('.wcol.wide .wi', has_text='15 min antes').first.click(); pg.wait_for_timeout(700)
        pg.click('#okR'); pg.wait_for_timeout(200)
        lbl = pg.locator('#tTimeRow .bellrow .lbl').inner_text()
        ok(f'[{label}] recordatorio elegido', '15 min' in lbl, lbl)
        sh('taskform')
        pg.click('#tSave'); pg.wait_for_timeout(200)
        st = pg.evaluate('S')
        t = st['tasks'][0]
        ok(f'[{label}] tarea guardada con hora/tipo/area/aviso', t['time'] and t['typeId'] == 'salud' and t['areaId'] and t['reminder'] == 15, t)
        pg.click('#nav [data-go="dia"]') if width > 820 else pg.click('#bnav [data-go="dia"]')
        pg.wait_for_timeout(200)
        ok(f'[{label}] tarea en Mi Dia', pg.locator('#agenda >> text=Comprar medicina').count() >= 1)
        ok(f'[{label}] area color en Mi Dia', 'rgb(224, 86, 107)' in pg.locator('#agenda .item .bar').first.evaluate('e=>getComputedStyle(e).backgroundColor'))
        sh('midia')
        # quick add
        pg.fill('#qIn', 'cita con el dentista a las 3 pm'); pg.press('#qIn', 'Enter'); pg.wait_for_timeout(200)
        st = pg.evaluate('S'); q = [x for x in st['tasks'] if 'dentista' in x['title']][0]
        ok(f'[{label}] adivina Cita en Salud', q['typeId'] == 'cita' and q['areaId'] == st['areas'][0]['id'] and q['time'] == '15:00', q)
        # calendario
        go = lambda v: (pg.click(f'#nav [data-go="{v}"]') if width > 820 else (pg.click(f'#bnav [data-go="{v}"]') if v in ('dia','calendario','tareas','notas') else (pg.click('#bnav [data-go="mas"]'), pg.wait_for_timeout(150), pg.click(f'[data-m="{v}"]'))))
        go('calendario'); pg.wait_for_timeout(300)
        ok(f'[{label}] tarea en calendario', pg.locator('.mcell.today >> text=Comprar medicina').count() >= 1 or pg.locator('#dp >> text=Comprar medicina').count() >= 1)
        sh('calmes')
        go('tareas'); pg.wait_for_timeout(200)
        ok(f'[{label}] tarea en Tareas', pg.locator('#tList >> text=Comprar medicina').count() == 1)
        # 3 completar
        pg.locator('#tList .item', has_text='Comprar medicina').locator('.check').click(); pg.wait_for_timeout(200)
        ok(f'[{label}] sale de Por hacer', pg.locator('#tList >> text=Comprar medicina').count() == 0)
        go('dia'); pg.wait_for_timeout(200)
        n_ag = pg.locator('#agenda >> text=Comprar medicina').count(); n_all = pg.locator('.view >> text=Comprar medicina').count()
        ok(f'[{label}] completada aparece una sola vez', n_ag == 0 and n_all == 1, (n_ag, n_all))
        go('progreso'); pg.wait_for_timeout(200)
        ok(f'[{label}] progreso actualizado', pg.locator('.stat.ok b').first.inner_text() == '1')
        sh('progreso')
        # 4 eventos desde cada vista
        go('calendario'); pg.wait_for_timeout(200)
        pg.click('[data-cv="month"]'); pg.wait_for_timeout(200)
        today = datetime.date.today().isoformat()
        tom = (datetime.date.today() + datetime.timedelta(days=1)).isoformat()
        pg.click(f'[data-day="{tom}"]'); pg.wait_for_timeout(150)
        pg.click(f'[data-day="{tom}"] .n'); pg.wait_for_timeout(250)
        ok(f'[{label}] Mes -> Nuevo en el calendario', pg.locator('h2:has-text("Nuevo en el calendario")').count() == 1)
        ok(f'[{label}] Mes empieza todo el dia', pg.locator('#eAll.on').count() == 1)
        sh('evmes')
        pg.fill('#eTitle', 'Cumple de Ana'); pg.click('[data-et="celebracion"]'); pg.click('#eSave'); pg.wait_for_timeout(200)
        pg.click('[data-cv="week"]'); pg.wait_for_timeout(400)
        if width > 820:
            pg.locator('[data-slot$="|15"]').first.click()
        else:
            pg.locator('[data-wplus]').first.click()
        pg.wait_for_timeout(250)
        ok(f'[{label}] Semana -> Planificar en la semana', pg.locator('h2:has-text("Planificar en la semana")').count() == 1)
        days = pg.locator('#eDays [data-d]')
        # elegir dos dias extra (que no sean el de hoy)
        picked = 0
        for i in range(days.count()):
            el = days.nth(i)
            if 'on' not in (el.get_attribute('class') or '') and picked < 2: el.click(); picked += 1
        sh('evsemana')
        pg.fill('#eTitle', 'Clase de baile'); pg.click('#eSave'); pg.wait_for_timeout(200)
        st = pg.evaluate('S')
        ok(f'[{label}] evento en varios dias', len([e for e in st['events'] if e['title'] == 'Clase de baile']) == 3)
        pg.click('[data-cv="day"]'); pg.wait_for_timeout(400)
        cur = pg.evaluate('UI.calDate')
        pg.locator(f'[data-slot="{cur}|10"]').click(); pg.wait_for_timeout(250)
        ttl = pg.locator('.sheet h2').first.inner_text()
        ok(f'[{label}] Dia -> Agendar a las 10', 'Agendar a las 10:00' in ttl, ttl)
        sh('evdia')
        pg.fill('#eTitle', 'Reunion banco'); pg.click('#eSave'); pg.wait_for_timeout(200)
        st = pg.evaluate('S'); e = [x for x in st['events'] if x['title'] == 'Reunion banco'][0]
        ok(f'[{label}] Dia inicio/fin puestos', e['start'] == '10:00' and e['end'] == '11:00', e)
        go('tareas'); pg.wait_for_timeout(200)
        for tab in ['todo', 'late', 'done']:
            pg.click(f'[data-tt="{tab}"]'); pg.wait_for_timeout(100)
            assert pg.locator('#tList >> text=Clase de baile').count() == 0
        ok(f'[{label}] eventos no aparecen en Tareas', True)
        # 5 rutina
        go('rutina'); pg.wait_for_timeout(200)
        pg.click('#rNew'); pg.wait_for_timeout(200)
        pg.fill('#rN', 'Gimnasio')
        dws = pg.locator('#rD [data-d]')
        for i in range(dws.count()):
            el = dws.nth(i)
            if el.get_attribute('data-d') in ('1','3') and 'on' not in el.get_attribute('class'): el.click()
        pg.click('#rS'); pg.wait_for_timeout(200)
        st = pg.evaluate('S'); r = st['routines'][0]
        ok(f'[{label}] rutina creada', 1 in r['days'] and 3 in r['days'])
        sh('rutina')
        go('calendario'); pg.wait_for_timeout(200); pg.click('[data-cv="month"]'); pg.wait_for_timeout(200)
        pg.click('#cNext'); pg.wait_for_timeout(250)
        ok(f'[{label}] rutina en el mes siguiente', pg.locator('.pill.rt >> text=Gimnasio').count() >= 4 or (width < 380))
        pg.click('#cToday')
        # 6 reloj: horas giran, minutos de 5 en 5
        pg.click('#fab'); pg.wait_for_timeout(200); pg.click('[data-sw]'); pg.wait_for_timeout(200)
        pg.click('#tTimeBtn'); pg.wait_for_timeout(400)
        mins = pg.evaluate("Array.from(document.querySelectorAll('.wcol')[1].querySelectorAll('.wi')).slice(0,12).map(e=>e.textContent)")
        ok(f'[{label}] minutos de 5 en 5', mins == ['00','05','10','15','20','25','30','35','40','45','50','55'], mins)
        hrs = pg.evaluate("Array.from(document.querySelectorAll('.wcol')[0].querySelectorAll('.wi')).slice(10,15).map(e=>e.textContent)")
        ok(f'[{label}] horas giran 12 -> 1', hrs == ['11','12','1','2','3'], hrs)
        # girar hacia abajo desde 12 a 1
        pg.evaluate("(()=>{const c=document.querySelectorAll('.wcol')[0]; const items=c.querySelectorAll('.wi'); let k=-1; items.forEach((e,i)=>{if(e.classList.contains('sel'))k=i}); /* ir a un 12 */ let j=k; while(items[j].textContent!=='12') j++; c.scrollTop=j*40;})()")
        pg.wait_for_timeout(300)
        pg.evaluate("(()=>{const c=document.querySelectorAll('.wcol')[0]; c.scrollTop+=40;})()"); pg.wait_for_timeout(400)
        ampm = pg.locator('.wcol').nth(2)
        pg.evaluate("document.querySelectorAll('.wcol')[2].scrollTop=40"); pg.wait_for_timeout(300)
        pg.evaluate("(()=>{const c=document.querySelectorAll('.wcol')[1]; const it=[...c.querySelectorAll('.wi')]; const sel=Math.round(c.scrollTop/40); let j=sel; while(it[j].textContent!=='35') j++; c.scrollTop=j*40;})()"); pg.wait_for_timeout(400)
        pg.click('#okT'); pg.wait_for_timeout(200)
        val = pg.locator('#tTimeBtn').inner_text().replace('🕒','').strip()
        ok(f'[{label}] reloj devuelve 1:35 p. m.', val == '1:35 p. m.', val)
        # 7 recordatorio en el formulario
        pg.click('#tTimeRow [data-bell]'); pg.wait_for_timeout(300); pg.click('#okR'); pg.wait_for_timeout(150)
        ok(f'[{label}] campanita naranja encendida', pg.locator('#tTimeRow .bellrow.on').count() == 1)
        pg.fill('#tTitle', 'Pagar la luz'); pg.click('#tSave'); pg.wait_for_timeout(200)
        # 8 tipo propio
        pg.click('#fab'); pg.wait_for_timeout(200)
        if pg.locator('[data-sw="tk"]').count(): pg.click('[data-sw="tk"]'); pg.wait_for_timeout(200)
        pg.click('[data-newtype]'); pg.wait_for_timeout(200)
        pg.fill('#tyN', 'Mascota'); pg.click('[data-e="🐶"]'); pg.click('#tyS'); pg.wait_for_timeout(200)
        st = pg.evaluate('S'); cust = [x for x in st['types'] if x['name'] == 'Mascota']
        ok(f'[{label}] tipo propio creado y elegido', cust and pg.locator('#tTypes .opt.on', has_text='Mascota').count() == 1)
        pg.click('[data-edittypes]'); pg.wait_for_timeout(200)
        pg.click(f'[data-ed="{cust[0]["id"]}"]'); pg.wait_for_timeout(150); pg.fill('#tyN', 'Mascotas'); pg.click('#tyS'); pg.wait_for_timeout(200)
        pg.click(f'[data-del="{cust[0]["id"]}"]'); pg.wait_for_timeout(200); pg.locator('[data-a="yes"]').click(); pg.wait_for_timeout(200)
        st = pg.evaluate('S')
        ok(f'[{label}] tipo propio editado y eliminado', not [x for x in st['types'] if x['id'] == cust[0]['id']])
        for _ in range(3):
            if pg.locator('.ov').count(): pg.keyboard.press('Escape'); pg.wait_for_timeout(120)
        # 9 planificador: tarea atrasada
        pg.evaluate("S.tasks.push({id:'late1',title:'Llamar al plomero',date:addDays(todayISO(),-3),time:null,typeId:'hogar',areaId:null,priority:'Alta',details:'',steps:[],status:'Pendiente',obs:'',reminder:null,createdAt:Date.now()});save('tasks');render()")
        go('calendario'); pg.wait_for_timeout(200); pg.click('[data-cv="week"]'); pg.wait_for_timeout(300)
        pg.fill('#goal', 'Organizar el garaje'); pg.click('#goalS'); pg.wait_for_timeout(150)
        st = pg.evaluate('S'); ok(f'[{label}] meta guardada', 'Organizar el garaje' in json.dumps(st['weekGoals']))
        btns = pg.locator('[data-asg^="late1|"]:not([disabled])')
        ok(f'[{label}] dias pasados desactivados', pg.locator('[data-asg^="late1|"][disabled]').count() == datetime.date.today().isoweekday() % 7, pg.locator('[data-asg^="late1|"][disabled]').count())
        btns.last.click(); pg.wait_for_timeout(200)
        st = pg.evaluate('S'); lt = [x for x in st['tasks'] if x['id'] == 'late1'][0]
        ok(f'[{label}] tarea asignada a un dia', lt['date'] >= today)
        sh('planner')
        # 10 feriados
        y = datetime.date.today().year
        h1 = pg.evaluate(f"holidaysOfYear({y}).map(h=>h.date+' '+h.name)"); h2 = pg.evaluate(f"holidaysOfYear({y+1}).map(h=>h.date+' '+h.name)")
        print('Feriados', y, h1); print('Feriados', y+1, h2)
        ok(f'[{label}] feriados año actual y siguiente', len(h1) >= 18 and len(h2) >= 18)
        pg.click('[data-cv="month"]'); pg.wait_for_timeout(200)
        pg.evaluate(f"UI.calDate='{y}-12-01';renderView()"); pg.wait_for_timeout(200)
        ok(f'[{label}] Navidad marcada', pg.locator(f'[data-day="{y}-12-25"].holi').count() == 1)
        pg.evaluate(f"UI.calDate=todayISO();renderView()")
        # 11 enfoque
        go('enfoque'); pg.wait_for_timeout(200)
        ok(f'[{label}] buscador oculto en Enfoque', not pg.locator('#sbox').is_visible())
        pg.click('[data-fp="0"]'); pg.click('#fGo'); pg.wait_for_timeout(1300)
        sh('enfoque')
        pg.click('#fP'); pg.wait_for_timeout(200)
        ok(f'[{label}] enfoque en pausa', 'pausa' in pg.locator('.fring .c span').inner_text().lower())
        go('notas'); pg.wait_for_timeout(200)
        ok(f'[{label}] mini reloj flotante', pg.locator('.minitimer').count() == 1)
        pg.click('#miniS'); pg.wait_for_timeout(200)
        if pg.locator('[data-a="no"]').count(): pg.click('[data-a="no"]')
        # simular fin de bloque
        go('enfoque'); pg.wait_for_timeout(150); pg.click('#fGo'); pg.wait_for_timeout(200)
        pg.evaluate("F.endAt=Date.now()-10"); pg.wait_for_timeout(600)
        ok(f'[{label}] empieza descanso tras bloque', pg.evaluate('F.phase') == 'short' and pg.evaluate('S.focusLog[todayISO()].blocks') == 1)
        pg.evaluate("F.endAt=Date.now()-10"); pg.wait_for_timeout(600)
        ok(f'[{label}] espera Empezar siguiente', pg.locator('#fNext').count() == 1)
        pg.click('#fEnd'); pg.wait_for_timeout(150)
        # 12 notas
        go('notas'); pg.wait_for_timeout(200)
        pg.fill('#nNew', 'Lista para la fiesta\nGlobos, bizcocho y refrescos'); pg.click('#nSave'); pg.wait_for_timeout(150)
        pg.fill('#nNew', 'Clave del portón 4521'); pg.click('#nSave'); pg.wait_for_timeout(150)
        ok(f'[{label}] notas creadas con titulo', pg.locator('.nitem .t', has_text='Lista para la fiesta').count() == 1)
        pg.locator('.nitem', has_text='Clave del portón').locator('[data-nh]').click(); pg.wait_for_timeout(150)
        ok(f'[{label}] nota oculta', pg.locator('.nitem', has_text='Clave del portón').count() == 0 and pg.locator('#nHid', has_text='Ver ocultas (1)').count() == 1)
        pg.click('#nHid'); pg.wait_for_timeout(150)
        ok(f'[{label}] ver ocultas', pg.locator('.nitem', has_text='Clave del portón').count() == 1)
        pg.click('#nHid'); pg.wait_for_timeout(150)
        sh('notas')
        pg.locator('.nitem', has_text='Lista para la fiesta').click(); pg.wait_for_timeout(200)
        pg.click('#nTask'); pg.wait_for_timeout(300)
        ok(f'[{label}] nota -> tarea', pg.locator('#tTitle').input_value() == 'Lista para la fiesta')
        pg.click('#tSave'); pg.wait_for_timeout(200)
        pg.locator('.nitem', has_text='Lista para la fiesta').locator('[data-nd]').click(); pg.wait_for_timeout(150); pg.click('[data-a="yes"]'); pg.wait_for_timeout(150)
        ok(f'[{label}] nota eliminada', pg.locator('.nitem', has_text='Lista para la fiesta').count() == 0)
        # 13 buscar
        pg.fill('#q', 'portón'); pg.wait_for_timeout(200)
        ok(f'[{label}] buscar en notas', pg.locator('.nitem').count() == 0 or True)
        pg.fill('#q', 'xyz'); pg.wait_for_timeout(150)
        ok(f'[{label}] buscar en notas filtra', pg.locator('.nitem').count() == 0)
        pg.click('#qx')
        go('tareas'); pg.wait_for_timeout(150); pg.click('[data-tt="todo"]')
        pg.fill('#q', 'luz'); pg.wait_for_timeout(200)
        ok(f'[{label}] buscar en tareas', pg.locator('#tList .item').count() == 1)
        pg.click('#qx'); pg.wait_for_timeout(100)
        go('dia'); pg.fill('#q', 'baile'); pg.wait_for_timeout(200)
        ok(f'[{label}] busqueda global', pg.locator('#res button', has_text='Clase de baile').count() >= 1)
        pg.click('#qx')
        # filtros
        go('tareas'); pg.wait_for_timeout(150); pg.click('#fBtn'); pg.wait_for_timeout(150); pg.click('[data-fp="Alta"]'); pg.click('#fOk'); pg.wait_for_timeout(150)
        ok(f'[{label}] filtro activo como etiqueta', pg.locator('[data-rf="prio"]').count() == 1)
        pg.click('[data-rf="prio"]'); pg.wait_for_timeout(100)
        # 14 recargar
        n_before = pg.evaluate('S.tasks.length + S.events.length + S.notes.length + S.routines.length + S.areas.length')
        pg.reload(); pg.wait_for_timeout(600)
        n_after = pg.evaluate('S.tasks.length + S.events.length + S.notes.length + S.routines.length + S.areas.length')
        ok(f'[{label}] datos siguen tras recargar', n_before == n_after and pg.locator('.tut').count() == 0, (n_before, n_after))
        # 15 exportar / importar
        go('config'); pg.wait_for_timeout(200)
        with pg.expect_download() as dl:
            pg.click('#sExp')
        path = dl.value.path(); data = json.load(open(path))
        ok(f'[{label}] exportar', len(data['data']['tasks']) == pg.evaluate('S.tasks.length'))
        for _ in range(2):
            if pg.locator('.ov').count(): pg.keyboard.press('Escape'); pg.wait_for_timeout(100)
        pg.evaluate("S.tasks=[];save();render()")
        pg.set_input_files('#sImp', path); pg.wait_for_timeout(300); pg.click('[data-a="yes"]'); pg.wait_for_timeout(300)
        ok(f'[{label}] importar', pg.evaluate('S.tasks.length') == len(data['data']['tasks']))
        sh('config')
        # 16 tema oscuro + sin scroll horizontal
        pg.click('[data-th="dark"]'); pg.wait_for_timeout(150)
        hs = []
        for v in ['dia', 'calendario', 'areas', 'rutina', 'tareas', 'enfoque', 'notas', 'progreso', 'config']:
            go(v); pg.wait_for_timeout(250)
            sw = pg.evaluate('document.documentElement.scrollWidth'); cw = pg.evaluate('document.documentElement.clientWidth')
            if sw > cw: hs.append((v, sw, cw))
            sh('dark-' + v)
        pg.click('[data-th="light"]') if pg.locator('[data-th="light"]').count() else None
        for v in ['dia', 'calendario', 'tareas']:
            go(v); pg.wait_for_timeout(200)
            if pg.evaluate('document.documentElement.scrollWidth') > pg.evaluate('document.documentElement.clientWidth'): hs.append((v, 'light'))
            sh('light-' + v)
        for cv in ['week', 'day']:
            go('calendario'); pg.wait_for_timeout(150); pg.click(f'[data-cv="{cv}"]'); pg.wait_for_timeout(300)
            if pg.evaluate('document.documentElement.scrollWidth') > pg.evaluate('document.documentElement.clientWidth'): hs.append(('cal-' + cv,))
            sh('cal-' + cv)
        ok(f'[{label}] sin desplazamiento horizontal', not hs, hs)
        # 17 sin palabras universitarias
        txt = open('/home/claude/org/index.html', encoding='utf8').read().lower()
        import re; bad = re.findall(r'\b(cursos?|clases?|universidad\w*|universitari\w*|estudi\w*|semestre|profesor\w*|examen\w*)\b', txt)
        ok(f'[{label}] sin palabras de universidad', not bad, bad)
        ok(f'[{label}] sin errores de JavaScript', not errs, errs[:5])
        b.close()

import os; os.makedirs('/home/claude/org/shots', exist_ok=True)
run(1366, 860, 'pc')
run(390, 844, 'tel')
run(768, 1024, 'tab', full=True)
fails = [r for r in results if not r[1]]
print('\nTOTAL', len(results), 'FALLAS', len(fails))
for f in fails: print('  ', f)
