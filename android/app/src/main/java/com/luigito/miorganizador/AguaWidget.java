package com.luigito.miorganizador;

import android.app.PendingIntent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.graphics.Shader;
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

    /** Botella igual a la de la app: se llena de abajo arriba según las onzas de la botella actual. */
    static Bitmap bottle(int cur, int oz) {
        int w = 200, h = 300;
        Bitmap bmp = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        Canvas c = new Canvas(bmp);
        Path body = new Path();
        body.addRoundRect(new RectF(40, 92, 160, 292), 30, 30, Path.Direction.CW);
        Paint line = new Paint(Paint.ANTI_ALIAS_FLAG);
        line.setStyle(Paint.Style.STROKE);
        line.setStrokeWidth(6);
        line.setColor(Color.parseColor("#1F5FBF"));
        Paint solid = new Paint(Paint.ANTI_ALIAS_FLAG);
        solid.setColor(Color.parseColor("#1F5FBF"));
        c.drawRoundRect(new RectF(78, 30, 122, 66), 8, 8, solid);
        c.drawRect(new RectF(78, 60, 122, 100), solid);
        float frac = Math.max(0f, Math.min(1f, cur / (float) oz));
        float top = 292 - frac * 200;
        c.save();
        c.clipPath(body);
        Path wave = new Path();
        wave.moveTo(40, top);
        for (int x = 40; x < 160; x += 20) wave.quadTo(x + 10, top + ((x / 20) % 2 == 0 ? -7 : 7), x + 20, top);
        wave.lineTo(160, 292);
        wave.lineTo(40, 292);
        wave.close();
        Paint water = new Paint(Paint.ANTI_ALIAS_FLAG);
        water.setShader(new LinearGradient(0, top, 0, 292, Color.parseColor("#5FA8FF"), Color.parseColor("#1F5FBF"), Shader.TileMode.CLAMP));
        c.drawPath(wave, water);
        c.restore();
        c.drawPath(body, line);
        Paint txt = new Paint(Paint.ANTI_ALIAS_FLAG);
        txt.setTextSize(34f);
        txt.setTextAlign(Paint.Align.CENTER);
        txt.setFakeBoldText(true);
        txt.setColor(frac > 0.45f ? Color.WHITE : Color.parseColor("#1F5FBF"));
        c.drawText(cur + " oz", 100, 200, txt);
        return bmp;
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
            v.setViewVisibility(R.id.wAguaBottle, View.GONE);
            v.setViewVisibility(R.id.wAguaN, View.GONE);
            v.setViewVisibility(R.id.wAguaG, View.GONE);
            v.setViewVisibility(R.id.wAguaBot, View.GONE);
            v.setViewVisibility(R.id.wAguaMinus, View.GONE);
            v.setViewVisibility(R.id.wAguaDrink, View.GONE);
            return v;
        }
        int n = Math.max(0, w.optInt("n", 0)), g = Math.max(1, w.optInt("g", 64)), oz = Math.max(1, w.optInt("oz", 16));
        int nb = n / oz, gb = (int) Math.ceil(g / (double) oz);
        v.setViewVisibility(R.id.wAguaMsg, View.GONE);
        v.setViewVisibility(R.id.wAguaBottle, View.VISIBLE);
        v.setViewVisibility(R.id.wAguaN, View.VISIBLE);
        v.setViewVisibility(R.id.wAguaG, View.VISIBLE);
        v.setViewVisibility(R.id.wAguaBot, View.VISIBLE);
        v.setViewVisibility(R.id.wAguaMinus, View.VISIBLE);
        v.setViewVisibility(R.id.wAguaDrink, View.VISIBLE);
        v.setImageViewBitmap(R.id.wAguaBottle, bottle(n % oz, oz));
        v.setTextViewText(R.id.wAguaN, "Hoy · " + n + " oz");
        v.setTextViewText(R.id.wAguaG, "Meta del día: " + g + " oz");
        v.setTextViewText(R.id.wAguaBot, nb + " de " + gb + " botellas · " + (n >= g ? "¡meta cumplida!" : "faltan " + (g - n) + " oz"));
        v.setOnClickPendingIntent(R.id.wAguaMinus, act(ctx, -1, 11));
        v.setOnClickPendingIntent(R.id.wAguaDrink, act(ctx, 1, 18));
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
                w.put("n", Math.max(0, w.optInt("n", 0) + oz));
                data.put("water", w);
                OrgWidgets.saveData(ctx, data);
            }
            OrgWidgets.enqueue(ctx, q);
        } catch (Exception ignored) { }
        refreshAll(ctx);
    }
}
