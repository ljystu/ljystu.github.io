# Elasticssearch


A powerful search engine for large scale data search. Also benefit for log analysis and monitoring.
Elasticsearch: store, compute, search data

### Inverted Index(less memory and faster query)
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


![elasticsearch1](/elasticsearch/elasticsearch1.png)

Mysql is suitable for writing and transactions
Elasticsearch is suitable for largescale data search analysis and computing

### Index
##### type:

1.  text(words that can be seperated), keyword(Should not be seperated: country names)
2. Numbers: long, integer, short, byte, double, float
3. boolean
4. date
5. object
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
         2. should: || 
         3. must_not: 不算分 not
         4. filter: 不算分
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

![image.png]( /elasticsearch/elasticsearch2.png)
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
![image.png]( /elasticsearch/elasticsearch3.png)
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
We can use query to limit range of the TermAggregation.![image.png]( /elasticsearch/elasticsearch4.png)

2. Metric:	max, min, avg, stats
   1. based on the result of BucketAggregation

3. Pipeline

Aggregations of other aggregations(avg of a group) 

### AutoSync between database and ES
Use rabbitmq messages to decouple the service and update
![image.png]( /elasticsearch/elasticsearch5.png)

### ES Cluster


![image.png]( /elasticsearch/elasticsearch6.png)
An example of a robust ES cluster.
 
![image.png]( /elasticsearch/elasticsearch7.png)
#### split-brain problem:
When the master is having network issues for a long time, other nodes notice the situation and decide to elect a node to be the master node, so there will be 2 master nodes when the old master node back online.
Solving: setting the consensus vote to be (eligible nodes + 1) / 2.(In versions after Elasticsearch 7.0, the number of eligible nodes is automatically calculated, so there are unlikely to be split-brain problem)

#### How to elect the master node
1. ZenDiscovery, module is responsible for selecting the master node, which mainly includes Ping (the RPC is used to discover each other between nodes) and Unicast (the Unicast module contains a list of hosts to control which nodes need to ping); 
2. For all nodes that can become Masters ( node.master: true ) sort according to the Lexicographic order (字典序) of nodeId. Each node in each election sorts the nodes it knows in order, and then selects the first (0th) node. For the time being, it is considered as the master node. 
3. If the number of votes for a node reaches a certain value ( the number of eligible master nodes n/2+1) and the node itself elects itself, the node is the master. Otherwise, there will be reelection until the above conditions are met. 
4. Supplement: The master node is mainly responsible for managing clusters, nodes, and indexes. It is not responsible for document-level management. data nodes can disable http *

### The procedure of indexing
When the user write index to the master node. 
Node 1 got the request and located the doc_id to be in Shard0, it will be directed to the node where the shard is located. Node 3 write on the shard. 
If succeeded, if will request and direct to the nodest hat store the copy of the shard and write the index.
![Screenshot 2022-08-10 at 11.34.52.png]( /elasticsearch/elasticsearch8.png)
### Ways of optimising the index
#### design:
#### write:
#### query optimization:
1. Disable wildcard; 
2. Disable batch terms (hundreds of scenarios); 
3. Make full use of the inverted index mechanism and try to use the keyword type; 
4. When the amount of data is large, the index can be finalized based on time before retrieval;


