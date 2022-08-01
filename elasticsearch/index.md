# Elasticsearch


A powerful search engine for large scale data search. Also benefit for log analysis and monitoring.
Elasticsearch: store, compute, search data

##### Inverted Index
 **inverted index** (also referred to as a **postings list**, **postings file**, or **inverted file**) is a [database index](https://en.wikipedia.org/wiki/Database_index) storing a mapping from content, such as words or numbers, to its locations in a [table](https://en.wikipedia.org/wiki/Table_(database)), or in a document or a set of documents (named in contrast to a [forward index](https://en.wikipedia.org/wiki/Forward_index), which maps from documents to content). The purpose of an inverted index is to allow **fast **[**full-text searches**](https://en.wikipedia.org/wiki/Full-text_search)**,** at a cost of increased processing when a document is added to the database. 

- 0. "it is what it is"
- 1. "what is it"
- 2. "it is a banana"

We can get the following reverse file index:
 "a":      {2}  "banana": {2}  "is":     {0, 1, 2}  "it":     {0, 1, 2}  "what":   {0, 1} 
Search criteria "what" , "is" and "it" will correspond to this [collection ](https://zh.wikipedia.org/wiki/%E9%9B%86%E5%90%88):. 
For the same text, we get the following completely reverse indexes, [document ](https://zh.wikipedia.org/wiki/%E6%96%87%E6%A1%A3)the number and the word result of the current query. [Data ](https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE). Similarly, both the number of documents and the word results Currently queried start from zero. So, "banana": {(2, 3)} that is to say, "banana" is in the third document (), and the position in the third document is the fourth word (address is 3).
"a":      {(2, 2)} 
"banana": {(2, 3)} 
"is":     {(0, 1), (0, 4), **(1, 1)**, (2, 1)} 
"it":     {(0, 0), (0, 3), **(1, 2)**, (2, 0)}  
"what":   {(0, 2), **(1, 0)**}


![Screenshot 2022-07-25 at 15.17.06.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1658755030090-bfda40ce-0d8d-4353-a551-3879ac8903de.png#clientId=uc6ebcbda-75f7-4&crop=0&crop=0&crop=1&crop=1&from=drop&id=u85044708&margin=%5Bobject%20Object%5D&name=Screenshot%202022-07-25%20at%2015.17.06.png&originHeight=375&originWidth=857&originalType=binary&ratio=1&rotation=0&showTitle=false&size=111747&status=done&style=none&taskId=u8e34b8bb-ac05-4a64-8706-a7b4c6c5845&title=)

Mysql is suitable for writing and transactions
Elasticsearch is suitable for largescale data search analysis and computing

### Index
##### type:

1.  text(words that can be seperated), keyword(Should not be seperated: country names)
1. Numbers: long, integer, short, byte, double, float
1. boolean
1. date
1. object
##### index:
Specifies whether to create an index. The default value is true.
##### analyzer:
Specifies which analyzer to use.
##### properties:
To specify sub strings

### DSL index operations
Create index and mapping using DSL:
```java
# Create index
PUT /test
{
  "mappings": {
    "properties": {
      "info": {
        "type": "text",
        "analyzer": "standard"
      },
      "email": {
        "type": "keyword",
        "index": false
      },
      "name": {
        "type": "object",
        "properties": {
          "firstName": {
            "type": "keyword"
          },
          "lastName": {
            "type": "keyword"
          }
        }
      }
    }
  }
}
```
 
inspect, update and delete index
```java
# search
GET /test

# update(cannot be updated, so we need a brand new index)
PUT /test/_mapping
{
  "properties":{
    "age":{
      "type": "integer"
    }
  }
}

# delete
DELETE /test

```
### DSL Document operations
Insert document
```java
# Insert a new document
POST /test/_doc/1
{
  "info": "黑马程序员java讲师",
  "email": "112837@qq.com",
  "name":{
    "firstName":"云",
    "lastName":"赵"
  }
}
```
select and delete document
```java
# 查询
GET /heima/_doc/1

# 删除
DELETE /heima/_doc/1
```
update document:
```java
# delete old document and create a new one
PUT /heima/_doc/1
{
  "info": "黑马程序员java讲师",
  "email": "112837@qq.com",
  "name":{
    "firstName":"云",
    "lastName":"赵"
  }
}
如果id在索引库里面不存在，并不会报错，而是直接新增，如果索引库存在该记录，就会先删掉该记录，然后增加一个全新的。

# 局部修改文档字段
# there has to be a "doc"
POST /heima/_update/1
{
  "doc": {  
    "email":"lbwnb@qq.com"
  }
}
```


**Write DSL statements and create index libraries (equivalent to creating tables in MySQL)**
```java
# 酒店的mapping
PUT /hotel
{
  "mappings": {
    "properties": {
      "id":{
        "type": "keyword"         
      },
      "name":{
        "type": "text"
        , "analyzer": "ik_max_word",
        "copy_to": "all"
      },
      "address":{
        "type": "keyword"
        , "index": false
      },
      "price":{
        "type": "integer"
      },
      "score":{
        "type": "integer"
      },
      "brand":{
        "type": "keyword",
        "copy_to": "all"
      },
      "city":{
        "type": "keyword"
      },
      "starName":{
        "type": "keyword"
      },
      "business":{
        "type": "keyword",
        "copy_to": "all"
      },
      "location":{
        "type": "geo_point"
      },
       "pic":{
        "type": "keyword"
        , "index": false
      },
      "all":{
        "type": "text",
        "analyzer": "ik_max_word"
      }
    }
  }
}

use text to do text analysis, use keyword to prevent analysis.
#use copy_to to set up group index and search
```

##### Store
Restclient
##### Search

1. search all: 

  a. match_all

2. full text: analyze user input and search in inverted index
   1. (match_query, multi_match_query)
```java
# match 和 multi_match
GET /hotel/_search
{
  "query": {
    "match": {
      "address": "如家外滩"
    }
  }
}

GET /hotel/_search
{
  "query": {
    "multi_match": {
      "query": "外滩如家",
      "fields": ["brand","name","business"]
    }
  }
}
```

3. keyword search: no analysis, search keywords(numbers, date,boolean): 
   1. ids, range, term
```java
# 精确查询（term查询）
GET /hotel/_search
{
  "query": {
    "term": {
      "city": {
        "value": "上海"
      }
    }
  }
}

# 精确查询(范围range)
GET /hotel/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 100,
        "lte": 300
      }
    }
  }
}
```
```java
# distance查询
GET /hotel/_search
{
  "query": {
    "geo_distance":{
      "distance": "5km",
      "location": "31.21, 121.5"
    }
  }
}
```

4. compound search
   1. boolean query
      1. combine multiple query
         1. must: &&
         1. should: || 
         1. must_not: 不算分 not
         1. filter: 不算分
```java
GET /hotel/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {
          "name": "如家"
        }}
      ],
      "must_not": [
        {"range": {
          "price": {
            "gt": 400
          }
        }}
      ],
      "filter": [
        {
          "geo_distance": {
            "distance": "100km",
            "location": {
              "lat": 31.21,
              "lon": 121.5
            }
          }
        }
      ]
    }
  }
}
```

   2. function score
      1. function score use BM25 algorithm

![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1658842273535-a4354179-51c1-4d81-b189-e5dfcf5db5f5.png#clientId=ufd320741-2d8c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=594&id=u67f88ab4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1188&originWidth=2292&originalType=binary&ratio=1&rotation=0&showTitle=false&size=963736&status=done&style=none&taskId=u57ddb901-d6a3-4d62-a8be-74cacf05eb3&title=&width=1146)
```java
GET /hotel/_search
{
  "query": {
    "function_score": {
      "query": {
        "match": {
          "address": "外滩"
        }
      },
      "functions": [
        {
          "filter": {
            "term": {
              "brand": "如家"
            }
          },
          "weight": 10
        }
      ]
    }
  }
}
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1658843100761-fdbe5a9b-bdd8-4eb8-9c12-acae853a5d01.png#clientId=ufd320741-2d8c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=537&id=u83b406a0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1074&originWidth=2276&originalType=binary&ratio=1&rotation=0&showTitle=false&size=881444&status=done&style=none&taskId=u3c6002d8-909a-4439-a97c-230f0fc15c7&title=&width=1138)
###### sort
default: function score
keyword, numbers, date, location
> Note: Elasticsearch won't calculate scores when we are using sorting algorithm to optimize performance

```java
# sort排序 preice asc if scores are euqal
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "score": "desc"
    },
    {
      "price": "asc"
    }
  ]组合查询-function score 对应的Java RestClient代码：

}

//距离排序 distance to the location
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "_geo_distance": {
        "location": {
          "lat": 31.03,
          "lon": 121.61
        }, 
        "order": "asc"
        , "unit": "km"
      }
    }
  ]
}
```
###### Page
similar to limit in mysql
```java

GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "price": "asc"
    }
  ],
  "from": 20
  , "size": 5
}
```
But
Paging problems: the underlying layer of ES is inverted index, which is not conducive to paging, so paging query is a logical paging. For example, starting from 990, you need to intercept 10 pieces of data (10 pieces from 990 to 1000). For ES, you need to first query 0 to 1000 pieces of data, and then logically intercept 10 pieces of data by page. If it is a monomer, it is only a matter of efficiency at most, but if it is a cluster, it will be a bad thing. We need to get 1000 from each of the nodes and re-sort them. Then we get the 10 pieces from 990 to 1000. Too costly when the number is large.
###### highlight
highlight the search keyword
By default, query term and highlight fields must be the same. Use "require_field_match": "false" to highlight any fields.
```java
//match_all cannot be used in the highlight senario
GET /hotel/_search
{
  "query": {
    "match": {
      "all": "如家"
    }
  },"highlight": {
    "fields": {
      "name": {
        "require_field_match": "false"
      }
    }
  }
}
```
### [
](https://blog.csdn.net/weixin_44757863/article/details/120959505)Aggregations
Aggregations can be used to do analysis, computing and statistics analysis.

1. Bucket: grouping
   1. TermAggregation

By default, return a _count for field of the terms in desc order.
We can use query to limit range of the TermAggregation.![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1658931921784-a471c6c9-1394-4053-a4c8-dbf7002e21f1.png#clientId=u9985d72f-f14c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=585&id=uc5208dbb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1170&originWidth=2130&originalType=binary&ratio=1&rotation=0&showTitle=false&size=733875&status=done&style=none&taskId=ueef7eb40-e860-46b2-95b3-ad9c0f837e0&title=&width=1065)

2. Metric:	max, min, avg, stats
   1. based on the result of BucketAggregation

3. Pipeline

Aggregations of other aggregations(avg of a group) 

### AutoSync between database and ES
Use rabbitmq messages to decouple the service and update
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1659038518967-d20bb162-0b4e-4de0-bcde-51102d53ed5f.png#clientId=u9985d72f-f14c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=598&id=u0311b200&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1196&originWidth=2270&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1007277&status=done&style=none&taskId=u5a9c82c6-4c6a-4268-ad7e-fd118187c52&title=&width=1135)

### ES Cluster


![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1659098426639-3ba56576-cb88-45a5-afe0-91a9238caedc.png#clientId=u9985d72f-f14c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=597&id=ubbcc2cc5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1194&originWidth=2312&originalType=binary&ratio=1&rotation=0&showTitle=false&size=662060&status=done&style=none&taskId=u8e4dbbd6-aa4b-46de-b7a4-2aaf9656823&title=&width=1156)
An example of a robust ES cluster.
 
![image.png](https://cdn.nlark.com/yuque/0/2022/png/26679661/1659098932722-ecb4b153-de91-4bc1-871f-da070d31586d.png#clientId=u9985d72f-f14c-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=582&id=u4fc4172b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1164&originWidth=2398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=711037&status=done&style=none&taskId=uec28011d-ff47-441d-8732-f5bcdfa50cb&title=&width=1199)
split-brain problem:
When the master is having network issues for a long time, other nodes notice the situation and decide to elect a node to be the master node, so there will be 2 master nodes when the old master node back online.
Solving: setting the consensus vote to be (eligible nodes + 1) / 2.(In versions after Elasticsearch 7.0, the number of eligible nodes is automatically calculated, so there are unlikely to be split-brain problem)

