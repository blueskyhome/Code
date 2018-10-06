/*
创建链表并删除特定元素
*/
#include <stdio.h>
#include <stdlib.h>
#define MaxSize 100
#define OK 1
#define ERROR -1
 struct LNode{
    int data;
    struct LNode *next;
};

struct LNode* CreateList(struct LNode* List,int data){
    struct LNode *p = NULL,*pr=List;
    p = (struct LNode *)malloc(sizeof(struct LNode));
    if(p == NULL){
        printf("申请内存失败！");
    }
    if(List == NULL){
        List = p;
    }else{
        while(pr->next != NULL)
            pr = pr->next;
        pr->next = p;
    }
    p->data = data;
    p->next = NULL;

    return List;
}
struct LNode* DeleteList(struct LNode* List,int min ,int max){
    struct LNode* p = List,*s = NULL;
    struct LNode* q = List;
    if(List == NULL){
        return List;
    }
    while(q != NULL){
        if(q->data > min && q->data < max){
             p->next = q->next;
             s = q;
             q = q->next;
             free(s);
        }else{
             p = q;
             q = q->next;
        }
    }
    return List;
}
void ListDelete(struct LNode *List , int i,int min,int max){
    int k;
    if(List==NULL)
        return ERROR;

}
void PrintList(struct LNode* List){
    struct LNode* L = List;
    while(L != NULL){
        printf("%d ",L->data);
        L = L->next;
    }
    printf("\n");
}
int main()
{
    struct LNode* List = NULL;
    int data=1,i=1;
    while(data != -1 && i < MaxSize){
        printf("请输入%d元素：",i);
        scanf("%d",&data);
        if(data != -1)
        List = CreateList(List,data);
        i++;
    };
    PrintList(List);
    int max,min;
    printf("请输入min和max：");
    scanf("%d %d",&min,&max);
    List = DeleteList(List,min,max);
    PrintList(List);
    return 0;
}
