const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// node 解决 history路由问题
const history = require('connect-history-api-fallback');
app.use(history());

// 引入配置文件
const config = require('./config');
// 权限列表
$permissionArr = config.permissionArr;

app.use(express.static('www'));

// 引入数据库模块
const Api = require('./server/api.js');
app.use(Api);

const mongoose = require('mongoose');
require('./server/connect.js');
require('./server/model.js');
// 获取 messages 集合并指向 Messages 
const Messages = mongoose.model('messages');
// User 为 model name
const User = mongoose.model('users');    
// UserContacts 指向 联系人表
const UserContacts = mongoose.model('userContacts');



http.listen(3000, function() {
    console.log('app is running of port 3000');
});

var users = {};

// 抽离公共方法

function isTourist(value) {
    return value.slice(0,2) === '游客';
}

var emitOnlineUser = function(u) {
    // 服务器查询用户
    // var query = { name: { $in: Object.keys(u) } }
    // User.find(query, { name: 1, avatar: 1 }, function(err,r) {
    //     if(err) throw err;
    //     io.emit('user join', r);
    // });


    // 带游客
    let res = [];
    new Promise((resolve, reject) => {
        var query = { name: { $in: Object.keys(u) } }
        User.find(query, { name: 1, avatar: 1 }, function(err,r) {
            if(err) throw err;
            resolve(r);
        });
    }).then(res => {
        let touristList = Object.keys(u).filter(isTourist).map(item => {
            return { name: item, avatar: '/static/images/tourist.png' };
        });
        res = res.concat(touristList);
        io.emit('user join', res);
    });
    
}

// socket.io code
io.on('connection', function(socket) {
    var username;

    socket.on('user join', function(user) {
        console.log(user + ' 进入了聊天室');
        username = user;
        users[user] = socket;
        emitOnlineUser(users);         // 用户加入发射在线用户信息
    });

    // 改变 online panel
    socket.on('change onlinePanel', function(f) {
        if(f) {
            emitOnlineUser(users);          // 用户加入发射在线用户信息
        }
    });

    socket.on('disconnect', function() {
        if(username === undefined) return;
        delete users[username];
        console.log('当前聊天室用户 | 离开时触发', Object.keys(users));
        console.log(username + '离开了聊天室');
        emitOnlineUser(users);          // 用户退出刷新在线用户信息
    });

    socket.on('logout', function(name) {
        socket.emit('disconnect');
    });


    // 消息已读
    socket.on('message read', function(res) {
        var msgArr = res.msgs;
        var name = res.readUser;
        var idArr = [];
        if(msgArr.length === 0) return;
        if(msgArr[0].to === 'all') return;
        for(var i = 0;i < msgArr.length;i++) {
            if(msgArr[i].to === name && msgArr[i].read === false) {
                idArr.push(msgArr[i]._id);
            }
        }
        Messages.update({ _id: { $in: idArr } },{ $set: { read: true } }, { multi: true }, function(err,result) {
            if(err) throw err;
            console.log('已阅读：',result);
        });
    });

    socket.on('one message read', function (res) {
        Messages.update(res,{ $set: { read: true } }, function(err,result) {
            if(err) throw err;
            console.log('已阅读一条：',result);
        });
    });

    // 调取离线未读消息
    socket.on('Offline noRead messages', function(name) {
        console.log(name,'调取离线未读消息');
        var query = { to: name, read: false };
        Messages.find(query, function(err,result) {
            users[name] && users[name].emit('Offline noRead messages', result);
        });
    });

    // 调取用户信息
    socket.on('take userInfo', function(name) {
        var query = { name: name };
        User.findOne(query, function(err,result) {
            if(err) throw err;
            if(result !== null) {
                // 记录时长
                var date = new Date().getTime();                        // 时间戳
                var duration = Math.ceil((date - result.date) / (1000 * 60 * 60 * 24));     // 向上取整
                var s = {};
                for(var i in result) {
                    var arr = ['name', 'avatar', 'date', 'sex', 'birthday', 'website', 'place', 'github', 'qq'];
                    if(arr.indexOf(i) !== -1) {
                        s[i] = result[i];
                    }
                }
                var c = {
                    Data: s,
                    duration: duration
                };
                socket.emit('take userInfo', c);
            }
        });
    });


    socket.on('message', function(res) {
        console.log('消息',res);
        console.log('当前聊天室用户 | 发送消息时触发', Object.keys(users));
        // 把消息保存到数据库
        res.date = Date.now();
        var msg = new Messages(res);
        msg.save();

        var to = res.to;
        var from = res.from;
        var r = [];
        r.push(res);
        if(to === 'all') {
            io.emit('message',r);                                   // 全体发送
            socket.broadcast.emit('desktopRemind', r);              // 桌面提醒
        }else {
            users[to] && users[to].emit('message',r);               // 只对特别的人发送
            users[from] && users[from].emit('message',r);
            users[to] && users[to].emit('desktopRemind', r);        // 桌面提醒
            users[from] && users[from].emit('desktopRemind', r);
        }
    });

    // 监听调取messages
    socket.on('take messages', function(res) {
        // 调取数据库消息
        if(res.take === 'all') {
            Messages.find({to: res.take}).
            skip(0*20).
            limit(20).
            sort('-_id').
            exec(function(err, result) {
                // 谁调取聊天记录
                console.log(res.from + '调取聊天记录');
                result.reverse();
                users[res.from] && users[res.from].emit('take messages', result);
            });
        }else {
            var a = res.from;
            var b = res.take;
            Messages.find({
                $or: [ 
                    { from: a, to: b},
                    { from: b, to: a},
                 ],
            }).
            skip(0*50).
            limit(50).
            sort('-_id').
            exec(function(err,result) {
                // 谁调取聊天记录
                console.log(res.from + '调取聊天记录');
                result.reverse();
                users[res.from] && users[res.from].emit('take messages', result);
            });
        }
        
    });

    // 用户状态检查
    socket.on('checkUser', function(res) {
        var query = { name: res };
        User.findOne(query, function(err, result) {
            if(err) throw err;
            if(result === null) {
                users[res] && users[res].emit('checkUser', {Code: -1, Str: '数据库已更新, 请重新注册登录~'});
            } else {
                users[res] && users[res].emit('checkUser', {Code: 0, Str: '用户状态正常~'});
            }
        });
    });

    // 用户权限检查
    socket.on('check permission', function(user) {
        if($permissionArr.indexOf(user) !== -1) {
            socket.emit('check permission', 1);
        } else {
            socket.emit('check permission', 0);
        }
    });

    // 添加联系人
    socket.on('add contacts', function(item) {
        console.log(username + '新添加的联系人是', item);
        let query = UserContacts.findOne({ user: username });
        query.exec(function(err,person) {
            console.log('xxx',person);
            if(err) throw err;
            if(person === null) {
                var contacts = {
                    user: username,
                    contacts: new Array(item)
                };
                var usercontacts = new UserContacts(contacts);
                usercontacts.save();
                socket.emit('contacts update', new Array(item));
                socket.emit('user remind', {
                    message: '你添加了一个小伙伴~',
                    type: 'success'
                });
            } else {
                const conditions = { user: username };
                let flag = true;
                let updateContent = person.contacts;
                const count = updateContent.length - 1;
                updateContent.find((ele,index) => {
                    if(ele.name === item.name) {
                        socket.emit('user remind', {
                            message: '你已经有该小伙伴啦~',
                            type: 'error'
                        });
                        flag = false;
                    }
                });
                if(flag) {
                    updateContent.push(item);
                    let update = {$set : { contacts: updateContent }};
                    UserContacts.update(conditions, update, function (error) {
                        if(error) {
                            console.log(error);
                        } else {
                            socket.emit('user remind', {
                                message: '你添加了一个小伙伴~',
                                type: 'success'
                            });
                            socket.emit('contacts update', updateContent);
                        }
                    });
                }
            }
        })
    });

    // 查找用户联系人
    socket.on('contacts update', function(name) {
        const query = { user: name };
        UserContacts.find(query, function(err,res) {
            if(err) throw err;
            if(res.length > 0) {
                socket.emit('contacts update', res[0].contacts);
            }
        });
    });

    // 用户查找
    socket.on('search user', function(name) {
        const query = { name: new RegExp(name, 'i') }
        User.find(query, { name: 1, avatar: 1 }, function(err,res) {
            if(err) throw err;
            socket.emit('search user', res);
        });
    });

    // typing
    socket.on('typing', function (obj) {
        users[obj.to] && users[obj.to].emit('typing',obj);
    });

    // stop typing
    socket.on('stop typing', function (obj) {
        users[obj.to] && users[obj.to].emit('stop typing',obj);
    });

});
