# RabbbitMQ



1. Decoupling 
2. Event-driven design
3. better performance

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
2. Improve throughput
3. Fault isolation
4. Flow peaking

**Disadvantages of asynchronous communication:**

1.  Rely on Broker's reliability, security and throughput
2. The architecture is complicated, the business does not have an obvious process line, which is not easy to track and manage.

### Rabbitmq
![Screenshot 2022-07-13 at 21.22.33.png](/Rabbitmq/rabbitmq1.png)
**Message sending process for basic message queue:**

1. Establish a connection
2. Create a channel
3. Declare queues using created channels  
4. Use channel to send messages to queues

**Message receiving process for basic message queue:**

1. Establish a connection
2. Create a channel
3. Use the channel to declare the queue
4. Declare consumer method handleDelivery()
5. Use channel to bind consumers to queues

### Spring amqp
Use rabbitTemplate to send and get messages
![Screenshot 2022-07-15 at 19.00.54.png](/Rabbitmq/rabbitmq2.png)

queues can use same binding key(which makes them fanout exchange)
![Screenshot 2022-07-15 at 20.15.08.png](/Rabbitmq/rabbitmq3.png)
![Screenshot 2022-07-15 at 20.23.21.png](/Rabbitmq/rabbitmq4.png)
Describe the difference between Direct switch and Fanout switch?
Fanout: routes messages to every queue bound to it.
Direct: Determines Which Queue It Is Routed To According To RouteKey.
• If multiple queues have the same RoutingKey, it is similar to Fanout function.
The common annotations based on @RabbitListener annotation declaration queues and switches:
@Queue
@Exchange


### TopicExchange
![Screenshot 2022-07-15 at 20.27.51.png](/Rabbitmq/rabbitmq5.png)

In message queues, any object will be serialized. But the performance of the default serialization method(JDK serialization) is not really satisfying(takes too much space).
We can use Jackson converter to improve its performance.
Note: Some bugs may appear while using Jackson converter./
![Screenshot 2022-07-15 at 20.40.59.png](/Rabbitmq/rabbitmq6.png)
![Screenshot 2022-07-15 at 20.47.07.png](/Rabbitmq/rabbitmq7.png)**Note: consumer and publisher must be using the same message converter.**

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

![Screenshot 2022-07-22 at 15.51.16.png](/Rabbitmq/rabbitmq8.png)
Use republishMessageRecover to bind error message and its routing key.
How to guarantee reliability？

1. Enbale publisher confirms and publisher returns to ensure message is sent to the exchange and queues
2. Enable durability to ensure messages are durable 
3. Use consumer ack to ensure the consumer gets messages from queues
4. Set acknowlwdge-mode to auto or simply use republishMessageRecoverer to bind error message queue and exchange.

flow control ：

1. use manual ack mode
2. listener-container  prefetch = 1000 to control the flow. (The consumer get 1000 messages every time, need manual confirmation to continue)

#### TTL:
time to live: before the message got discarded.
> x-message-tt

1.  queue ttl can be set in the confiogurations.(Delete all messages in the queue) ms
2.  message ttl need to implement messagePostProcessor to setExpiration in the message properties(When the expired message is on top of the queue, it will be deleted.)

Setting queue ttl and message ttl at the same time, it will use the shorter one.
##### DLX dead letter exchange
When a message is dead, it can be sent to another exchange. It is called DLX.

![Screenshot 2022-07-18 at 16.58.47.png](/Rabbitmq/rabbitmq9.png)
#### Dead letter queue summary:

1.  There is no difference between dead letter switches and dead letter queues and Xitong. 
2.  When the message becomes a dead letter, if the queue is bound to a dead letter switch, the message will be rerouted to the dead letter team by the dead letter switch. 
3. Messages become dead letter:
   1. exceeded limit of the queue
   2. consumer refused(basicNack) and requeue = false
   3. queue expired/message expired

parameters: x-dead-letter-exchange and x-dead-letter-routing-key
#### Dead letter queue use case
In the shopping cart case, users place their order and need to pay within 15 min or so.
In this case, the message TTL can be set to 15 min(in order.delay.queue). After that, the messages will be sent to dead letter queue(order.release.queue) and the overtime order cancel can be realized.
> @Bean public Queue orderDelayQueue(){
> HashMap<String, Object> args = new HashMap<>(); 
> args.put("x-dead-letter-exchange","order-event-exchange"); 
> args.put("x-dead-letter-routing-key","order.release.order"); 
> args.put("x-message-ttl",60000); 
> return new Queue("order.delay.queue", true, false, false, args); 
> } 
> @Bean public Binding stockReleaseBinding(){
> return new Binding("order.release.order.queue", 
> Binding.DestinationType.QUEUE, 
> "order-event-exchange",
> "order.release.order", null); 
> }

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
2. thread pool
3. increase volume of the queue

#### Lazy Queues
Note that normal rabbitmq queues are stored in the memory.
But the lazy queues directly store the messages in the disk(This will cause some performance issues). When the consumers are consuming messages, the messages are read from the disk into the memory.(This supports millions of messages storing.)
To set one queue to be lazy queue, simply set x-queue-mode to "lazy" or @arguments = @Argument(name = "x-queue-mode", value = "lazy")
Pro:

1. higher upper limit(disk storage)
2. no intermittent page-out more stable

Con:

1. longer delay
2. Subject to the disk IO performance
### MQ cluster
#### classic cluster
Nodes in the cluster share some info like exchange queue but not messages in the queues.
If one node is offline, the messages are lost.
When the consumer are requesting info from one node but the visited node doesn't have the queue. It will get the queue and its info from the node that has it. 
#### Image cluster

1. The image queue structure is one **master and multiple slave** (slave is an image) 
2. all operations are performed on the primary node and then synchronized to the image node. 
3. After the master node is down, the image node is replaced by a new master node (if the master node is down before the master-slave synchronization is completed, data loss may occur) 
4. the server load balancer function is not available because all operations are completed by the master node (but the master node of different queues can be different, which can be used to improve throughput)

higher reliability
#### Quorum Queues
Sane as image queues but easier to use.[RabbitMQ部署指南.md](https://www.yuque.com/attachments/yuque/0/2022/md/26679661/1658677394941-258ac0d0-38e4-4f0a-b932-5c7bfa757bfc.md?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2022%2Fmd%2F26679661%2F1658677394941-258ac0d0-38e4-4f0a-b932-5c7bfa757bfc.md%22%2C%22name%22%3A%22RabbitMQ%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97.md%22%2C%22size%22%3A16675%2C%22type%22%3A%22text%2Fmarkdown%22%2C%22ext%22%3A%22md%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22mode%22%3A%22title%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22u4ca91ba1-163a-4433-8746-0abc37864c0%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22u0013e100%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D)


### Typical problems of RabbitMQ
#### Duplicate consumption of messages
To solve this problem, first we need to make sure there's an unique identifier for each of the messages.
##### Make sure the consumer only executes it once
Use redis to store unique identifier, when sending the message, determine whether the identifier already exists in Redis.
> Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent("orderNo+couponId"); 
> Check whether the message has already been consumed 
> if (! Boolean.TRUE.equals(flag)) { return; } // Execute business... / / consumer identity stored in Redis, expired stringRedisTemplate for 10 SEC opsForValue (). The set (" orderNo + couponId ", "1", Duration, ofSeconds (10 l));

##### Use the unique key in database 
We can also use an unique key in the database to ensure its consistency when executed multiple times.
### Publish faster than consume(Stuck in the queue)

- Throttling the producer's message sending interface (not recommended, affecting user experience) 
- deploy more consumer instances (recommended) 
- increase the number of prefetch to allow the consumer to receive more messages at a time (recommended, can be used together with the second solution)




