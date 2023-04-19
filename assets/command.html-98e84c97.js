import{_ as s,p as e,q as a,a1 as n}from"./framework-5866ffd3.js";const r={},l=n(`<h2 id="hdfs查看目录文件的大小" tabindex="-1"><a class="header-anchor" href="#hdfs查看目录文件的大小" aria-hidden="true">#</a> hdfs查看目录文件的大小</h2><ol><li>第一种方式：查看当前目录下的各级目录 分别大小</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>hdfs dfs <span class="token parameter variable">-du</span> <span class="token parameter variable">-h</span> /user/hive/warehouse/

<span class="token comment">#第一列为单个文件实际大小，第二列为备份大小，第三列为详情目录。</span>
<span class="token comment">#查看结果</span>
<span class="token number">19.7</span> K   <span class="token number">59.0</span> K   /user/hive/warehouse/hive_test
<span class="token number">0</span>        <span class="token number">0</span>        /user/hive/warehouse/test_float
<span class="token number">67</span>       <span class="token number">201</span>      /user/hive/warehouse/test_float2
<span class="token punctuation">..</span>. <span class="token punctuation">..</span>. /<span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>第二种方式：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>hdfs dfs <span class="token parameter variable">-ls</span> <span class="token parameter variable">-h</span> /user/hive/warehouse/
<span class="token comment">#这种方式需要注意：当子文件目录过多时，统计的大小为0。</span>
drwxrwxrwt   - hdfs hive          <span class="token number">0</span> <span class="token number">2020</span>-11-09 <span class="token number">14</span>:13 /user/hive/warehouse/hive_test
drwxrwxrwt   - hdfs hive          <span class="token number">0</span> <span class="token number">2020</span>-11-20 <span class="token number">17</span>:51 /user/hive/warehouse/test_float
drwxrwxrwt   - hdfs hive          <span class="token number">0</span> <span class="token number">2020</span>-11-20 <span class="token number">18</span>:05 /user/hive/warehouse/test_float2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>第三种方式： 查看指定目录的总大小 命令： hdfs dfs -du -s -h /目录</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>hdfs dfs <span class="token parameter variable">-du</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-h</span> /user/hive/warehouse/

<span class="token number">97.1</span> G  <span class="token number">291.3</span> G /user/hive/warehouse
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一列标示该目录下总文件大小</p><p>第二列标示该目录下所有文件在集群上的总存储大小和你的副本数相关，我的副本数是3 ，所以第二列的是第一列的三倍 （第二列内容=文件大小*副本数）</p><p>第三列标示你查询的目录</p>`,10),i=[l];function t(d,c){return e(),a("div",null,i)}const o=s(r,[["render",t],["__file","command.html.vue"]]);export{o as default};
