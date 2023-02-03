# JVM


JVM stands for Java Virtual Machine.

1. Write Once Run Anywhere
2. Automatic memory management and garbage collection mechanism
3. Array out of bounds detection

### Program counter register
To store the address of next command in JVM.
#### Features:

1. Thread safe. Every thread has its own time slices and will be executed when it is its turn.
2. No memory overflow problem. 

### JVM stacks
**Allocated per thread as well**
Every thread in the JVM needs memory, it is called frame. Every stack is made of multiple frames, it corresponds to the memory when the method is running. Every thread has only one **active **frame. Which means when the method is running it will be pushed into the stack and popped out when finished.
##### Question: 

1. Are stacks involved in GC process?

No, the finished method will be popped out when finished, no need to do grabage collection.

2. Is it true that the bigger the stack is the better it works?

No. Because physical memory is fixed. Bigger memory supports more recursion but less threads.

3. Thread safe?

If 2 threads modify the same static variable. It's not thread safe. But for local variables, it's thread safe.

4. Stack overflow

There are too many frames in the stack(infinite recursion). Or the single frame takes too much memory(not common).
The memory for a Java Virtual Machine stack does not need to be contiguous.
The variables that are not created objects and reference variables are stored in stack.
> int i = 1;
> Test test = new Test();// Variable test is in stack, while the true new Test() is in heap.
> Test myTest = new Test(1, 1, 2);// 1 1 2 are stored in stack. 

### Native Method stacks
Some native methods written in C or C++ are stored here to directly interact with underlying hardware.
clone wait notify hashCode

### Heap
A place to store almost all of the **objects**.(new Objects ...)(largest memory consumer)
Arrays lists
##### Features:

1. The Java Virtual Machine has a heap that is **shared **among all Java Virtual Machine threads.
2. The main GC area.
3. -Xmx -Xms to distribute heap memory(default 1/64 of the physical memory).

Heap put of memory case: adding infinite number of elements into a list.
jps, jmao and jconsloe are used to diagnose the heap memory.

### Method Area
Created when the JVM is on.The memory for a Method area does not need to be contiguous. Shutting down JVM will release the memory of MA.
The size of MA deetermines how many classes cam be stored in the system. Too many definitions of classes will tigger out of memory error.
this area stores all the compiled code. It stores per-class structures such as the run-time constant pool, field and method data, and the code for methods and constructors.
> Class, Interface, enum, annotation
> Type Information: (class, interface, enum, annotation)JVM must store the following type information in the method area: 
> 1. the full and valid name of this type (full name = package name. Class name) 
> 2. the full valid name of the direct parent class of this type (neither interface nor java. lang.Object has a parent class) 
> 3. Access modifiers of this type (a subset of public, abstract, and final) 
> 4. an ordered list of direct interfaces of this type 
> 
Domain Information (member variables): 
> 1. the JVM must store information about all domains of the type and the declaration order of the domains in the method area. 
> 2. Domain information includes domain name, domain type, and domain modifier (a subset of public, private, protected, static, final, volatile, and transient). 
> 3. Method information: the JVM must store the following information about all methods, including the declaration order as the domain information. 
> 
Method 
> 1. method return type (or void) 
> 2. number and type of method parameters in sequence 
> 3. method modifiers (a subset of public, private, protected, static, final,synchronized, native, and abstract)
> 4. Method bytecode (bytecodes), operand stack, local variable table, and size (except abstract and native methods) 
> 5. exception tables (except abstract and native methods) 


- Jdk 1.6 and earlier: permanent generation (static variables are stored on permanent generation), string constant pool (1.6 in method area) 
- Jdk 1.7: it has permanent generation, but has been gradually "removed from permanent generation". String constant pools and static variables are removed and stored in the heap. 
- Jdk 1.8 and later: no permanent generation, constant pool 1.8 in the meta space. However, static variables and string constant pools are still in the heap.


Why replace permanent generation with meta space? 
It is difficult to determine the size of the permanent generation setting space: (1) the permanent generation parameter setting is too small. In some scenarios, if there are too many dynamically loaded classes, OOM in the Perm area is easy to occur. For example, in an actual Web project, because there are many function points, many classes need to be dynamically loaded continuously during the running process, and fatal errors often occur. 
(2) the permanent generation parameter is too large, resulting in a waste of space. 
(3) by default, the size of the metadata is limited by the local memory) 
it is difficult to perform optimization in permanent generation: (garbage collection in the method area mainly recycles two parts: discarded constants in the constant pool and types that are no longer used, while classes that are no longer used or class loaders are complex to recycle, and full gc takes a long time)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1660156037484-0a46e9be-9f35-432c-b366-975a0a0e2869.png#clientId=u7bc9efad-5467-4&from=paste&height=476&id=u496402a1&name=image.png&originHeight=656&originWidth=962&originalType=binary&ratio=1&rotation=0&showTitle=false&size=161804&status=done&style=none&taskId=u66505260-282d-41cc-a88f-6efe3b2c156&title=&width=698)
StringTable is put in heap after Java 1.8.
StringTable为什么要调整?
jdk7中将StringTable放到了堆空间中。因为永久代的回收效率很低,在full gc的时候才能触发。而full gc是老年代的空间不足、永久代不足才会触发。这就导致StringTable回收效率不高,而我们开发中会有大量的字符串被创建,回收效率低,导致永久代内存不足,放到堆里,能及时回收内存。
object.intern()// If the object already exists in the Stringtable, it will return the var in the ST.
// if not, it will try to add the object into CP
****In java 1.6, intern() simply make a copy of the object and store it into the CP, not object itself.**
Overflow: permanent generation before 1.8 metaspace after 1.8
#### Constant pool
.class file not real object
JVM use constant pool as a table to find **class name, methods and variables.**
#### **Run-time Constant Pool**
When a class is loaded, its constants will be put into runtime constant pool. Their real address will be recorded in the RTCP(in constant pool it is not the real address)
Mainly to types:

1. Normal constans: String, final variables.
2. Name of classes and interfaces, names of fields(abc xyz) and their descriptor(private protected), names of methods and their descriptors.

****After 1.8, StringTable and static variables are in heap.**
#### StringTable(in heap)
Variables in StringTable are the index of String objects. The real Strings are still stored in the heap as well. 
In the heap means GC will be conducted when memory is short.
before 1.8, Stringtable is in CP.
Normal GC.
To optimize, ajust the bucket size to be larger.
##### Stringtable vs Constant pool

- The string in the constant pool is only a symbol, only **converted to an object only when it is used. **
- The string pool mechanism is used to avoid repeatedly creating string objects. (**Non-duplicate)**
- String **variable **the principle of splicing is **StringBuilder **
- string **constant **the principle of splicing is **compiler optimization **
- can be used **intern method **, actively put string objects that are not in the string pool into the string pool

All objects in ST and CP.
Lazy loading: When executed to the line where the String is, it will be loaded.
> String ab = "ab";// 串池之中
> String ab1 = "a" + "b"
> String ab2 = a+b;// 堆内存之中
> 
> // 结果为false,因为ab是存在于串池之中，ab2是由StringBuffer的toString方法所返回的一个对象，存在于堆内存之中
> System.out.println(ab == ab2);
> 		
> String ab2 = a+b;// StringBuilder().append(“a”).append(“b”).toString()
> 		// 使用拼接字符串的方法创建字符串		
> String ab3 = "a" + "b";// String ab (javac 在编译期进行了优化)
> ab3 = ab1
> 
> [
](https://blog.csdn.net/weixin_43591980/article/details/116068011)

Concatenating "a" and "b" if "ab" is already in the pool.it is the same as ab = "ab"
Concatenating a and b, because they are variables, need to use StringBuilder.
#### GC in NA
Unused class and dicarded constants.
Unused class is extremely hard to be determined.

1. all of its objects are recycled
2. classloader is recycled
3. class is not used or referenced anywhere else.
### Direct Memory(Not controlled by JVM)
Direct memory is a memory section which Java code and OS can both access(efficient)
**Requesting direct memory needs to be conducted manually. Release is manually conducted not automatic GC process.**
**Reason:**
more efficient and better I/O performance.

### JVM GC

1. Reference counting(Deprecated) if a and b have circular dependency, the memory won't be collected.
2. Reachability Analysis: Use algo to determine whether an object in heap is referenced, if not, recycle it. Need a GC root first(the object that definitely can't be recycled.). Object that can be GC root:
   1. Object in stack
   2. Static reference in NA
   3. Reference contants in NA
   4. JNI reference objects in local stack.

       reference types:

   1. Strong: new object,  a = b (When it is not referenced by any object, it will be recycled.) Even if the memory is short, JVM will throw outofmemory instead of recycle it.
   2. Soft:  will be recycled when memory is not enough. SoftReference<xxx>
   3. Weak: WeakReference<xxx> will be recycled when GC.
      1. Soft and weak reference will be sent into reference list when the object is gone(list is used to store soft and weak reference when we neeed to remove them).
   4. PhatomRefence and fina**l(Use finalize() method to init)** reference need to be used with a list. They will be sent into reference list when the object is gone. Cleaner will regularly scan the list to remove reference.

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1660163964575-903b816d-3133-4f7e-b14c-5d30fddc3664.png#clientId=ud449edd4-c6cc-4&from=paste&height=251&id=u6fcac415&name=image.png&originHeight=502&originWidth=1014&originalType=binary&ratio=1&rotation=0&showTitle=false&size=141785&status=done&style=none&taskId=u2d0c3ed2-268f-49fc-a5be-fb1b8c53ce8&title=&width=507)

- 如上图，B对象不再引用A4对象。这是终结器对象就会被放入引用队列中，引用队列会根据它，找到它所引用的对象。然后调用被引用对象的finalize()方法。调用以后，该对象就可以被垃圾回收了。
##### 引用队列

- 软引用和弱引用**可以配合**引用队列(也可以不配合)：
   - 在**弱引用**和**虚引用**所引用的对象被回收以后，会将这些引用放入引用队列中，方便一起回收这些软/弱引用对象。
- 虚引用和终结器引用**必须配合**引用队列：
   - 虚引用和终结器引用在使用时会关联一个引用队列。

强引用：无论内存是否足够，不会回收。

软引用：内存不足时，回收该引用关联的对象。(可以选择配合引用队列使用，也可以不配合)。

弱引用：垃圾回收时，无论内存是否足够，都会回收。(可以选择配合引用队列使用，也可以不配合)。

虚引用：任何时候都可能被垃圾回收器回收。(必须配合引用队列使用)。

#### GC algorithm

1. Mark and Sweep： Mark all reachable objects and sweep the rest.

drawback: Resulting large amount of fragmental memory pieces, hard to allocate memory for large object. 
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1660164611819-420f70a9-3571-4ce0-94c0-5e0082425dd0.png#clientId=ud449edd4-c6cc-4&from=paste&height=869&id=u3c209b55&name=image.png&originHeight=590&originWidth=339&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84105&status=done&style=none&taskId=ucd0e8c42-24f5-453f-adac-3f6f8a2aab1&title=&width=499.5): 

2. Mark and compact

Mark and sweep with compacting memory pieces. Good for large objects but less efficient.

3. Copying

Copy used objects to another memory area and release all of the old area. Easy but smemory consuming.

4. Generational Collection(Common)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1660165169418-fd2c644d-f726-4d76-b44e-6bc9e940f9b2.png#clientId=ud449edd4-c6cc-4&from=paste&height=138&id=u31dfdf03&name=image.png&originHeight=275&originWidth=1114&originalType=binary&ratio=1&rotation=0&showTitle=false&size=68543&status=done&style=none&taskId=ud42b7305-428a-4df9-9471-b7bcf7ab546&title=&width=557)

新创建的对象首先会被分配在伊甸园区域。
新生代空间不足时，触发Minor GC，伊甸园和 FROM幸存区需要存活的对象会被COPY到TO幸存区中，存活的对象寿命+1，并且交换FROM和TO。
Minor GC会引发 Stop The World：暂停其他用户的线程，等待垃圾回收结束后，用户线程才可以恢复执行。
当对象寿命超过阈值15时，会晋升至老年代。
如果新生代、老年代中的内存都满了，就会先触发Minor GC，再触发Full GC，扫描新生代和老年代中所有不再使用的对象并回收。

#### GC




[
](https://blog.csdn.net/weixin_43591980/article/details/116068011)
[
](https://blog.csdn.net/weixin_43591980/article/details/116068011)

