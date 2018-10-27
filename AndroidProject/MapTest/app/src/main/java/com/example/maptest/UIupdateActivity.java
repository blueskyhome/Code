package com.example.maptest;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class UIupdateActivity extends AppCompatActivity{

    private static final String TAG = "UpdateUIActivity-vv";

    private TextView mTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_uidpdate);
        mTextView = findViewById(R.id.tv_showChange);
        Button mBtnChange = findViewById(R.id.btn_changeText);

        Thread.currentThread().setName("UIThread");
        Log.d(TAG, "onCreate: " + Thread.currentThread().getName());

        this.changeText(mBtnChange);
    }

    public class MyThread extends Thread{
        private String mText;

        MyThread(String text) {
            this.mText = text;
        }

        @Override
        public void run() {
            super.run();
            Thread.currentThread().setName("MyThread");
            mTextView.setText(mText);
            Log.d(TAG, Thread.currentThread().getName());
        }
    }

    public void changeText(View view) {
        view.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                new MyThread("123").start();
            }
        });
    }
}

