/**
 * 子线程
 * 实现查找因子的代码
 */

import java.util.ArrayList;
import java.util.concurrent.ExecutorService;


public class SmallThread {
    private int n,result,num;

    public SmallThread(int n, int result, int num){
       this.n = n;
       this.num = num;
       this.result = result+n;
    }
    public void build(ArrayList<Factor> factorList,ExecutorService executorService){
            if(result < num){
                try{
                    //Runnable线程创建方式
                    Runnable runnable = new Runnable() {
                        @Override
                        public void run() {
                            for(int i = n; i <= result ;i++){
                                Factor factor = new Factor();
                                if(num%i == 0){
                                    factor.setmFactor(i);
                                    factorList.add(factor);
                                    System.out.println("i="+i);
                                }
                            }
                        }
                    };
                    //将线程提交给线程池
                   executorService.execute(runnable);
                }catch (Exception e) {
                    e.printStackTrace();
                }
          }
    }
}
