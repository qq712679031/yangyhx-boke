---
lang: zh-CN
title: hdfs 
description: hdfs  

---

## hdfs查看目录文件的大小

1. 第一种方式：查看当前目录下的各级目录 分别大小

```shell
hdfs dfs -du -h /user/hive/warehouse/

#第一列为单个文件实际大小，第二列为备份大小，第三列为详情目录。
#查看结果
19.7 K   59.0 K   /user/hive/warehouse/hive_test
0        0        /user/hive/warehouse/test_float
67       201      /user/hive/warehouse/test_float2
... ... /..
```

2. 第二种方式：

```shell
hdfs dfs -ls -h /user/hive/warehouse/
#这种方式需要注意：当子文件目录过多时，统计的大小为0。
drwxrwxrwt   - hdfs hive          0 2020-11-09 14:13 /user/hive/warehouse/hive_test
drwxrwxrwt   - hdfs hive          0 2020-11-20 17:51 /user/hive/warehouse/test_float
drwxrwxrwt   - hdfs hive          0 2020-11-20 18:05 /user/hive/warehouse/test_float2
```

3. 第三种方式： 查看指定目录的总大小
   命令： hdfs dfs -du -s -h /目录

```shell
hdfs dfs -du -s -h /user/hive/warehouse/

97.1 G  291.3 G /user/hive/warehouse
```


第一列标示该目录下总文件大小

第二列标示该目录下所有文件在集群上的总存储大小和你的副本数相关，我的副本数是3 ，所以第二列的是第一列的三倍 （第二列内容=文件大小*副本数）

第三列标示你查询的目录

