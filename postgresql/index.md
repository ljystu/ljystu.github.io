# Postgresql



大部分参考菜鸟教程

有意思的数据类型：
tsvector，tsquery：方便的全文搜索特性
使用to构建全文
```plsql
SELECT title
FROM pgweb
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'friend');
```
创建复合类型：
```plsql
CREATE TYPE complex AS (
    r       double precision,
    i       double precision
);

CREATE TYPE inventory_item AS (
    name            text,
    supplier_id     integer,
    price           numeric
);
//用复合类型创建表并且插入数据
//注意使用括号对一个类型进行定义

CREATE TABLE on_hand (
    item      inventory_item,
    count     integer
);

INSERT INTO on_hand VALUES (ROW('fuzzy dice', 42, 1.99), 1000);

//注意必须使用括号，不然会被解析成从表中访问数据
SELECT (item).name FROM on_hand WHERE (item).price > 9.99;
SELECT (on_hand.item).name FROM on_hand WHERE (on_hand.item).price > 9.99;
```
### 什么情况下要避免使用索引？
虽然索引的目的在于提高数据库的性能，但这里有几个情况需要避免使用索引。
使用索引时，需要考虑下列准则：

- 索引不应该使用在较小的表上。
- 索引不应该使用在有频繁的大批量的更新或插入操作的表上。
- 索引不应该使用在含有大量的 NULL 值的列上。
- 索引不应该使用在频繁操作的列上。

