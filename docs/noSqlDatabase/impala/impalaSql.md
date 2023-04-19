---
lang: zh-CN
title: impalaSql
description: impalaSql
---





## hdfs

### 1. 添加一列

首先，

- `impala`和`hive`并不支持直接在指定列前增加新的列（`mysql`可以）
- `impala`并不支持列移动。

即，只能用hive先添加列，然后将列移动到指定位置，

```sql
ALTER TABLE name ADD COLUMNS (col_spec[, col_spec ...])
```

```sql
ALTER TABLE zanalytics.hdfs_b_user_event_all_343 ADD COLUMNS(cdp_id BIGINT);
```

## kudu