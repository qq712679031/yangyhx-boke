import{_ as s,p as e,q as n,a1 as i}from"./framework-5866ffd3.js";const a={},d=i(`<h2 id="ssdb数据迁移至redis" tabindex="-1"><a class="header-anchor" href="#ssdb数据迁移至redis" aria-hidden="true">#</a> SSDB数据迁移至Redis</h2><h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>使用ssdb-port将SSDB数据库同步到redis数据库
ssdb-port是一款适用于SSDB数据库的数据同步工具
可实现实时单向数据同步。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="同步操作的限制" tabindex="-1"><a class="header-anchor" href="#同步操作的限制" aria-hidden="true">#</a> 同步操作的限制</h4><ul><li>注意</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>在SSDB中执行ssdb-port暂不支持的命令修改的数据将无法同步到Redis中。
使用hset或hget命令时，如果对象key为中文则该操作无法同步。使用其它支持的命令无此限制
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>ssdb命令</li></ul><blockquote><p>目前支持同步的SSDB命令如下</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set
setx
setnx
expire
del
get
incr
qpop_front
qpush_front
qclear
qtrim_front
qtrim_back
zset
zdel
zincr
multi_zdel
multi_zset
hset
hdel
hclear
multi_hset
multi_hdel
hincr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装准备" tabindex="-1"><a class="header-anchor" href="#安装准备" aria-hidden="true">#</a> 安装准备</h3><ul><li>前提</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ssdb-port需要能够连接源ssdb与目的redis，作为实时同步的工具
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>同步原理</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ssdb-port 作为ssdb从节点进行启动，然后将获取到的数据解析转换为redis支持的格式后后发送至redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>注意</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>需要注意的是ssdb-port是实时同步的工具
因此全量同步完成后，在连接关闭前，SSDB中新增的数据也会增量同步到Redis实例中
如只需历史数据，请记得先把源ssdb的其他写进口停掉，不然会一直有数据进来，一直在同步
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装ssdb-port" tabindex="-1"><a class="header-anchor" href="#安装ssdb-port" aria-hidden="true">#</a> 安装ssdb-port</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># wget http://docs-aliyun.cn-hangzhou.oss.aliyun-inc.com/assets/attach/94155/cn_zh/1547627852086/ssdb-port.tar.gz
# tar -xvf ssdb-port.tar.gz
# cd ssdb-port

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a> 修改配置文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># cd ssdb-port
# vi ssdb_port.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>ssdb_port.conf</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># ssdb_port的数据目录，一般默认当前目录下（注意磁盘）</span>
work_dir <span class="token operator">=</span> ./var_ssdb_port  
pidfile <span class="token operator">=</span> ./var_ssdb_port/ssdb.pid

<span class="token comment"># ssdb-port的连接信息，无需修改（这里是ssdb-port的端口）</span>
server:
    ip: <span class="token number">127.0</span>.0.1
    port: <span class="token number">8899</span>
    <span class="token comment">#readonly: yes</span>

replication:
    binlog: <span class="token function">yes</span>
        capacity: <span class="token number">100000000</span>
    <span class="token comment"># Limit sync speed to *MB/s, -1: no limit</span>
    sync_speed: <span class="token parameter variable">-1</span>
    slaveof:
        <span class="token comment"># to identify a master even if it moved(ip, port changed)</span>
        <span class="token comment"># if set to empty or not defined, ip:port will be used.</span>
        id: svc_1
        <span class="token comment"># sync|mirror, default is sync</span>
        type: <span class="token function">sync</span>
        host: localhost <span class="token comment"># SSDB Master（源SSDB数据库）的连接地址</span>
        port: <span class="token number">8888</span> <span class="token comment"># SSDB Master（源SSDB数据库）的端口</span>
        <span class="token comment">#auth: password</span>
        redis_host: localhost <span class="token comment"># 目的Redis实例的连接地址</span>
        redis_port: <span class="token number">6379</span>  <span class="token comment"># 目的Redis实例的端口</span>
        redis_auth: password  <span class="token comment"># 目的Redis实例的认证密码（没有密码可注释此项）</span>

logger:
    level: debug
    output: log_ssdb_port.txt  <span class="token punctuation">(</span>生成的日志，根据数据量大小决定，还是挺大的，记录了所有操作<span class="token punctuation">)</span>
    rotate:
        size: <span class="token number">1000000000</span>

leveldb:
    <span class="token comment"># in MB</span>
    cache_size: <span class="token number">500</span>
    <span class="token comment"># in MB</span>
    write_buffer_size: <span class="token number">64</span>
    <span class="token comment"># in MB/s</span>
    compaction_speed: <span class="token number">1000</span>
    <span class="token comment"># yes|no</span>
    compression: <span class="token function">yes</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行操作" tabindex="-1"><a class="header-anchor" href="#执行操作" aria-hidden="true">#</a> 执行操作</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ssdb-port
./ssdb-port-2.17 ssdb_port.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>如果数据量大，执行时间过长，可以使用 <code>nohup</code> 方式执行。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ssdb-port
<span class="token function">nohup</span> ./ssdb-port-2.17 ssdb_port.conf <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据验证" tabindex="-1"><a class="header-anchor" href="#数据验证" aria-hidden="true">#</a> 数据验证</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.ssdb_prot是进行数据同步的，因此如果old服务一直有数据进来，就会一直同步。
2.可登录redis实例检查数据同步是否完成
3.如果只是同步历史数据，同步完成后再日志log_ssdb_port.txt 中可以看到同步完成的字样
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&lt;......copy end......&gt;</p><p><img src="https://note.youdao.com/yws/res/10707/A06215990E564BF0A14385EFBB4472DF" alt="image"></p>`,30),l=[d];function r(t,c){return e(),n("div",null,l)}const o=s(a,[["render",r],["__file","ssdbToredis.html.vue"]]);export{o as default};
