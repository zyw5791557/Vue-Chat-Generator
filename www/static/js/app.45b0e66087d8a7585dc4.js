webpackJsonp([6],{152:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(238),s=(o(a),n(13)),r=o(s),u=n(442),i=o(u),c=n(446),f=o(c);n(514);var l=n(515),T=o(l);n(516),n(517);var E=n(518),S=o(E),d=n(545),m=o(d);n(546);var A=n(547),_=o(A),U=n(549),I=o(U),p=n(569),D=o(p),P=n(570),O=o(P),R=n(219),h=o(R);r.default.use(f.default),r.default.use(T.default),r.default.use(S.default),r.default.prototype.$NProgress=m.default,r.default.use(I.default);var v=D.default.$SOCKET_URL,C=O.default.connect(v,{reconnection:!0});r.default.prototype.$socket=C,r.default.prototype.$SocketClient=h.default,r.default.prototype.$STATIC_URL=D.default.$STATIC_URL,r.default.prototype.$BASE_URL="/api",e.default=new r.default({router:_.default,store:S.default,created:function(){h.default.initChat(this)},render:function(t){return t(i.default)}}).$mount("#app")},187:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",components:{},mounted:function(){}}},217:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.UPDATE_CONNECTSTATE="UPDATE_CONNECTSTATE",e.UPDATE_USERINFO="UPDATE_USERINFO",e.UPDATE_TOURISTINFO="UPDATE_TOURISTINFO",e.UPDATE_GLOBALMASK="UPDATE_GLOBALMASK",e.UPDATE_LYRICSTATE="UPDATE_LYRICSTATE",e.UPDATE_USERSETTINGSTATE="UPDATE_USERSETTINGSTATE",e.UPDATE_SYSTEMSETTINGSTATE="UPDATE_SYSTEMSETTINGSTATE",e.UPDATE_USERPANELSTATE="UPDATE_USERPANELSTATE",e.UPDATE_ROOMNOTICESTATE="UPDATE_ROOMNOTICESTATE",e.UPDATE_ROOMINFOSTATE="UPDATE_ROOMINFOSTATE",e.UPDATE_EXPRESSIONSTATE="UPDATE_EXPRESSIONSTATE",e.UPDATE_CODEINPUTSTATE="UPDATE_CODEINPUTSTATE",e.UPDATE_CONTACTSPANELSTATE="UPDATE_CONTACTSPANELSTATE",e.DELETE_DB_MESSAGE="DELETE_DB_MESSAGE",e.UPDATE_ONLINEUSERS="UPDATE_ONLINEUSERS",e.UPDATE_MYUSERLISTARR="UPDATE_MYUSERLISTARR",e.UPDATE_CURRENTCHATDATA="UPDATE_CURRENTCHATDATA",e.UPDATE_USERLIST="UPDATE_USERLIST",e.UPDATE_CURRENTCHATUSERINFO="UPDATE_CURRENTCHATUSERINFO",e.UPDATE_LOADING="UPDATE_LOADING",e.CLEAR_HISTORY="CLEAR_HISTORY",e.UPDATE_LATEST_MESSAGE="UPDATE_LATEST_MESSAGE",e.UPDATE_TYPINGSTATE="UPDATE_TYPINGSTATE",e.UPDATE_SEARCHUSERRES="UPDATE_SEARCHUSERRES",e.UPDATE_MYCONTACTSLIST="UPDATE_MYCONTACTSLIST"},219:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function a(t,e){console.log("桌面提醒啊啊啊",t);var n=null!==e.$store.state.userInfo?e.$store.state.userInfo.name:e.$store.state.touristInfo.name;if(t[0].from!==n){var o=JSON.parse(localStorage.getItem("desktopNotification"));if(JSON.parse(localStorage.getItem("soundNotification"))){new Audio("/static/audio/momo.mp3").play()}o&&Notification.requestPermission(function(e){if("granted"==e){var n=new Notification(("all"===t[0].to?"群聊窗口":t[0].from)+"- 发来消息",{dir:"auto",lang:"zh-CN",icon:"/static/images/sleep.gif",body:t[0].from+"："+(0,f.noticeProcess)(t[0].message,t[0].type)});n.onclick=function(){window.focus(),n.close()},n.onshow=function(){setTimeout(function(){n.close()},3e3)}}})}}function s(t,e){var n=null!==e.$store.state.userInfo?e.$store.state.userInfo.name:e.$store.state.touristInfo.name,o=e.$store.state.currentChatUserInfo.userID;""!==o?"all"==t[0].to&&"all"!==o?e.$store.commit("UPDATE_MYUSERLISTARR",{addRead:!0,userID:"all"}):"all"!==t[0].to&&t[0].from!==n&&o!==t[0].from&&(void 0===e.$store.state.myUserListArr[t[0].from]?e.$store.commit("UPDATE_MYUSERLISTARR",{key:t[0].from,value:{noRead:1}}):e.$store.commit("UPDATE_MYUSERLISTARR",{addRead:!0,userID:t[0].from})):"all"==t[0].to&&"all"!==o?e.$store.commit("UPDATE_MYUSERLISTARR",{addRead:!0,key:null,value:null,userID:"all"}):"all"!==t[0].to&&t[0].from!==n&&o!==t[0].from&&(void 0===e.$store.state.myUserListArr[t[0].from]?e.$store.commit("UPDATE_MYUSERLISTARR",{key:t[0].from,value:{noRead:1}}):e.$store.commit("UPDATE_MYUSERLISTARR",{addRead:!0,userID:t[0].from}))}Object.defineProperty(e,"__esModule",{value:!0});var r=n(543),u=o(r),i=n(544),c=o(i),f=n(237),l=function(){function t(){(0,u.default)(this,t)}return(0,c.default)(t,null,[{key:"initChat",value:function(t){this.connectOn(t),this.disconnectOn(t),this.checkPermissionOn(t),this.userJoinOn(t),this.takeUserInfoOn(t),this.takeMessageOn(t),this.messagesOn(t),this.desktopRemind(t),this.offlineNoReadMessagesOn(t),this.typingOn(t),this.stopTypingOn(t),this.searchUserOn(t),this.contactsUpdateOn(t),this.userRemind(t)}},{key:"connectOn",value:function(t){t.$socket.on("connect",function(){t.$store.commit("UPDATE_CONNECTSTATE",!0)})}},{key:"disconnectOn",value:function(t){t.$socket.on("disconnect",function(){t.$store.commit("UPDATE_CONNECTSTATE",!1)})}},{key:"userJoinOn",value:function(t){t.$socket.on("user join",function(e){console.log(e),t.$store.commit("UPDATE_ONLINEUSERS",e)})}},{key:"takeMessageOn",value:function(t){t.$socket.on("take messages",function(e){console.log("历史记录：",e),t.$store.commit("UPDATE_LOADING",!1),t.$store.commit("UPDATE_CURRENTCHATDATA",{concat:!1,data:e}),t.$store.commit("SOCKET_MESSAGE_READ_EMIT",{readUser:t.$store.state.userInfo.name,msgs:t.$store.state.currentChatData}),e.length>0&&t.$store.commit("UPDATE_LATEST_MESSAGE",e[e.length-1])})}},{key:"messagesOn",value:function(t){t.$socket.on("message",function(e){console.log("消息",e),e[0].from===t.$store.state.currentChatUserInfo.userID&&t.$socket.emit("one message read",e[0]),t.$store.commit("UPDATE_LATEST_MESSAGE",e[0]),s(e,t);var n=e[0].to===t.$store.state.currentChatUserInfo.userID,o=null!==t.$store.state.userInfo?t.$store.state.userInfo.name:t.$store.state.touristInfo.name,a=e[0].from===t.$store.state.currentChatUserInfo.userID;if(n||o&&a)t.$store.commit("UPDATE_CURRENTCHATDATA",{concat:!0,data:e});else{var r=!1;t.$store.state.userList.map(function(t){t.userID===e[0].from&&(r=!0)});var u={name:e[0].from,userID:e[0].from,avatar:e[0].avatar,unread:0,messageInfo:{message:e[0].message,date:e[0].date}};r||"all"===e[0].to||t.$store.commit("UPDATE_USERLIST",u)}})}},{key:"desktopRemind",value:function(t){t.$socket.on("desktopRemind",function(e){a(e,t)})}},{key:"takeUserInfoOn",value:function(t){t.$socket.on("take userInfo",function(e){e.Data.name===t.$store.state.userInfo.name?(t.$store.state.myPanel=e,t.$store.commit("UPDATE_USERSETTINGSTATE",!0)):(t.$store.state.userPanelInfo=e,t.$store.commit("UPDATE_USERPANELSTATE",!0)),console.log("接收用户信息",e)})}},{key:"checkPermissionOn",value:function(t){t.$socket.on("check permission",function(e){console.log(e),e?t.$store.commit("DELETE_DB_MESSAGE",!0):t.$store.commit("DELETE_DB_MESSAGE",!1)})}},{key:"offlineNoReadMessagesOn",value:function(t){t.$socket.on("Offline noRead messages",function(e){console.log("渲染离线消息",e);var n=null!==t.$store.state.userInfo?t.$store.state.userInfo.name:t.$store.state.touristInfo.name,o=t.$store.state.currentChatUserInfo.userID,a={},s={};if(0!==e.length){for(var r=0;r<e.length;r++)void 0===s[e[r].from]?s[e[r].from]=[e[r]]:s[e[r].from].push(e[r]);for(var u in s)a[u]={noRead:s[u].length,lastMsg:s[u][s[u].length-1]};console.log(a);for(var i in a)if(o!==i&&i!==n&&"all"!==i){var c={name:a[i].lastMsg.from,userID:a[i].lastMsg.from,avatar:a[i].lastMsg.avatar,unread:0,messageInfo:{}};t.$store.commit("UPDATE_USERLIST",c),t.$set(t.$store.state.myUserListArr,i,{noRead:a[i].noRead}),function(e){setInterval(function(){t.$store.commit("UPDATE_LATEST_MESSAGE",a[e].lastMsg)},0)}(i)}}})}},{key:"typingOn",value:function(t){t.$socket.on("typing",function(e){t.$store.state.userInfo.name===e.to&&t.$store.state.currentChatUserInfo.userID===e.from&&t.$store.commit("UPDATE_TYPINGSTATE",!0)})}},{key:"stopTypingOn",value:function(t){t.$socket.on("stop typing",function(e){t.$store.state.userInfo.name===e.to&&t.$store.state.currentChatUserInfo.userID===e.from&&t.$store.commit("UPDATE_TYPINGSTATE",!1)})}},{key:"searchUserOn",value:function(t){t.$socket.on("search user",function(e){t.$store.commit("UPDATE_SEARCHUSERRES",e)})}},{key:"contactsUpdateOn",value:function(t){t.$socket.on("contacts update",function(e){t.$store.commit("UPDATE_MYCONTACTSLIST",e)})}},{key:"userRemind",value:function(t){t.$socket.on("user remind",function(e){t.$message({message:e.message,type:e.type})})}}]),t}();e.default=l},237:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.noticeProcess=e.touristTips=void 0;var o=n(152),a=function(t){return t&&t.__esModule?t:{default:t}}(o);e.touristTips=function(){a.default.$notify.info({title:"消息",message:"游客没有该权限哦！"})},e.noticeProcess=function(t,e){var n=a.default.$store.state.expression.baidu.data;if("expression"===e){var o;return n.some(function(e,n){e===t&&(o=n)}),void 0===o?t:"[表情]"}if("printscreen"===e)return"[图片]";if("code"===e)return"[代码片段]";var s=t.match(/^(https?|ftp|file):\/\//g),r=t.match(/.*(\.png|\.jpg|\.jpeg|\.gif)$/);return null!==s&&null!==r?"[远程地址图片]":null!==s?"[链接]":t}},442:function(t,e,n){"use strict";function o(t){n(443)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(187),s=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);var u=n(445),i=n(236),c=o,f=i(s.a,u.a,!1,c,null,null);e.default=f.exports},443:function(t,e){},445:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view")],1)],1)},a=[],s={render:o,staticRenderFns:a};e.a=s},514:function(t,e){},516:function(t,e){},517:function(t,e){},518:function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=n(13),r=a(s),u=n(519),i=a(u),c=n(520),f=a(c),l=n(521),T=o(l),E=n(522),S=o(E),d=n(538),m=a(d),A=n(542),_=a(A),U=n(219);a(U);r.default.use(i.default);var I=function(){return new i.default.Store({state:f.default,getters:T,mutations:m.default,actions:S,modules:{socketModule:_.default}})};e.default=I},520:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={connectState:!0,typingState:!1,systemConfig:{SOURCE_CODE:"https://github.com/zyw5791557/EmliceChat",WEB_SITE:"https://www.emlice.top",clearDataLock:!1},myPanel:{},userPanelInfo:{},userInfo:JSON.parse(localStorage.getItem("UserInfo")),touristInfo:JSON.parse(localStorage.getItem("TouristInfo")),globalMask:!1,lyricState:!1,userSettingState:!1,systemSettingState:!1,userPanelState:!1,roomNoticeState:!1,roomInfoState:!1,expressionState:!1,codeInputState:!1,contactsPanelState:!1,expression:{baidu:{space:30,address:"/images/expressions/baidu.png",data:["呵呵","哈哈","吐舌","啊","酷","怒","开心","汗","泪","黑线","鄙视","不高兴","真棒","钱","疑问","阴险","吐","咦","委屈","花心","呼","笑眼","冷","太开心","滑稽","勉强","狂汗","乖","睡觉","惊哭","升起","惊讶","喷","爱心","心碎","玫瑰","礼物","彩虹","星星月亮","太阳","钱币","灯泡","咖啡","蛋糕","音乐","haha","胜利","大拇指","弱","ok"]}},onlineUsers:"",myUserListArr:{all:{noRead:0}},currentChatData:[],userList:[{name:"群聊",userID:"all",avatar:"/static/images/sleep.gif",unread:0,messageInfo:{message:"",date:""}}],currentChatUserInfo:{name:"",userID:"",avatar:""},latestMessage:null,loading:!0,myContactsList:[],searchUserRes:[]};e.default=o},521:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.getCount=function(t){return t.count}},522:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.selectSource=void 0;var o=n(523),a=function(t){return t&&t.__esModule?t:{default:t}}(o),s=n(217);(function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);e.default=t})(s),e.selectSource=function(t,e){var n=t.commit;t.state;return new a.default(function(t,o){n("SET_PLAY_SOURCE",e),t()})}},538:function(t,e,n){"use strict";function o(t){t.userSettingState||t.systemSettingState||t.userPanelState||t.roomNoticeState||t.roomInfoState||t.expressionState||t.codeInputState?t.globalMask=!0:t.globalMask=!1}Object.defineProperty(e,"__esModule",{value:!0});var a,s=n(539),r=function(t){return t&&t.__esModule?t:{default:t}}(s),u=n(217),i=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(u),c=(a={},(0,r.default)(a,i.UPDATE_CONNECTSTATE,function(t,e){t.connectState=e}),(0,r.default)(a,i.UPDATE_USERINFO,function(t,e){t.userInfo=e}),(0,r.default)(a,i.UPDATE_TOURISTINFO,function(t,e){t.touristInfo=e}),(0,r.default)(a,i.UPDATE_GLOBALMASK,function(t,e){e||(t.userSettingState=!1,t.systemSettingState=!1,t.userPanelState=!1,t.roomNoticeState=!1,t.roomInfoState=!1,t.expressionState=!1,t.codeInputState=!1),t.globalMask=e}),(0,r.default)(a,i.UPDATE_USERSETTINGSTATE,function(t,e){t.userSettingState=e,o(t)}),(0,r.default)(a,i.UPDATE_SYSTEMSETTINGSTATE,function(t,e){t.systemSettingState=e,o(t)}),(0,r.default)(a,i.UPDATE_USERPANELSTATE,function(t,e){t.userPanelState=e,o(t)}),(0,r.default)(a,i.UPDATE_ROOMNOTICESTATE,function(t,e){t.roomNoticeState=e,o(t)}),(0,r.default)(a,i.UPDATE_ROOMINFOSTATE,function(t,e){t.roomInfoState=e,o(t)}),(0,r.default)(a,i.UPDATE_EXPRESSIONSTATE,function(t,e){t.expressionState=e,o(t)}),(0,r.default)(a,i.UPDATE_CODEINPUTSTATE,function(t,e){t.codeInputState=e,o(t)}),(0,r.default)(a,i.UPDATE_LYRICSTATE,function(t,e){t.lyricState=e}),(0,r.default)(a,i.UPDATE_CONTACTSPANELSTATE,function(t){t.contactsPanelState=!t.contactsPanelState}),(0,r.default)(a,i.DELETE_DB_MESSAGE,function(t,e){t.systemConfig.clearDataLock=e}),(0,r.default)(a,i.UPDATE_ONLINEUSERS,function(t,e){t.onlineUsers=e}),(0,r.default)(a,i.UPDATE_MYUSERLISTARR,function(t,e){if(console.log(e),e.addRead)return void t.myUserListArr[e.userID].noRead++;e.userID?t.myUserListArr[e.userID].noRead=0:this._vm.$set(t.myUserListArr,e.key,e.value)}),(0,r.default)(a,i.UPDATE_CURRENTCHATDATA,function(t,e){e.concat?t.currentChatData=t.currentChatData.concat(e.data):t.currentChatData=e.data}),(0,r.default)(a,i.UPDATE_USERLIST,function(t,e){t.userList.push(e)}),(0,r.default)(a,i.CLEAR_HISTORY,function(t){t.myUserListArr={all:{noRead:0}},t.userList=[{name:"群聊",userID:"all",avatar:"/static/images/sleep.gif",unread:0,messageInfo:{message:"",date:""}}],t.currentChatUserInfo.name="",t.currentChatUserInfo.userID="",t.currentChatUserInfo.avatar=""}),(0,r.default)(a,i.UPDATE_CURRENTCHATUSERINFO,function(t,e){t.currentChatUserInfo.name=e.name,t.currentChatUserInfo.userID=e.userID,t.currentChatUserInfo.avatar=e.avatar}),(0,r.default)(a,i.UPDATE_LATEST_MESSAGE,function(t,e){t.latestMessage=e}),(0,r.default)(a,i.UPDATE_LOADING,function(t,e){t.loading=e}),(0,r.default)(a,i.UPDATE_TYPINGSTATE,function(t,e){t.typingState=e}),(0,r.default)(a,i.UPDATE_SEARCHUSERRES,function(t,e){t.searchUserRes=e}),(0,r.default)(a,i.UPDATE_MYCONTACTSLIST,function(t,e){t.myContactsList=e}),a);e.default=c},542:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={state:{},getters:{},mutations:{SOCKET_USER_JOIN_EMIT:function(t,e){this._vm.$socket.emit("user join",e)},SOCKET_MESSAGE_READ_EMIT:function(t,e){this._vm.$socket.emit("message read",e)},SOCKET_CHECK_PERMISSION_EMIT:function(t,e){this._vm.$socket.emit("check permission",e)},SOCKET_MESSAGE_EMIT:function(t,e){this._vm.$socket.emit("message",e)},SOCKET_TAKE_MESSAGES_EMIT:function(t,e){this._vm.$socket.emit("take messages",e)},SOCKET_TAKEUSERINFO_EMIT:function(t,e){this._vm.$socket.emit("take userInfo",e)},SOCKET_OFFLINE_NOREAD_MESSAGES_EMIT:function(t,e){this._vm.$socket.emit("Offline noRead messages",e)},SOCKET_TYPING_EMIT:function(t,e){this._vm.$socket.emit("typing",e)},SOCKET_STOPTYPING_EMIT:function(t,e){this._vm.$socket.emit("stop typing",e)},SOCKET_LOGOUT_EMIT:function(t,e){this._vm.$socket.emit("logout",e)},SOCKET_ADD_CONTACTS_EMIT:function(t,e){this._vm.$socket.emit("add contacts",e)},SOCKET_SEARCH_USER_EMIT:function(t,e){this._vm.$socket.emit("search user",e)},SOCKET_CONTACTS_UPDATE_EMIT:function(t,e){this._vm.$socket.emit("contacts update",e)},SOCKET_CONNECT:function(t){this._vm.$socket.connect()},SOCKET_DISCONNECT:function(t){this._vm.$socket.disconnect()}},actions:{}};e.default=o},546:function(t,e){},547:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(13),s=o(a),r=n(548),u=o(r);s.default.use(u.default);var i=function(t){return n.e(3).then(function(){var e=[n(597)];t.apply(null,e)}.bind(this)).catch(n.oe)},c=function(t){return n.e(2).then(function(){var e=[n(598)];t.apply(null,e)}.bind(this)).catch(n.oe)},f=function(t){return n.e(1).then(function(){var e=[n(599)];t.apply(null,e)}.bind(this)).catch(n.oe)},l=function(t){return n.e(0).then(function(){var e=[n(600)];t.apply(null,e)}.bind(this)).catch(n.oe)},T=function(t){return n.e(4).then(function(){var e=[n(601)];t.apply(null,e)}.bind(this)).catch(n.oe)},E=[{path:"/home",component:f,name:"Home",children:[{path:"chat",component:l,name:"Chat"}]},{path:"/",redirect:{path:"/home/chat"}},{path:"/login",component:i,name:"Login"},{path:"/register",component:c,name:"Register"},{path:"/404",component:T},{path:"*",component:T}],S=new u.default({mode:"history",routes:E});S.beforeEach(function(t,e,n){var o=S.app.$store,a=o.state.touristInfo;if("/home/chat"===t.path||"/home"===t.path){localStorage.getItem("UserInfo")||a?n():n({path:"/login"})}else n()}),e.default=S},549:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(550),a=function(t){return t&&t.__esModule?t:{default:t}}(o);e.default={install:function(t,e){t.prototype.getApi=function(t){var e={login:"/api/login",register:"/api/register",userInfoEdit:"/api/userEdit",userAvatarUpdate:"/upload/avatar_upload",deleteChatData:"/upload/clearData",printscreen:"/upload/ps_upload",weather:"http://api.jirengu.com/weather.php"},n={};n.url=e[t];for(var o=arguments.length,s=Array(o>1?o-1:0),r=1;r<o;r++)s[r-1]=arguments[r];for(var u in s[0])n[u]=s[0][u];return(0,a.default)(n)}}}},569:function(t,e,n){"use strict";t.exports={$SOCKET_URL:"http://localhost:3000",$STATIC_URL:"http://localhost:8989"}},592:function(t,e){}},[152]);