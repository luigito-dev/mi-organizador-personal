package com.luigito.miorganizador;

import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(OrganizadorPlugin.class);
        OrganizadorPlugin.pendingAction = actionOf(getIntent());
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        String action = actionOf(intent);
        if (action != null && getBridge() != null) {
            getBridge().triggerWindowJSEvent("widgetAction", "{\"action\":\"" + action + "\"}");
        }
    }

    private static String actionOf(Intent intent) {
        if (intent == null) return null;
        String a = intent.getStringExtra("widgetAction");
        if (a == null) return null;
        // solo valores conocidos
        if (a.equals("nueva") || a.equals("dia") || a.equals("listas")) return a;
        return null;
    }
}
