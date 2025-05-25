+++
date = '2025-05-24T18:07:09+08:00'
draft = true
title = 'My First Post'
+++


# 1 基础模板

## 1.1 快读

```c++

char buf[1<<21],*p1 = buf, *p2 = buf;

inlinechargc() {

if(p1 == p2) {

        p2 = (p1 = buf) +fread(buf, 1, 1<<21,stdin);

    }

return*(p1++)

}

inlineintread() {

int s =0,w =1;    //s数值, w符号

char ch =gc();

while(!isdigit(ch)) {

if(ch =='-') f =-1;

        ch =gc();

    }

while(isdigit(ch)) {

        s = s *10+ ch -'0';

        ch =gc();

    }

return s * w;

}

```

## 1.2 快写

```c++

inlinevoidwrite(intx) {

if (x <0) {

putchar('-');

        x =-x;

    }

if (x >9) write(x /10);

putchar(x %10+'0');

}

```

# 2 算法 Algorithm

## 2.1.1 埃式筛 埃拉托斯特尼筛法 Eratosthenes

时间复杂度：$O(n\log\log n)$

```cpp

constint MAXN =1e5+10;

bool is_prime[MAXN]; // is_prime储存该数是否为素数


voidinit_prime()

{

memset(is_prime, true, sizeof(is_prime));

    is_prime[0] = is_prime[1] =false; // 特判0、1不是素数

for (int i =2; i < MAXN; i++)     // 使用埃氏筛处理>1的情况

if (is_prime[i])

for (int j =2; j * i < MAXN; j++)

                is_prime[i * j] =false;

}

```

## 2.1.2 欧拉筛 线性筛 Euler

```c++

int primes[N], cnt;

/* primes数组存储素数, cnt记录素数的个数 */

bool st[N]; // 用于标记每个数是否是合数

voidget_prime(intn) {

for(int i =2;i <= n;i++) {

if(!st[i]) primes[cnt++] = i;

        /* 如果 i 没有被标记为合数，则 i 是素数 */

for(int j =0;primes[j] <= n / i;j++) {

            /* 从小到大枚举所有质数 */

            st[primes[j] * i] =true;

            /* 将当前质数和i的乘积消掉 */

if(i % primes[j] ==0) break;

            /* primes[j]一定是i的最小质因子 */

        }

    }

}

```

## 2.2 快速幂 Exponentiation by squaring

时间复杂度：$O(\log n)$

### 2.2.1 不取模

```cpp

ll fast_pow(ll a, ll b)

{

    ll ans =1;

while (b) {

if (b &1) ans = ans * a;

        a = a * a;

        b >>=1;

    }

return ans;

}

```

### 2.2.2 取模

    (a * b) mod m = ((a mod m)  * (b mod m)) mod m

```cpp

ll fast_pow(ll a,ll b,ll m) {

    a %= m;

    ll ans =1;

while(b) {

if(b &1) ans = ans * a % m;

        a = a * a % m;

        b >>=1;

    }

return ans;

}

```

### 2.2.3 快速幂求逆元(确保m为质数)

$$
\frac{a}{b} \equiv a * b^{-1}(mod m)\\b * \frac{a}{b} \equiv b*ab^{-1}\\b * b^{-1} \equiv1 * (modm)
$$

#### 费马小定理

    $b^{p -1} \equiv1 (modp)$ --> $b * b^{p -2} \equiv1 (modp)$ 所以$b^{p - 2}$ 即为$p$的逆元

## 2.3 辗转相除法 欧几里得算法 Euclidean algorithm

时间复杂度：$O(\log(a+b))$

a // d  &&  b // d  --> a + b // d;

a mod b = a - ($\frac{a}{b}$) * b

```cpp

// gcd(a, b) = gcd(b, a % b)

// a % b == a - 

intgcd(inta, intb)

{

if (!b)

return a;

returngcd(b, a % b);

return b ?gcd(b, a % b) : a;

             // b不是0         b是0

    // b = 0时 (a, 0) 最大公约数为a

}

```

## 2.4 深度优先搜索 DFS

## 2.5 广度优先搜索 BFS

### 2.5.1 迷宫问题(曼哈顿距离最短)

#### 2.5.1.1 队列

```c++

#definex first

#definey second

constint N =100010;

typedef pair<int, int> PII;

queue<PII> q;   //<queue>

int dist[N][N];

int g[N][N];

int dx[] = {1,-1,0,0};

int dy[] = {0,0,1,-1};

voidbfs(intx1, inty1) {

memset(dist,-1,sizeof dist);    //<cstring>

    q.push({x1,y1});    //入队

    dist[x1][y1] =0;

while(!q.empty()) 

auto t = q.front(); //取出对头;

        q.pop();    //出队

for(int i =0; i <4;i ++) {

int a = t.x + dx[i], b = t.y + dy[i];

if(a <0|| b <0|| a >= m || b >= n) continue;    //m为行,n为列

if(dist[a][b] >=0) continue;

            // if (g[a][b] == 障碍物) continue; 

            dist[a][b] = dist[t.x][t.y] +1;

            // if(到终点) return dist[a][b];

            q.push({a,b});

        }

    }

}



```

#### 2.5.1.2 数组模拟队列

```c++

PII q[N * N];

voidbfs(intx1, inty1) {

    q[0] = {x1,y1};

int hh =0, tt =0; //hh头指针, tt尾指针

    //队列一开始就有元素 tt 初始化为0,

    //如果void bfs() tt 初始化为-1

while(hh <= tt) {

auto t = q[hh++];

for(int i =0;i <4;i++) {

int a = t.x + dx[i], b = t.y + dy[i];

if(...) continue;

            dist[a][b] = dist[t.x][t.y] +1;

            q[++tt] = {a,b};

        }

    }

}

```

## 2.6 高精度 Big Interger

### 2.6.1 I / O

```c++

/* 输入 */

string a,b;

cin >> a >> b;

vector<int> A, B;

// 低位向高位存储

for(int i = a.size() -1;i >=0;i--) A.push_back(a[i] -'0');

for(int i = b.size() -1;i >=0;i--) B.push_back(b[i] -'0');


// add

auto res =add(A, B);

for(int i = res.size() -1;i >=0;i--) cout << res[i]; // 反向输出整形数组每一位


// sub

if(cmp(A, B)) {

auto res =sub(A, B);

for(int i = res.size() -1;i >=0;i--);

} else {

auto res =sub(B, A);

printf("-");    // 注意输出-

for(int i = res.size() -1;i >=0;i--);

}


```

### 2.6.2  BI + BI

```c++

//C = A + B, A >= 0

vector<int> add(vector<int>&A, vector<int>&B) {

if(A.size() < B.size()) returnadd(B, A);

    vector<int> C;

int t =0;

for(int i =0;i < A.size();i++) {

        t += A[i];

if(i < B.size()) t += B[i];

        C.push_back(t %10);    // 将当前位存入数组中

        t /=10;               //进位 (个位 -> 十位)

    }

if(t) C.push_back(t);

return C;

}

```

### 2.6.3 BI - BI

```c++

vector<int> sub(vector<int>&A, vector<int>&B) {

    vector<int> C;

int t =0;

for(int i =0;i < B.size();i++) {

        t = A[i] - t;

if(i < B.size()) t -= B[i]; // t = t - B[i];

        C.push_back((t +10) %10);

if(t <0) t =1;

else t =0;

    }

while(C.size >1&& C.back() ==0) C.pop_back();

return C;

}

```

```cpp

boolcmp(vector<int>&A, vector<int>&B) {

if(A.size() != B.size()) return A.size() > B.size();

for(int i = A.size() -1;i >=0;i--) if(A[i] != B[i]) return A[i] > B[i];

returntrue; // 如果A, B相等 返回true

}

```

### 2.6.4 BI *  I

```c++

// C = A * b, A >= 0, b >= 0;

vector<int> mul(vector<int>&A, intb) {

    vector<int> C;

int t =0;

for(int i =0;i < A.size() || t;i++) {

if(i < A.size()) t += A[i] * b;

        C.push_back(t %10);

        t /=10;

    }

while(C.sie() >1&& C.bacl() ==0) C.pop_back();

return C;

}

```

### 2.6.5 BI * BI

```c++

vector<int> mul(vector<int> &A, vector<int> &B) {

    vector<int> C;

for(int i =0;i < A.size();i++) {

for(int j =0;j < B.size();j++) {

            C[i + j] += A[i] * B[j];

            C[i + j +1] += C[i + j] /10;

            C[i + j] %=10;

        }

    }

while(C.size() >1&& C.back() ==0) C.pop_back();

return C;

}


```

### 2.6.6 BI / I

```c++

vector<int> div(vector<int>&A, intb, int&r) {    // r为余数

    vector<int> C;

    r =0;

for(int i = A.size() -1;i >=0;i--) {  // 除法从最高位开始看

        r = r *10+ A[i];  // 将余数向左移一位  再加上当前这一位

        C.push_back(r / b);

        r %= b;

    }

reverse(C.begin(), C.end());

while(C.size >1&& C.back ==0) C.pop_back();

return C;

}


/* input */

string a;int b,vector<int> A;int r;

auto res =div(A, b, r);

```

## 2.7 前缀和

### 2.7.2 二维前缀和

```c++

//二维前缀和 

// 1.s[i, j] 计算 s[i, j] = s[i - 1, j] + s[i, j - 1] - s[i - 1, j - 1] + a[i, j]

// 2.(x1, y1), (x2, y2) 这一子矩阵所有数的和s[x2, y2] - s[x1 - 1, y2] - s[x2, y1 - 1] + s[x1 - 1, y1 - 1];

```

### 2.8 二分查找

```c++

// 查找第一个大于等于 x 的元素的位置。

intlower_bound(intg[],intlen, intx) {

int l =-1,r = len;

while(l +1< r) {

int mid = (l + r) >>1;

if(g[mid] < x) l = mid;

else r = mid;

    }

return r;

}

```

```c++

// 查找最后一个小于等于 x 的元素的位置。

intupper_bound(intg[],intlen, intx) {

int l =-1,r = len;

while(l +1< r) {

int mid = (l + r) >>1;

if(g[mid] <= x) l = mid;

else r = mid;

    }

return l; // 返回分界线左边

}

```

### 标准模版

### 2.3.1 $\geq x$

寻找左边界

```cpp

// a[ ]为储存数据的有序递增数组

// l ~ r为二分查找的数组范围

int l =0, r = n -1;

while (l < r)

{

int mid = (l + r) /2;

if (a[mid] >= x)

        r = mid;

else

        l = mid +1;

}

```

### 2.3.2 $\leq x$

```cpp

// a[ ]为储存数据的有序递增数组

// l ~ r为二分查找的数组范围

int l =0, r = n -1;

while (l < r)

{

int mid = (l + r +1) /2;  // 向上取整

if (a[mid] <= x)

        l = mid;

else

        r = mid -1;

}

```

# 3 数据结构 Data Structure

### 3.1 模拟队列

```c++

// 先进先出


// 在队尾插入元素, 在队头弹出元素

int q[N], hh, tt =-1;


// 插入

q[++tt] = x;


//弹出

q[hh++];


// 判断队列是否为空

if(hh <= tt) not empty

else empty;


// 取出队头元素

q[hh];

```

### 3.2 模拟栈

```c++

// 先进后出 / 后进先出


int stk[N], tt; // tt 为栈顶下标


// 插入

stk[++tt] = x;


// 弹出

tt--;


// 判断栈是否为空

if(tt >0) not empty

else empty


// 栈顶

stk[tt];

```

### 3.3 并查集

### 3.3.1 路径压缩

```c++

// 1.将两个集合合并

// 2询问两个元素是否在一个集合当中

// 基本原理: 每个集合用一棵树来表示, 树根的编号就是整个集合的编号, 每个节点存储它的父节点, p[x]表示x的父节点


// Q1: 如何判断树根 -> p[x] = x;

// Q2: 如何求x的集合编号 while(p[x] != x) x = p[x];

// Q3: 如何合并两个集合: px是x的集合编号, py是y的集合编号 p[x] = y;

int p[MAX];

voidinit(intn) {

for(int i =1;i <= n;i++) f[i] = i;

}

intfind(intx) {   // 返回x的祖宗节点 + 路径压缩

if(p[x] != x) p[x] =find(p[x]);

return p[x];

}

voidmerge(inti, j) {  // 合并

    f[find(i)] =find(j);   // find(i)返回i的祖宗节点 find(b)返回b的祖宗节点

  //i的祖宗节点的父亲 = b的祖宗节点

}

```

# 4 数论 Number theory

## 4.1 算术基本定理 Fundamental theorem of arithmetic

定理：任何一个大于 $1$ 的自然数 $N$，如果 $N$ 不为质数，那么 $N$ 可以唯一分解成有限个质数的乘积 $N=P_1^{a_1}P_2^{a_2}P_3^{a_3}\cdots P_n^{a_n}$，$P_1<P_2<P_3<\cdots<P_n$ 且均为质数，$a_1,a_2,a_3,\cdots,a_n$ 均为正整数。

推论：一个大于 $1$ 的整数 $N$，如果它的标准分解式为 $N=P_1^{a_1}P_2^{a_2}P_3^{a_3}\cdots P_n^{a_n}$，那么它的正因数个数为 $\sigma_0(N)=(1+a_1)(1+a_2)\cdots(1+a_n)$

### 4.2.1 求约数个数 / 求正因数个数

```c++

constint mod =1e9+7;

intmain() {

    unordered_map<int, int> primes; // 存所有的底数和指数

int x;

for(int i =2;i <= x / i;i++)

while(x % i ==0) { // 若能被整除

            x /= i;

            primes[i] ++;   // 质因数 i 的个数 +1

        }

if(x >1) primes[x]++;

    LL res =1;

for(auto prime : primes) res = res * (prime.second +1) % mod;  // mod的性质：(a + b) % p = (a % p + b % p) % p

      //auto prime = pair<int, int> prime;

    cout << res;

}

```

### 4.2.2 约数和定理

根据唯一分解定理，容易推导出约数和定理，设 $sum(N)$ 为 $N$ 的正约数之和：

$$
sum(N) = (1 + p_1 + p_1^2 + \dots + p_1^{a_1}) \times (1 + p_2 + p_2^2 + \dots + p_2^{a_2}) \times\dots\times (1 + p_m + p_m^2 + \dots + p_m^{a_m})
$$

和约数个数定理的理解类似，就是对于第 $i$ 个质因子 $p_i$，可以选 0, 1, 2, …, $a_i$ 个，共 (1 + $a_i$) 种选法，而选择  $j$  个  $p_i$ 对于答案的贡献为 $p_i^j$ 。 对于上述的式子，利用乘法分配律，可以不重不漏地选出所有的可能的组合。

```c++

LL res =1;

for(auto prime : primes) {

int p = prime.first, a = prime.second; // p为底数 a为指数

    LL t =1;

while(a--) t = (t * p +1) % mod;

    // t = 1 -> t = p + 1 -> t = p^2 + p + 1

    res = res * t % mod;

}

cout << res << endl;

```

## 4.2.3 分解质因数

```c++

voiddiv(intx) {

for(int i =2;i <= x / i;i++) {

if(x % i ==0) { // x % i == 0，说明 i 是 x 的一个因数，且 i 是质数从小到大遍历，在之前的循环中已经将 i 的所有因数都除尽了

int s =0;

while(x % i ==0) { // (当找到一个因数 i 满足 x % i == 0 时，会进入内层 while 循环，不断地将 x 除以 i ，直到 x 不能再被 i 整除为止。)当i = 2时 该步可以筛掉 2n 的数 i = 3 筛掉3n的数

                x /= i;

                s++;

            }

printf("%d%d\n", i, s);    // i 为质因数 s 为质因数出现的次数

        }

    }

if(x >1) printf("%d%d\n", x, 1);

puts("");

}

```

## 4.3 欧拉函数 Eular’stotient function

对正整数 $n$，欧拉函数是小于 $n$ 的正整数中与 $n$ 互质的数的数目，记作 $\varphi(n)$。

若 $n$ 有标准分解 $p_1^{k_1}p_2^{k_2}\cdots p_r^{k_r}$，其中 $p_i$ 为互异的质因子，$k_i\geq1$ 为质因子的次数。则欧拉函数的值为：

$$
\varphi(n)=n(1-\frac{1}{p_1})(1-\frac{1}{p_2})\cdots(1-\frac{1}{p_r})
$$

需要注意：$\varphi(1)=1$

## 4.3.1 容斥原理

$$
N - \frac{N}{p_1} - \frac{N}{p_2} - \cdots - \frac{N}{p_k} 

+ \frac{N}{p_1p_2} + \frac{N}{p_1p_3} + \cdots

- \frac{N}{p_1p_2p_3} - \frac{N}{p_1p_2p_4} - \cdots

+ \frac{N}{p_1p_2p_3p_4}
$$

## 4.3.2 朴素法

时间复杂度：$O(\sqrt{n})$

```c++

int a;

cin >> a;

int res = a;

for(int i =2; i <= a / i;i++) {

if(a % i ==0) {    // 找到质因子

        res = res / i * (i -1);    // res / i 确保能被整除

                                    // 同时先做除法防止溢出

while(a % i ==0) a /= i;

/* 将 a 中所有的质因数 i 都除掉，确保后续不会再次处理相同的质因数 */

    }

if(a >1) res = res / a * (a -1);

    cout << res << endl;

}

```

$$
res = res\times(1 - \frac{1}{p}) = res\times\frac{p - 1}{p} = res / p\times(p - 1)
$$

## 4.3.3 筛法

时间复杂度：$O(n)$

该方法求得 $1\sim n$ 的所有欧拉函数值

$$
φ(ab)=\frac{φ(a)φ(b)gcd(a,b)}{φ(gcd(a,b))}
$$

### 4.4.1 组合数学

$$
C_{n}^m=\binom{n}{m}=\frac{n!}{m!(n - m)!}\\\\

C_{n}^m = C_{n - 1}^m+C_{n - 1}^{m - 1}
$$

# 5 知识点补充

*1.* 判断整数中是否包含某个数字

```c++

#include<string>

boolisValid(intnum) {

    string s =to_string(num);

return s.find('2') == string::npos && s.find('4') == string::npos;

    // 不包含返回 true 包含返回 false

}

```

*1.1* **`s.find('num') == string :: npos`**  (no position)

    用于表示“未找到”或“无效位置”。 -> true

    用来表示在字符串中查找某个子串或字符时，如果没有找到匹配项，返回的值。

*1.2* **`to_string(num)`**  将整数转换为字符串

*1.3*

- 二维数组和一维数组的下标转换公式：
- 二维转一维：`index = i * col(列x) + j(y)`
- 一维转二维：`i = index / col(x); j = index % col(x)`  除以列  / 对列取余
- 设一维数组下标为index，二维数组长度为m * n，则：

  **一维数组转换为二维数组**

  ```c

  ```

row = index / n

col = index % n

    ```

    **二维数组转换为一维数组**

    ```c

index = col + row * n

    ```
