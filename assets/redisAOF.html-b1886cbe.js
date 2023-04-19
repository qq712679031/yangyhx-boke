import{_ as e,p as i,q as a,a1 as d}from"./framework-5866ffd3.js";const l={},n=d(`<h3 id="redis使用aof方式迁移数据" tabindex="-1"><a class="header-anchor" href="#redis使用aof方式迁移数据" aria-hidden="true">#</a> Redis使用AOF方式迁移数据</h3><ul><li>开启aof文件</li></ul><blockquote><p>首先，使用redis-cli登录redis，然后开启aapendonly</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt; config set appendonly yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>或者在登录的时候也可以开启，也就是上面命令也等价于：</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ redis-cli -h 127.0.0.1 -p 26480  config set appendonly yes
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>开启appendonly之后，就会在配置文件的地方生成一个aof文件 如果不知道配置文件在哪里，可以使用下面命令查看：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-cli -h realtime-1 -p 26480              
realtime-1:26480&gt; config get dir
1) &quot;dir&quot;
2) &quot;/data/redis_26480&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看生成aof文件的数据目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># cd /data/redis_26480/
# ls
  appendonly.aof
  dump.rdb
# 可以看到生成了一个 appendonly.aof 文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>迁移aof文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>将生成的aof文件拷贝至目标redis所在机器或网络
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>数据导入</li></ul><blockquote><p>在另外一个服务器，导入appendonly.aof文件就行了：</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@realtime-3 anli]# redis-cli -h realtime-3 -p 6379  --pipe &lt; appendonly.aof
All data transferred. Waiting for the last reply...
Last reply received from server.
errors: 0, replies: 27917
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>注意：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>aof文件其实就是将redis中所有的执行命令汇聚到一个文件中，当导入时，相当于全部重新执行了一遍命令，从而起到了备份的作用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>关闭aof功能</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-cli -h realtime-1 -p 26480  
&gt;&gt; config set appendonly no
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,19),s=[n];function t(r,c){return i(),a("div",null,s)}const u=e(l,[["render",t],["__file","redisAOF.html.vue"]]);export{u as default};
