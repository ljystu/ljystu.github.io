# Best Time to Buy and Sell Stock



# Redis 


## Redis with pyrhon

Simple example of how to use redis as Cache in python:

If we want to store some info in cache(logo, name), we first can convert them into JSON format and assign a key, and store the info in cache.

```
logo = get_logo() #maybe get logo from api
json.dumps(logo) #convert to JSON
logo_key = f"{symbol}_logo" #naming convention
```
When we need to use the info, we can first get it from the cache.
```
redis_client.get(logo_key)
```
If it returns null, that means the key is not in cache. We need to store it first.

```
redis_client.set(logo_key, json.dumps(logo))
```

The standard procedure would be:

```
logo_key = f"{symbol}_logo"
logo = redis_client.get(logo_key)

if logo is None:
    logo = get_logo()
    redis_client.set(logo_key, json.dumps(logo))
else:
    redis_client.get(logo_key)
    
```
