package com.example.viewpagertest;


        import android.os.Bundle;
        import android.support.annotation.NonNull;
        import android.support.annotation.Nullable;
        import android.support.v4.app.Fragment;
        import android.support.v4.app.FragmentActivity;
        import android.support.v4.view.PagerAdapter;
        import android.support.v4.view.ViewPager;
        import android.support.v4.view.ViewPager.OnPageChangeListener;
        import android.util.Log;

        import java.lang.reflect.Array;
        import java.lang.reflect.Field;
        import java.util.ArrayList;
        import java.util.List;
        import java.util.zip.Inflater;

        import android.app.Activity;
        import android.graphics.Color;
        import android.view.LayoutInflater;
        import android.view.Menu;
        import android.view.View;
        import android.view.View.OnClickListener;
        import android.view.ViewGroup;
        import android.widget.Button;
        import android.widget.CompoundButton;
        import android.widget.ImageView;
        import android.widget.LinearLayout;
        import android.widget.RadioButton;
        import android.widget.Toast;
        import android.widget.CompoundButton.OnCheckedChangeListener;

        import com.bigkoo.convenientbanner.ConvenientBanner;
        import com.bigkoo.convenientbanner.holder.CBViewHolderCreator;

public class MainActivity extends FragmentActivity{

    private ViewPager myviewpager;
    //fragment的集合，对应每个子页面
    private ArrayList<Fragment> fragments;
    private ConvenientBanner convenientBanner;
    private List<Integer> imagelist = new ArrayList<>();
    private Integer[] imageInteger = new Integer[]{R.drawable.christmas,R.drawable.page,R.drawable.look};
    //选项卡中的按钮

    //作为指示标签的按钮
    private ImageView cursor;
    //标志指示标签的横坐标
    float cursorX = 0;
    //所有按钮的宽度的集合
    private int[] widthArgs;
    //所有按钮的集合
    private Button[] btnArgs;

    private String[] title = {"标题一","标题二","标题三"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        myviewpager = (ViewPager)findViewById(R.id.myviewpager);
        LayoutInflater inflater = getLayoutInflater();
        View view1 = inflater.inflate(R.layout.layout1,null);
        View view2 = inflater.inflate(R.layout.layout2,null);
        View view3 = inflater.inflate(R.layout.layout3,null);
        final List<View> list = new ArrayList<View>();
        list.add(view1);
        list.add(view2);
        list.add(view3);

        PagerAdapter pagerAdapter = new PagerAdapter() {
            @Override
            public int getCount() {
                return list.size();
            }

            @Override
            public boolean isViewFromObject(@NonNull View view, @NonNull Object o) {
                return view==o;
            }

            @Override
            public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
                container.removeView(list.get(position));
            }

            @NonNull
            @Override
            public Object instantiateItem(@NonNull ViewGroup container, int position) {
                container.addView(list.get(position));
                return list.get(position);
            }

            @Nullable
            @Override
            public CharSequence getPageTitle(int position) {
                return title[position];
            }
        };

        myviewpager.setAdapter(pagerAdapter);
        myviewpager.setPageTransformer(false, new AnimateTest());

        myviewpager.addOnPageChangeListener(new ViewPager.OnPageChangeListener(){
            @Override
            public void onPageScrolled(int i, float v, int i1) {
                Log.e("vp","滑动中=====position:"+ i + "   positionOffset:"+ v + "   positionOffsetPixels:"+i1);
            }

            @Override
            public void onPageSelected(int i) {
                Log.e("vp","显示页改变=====position:"+ i);
            }

            @Override
            public void onPageScrollStateChanged(int i) {
                switch (i) {
                case ViewPager.SCROLL_STATE_IDLE:
                    Log.e("vp","状态改变=====SCROLL_STATE_IDLE====静止状态");
                    break;
                case ViewPager.SCROLL_STATE_DRAGGING:
                    Log.e("vp","状态改变=====SCROLL_STATE_DRAGGING==滑动状态");
                    break;
                case ViewPager.SCROLL_STATE_SETTLING:
                    Log.e("vp","状态改变=====SCROLL_STATE_SETTLING==滑翔状态");
                    break;
             }
            }
        });
        for(int i = 0 ; i < 3 ;i++){
            imagelist.add(imageInteger[i]);
        }
        convenientBanner = (ConvenientBanner)findViewById(R.id.convenientBanner);
        convenientBanner.setPages(
                new CBViewHolderCreator<LocalImageHolderView>() {
                    @Override
                    public LocalImageHolderView createHolder() {
                        return new LocalImageHolderView();
                    }
                },imagelist);
                // 设置两个点图片作为翻页指示器，不设置则没有指示器，可以根据自己需求自行配合自己的指示器,不需要圆点指示器可用不设
                //.setPageIndicator(new int[]{R.drawable.christmas, R.drawable.finger})
                // 设置指示器的方向
                // .setPageIndicatorAlign(ConvenientBanner.PageIndicatorAlign.ALIGN_PARENT_RIGHT)
                //.setOnPageChangeListener(this)//监听翻页事件

    }


}

