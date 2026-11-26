package com.luigito.miorganizador;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.view.View;
import android.widget.RemoteViews;
import org.json.JSONArray;
import org.json.JSONObject;

/** Widget "Hábitos de hoy": marca tus hábitos sin abrir la app. */
public class HabitosWidget extends AppWidgetProvider {
    private static final int[] ROWS = {R.id.wR0, R.id.wR1, R.id.wR2, R.id.wR3, R.id.wR4};
    private static final int[] NAMES = {R.id.wN0, R.id.wN1, R.id.wN2, R.id.wN3, R.id.wN4};
    private static final int[] CHECKS = {R.id.wC0, R.id.wC1, R.id.wC2, R.id.wC3, R.id.wC4};

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    static void refreshAll(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, HabitosWidget.class));
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    private static PendingIntent act(Context ctx, String habId, int code) {
        Intent i = new Intent(ctx, HabitosWidget.class);
        i.setAction(OrgWidgets.ACT_HAB);
        i.setData(Uri.parse("miorg://h/" + habId));
        return PendingIntent.getBroadcast(ctx, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static RemoteViews build(Context ctx) {
        RemoteViews v = new RemoteViews(ctx.getPackageName(), R.layout.widget_habitos);
        JSONArray habs = OrgWidgets.data(ctx).optJSONArray("habs");
        int n = habs == null ? 0 : Math.min(5, habs.length());
        v.setViewVisibility(R.id.wHabMsg, n == 0 ? View.VISIBLE : View.GONE);
        if (n == 0) v.setTextViewText(R.id.wHabMsg, "No tienes hábitos para hoy");
        for (int i = 0; i < ROWS.length; i++) {
            if (i >= n) { v.setViewVisibility(ROWS[i], View.GONE); continue; }
            JSONObject h = habs.optJSONObject(i);
            boolean done = h.optInt("d", 0) == 1;
            v.setViewVisibility(ROWS[i], View.VISIBLE);
            v.setTextViewText(NAMES[i], (h.optString("i", "") + " " + h.optString("n", "")).trim());
            v.setTextViewText(CHECKS[i], done ? "●" : "○");
            v.setTextColor(CHECKS[i], done ? Color.parseColor("#2E9D5B") : Color.parseColor("#6B7487"));
            v.setOnClickPendingIntent(ROWS[i], act(ctx, h.optString("id", ""), 40 + i));
        }
        return v;
    }

    @Override
    public void onReceive(Context ctx, Intent intent) {
        super.onReceive(ctx, intent);
        if (!OrgWidgets.ACT_HAB.equals(intent.getAction()) || intent.getData() == null) return;
        String id = intent.getData().getLastPathSegment();
        try {
            JSONObject data = OrgWidgets.data(ctx);
            JSONArray habs = data.optJSONArray("habs");
            if (habs != null) {
                for (int i = 0; i < habs.length(); i++) {
                    JSONObject h = habs.optJSONObject(i);
                    if (h != null && id != null && id.equals(h.optString("id"))) {
                        h.put("d", h.optInt("d", 0) == 1 ? 0 : 1);
                    }
                }
                OrgWidgets.saveData(ctx, data);
            }
            JSONObject q = new JSONObject();
            q.put("k", "hab");
            q.put("d", OrgWidgets.today());
            q.put("id", id == null ? "" : id);
            OrgWidgets.enqueue(ctx, q);
        } catch (Exception ignored) { }
        refreshAll(ctx);
    }
}
