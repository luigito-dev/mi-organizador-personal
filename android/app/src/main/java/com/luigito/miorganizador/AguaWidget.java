package com.luigito.miorganizador;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.RemoteViews;
import org.json.JSONObject;

/** Widget "Agua": suma onzas del día desde la pantalla de inicio. */
public class AguaWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    static void refreshAll(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, AguaWidget.class));
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    private static PendingIntent act(Context ctx, int oz, int code) {
        Intent i = new Intent(ctx, AguaWidget.class);
        i.setAction(OrgWidgets.ACT_AGUA);
        i.putExtra("oz", oz);
        return PendingIntent.getBroadcast(ctx, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static RemoteViews build(Context ctx) {
        RemoteViews v = new RemoteViews(ctx.getPackageName(), R.layout.widget_agua);
        JSONObject w = OrgWidgets.data(ctx).optJSONObject("water");
        if (w == null) {
            v.setViewVisibility(R.id.wAguaMsg, View.VISIBLE);
            v.setTextViewText(R.id.wAguaMsg, "Crea un hábito de agua en la app");
            v.setTextViewText(R.id.wAguaN, "");
            v.setTextViewText(R.id.wAguaG, "");
            v.setViewVisibility(R.id.wAgua1, View.GONE);
            v.setViewVisibility(R.id.wAgua8, View.GONE);
            v.setViewVisibility(R.id.wAguaBar, View.GONE);
            return v;
        }
        int n = w.optInt("n", 0), g = Math.max(1, w.optInt("g", 64));
        v.setViewVisibility(R.id.wAguaMsg, View.GONE);
        v.setViewVisibility(R.id.wAgua1, View.VISIBLE);
        v.setViewVisibility(R.id.wAgua8, View.VISIBLE);
        v.setViewVisibility(R.id.wAguaBar, View.VISIBLE);
        v.setTextViewText(R.id.wAguaN, n + " oz");
        v.setTextViewText(R.id.wAguaG, "de " + g + " oz hoy");
        v.setProgressBar(R.id.wAguaBar, g, Math.min(n, g), false);
        v.setOnClickPendingIntent(R.id.wAgua1, act(ctx, 1, 11));
        v.setOnClickPendingIntent(R.id.wAgua8, act(ctx, 8, 18));
        return v;
    }

    @Override
    public void onReceive(Context ctx, Intent intent) {
        super.onReceive(ctx, intent);
        if (!OrgWidgets.ACT_AGUA.equals(intent.getAction())) return;
        int oz = intent.getIntExtra("oz", 1);
        try {
            JSONObject data = OrgWidgets.data(ctx);
            JSONObject w = data.optJSONObject("water");
            JSONObject q = new JSONObject();
            q.put("k", "agua");
            q.put("d", OrgWidgets.today());
            q.put("oz", oz);
            if (w != null) {
                q.put("id", w.optString("id"));
                w.put("n", w.optInt("n", 0) + oz);
                data.put("water", w);
                OrgWidgets.saveData(ctx, data);
            }
            OrgWidgets.enqueue(ctx, q);
        } catch (Exception ignored) { }
        refreshAll(ctx);
    }
}
