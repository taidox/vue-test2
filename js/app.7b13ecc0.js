(function(t){function e(e){for(var i,s,l=e[0],c=e[1],r=e[2],d=0,f=[];d<l.length;d++)s=l[d],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&f.push(o[s][0]),o[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,r||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,l=1;l<n.length;l++){var c=n[l];0!==o[c]&&(i=!1)}i&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},o={app:0},a=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/vue-test2/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var r=0;r<l.length;r++)e(l[r]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var i=n("85ec"),o=n.n(i);o.a},1:function(t,e){},"147d":function(t,e,n){"use strict";var i=n("bd0f"),o=n.n(i);o.a},"33ae":function(t,e,n){"use strict";var i=n("46ea"),o=n.n(i);o.a},"46ea":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("b-container",{attrs:{fluid:"md"}},[n("nav-bar"),n("router-view")],1),n("chat")],1)},a=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-nav",{attrs:{tabs:""}},[n("b-nav-item",{attrs:{to:"/",exact:"","exact-active-class":"active"}},[t._v("T-Bike")]),n("b-nav-item",{attrs:{to:"/Tour",exact:"","exact-active-class":"active"}},[t._v("Tour")]),n("b-nav-item",{attrs:{to:"/About",exact:"","exact-active-class":"active"}},[t._v("About")])],1)],1)},l=[],c={},r=c,u=n("2877"),d=Object(u["a"])(r,s,l,!1,null,null,null),f=d.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{class:["chat-main-layout",{minimized:t.minimize}]},[n("b-badge",{directives:[{name:"show",rawName:"v-show",value:t.totalUnread>0,expression:"totalUnread > 0"}],class:["total-unread",{minimized:t.minimize}],attrs:{pill:""}},[t._v(t._s(t.totalUnread))]),n("div",{staticClass:"chat-title-layout"},[n("div",{staticClass:"chat-title-left"},[n("div",{class:["chat-button",{minimized:t.minimize}],on:{click:t.onChatButtonClick}},[n("strong",[t._v("聊天")])])]),n("div",{staticClass:"chat-title-right"},[n("div",{class:["mini-button",{minimized:t.minimize}],on:{click:t.onMinimizeChat}})])]),n("div",{class:["chat-windows-layout",{minimized:t.minimize}]},[n("div",{staticClass:"chat-content-layout"},[n("div",{ref:"chatContentDiv",staticClass:"chat-conversation-laout"},t._l(t.chatContent,(function(e){return n("div",{key:e.id,staticClass:"chat-item-layout",class:e.from===t.myUserData?"sent-item":"received-item"},[n("div",{staticClass:"message-time"},[t._v(" "+t._s(new Date(e.time).toLocaleString())+" ")]),e.from!==t.myUserData?n("p",{staticClass:"chat-from"},[t._v(" "+t._s("All"===e.from?"管理員":e.from)+": ")]):t._e(),n("p",{class:["chat-text",e.from===t.myUserData?"sent-text":"received-text"]},[t._v(" "+t._s(e.text)+" ")])])})),0),n("b-list-group",{staticClass:"chat-user-list"},t._l(t.userList,(function(e){return n("b-list-group-item",{key:e.name,staticClass:"chat-user",class:{"selected-user":e.name===t.talkTo},attrs:{value:e.name},on:{click:t.onClickUser}},[t._v(" "+t._s("All"===e.name?"大廳":e.name)+" "),e.unread>0?n("b-badge",{staticClass:"unread"},[t._v(t._s(e.unread))]):t._e()],1)})),1)],1),n("div",{staticClass:"chat-input-layout"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.outputMsg,expression:"outputMsg"}],staticClass:"chat-input",domProps:{value:t.outputMsg},on:{keyup:function(e){return e.type.indexOf("key")||13===e.keyCode?t.sendMessage(e):null},input:function(e){e.target.composing||(t.outputMsg=e.target.value)}}}),n("button",{staticClass:"chat-send",on:{click:t.sendMessage}},[t._v("Send")])])])],1)])},m=[],p=(n("c740"),n("4160"),n("a434"),n("b0c0"),n("b64b"),n("159b"),n("8055")),v=n.n(p),b={name:"Chat",data:function(){return{showButton:!0,minimize:!0,miniIcon:n("7860"),fullChatContent:{},chatContent:[],talkTo:"",counter:1,socket:null,myUserData:null,outputMsg:"",stylePopout:{width:"350px",height:"350px"}}},computed:{userList:function(){var t=this,e=[];Object.keys(this.fullChatContent).forEach((function(n){e.push({name:n,unread:t.fullChatContent[n].unread,latestMsgTime:t.fullChatContent[n].latestMsgTime})}));var n=e.sort((function(t,e){return"All"===t.name?-1:"All"===e.name?1:e.latestMsgTime-t.latestMsgTime}));return console.log("Sorted :",n),n},totalUnread:function(){var t=this,e=0;return Object.keys(this.fullChatContent).forEach((function(n){e+=t.fullChatContent[n].unread})),e}},methods:{onChatButtonClick:function(){this.minimize=!this.minimize,this.scrollChat()},onMinimizeChat:function(){this.minimize=!this.minimize},onClickUser:function(t){this.talkTo=t.target.getAttribute("value"),this.fullChatContent[this.talkTo].unread=0},sendMessage:function(){this.socket.connected&&this.outputMsg.length>0&&(this.socket.emit("message",{to:this.talkTo,text:this.outputMsg}),this.outputMsg="")},addChatContent:function(t){console.log("addChatContent msgData:",t);var e="All"===t.from||"All"===t.to?"All":t.from===this.myUserData?t.to:t.from;console.log("Add chat to channel:",e),this.fullChatContent[e].content.push({from:t.from,to:t.to,text:t.text,time:t.time,id:this.counter++}),this.fullChatContent[e].latestMsgTime=t.time,t.from!==this.myUserData&&(this.fullChatContent[e].unread+=1),this.scrollChat()},scrollChat:function(){var t=this;this.$nextTick((function(){t.$refs.chatContentDiv.scrollTop=t.$refs.chatContentDiv.scrollHeight}))},switchUser:function(){}},watch:{talkTo:function(){this.chatContent=this.fullChatContent[this.talkTo].content,console.log("watch talkTo change:",this.talkTo),this.scrollChat()}},mounted:function(){var t=this,e="https://chat4tiny.herokuapp.com/";this.socket=v()(e),this.socket.on("connect",(function(){console.log("chat socket connected.",t.socket.connected)})),this.socket.on("message",(function(e){console.log("Received message :",e),t.addChatContent(e)})),this.socket.on("Update self",(function(e){t.myUserData=e})),this.socket.on("Update users",(function(e){var n=e.findIndex((function(e){return e===t.myUserData}));n>=0&&e.splice(n,1),e.forEach((function(e){void 0===t.fullChatContent[e]&&t.$set(t.fullChatContent,e,{unread:0,latestMsgTime:new Date,content:[]})})),t.$nextTick((function(){""===t.talkTo&&(t.talkTo="All")}))}))}},g=b,C=(n("33ae"),Object(u["a"])(g,h,m,!1,null,"a13bd7e0",null)),k=C.exports,y={name:"App",components:{NavBar:f,Chat:k}},w=y,x=(n("034f"),Object(u["a"])(w,o,a,!1,null,null,null)),_=x.exports,T=n("8c4f"),S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:"lg"}},[n("div",[n("t-bike-status")],1)])},A=[],D=(n("4de4"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-container",[n("b-row",[n("b-col",{scopedSlots:t._u([{key:"first",fn:function(){return[n("b-form-select-option",{attrs:{value:null}},[t._v("全區")])]},proxy:!0}])},[n("b-form-select",{staticClass:"d-flex flex-grow-0",attrs:{options:t.districts},on:{input:t.districtChanged},model:{value:t.selectedDistrict,callback:function(e){t.selectedDistrict=e},expression:"selectedDistrict"}})],1),n("b-col",[n("b-button",{attrs:{variant:"danger"},on:{click:t.updateData}},[t._v("更新")])],1)],1),n("b-table",{attrs:{busy:t.isTableBusy,striped:"",hover:"",items:t.stationStatus,fields:t.fields,id:"TStation","primary-key":"Id",filter:t.stationStatus,"filter-function":t.filterStation,"thead-class":"tbike-header",stacked:"md"},scopedSlots:t._u([{key:"table-busy",fn:function(){return[n("div",{staticClass:"text-center text-danger my-2"},[n("b-spinner",{staticClass:"align-middle"}),n("strong",[t._v("資料載入中...")])],1)]},proxy:!0},{key:"cell(LatestAval)",fn:function(e){return[n("p",[t._v(t._s(e.item.AvaliableBikeCount))]),n("p",{staticClass:"update-time",domProps:{innerHTML:t._s(new Date(e.item.UpdateTime).toLocaleString().replace(" ","<br>"))}})]}},{key:"cell(ShowDetails)",fn:function(e){return[n("b-button",{attrs:{variant:"success"},on:{click:e.toggleDetails}},[t._v("地圖")])]}},{key:"row-details",fn:function(e){return[n("GmapMap",{ref:"refmap",staticStyle:{width:"100%",height:"400px"},attrs:{center:{lat:e.item.Latitude,lng:e.item.Longitude},zoom:16,"map-type-id":"terrain"}},[t._l(t.stationStatus,(function(e){return n("GmapMarker",{key:e.StationName,attrs:{position:{lat:e.Latitude,lng:e.Longitude},clickable:!0,draggable:!1},on:{click:function(n){return t.onClickMarker(e)}}})})),n("GmapInfoWindow",{attrs:{options:t.infoWindowOptions,position:t.infoWindowPos,opened:t.infoWinOpen},on:{closeclick:function(e){t.infoWinOpen=!1}}})],2)]}}])}),n("b-alert",{staticClass:"d-flex justify-content-center",attrs:{variant:"danger"},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}},[t._v("載入資料失敗...")])],1)],1)}),O=[],M=(n("a630"),n("d3b7"),n("6062"),n("3ca3"),n("ddb0"),n("bc3a")),z=n.n(M),j={name:"TBikeStatus",components:{},data:function(){return{showGmap:!1,stationStatus:null,fields:[{key:"Id",label:"ID",class:"d-none"},{key:"District",label:"區域"},{key:"StationName",label:"站名"},{key:"Address",label:"位置"},{key:"LatestAval",label:"可借車輛",class:"text-md-center"},{key:"AvaliableSpaceCount",label:"可停車位",class:"text-md-center"},{key:"ShowDetails",label:"詳細內容"}],isTableBusy:!0,showAlert:!1,districts:null,selectedDistrict:null,infoWindowPos:null,infoWindowOptions:{content:"",pixelOffset:{width:0,height:-35}},infoWinOpen:!0}},methods:{districtChanged:function(){},filterStation:function(t){return null===this.selectedDistrict||this.selectedDistrict===t.District},updateData:function(){var t=this,e="https://tbike-now.herokuapp.com/";this.isTableBusy=!0,z.a.get(e).then((function(e){if(e.data instanceof Array)try{t.stationStatus=e.data,t.stationStatus.sort((function(t,e){return t.District>e.District?1:t.District<e.District?-1:0})),t.districts=new Set,t.stationStatus.forEach((function(e){e.isShow=!0,t.districts.add(e.District)})),t.districts=Array.from(t.districts),t.districts.unshift({text:"全區",value:null}),t.showAlert=!1}catch(n){t.showAlert=!0}else t.showAlert=!0;t.isTableBusy=!1})).catch((function(){t.showAlert=!0}))},onClickMarker:function(t){this.infoWindowPos={lat:t.Latitude,lng:t.Longitude},this.infoWindowOptions.content="<strong>"+t.StationName+"</strong>",this.infoWinOpen=!0}},created:function(){this.updateData()}},U=j,E=(n("147d"),Object(u["a"])(U,D,O,!1,null,"3d7c2c4c",null)),L=E.exports,P={name:"Home",components:{TBikeStatus:L},data:function(){return{nextId:3,todos:[{id:1,todoContent:"Clean house.",isCompleted:!0},{id:2,todoContent:"Feed dogs~",isCompleted:!1}],slotText:"",inputText:"",isChecked:!0,checkedArray:["multiCheck1x"]}},methods:{delTodo:function(t){console.log("in delTodo()",t.id),this.todos=this.todos.filter((function(e){return e.id!=t.id}))},addTodo:function(t){console.log("Add todo:",t),this.todos.push({id:this.nextId++,todoContent:t,isCompleted:!1})},listenEvt:function(t){console.log("listen ",t)},listenSlot:function(t){console.log("listen slot:",this.slotText,"<")}}},$=P,B=(n("8b71"),Object(u["a"])($,S,A,!1,null,null,null)),W=B.exports,I=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("b-row",{class:{"d-none":!t.isShow}},[n("div",[t._v("This is About page.")])]),n("button",{attrs:{type:"button"},on:{click:t.toggle}},[t._v("Toggle")])],1)},G=[],N={name:"About",data:function(){return{isShow:!0}},methods:{toggle:function(){this.isShow=!this.isShow}}},H=N,J=Object(u["a"])(H,I,G,!1,null,null,null),R=J.exports,F=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("This is tour view")])},K=[],Q={},q=Q,V=Object(u["a"])(q,F,K,!1,null,"016e36e4",null),X=V.exports;i["default"].use(T["a"]);var Y=new T["a"]({routes:[{path:"/",name:"home",component:W},{path:"/Tour",name:"tour",component:X},{path:"/about",name:"about",component:R}],linkExactActiveClass:"active"}),Z=n("5f5b"),tt=n("b1e0"),et=(n("f9e3"),n("2dd8"),n("755e"));i["default"].use(Z["a"]),i["default"].use(tt["a"]),i["default"].use(et,{load:{key:"AIzaSyAS0bKdblb5bbGurGkI0iOlRJOTzwhCvyQ",libraries:"places"}}),i["default"].config.productionTip=!1,new i["default"]({router:Y,render:function(t){return t(_)}}).$mount("#app")},7860:function(t,e,n){t.exports=n.p+"img/minimize.578f82af.svg"},"85ec":function(t,e,n){},"88d7":function(t,e,n){},"8b71":function(t,e,n){"use strict";var i=n("88d7"),o=n.n(i);o.a},bd0f:function(t,e,n){}});
//# sourceMappingURL=app.7b13ecc0.js.map