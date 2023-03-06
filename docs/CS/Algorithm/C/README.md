##

### 特点
1. 语言简洁紧凑，使用灵活，
2. 运算符多
3. 类型丰富，包含整形、字符型、浮点型，共用体，结构体等
4. 结构化
5. 
6. `可以直接访问物理地址`
7. 移植性好
8. 

### 开始
预处理指令: #include<stdio.h>
函数入口: main函数，一般返回值是int类型，搭配return 0
注释: 单行注释/ 多行注释 /**/
变量声明: 
变量赋值:
换行: printf('/n');

## putc/ putchar
- putchar: 传入一个0-127的整数(若传入浮点数将会按整数处理)，则会向屏幕输出一个对应该数字的字符

- putc: 比putchar更强大一点，putc的第一个参数是数字，第二个参数是文件指针，可以将字符打印到对应的文件中，而不是像putchar一样只能打印到屏幕上；因此putchar的第二个参数是stdout时和putchar函数是等效的

eg:
putchar('a') ;//结果是在屏幕上打印出字符 a 

putchar(97);//结果是在屏幕上打印出字符 a 


putc('a',stdout);//结果是在屏幕上打印出字符 a 

putc(97,stdout);//结果是在屏幕上打印出字符 a 


FILE * FP = fopen("C:\\test.txt","w");

putc('a',fp); //结果是在C盘的test.txt文件中打印出字符 a 