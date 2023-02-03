# Notes


## 接口幂等性的保证方法：
幂等性指多次调用同一接口获得的结果相同，此处考虑如何在高并发场景下限制其重复操作。

1. 分布式锁，获取锁进行业务操作，可以使用redisson等框架。在业务执行完毕后释放锁
2. 数据库乐观锁，根据version限制其多次更新
3. 系统生成唯一token，在分布式系统中对于一个id生成唯一token并直接写入redis，第一次操作完成后直接删除redis中的token，后续操作发现redis中没有对应的token可以直接返回错误信息。
## 缓存穿透
解决:将null结果进行缓存，并加入短暂过期时间
## 缓存雪崩
缓存雪崩是指缓存同一时间大面积的失效，所以，后面的请求都会落到数据库上，造成数据库短时间内承受大量请求而崩掉。
解决：
1.缓存数据的过期时间设置随机，防止同一时间大量数据过期现象发生
2.一般并发量不是特别多的时候，使用最多的解决方案是加锁排队
## 缓存击穿
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1663839297887-7033cd09-11d7-4550-98c2-8d8e3f8a19c5.png#averageHue=%23e4e9e3&clientId=u24e8470d-792d-4&errorMessage=unknown%20error&from=paste&id=u764cb4c4&name=image.png&originHeight=533&originWidth=975&originalType=url&ratio=1&rotation=0&showTitle=false&size=392279&status=error&style=none&taskId=ued196f3e-ed38-4397-b6e8-b6819b0c4f0&title=)
单体应用，如果本地不加同步锁的时候，在高并发的情况下，会发生线程安全问题。
单体应用，如果加上本地锁的时候，在高并发情况下，可以解决安全问题，但是效率会变低，所以就有分布式锁
## 读写锁
在实际的业务场景中，其实会有很多读多写少的场景，那么对于这种场景来说，使用独占锁来加锁，在高并发场景下会导致大量的线程加锁失败，阻塞，对系统的吞吐量有一定的影响，为了适配这种读多写少的场景，Redisson也实现了读写锁的功能。
读写锁的特点：
1）读与读是共享的，不互斥
2）读与写互斥
3）写与写互斥
分布式可重入读写锁允许同时有多个读锁和一个写锁处于加锁状态。
## 缓存一致性问题的解决方案
缓存一致性一般使用双写方案，更新数据库之后删除缓存。
**先操作数据库，再删除缓存（线程不安全的可能性较低）使用这种方案的同时用超时剔除作为兜底**

分布式缓存中使用分布式锁对单个缓存进行操作。
总结：
3、更新数据库 + 更新缓存方案，在「并发」场景下无法保证缓存和数据一致性，解决方案是加「分布锁」，但这种方案存在「缓存资源浪费」和「机器性能浪费」的情况

4、采用「先删除缓存，再更新数据库」方案，在「并发」场景下依旧有不一致问题，解决方案是「延迟双删」，但这个延迟时间很难评估

5、采用「先更新数据库，再删除缓存」方案，为了保证两步都成功执行，需配合「消息队列」或「订阅变更日志」的方案来做，本质是通过「重试」的方式保证数据最终一致

6、采用「先更新数据库，再删除缓存」方案，「读写分离 + 主从库延迟」也会导致缓存和数据库不一致，缓解此问题的方案是「延迟双删」，凭借经验发送「延迟消息」到队列中，延迟删除缓存，同时也要控制主从库延迟，尽可能降低不一致发生的概率


## Elasticsearch 
### 数据类型问题 
使用过程中index数据类型注意要和项目中entity一致
### 连接
连接时需要初始化client并且在使用完毕后关闭client


## Java8
### ::
双冒号运算符一般用在lambda类运算的情况下，多数时候创建一个匿名类只是为了调用其内部的一个方法，在此时可以直接使用::进行调用
使用lambda表达式会创建匿名方法， 但有时候需要使用一个lambda表达式只调用一个已经存在的方法（不做其它）， 所以这才有了方法引用！

以下是Java 8中方法引用的一些语法：

静态方法引用（static method）语法：classname::methodname 例如：Person::getAge
对象的实例方法引用语法：instancename::methodname 例如：System.out::println
对象的超类方法引用语法： super::methodname
类构造器引用语法： classname::new 例如：ArrayList::new
数组构造器引用语法： typename[]::new 例如： String[]:new

### Stream
**6.1、filter**
filter方法用于通过设置的条件过滤出元素。以下代码片段使用filter方法过滤出空字符串。
复制
```java
List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");  

List<String> filtered = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList());  
```

**6.2、limit**
limit方法用于获取指定数量的流。以下代码片段使用limit方法打印出 10 条数据：
复制
```
Random random = new Random();  

random.ints().limit(10).forEach(System.out::println);  
```

**6.3、sorted**
sorted方法用于对流进行排序。以下代码片段使用sorted方法对集合中的数字进行排序：
复制
```
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);

numbers.stream().sorted().forEach(System.out::println);  
```

**6.4、map**
map方法用于映射每个元素到对应的结果，以下代码片段使用map输出了元素对应的平方数：
复制
```
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);  // 获取对应的平方数 

List<Integer> squaresList = numbers.stream().map( i -> i*i)
																						.distinct().collect(Collectors.toList());  
```

**6.5、forEach**
forEach方法用于迭代流中的每个数据。以下代码片段使用forEach输出集合中的数字：
复制
```
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);  

numbers.stream().forEach(System.out::println);  
```

**6.6、Collectors**
Collectors类实现了很多归约操作，例如将流转换成集合和聚合元素。Collectors可用于返回列表或字符串：
复制
```
List<String>strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl"); 

List<String> filtered = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList());    

System.out.println("筛选列表: " + filtered);  

String mergedString = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.joining(", "));  

System.out.println("合并字符串: " + mergedString);  
```

**6.7、统计**
一些产生统计结果的收集器也非常有用。它们主要用于int、double、long等基本类型上，它们可以用来产生类似如下的统计结果：
复制
```java
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);     

IntSummaryStatistics stats = numbers.stream().mapToInt((x) -> x).summaryStatistics();    

System.out.println("列表中最大的数 : " + stats.getMax());  

System.out.println("列表中最小的数 : " + stats.getMin());  

System.out.println("所有数之和 : " + stats.getSum());  

System.out.println("平均数 : " + stats.getAverage());  

```

**6.8、并行(parallel)程序**
parallelStream是流并行处理程序的代替方法。以下实例我们使用 parallelStream来输出空字符串的数量：
复制List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");  // 获取空字符串的数量  long count = strings.parallelStream().filter(string -> string.isEmpty()).count(); 

**Optional 类**
Java应用中最常见的bug就是空值异常。在 Java 8 之前，Google Guava 引入了 Optionals 类来解决 NullPointerException，从而避免源码被各种 null 检查污染，以便开发者写出更加整洁的代码。Java 8 也将 Optional 加入了官方库。

## 泛型 
关于<T> 和<?>
[https://blog.csdn.net/csdn_aiyang/article/details/107154081](https://blog.csdn.net/csdn_aiyang/article/details/107154081)
总结：一般来讲<T>用于泛型类的定义，因为定义一般需要类型较为确定，泛型方法的使用可以使用<?> 因为类型不一定确定

## 
## 序列化



