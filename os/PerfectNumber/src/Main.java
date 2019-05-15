/**
 * 主线程，运用ArrayList、线程池等概念
 * 完全数，数的因子之和是等于他本身！
 */

import java.util.ArrayList;
import java.util.Scanner;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    private ArrayList<Factor> factorList;
    private ExecutorService cacheThread;
    public static void main(String []args) {
        Scanner in = new Scanner(System.in);
        int sum = 0;
        System.out.println("输入你验证的数：");
        int Num = in.nextInt();
        System.out.println("输入你需要开启线程的数量：");
        int P = in.nextInt();
        Main mMain = new Main();
        mMain.build(Num,P);
        mMain.print(sum,Num);

    }
    private void print(int sum,int num){
        int flag = 1;
        while(flag == 1){
            //判断线程是否全部关闭
            if(cacheThread.isTerminated()){
                for(int i = 0 ;i < factorList.size() ;i++){
                    sum = sum+factorList.get(i).getmFactor();
                }
                flag=2;
            }
        }
        if(num == sum){
            System.out.println("是完全数");
        }else{
            System.out.println("不是完全数");
        }

    }
    private void build(int num,int p) {
        cacheThread = Executors.newScheduledThreadPool(p);
        factorList = new ArrayList<>();
        int remainder = num % p;
        int result = num / p;
        int n = 1;
        //判断是否有余数
        if (remainder == 0) {
            for (int i = 1; i < num; i = i + result) {
                SmallThread smallThread = new SmallThread(i, result - 1, num);
                smallThread.build(factorList,cacheThread);
                System.out.println("n:"+ n++);
            }
        } else {
            for (int i = 1; i < num; i = i + result + 1) {
                SmallThread smallThread = new SmallThread(i, result, num);
                smallThread.build(factorList,cacheThread);
                System.out.println("n:"+ n++);
            }
        }
        //依次关闭线程中的代码
        cacheThread.shutdown();
    }
}
