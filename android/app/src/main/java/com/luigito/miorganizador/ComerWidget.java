package com.luigito.miorganizador;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.view.View;
import android.widget.RemoteViews;
import org.json.JSONObject;

/** Widget "Comer saludable": porciones de hoy por grupo, con +1 por toque. */
public class ComerWidget extends AppWidgetProvider {
    private static final String[] KEYS = {"v", "f", "g", "p", "l"};
    private static final String[] NAMES = {"Vegetales", "Frutas", "Granos", "Proteína", "Lácteos"};
    private static final int[] ROWS = {R.id.wG0, R.id.wG1, R.id.wG2, R.id.wG3, R.id.wG4};
    private static final int[] COUNTS = {R.id.wGc0, R.id.wGc1, R.id.wGc2, R.id.wGc3, R.id.wGc4};
    private static final int[] LABELS = {R.id.wGn0, R.id.wGn1, R.id.wGn2, R.id.wGn3, R.id.wGn4};

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    static void refreshAll(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, ComerWidget.class));
        for (int id : ids) mgr.updateAppWidget(id, build(ctx));
    }

    private static PendingIntent act(Context ctx, String key, int code) {
        Intent i = new Intent(ctx, ComerWidget.class);
        i.setAction(OrgWidgets.ACT_FOOD);
        i.setData(Uri.parse("miorg://f/" + key));
        return PendingIntent.getBroadcast(ctx, code, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static RemoteViews build(Context ctx) {
        RemoteViews v = new RemoteViews(ctx.getPackageName(), R.layout.widget_comer);
        JSONObject food = OrgWidgets.data(ctx).optJSONObject("food");
        if (food == null) {
            v.setViewVisibility(R.id.wFoodMsg, View.VISIBLE);
            v.setTextViewText(R.id.wFoodMsg, "Crea el hábito Comer saludable en la app");
            v.setTextViewText(R.id.wFoodTot, "");
            v.setViewVisibility(R.id.wFoodBar, View.GONE);
            return v;
        }
        JSONObject c = food.optJSONObject("c");
        if (c == null) c = new JSONObject();
        int g = Math.max(1, food.optInt("g", 5)), total = 0;
        for (String k : KEYS) total += c.optInt(k, 0);
        v.setViewVisibility(R.id.wFoodMsg, View.GONE);
        v.setViewVisibility(R.id.wFoodBar, View.VISIBLE);
        v.setTextViewText(R.id.wFoodTot, total + " de " + g + " porciones hoy");
        v.setProgressBar(R.id.wFoodBar, g, Math.min(total, g), false);
        for (int i = 0; i < KEYS.length; i++) {
            v.setTextViewText(LABELS[i], NAMES[i]);
            v.setTextViewText(COUNTS[i], String.valueOf(c.optInt(KEYS[i], 0)));
            v.setOnClickPendingIntent(ROWS[i], act(ctx, KEYS[i], 60 + i));
        }
        return v;
    }

    @Override
    public void onReceive(Context ctx, Intent intent) {
        super.onReceive(ctx, intent);
        if (!OrgWidgets.ACT_FOOD.equals(intent.getAction()) || intent.getData() == null) return;
        String key = intent.getData().getLastPathSegment();
        try {
            JSONObject data = OrgWidgets.data(ctx);
            JSONObject food = data.optJSONObject("food");
            if (food != null && key != null) {
                JSONObject c = food.optJSONObject("c");
                if (c == null) c = new JSONObject();
                c.put(key, c.optInt(key, 0) + 1);
                food.put("c", c);
                data.put("food", food);
                OrgWidgets.saveData(ctx, data);
                JSONObject q = new JSONObject();
                q.put("k", "food");
                q.put("d", OrgWidgets.today());
                q.put("id", food.optString("id"));
                q.put("sec", key);
                OrgWidgets.enqueue(ctx, q);
            }
        } catch (Exception ignored) { }
        refreshAll(ctx);
    }
}
