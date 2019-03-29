package com.example.maptest;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.location.Location;

import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.mapapi.SDKInitializer;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.BitmapDescriptor;
import com.baidu.mapapi.map.BitmapDescriptorFactory;
import com.baidu.mapapi.map.MapPoi;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdate;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.Marker;
import com.baidu.mapapi.map.MarkerOptions;
import com.baidu.mapapi.map.MyLocationData;
import com.baidu.mapapi.map.Overlay;
import com.baidu.mapapi.map.OverlayOptions;
import com.baidu.mapapi.map.Polyline;
import com.baidu.mapapi.map.PolylineOptions;
import com.baidu.mapapi.model.LatLng;
import com.baidu.mapapi.navi.BaiduMapNavigation;
import com.baidu.mapapi.search.geocode.GeoCodeResult;
import com.baidu.mapapi.search.geocode.GeoCoder;
import com.baidu.mapapi.search.geocode.OnGetGeoCoderResultListener;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeOption;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeResult;
import com.baidu.trace.LBSTraceClient;
import com.baidu.trace.Trace;
import com.baidu.trace.model.OnTraceListener;
import com.baidu.trace.model.PushMessage;

import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.List;

import static com.baidu.mapapi.map.BitmapDescriptorFactory.fromAsset;

public class MainActivity extends AppCompatActivity {

    public LocationClient mLocationClient;
    private TextView positionText;
    private MapView mapView;
    private BaiduMap baiduMap;
    private boolean isFirstLocate = true;
    private String address = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mLocationClient = new LocationClient(getApplicationContext());
        mLocationClient.registerLocationListener(new MyLocationListener());
        SDKInitializer.initialize(getApplicationContext());
        setContentView(R.layout.activity_main);
        mapView = (MapView) findViewById(R.id.bmapview);
        //2
        baiduMap = mapView.getMap();
        //3
        baiduMap.setMyLocationEnabled(true);
        positionText = (TextView) findViewById(R.id.position_text_view);
        List<String> permissionList = new ArrayList<>();
        if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) !=
                PackageManager.PERMISSION_GRANTED) {
            permissionList.add(Manifest.permission.ACCESS_FINE_LOCATION);
        }
        if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.READ_PHONE_STATE) !=
                PackageManager.PERMISSION_GRANTED) {
            permissionList.add(Manifest.permission.READ_PHONE_STATE);
        }
        if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE) !=
                PackageManager.PERMISSION_GRANTED) {
            permissionList.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
        }
        if (!permissionList.isEmpty()) {
            String[] permissions = permissionList.toArray(new String[permissionList.size()]);
            ActivityCompat.requestPermissions(MainActivity.this, permissions, 1);
        } else {
            requestLocation();
        }

    }

    private void initLocation() {
        LocationClientOption option = new LocationClientOption();
        BaiduMap.OnPolylineClickListener listener =  new BaiduMap.OnPolylineClickListener(){
            @Override
            public boolean onPolylineClick(Polyline polyline) {
                Toast.makeText(MainActivity.this, "Click on polyline", Toast.LENGTH_LONG).show();
                return true;
            }
        };
        option.setScanSpan(5000);
        option.setLocationMode(LocationClientOption.LocationMode.Device_Sensors);
        option.setIsNeedAddress(true);
        mLocationClient.setLocOption(option);
        baiduMap.setOnMarkerClickListener(new BaiduMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(Marker marker) {
                LatLng latLng = marker.getPosition();
                Toast.makeText(MainActivity.this, "纬度：" + latLng.latitude + ",\n经度" + latLng.longitude, Toast.LENGTH_SHORT).show();
                return true;
            }
        });
       baiduMap.setOnPolylineClickListener(listener);
    }

    private void requestLocation() {
        initLocation();
        mLocationClient.start();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mapView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mapView.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mLocationClient.stop();
        mapView.onDestroy();
        baiduMap.setMyLocationEnabled(false);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case 1:
                if (grantResults.length > 0) {
                    for (int result : grantResults) {
                        if (result != PackageManager.PERMISSION_GRANTED) {
                            Toast.makeText(this, "必须同意所有权限才能使用", Toast.LENGTH_SHORT).show();
                            finish();
                            return;
                        }
                    }
                    requestLocation();
                } else {
                    Toast.makeText(this, "发生不知名错误", Toast.LENGTH_SHORT).show();
                    finish();
                }
                break;
            default:
        }
    }

    private void navigateTo(BDLocation location) {
        if (isFirstLocate) {
            LatLng ll = new LatLng(location.getLatitude(), location.getLongitude());
            MapStatusUpdate update = MapStatusUpdateFactory.newLatLng(ll);
            baiduMap.animateMapStatus(update);
            update = MapStatusUpdateFactory.zoomTo(16f);
            baiduMap.animateMapStatus(update);
            isFirstLocate = false;
        }
        MyLocationData.Builder locationBuilder = new MyLocationData.Builder();
        locationBuilder.latitude(location.getLatitude());
        locationBuilder.longitude(location.getLongitude());
        MyLocationData locationData = locationBuilder.build();
        baiduMap.setMyLocationData(locationData);
    }

    private void draw(BDLocation bdLocation) {
        List<LatLng> latLngs = new ArrayList<>();
        List<LatLng> latLngs1 = new ArrayList<>();
        final LatLng p1 = new LatLng(bdLocation.getLatitude(), bdLocation.getLongitude());
        LatLng p2 = new LatLng(bdLocation.getLatitude() + 0.001, bdLocation.getLongitude() + 0.001);
        LatLng p3 = new LatLng(bdLocation.getLatitude() + 0.01, bdLocation.getLongitude());
        LatLng p4 = new LatLng(bdLocation.getLatitude(), bdLocation.getLongitude() + 0.01);
        BitmapDescriptor bitmap = BitmapDescriptorFactory.fromResource(R.drawable.dot);
        OverlayOptions options = new MarkerOptions()
                .position(p1)
                .icon(bitmap)
                .draggable(true)
                .flat(true)
                .alpha(0.5f);
        baiduMap.addOverlay(options);
        latLngs.add(p1);
        latLngs.add(p4);
        latLngs1.add(p2);
        latLngs1.add(p3);
        drawMyRoute(latLngs1);
        drawMyRoute(latLngs);
        baiduMap.setOnMapClickListener(new BaiduMap.OnMapClickListener() {
            @Override
            public void onMapClick(LatLng latLng) {
                List<LatLng> lat = new ArrayList<>();
                baiduMap.clear();
                double latitude = latLng.latitude;
                double longitude = latLng.longitude;
                LatLng point = new LatLng(latitude, longitude);
                BitmapDescriptor bitmap = BitmapDescriptorFactory.fromResource(R.drawable.dot);
                MarkerOptions options = new MarkerOptions()
                        .position(point)
                        .icon(bitmap);
                baiduMap.addOverlay(options);
                LatLng p = new LatLng(latitude, longitude);
                lat.add(p1);
                lat.add(p);
                drawMyRoute(lat);
                GeoCoder geoCoder = GeoCoder.newInstance();
                //设置反地理编码位置坐标
                ReverseGeoCodeOption op = new ReverseGeoCodeOption();
                op.location(latLng);
                //发起反地理编码请求(经纬度->地址信息)
                geoCoder.reverseGeoCode(op);
                geoCoder.setOnGetGeoCodeResultListener(new OnGetGeoCoderResultListener() {

                    @Override
                    public void onGetReverseGeoCodeResult(ReverseGeoCodeResult arg0) {
                        //获取点击的坐标地址
                        address = arg0.getAddress();
                        System.out.println("address=" + address);
                    }

                    @Override
                    public void onGetGeoCodeResult(GeoCodeResult arg0) {
                    }
                });
            }

            @Override
            public boolean onMapPoiClick(MapPoi mapPoi) {
                return false;
            }
        });
        baiduMap.setOnMarkerDragListener(new BaiduMap.OnMarkerDragListener() {
            @Override
            public void onMarkerDrag(Marker marker) {

            }

            @Override
            public void onMarkerDragEnd(Marker marker) {

            }

            @Override
            public void onMarkerDragStart(Marker marker) {

            }
        });
    }

    protected void drawLine() {
        //构建折线点坐标
        List<LatLng> points = new ArrayList<>();
        points.add(new LatLng(39.965, 116.404));
        points.add(new LatLng(39.925, 116.454));
        points.add(new LatLng(39.955, 116.494));
        points.add(new LatLng(39.905, 116.554));
        points.add(new LatLng(39.965, 116.604));

        List<Integer> colors = new ArrayList<>();
        colors.add(Color.BLUE);
        colors.add(Color.RED);
        colors.add(Color.YELLOW);
        colors.add(Color.GREEN);

       //设置折线的属性
        OverlayOptions mOverlayOptions = new PolylineOptions()
                .width(10)
                .color(0xAAFF0000)
                .points(points)
                .colorsValues(colors);//设置每段折线的颜色

       //在地图上绘制折线
       //mPloyline 折线对象
        Overlay mPolyline = baiduMap.addOverlay(mOverlayOptions);
    }
    protected void drawMyRoute(List<LatLng> points2) {
        //添加纹理图片
        List<BitmapDescriptor> textureList = new ArrayList<>();
        BitmapDescriptor mRedTexture = BitmapDescriptorFactory
                .fromResource(R.drawable.line);//箭头图片
        textureList.add(mRedTexture);
        // 添加纹理图片对应的顺序
        List<Integer> textureIndexs = new ArrayList<Integer>();
        for (int i = 0; i < points2.size(); i++) {
            textureIndexs.add(0);
        }
        OverlayOptions options = new PolylineOptions()
//                .textureIndex(textureIndexs)//设置分段纹理index数组
//                .customTextureList(textureList)//设置线段的纹理，建议纹理资源长宽均为2的n次方
                .dottedLine(true)//true为虚线
                .color(0xAAFF0000)//线条颜色
                .width(10)//线条宽度
                .points(points2);//LatLng集合
        Overlay overlay = baiduMap.addOverlay(options);
    }

    public class MyLocationListener implements BDLocationListener {
        @Override
        public void onReceiveLocation(BDLocation bdLocation) {
            StringBuilder currentPosition = new StringBuilder();
            currentPosition.append("维度：").append(bdLocation.getLatitude()).append("\n");
            currentPosition.append("经线：").append(bdLocation.getLongitude()).append("\n");
            currentPosition.append("国家：").append(bdLocation.getCountry()).append("\n");
            currentPosition.append("省：：").append(bdLocation.getProvince()).append("\n");
            currentPosition.append("市：").append(bdLocation.getCity()).append("\n");
            currentPosition.append("街道：").append(bdLocation.getStreet()).append("\n");
            currentPosition.append("定位方式:");
            if (bdLocation.getLocType() == BDLocation.TypeGpsLocation) {
                currentPosition.append("GPS");
            } else if (bdLocation.getLocType() == BDLocation.TypeNetWorkLocation) {
                currentPosition.append("网络");
            }
            positionText.setText(currentPosition);
            draw(bdLocation);
            if (bdLocation.getLocType() == BDLocation.TypeGpsLocation || bdLocation.getLocType() == BDLocation.TypeNetWorkLocation) {
                navigateTo(bdLocation);
            }
        }
    }
//    private void initTrace(){
//        long serviceId = 210755;
//        String entityName = "myTrace";
//        boolean isNeedObjectStorage = false;
//        Trace mTrace = new Trace(serviceId,entityName,isNeedObjectStorage);
//        LBSTraceClient mTraceClient = new LBSTraceClient(getApplicationContext());
//        int gatherInterval = 5;
//        int packInterval = 10;
//        mTraceClient.setInterval(gatherInterval,packInterval);
//        OnTraceListener traceListener = new OnTraceListener() {
//            @Override
//            public void onBindServiceCallback(int i, String s) {
//
//            }
//
//            @Override
//            public void onStartTraceCallback(int i, String s) {
//
//            }
//
//            @Override
//            public void onStopTraceCallback(int i, String s) {
//
//            }
//
//            @Override
//            public void onStartGatherCallback(int i, String s) {
//
//            }
//
//            @Override
//            public void onStopGatherCallback(int i, String s) {
//
//            }
//
//            @Override
//            public void onPushCallback(byte b, PushMessage pushMessage) {
//
//            }
//
//            @Override
//            public void onInitBOSCallback(int i, String s) {
//
//            }
//        };
//        mTraceClient.startTrace(mTrace,traceListener);
//        mTraceClient.startGather(traceListener);
//
//    }
}
