webpackJsonp([2],{573:function(e,t,s){"use strict";function r(e){s(593)}Object.defineProperty(t,"__esModule",{value:!0});var a=s(580),i=s.n(a);for(var n in a)"default"!==n&&function(e){s.d(t,e,function(){return a[e]})}(n);var o=s(595),u=s(223),c=r,m=u(i.a,o.a,!1,c,"data-v-3ef3d875",null);t.default=m.exports},577:function(e,t,s){e.exports={default:s(578),__esModule:!0}},578:function(e,t,s){var r=s(63),a=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}},580:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(577),a=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default={name:"Register",data:function(){return{tip:"滴滴,新司机打卡~",form:{username:"",password:""}}},methods:{usernameCheck:function(){"游客"===this.form.username.slice(0,2)&&(this.$notify({title:"警告",message:"不要冒充游客啦~",type:"warning"}),this.form.username="")},login:function(){this.$router.push({name:"Login"})},register:function(){var e=this;return this.form.username?this.form.password?void this.getApi("register",{method:"post",data:{name:this.form.username,pwd:this.form.password,avatar:this.$STATIC_URL+"/images/users/default.png",sex:"male",birthday:"2017-12-25",place:"",website:"",github:"",qq:""}}).then(function(t){var s=t.data.Code;if(0===s){var r={name:e.form.username,avatar:e.$STATIC_URL+"/images/users/default.png",sex:"male",birthday:"2017-12-25",place:"",website:"",github:"",qq:""};e.$message({message:"注册成功, 即将自动跳转。",type:"success"}),setTimeout(function(){localStorage.setItem("UserInfo",(0,a.default)(r)),localStorage.setItem("Duration",1),e.$store.commit("UPDATE_USERINFO",JSON.parse(localStorage.getItem("UserInfo"))),e.$router.push({name:"Chat"}),e.$store.commit("SOCKET_CONNECT")},1e3)}else 1===s&&e.$message.error("账号已存在, 请重新输入一个账号。")}).catch(function(t){e.$message.error("注册失败, 请检查网络连接是否正常。")}):void this.$message.error("请输入密码!"):void this.$message.error("请输入账号!")}}}},593:function(e,t,s){var r=s(594);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);s(571)("592ac44b",r,!0)},594:function(e,t,s){t=e.exports=s(570)(void 0),t.push([e.i,"",""])},595:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"window"},[s("div",{staticClass:"background"}),e._v(" "),s("div",{staticClass:"login"},[s("div",[e._m(0),e._v(" "),s("div",[s("span",{staticStyle:{position:"relative",top:"-4px"}},[e._v(e._s(e.tip))]),e._v(" "),s("div",{staticClass:"input normal"},[e._m(1),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.username,expression:"form.username"}],attrs:{id:"name",type:"text",placeholder:"用户名"},domProps:{value:e.form.username},on:{blur:e.usernameCheck,input:function(t){t.target.composing||e.$set(e.form,"username",t.target.value)}}})]),e._v(" "),s("div",{staticClass:"input normal"},[e._m(2),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.form.password,expression:"form.password"}],attrs:{id:"pwd",type:"password",placeholder:"密码"},domProps:{value:e.form.password},on:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.register(t)},input:function(t){t.target.composing||e.$set(e.form,"password",t.target.value)}}})]),e._v(" "),s("div",[s("span",{on:{click:e.login}},[e._v("登录")]),e._v(" "),s("button",{on:{click:e.register}},[e._v("注册")])])])])])])},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("img",{staticClass:"avatar-image",staticStyle:{width:"100px",height:"100px","min-width":"100px","min-height":"100px"},attrs:{src:"/static/images/user.jpg"}})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("i",{staticClass:"icon"},[e._v(" ")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("i",{staticClass:"icon"},[e._v(" ")])])}],i={render:r,staticRenderFns:a};t.a=i}});