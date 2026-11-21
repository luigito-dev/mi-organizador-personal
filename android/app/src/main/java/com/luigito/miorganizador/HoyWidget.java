package com.luigito.miorganizador;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.RemoteViews;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import org.json.JSONArray;
import org.json.JSONObject;

/** Widget "Hoy": muestra lo que tienes para hoy (eventos, tareas y rutinas). */
public class HoyWidget extends AppWidgetProvider {
    static final String PREFS = "mi_organizador_widget";
    static final String KEY = "data";
    private static final int[] ROWS = {R.id.row1, R.id.row2, R.id.row3, R.id.row4, R.id.row5, R.id.row6};
    private static final String[] DIAS = {"domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"};
    private static final String[] MESES = {"ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"};

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    static void refreshAll(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, HoyWidget.class));
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    private static PendingIntent open(Context ctx, String action, int code) {
        Intent i = new Intent(ctx, MainActivity.class);
        i.putExtra("widgetAction", action);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return PendingIntent.getActivity(ctx, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static RemoteViews build(Context ctx) {
        RemoteViews v = new RemoteViews(ctx.getPackageName(), R.layout.widget_hoy);
        Calendar c = Calendar.getInstance();
        String dia = DIAS[c.get(Calendar.DAY_OF_WEEK) - 1];
        v.setTextViewText(R.id.wDate, "HOY");
        v.setTextViewText(R.id.wSub, dia + " " + c.get(Calendar.DAY_OF_MONTH) + " " + MESES[c.get(Calendar.MONTH)]);
        String today = new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(c.getTime());
        int shown = 0, total = 0; String counter = "";
        try {
            String raw = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString(KEY, "{}");
            JSONObject data = new JSONObject(raw);
            JSONObject days = data.optJSONObject("days");
            JSONArray items = days != null ? days.optJSONArray(today) : null;
            JSONObject stats = data.optJSONObject("stats");
            JSONArray st = stats != null ? stats.optJSONArray(today) : null;
            if (st != null && st.optInt(1) > 0) counter = st.optInt(0) + "/" + st.optInt(1);
            if (items != null) {
                total = items.length();
                for (int k = 0; k < items.length() && shown < ROWS.length; k++) {
                    JSONObject it = items.getJSONObject(k);
                    String time = it.optString("h", "");
                    String line = "☐  " + it.optString("n", "") + (time.isEmpty() ? "" : "  · " + time);
                    v.setTextViewText(ROWS[shown], line);
                    v.setViewVisibility(ROWS[shown], View.VISIBLE);
                    shown++;
                }
            }
        } catch (Exception ignored) { }
        for (int k = shown; k < ROWS.length; k++) v.setViewVisibility(ROWS[k], View.GONE);
        if (total == 0) {
            v.setTextViewText(R.id.wEmpty, "✓ Todo listo por hoy");
            v.setViewVisibility(R.id.wEmpty, View.VISIBLE);
        } else if (total > shown) {
            v.setTextViewText(R.id.wEmpty, "+" + (total - shown) + " más…");
            v.setViewVisibility(R.id.wEmpty, View.VISIBLE);
        } else {
            v.setViewVisibility(R.id.wEmpty, View.GONE);
        }
        v.setTextViewText(R.id.wCount, counter);
        v.setViewVisibility(R.id.wCount, counter.isEmpty() ? View.GONE : View.VISIBLE);
        v.setOnClickPendingIntent(R.id.wRoot, open(ctx, "dia", 1));
        v.setOnClickPendingIntent(R.id.wAdd, open(ctx, "nueva", 2));
        return v;
    }
}
