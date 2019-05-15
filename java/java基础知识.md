1、关于Java源程序文件的说法，不正确的是( B ) 

A. 一个java源程序文件中能有多条import语句。
B. 一个java源程序文件中能有多条package语句。
C. 一个java源程序文件中只能定义一个public class类。
D. 一个java源程序文件可以定义多个class类。

2、编译一个定义了3个类，并包含5个方法的Java源文件，总共会生成（  D  ）个字节码文件。

A．5个字节码文件，以“.java”为扩展名
B．3个字节码文件，以“.java”为扩展名
C．5个字节码文件，以“.class”为扩展名
D．3个字节码文件，以“.class”为扩展名

解析：在一个源文件中你用class关键字定义了几个类，编译的时候就会产生几个字节码文件。

3、关于下面程序片段，结论正确的是（   B   ）。
String a =”Java”;
String b=”Java”;
String x=”Ja”;
String y=”va”;
String c=x+y;
A. a和b指向同一个实例对象，a和c指向同一个实例对象
B. a和b指向同一个实例对象，a和c不指向同一个实例对象
C. a和b不指向同一个实例对象，a和c指向同一个实例对象
D. a和b不指向同一个实例对象，a和c不指向同一个实例对象

解析：字符串的操作都会生成一个新的对象。



4、现有一个Java源文件，其中包含有一个名为Example的public类，为了成功编译该文件，需要满足以下哪些条件？（D）

A. 源文件必须导入java.lang包。
B. 源文件必须声明一个Example()方法。
C. 源文件必须具有package包语句。
D. 源文件名必须为Example.java。

5、在Java语言中，不允许使用指针, 这样体现出的Java特性是（ D   ）

A. 可移植性
B. 解释执行
C. 动态性
D. 安全性

6、为类A的一个无参数无返回值的方法B书写方法头部，使得使用类名A作为前缀就可以调用它，则该方法头部的形式为(  B )。

A. abstract  void  B( )
B. public  void  B( )    
C. static  void  B( )
D. final  void  B( )  

7、类与对象的关系是（B    ）

A. 对象是类的抽象
B. 对象是类的具体实例
C. 对象是类的子类
D. 类是对象的具体实例

8、下列哪个类声明是正确的？ （ A ）

A. public abstract class Car{  }
B. abstract final class HI{  }
C. abstract private move(){  }
D. protected private number{  }

9、以下哪些修饰符可以使其修饰的变量只能对同包类或子类有效？ （CD  ）

A. public
B. private
C. protected
D. 无访问修饰符

10、关于方法重载的说法，正确的是 (   B   )。

A. 构造方法是一类特殊方法，不能重载
B. 使用方法重载可以增加方法调用的便利性，适当减少代码的编写量
C. 多个重载方法的名称不区分字母的大小写，只要字母相同即可
如：void test(int a){} 和void Test(){double a}这两个方法是重载方法
D. 重载方法的区分只以参数的类型不同作为区分依据，方法的返回值类型不能作为区分重载方法的依据

11、关于super的说法正确的是（     B   ）。

A．是指当前对象的引用
B．是指当前对象的父类对象的引用
C．是指当前对象的父类
D．可以用在main()方法中

解析：super关键字。

12、关于抽象方法的说法正确的是（ D   ）

A. 抽象类中的方法都是抽象方法
B. 抽象方法可以出现在非抽象类中
C. 抽象方法可以有方法体
D. 抽象方法是没有方法体的方法

注意：抽象类中可以有实例方法，接口中不能有实例方法。

13、下列关于继承的哪项叙述是正确的（   C ）

A. 在java的类中允许多重继承
B. 在java中一个类只能实现一个接口
C. java的类只能有一个直接父类
D. 在java中一个类不能同时继承一个类和实现一个接口

解析：一个类可以实现多个接口，但只可以有一个父类。

14、下列叙述中，正确的是(  )

A. 一个Java类可以有多个直接父类。

 B. Java语言的标识符是区分大小写的 

C. 源文件的扩展名为.jar 

D. 源文件中的public类的数目不限

解析：源文件的扩展名为.java，源文件中的public类只能有一个。

15、以下有关构造方法的说法，正确的是：（D ）

A. 一个类不能定义多个构造方法      
B. 构造方法具有返回类型
C. 构造方法必须是public方法    
D. 构造方法的名称必须与所在的类的类名相同

16、下列选项中，（ D ）不能作为类成员的访问控制符。

A. public
B. private
C. protected
D. static

17、以下关于Java语言继承的说法错误的是（A）
A Java中的类可以有多个直接父类
B 抽象类可以有子类
C Java中的接口支持多继承
D 最终类不可以作为其它类的父类

18、现有类A和接口Ｂ，以下描述中表示类Ａ实现接口Ｂ的语句是（A）
A class  Ａ  implements  B
B class  B  implements  Ａ
C class  Ａ  extends  B
D class  B  extends  Ａ

19、下列选项中，定义最终类的关键字是（D）
A interface
B implements
C abstract
D final

20、下列选项中，用于实现接口的关键字是（A）
A interface
B implements
C abstract
D class

21、在异常处理中，将可能抛出异常的方法放在哪个语句块中（C）
A throws
B catch
C try
D finally

22、请问所有的异常类皆继承哪一个类？（D）
A java.lang.Throwable
B java.util.Exception
C java.lang.Error
D java.io.Exception

23、Java的标准输出流是(    A  )
A. System.out
B. cout
C. cin
D. System.in

24、下列流中哪一个使用了缓冲区技术（A）
A BufferedOutputStream
B FileInputStream
C DataOutputStream
D FileReader

25、下列哪个类创建的对象可以触发ActionEvent事件（A）
A java.awt.Button类
B java.lang包的子类
C java.util.Date类
D java.lang.StringBuffer类

26、在基于Swing的图形用户界面设计中，面板属于（B）
A 顶层容器
B 中间级容器
C 窗格
D 原子组件

解析：JPanel：面板组件，非顶层容器，默认为流式布局。