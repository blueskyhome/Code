
#include <stdio.h>
#include <stdlib.h>
#define StackSize 100
#define StackIncrease 10
#define ERROR -1
#define OK 1
typedef char SElemType;
 struct Node
{
   SElemType *Data;
   int top;
   int Maxsize;
};
typedef struct Node *SqStack;
SqStack CreateStack(){
	SqStack S = (SqStack)malloc(sizeof(struct Node));
	S->Data = (SElemType*)malloc(StackSize*sizeof(SElemType));
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
int Push(SqStack S,SElemType X){
	if(IsFull(S)==1){
		printf("堆栈满");
		return 0;
	}else{
		S->Data[++(S->top)] = X;
		return 1;
	}
}
int IsEmpty(SqStack S){
	if(S->top == -1){
		return 1;
	}
	return -1;
}
SElemType Pop(SqStack S){
	if(IsEmpty(S) == 1){
		printf("栈空");
		return "0";
	}else{
		return (S->Data[(S->top)--]);
	}
}
int main(){
	SqStack S ;
	char a[20];
	int i = 0,j=0;
	char b;
	S = CreateStack(S);
	printf("请输入字符串：");
	gets(a);
	while(a[i] != '\0'&& a[i] !='&'){
		Push(S,a[i]);
		i++;
	}
	if(a[i] == '\0'){
		printf("不是这种字符串");
	}else{
		i++;
		while(a[i] != '\0'){
			b = Pop(S);
			if(b != a[i]){
			  	printf("不是这种字符串");
			  	return 0;
			}
			i++;
		}
		printf("是这种字符串");
	}
	return 0;
}
