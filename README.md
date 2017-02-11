# build_spider
build a spider from jikexueyuan

## 爬虫以及Robots协议介绍
**爬虫**，是一种自动获取网页内容的程序。是搜索引擎的重要组成部分，因此搜索引擎优化很大程度上就是针对爬虫而做出的优化。<br/>

如果数据量很大，而且你的算法又比较强大，并且可以给别人检索服务的话，那么你的爬虫就是一个小百度或者小谷歌了

http://www.csdn.net/article/2015-11-13/2826205

**Robots协议**（也称为爬虫协议、机器人协议等）的全称是“网络爬虫排除标准”（Robots Exclusion Protocol），网站通过Robots协议告诉搜索引擎哪些页面可以抓取，哪些页面不能抓取。　<br/>

robots.txt 是一个文本文件，robots.txt 是一个协议，不是一个命令。robots.txt 是爬虫要查看的第一个文件。robots.txt 文件告诉爬虫在服务器上什么文件是可以被查看的，搜索机器人就会按照该文件中的内容来确定访问的范围。NodeJS 底层引擎是 JS，JS 天生为操作 DOM 而生，所以用 NodeJS 开发爬虫非常简单。<br/>

当一个搜索蜘蛛访问一个站点时，它会首先检查该站点根目录下是否存在robots.txt，如果存在，搜索机器人就会按照该文件中的内容来确定访问的范围；<br/>
如果该文件不存在，所有的搜索蜘蛛将能够访问网站上所有没有被口令保护的页面。<br/>

可以通过robots.txt来查找对应的内容：https://nba.hupu.com/robots.txt<br/>

## 搭建开发环境
在Node.js环境下，需要用到一下模块：
* Express
* Request
* Cheerio

可以在这里找到模块的用法：https://www.npmjs.com

### Express
http://www.expressjs.com.cn/
### Request
https://www.npmjs.com/package/request<br/>

request模块让http请求变的更加简单，如下：<br/>

```
var express = require('express');
var app = express();
 
app.get('/', function(req, res){
 res.send('hello world');
});
 
app.listen(3000);
```
### Cheerio
cherrio 是为服务器特别定制的，快速、灵活、实施的jQuery核心实现。<br/>

通过cherrio,我们就可以将抓取到的内容，像使用jquery的方式来使用了。<br/>

https://www.npmjs.com/package/cheerio<br/>

```
var cheerio = require('cheerio'),
$ = cheerio.load('<h2 class="title">Hello world</h2>');
$('h2.title').text('Hello there!');
```

### 安装Express
到对应的目录下，执行npm init，进行一系列信息配置<br/>

http://jingyan.baidu.com/article/1974b2898f3cadf4b1f77420.html<br/>

http://www.jianshu.com/p/3f71d1895940<br/>

**或者**，使用其他方法

用express直接创建一个项目。安装之后node.js和express之后，还要配置系统环境，不然express命令不能用。<br/>

http://jingyan.baidu.com/article/922554468a3466851648f419.html<br/>

http://jingyan.baidu.com/article/7f41ecec0e3a25593d095c26.html<br/>

装好之后就执行命令：express spider，创建一个基于Express的项目。<br/>

**注意：**由于我是在FAT32的磁盘格式下建立的项目，所以会报错：https://segmentfault.com/q/1010000008042797。到NTFS格式下建立即可。<br/>

安装依赖包：cnpm install<br/>

启动cnpm start.监听的是3000端口，打开localhost:3000<br/>

退出，然后安装request。回到目录spider下，执行命令： cnpm install request --save-dev<br/>

#### npm install --save 与 npm install --save-dev 的区别：
一个放在package.json 的dependencies , 一个放在devDependencies里面；产品模式用dependencies，开发模式用devDep。<br/>

--save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。<br/>

比如，你写 ES6 代码，如果你想编译成 ES5 发布那么 babel 就是devDependencies。如果你用了 jQuery，由于发布之后还是依赖jQuery，所以是dependencies。<br/>

接着安装cheerio，方法同上.

## 实战
使用app.js，将其原本的代码清空，直接使用官网给的示例：http://www.expressjs.com.cn/4x/api.html<br/>
```
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
```

这里要用到supervisor：所以还得先安装（并不是装在项目里，而是系统里面）：http://www.cnblogs.com/pigtail/archive/2013/01/08/2851056.html<br/>

执行命令：npm -g install supervisor<br/>

然后执行：supervisor start app.js，就可以打开http://localhost:3000/了<br/>

在npm找到request：https://www.npmjs.com/package/request，示例：<br/>
```
var request = require('request');
request('https://www.lagou.com/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
})
```
复制到app.js.<br/>

引入cheerio</br>
```
var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');

app.get('/', function(req, res){
request('https://www.lagou.com/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);   //当前的$就是一个拿到了整个body的前端开发选择器
    res.send("几大类："+$('.mainNavs .menu_box h2').text())
  }
})});

app.listen(3000);

console.log("it is listening!")
```
我们抓到的内容都返回到了request的body里面。cherrio可以获取所有的dom选择器。<br/>

在使用爬虫的时候，还要使用到request的异步请求把数据给拉取过来，这样才能实现一个完整地请求。<br/>

还有就是规定每天几时爬，这也有相关的模块。<br/>

可以查找所爬网站的robots：http://www.lagou.com/robots.txt<br/>
```
var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');

app.get('/', function(req, res){
request('https://www.lagou.com/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);   //当前的$就是一个拿到了整个body的前端开发选择器
    res.send("几大类："+$('.mainNavs .menu_box h2').text())
  }
})});

app.listen(3000);

console.log("it is listening!")
```

