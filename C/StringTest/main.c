#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define N 30
struct Re{
	int num;
	int pos;
};
struct Po{
	int num;
	int pos1;
	int pos2;
};
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
struct Re findString(char a[N],char b[N]){
	struct Re p;
	p.num=0;
	p.pos=0;
	int i = 0,j = 0,n,l=0;
	int y,flag=1;
	while(b[l] != '\0'){
		l++;
	}
	while(a[i] != '\0'){
		if(a[i] == b[j] && a[i+l-1] != '\0'){
			n = i;
	        while(b[j] != '\0'){
	        	if(a[i] != b[j]){
	        	   flag=0;
	        	   break;
				}
				i++;
				j++;
			}
			j = 0;
			if(flag != 0){
				p.num = 1;
				p.pos = n;
				return p;
			}else{
				i = n+1;
			}
		}else{
			i++;
		}
	}
	return p;
}
struct Po StringNum(char a[N],char b[N],char c[N]){
	struct Re num1,num2;
	num1 = findString(a,b);
	num2 = findString(a,c);
	struct Po p;
	if(num1.num == 0 && num2.num == 0){
		p.num = 0;
		p.pos1 = 0;
		p.pos2 = 0;
	}else if(num1.num != 0 && num2.num == 0){
		p.num = 1;
		p.pos1 = num1.pos;
		p.pos2 = 0;
	}else if(num1.num == 0 && num2.num != 0){
		p.num = 2;
		p.pos1 = 0;
		p.pos2 = num2.pos;
	}else{
	    p.num = 3;
		p.pos1 = num1.pos;
		p.pos2 = num2.pos;
	}
	return p;
	
} 
int main(int argc, char *argv[]) {
	struct Po p;
	char a[30],b[30],c[30]; 
	printf("请输入str1：");
	gets(a);
	printf("请输入str2："); 
	gets(b);
	printf("请输入str3："); 
	gets(c);
	p = StringNum(a,b,c);
	switch(p.num){
		case 0:
			printf("没有");
			break;
		case 1:
			 printf("有字符串一，没有字符串二\n");
			 printf("出现字符串一的位置：%d",p.pos1);
			 break;
	    case 2:
			 printf("没有有字符串一，有字符串二 \n");
			 printf("出现字符串二的位置：%d",p.pos2);
			 break;
		case 3:
		     printf("字符串一、二都有\n");	 
		      printf("出现字符串一、二的位置：%d %d",p.pos1,p.pos2);
		default:
		     break;	 		 
	} 
	return 0;
}

