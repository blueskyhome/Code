import java.util.ArrayList;
import java.util.List;


/**
 * 农夫过河问题
 * 题目描述：农夫需要把狼、羊、菜和自己运到河对岸去，只有农夫能够划船，而且船比较小，除农夫之外每次只能运一种东西，
 * 还有一个棘手问题，就是如果没有农夫看着，羊会偷吃菜，狼会吃羊。
 * 请考虑一种方法，让农夫能够安全地安排这些东西和他自己过河。
 */
public class Main {
   private List<String> ThisList = new ArrayList<>();
   private List<String> ThatList = new ArrayList<>();
   private int flag;
   public Main(){
       ThisList.add("白菜");
       ThisList.add("羊");
       ThisList.add("狼");
   }
   public boolean isCan(List list){
       if(list.contains("白菜") && list.contains("羊") || list.contains("羊")&&list.contains("狼")){
           return false;
       }else{
           return true;
       }
   }

   public void ToThat(){
       String str = ThisList.get(0);
       ThisList.remove(str);
       if(isCan(ThisList)){
           System.out.println("农夫带着"+str+"去b岸");
           ThatList.add(str);
           System.out.println("A岸还有"+ThisList+";B岸还有"+ThatList);
           System.out.println();
           flag++;
           ToThis();
       }else{
          ThisList.add(str);
          ToThat();
       }
   }
   public void ToThis(){
      if(ThisList.isEmpty()){
          System.out.println("完成任务,"+"一共用了"+flag+"次");
          return;
      }
      if(isCan(ThatList)){
          System.out.println("农户去a岸");
          System.out.println("A岸还有"+ThisList+";B岸还有"+ThatList);
          System.out.println();
          flag++;
          ToThat();
      }else{
          String str = ThatList.get(0);
          ThatList.remove(str);
          if(isCan(ThatList)){
              System.out.println("农夫带着"+str+"去a岸");
              System.out.println("A岸还有"+ThisList+";B岸还有"+ThatList);
              System.out.println();
              ThatList.add(str);
              flag++;
              ToThat();
          }else{
              ThatList.add(str);
              ToThis();
          }
      }
   }
   public static void main(String args[]){
       Main main = new Main();
       System.out.println("开始过河：");
       System.out.println();
       main.ToThat();
   }

}
