webpackJsonp([1],{574:function(t,a,e){"use strict";function s(t){e(596)}Object.defineProperty(a,"__esModule",{value:!0});var i=e(581),o=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,function(){return i[t]})}(n);var r=e(602),c=e(223),l=s,u=c(o.a,r.a,!1,l,"data-v-9db40f7a",null);a.default=u.exports},577:function(t,a,e){t.exports={default:e(578),__esModule:!0}},578:function(t,a,e){var s=e(63),i=s.JSON||(s.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},581:function(t,a,e){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(a,"__esModule",{value:!0});var i=e(224),o=e(598),n=s(o),r=e(600),c=s(r);a.default={name:"Home",components:{UserSettingModule:n.default,SystemSettingModule:c.default},data:function(){return{backgroundSize:"",weatherCase:{currentCity:"",currentTemperature:"",temperature:"",weather:""}}},computed:{myPanel:function(){return this.$store.state.myPanel},systemConfig:function(){return this.$store.state.systemConfig},connectState:function(){return this.$store.state.connectState},userInfo:function(){return this.$store.state.userInfo||this.$store.state.touristInfo},mask:function(){return this.$store.state.globalMask},userSettingState:function(){return this.$store.state.userSettingState},systemSettingState:function(){return this.$store.state.systemSettingState},lyricState:function(){return this.$store.state.lyricState}},methods:{initBackgroundSize:function(){var t=document.body.clientWidth,a=document.body.clientHeight;this.backgroundSize=t+"px "+a+"px"},winResize:function(){var t=this;window.onresize=function(){t.initBackgroundSize()}},clearPanel:function(){this.$store.commit("UPDATE_GLOBALMASK",!1)},userInfoUpdate:function(){this.$store.commit("UPDATE_USERINFO",JSON.parse(localStorage.getItem("UserInfo")))},getMyPanel:function(){if(null!==this.$store.state.touristInfo)return(0,i.touristTips)();this.$store.commit("SOCKET_TAKEUSERINFO_EMIT",this.userInfo.name)},unfinished:function(){this.$notify.info({title:"消息",message:"暂未开放"})},logout:function(){this.$store.commit("SOCKET_LOGOUT_EMIT",this.userInfo.name),localStorage.removeItem("UserInfo"),localStorage.removeItem("TouristInfo"),this.$router.push({name:"Login"}),this.$store.commit("UPDATE_SYSTEMSETTINGSTATE",!1),this.$store.commit("SOCKET_DISCONNECT"),this.$store.commit("CLEAR_HISTORY")}},created:function(){this.$store.commit("SOCKET_CHECK_PERMISSION_EMIT",this.userInfo.name),this.$store.commit("SOCKET_USER_JOIN_EMIT",this.userInfo.name)},mounted:function(){var t=this;this.initBackgroundSize(),this.winResize(),playmusic(".description","432778620"),this.getApi("weather").then(function(a){t.weatherCase.currentCity=a.data.results[0].currentCity,t.weatherCase.temperature=a.data.results[0].weather_data[0].temperature,t.weatherCase.weather=a.data.results[0].weather_data[0].weather})}}},582:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(577),i=function(t){return t&&t.__esModule?t:{default:t}}(s);a.default={name:"UserSettingModule",props:{data:{type:Object,required:!0}},data:function(){return{loadData:{},editFlag:!0}},watch:{data:function(t){this.loadData=t}},computed:{selectSex:{get:function(){if(this.loadData.Data)return"male"===this.loadData.Data.sex?"男":"女"},set:function(t){"男"===t[0]&&this.loadData.Data?this.loadData.Data.sex="male":this.loadData.Data.sex="female"}}},filters:{sexFilter:function(t){return"male"===t?"男":"女"},birthdayFilter:function(t){return(new Date).getFullYear()-new Date(t).getFullYear()<=0?1:(new Date).getFullYear()-new Date(t).getFullYear()},placeFilter:function(t){return""===t?"火星":t}},methods:{edit:function(){this.editFlag=!1},postEdit:function(){var t=this,a={name:this.loadData.Data.name,sex:this.loadData.Data.sex,birthday:this.loadData.Data.birthday,place:this.loadData.Data.place,website:this.loadData.Data.website,github:this.loadData.Data.github,qq:this.loadData.Data.qq};this.getApi("userInfoEdit",{method:"post",data:a}).then(function(a){var e=a.data.Code,s=a.data.Str;if(-1===e)t.$notify.error({title:"错误",message:s}),setTimeout(function(){t.$router.push({name:Login})},2e3);else if(0===e){t.$notify({title:"成功",message:s,type:"success"});var o=JSON.parse(localStorage.getItem("UserInfo"));for(var n in a.data.Data)o[n]=a.data.Data[n];localStorage.setItem("UserInfo",(0,i.default)(o)),t.editFlag=!0}})},avatarSetting:function(){this.$refs.avatarUpload.click()},avatarSettingExec:function(t){var a=this,e=t.target.files[0];if(e&&e.size>1572864)return void this.$notify.error({title:"错误",message:"图片太大, 请压缩后重新上传~"});var s=new FormData;s.append("avatar",e),s.append("avatarName",this.loadData.Data.name),this.getApi("userAvatarUpdate",{method:"POST",data:s,headers:{"Content-Type":"multipart/form-data"}}).then(function(t){var e=(t.data.Code,t.data.Str,t.data.Avatar),s=JSON.parse(localStorage.getItem("UserInfo"));s.avatar=e,localStorage.setItem("UserInfo",(0,i.default)(s)),a.$notify.success({title:"成功",message:"头像更新成功~"}),a.$emit("updateAvtar"),a.$emit("close")})}}}},583:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"SystemSettingModule",props:{data:{type:Object,required:!0}},data:function(){return{desktopNoticeLock:!0,desktopVoiceLock:!0}},computed:{loadData:function(){return this.data}},methods:{checkSetting:function(){var t=JSON.parse(localStorage.getItem("desktopNotification")),a=JSON.parse(localStorage.getItem("soundNotification"));null===t?localStorage.setItem("desktopNotification",!0):this.desktopNoticeLock=!!t,null===a?localStorage.setItem("soundNotification",!0):this.desktopVoiceLock=!!a},forceLogout:function(){var t=this;localStorage.removeItem("UserInfo"),setTimeout(function(){t.$router.push({name:"Login"})},2e3)},clearChatData:function(){var t=this;if(!this.$store.state.userInfo.token)return this.$notify.error({title:"错误",message:"登录超时, 请两秒后重新登录。"}),void this.forceLogout();this.$confirm("Are you sure you want to clear the app's data?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.getApi("deleteChatData",{method:"POST",data:{user:t.$store.state.userInfo.name,token:t.$store.state.userInfo.token}}).then(function(a){var e=a.data.Code,s=a.data.Str;0===e?(t.$notify.success({title:"成功",message:s}),t.forceLogout()):t.$notify.error({title:"错误",message:s})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},desktopNotice:function(){this.desktopNoticeLock?localStorage.setItem("desktopNotification",!1):localStorage.setItem("desktopNotification",!0),this.desktopNoticeLock=!this.desktopNoticeLock},desktopVoice:function(){this.desktopVoiceLock?localStorage.setItem("soundNotification",!1):localStorage.setItem("soundNotification",!0),this.desktopVoiceLock=!this.desktopVoiceLock}},mounted:function(){this.checkSetting()}}},596:function(t,a,e){var s=e(597);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(571)("34cb3583",s,!0)},597:function(t,a,e){a=t.exports=e(570)(void 0),a.push([t.i,".scale-enter-active[data-v-9db40f7a],.scale-leave-active[data-v-9db40f7a]{transition:all .3s}.scale-enter[data-v-9db40f7a],.scale-leave-to[data-v-9db40f7a]{opacity:0;transform:scale(0)}.silde-rightIn-enter-active[data-v-9db40f7a]{transition:all .3s ease}.silde-rightIn-leave-active[data-v-9db40f7a]{transition:all .3s cubic-bezier(1,.5,.8,1)}.silde-rightIn-enter[data-v-9db40f7a],.silde-rightIn-leave-to[data-v-9db40f7a]{transform:translateX(340px)}.chatroom[data-v-9db40f7a]{width:100%;height:100%}.user-panel .weather-box[data-v-9db40f7a]{width:200px;height:100%;color:#fff;padding:14px 0;text-align:center}.user-panel .weather-box p[data-v-9db40f7a]{line-height:26px;font-size:14px}.user-panel .weather-box .weather-temperature[data-v-9db40f7a]{font-size:18px}",""])},598:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(582),i=e.n(s);for(var o in s)"default"!==o&&function(t){e.d(a,t,function(){return s[t]})}(o);var n=e(599),r=e(223),c=r(i.a,n.a,!1,null,null,null);a.default=c.exports},599:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.loadData.Data?e("div",{staticClass:"user-setting"},[e("div",[e("i",{staticClass:"icon",on:{click:function(a){t.$emit("close")}}},[t._v("")]),t._v(" "),e("div",{staticClass:"background-image",style:"background-image: url("+t.loadData.Data.avatar+");"}),t._v(" "),e("div",{staticClass:"background-mask"}),t._v(" "),e("div",{staticClass:"content"},[e("img",{staticClass:"avatar-image",staticStyle:{width:"80px",height:"80px","min-width":"80px","min-height":"80px"},attrs:{src:t.loadData.Data.avatar},on:{click:t.avatarSetting}}),t._v(" "),e("span",[t._v(t._s(t.loadData.Data.name))]),t._v(" "),e("div",{staticClass:"icon-list"},[t.loadData.Data.github?e("a",{staticClass:"icon",attrs:{title:"github",href:"//"+t.loadData.Data.github,rel:"noopener noreferrer",target:"_blank"}},[t._v("")]):t._e(),t._v(" "),t.loadData.Data.website?e("a",{staticClass:"icon",staticStyle:{position:"relative",top:"3px"},attrs:{title:"website",href:"//"+t.loadData.Data.website,rel:"noopener noreferrer",target:"_blank"}},[t._v("")]):t._e(),t._v(" "),t.loadData.Data.qq?e("a",{staticClass:"icon",attrs:{title:"qq",href:"tencent://message/?uin="+t.loadData.Data.qq,rel:"noopener noreferrer",target:"_blank"}},[t._v("")]):t._e()]),t._v(" "),e("input",{ref:"avatarUpload",attrs:{type:"file",accept:"image/jpg,image/jpeg,image/png,image/gif"},on:{change:t.avatarSettingExec}})])]),t._v(" "),t.editFlag?e("div",{staticClass:"normal-status"},[e("div",[e("div",[t._m(0),t._v(" "),e("div",[e("span",[t._v(t._s(t._f("sexFilter")(t.loadData.Data.sex)))]),t._v(" "),e("span",[t._v(t._s(t._f("birthdayFilter")(t.loadData.Data.birthday)))]),t._v(" "),e("span",[t._v(t._s(t.loadData.duration)+"天")]),t._v(" "),e("span",[t._v(t._s(t._f("placeFilter")(t.loadData.Data.place)))])])])]),t._v(" "),e("div",[e("button",{on:{click:t.edit}},[t._v("编辑")])])]):e("div",{staticClass:"edit-status"},[e("div",[e("div",[t._m(1),t._v(" "),e("div",{attrs:{id:"personInfoBox"}},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.selectSex,expression:"selectSex"}],on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectSex=a.target.multiple?e:e[0]}}},[e("option",[t._v("男")]),t._v(" "),e("option",[t._v("女")])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.loadData.Data.birthday,expression:"loadData.Data.birthday"}],staticClass:"birthday",attrs:{type:"date"},domProps:{value:t.loadData.Data.birthday},on:{input:function(a){a.target.composing||t.$set(t.loadData.Data,"birthday",a.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.loadData.Data.place,expression:"loadData.Data.place"}],staticClass:"place",attrs:{type:"text"},domProps:{value:t.loadData.Data.place},on:{input:function(a){a.target.composing||t.$set(t.loadData.Data,"place",a.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.loadData.Data.website,expression:"loadData.Data.website"}],staticClass:"website",attrs:{type:"url",placeholder:"不用写传输协议头"},domProps:{value:t.loadData.Data.website},on:{input:function(a){a.target.composing||t.$set(t.loadData.Data,"website",a.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.loadData.Data.github,expression:"loadData.Data.github"}],staticClass:"github",attrs:{type:"url",placeholder:"不用写传输协议头"},domProps:{value:t.loadData.Data.github},on:{input:function(a){a.target.composing||t.$set(t.loadData.Data,"github",a.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.loadData.Data.qq,expression:"loadData.Data.qq"}],staticClass:"qq",attrs:{type:"text"},domProps:{value:t.loadData.Data.qq},on:{input:function(a){a.target.composing||t.$set(t.loadData.Data,"qq",a.target.value)}}})])])]),t._v(" "),e("div",[e("button",{on:{click:t.postEdit}},[t._v("确定")])])])]):t._e()},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("span",[t._v("性别:")]),t._v(" "),e("span",[t._v("年龄:")]),t._v(" "),e("span",[t._v("时长:")]),t._v(" "),e("span",[t._v("位置:")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("span",[t._v("性别:")]),t._v(" "),e("span",[t._v("出生日期:")]),t._v(" "),e("span",[t._v("位置:")]),t._v(" "),e("span",[t._v("个人网站:")]),t._v(" "),e("span",[t._v("github:")]),t._v(" "),e("span",[t._v("qq:")])])}],o={render:s,staticRenderFns:i};a.a=o},600:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(583),i=e.n(s);for(var o in s)"default"!==o&&function(t){e.d(a,t,function(){return s[t]})}(o);var n=e(601),r=e(223),c=r(i.a,n.a,!1,null,null,null);a.default=c.exports},601:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"system-setting"},[e("div",[e("span",[t._v("系统设置")]),t._v(" "),e("i",{staticClass:"icon",on:{click:function(a){t.$emit("close")}}},[t._v("")])]),t._v(" "),e("div",[e("div",{staticClass:"switch",on:{click:t.desktopNotice}},[e("span",[t._v("启用桌面通知")]),t._v(" "),e("div",{staticClass:"switchBtn",class:{on:t.desktopNoticeLock,off:!t.desktopNoticeLock}})]),t._v(" "),e("div",{staticClass:"switch",on:{click:t.desktopVoice}},[e("span",[t._v("启用声音通知")]),t._v(" "),e("div",{staticClass:"switchBtn on",class:{on:t.desktopVoiceLock,off:!t.desktopVoiceLock}})]),t._v(" "),e("a",{staticClass:"button",attrs:{href:t.loadData.SOURCE_CODE}},[e("i",{staticClass:"icon"},[t._v("")]),t._v(" "),e("span",[t._v("源码")])]),t._v(" "),e("a",{staticClass:"button",attrs:{href:t.loadData.WEB_SITE}},[e("i",{staticClass:"icon"},[t._v("")]),t._v(" "),e("span",[t._v("作者")])]),t._v(" "),e("a",{staticClass:"button",attrs:{id:"logoutBtn"},on:{click:function(a){t.$emit("logout")}}},[e("i",{staticClass:"icon"},[t._v("")]),t._v(" "),e("span",[t._v("登出")])]),t._v(" "),t.loadData.clearDataLock?e("a",{staticClass:"button",attrs:{id:"clearData"},on:{click:t.clearChatData}},[e("span",[t._v("数据清理")])]):t._e()])])},i=[],o={render:s,staticRenderFns:i};a.a=o},602:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"chatroom"},[e("div",{staticClass:"windows"},[e("div",{staticClass:"background",style:{backgroundSize:t.backgroundSize}},[e("div",{staticClass:"background-mask",style:{backgroundSize:t.backgroundSize}})]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.mask,expression:"mask"}],staticClass:"mask-layout",on:{click:t.clearPanel}}),t._v(" "),e("div",{staticClass:"chatRoom"},[e("header",[t._m(0),t._v(" "),e("div",{staticClass:"nav-list"},[t._m(1),t._v(" "),e("div",{staticClass:"nav-list-item ",attrs:{title:"联系人"},on:{click:t.unfinished}},[e("i",{staticClass:"icon"},[t._v("")])]),t._v(" "),e("div",{staticClass:"nav-list-item ",attrs:{title:"系统设置"},on:{click:function(a){t.$store.commit("UPDATE_SYSTEMSETTINGSTATE",!0)}}},[e("i",{staticClass:"icon"},[t._v("")])])]),t._v(" "),e("div",{staticClass:"user-panel"},[e("div",{staticClass:"weather-box"},[e("p",{staticClass:"weather-city"},[t._v(t._s(t.weatherCase.currentCity))]),t._v(" "),e("p",{staticClass:"weather-temperature"},[t._v(t._s(t.weatherCase.currentTemperature))]),t._v(" "),e("p",{staticClass:"weather-case"},[t._v(t._s(t.weatherCase.temperature)+" "+t._s(t.weatherCase.weather))])]),t._v(" "),e("div",{staticClass:"online",class:{offline:!t.connectState},attrs:{title:"在线"}}),t._v(" "),e("div",{staticClass:"avatar-text",style:"background-image: url("+t.userInfo.avatar+")",attrs:{title:"查看个人信息"},on:{click:t.getMyPanel}})])]),t._v(" "),e("router-view"),t._v(" "),e("transition",{attrs:{name:"scale"}},[e("user-setting-module",{directives:[{name:"show",rawName:"v-show",value:t.userSettingState,expression:"userSettingState"}],attrs:{data:t.myPanel},on:{close:function(a){t.$store.commit("UPDATE_USERSETTINGSTATE",!1)},updateAvtar:t.userInfoUpdate}})],1),t._v(" "),e("transition",{attrs:{name:"scale"}},[e("system-setting-module",{directives:[{name:"show",rawName:"v-show",value:t.systemSettingState,expression:"systemSettingState"}],attrs:{data:t.systemConfig},on:{close:function(a){t.$store.commit("UPDATE_SYSTEMSETTINGSTATE",!1)},logout:t.logout}})],1)],1)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.lyricState,expression:"lyricState"}],staticClass:"lyric_content"},[e("div",{staticClass:"description"})])])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"logo"},[e("img",{attrs:{src:"https://assets.suisuijiang.com/images/logo.b3e14.png"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"nav-list-item selected",attrs:{title:"聊天"}},[e("i",{staticClass:"icon"},[t._v("")])])}],o={render:s,staticRenderFns:i};a.a=o}});