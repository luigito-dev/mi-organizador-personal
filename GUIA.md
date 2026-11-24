# Mi Organizador Personal — app de Android

Organizador personal: Mi Día, calendario, tareas, listas, rutina semanal, enfoque, notas y progreso.
Incluye una widget "Hoy" para la pantalla de inicio y avisos que llegan aunque la app esté cerrada.

## Cómo instalarla en tu teléfono
1. En el teléfono, abre: https://github.com/luigito-dev/mi-organizador-personal/releases/latest/download/mi-organizador.apk
2. Cuando termine de bajar, toca el archivo. Si Android pregunta, permite "Instalar apps desconocidas" para Chrome.
3. Abre **Mi Organizador**, toca **Permitir** cuando pida notificaciones.
4. Para la widget: mantén el dedo en un espacio vacío de la pantalla de inicio → **Widgets** → **Mi Organizador · Hoy**.

## Actualizaciones
Cada cambio que se sube a este repositorio fabrica una versión nueva sola (pestaña **Actions**).
La app te avisa cuando hay una versión nueva: toca **Actualizar** e instálala encima. Tus datos se quedan.

## Tus datos
Se guardan solo en el teléfono. Haz copias con Configuración → **Exportar** (se guardan en Descargas).

## Para quien programe
- Código de las pantallas: `web/src/` (`core.js`, `ui.js`, `views.js`, `native.js`, `style.css`).
- Partes de Android (widget, copias): `android/app/src/main/java/com/luigito/miorganizador/`.
- Armado: `web/build.sh` → `npx cap sync android` → `./gradlew assembleRelease`.
- La llave de firma está en el secreto `KEYSTORE_B64` del repositorio. No la cambies o las actualizaciones no se podrán instalar encima.
