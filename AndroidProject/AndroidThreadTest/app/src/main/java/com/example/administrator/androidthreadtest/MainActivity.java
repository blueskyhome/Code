package com.example.administrator.androidthreadtest;

import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private TextView textView;
    public static final  int UPDATE_TEXT = 1;
    private Handler handler = new Handler(){
        public void handleMessage(Message message){
            switch (message.what){
                case UPDATE_TEXT:
                    textView.setText("Nice to meet you");
                    break;
                default:
                    break;
            }
        }
    };
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = (TextView)findViewById(R.id.textview);
        Button changText = (Button)findViewById(R.id.change_text);
        changText.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.change_text:
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                       Message message = new Message();
                       message.what = UPDATE_TEXT;
                       handler.sendMessage(message);
                    }
                }).start();
                break;
            default:
                break;

        }
    }
}
