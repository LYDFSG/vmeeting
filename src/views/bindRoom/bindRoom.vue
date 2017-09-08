<template>
  <div class="bindRoom" id="dx-minHeight">
      <dx-header title="关联会议室">
      <div class="header-left" slot="left" @click="goback()"></div>
       <div class="header-right" slot="right">
       </div>
       </dx-header>
     <section class="header_bottom" id="header_bottom"></section>
     <div class="mask" id="mask" v-if="show" @click="showRoom()"></div>
     <section class="bindRoom_main" id="bindRoom_main">
          <div class="bind_main" id="bind_main">
               <div class="appName">v02会议室</div>
               <div class="inp_tips">请绑定会议室</div>
               <div class="main_input">
               <div class="sanjaio"></div>
                 <form action="" method="get" @click="showRoom()"> 
                      <!-- <label>1、普通下拉列表菜单</label>  -->
                      <!-- <select class="roomName" name="roomName" placeholder="1233"> 
                      <option class="roomName_item" value="0" v-for="item in roomList">{{item}}</option> 
                      </select>  -->
                      {{roomName}}
                      <div class="room_list" v-if="show">
                           <div class="room" v-for="item in roomList" @click="selectThis(item)">{{item.name}}</div>
                      </div>
                 </form> 
               </div>
               <div class="main_button">
                  <div class="button" @click="tocurrentMeenting()">确定</div>
               </div>
               <div class="bg_picBind"></div>
          </div>
     </section>
  </div>
</template>

<style lang="less" scoped>

 @import "./bindRoom.less";

</style>

<script type="text/babel">
import {header} from '@/components/original/public/header'
import {getLshareList}  from '@/service/lshare'
// import { mapState } from 'vuex'
     export default {
      components: {
      'dx-header': header,
     },
     data(){
      return {
          show:false,
          roomName:"请选择会议室",
          bindEd:false,
          opt: { //发送请求参数
            areaId:"",
            queryType:1,
            curPage: 1,
            pageSize:10,
            sort:"",
          },
          roomList:[
             
          ]
      }
     },
      computed: {
    },
      methods:  {
        showRoom(){
           this.show = !this.show;
           console.log(this.show)
        },
        selectThis(item){
          this.bindEd = true;
          this.roomName =item.name;
          //当前绑定的会议室
         localStorage.setItem("currentMeetRoom",item.id)
        },
        goback(){
           let self=this;
          if(CLIENTOSTYPE == "ios") {
            self.$router.goBack();
          }else {
            self.$router.goBack();
          }
        },
        tocurrentMeenting(){
             if(this.bindEd){
                  this.$dialog.toast({
                    mes: '成功绑定会议室',
                    timeout: 500
                  });
                 setTimeout(() => {
                    this.$router.push('/');
                  },500);
                  
              }else{
                   this.$dialog.alert({
                    mes: '请绑定会议室',
                    timeout: 1500
                  });
              }
        }
      },
       mounted() {
         //给当前页面顶层一个初始高度
         document.getElementById("dx-minHeight").style.minHeight = document.body.clientHeight + 'px';

         document.getElementById("bind_main").style.minHeight = document.body.clientHeight-document.getElementById("header_bottom").clientHeight+ 'px';
           // this.$dialog.toast({mes: "列表已更新", timeout: 1800});

        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var self = this;
        //获取当前所有会议室
        var opt = {
          'code':'30',
          'token_code':userInfo.user_info.token_code,
          'user_info':{
            'user_id':userInfo.user_info.user_id,
            'site_id':userInfo.meetinginfo.site_id
          }
        }
        // {
        //   "code":"30",
        //   "token_code":"MTVlMWQ5NzBkOWUzYTdjMjU3NjhiZmY0OTU2OTgxNDEsYkdsaGIydG8sWXpSallUUXlNemhoTUdJNU1qTTRNakJrWTJNMU1EbGhObVkzTlRnME9XST0=",
        //   "user_info":{
        //     "user_id":"15a88cfbc2785620382598a4cd29b855",
        //     "site_id":"15a88cfbc2785620382598a4cd29b855"}
        //   }
        console.log("我的参数")
        console.log(opt)
        var ws = new WebSocket("ws://10.38.31.231:1234/ws");
            ws.onopen = function(evt) { 
              console.log("Connection open bindRoom ..."); 
              ws.send(JSON.stringify(opt));
             
            };
            ws.onmessage = function(evt) {
              console.log( "Received Message bindRoom: " + evt.data);
              console.log( ws.readyState );
              console.log( JSON.parse(evt.data));
              //获取当前所有会议室
              self.roomList  = JSON.parse(evt.data).resInfo;
              console.log("当前获取到的会议室")
              console.log( self.roomList)
            };
        },
        activated() { 

        },
        deactivated() { 
        }
     }
</script>
