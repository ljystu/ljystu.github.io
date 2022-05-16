# backtracking summary


回溯法，一般可以解决如下几种问题：

- 组合问题：N个数里面按一定规则找出k个数的集合
- 切割问题：一个字符串按一定规则有几种切割方式
- 子集问题：一个N个数的集合里有多少符合条件的子集
- 排列问题：N个数按一定规则全排列，有几种排列方式
- 棋盘问题：N皇后，解数独等等

模板：
```java
void backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
//for循环横向遍历
//递归纵向遍历
```
**for循环横向遍历，递归纵向遍历，回溯不断调整结果集**

### 组合
组合中使用 startindex 控制遍历顺序
[回溯算法：求组合问题！(opens new window)](https://programmercarl.com/0077.%E7%BB%84%E5%90%88.html)**剪枝精髓是：for循环在寻找起点的时候要有一个范围，如果这个起点到集合终止之间的元素已经不够题目要求的k个元素了，就没有必要搜索了**。

关键：去重!
在candidates[i] == candidates[i - 1]相同的情况下：

- used[i - 1] == true，说明同一树枝candidates[i - 1]使用过
- used[i - 1] == false，说明同一树层candidates[i - 1]使用过

利用used[i - 1] == false 效率更高。

### 子集问题
注意：子集问题中数组要排序

递增子序列中不能直接按照默认升序进行解答，需要used数组进行去重

[回溯算法：求子集问题（二）(opens new window)](https://programmercarl.com/0090.%E5%AD%90%E9%9B%86II.html)**也可以使用set针对同一父节点本层去重，但子集问题一定要排序，为什么呢？**
我用没有排序的集合{2,1,2,2}来举个例子画一个图，如下：
![2020111316440479.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1651916735858-2c0abab5-6362-44ef-9973-64a0ee84d745.png#clientId=u2146c5ac-cbaf-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=ua69033ab&margin=%5Bobject%20Object%5D&name=2020111316440479.png&originHeight=802&originWidth=1136&originalType=binary&ratio=1&rotation=0&showTitle=false&size=143673&status=done&style=none&taskId=udf2ac366-0780-4cc6-a001-b4ca4347383&title=)

### 排列问题
**排列问题的不同：**

- 每层都是从0开始搜索而不是startIndex
- 需要used数组记录path里都放了哪些元素了

去重时使用used数组，效率较高，优于使用set

### 棋盘问题
N皇后
## ![20201118225433127.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1651916827858-63619790-956a-4e52-be7b-fe93eddd10e7.png#clientId=u2146c5ac-cbaf-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u2a0659d4&margin=%5Bobject%20Object%5D&name=20201118225433127.png&originHeight=1092&originWidth=1274&originalType=binary&ratio=1&rotation=0&showTitle=false&size=205235&status=done&style=none&taskId=u2e1ef327-8321-4fd0-8283-49529937822&title=)
**棋盘的宽度就是for循环的长度，递归的深度就是棋盘的高度**

**数独**
**二维递归：**
**返回值为bool，在找到正确答案时直接递归返回true。**
### 性能分析
子集问题分析：

- 时间复杂度：O(2^n)，因为每一个元素的状态无外乎取与不取，所以时间复杂度为O(2^n)
- 空间复杂度：O(n)，递归深度为n，所以系统栈所用空间为O(n)，每一层递归所用的空间都是常数级别，注意代码里的result和path都是全局变量，就算是放在参数里，传的也是引用，并不会新申请内存空间，最终空间复杂度为O(n)

排列问题分析：

- 时间复杂度：O(n!)，这个可以从排列的树形图中很明显发现，每一层节点为n，第二层每一个分支都延伸了n-1个分支，再往下又是n-2个分支，所以一直到叶子节点一共就是 n * n-1 * n-2 * ..... 1 = n!。
- 空间复杂度：O(n)，和子集问题同理。

组合问题分析：

- 时间复杂度：O(2^n)，组合问题其实就是一种子集的问题，所以组合问题最坏的情况，也不会超过子集问题的时间复杂度。
- 空间复杂度：O(n)，和子集问题同理。

N皇后问题分析：

- 时间复杂度：O(n!) ，其实如果看树形图的话，直觉上是O(n^n)，但皇后之间不能见面所以在搜索的过程中是有剪枝的，最差也就是O（n!），n!表示n * (n-1) * .... * 1。
- 空间复杂度：O(n)，和子集问题同理。

解数独问题分析：

- 时间复杂度：O(9^m) , m是'.'的数目。
- 空间复杂度：O(n^2)，递归的深度是n^2

