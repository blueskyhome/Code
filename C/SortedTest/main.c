#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define N 100

typedef struct student{
	char name[8];
	int score;
}Stu;
int main(int argc, char *argv[]) {
	Stu student[N];
	int n,i;
	printf("请输入学生总数：");
	scanf("%d",&n);
	for(i=0;i<n;i++){
		getchar();
		printf("请输入%d学生姓名:",i+1); 
		gets(student[i].name);
		printf("请输入%d学生的成绩：",i+1);
		scanf("%d",&student[i].score);
	}
//	Fast(student,n);
    quick(student,0,n-1);
	for(i=0;i<n;i++){
		printf("学生姓名；%s、成绩:%d\n",student[i].name,student[i].score); 
	}
	return 0;
}
//直接插入排序 
void Fast(Stu student[N],int n){
	int i,j;
	Stu max;
	int k,temp;
	for(i=n;i>1;i--){
		k=Max(student,i);
		max.score = student[i-1].score;
		strcpy(max.name,student[i-1].name);
		student[i-1].score = student[k].score;
		strcpy(student[i-1].name,student[k].name);
		student[k].score = max.score;
		strcpy(student[k].name,max.name);
	}
}
//快速排序 
void quick(Stu student[N],int low,int high){
	int i,j;
	Stu pivot;
	if(low<high){
		i = low+1;
		j = high;
		while(i<j){
		  if(student[i].score>student[low].score){
		  	pivot.score = student[i].score;
		  	strcpy(pivot.name,student[i].name);
		  		student[i].score = student[j].score;
		  	strcpy(student[i].name,student[j].name);
		  		student[j].score = pivot.score;
		  	strcpy(student[j].name,pivot.name);
		  	j--;
		  }else{
		  	i++;
		  }
		}
		if(student[i].score >= student[low].score){
			i--;
		}
		    pivot.score = student[low].score;
		  	strcpy(pivot.name,student[low].name);
		  		student[low].score = student[i].score;
		  	strcpy(student[low].name,student[i].name);
		  		student[i].score = pivot.score;
		  	strcpy(student[i].name,pivot.name);
		quick(student,low,i);
		quick(student,j,high);
	}
}

int Max(Stu student[N],int n){
	int i;
	Stu max = student[0];
	int j=0;
	for(i=1;i<n;i++){
		if(student[i].score > max.score){
		   max.score = student[i].score;
		   strcpy(max.name,student[i].name);
		   j=i;
		}
	}
	return j;
}
