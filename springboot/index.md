# SpringBoot


# SpringBoot

## @Configuration

### 组件添加

源码重点：
postProcessBeanDefinitionRegistry
每个registryId唯一 调用processConfigBeanDefinitions将registry中Bean进行加载

processConfigBeanDefinitions中
ConfigurationClassUtils判断full或者lite 有@configuration则为完整的配置类

对于代理Bean的方法中 分为Full和Lite
Full: @configuration(procyBeanMethods=true) 保证每个@Bean方法被调用返回的组件是单实例的(默认方式)

Lite: @configuration(procyBeanMethods=false) 每个@Bean方法调用的组件都是新创建的
Lite模式难以声明Bean之间的依赖

##### 重要：
如果存在不同@Bean之间的组件依赖 必须使用Full模式 其他使用Lite模式启动更加迅速

##### 总结：

@Configuration的注解类标识这个类可以使用Spring IoC容器作为bean定义的来源。

@Bean注解告诉Spring，一个带有@Bean的注解方法将返回一个对象，该对象应该被注册为在Spring应用程序上下文中的bean。

@ComponentScan的功能其实就是自动扫描并加载符合条件的组件（比如@Component和@Repository等）或者bean定义，最终将这些bean定义加载到IoC容器中。

@EnableAutoConfiguration会根据类路径中的jar依赖为项目进行自动配置，如：添加了spring-boot-starter-web依赖，会自动添加Tomcat和Spring MVC的依赖，Spring Boot会对Tomcat和Spring MVC进行自动配置。



#### @ImportResource(classpath:)

若存在较老的组件或使用xml配置的组件，使用此方式引入依赖



## 配置绑定

当需要将properties文件中的配置（例：数据库）解析至Bean中 使用以下注解

1. @Component+@ConfigurationProperties(prefix="") 只有在容器中的组件才有需要用的功能 记得利用component注解将其加入容器中
2. @EnableConfigurationProperties(xx.class) 开启xx的配置绑定功能 并且将xx组件注册到容器中

重点：

##### @EnableAutoConfiguration

###### @AutoConfigurationPackage 

利用register 将一个包中的所有组件注册（默认MainApplication所在的包）

###### Import(AutoConfigurationEntry)

每次springboot启动时会导入所有场景的自动配置文件 

xxxAutoConfiguration  基础配置文件总共127个

但并不是每次导入的配置都会生效，源码内部配合@Conditional注解进行限制加载（按需加载）



## 默认配置

springboot首先加载所有自动配置类 自动配置类按照条件生效 默认配置类都绑定了文件的值，xxxProperties里面拿 和配置文件进行了绑定

生效的配置类给容器装配置组件 因而实现功能

xxxAuto Configuration --> 组件 --> xxxProperties中拿值 --> applicatio.properties

在默认配置中，使用了大量@conditional 以用户配置优先，用户没有进行配置则使用springboot装配的组件

用户想要定制化进行配置的方法主要有两种：1用户直接自己@Bean替换底层组件 2用户去看这个组件货去的配置文件值并且进行修改



## Web开发

静态资源的访问首先找Controller内部能否处理，如果不能则交给静态资源处理器（在静态资源文件夹下寻找）




