+++
date = '2025-06-02T02:37:51+08:00'
draft = false
title = '第五届“计协杯”程序设计竞赛暨ACM实验室招新选拔4月赛--题解'
+++
## 问题A: 正方形字符串

#### 题目描述

现请你输出指定大小的“ACM”字符串。特别地，我们要求输出的字符串是正方形的（行数和列数相等）。

#### 输入格式

输入的第一行是一个正整数N（N<=20），表示一共有N组数据，接着是N行数据，每行包含一个正整数M（M<=50），表示一行内有M个“ACM”相连。

#### 输出格式

输出指定的正方形字符串。

#### 输入样例

```plain
2
1
2
```

#### 输出样例

```plain
ACM
ACM
ACM
ACMACM
ACMACM
ACMACM
ACMACM
ACMACM
ACMACM
```



#### 分类标签

[C语言-输入输出](https://www.hnieacm.com/problemset.php?search=C%E8%AF%AD%E8%A8%80-%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA)

---

### 题解

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 60;
int n;
string s = "ACM";
int main() {
    scanf("%d", &n);
    int m;
    while(n--) {
        scanf("%d", &m);
        string t;
        for(int i = 1; i <= m; i++) {
            t += s;
        }
        for(int i = 1; i <= t.size(); i++) {
            cout << t << endl;
        }
    }
    return 0;
}
```

**知识点**: 使用 `.size()`或 `.length()`获取字符串的长度

---

## 问题B: 学姐的桌面

#### 题目描述

学姐在加入集训队之后，学习了使用ubuntu系统来做题，但是没有了360电脑管家，学姐再也没办法看到她的飞速电脑开机到底虐了全国多少人。作为一个电脑高手，学姐花了几分钟黑到了360的数据库拿到了全国360用户的开机时间，现在学姐想自己算算到底打败了百分之多少的人？

#### 输入格式

输入有多组数据。首先给出数据组数T(T≤10)，下面T组数据，每组开头为n(1≤n≤100000)，360的用户数，和t，学姐的开机时间，接下来n个数字，ti代表第i个用户的开机时间。其中t，ti为非负整数且小于109。

#### 输出格式

每组数据一行，输出学姐打败了全国百分之多少的用户，精确到小数点后两位。

#### 输入样例

```plain
1
5 3
1 1 2 2 3
```

#### 输出样例

```plain
80.00%
```

#### 数据范围与提示

cin可能导致TLE ~_~

#### 分类标签

[算法设计-模拟](https://www.hnieacm.com/problemset.php?search=%E7%AE%97%E6%B3%95%E8%AE%BE%E8%AE%A1-%E6%A8%A1%E6%8B%9F)

---

> 原题题意表述疑似有误, 应表述为“学姐**被**百分之多少的用户打败"

### 题解

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 100010;
int T, n, t;
int q[N];
int main() {
    scanf("%d", &T);
    while(T--) {
        scanf("%d %d", &n, &t);
        int cnt = 0;
        for(int i = 0;i < n;i++) {
            scanf("%d", &q[i]);
            if(t <= q[i]) cnt ++;
        }
        double res = (double) cnt / n * 100.0;
        res = 100.0 - res;
        printf("%.2f%%\n", res);
    }
    return 0;
}
```

---

## 问题C:18岁生日

#### 题目描述

小明的18岁生日就要到了，他当然很开心，可是他突然想到一个问题，是不是每个人从出生开始，到达18岁生日时所经过的天数都是一样的呢？似乎并不全都是这样，所以他想请你帮忙计算一下他和他的几个朋友从出生到达18岁生日所经过的总天数，让他好来比较一下。

#### 输入格式

输入的第一行是一个数T，后面T行每行有一个日期，格式是YYYY-MM-DD。如我的生日是1988-03-07。

#### 输出格式

T行，每行一个数，表示此人从出生到18岁生日所经过的天数。如果这个人没有18岁生日，就输出-1。

#### 输入样例

```plain
1
1988-03-07
```

#### 输出样例

```plain
6574
```

#### 分类标签

[算法设计-模拟](https://www.hnieacm.com/problemset.php?search=算法设计-模拟)

---

### 题解

```cpp

#include <bits/stdc++.h>
using namespace std;
int y, m, d;
bool is_leap_year(int y) {
    if(y % 400 == 0 || (y % 4 == 0 && y % 100 != 0))
        return true;
    return false;
}
// 每月天数处理套路
int day_in_month(int y, int m) {
    int days[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    if(m == 2 && is_leap_year(y))
        return 29;
    return days[m];
}

long long day_from_one(int year, int month, int day) {
    long long total = 0;

    for(int y = 1;y < year;y++) 
        total += is_leap_year(y) ? 366 : 365;
  
    for(int m = 1;m < month;m++)
        total += day_in_month(year, m);
  
    total += day;
  
    return total;
}

int main() {
    int T;
    scanf("%d", &T);
    while(T--) {
        scanf("%d-%d-%d", &y, &m, &d);
		// 检查是否是2月29日出生且18年后不是闰年
        if(m == 2 && d == 29 && !is_leap_year(y + 18)) {
            printf("-1\n");
            continue;
        }
        long long birth = day_from_one(y, m, d);
        long long birthday = day_from_one(y + 18, m, d);
        printf("%lld\n", birthday - birth);
    }
    return 0;
}
```

### 关键函数 `day_from_one`分析

📆 计算某日期距离公元 1 年 1 月 1 日多少天

```cpp
long long day_from_one(int year, int month, int day) {
    long long total = 0;
    for(int y = 1; y < year; y++)
        total += is_leap_year(y) ? 366 : 365;
    for(int m = 1; m < month; m++)
        total += day_in_month(year, m);
    total += day;
    return total;
}

```

---

## 问题D: 当总统

#### 题目描述

小明想当丑国的总统，丑国大选是按各州的投票结果来确定最终的结果的，如果得到超过一半的州的支持就可以当选，而每个州的投票结果又是由该州选民投票产生的，如果某个州超过一半的选民支持小明，则他将赢得该州的支持。现在给出每个州的选民人数，请问小明至少需要赢得多少选民的支持才能当选？

#### 输入格式

输入包含多组测试数据。
每组数据的第一行是一个整数N（1<=N<=101）,表示丑国的州数，当N=0时表示输入结束。
接下来一行包括N个正整数，分别表示每个州的选民数，每个州的选民数不超过100。

#### 输出格式

对于每组数据输出一行，表示小明至少需要赢得支持的选民数。

#### 输入样例 复制

```plain
3
5 7 5
0
```

#### 输出样例 复制

```plain
6
```

#### 分类标签

[算法设计-模拟](https://www.hnieacm.com/problemset.php?search=算法设计-模拟)

---

### 题解

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 110;
int n;
int q[N];
int main() {
    while(scanf("%d", &n) && n != 0) {
        for(int i = 0;i < n;i++) {
            scanf("%d", &q[i]);
        }
        sort(q, q + n);
        int total = 0;
        for(int i = 0;i < n / 2 + 1;i++) {
            total = total + (q[i] / 2 + 1);
        }
        printf("%d\n", total);
    }
    return 0;
}
```

### 思路:

一开始想到的是整数除法向上取整

```cpp
// 对于正整数 a, b，计算 a/b 的向上取整
int ceiling_divide(int a, int b) {
    return (a + b - 1) / b;
}
```

题目要求“如果得到超过一半的州的支持就可以当选”。

* 如果州数 [N](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) 是奇数，例如 [N=3](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)，超过一半是 `2` 个州。
  * 向上取整：`(N+1)/2 = (3+1)/2 = 2`。正确。
  * 标准计算：[N/2 + 1 = 3/2 + 1 = 1 + 1 = 2](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)。正确。
* 如果州数 [N](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) 是偶数，例如 [N=4](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)，超过一半是 `3` 个州。
  * 向上取整：`(N+1)/2 = (4+1)/2 = 2` (因为是整数除法)。**错误！**
  * 标准计算：[N/2 + 1 = 4/2 + 1 = 2 + 1 = 3](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)。正确。

当 [n](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) 是偶数时，`(n + 1) / 2` 会比实际需要的州数少1。

**修正方法：**

将计算需要赢得的州数的逻辑修改为 [n / 2 + 1](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)。

同理选民数的计算方式也是一样, 先从小到大排序, 再运用公式 [n / 2 + 1](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)

### 错误代码示例

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 110;
int n;
int q[N];
int main() {
    while(scanf("%d", &n) && n != 0) {
        for(int i = 0; i < n; i++) {
            scanf("%d", &q[i]);
        }
        sort(q, q + n);
        int total = 0;
		//(n + 1) 即 (n + 2 - 1) || (q[i] + 2 - 1)
        for(int i = 0; i < (n + 1) / 2; i++) {
            total += (q[i] + 1) / 2;
        }
        printf("%d\n", total);
    }
    return 0;
}
```

---

## 问题 E: 数的计数

#### 题目描述

我们要求找出具有下列性质数的个数(包含输入的自然数n):
先输入一个自然数n（n≤1000）, 然后对此自然数按照如下方法进行处理：
1．不作任何处理；
2．在它的左边加上一个自然数，但该自然数不能超过原数的一半；

#### 输入格式

6

#### 输出格式

6

#### 数据范围与提示

【说明】满足条件的数分别为 6、16、26、126、36、136

#### 分类标签

[C语言-递归](https://www.hnieacm.com/problemset.php?search=C语言-递归)

---

### 题解

```cpp
#include <bits/stdc++.h>
using namespace std;
int n, cnt = 0;
void func(int n) {
    cnt++;
    for(int i = 1; i <= n / 2; i++) 
        func(i);
}

int main() {
    scanf("%d", &n);
    func(n);
    printf("%d\n", cnt);
    return 0;
}
```

### 问题本质

我们调用 `func(n)`，该函数会：

1. 自己调用一次（所以 `cnt++`）。
2. 然后依次对 `i = 1` 到 `n / 2` 递归调用 `func(i)`。

那么问题就变成了：

> “func(n) 总共会触发多少次 `cnt++`（也就是 `func` 被调用了多少次）？”

```cpp
func(6):
├── cnt++ (计算6本身) → cnt = 1
├── func(1) (在6左边加1，形成16)
│   └── cnt++ (计算1本身) → cnt = 2
├── func(2) (在6左边加2，形成26)
│   ├── cnt++ (计算2本身) → cnt = 3
│   └── func(1) (在2左边加1，形成126)
│       └── cnt++ (计算1本身) → cnt = 4
└── func(3) (在6左边加3，形成36)
    ├── cnt++ (计算3本身) → cnt = 5
    └── func(1) (在3左边加1，形成136)
        └── cnt++ (计算1本身) → cnt = 6
```

### 生成的数字对应关系

| 递归调用         | 生成的数字 | 解释           |
| ---------------- | ---------- | -------------- |
| func(6)          | 6          | 原始数字       |
| func(1) [第一次] | 16         | 在6左边加1     |
| func(2)          | 26         | 在6左边加2     |
| func(1) [第二次] | 126        | 在26的2左边加1 |
| func(3)          | 36         | 在6左边加3     |
| func(1) [第三次] | 136        | 在36的3左边加1 |

---

## 问题 F: 进制转换

#### 题目描述

输入一个十进制数N，将它转换成R进制数输出。

#### 输入格式

输入数据包含多个测试实例，每个测试实例包含两个整数N(32位整数)和R（2<=R<=16, R<>10）。

#### 输出格式

为每个测试实例输出转换后的数，每个输出占一行。如果R大于10，则对应的数字规则参考16进制（比如，10用A表示，等等）。

#### 输入样例 复制

```plain
7 2
23 12
-4 3
```

#### 输出样例 复制

```plain
111
1B
-11
```

#### 分类标签

[ACM-数学](https://www.hnieacm.com/problemset.php?search=ACM-数学)

---

### 题解

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int n, r;

string solve(int n, int r) {
    if(n == 0) return "0";
    string res = "";
    bool negative = false;
    // 处理负数并转换为正数
    if(n < 0) {
        negative = true;
        n = -n;
    }
    while(n) {
        int remainder = n % r;   // 取余数
        if(remainder < 10) {
            res = (char)('0' + remainder) + res;
        } else {
            // 'A' + 11 - 10 = 'A' + 1 = 'B'
            res = (char)('A' + remainder - 10) + res;
        }
        n /= r;
    }

    if(negative)
        res = '-' + res;
    return res;
}

int main() {
    while(scanf("%d %d", &n, &r) != EOF) {
        cout << solve(n, r) << endl;
    }
    return 0;
}
```

### 解题思路：

#### 1. 进制转换原理

将十进制数N转换为R进制，使用 **除R取余法** ：

* 不断用N除以R，取余数
* 余数从下往上排列就是R进制的结果

#### 2. 字符映射规则

* 余数0-9：直接用字符'0'-'9'表示
* 余数10-15：用字符'A'-'F'表示（当R>10时）

#### 3. 特殊情况处理(答案错误25%的原因)

当输入的十进制数 N 为 0 时：

solve(0, r) 函数会被调用

while(n) (即 while(0)) 条件不满足，循环体不会执行。

函数最终返回一个空字符串 ""。

#### 4. 为什么是 `('0' + remainder) + res`而非 `res + ('0' + remainder)`?

因为进制转换的余数是从低位到高位产生的，但我们需要从高位到低位显示

余数从下往上排列

---

## 问题 G: 军事机密

#### 题目描述

【问题描述】 我军方截获的信息由n(n<=30000) 个数字组成，因为是敌国的高端机密，所以一时不能破获最原始的想法就是对这n个数进行从小到大排序，每个数都对应一个序号，然后对第i个是什么数最感兴趣，现在要求编程完成。
【输入格式】第一行是n，第二行是n个截获的数字，第三行是数字k，接着是k行要输出数的序号。
【输出格式】k行序号所对对应的数字。

#### 输入格式

5
121 1 126 123 7
3
2
4
3

#### 输出格式

7
123
121

#### 分类标签

[算法设计-排序算法](https://www.hnieacm.com/problemset.php?search=算法设计-排序算法)

---

### 题解

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 30010;
int q[N];
int n, k;
int main() {
    scanf("%d", &n);
    for(int i = 1; i <= n;i++)
        scanf("%d", &q[i]);
    sort(q + 1, q + n + 1);
    scanf("%d", &k);
    while(k--) {
        int f;
        scanf("%d", &f);
        printf("%d\n", q[f]);
    }
    return 0;
}
```

---



## 问题 H: 字符串匹配问题

#### 题目描述

**字符串中只含有括号 (),[],<>,{},判断输入的字符串中括号是否匹配。如果括号有互相包含的形式，从内到外必须是<>,(),[],{}，例如。输入: [()] 输出:YES，而输入([])， ([])都应该输出NO。**

#### 输入格式

文件的第一行为一个整数n(0<n<20)，表示以下有多少个由括号组成的字符串。接下来的n行，每行都是一个由括号组成的长度不超过255的字符串。

#### 输出格式

在输出文件中有N行，每行都是YES或NO。

#### 输入样例 复制

```plain
5
{}{}<><>()()[][]
{{}}{{}}<<>><<>>(())(())[[]][[]]
{{}}{{}}<<>><<>>(())(())[[]][[]]
{<>}{[]}<<<>><<>>>((<>))(())[[(<>)]][[]]
><}{{[]}<<<>><<>>>((<>))(())[[(<>)]][[]]
```

#### 输出样例 复制

```plain
YES
YES
YES
YES
NO
```

#### 数据范围与提示

注意看题

#### 分类标签

[数据结构-栈](https://www.hnieacm.com/problemset.php?search=数据结构-栈)

---

### 题解
```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
#include <stack>
#include <unordered_map>
using namespace std;
unordered_map<char, int> level{
    {'<', 1}, {'>', 1},  // 最内层
    {'(', 2}, {')', 2},  // 第二层
    {'[', 3}, {']', 3},  // 第三层
    {'{', 4}, {'}', 4}   // 最外层
};  // 确定括号的优先级
// 定义括号配对关系
unordered_map<char, char> pairs{{'>', '<'}, {')', '('}, {'}', '{'}, {']', '['}};

bool match(string str) {
    stack<char> s;
    for(int i = 0; i < str.size(); i++) {
        auto c = str[i];
        // 左括号直接入栈
        if(c == '<' || c == '(' || c == '[' || c == '{')
            s.push(c);
        else {
            // 当遇到右括号时
            // 步骤1: 检查栈是否为空
            if(s.empty()) return false;
            // 步骤2: 基本配对检查
            if(s.top() != pairs[c]) return false;
            // // 步骤3: 弹出匹配的左括号
            s.pop();
            // 步骤4: 层级规则检查
            if(!s.empty() && level[s.top()] < level[c]) return false;
            /*
            level[s.top()]获取栈顶剩余左括号的层级值, 这个左括号将成为当前右括号的"外层"括号
            level[c]获取当前右括号的层级值
            如果外层括号的层级 < 内层括号的层级，说明违反了嵌套规则
            */
        }
    }
    return s.empty();
}

int main() {
    int n;
    scanf("%d", &n);
    while(n--) {
        string s;
        cin >> s;
        if(match(s))
            printf("YES\n");
        else
            printf("NO\n");
    }
    return 0;
}
```

#### 关键代码解释

##### 1. 作用: 基本括号配对检查`if(s.top() != pairs[c])`

```cpp
if(s.top() != pairs[c]) return false;   // 配对检查

// 实例说明
// pairs映射：{'>', '<'}, {')', '('}, {']', '['}, {'}', '{'}

// 正确配对示例：
栈: ['(']，当前字符 c = ')'
s.top() = '('
pairs[')'] = '('
'(' == '(' ✓ 配对成功

// 错误配对示例：
栈: ['[']，当前字符 c = ')'  
s.top() = '['
pairs[')'] = '('
'[' != '(' ❌ 配对失败，返回false
```
执行时机: 遇到右括号时, 检查它是否与栈顶的左括号匹配

##### 2. 嵌套层级规则检查`if(!s.empty() && level[s.top()] < level[c])`
```cpp
s.pop();    // 先弹出配对的左括号
if(!s.empty() && level[s.top()] < level[c]) return false;
// s.empty() 栈顶还有剩余的左括号
// level[s.top()] < level[c]: 外层括号层级 < 内层括号层级

// 示例1：处理 [()]
初始栈: ['[', '(']
遇到 ')':
1. 配对检查：'(' == pairs[')'] ✓
2. 弹出 '('：栈变为 ['[']
3. 层级检查：
   - s.top() = '['，level['['] = 3
   - c = ')'，level[')'] = 2  
   - 3 < 2？ 否 ✓ 继续执行

// 示例2：处理 ([])
初始栈: ['(', '[']
遇到 ']':
1. 配对检查：'[' == pairs[']'] ✓
2. 弹出 '['：栈变为 ['(']
3. 层级检查：
   - s.top() = '('，level['('] = 2
   - c = ']'，level[']'] = 3
   - 2 < 3？ 是 ❌ 返回false
```
执行时机: 在弹出匹配的左括号之后执行

---

## 问题 I: 非常可乐

#### 题目描述

大家一定觉的运动以后喝可乐是一件很惬意的事情，但是seeyou却不这么认为。因为每次当seeyou买了可乐以后，阿牛就要求和seeyou一起分享这一瓶可乐，而且一定要喝的和seeyou一样多。但seeyou的手中只有两个杯子，它们的容量分别是N 毫升和M 毫升 可乐的体积为S （S<101）毫升(正好装满一瓶) ，它们三个之间可以相互倒可乐 (都是没有刻度的，且 S==N+M，101＞S＞0，N＞0，M＞0) 。聪明的ACMER你们说他们能平分吗？如果能请输出倒可乐的最少的次数，如果不能输出"NO"。

#### 输入格式

三个整数 : S 可乐的体积 , N 和 M是两个杯子的容量，以"0 0 0"结束。

#### 输出格式

如果能平分的话请输出最少要倒的次数，否则输出"NO"。

#### 输入样例 复制

```plain
7 4 2
6 3 3
6 4 2
6 1 1
6 4 1
0 0 0
```

#### 输出样例 复制

```plain
NO
1
NO
NO
3
```

#### 分类标签

[算法设计-搜索](https://www.hnieacm.com/problemset.php?search=算法设计-搜索)

## 问题 J: 搬寝室

#### 题目描述

搬寝室是很累的,xhd深有体会.时间追述2006年7月9号,那天xhd迫于无奈要从27号楼搬到3号楼,因为10号要封楼了.看着寝室里的n件物品,xhd开始发呆,因为n是一个小于2000的整数,实在是太多了,于是xhd决定随便搬2*k件过去就行了.但还是会很累,因为2*k也不小是一个不大于n的整数.幸运的是xhd根据多年的搬东西的经验发现每搬一次的疲劳度是和左右手的物品的重量差的平方成正比(这里补充一句,xhd每次搬两件东西,左手一件右手一件).例如xhd左手拿重量为3的物品,右手拿重量为6的物品,则他搬完这次的疲劳度为(6-3)^2 = 9.现在可怜的xhd希望知道搬完这2*k件物品后的最佳状态是怎样的(也就是最低的疲劳度),请告诉他吧。

#### 输入格式

每组输入数据有两行,第一行有两个数n,k(2<=2*k<=n<2000).第二行有n个整数分别表示n件物品的重量(重量是一个小于2^15的正整数).

#### 输出格式

对应每组输入数据,输出数据只有一个表示他的最少的疲劳度,每个一行.

#### 输入样例 复制

```plain
5 1
18467 6334 26500 19169 15724 
7 1
29358 26962 24464 5705 28145 23281 16827 
0 0
```

#### 输出样例 复制

```plain
492804
1399489
```

#### 分类标签

[算法设计-动态规划](https://www.hnieacm.com/problemset.php?search=算法设计-动态规划)
