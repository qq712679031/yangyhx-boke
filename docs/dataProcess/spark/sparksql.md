SaveMode.ErrorIfExists(对应着字符串"error"):表示如果目标文件目录中数据已经存在了，则抛异常(这个是默认的配置)
SaveMode.Append(对应着字符串"append"):表示如果目标文件目录中数据已经存在了,则将数据追加到目标文件中
SaveMode.Overwrite(对应着字符串"overwrite"):表示如果目标文件目录中数据已经存在了，则用需要保存的数据覆盖掉已经存在的数据
SaveMode.Ignore(对应着字符串为:"ignore"):表示如果目标文件目录中数据已经存在了,则不做任何操作