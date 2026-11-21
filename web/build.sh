#!/bin/sh
# Arma www/index.html para la app de Android (incluye las piezas de Capacitor)
set -e
cd "$(dirname "$0")/.."
VER="${APP_VERSION_NAME:-dev}"
mkdir -p www
NM=node_modules/@capacitor
{
echo '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#1f5fbf"><title>Mi Organizador Personal</title>'
echo '<style>'; cat web/src/style.css; echo '</style></head><body>'
echo '<script>'; cat $NM/core/dist/capacitor.js; echo; cat $NM/local-notifications/dist/plugin.js $NM/preferences/dist/plugin.js $NM/app/dist/plugin.js $NM/browser/dist/plugin.js; echo '</script>'
echo '<script>'
cat web/src/core.js web/src/ui.js web/src/views.js web/src/native.js
echo '</script></body></html>'
} | sed "s/__APP_VERSION__/$VER/g" > www/index.html
echo "www/index.html listo (versión $VER)"
