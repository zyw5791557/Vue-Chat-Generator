/**
 * @requires - 依赖
 * express              服务器框架
 * mongoose             数据库操作
 * body-parser          参数解析
 * 
 * @node-module - node 模块加载        
 * http                 
 * url
 * crypto
 * 
 * @db table model
 * User                 用户数据模型
 * Messages             聊天记录数据模型
 * LoginState           用户登录记录数据模型
 * 
 * @config - 配置文件
 * config
 * 
 * @constant - 常量
 * api                  api prefix
 * $salt                加盐
 * STATIC_SERVER        静态资源服务器地址配置
 * 
 * @function - 函数
 * PostCallbackData     配置登录逻辑函数
 * 
 * @api - 接口
 * '/api/login'         登录
 * '/api/register'      注册
 * '/api/userEdit'      用户信息更新
 * '/api/imgload'       图片防盗链处理
 * 
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./connect.js');
require('./model.js');

// 引入配置文件
const config = require('../config');

const User = mongoose.model('users');
const Messages = mongoose.model('messages');
const LoginState = mongoose.model('userLoginState');
const UserContacts = mongoose.model('userContacts');

mongoose.Promise = global.Promise;                       // 为了避免警告的出现, 因为 mongoose 的默认 promise 已经弃用了。

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const http = require('http');
const url = require('url');


// 加密
const crypto = require('crypto');
const $salt = config.$salt;                        

// 静态资源服务器地址配置
const STATIC_SERVER = config.STATIC_SERVER;


// 配置登录逻辑
function PostCallbackData(obj) {
    this.Code = obj.Code;
    this.Data = obj.Data;
    if(obj.avatar) {                // 头像
        this.avatar = obj.avatar;
    }
    if(obj.duration) {              // 时长
        this.duration = obj.duration;
    }
}


const api = '/api';

app.post( api + '/login',function(req,res) {
    var date = new Date().getTime();                        // 时间戳
    var ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    var str = '';
    req.on("data", function(chunk) {
        str += chunk;
    });
    req.on('end', function() {
        var parseStr = JSON.parse(str);
        // 使用 sha1 加密算法
        var sha1Res = crypto.createHash('sha1').update($salt + parseStr.pwd).digest('hex');
        parseStr.pwd = sha1Res;
        User.findOne(parseStr, function(err, result) {
            if(err) throw err;
            if(result == null) {
                var c = new PostCallbackData({
                    Code: -1,
                    Data: "账号或密码错误!"
                });
                res.send(JSON.stringify(c));
            }else {
                var record = {
                    user: parseStr.name,
                    date: date,
                    remoteAddress: ip
                };
                // 保存用户登录记录
                var loginState = new LoginState(record);
                loginState.save();
                // 记录时长
                var duration = Math.ceil((date - result.date) / (1000 * 60 * 60 * 24));     // 向上取整
                var s = {};
                for(var i in result) {
                    var arr = ['name', 'avatar', 'token', 'date', 'sex', 'birthday', 'website', 'place', 'github', 'qq'];
                    if(arr.indexOf(i) !== -1) {
                        s[i] = result[i];
                    }
                }
                var c = new PostCallbackData({
                    Code: 0,
                    Data: s,
                    duration: duration
                });
                res.send(JSON.stringify(c));
            }
        });
    });
});


// 配置注册视图
app.post( api + '/register', function(req, res) {
    var date = new Date().getTime();                        // 时间戳
    var ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    var str = '';
    req.on("data", function(chunk) {
        str += chunk;
    });
    req.on("end",function(){
        var parseStr = JSON.parse(str);
        parseStr.date = date;
        // 使用 sha1 加密算法
        var sha1Res = crypto.createHash('sha1').update($salt + parseStr.name).digest('hex');
        parseStr.token = sha1Res;
        // 默认头像
        parseStr.avatar = STATIC_SERVER + '/images/users/default.png';
        var query = User.findOne({name: parseStr.name});
        query.exec(function(err,person) {
            if(err) throw err;
            if(person == null) {
                // 使用 sha1 加密算法
                var sha1Res = crypto.createHash('sha1').update($salt + parseStr.pwd).digest('hex');
                parseStr.pwd = sha1Res;
                var user = new User(parseStr);
                user.save();
                var record = {
                    user: parseStr.name,
                    date: date,
                    remoteAddress: ip
                };
                // 保存用户登录记录
                var loginState = new LoginState(record);
                loginState.save();
                var c = new PostCallbackData({
                    Code: 0,
                    Data: "注册成功!"
                });
                res.send(JSON.stringify(c));
            }else {
                var c = new PostCallbackData({
                    Code: 1,
                    Data: "账号已存在!"
                });
                res.send(JSON.stringify(c));
            }
        });
    });
});


// 用户信息上传
app.post(api + '/userEdit', function(req, res) {
    var str = '';
    req.on('data', function(chunk) {
        str += chunk;
    });
    req.on('end', function() {
        var parseStr = JSON.parse(str);
        var query = { name: parseStr.name };
        User.findOne(query, function(err,result) {
            if(err) throw err;
            if(result == null) {
                res.send({ Code: -1, Str: '数据库变更, 请重新登录!' });
            } else {
                console.log(result);
                var newVal = { $set: {
                    sex: parseStr.sex,
                    birthday: parseStr.birthday,
                    place: parseStr.place,
                    website: parseStr.website,
                    github: parseStr.github,
                    qq: parseStr.qq
                } };
                // 更新数据库 User 表对应用户的信息
                User.update(query, newVal, function(err, rres) {
                    if(err) {
                        res.send({ Code: -2, Str: '用户信息修改失败, 请刷新重新尝试!' });
                    } else {
                        res.send({ Code: 0, Str: '用户信息修改成功!', Data: parseStr });
                    }
                });
            }
        });
    });
});



// 开放数据库模块
module.exports = app