package com.example.administrator.webviewtest;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.Buffer;
import java.util.List;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{
    TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button sendRequest = (Button)findViewById(R.id.send_request);
        textView = (TextView)findViewById(R.id.request_text);
        sendRequest.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        if(v.getId() == R.id.send_request){
            sendRequestWithOkHttp();
            /*HttpURLConnection方法封装
            HttpUtil.sendHttpRequest("https://www.baidu.com", new HttpCallBackListener() {
                @Override
                public void onFinish(String response) {

                }

                @Override
                public void onError(Exception e) {

                }
            });
            */
            /*okHttp方法
           HttpUtil.sendOKHttp("https://www.baidu.com",new okhttp3.Callback(){
                       @Override
                       public void onResponse(Call call, Response response) {

                       }

                       @Override
                       public void onFailure(Call call, IOException e) {

                       }
                   }
           );
           */
        }
    }
    private void sendRequestWithOkHttp(){
        new Thread(new Runnable() {
            @Override
            public void run() {
                try{
                    OkHttpClient client = new OkHttpClient();
                    Request request = new Request.Builder()
                            .url("https://gank.io/api/history/content/2/1")
                            .build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    parseJSONWithJSONObject(responseData);
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }).start();
    }
    private void parseJSONWithJSONObject(String jsonData){
        try{
            JSONObject jsonObject = new JSONObject(jsonData);
            JSONArray jsonObject1 = jsonObject.getJSONArray("results");
            Gson gson = new Gson();
            List<App> appList = gson.fromJson(jsonObject1.toString(),new TypeToken<List<App>>(){}.getType());
            for(App app : appList){
                showResponse(app.get_id()+app.getTitle());
            }
        }catch (Exception e){
            e.printStackTrace();
         }
    }
    private void showResponse(final String response){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                textView.setText(response);
            }
        });
    }
}
