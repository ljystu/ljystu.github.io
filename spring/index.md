# Spring


## AOP
AOP（Aspect orietend programming）面向切面编程
AOP是对OOP的一种完善，OOP引入了封装多台和继承来建立对象层次结构，但是对于水平结构则显得无能为力，例如在同一个对象的核心功能中的代码重复性（日志，权限）。
AOP使用横切的技术将与业务无关但是被业务共同调用的逻辑封装起来，降低模块耦合度，有利于可操作性和可维护性。
Aspect 切面
Joint point 连接点 在应用执行过程中能够插入切面的一个点，可以是调用前后和方法抛出异常后。
Pointcut 切点

[十分钟全面理解Spring AOP - 简书](https://www.jianshu.com/p/007bd6e1ba1b)

AOP使用例子：
自定义annotation
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RefreshEsMqSender {
    String sender();

    String msg() default "send refresh msg to ElasticSearch";

}
```
使用@interface自定义注解，可以用这个注解来作为切点
[https://www.cnblogs.com/liaojie970/p/7879917.html](https://www.cnblogs.com/liaojie970/p/7879917.html) 
Interface用法
Aspect：
使用AOP特性发送rabbitmq消息：
```java
@Aspect
@Component
public class RefreshEsMqAspect {

    @Resource
    private RabbitMqUtils rabbitMqUtils;

    //对于使用注解RefreshMqSender的方法进行切点注册
    @Pointcut("@annotation(cn.dblearn.blog.common.mq.annotation.RefreshEsMqSender)")
    public void pointCut() {

    }

    @Around("pointCut()")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        //执行方法
        Object result = point.proceed();
        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod();
        RefreshEsMqSender senderAnnotation = method.getAnnotation(RefreshEsMqSender.class);
        // 发送刷新信息
        rabbitMqUtils.send(RabbitMqConstants.REFRESH_ES_INDEX_QUEUE, senderAnnotation.sender() + " " + senderAnnotation.msg());
        return result;
    }
}

```
使用了RefreshMqSender的方法例子：
```java
@PutMapping("/update")
@RequiresPermissions("article:update")
@CacheEvict(allEntries = true)
@RefreshEsMqSender(sender = "dbblog-manage-updateArticle")
public Result updateArticle(@RequestBody ArticleDTO article){
    ValidatorUtils.validateEntity(article);
    articleService.updateArticle(article);
    return Result.ok();
}
```

