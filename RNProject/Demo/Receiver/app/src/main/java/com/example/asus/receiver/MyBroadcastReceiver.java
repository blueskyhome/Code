package com.example.asus.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

/**
 * Created by asus on 2018/9/20.
 */

public class MyBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context,"receive is mybroadcastReceiver",Toast.LENGTH_SHORT).show();
        abortBroadcast();
    }
}
