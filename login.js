/*
    入口文件（前端+后端+数据库）
*/
const express = require('express');
const path = require('path');
const router = require('./router.js');
const template = require('art-template');
const bodyParser = require('body-parser');
const db = require('./db.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// 设置模板引擎
// 设置模板的路径
// app.set('views',path.join(__dirname,'views'));
// // 设置模板引擎
// app.set('view engine','html');
// // 使express兼容art-template模板引擎
// app.engine('art', require('express-art-template'));


// 启动服务器功能
// 配置路由
app.use(router);
// 监听端口
app.listen(3000,()=>{
    console.log('running...');
});
