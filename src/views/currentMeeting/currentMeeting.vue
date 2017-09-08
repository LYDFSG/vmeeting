<template>
  <div class="currentMeeting" id="dx-minHeight">
      <dx-header title="304会议室" class="current_header">
       <div class="header-right" slot="right" @click="openIdentity()">
        <img src="../../assets/i/icon-setting.png" alt="">
       </div>
       </dx-header>
     <section class="header_bottom" id="header_bottom"></section>
     <!-- 打开二维码 -->
     <div class="seeBigPic" v-show="showCode" @click="closeScanCode()">
         <div class="scanCode" @click.stop>
            <img src="../../assets/i/QRCode.png" alt="">
            <div class="textT">用v微扫码签到</div>
            <div class="timeT">时间10：50-11：22</div>
            <div class="myAfter" @click="closeScanCode()"></div>
         </div>
     </div>
     <!-- 验证身份 -->
     <div class="user_identity" @click.stop="openIdentity()" v-show="showIdentity">
         <div class="input_box"  @click.stop>
               <div class="close" @click.stop="openIdentity()"></div>
              <div class="confirm">身份确认</div>
              <div class="form_inp">
                <div class="thisUsername">
                 <input type="text" v-model="thisUserName"/>
                 <div class="icon_user"></div>
              </div>
              <div class="thisPassword">
                <input type="password" v-model="thisPassWord"  placeholder="请输入验证码"/>
                <div class="icon_user"></div>
              </div>
              <div class="btn" @click="identity()">
                  确认
              </div>
              </div>
         </div>
     </div>
     <!-- 会议主界面 -->
     <section class="currentMeeting_main"id="currentMeeting_main">
          <div class="current_main" id="main">
              <div class="main_left" id="main_left">
                  <div class="left_top_h" id="left_top_h"><div class="current_logo"></div><div class="text">当天会议</div></div>
                  <div class="left_top"><div class="current_logo"></div><div class="text">当天会议</div></div>
                  <!-- 当天有会议时 -->
                  <div class="meeting_list" v-show="true">
                     <div  class="item" :class="item=='1'?'active':''" v-for="(index,item) in roomList">
                        <div class="icon_status" :class="item=='0'?'gameOver':''"></div>
                        <div class="icon_line"></div>
                        <div class="ed_line" v-show="item=='0'"></div>
                         <div>主题：会议只能展板需求评审</div>
                         <div>时间：9：30至11：00</div>
                         <div>预定人：科比布莱恩特  <span class="meet_statu" :class="item=='0'?'gameOverStatu':''">未开始</span></div>
                     </div>
                  </div>
                  <!-- 当天无会议时 -->
                   <div class="meeting_list" v-show="false">
                        <div class="defaultTips">暂时没有会议</div>
                   </div>
              </div>
              <div class="main_right" id="main_right">
              <!-- 存在会议信息时显示 -->
                <div class="meet-mainInfo" v-show="true">
                     <div class="title"><div>UED周例会周例会例会</div></div>
                     <div class="time">时间11：00至12：00<span>未开始</span></div>
                     <div class="people">预定人：王超<span>{{"（能力中心）"}}</span></div>
                     <div class="meetTips">因参会人员没有按时签到，系统自动取消会议预定</div>
                      <div class="scanCode">
                       <div class="scanCode_pic" @click="showCode=true"></div>
                       <div class="scanCode_tip">用微V扫码签到</div>
                       <div class="scanCode_time">时间10:50-11:22</div>
                     </div>
                </div>
                <div class="meet_people"  v-show="true">
                    <div class="meet_people_title">参会人员{{"(14)"}}人</div>
                    <div class="people_list" id="people_list1">
                      <div class="people"  v-for="item in roomList">
                          <div class="people_logo"></div>
                          <div  class="people_name">张学友</div>
                      </div>
                    </div>
                </div>
                <div class="meet_temporary"  v-show="true">
                    <div class="meet_temporary_title">临时参会人员{{"(14)"}}人</div>
                    <div class="people_list" id="people_list2">
                      <div class="people"  v-for="item in roomList">
                          <div class="people_logo"></div>
                          <div  class="people_name">张学友</div>
                      </div>
                    </div>
                </div>
                <!-- 不存在会议信息时显示的缺省页 -->
                <div class="mainInfo_default" v-show="false">
                   
                </div>
                <!-- 不存在会议信息时显示的缺省页 -->
                <div class="meet_people_default"  v-show="false">
                   
                </div>
              </div>
          </div>
     </section>
  </div>
</template>

<style lang="less">
   @import "./currentMeeting.less";
</style>

<script type="text/babel">

import {header} from '@/components/original/public/header'
import {getLshareList}  from '@/service/lshare'
     export default {
      components: {
      'dx-header': header,
     },
     data(){
      return {
          showCode:false,
          showIdentity:false,
          meeted:false,
          current:true,
          thisUserName:"122",
          thisPassWord:"",
          opt: { //发送请求参数
            areaId:"",
            queryType:1,
            curPage: 1,
            pageSize:10,
            sort:"",
          },
          roomList:[
             1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19
          ]
      }
      },
      computed: {
      },
      methods:  {
        closeScanCode(){
            this.showCode = false;
        },
        openIdentity(){
           this.showIdentity = !this.showIdentity;
        },
        identity(){
          if(this.thisUserName==''||this.thisPassWord==''){
                       this.$dialog.toast({
                          mes: '验证码不能为空',
                          timeout: 1000,
                          icon: 'error',
                          callback: () => {
                            //todo...
                           }
                        });
          }else{
                     this.$dialog.toast({
                        mes: '验证成功',
                        timeout: 1000,
                        icon: 'success',
                        callback: () => {
                          //todo...
                             this.$router.push('/setting');
                        }
                      });
          }
             
        },
        goback(){
           let self=this;
          if(CLIENTOSTYPE == "ios") {
            self.$router.goBack();
          }else {
            self.$router.goBack();
          }
        },
        toSetting(){
          this.$router.push('/setting');
        },
        toLogin(){
          this.$router.push('/bindRoom');
        }
       },
       mounted() {
         var self = this;
         //获取判断是否已经关联了系统
         let relation = localStorage.getItem("relation");
        if(relation == 'success'){
         //给当前页面顶层一个初始高度
          // this.$dialog.loading.open('正在加载中…');
          //判断是否有账号登录
          var loginInfo = localStorage.getItem("userInfo");
          //获取密码
          var loginPsw = localStorage.getItem("paw");
          //获取绑定的会议室
          var currentRoom = localStorage.getItem("currentMeetRoom");
          if(loginInfo==null||loginInfo==''||loginInfo=="undefind"){
            //未存在登录信息跳转至登登录页面
            self.$dialog.loading.close();
             self.$dialog.toast({
                    mes: '请登录管理员账号',
                    timeout: 500
                  });
             self.$router.push('/login');
          }else{
            //存在已经登录的账号，获取该账号和已绑定的会议室
             //登录
              var opt = {
                'code':'20',
                'login_info':{
                  'login_name':JSON.parse(loginInfo).user_info.login_name,
                  'password':loginPsw
                }
              }
              // this.$router.push('/bindRoom');
              var ws = new WebSocket("ws://10.38.31.231:1234/ws");
              ws.onopen = function(evt) { 
                console.log("Connection open currentMeeting..."); 
                ws.send(JSON.stringify(opt));
              };
              ws.onmessage = function(evt) {
                console.log( "Received currentMeetingLogin Message: " + evt.data);
                console.log( JSON.parse(evt.data));
                //存储当前用户信息
                localStorage.setItem("userInfo",evt.data);
                if(JSON.parse(evt.data).status==201){
                  self.$dialog.loading.close();
                }else if(JSON.parse(evt.data).code==401){
                  self.$dialog.loading.close();
                  self.$dialog.toast({
                    mes: '登录已过期请重新登录',
                    timeout: 500
                  });
                   setTimeout(() => {
                    self.$router.push('/login');
                  },500);
                }else{
                }
              };
          }
        }else{
           self.$router.push('/isAdministrator');
        }
        },
        activated() { 
        },
        deactivated() { 
        }
     }
</script>
