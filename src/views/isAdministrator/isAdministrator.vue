<template>
  <div class="bindRoom" id="dx-minHeight">
      <dx-header title="关联系统">
       <div class="header-right" slot="right">
       </div>
       </dx-header>
     <section class="header_bottom" id="header_bottom"></section>
     <section class="bindRoom_main" id="bindRoom_main">
          <div class="bind_main" id="bind_main">
               <div class="appName"></div>
               <div class="inp_tips">请关联系统</div>
               <div class="main_input">
                 <input @focus="getFoucs()" type="" name="" placeholder="请输入系统地址" class="isAdmin" v-model="systemValue"> 
                 <div class="erro_tip" v-show="relationSuccess">您输入的地址有误</div>  
               </div>
               <div class="main_button">
                  <div class="button" @click="isAdministrator()">关联</div>
               </div>
               <div class="bg_picBind"></div>
          </div>
     </section>
  </div>
</template>
<style lang="less" scoped>
 @import "./isAdministrator.less";
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
          relationSuccess:false,
          systemValue:"10.38.31.231:1234",
          system:'10.38.31.231:1234',
          system1:'122',
      }
     },
      computed: {
    },
      methods:  {
        goback(){
           let self=this;
          if(CLIENTOSTYPE == "ios") {
            self.$router.goBack();
          }else {
            self.$router.goBack();
          }
        },
        getFoucs(){
           this.relationSuccess = false;
        },
        isAdministrator(){
          var pattern = /[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.[0-9]{3}\D[0-9]{4}/;
             if(this.systemValue!=''){
                 // alert( pattern.test(this.systemValue))
                 if(pattern.test(this.systemValue)){
                     this.toRelation();
                 }else{
                     this.relationSuccess = true;
                 }
                  
              }else{
                   this.$dialog.alert({
                    mes: '请关联系统',
                    timeout: 1500
                  });
              }
        },
        toRelation(){//关联系统
            var self = this;
            //关联系统地址
            let opt = {
              'code':'10',
              'sys_url':self.systemValue
            }
            let systemUrl = "ws://"+self.systemValue+"/ws"
            // websocket
            var ws = new WebSocket(systemUrl);
            switch (ws.readyState) {
                case WebSocket.CONNECTING:
                  // do something
                  break;
                case WebSocket.OPEN:
                  // do something
                  break;
                case WebSocket.CLOSING:
                  // do something
                  break;
                case WebSocket.CLOSED:
                  // do something
                  break;
                default:
                  // this never happens
                  break;
              }
            ws.onopen = function(evt) { 
              console.log("Connection open 示例..."); 

              ws.send(JSON.stringify(opt));
             
            };
            ws.onerror = function(evt){
                console.log("请求失败");
            }
            ws.onmessage = function(evt) {
              console.log( "Received Message: " + evt.data);
                if(JSON.parse(evt.data).message =='success'){
                       self.$dialog.toast({
                            mes: '系统关联成功',
                            timeout: 1000,
                            icon: 'success',
                            callback: () => {
                              //todo...
                                 self.$router.push('/login');
                            }
                          });
                       self.relationSuccess = false;
                       localStorage.setItem("relation",'success');
                }else if(JSON.parse(evt.data).code ==401){
                     self.relationSuccess = true;
                     // alert("失败")
                }else{
                     self.$dialog.toast({
                            mes: '系统关联失败',
                            timeout: 1000,
                            icon: 'error',
                            callback: () => {
                              //todo...
                            }
                    }); 
                     self.relationSuccess = true;
                }
            };

        }
      },
      mounted() {
      },
      activated() { 

      },
      deactivated() { 
      }
     }
</script>
