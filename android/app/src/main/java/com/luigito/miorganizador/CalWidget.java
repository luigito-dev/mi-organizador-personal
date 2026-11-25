package com.luigito.miorganizador;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.view.View;
import android.widget.RemoteViews;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import org.json.JSONArray;
import org.json.JSONObject;

/** Widget "Calendario": mini mes a la izquierda y pendientes del día elegido a la derecha. Las tareas se marcan desde aquí. */
public class CalWidget extends AppWidgetProvider {
    static final String PREFS = "mi_organizador_calw";
    static final String ACT_TOGGLE = "com.luigito.miorganizador.CAL_TOGGLE";
    static final String ACT_SELECT = "com.luigito.miorganizador.CAL_SELECT";
    static final String ACT_MONTH = "com.luigito.miorganizador.CAL_MONTH";
    static final String ACT_TODAY = "com.luigito.miorganizador.CAL_TODAY";
    static final String QUEUE = "done_queue";
    static final String OVERRIDES = "overrides";
    static final String SEL = "sel";
    static final String VIEW_Y = "viewY", VIEW_M = "viewM";
    private static final int[] CELLS_ROW = {R.id.c0, R.id.c1, R.id.c2, R.id.c3, R.id.c4, R.id.c5, R.id.c6};
    private static final int[] CHECK = {R.id.k0, R.id.k1, R.id.k2, R.id.k3, R.id.k4, R.id.k5};
    private static final int[] TITLE = {R.id.t0, R.id.t1, R.id.t2, R.id.t3, R.id.t4, R.id.t5};
    private static final int[] ROWS_ID = {R.id.r0, R.id.r1, R.id.r2, R.id.r3, R.id.r4, R.id.r5};
    private static final String[] MESES = {"ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"};
    private static final String[] DIAS = {"domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"};

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    @Override
    public void onReceive(Context ctx, Intent intent) {
        super.onReceive(ctx, intent);
        String a = intent.getAction();
        if (a == null) return;
        SharedPreferences p = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        SharedPreferences.Editor e = p.edit();
        if (ACT_SELECT.equals(a)) {
            String d = intent.getStringExtra("date");
            if (d != null) e.putString(SEL, d);
        } else if (ACT_MONTH.equals(a)) {
            Calendar c = Calendar.getInstance();
            c.set(p.getInt(VIEW_Y, c.get(Calendar.YEAR)), p.getInt(VIEW_M, c.get(Calendar.MONTH)), 1);
            c.add(Calendar.MONTH, intent.getIntExtra("delta", 0));
            e.putInt(VIEW_Y, c.get(Calendar.YEAR)).putInt(VIEW_M, c.get(Calendar.MONTH));
        } else if (ACT_TODAY.equals(a)) {
            Calendar c = Calendar.getInstance();
            e.putString(SEL, today()).putInt(VIEW_Y, c.get(Calendar.YEAR)).putInt(VIEW_M, c.get(Calendar.MONTH));
        } else if (ACT_TOGGLE.equals(a)) {
            String id = intent.getStringExtra("id");
            boolean done = intent.getBooleanExtra("done", false);
            if (id != null) {
                try {
                    JSONObject ov = new JSONObject(p.getString(OVERRIDES, "{}"));
                    ov.put(id, done);
                    e.putString(OVERRIDES, ov.toString());
                    JSONArray q = new JSONArray(p.getString(QUEUE, "[]"));
                    JSONObject item = new JSONObject();
                    item.put("id", id); item.put("done", done);
                    q.put(item);
                    e.putString(QUEUE, q.toString());
                } catch (Exception ignored) { }
            }
        }
        e.apply();
        refreshAll(ctx);
    }

    static String today() { return new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(Calendar.getInstance().getTime()); }

    static void refreshAll(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, CalWidget.class));
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    private static PendingIntent broadcast(Context ctx, String action, int code, String key, String val, int ival, boolean isBool, boolean bval) {
        Intent i = new Intent(ctx, CalWidget.class);
        i.setAction(action);
        if (key != null && val != null) i.putExtra(key, val);
        if (key != null && val == null && isBool) i.putExtra(key, bval);
        if (ival != 0 && "delta".equals(key)) i.putExtra("delta", ival);
        if (action.equals(ACT_TOGGLE) && val != null) { i.putExtra("id", val); i.putExtra("done", bval); }
        return PendingIntent.getBroadcast(ctx, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    private static PendingIntent open(Context ctx, String action, int code) {
        Intent i = new Intent(ctx, MainActivity.class);
        i.putExtra("widgetAction", action);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return PendingIntent.getActivity(ctx, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static RemoteViews build(Context ctx) {
        RemoteViews v = new RemoteViews(ctx.getPackageName(), R.layout.widget_cal);
        SharedPreferences p = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        Calendar now = Calendar.getInstance();
        String today = today();
        String sel = p.getString(SEL, today);
        Calendar selCal = Calendar.getInstance();
        try { selCal.setTime(new SimpleDateFormat("yyyy-MM-dd", Locale.US).parse(sel)); } catch (Exception ex) { selCal = now; }
        int y = p.getInt(VIEW_Y, selCal.get(Calendar.YEAR)), m = p.getInt(VIEW_M, selCal.get(Calendar.MONTH));

        // Datos de la app: pendientes por día
        JSONObject pend = new JSONObject();
        try { pend = new JSONObject(ctx.getSharedPreferences(HoyWidget.PREFS, Context.MODE_PRIVATE).getString(HoyWidget.KEY, "{}")).optJSONObject("pend"); } catch (Exception ignored) { }
        if (pend == null) pend = new JSONObject();
        JSONObject ov = new JSONObject();
        try { ov = new JSONObject(p.getString(OVERRIDES, "{}")); } catch (Exception ignored) { }

        // Encabezado del mes
        Calendar first = Calendar.getInstance();
        first.set(y, m, 1);
        v.setTextViewText(R.id.wMonth, MESES[m] + " " + y);
        v.setOnClickPendingIntent(R.id.wMonth, broadcast(ctx, ACT_TODAY, 10, null, null, 0, false, false));
        v.setOnClickPendingIntent(R.id.wPrev, broadcast(ctx, ACT_MONTH, 11, "delta", null, -1, false, false));
        v.setOnClickPendingIntent(R.id.wNext, broadcast(ctx, ACT_MONTH, 12, "delta", null, 1, false, false));

        // Cuadrícula de días
        v.removeAllViews(R.id.wGrid);
        int offset = first.get(Calendar.DAY_OF_WEEK) - 1;
        int days = first.getActualMaximum(Calendar.DAY_OF_MONTH);
        int weeks = (offset + days + 6) / 7;
        int day = 1;
        for (int w = 0; w < weeks; w++) {
            RemoteViews row = new RemoteViews(ctx.getPackageName(), R.layout.widget_cal_row);
            for (int col = 0; col < 7; col++) {
                int idx = w * 7 + col;
                int dn = idx - offset + 1;
                if (idx < offset || dn > days) { row.setTextViewText(CELLS_ROW[col], ""); continue; }
                String ds = String.format(Locale.US, "%04d-%02d-%02d", y, m + 1, dn);
                boolean hasPend = pend.optJSONArray(ds) != null && pend.optJSONArray(ds).length() > 0;
                row.setTextViewText(CELLS_ROW[col], dn + (hasPend ? "·" : ""));
                row.setTextColor(CELLS_ROW[col], ds.equals(sel) ? Color.WHITE : (ds.equals(today) ? 0xFF2F6BFF : 0xFF1E1E1E));
                row.setInt(CELLS_ROW[col], "setBackgroundResource", ds.equals(sel) ? R.drawable.widget_cal_sel : 0);
                row.setOnClickPendingIntent(CELLS_ROW[col], broadcast(ctx, ACT_SELECT, 100 + dn + m * 40 + y % 1000 * 1000, "date", ds, 0, false, false));
            }
            v.addView(R.id.wGrid, row);
        }

        // Pendientes del día elegido
        String[] parts = sel.split("-");
        String sub = "";
        try { Calendar sc = Calendar.getInstance(); sc.set(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]) - 1, Integer.parseInt(parts[2])); sub = DIAS[sc.get(Calendar.DAY_OF_WEEK) - 1] + " " + sc.get(Calendar.DAY_OF_MONTH); } catch (Exception ignored) { }
        v.setTextViewText(R.id.wDay, sel.equals(today) ? "Hoy · " + sub : sub);
        JSONArray items = pend.optJSONArray(sel);
        int shown = 0, total = items != null ? items.length() : 0;
        for (int k = 0; k < CHECK.length; k++) {
            if (items == null || k >= total) { v.setViewVisibility(ROWS_ID[k], View.GONE); continue; }
            try {
                JSONObject it = items.getJSONObject(k);
                String id = it.optString("id", "");
                boolean done = ov.has(id) ? ov.optBoolean(id, false) : it.optBoolean("d", false);
                String time = it.optString("h", "");
                v.setViewVisibility(ROWS_ID[k], View.VISIBLE);
                v.setTextViewText(CHECK[k], done ? "●" : "○");
                v.setTextColor(CHECK[k], done ? 0xFF2F6BFF : 0xFF777777);
                v.setTextViewText(TITLE[k], it.optString("n", "") + (time.isEmpty() ? "" : "  · " + time));
                v.setTextColor(TITLE[k], done ? 0xFF888888 : 0xFF1E1E1E);
                v.setOnClickPendingIntent(CHECK[k], broadcast(ctx, ACT_TOGGLE, 200 + k, "id", id, 0, true, !done));
                shown++;
            } catch (Exception ignored) { v.setViewVisibility(ROWS_ID[k], View.GONE); }
        }
        v.setTextViewText(R.id.wEmpty, total == 0 ? "✓ Sin pendientes" : (total > shown ? "+" + (total - shown) + " más en la app" : ""));
        v.setViewVisibility(R.id.wEmpty, total > shown || total == 0 ? View.VISIBLE : View.GONE);
        v.setOnClickPendingIntent(R.id.wDay, open(ctx, "calendario", 3));
        return v;
    }
}
