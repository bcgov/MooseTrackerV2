package com.example.app;

import com.getcapacitor.BridgeActivity;
import com.example.capacitorzoomandroid.ZoomPlugin;
import com.getcapacitor.Plugin;
import android.os.Bundle;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
    super.onCreate(savedInstanceState);
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            add(ZoomPlugin.class);
        }});
    }
}
