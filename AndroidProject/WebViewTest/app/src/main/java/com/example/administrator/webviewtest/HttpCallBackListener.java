package com.example.administrator.webviewtest;

public interface HttpCallBackListener {
    void onFinish(String response);
    void onError(Exception e);
}
