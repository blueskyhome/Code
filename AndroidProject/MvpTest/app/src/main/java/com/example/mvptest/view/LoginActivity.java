package com.example.mvptest.view;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.example.mvptest.R;
import com.example.mvptest.bean.User;
import com.example.mvptest.presenter.UserLoginPresenter;

public class LoginActivity extends AppCompatActivity implements IUserLoginView {
    private EditText mEditUsername,mEditPassword;
    private Button mButtonLogin,mBtnClear;
    private ProgressBar mProgressLoading;

    private UserLoginPresenter mUserLoginPresenter = new UserLoginPresenter(this);
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        initViews();
    }
    private void initViews(){
        mEditUsername = (EditText)findViewById(R.id.login_edit_username);
        mEditPassword = (EditText)findViewById(R.id.login_edit_password);

        mBtnClear = (Button)findViewById(R.id.login_button_clear);
        mButtonLogin = (Button)findViewById(R.id.login_button_login);

        mProgressLoading = (ProgressBar)findViewById(R.id.progress_login);
        mButtonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mUserLoginPresenter.login();
            }
        });
        mBtnClear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mUserLoginPresenter.clear();
            }
        });
    }

    @Override
    public String getUserName() {
        return mEditUsername.getText().toString();
    }

    @Override
    public String getPassword() {
        return mEditPassword.getText().toString();
    }

    @Override
    public void clearUserName() {
        mEditUsername.setText(" ");
    }

    @Override
    public void clearPassword() {
        mEditPassword.setText(" ");
    }

    @Override
    public void showLoading() {
        mProgressLoading.setVisibility(View.VISIBLE);
    }

    @Override
    public void hideLoading() {
        mProgressLoading.setVisibility(View.GONE);
    }

    @Override
    public void toMainActivity(User user) {
        Toast.makeText(this,user.getUsername()+" login success,to MainActivity",Toast.LENGTH_SHORT).show();
    }

    @Override
    public void showFailedError() {
        Toast.makeText(this,"login failed",Toast.LENGTH_SHORT).show();
    }
}
