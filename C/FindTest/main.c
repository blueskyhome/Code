#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */
/*
1.	已知含有10个整数的查找表如下：（9，13，15，7，45，32，56，89，60，36），从键盘上输入一个整数，用顺序查找的方法在查找表中查找该整数。若存在，输出该元素的下标值，否则，给出相应的信息。
2.	对有序数据表(5，7，9，12，15，18，20，22，25，30，100)，编写程序按折半查找方法查找12和28。
*/

int main(int argc, char *argv[]) {
	int a[10] = {9,13,15,7,45,32,56,89,60,36};
	int b[10] = {5,7,9,12,15,18,20,22,25,30,100};
	int n,i;
	int k = 0;
	//顺序查找 
	printf("-------------顺序查找-------------\n");
	printf("请输入要查找的值：");
	scanf("%d",&n);
	if(SeqSearch(a,n) == -1){
		printf("没有找到你查找的值\n"); 
	}else{
		int j = SeqSearch(a,n);
		printf("你查找的值为%d，下标是%d\n",a[j],j);
	}
	//折半查找 
	printf("-------------二分查找-------------\n");
	do{
		if(k!=0){
		  	i = BinSearch(b,k);
		  	if(i == -1){
		    printf("没有找到你查找的值\n"); 
	       }else{
	         printf("你查找的值为%d，下标是%d\n",b[i],i);
	       }
		}
		printf("请输入你要查找的值，-1结束:"); 
		scanf("%d",&k);
	}while(k != -1);

	return 0;
}


int SeqSearch(int R[10],int n)
{
  int i=0;
while(i < 10&&R[i]!=n)
{
i++;
}
if(i>=n)
return -1;
else 
{
return i;
}
}


int BinSearch(int R[10],int n)
{
int low=0,high=9,mid,count=0;
while(low<=high)
{
mid=(low+high)/2;
printf("第%d次查找：在[ %d ,%d]中找到元素R[%d]:%d\n ",++count,low,high,mid,R[mid]);
if(R[mid]==n)
return mid;
if(R[mid]>n)
high=mid-1;
else
low=mid+1;
}
return -1;
}



