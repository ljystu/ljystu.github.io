# RabbitMQ



1. Decoupling 
1. Event-driven design
1. better performance

### Problems with Synchronous communication(Feign):
1.Coupling
2.can not handle huge amount of requests in a short time(high concurrency).
3.Waste of resources during waiting
4.Cascade failure: service failed, the cluster fails cascadingly

### Asynchronous(Event driven design):
Use Broker to control events. Service publish events and the others subscribed to the broker waiting for events.

Better performance/No cascade failures
**Advantages of asynchronous communication:**

1. Low coupling
1. Improve throughput
1. Fault isolation
1. Flow peaking

**Disadvantages of asynchronous communication:**

1.  Rely on Broker's reliability, security and throughput
1. The architecture is complicated, the business does not have an obvious process line, which is not easy to track and manage.

### Rabbitmq
![Screenshot 2022-07-13 at 21.22.33.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1657740162373-0bdb6942-c61b-49ad-9ee5-01129b7007fb.png#clientId=u02baad95-d9a4-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u0ef18e64&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-13%20at%2021.22.33.png&originHeight=766&originWidth=1958&originalType=binary&ratio=1&rotation=0&showTitle=false&size=563834&status=done&style=none&taskId=u3d10dca7-d1ae-48e8-b56a-19e2709de6d&title=)
**Message sending process for basic message queue:**

1. Establish a connection
1. Create a channel
3. Declare queues using created channels  
3. Use channel to send messages to queues

**Message receiving process for basic message queue:**

1. Establish a connection
1. Create a channel
1. Use the channel to declare the queue
1. Declare consumer method handleDelivery()
1. Use channel to bind consumers to queues

### Spring amqp
Use rabbitTemplate to send and get messages
![Screenshot 2022-07-15 at 19.00.54.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1657904546211-22fbfde7-11ba-4f8b-923b-a091eedb13b8.png#clientId=ucb64d689-3ef6-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=u4cf7d5ab&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-15%20at%2019.00.54.png&originHeight=1112&originWidth=2058&originalType=binary&ratio=1&rotation=0&showTitle=false&size=593392&status=done&style=none&taskId=u66b61b47-bc1f-4df9-9e95-09c3699e9b0&title=)

queues can use same binding key(which makes them fanout exchange)
![Screenshot 2022-07-15 at 20.15.08.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1657908921613-0956a3c9-beff-485b-bd05-d5f0a679c9b8.png#clientId=ucb64d689-3ef6-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=uc6cd8d80&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-15%20at%2020.15.08.png&originHeight=1112&originWidth=2226&originalType=binary&ratio=1&rotation=0&showTitle=false&size=625594&status=done&style=none&taskId=ud21176dc-bdba-479a-842f-f896edafdec&title=)![Screenshot 2022-07-15 at 20.23.21.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1657909413344-62633aa6-227a-42c5-aa7f-970f835b1394.png#clientId=ucb64d689-3ef6-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=uc8c46d47&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-15%20at%2020.23.21.png&originHeight=1112&originWidth=2226&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1007979&status=done&style=none&taskId=u4b8527d5-8485-40e5-8cac-4abb3590783&title=)
Describe the difference between Direct switch and Fanout switch?
Fanout: routes messages to every queue bound to it.
Direct: Determines Which Queue It Is Routed To According To RouteKey.
• If multiple queues have the same RoutingKey, it is similar to Fanout function.
The common annotations based on @RabbitListener annotation declaration queues and switches:
@Queue
@Exchange


### TopicExchange
![Screenshot 2022-07-15 at 20.27.51.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1657909682952-3ab1fc53-b401-4fc4-8db9-83cc75b07f19.png#clientId=ucb64d689-3ef6-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u72bcce2b&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-15%20at%2020.27.51.png&originHeight=1096&originWidth=2212&originalType=binary&ratio=1&rotation=0&showTitle=false&size=850908&status=done&style=none&taskId=u6ea68502-a906-4664-bb85-5fd387eeb40&title=)

In message queues, any object will be serialized. But the performance of the default serialization method(JDK serialization) is not really satisfying(takes too much space).
We can use Jackson converter to improve its performance.
Note: Some bugs may appear while using Jackson converter./
![Screenshot 2022-07-15 at 20.40.59.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1657910603797-36c7068f-c6fb-47a6-b699-dd50ee093cff.png#clientId=ucb64d689-3ef6-4&crop=0&crop=0&crop=1&crop=1&from=ui&id=uf07dfc45&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-15%20at%2020.40.59.png&originHeight=1096&originWidth=2212&originalType=binary&ratio=1&rotation=0&showTitle=false&size=686090&status=done&style=none&taskId=ueeaeb7bf-d015-40b1-ad78-3ea11b7b961&title=)![Screenshot 2022-07-15 at 20.47.07.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1657910837644-0779ec56-05a2-474a-99f7-3be7e4ed28b4.png#clientId=ucb64d689-3ef6-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u30200ce7&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-15%20at%2020.47.07.png&originHeight=1096&originWidth=2212&originalType=binary&ratio=1&rotation=0&showTitle=false&size=707237&status=done&style=none&taskId=ude2b898a-fb88-46a8-8593-c0ea84abeed&title=)**Note: consumer and publisher must be using the same message converter.**

### Reliability
#### publisher confirm:
> publisher-confirm-type = correlate  

Enabling publisher confirms calls back a confirm function to identify whether the process succeeds.
**(Producer to exchange)**
**true: ack**
**false: nack**
To define callback:
> rabbitTemplate.setConfirmCallback() confirm as an anonymous class method
> confirm(CorrelationData, ack, cause)
> ack: whether the exchange have received the message
> correlationData: info can be manually set (id)

#### publisher-return:
exchange to queue: if failed return "return Callback"
> publisher-returns: true
> template:
> mandatory: true

When the **message from the exchange did not get to the queue**, the default mode is throwing the message away, but we can change the mode of returnCallback notify the publisher of the failure.
> rabbbitTemplate.returnsCallback()
> default mode: discard message, not returning     
> the returnedMessage method deals with messages in the exchange but not sent to the queues.

#### Consumer Ack:
> acknowledge = none 

As soon as the consumer receives the message, it send the ack message (No service successfulness confirmation)
> acknowledge = "manual"

Manually use channel.basicAck() to confirm and channel.basicNack() to let the publisher resend the message.
> auto

![Screenshot 2022-07-22 at 15.51.16.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1658497903764-82975af4-b7b7-467e-84ce-d67c8116afd4.png#clientId=u95a468dc-a085-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u5a6834b7&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-22%20at%2015.51.16.png&originHeight=678&originWidth=2286&originalType=binary&ratio=1&rotation=0&showTitle=false&size=470076&status=done&style=none&taskId=u745f30fb-c02a-4c0f-914c-39c70813c2c&title=)
Use republishMessageRecover to bind error message and its routing key.
How to guarantee reliability？

1. Enbale publisher confirms and publisher returns to ensure message is sent to the exchange and queues
1. Enable durability to ensure messages are durable 
1. Use consumer ack to ensure the consumer gets messages from queues
1. Set acknowlwdge-mode to auto or simply use republishMessageRecoverer to bind error message queue and exchange.

flow control ：

1. use manual ack mode
1. listener-container  prefetch = 1000 to control the flow. (The consumer get 1000 messages every time, need manual confirmation to continue)

#### TTL:
time to live: before the message got discarded.
> x-message-tt

1.  queue ttl can be set in the confiogurations.(Delete all messages in the queue) ms
1.  message ttl need to implement messagePostProcessor to setExpiration in the message properties(When the expired message is on top of the queue, it will be deleted.)

Setting queue ttl and message ttl at the same time, it will use the shorter one.
##### DLX dead letter exchange
When a message is dead, it can be sent to another exchange. It is called DLX.

![Screenshot 2022-07-18 at 16.58.47.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1658156346041-a64ad0c7-05b1-4196-851a-1f0a9ed0d5a7.png#clientId=u32ad3f27-a953-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u83bc7d3b&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-18%20at%2016.58.47.png&originHeight=510&originWidth=1714&originalType=binary&ratio=1&rotation=0&showTitle=false&size=172237&status=done&style=none&taskId=u1969679f-3882-4230-8fb0-2c47c0f2db2&title=)
#### Dead letter queue summary:

1.  There is no difference between dead letter switches and dead letter queues and Xitong. 
1.  When the message becomes a dead letter, if the queue is bound to a dead letter switch, the message will be rerouted to the dead letter team by the dead letter switch. 
1. Messages become dead letter:
   1. exceeded limit of the queue
   1. consumer refused(basicNack) and requeue = false
   1. queue expired/message expired

parameters: x-dead-letter-exchange and x-dead-letter-routing-key
#### Use plugin to create delayqueue.
##### Install:
##### Use:
In the listener, declare delayed = true in th exchange setting.
In the publisher, set message property: .setHeader("x-delay", 5000)
The message will be delayed, but the publisher returns will get errors for not able to send the message directly to the exchange. In the message, the ReceivedDelay property will be the x-delay we set. So one possible solution would be using conditional statement to skip the publisher return
> if (message.getMessageProperties().getReceivedDelay() > 0) {
    return;
}

#### Message stuck
solutions:

1. more consumers
1. thread pool
1. increase volume of the queue

#### Lazy Queues
Note that normal rabbitmq queues are stored in the memory.
But the lazy queues directly store the messages in the disk(This will cause some performance issues). When the consumers are consuming messages, the messages are read from the disk into the memory.(This supports millions of messages storing.)
To set one queue to be lazy queue, simply set x-queue-mode to "lazy" or @arguments = @Argument(name = "x-queue-mode", value = "lazy")
Pro:

1. higher upper limit(disk storage)
1. no intermittent page-out more stable

Con:

1. longer delay
1. Subject to the disk IO performance
### MQ cluster
#### classic cluster
Nodes in the cluster share some info like exchange queue but not messages in the queues.
If one node is offline, the messages are lost.
When the consumer are requesting info from one node but the visited node doesn't have the queue. It will get the queue and its info from the node that has it. 
#### Image cluster

1. The image queue structure is one **master and multiple slave** (slave is an image) 
1. all operations are performed on the primary node and then synchronized to the image node. 
1. After the master node is down, the image node is replaced by a new master node (if the master node is down before the master-slave synchronization is completed, data loss may occur) 
1. the server load balancer function is not available because all operations are completed by the master node (but the master node of different queues can be different, which can be used to improve throughput)

higher reliability
#### Quorum Queues
Sane as image queues but easier to use.[RabbitMQ部署指南.md](https://www.yuque.com/attachments/yuque/0/2022/md/26679661/1658677394941-258ac0d0-38e4-4f0a-b932-5c7bfa757bfc.md?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2022%2Fmd%2F26679661%2F1658677394941-258ac0d0-38e4-4f0a-b932-5c7bfa757bfc.md%22%2C%22name%22%3A%22RabbitMQ%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97.md%22%2C%22size%22%3A16675%2C%22type%22%3A%22text%2Fmarkdown%22%2C%22ext%22%3A%22md%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22mode%22%3A%22title%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22u4ca91ba1-163a-4433-8746-0abc37864c0%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22u0013e100%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D)







