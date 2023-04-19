import{_ as a,M as i,p as l,q as d,R as s,t as n,N as u,a1 as c}from"./framework-5866ffd3.js";const t={},r={href:"https://kudu.apache.org/docs/release_notes.html",target:"_blank",rel:"noopener noreferrer"},o=c(`<h2 id="_1-准备软件" tabindex="-1"><a class="header-anchor" href="#_1-准备软件" aria-hidden="true">#</a> 1.准备软件</h2><ul><li>将kudu 升级包 发送到对应的机器上</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>升级包地址:
	跳板机: /data/download/secure-patch/kudu1.15/kudu1.15.zip
	
下载地址:
	<span class="token function">wget</span> <span class="token number">54.222</span>.198.31:88/kudu1.15/kudu1.15.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-开始升级" tabindex="-1"><a class="header-anchor" href="#_2-开始升级" aria-hidden="true">#</a> 2.开始升级</h2><ol><li>解压文件夹</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /data/

<span class="token function">wget</span> <span class="token number">54.222</span>.198.31:88/kudu1.15/kudu1.15.zip

<span class="token function">unzip</span> kudu1.15.zip 

<span class="token builtin class-name">cd</span> kudu1.15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>替换对应的kudu 文件</li></ol><blockquote><p>注意 需要一台一台重启  不要一下全部替换 全部重启</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> update_kudu.sh
---------------------------------------
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">cd</span> /lib/kudu/sbin

<span class="token function">mv</span> kudu-master kudu-master-old
<span class="token function">mv</span> kudu-tserver kudu-tserver-old

<span class="token function">cp</span> /data/kudu1.15/kudu-master <span class="token builtin class-name">.</span>
<span class="token function">cp</span> /data/kudu1.15/kudu-tserver <span class="token builtin class-name">.</span>

<span class="token function">chmod</span> <span class="token number">777</span> kudu-master
<span class="token function">chmod</span> <span class="token number">777</span> kudu-tserver

<span class="token builtin class-name">cd</span> /lib/kudu/bin
<span class="token function">mv</span> kudu kudu-old
<span class="token function">cp</span> /data/kudu1.15/kudu <span class="token builtin class-name">.</span>

<span class="token function">chmod</span> <span class="token number">777</span> kudu

----------------------------------------


<span class="token function">sh</span> update_kudu.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>重启 一台 kudu-tserver</li></ol><blockquote><p>如果报启动失败 很正常 top 查看 kudu 任务是否已经启动</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">service</span> kudu-tserver stop

<span class="token function">service</span> kudu-tserver start 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>观察kudu tserver 的恢复情况</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token parameter variable">-u</span> kudu kudu cluster ksck realtime-1,realtime-2,realtime-3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>直到 kudu ksck 文件正常 <ul><li>未完成</li><li><img src="https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/kudu/kudu01.png" alt="kudu01.png"></li><li>已完成</li><li><img src="https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/kudu/kudu03.png" alt="kudu02.png"></li></ul></li></ul><ol start="5"><li>对剩余的 kudu tserver 重复前面的步骤 直到全部启动完成</li></ol><h2 id="_3-升级主服务器" tabindex="-1"><a class="header-anchor" href="#_3-升级主服务器" aria-hidden="true">#</a> 3.升级主服务器</h2><ul><li>一台一台重启主服务器</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">service</span> kudu-master stop
<span class="token function">service</span> kudu-master start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>完成图</li><li><img src="https://yyhbook-1300437152.cos.ap-beijing.myqcloud.com/kudu/kudu02.png" alt="kudu03.png"></li></ul>`,20);function v(p,m){const e=i("ExternalLinkIcon");return l(),d("div",null,[s("p",null,[n("在升级之前，阅读即将安装的 Kudu 版本的"),s("a",r,[n("发行说明。"),u(e)]),n("密切注意那里记录的不兼容性、升级和降级说明。 注意: 需要对tserver 一台一台重启 保证kudu 服务一直在运行中 不要全部停掉重启")]),o])}const b=a(t,[["render",v],["__file","kuduUpgrade.html.vue"]]);export{b as default};
