package com.example.mvptest.presenter;

import com.example.mvptest.bean.User;
import com.example.mvptest.biz.IUserBiz;
import com.example.mvptest.biz.OnLoginListener;
import com.example.mvptest.biz.UserBiz;
import com.example.mvptest.view.IUserLoginView;

import android.os.Handler;


public class UserLoginPresenter {
    private IUserBiz userBiz;
    private IUserLoginView userLoginView;
    private Handler mHandler = new Handler();
    public UserLoginPresenter(IUserLoginView userLoginView){
        this.userLoginView = userLoginView;
        this.userBiz = new UserBiz();
    }
    public void login(){
        userLoginView.showLoading();
        userBiz.login(userLoginView.getUserName(), userLoginView.getPassword(), new OnLoginListener() {
            @Override
            public void loginSuccess(final User user) {
                mHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        userLoginView.toMainActivity(user);
                        userLoginView.hideLoading();
                    }
                });
            }

            @Override
            public void loginFailed() {
                mHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        userLoginView.showFailedError();
                        userLoginView.hideLoading();
                    }
                });
            }
        });
    }
    public void clear(){
        userLoginView.clearUserName();
        userLoginView.clearPassword();
    }
}
