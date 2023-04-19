import{_ as e,p as d,q as a,a1 as i}from"./framework-5866ffd3.js";const s={},n=i(`<h2 id="数据迁移流程梳理" tabindex="-1"><a class="header-anchor" href="#数据迁移流程梳理" aria-hidden="true">#</a> 数据迁移流程梳理</h2><h3 id="一、迁移前准备工作" tabindex="-1"><a class="header-anchor" href="#一、迁移前准备工作" aria-hidden="true">#</a> 一、迁移前准备工作</h3><p>第一天：</p><p>①：新环境私有化etl程序、load、paopi程序及定时任务全部关闭,确保环境干净.调整新环境kafka保存时间为30天，只调整sdklua_online即可</p><p>②：①确认无误后通知客户将网关地址指向私有化新环境。</p><p>③：客户切换网关地址后，将老环境数据上传掐掉。等待数据消费完成。同样关闭相应的定时任务</p><p>第二天：</p><p>④确认老环境当天load及跑批是否已经全部完成</p><h3 id="二、具体操作梳理" tabindex="-1"><a class="header-anchor" href="#二、具体操作梳理" aria-hidden="true">#</a> 二、具体操作梳理</h3><h4 id="_2-1-mysql前端库备份-旧环境" tabindex="-1"><a class="header-anchor" href="#_2-1-mysql前端库备份-旧环境" aria-hidden="true">#</a> 2.1. mysql前端库备份（旧环境）</h4><blockquote><p>ps:根据实际情况备份所需要的库</p></blockquote><ul><li><ol><li>导出前端库sdkv</li></ol></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysqldump --opt sdkv -hweb -uweb -p&#39;zanalytics&#39; &gt; ./sdkv.db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><ol start="2"><li>导出元数据库hive</li></ol></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysqldump --opt hive -hweb -uweb -p&#39;zhugeio&#39; &gt; ./hive.db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>将导出的库文件拷贝至新环境，根据时间情况选择拷贝方式</p></blockquote><h4 id="_2-2-redis数据导出-旧环境" tabindex="-1"><a class="header-anchor" href="#_2-2-redis数据导出-旧环境" aria-hidden="true">#</a> 2.2. REDIS数据导出 （旧环境）</h4><ul><li>web相关</li></ul><blockquote><p>参考文档 https://note.youdao.com/s/Yzty4Vk6</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>涉及：26380,26480
将redis的aof拷贝至新环境
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-ssdb数据导出-旧环境" tabindex="-1"><a class="header-anchor" href="#_2-3-ssdb数据导出-旧环境" aria-hidden="true">#</a> 2.3. SSDB数据导出（旧环境）</h4><p>*etl:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>涉及：8892,8893,8894,8895,8897<span class="token punctuation">(</span>可清理，无需备份<span class="token punctuation">)</span>,8898
将数据目录直接拷贝至新环境，启动即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>ps: 如果需要将ssdb迁移至新环境redis中请参考：https://note.youdao.com/s/KRruQFL4</p></blockquote><ul><li>web:</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">8884,8888</span>  <span class="token punctuation">(</span>无需迁移，初始化信息部署时已有<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-4-kudu备份-老环境" tabindex="-1"><a class="header-anchor" href="#_2-4-kudu备份-老环境" aria-hidden="true">#</a> 2.4. kudu备份 (老环境)</h4><blockquote><p>ps: https://note.youdao.com/s/5cpakweW</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>将kudu数据备份到hdfs,此操作需要注意以下两点
1.备份的表数量需与原表数量一致
2.备份的表中数据量需与原表数量一致
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-hdfs迁移-老环境" tabindex="-1"><a class="header-anchor" href="#_2-5-hdfs迁移-老环境" aria-hidden="true">#</a> 2.5. hdfs迁移 (老环境)</h4><blockquote><p>将老环境hdfs数据导到新环境hdfs,此处方式比较多，目前比较常用的方式如下：</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. old—hdfs ====&gt; new-hdfs  （推荐）
新旧集群如果是内网或者网络带宽能得到保证的情况下，新旧环境直连拷贝，省掉中间环节。

2. old-hdfs =====&gt;oss====&gt;new-hdfs（常规）
针对客户上云的情况，客户会可能需要通过oss作为中转
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>新旧集群直连拷贝 企查查客户的新旧环境都在内网中，因此使用此方式进行hdfs的迁移</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>nohup hadoop distcp -m 48 -bandwidth 200 /user/hive/warehouse/zhugeio.db/ hdfs://172.18.181.12:8020/user/hive/warehouse/zhugeio.db/  &amp;

内网拷贝数据100M/s, 2.8T数据执行了大约3.5h  

a.执行迁移命令后注意观察日志，注意报错及评估拷贝进度
b.如果执行成功，无异常，请对新旧环境的hdfs数据进行对比 ‘du’
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-6-清理新环境测试应用app-避免appid重复导致的冲突" tabindex="-1"><a class="header-anchor" href="#_2-6-清理新环境测试应用app-避免appid重复导致的冲突" aria-hidden="true">#</a> 2.6. 清理新环境测试应用app，避免appId重复导致的冲突</h4><ul><li>mysql中信息</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.将新环境的mysql中各个库备份
2.备份完成后删除即可，后面需要将旧库导入

mysqldump --opt sdkv -hweb -uweb -p&#39;zanalytics&#39; &gt; ./sdkv—tmp.db
mysqldump --opt hive -hweb -uweb -p&#39;zanalytics&#39; &gt; ./hive—tmp.db

mysql&gt; drop database sdkv;
mysql&gt; drop database hive;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>redis及ssdb</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>将原数据目录清空后重启即可，里面都是测试数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-7-新环境导入mysql相关库" tabindex="-1"><a class="header-anchor" href="#_2-7-新环境导入mysql相关库" aria-hidden="true">#</a> 2.7. 新环境导入mysql相关库</h4><ul><li>1 导入sdkv库</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>##查看建库语句
&gt;show create database sdkv;

##创建空库sdkv
&gt;CREATE DATABASE \`sdkv\` /*!40100 DEFAULT CHARACTER SET utf8 */;
##创建web用户
&gt;CREATE USER &#39;web&#39;@&#39;%&#39;;
##授权给web用户
&gt;GRANT ALL ON *.* TO &#39;web&#39;@&#39;%&#39;;
##将老环境sdkv库导入
&gt;use sdkv;
&gt;source /\${WORK_DIR}/sdkv.db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>2 使用打包平台tools工具，修改新环境导入的sdkv表结构。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>java -jar tools-1.0.jar mysql_sdkv_update.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>node sql导入 如果客户的老环境比较旧，更新完sdkv表结构后，node相关表中可能是空的，需导入初始化sql</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sql文件：（tbj:/data/download/secure-patch/realtime-cluster/node）
        DATA_ACCESS.sql
        scene.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><ol start="3"><li>导入其他库（如hive库）</li></ol></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>##创建空库hive
&gt;CREATE DATABASE \`hive\` /*!40100 DEFAULT CHARACTER SET utf8 */;
##创建web用户
&gt;CREATE USER &#39;hive&#39;@&#39;%&#39;;
##授权给web用户
&gt;GRANT ALL ON *.* TO &#39;hive&#39;@&#39;%&#39;;
##将老环境sdkv库导入
&gt;use hive;
&gt;source /\${WORK_DIR}/hive.db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-8-hdfs恢复" tabindex="-1"><a class="header-anchor" href="#_2-8-hdfs恢复" aria-hidden="true">#</a> 2.8 hdfs恢复</h4><blockquote><p>前提：hive库已恢复</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.确认hdfs中数据可通过impala查询
2.通过impala对比新旧仓库中的hdfs表数量及表中数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-9-kudu恢复" tabindex="-1"><a class="header-anchor" href="#_2-9-kudu恢复" aria-hidden="true">#</a> 2.9 kudu恢复</h4><blockquote><p>1.前提：hdfs确认无误 2.参考文档：https://note.youdao.com/s/5cpakweW</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kudu恢复后，需要注意表数量及表中数据是否能对上
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-10-新环境导入ssdb" tabindex="-1"><a class="header-anchor" href="#_2-10-新环境导入ssdb" aria-hidden="true">#</a> 2.10 新环境导入ssdb</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>基于拷贝目录启动相关ssdb即可
&gt; ps: 如果需要将ssdb迁移至新环境redis中请参考：https://note.youdao.com/s/KRruQFL4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-11-新环境导入redis" tabindex="-1"><a class="header-anchor" href="#_2-11-新环境导入redis" aria-hidden="true">#</a> 2.11. 新环境导入redis</h4><blockquote><p>参考文档 https://note.youdao.com/s/Yzty4Vk6</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>涉及：26380,26480
将拷贝的 .aof文件导入即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、新集群验证" tabindex="-1"><a class="header-anchor" href="#三、新集群验证" aria-hidden="true">#</a> 三、新集群验证</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.运维针对恢复后新环境各个模块及功能进行简单测试
2.交付测试
3.配合切换数据上传 （访问地址有变动，都需要打包更新配置）
4.game over
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,61),l=[n];function t(r,u){return d(),a("div",null,l)}const v=e(s,[["render",t],["__file","index.html.vue"]]);export{v as default};
