import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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
                   executorService.execute(runnable);
                }catch (Exception e) {
                    e.printStackTrace();
                }
          }
    }
}
