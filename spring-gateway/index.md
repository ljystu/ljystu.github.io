# Spring Cloud Gateway


Using spring cloud gateway can quickly build an API gateway, but before that, let’s introduce some special concepts involved in using spring cloud gateway framework, so as to deepen the understanding of spring cloud gateway and facilitate the later use.

- Routing: it is a basic component in spring cloud gateway. It is usually composed of an ID, a target URI, and a series of predicates and filters.
- Predicate: it is the predicate object of Java 8 function library. The specific type isPredicate<ServerWebExchange>It is used to match data information on HTTP request, such as request header information and request body information. If the assertion for a request is true, then the route it is associated with is successful, and then the request is processed by the route.
- [Filter](https://developpaper.com/tag/filter/): a component used to modify the request or response of a route. In spring cloud gateway, the gatewayfilter interface should be implemented, and it should be constructed by a specific implementation class based on gatewayfilterfactory.


The filters of spring cloud gateway are executed in an orderly manner, and the execution order is determined by the size of the order value. The smaller the value is, the higher the priority is, and the earlier the execution is.
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1657722151931-15d03403-bdd6-4bf4-b438-25dcb1a0c02b.png#clientId=u4bb77d31-9a31-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=390&id=u67f8c52d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=399&originWidth=654&originalType=binary&ratio=1&rotation=0&showTitle=false&size=135789&status=done&style=none&taskId=ue553220a-c0c2-4a5f-a97c-8c797cd8417&title=&width=639)
Order number of Gateway filter and default filter are default numbers starting from 1.
When numbers of different gateway are the same, the order will be Defaultfilter->gateway filter->global filter

