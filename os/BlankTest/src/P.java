import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class P {

    /*
        p代表进程数，a代表资源数
        allocation已分配资源
        need每个进程需要分配资源
        avaliable系统可用资源
     */
    private int p;
    private int a;
    private int allocation[][];
    private int need[][];
    private int avaliable[];
    private List<String> done;
    public P(int p,int a){
        this.p = p;
        this.a = a;
    }
    public void init(){
        Scanner in = new Scanner(System.in);
        allocation = new int[p][a];
        need = new int[p][a];
        avaliable = new int[a];
        done = new ArrayList<>();
        for(int i = 0 ; i < p ; i++){
            done.add(i+"");
        }
        System.out.println("allocation:");
        char q1 = 'A';//标识变量
        for(int i = 0 ; i < p ; i++){
            System.out.println(q1+"进程：");
            for(int j = 0; j < a ;j++){
                allocation[i][j] = in.nextInt();
            }
            q1++;
        }
        System.out.println("need:");
        char q2= 'A';//标识变量
        for(int i = 0 ; i < p ; i++){
            System.out.println(q2+"进程：");
            for(int j = 0; j < a ;j++){
                need[i][j] = in.nextInt();
            }
            q2++;
        }
        System.out.println("avaiable:");
        for(int i = 0 ; i < a;i++){
            avaliable[i] = in.nextInt();
        }
    }
    //x为最大需求量，y为已分配资源数量,
    // 是否安全检测方法
    public boolean safe(int []x,int []y){
        for (int i = 0 ; i < x.length;i++) {
            if(x[i]-y[i] > avaliable[i]){
                return false;
            }
        }
        return true;
    }

    public void doSome(){
        int flag = 0;
        while(!done.isEmpty() ){
            boolean is_safe = safe(need[flag],allocation[flag]);
            if(done.contains(flag+"")){
                if(is_safe){
                    try{
                        Thread.sleep(1000);
                        for(int i = 0 ; i < avaliable.length ; i++){
                            avaliable[i] = avaliable[i] + need[flag][i];
                        }
                        done.remove(flag+"");
                        System.out.println(flag+1+"完成了");
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
            if(flag >= p-1){
                flag = 0;
            }else{
                flag++;
            }
        }
    }
}
