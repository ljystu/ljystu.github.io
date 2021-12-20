# Docker



# Docker and MySQL

开源应用容器引擎：

将软件编译成镜像，做好配置后发布，保证启动快速。

启动快 占用资源少 体积小

docker主机(Host)：安装了Docker程序的机器（Docker直接安装在操作系统之上）；

docker客户端(Client)：连接docker主机进行操作；

docker仓库(Registry)：用来保存各种打包好的软件镜像；

docker镜像(Images)：软件打包好的镜像；放在docker仓库中；

docker容器(Container)：镜像启动后的实例称为一个容器；容器是独立运行的一个或一组应用



## 命令总结：

docker pull 下载

```
`Docker run =docker create+start 创建容器后立即运行 例：docker run -p 3306:3306 --name mysql01 -e MYSQL_ROOT_PASSWORD=mysql -d mysql`
```

-d：后台运行
-p: 将主机的端口映射到容器的一个端口    主机端口:容器内部的端口

docker ps 查看现有所有容器

docker rm containerID



## docker connect to MySQL

```markdown
docker exec -it mysql01 bash #进入mysql命令行 mysql01为container名字
mysql -h localhost -u root -p mysql#连接
```



# MySQL常用命令总结：

```sql
show databses; #显示数据库列表

use xxx; #切换至xxx数据库

show tables; #显示数据库表

describe tablename; #显示数据表结构

create databases databasename;

create table tablename(字段列表);
#例：
create table myTable(
id int(5) not null primary key auto_increment,
name char(20) not null,
sex int(4) not null default '0');

drop database databasename; drop table tablename;

select * from tablename;

select * from tablename limit 0,2;#仅查询前几行

insert into tablename values();

rename table tablename to newtablename;#表名更改

update tablename set strname = newcoontent;#更新

update mysql.user set password=PASSWORD('xxxxx') where user='root';
flush privileges;#修改root密码

select user();#显示当前用户

grant select,insert... on databasename.(* or tablename) newuusername@localhost identified by "password";
#新增用户并限制其登登录权限和地址

delete from user where user='username' and host='localhost';
flush privileges;#删除用户


```


