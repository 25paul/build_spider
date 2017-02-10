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
