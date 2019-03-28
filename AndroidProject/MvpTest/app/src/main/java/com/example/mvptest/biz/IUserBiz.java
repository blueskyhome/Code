package com.example.mvptest.biz;

public interface IUserBiz {
     void login(String username,String password,OnLoginListener loginListener);
}
