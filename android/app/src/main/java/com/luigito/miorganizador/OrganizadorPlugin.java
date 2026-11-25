package com.luigito.miorganizador;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "Organizador")
public class OrganizadorPlugin extends Plugin {
    static String pendingAction = null;

    /** Guarda los datos de la widget y la redibuja. */
    @PluginMethod
    public void updateWidget(PluginCall call) {
        String data = call.getString("data", "{}");
        Context ctx = getContext();
        ctx.getSharedPreferences(HoyWidget.PREFS, Context.MODE_PRIVATE).edit().putString(HoyWidget.KEY, data).apply();
        HoyWidget.refreshAll(ctx);
        CalWidget.refreshAll(ctx);
        call.resolve();
    }

    /** Acción con la que se abrió la app desde la widget (nueva, dia, listas). */
    @PluginMethod
    public void takeWidgetChanges(PluginCall call) {
        SharedPreferences p = getContext().getSharedPreferences(CalWidget.PREFS, Context.MODE_PRIVATE);
        String q = p.getString(CalWidget.QUEUE, "[]");
        p.edit().remove(CalWidget.QUEUE).remove(CalWidget.OVERRIDES).apply();
        JSObject r = new JSObject();
        r.put("changes", q);
        call.resolve(r);
    }

    @PluginMethod
    public void getPendingAction(PluginCall call) {
        JSObject r = new JSObject();
        r.put("action", pendingAction);
        pendingAction = null;
        call.resolve(r);
    }

    /** Guarda una copia de seguridad en la carpeta Descargas. */
    @PluginMethod
    public void saveBackup(PluginCall call) {
        String name = call.getString("name", "mi-organizador-copia.json");
        String text = call.getString("text", "");
        byte[] bytes = text.getBytes(StandardCharsets.UTF_8);
        try {
            String where;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ContentResolver cr = getContext().getContentResolver();
                ContentValues v = new ContentValues();
                v.put(MediaStore.Downloads.DISPLAY_NAME, name);
                v.put(MediaStore.Downloads.MIME_TYPE, "application/json");
                v.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);
                Uri uri = cr.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, v);
                if (uri == null) throw new Exception("No se pudo crear el archivo");
                try (OutputStream os = cr.openOutputStream(uri)) { os.write(bytes); }
                where = "Descargas/" + name;
            } else {
                File dir = getContext().getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
                File f = new File(dir, name);
                try (FileOutputStream os = new FileOutputStream(f)) { os.write(bytes); }
                where = f.getAbsolutePath();
            }
            JSObject r = new JSObject();
            r.put("path", where);
            call.resolve(r);
        } catch (Exception e) {
            call.reject("No se pudo guardar la copia: " + e.getMessage());
        }
    }
}
