import{_ as a,p as n,q as s,a1 as e}from"./framework-5866ffd3.js";const i={},l=e(`<h2 id="_1-添加-sasl-配置文件" tabindex="-1"><a class="header-anchor" href="#_1-添加-sasl-配置文件" aria-hidden="true">#</a> 1 添加 sasl 配置文件</h2><p>将kafka_client_jaas.conf/kafka_server_jaas.conf/kafka_zoo_jaas.conf三个文件放入kafka的config文件夹中，文件中配置用户，admin用户必须配置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kafka_client_jaas.conf内容如下
KafkaClient {  
org.apache.kafka.common.security.plain.PlainLoginModule required  
username=&quot;admin&quot;  
password=&quot;admin&quot;;  
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kafka_server_jaas.conf内容如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>KafkaServer {
org.apache.kafka.common.security.plain.PlainLoginModule required
username=&quot;admin&quot;
password=&quot;admin&quot;
user_admin=&quot;admin&quot;
user_test=&quot;test#2018&quot;;
};
KafkaClient {
org.apache.kafka.common.security.plain.PlainLoginModule required
username=&quot;admin&quot;
password=&quot;admin&quot;;
};

Client {
org.apache.kafka.common.security.plain.PlainLoginModule required
username=&quot;admin&quot;
password=&quot;admin&quot;;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kafka_zoo_jaas.conf内容如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ZKServer{
org.apache.kafka.common.security.plain.PlainLoginModule required
username=&quot;admin&quot;
password=&quot;admin&quot;
user_admin=&quot;admin&quot;;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-添加认证方式到-启动文件" tabindex="-1"><a class="header-anchor" href="#_2-添加认证方式到-启动文件" aria-hidden="true">#</a> 2 添加认证方式到 启动文件</h2><p>1.添加到kafka的bin文件夹中的zookeeper-server-start.sh,</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_zoo_jaas.conf -Dzookeeper.sasl.serverconfig=ZKServer&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.添加到kafka的bin文件夹中的kafka-server-start.sh，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_server_jaas.conf&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.添加到kafka的bin文件夹中的kafka-console-producer.sh</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_client_jaas.conf&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4.添加到kafka的bin文件夹中的kafka-console-consumer.sh</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_client_jaas.conf&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5.修改kafka的bin文件夹中的kafka-acls.sh</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export KAFKA_OPTS=&quot; -Djava.security.auth.login.config=/data/localization/kafka/config/kafka_client_jaas.conf&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-添加认证到配置文件" tabindex="-1"><a class="header-anchor" href="#_3-添加认证到配置文件" aria-hidden="true">#</a> 3.添加认证到配置文件</h2><p>1.添加到kafka的config文件夹中的consumer.properties</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2.添加到kafka的config文件夹中的producer.properties</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>security.protocol=SASL_PLAINTEXT
sasl.mechanism=PLAIN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3.添加到kafka的config文件夹中的zookeeper.properties</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>authProvider.1=org.apache.zookeeper.server.auth.SASLAuthenticationProvider
requireClientAuthScheme=sasl
jaasLoginRenew=3600000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-修改kafka的config文件夹中的server-properties" tabindex="-1"><a class="header-anchor" href="#_4-修改kafka的config文件夹中的server-properties" aria-hidden="true">#</a> 4.修改kafka的config文件夹中的server.properties</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>修改：
listeners=SASL_PLAINTEXT://:9092
advertised.listeners=SASL_PLAINTEXT://realtime-1:9092

添加：
#使用的认证协议
security.inter.broker.protocol=SASL_PLAINTEXT
#SASL机制
sasl.enabled.mechanisms=PLAIN
sasl.mechanism.inter.broker.protocol=PLAIN
#完成身份验证的类
authorizer.class.name=kafka.security.auth.SimpleAclAuthorizer
#如果没有找到ACL（访问控制列表）配置，则允许任何操作。
#allow.everyone.if.no.acl.found=true
super.users=User:admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.同步配置文件到别的服务器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">scp</span> /data/localization/kafka/config/kafka_client_jaas.conf realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/kafka_server_jaas.conf realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/kafka_zoo_jaas.conf realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/consumer.properties realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/producer.properties realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/zookeeper.properties realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/server.properties realtime-2:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/bin/zookeeper-server-start.sh realtime-2:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-server-start.sh realtime-2:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-console-producer.sh realtime-2:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-console-consumer.sh realtime-2:/data/localization/kafka/bin/

<span class="token function">scp</span> /data/localization/kafka/config/kafka_client_jaas.conf realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/kafka_server_jaas.conf realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/kafka_zoo_jaas.conf realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/consumer.properties realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/producer.properties realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/zookeeper.properties realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/config/server.properties realtime-3:/data/localization/kafka/config/
<span class="token function">scp</span> /data/localization/kafka/bin/zookeeper-server-start.sh realtime-3:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-server-start.sh realtime-3:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-console-producer.sh realtime-3:/data/localization/kafka/bin/
<span class="token function">scp</span> /data/localization/kafka/bin/kafka-console-consumer.sh realtime-3:/data/localization/kafka/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server.properties
broker.id(各节点唯一)
advertised.listeners (各个服务器)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-重启各个服务" tabindex="-1"><a class="header-anchor" href="#_5-重启各个服务" aria-hidden="true">#</a> 5.重启各个服务</h2><p>1.启动zookeeper服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sh bin/zookeeper-server-start.sh config/zookeeper.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.启动kafka服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sh bin/kafka-server-start.sh config/server.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-给admin用户授权" tabindex="-1"><a class="header-anchor" href="#_6-给admin用户授权" aria-hidden="true">#</a> 6.给admin用户授权</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sh bin/kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2182 --add --allow-principal User:admin --group=* --topic=*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_7-修改lua脚本" tabindex="-1"><a class="header-anchor" href="#_7-修改lua脚本" aria-hidden="true">#</a> 7.修改lua脚本</h2><p>1.需要更新 最新的 lua脚本 代码 修改文件名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span>  /data/localization/nginx/lua/resty

<span class="token function">mv</span> kafka/ kafka-nosasl
<span class="token function">mv</span> kafka-sasl/  kafka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.修改链接方式 /data/localization/nginx/lua/utils/zgConfig.lua</p><div class="language-lua line-numbers-mode" data-ext="lua"><pre class="language-lua"><code><span class="token keyword">local</span> broker_list <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">{</span>
        host <span class="token operator">=</span> <span class="token string">&quot;realtime-1&quot;</span><span class="token punctuation">,</span>
        port <span class="token operator">=</span> <span class="token number">9092</span><span class="token punctuation">,</span>
        sasl_config <span class="token operator">=</span> <span class="token punctuation">{</span>
            mechanism <span class="token operator">=</span> <span class="token string">&quot;PLAIN&quot;</span><span class="token punctuation">,</span>
            user <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
            password <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        host <span class="token operator">=</span> <span class="token string">&quot;realtime-2&quot;</span><span class="token punctuation">,</span>
        port <span class="token operator">=</span> <span class="token number">9092</span><span class="token punctuation">,</span>
        sasl_config <span class="token operator">=</span> <span class="token punctuation">{</span>
            mechanism <span class="token operator">=</span> <span class="token string">&quot;PLAIN&quot;</span><span class="token punctuation">,</span>
            user <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
            password <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        host <span class="token operator">=</span> <span class="token string">&quot;realtime-3&quot;</span><span class="token punctuation">,</span>
        port <span class="token operator">=</span> <span class="token number">9092</span><span class="token punctuation">,</span>
        sasl_config <span class="token operator">=</span> <span class="token punctuation">{</span>
            mechanism <span class="token operator">=</span> <span class="token string">&quot;PLAIN&quot;</span><span class="token punctuation">,</span>
            user <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span>
            password <span class="token operator">=</span> <span class="token string">&quot;admin&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">-- config</span>
<span class="token keyword">local</span> zgConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
    broker_list <span class="token operator">=</span> broker_list
<span class="token punctuation">}</span>
<span class="token keyword">return</span> zgConfig<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.reload nginx 即可</p><h2 id="_8-更新后常用kafka-命令-待补充" tabindex="-1"><a class="header-anchor" href="#_8-更新后常用kafka-命令-待补充" aria-hidden="true">#</a> 8.更新后常用kafka 命令(待补充)</h2><p>1.给用户test授予某个topic的读写的权限</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-acls.sh --authorizer-properties <span class="token assign-left variable">zookeeper.connect</span><span class="token operator">=</span>localhost:2182 <span class="token parameter variable">--add</span> --allow-principal User:test <span class="token parameter variable">--operationRead</span> <span class="token parameter variable">--operationWrite</span> <span class="token parameter variable">--topic</span> <span class="token builtin class-name">test</span> <span class="token parameter variable">--group</span><span class="token operator">=</span>*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>说明： 控制读写：–operationRead–operationWrite 控制消费组：不控制组 --group=*，指定消费组 --grouptest-comsumer-group</p></blockquote><p>2.移除权限 执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-acls.sh --authorizer-properties <span class="token assign-left variable">zookeeper.connect</span><span class="token operator">=</span>localhost:2182 <span class="token parameter variable">--remove</span> --allow-principal User:test --allow-host <span class="token number">192.168</span>.1.101 <span class="token parameter variable">--operationRead</span> <span class="token parameter variable">--operationWrite</span> <span class="token parameter variable">--topic</span> <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.列出topic为test的所有权限账户 执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-acls.sh --authorizer-properties <span class="token assign-left variable">zookeeper.connect</span><span class="token operator">=</span>localhost:2182 <span class="token parameter variable">--list</span> <span class="token parameter variable">--topic</span> <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4.测试启动消费者 执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-console-consumer.sh --bootstrap-server <span class="token number">127.0</span>.0.1:9092 <span class="token parameter variable">--topic</span> <span class="token builtin class-name">test</span> --from-beginning <span class="token parameter variable">--consumer.config</span> config/consumer.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5.测试启动生产者 执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-console-producer.sh --broker-list <span class="token number">127.0</span>.0.1:9092 <span class="token parameter variable">--topic</span> <span class="token builtin class-name">test</span> <span class="token parameter variable">--producer.config</span> config/producer.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>6.查看topic列表</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> bin/kafka-topics.sh <span class="token parameter variable">--list</span> <span class="token parameter variable">--zookeeper</span> localhost:2182 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,58),t=[l];function o(r,c){return n(),s("div",null,t)}const p=a(i,[["render",o],["__file","kafkaSaslPlain.html.vue"]]);export{p as default};
