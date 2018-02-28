/**
 * @requires
 * mongoose                 mongodb 操作库
 * 
 * @db table model
 * UserSchema               用户集合
 * LoginStateSchema         用户登录记录集合
 * MessagesSchema           消息记录集合
 * UserContactsSchema       用户联系人集合
 * 
 */
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({  
    name: String,
    pwd: String,
    avatar: String,
    token: String,
    date: Number,
    sex: String,
    birthday: String,
    place: String,
    website: String,
    github: String,
    qq: String
});
// 将该 Schema 发布为 Model, 第一个参数为数据库的集合, 没有会自动创建
mongoose.model('users', UserSchema);       


const LoginStateSchema = new mongoose.Schema({
    user: String,
    date: Number,
    remoteAddress: String,
});
mongoose.model('userLoginState', LoginStateSchema);


const MessagesSchema = new mongoose.Schema({
    from: String,
    avatar: String,
    to: String,
    message: String,
    type: String,
    date: Number,
    read: Boolean
});
mongoose.model('messages', MessagesSchema);


const UserContactsSchema = new mongoose.Schema({
    user: String,
    contacts: Array
});
mongoose.model('userContacts', UserContactsSchema);