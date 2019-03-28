package com.example.mvptest.biz;

import com.example.mvptest.bean.User;

public interface OnLoginListener {
    void loginSuccess(User user);
    void loginFailed();
}
