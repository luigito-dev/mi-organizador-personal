package com.luigito.miorganizador;

import android.content.Context;
import android.content.SharedPreferences;
import org.json.JSONArray;
import org.json.JSONObject;

/** Ayudas compartidas por los widgets Agua, Hábitos de hoy y Comer saludable. */
final class OrgWidgets {
    static final String PREFS = "mi_organizador_widgets";
    static final String QUEUE = "queue";
    static final String ACT_AGUA = "com.luigito.miorganizador.W_AGUA";
    static final String ACT_HAB = "com.luigito.miorganizador.W_HAB";
    static final String ACT_FOOD = "com.luigito.miorganizador.W_FOOD";

    /** Datos que manda la app (HoyWidget.KEY). */
    static JSONObject data(Context ctx) {
        try {
            return new JSONObject(ctx.getSharedPreferences(HoyWidget.PREFS, Context.MODE_PRIVATE).getString(HoyWidget.KEY, "{}"));
        } catch (Exception e) {
            return new JSONObject();
        }
    }

    static void saveData(Context ctx, JSONObject d) {
        ctx.getSharedPreferences(HoyWidget.PREFS, Context.MODE_PRIVATE).edit().putString(HoyWidget.KEY, d.toString()).apply();
    }

    /** Guarda un cambio hecho desde el widget; la app lo aplica al volver. */
    static void enqueue(Context ctx, JSONObject item) {
        SharedPreferences p = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        try {
            JSONArray q = new JSONArray(p.getString(QUEUE, "[]"));
            q.put(item);
            p.edit().putString(QUEUE, q.toString()).apply();
        } catch (Exception ignored) { }
    }

    static String today() {
        return new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.US).format(new java.util.Date());
    }

    static void refreshAll(Context ctx) {
        AguaWidget.refreshAll(ctx);
        HabitosWidget.refreshAll(ctx);
        ComerWidget.refreshAll(ctx);
    }
}
