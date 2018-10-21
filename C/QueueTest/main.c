#include <stdio.h>
#include <stdlib.h>
#define MaxQSize 10
#define ERROR 0
typedef int ElemType;

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

struct Node{
	ElemType *base;
	int front;
	int rear;
	int flag;
};
typedef struct Node *Queue;
Queue CreateQueue(){
	Queue Q = (Queue)malloc(sizeof(struct Node));
	Q->base = (ElemType*)malloc(MaxQSize*sizeof(ElemType));
	Q->front = 0;
	Q->rear = 0;
	Q->flag = 0;
	return Q; 
}
void IsFull(Queue Q){
	if((Q->rear+1)%MaxQSize == Q->front){
		Q->flag = 1;
	}
}
void IsEmpty(Queue Q){
	if(Q->front == Q->rear){
		Q->flag = 0;
	}
}
void AddQ(Queue Q,int x){
	IsFull(Q);
	if(Q->flag == 1){
		printf("队满");
	}else{
       Q->rear = (Q->rear+1)%MaxQSize;
       Q->base[Q->rear] = x;
	}
}
ElemType DeleteQ( Queue Q )
{
	IsEmpty(Q);
    if ( Q->flag == 0 ) { 
        printf("队列空");
        return ERROR;
    }
    else  {
        Q->front =(Q->front+1)%MaxQSize;
        return  Q->base[Q->front];
    }
}
int main(int argc, char *argv[]) {
	Queue Q;
	Q = CreateQueue(Q);
	int i = 1;
	int m,n;
	while(i != 0){
		printf("请入入栈的元素：");
		scanf("%d",&n);
		AddQ(Q,n);
		if(Q->flag == 1){
			i = 0;
		}
	}
	return 0;
}
