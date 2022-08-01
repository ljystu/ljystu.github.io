# Redis distributed lock




# Distributed lock

Under highly concurrent environment, the distributed lock is used to ensure consistency in the database. Here's an example of this.

Using simple lock:

```java
stringRedisTemplate.opsForValue().setIfAbsent("lockKey", "ljy");
// This is the simplest realization of lock in redis
// But this lock will trigger deadlock when the service is down
// adding delete won't help
stringTemplate.delete("lockKey");

// setting expiration time have problem as well
stringRedisTemplate.opsForValue().setIfAbsent("lockKey", "ljy", 10, TimeUnit.SECONDS);
// we don't know when to expire the key (the request may haven't finished but the lock is expired)
```
Let's say we have a lock expires in 10 seconds, but the requests need 15 seconds to be processed. In that way the second thread will get the lock after 10 seconds and the get deleted after 20 seconds. This may trigger the distributed lock to be ineffect permanently.

We can add an if sentence to 


## Redisson
Redis Java client which has features of distributed locks.
It considers all the problem above and get it done with simple command.
```java
       Map<String, List<Catalog2Vo>> categoryMap=null;
        RLock lock = redissonClient.getLock("CatalogJson-Lock");
        lock.lock(10,TimeUnit.SECONDS);
        try {
            categoryMap = getCategoryMap();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            lock.unlock();
            return categoryMap;
        }
```
