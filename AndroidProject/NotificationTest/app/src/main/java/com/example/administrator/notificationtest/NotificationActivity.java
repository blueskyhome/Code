package com.example.administrator.notificationtest;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import java.io.File;

public class NotificationActivity extends AppCompatActivity implements View.OnClickListener{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notifaction);
        Button sendNotice = (Button)findViewById(R.id.send_notice);
        sendNotice.setOnClickListener(this);
        Button sendTwo = (Button)findViewById(R.id.send_Two);
        sendTwo.setOnClickListener(this);
        Button sendThree = (Button)findViewById(R.id.send_three);
        sendThree.setOnClickListener(this);
    }
    private String CHANNEL_ID;
    @Override
    public void onClick(View v) {
        NotificationManager notificationManager = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            CHANNEL_ID = "my_channel_01";
            CharSequence name = "my_channel";
            String Description = "This is my channel";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            // 参数1：频道的ID。 参数2：用户可见的频道名称。 参数3：通知能打断用户的级别。
            NotificationChannel mChannel = new NotificationChannel(CHANNEL_ID, name, importance);
            // 该Channel的描述
            mChannel.setDescription(Description);
            // 设置发布到此频道的通知是否应在支持该功能的设备上显示通知灯。
            mChannel.enableLights(true);
            // 通知LED灯的颜色
            mChannel.setLightColor(Color.RED);
            // 设置发布到此频道的通知是否应该振动。
            mChannel.enableVibration(true);
            //返回发布到此通道的通知的振动模式。
            mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
            mChannel.setShowBadge(false);
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(mChannel);
            }
        }
        switch (v.getId()){
            case R.id.send_notice:
                Intent intent = new Intent(NotificationActivity.this,MainActivity.class);
                PendingIntent pi = PendingIntent.getActivities(this,0,new Intent[]{intent},0);
                Notification builder = new NotificationCompat.Builder(NotificationActivity.this,CHANNEL_ID)
                        .setContentTitle("This is title")
                        .setContentText("This is Text")
                        .setWhen(System.currentTimeMillis())
                        .setSmallIcon(R.drawable.notication)
                        .setLargeIcon(BitmapFactory.decodeResource(getResources(),R.drawable.notication))
                        .setContentIntent(pi)
                        .setAutoCancel(true)
                        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                        .setLights(Color.RED,1000,1000)
                        .setStyle(new NotificationCompat.BigPictureStyle().bigPicture(BitmapFactory.decodeResource(getResources(),R.drawable.big)))
                        .build();
                notificationManager.notify(1,builder);
                break;
            case R.id.send_Two:
                Notification notification = new NotificationCompat.Builder(NotificationActivity.this,CHANNEL_ID)
                        .setWhen(System.currentTimeMillis())
                        .setContentTitle("This is titleTwo")
                        .setContentText("This is Text")
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setPriority(NotificationCompat.PRIORITY_LOW)
                        .setStyle(new NotificationCompat.BigTextStyle().bigText("The result should be a concise but informative representation that is easy for a person to read. It is recommended that all subclasses override this method."))
                        .setLargeIcon(BitmapFactory.decodeResource(getResources(),R.mipmap.ic_launcher))
                        .setSound(Uri.fromFile(new File("/system/media/audio/ringtones/Luna.ogg")))
                        .build();
                notificationManager.notify(2,notification);
                break;
            case R.id.send_three:
                notificationManager.cancel(2);
                break;
            default:
                break;
        }
    }
}
