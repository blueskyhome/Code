import java.util.Scanner;

public class Main {
    public static void main(String args[]){
        Scanner in = new Scanner(System.in);
        System.out.println("进程数和资源数");
        int a = in.nextInt();
        int b = in.nextInt();
        P p = new P(a,b);
        p.init();
        p.doSome();
    }
}
