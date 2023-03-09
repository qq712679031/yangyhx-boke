---
lang: zh-CN
title: kudu添加硬盘
description: kudu添加硬盘
---

> 不能全部重启 需要一台tserver. 一台 tserver. 重启

1. 创建对应的文件地址

   ```shell
    mkdir -r /data1/kuduTabletDir
   ```

2. 修改配置文件

   ```bash
   # , 分割 添加需要添加的硬盘
   --fs_data_dirs=/data/kuduTabletDir,/data1/kuduTabletDir
   ```

3. 停止一台tserver

   ```bash
   service kudu-tserver stop
   ```

4. 执行添加硬盘的命令

   ```bash
   sudo -u kudu kudu fs update_dirs --force --fs_wal_dir=/data/kuduTabletDir --fs_data_dirs=/data/kuduTabletDir,/data1/kuduTabletDir
   ```

5. 等待执行完成

   ![image-20230303162530472](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/kudu/image-20230303162530472.png)

   目录存在data 文件夹

   ![image-20230303162546101](https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/kudu/image-20230303162546101.png)

6. 启动tserver

   ```bash
   service kudu-tserver start
   ```

   

