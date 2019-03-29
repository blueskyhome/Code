
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef char SElemType;
 struct Node
{
   SElemType Data[100][10];
   int top;
   int Maxsize;
};
typedef struct Node *SqStack;
SqStack CreateStack(){
	SqStack S = (SqStack)malloc(sizeof(struct Node));
    S->top = -1;
    S->Maxsize = StackSize;
    return S;
}
int IsFull(SqStack S){
	if(S->top == S->Maxsize-1){
		return 1;
	}
	return -1;
}
int Push(SqStack S,char X[10]){
	if(IsFull(S)==1){
		printf("堆栈满");
		return 0;
	}else{
		strcpy(S->Data[++(S->top)],X);
		return 1;
	}
}
int IsEmpty(SqStack S){
	if(S->top == -1){
		return 1;
	}
	return -1;
}
void Pop(SqStack S,char *b){
	if(IsEmpty(S) == 1){
		printf("栈空");
		return "0";
	}else{
		printf("%s\n",S->Data[S->top]);
		S->top--;
	}
}
int main(){
	SqStack S ;
	char a[20];
	int n,i=0,j=0;
	char *b;
	S = CreateStack(S);
    printf("有几个作业：");
    scanf("%d",&n);
	getchar();
	while(i < n){
	    printf("请输入name：");
	    gets(a);
		Push(S,a);
		i++;
	}
	while(j < n){
			Pop(S,b);
			j++;
	}
	return 0;
}
