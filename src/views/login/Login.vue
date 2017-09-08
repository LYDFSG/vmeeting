<template>
  <div class="shareList" id="dx-minHeight">
      <dx-header title="登录">
       <div class="header-right" slot="right" @click="showMask(0)">
       </div>
       </dx-header>
     <section class="header_bottom" id="header_bottom"></section>
     <div class="login_main" id="login_main">
         <div class="appName">会议智能展板</div>
         <div class="login">
         <div class="form_userName" :class="!loginSuccess?'active':''">
            <input type="text" placeholder="请输入用户名" v-model="userName" @focus="getFoucs()">
            <div class="erro_tip" v-show="!loginSuccess">账号有误，请重新输入</div>
         </div>
          <div class="form_passWord" :class="!loginSuccess?'active':''">
           <input type="password" placeholder="请输入密码" v-model="passWord" @focus="getFoucs()">
           <div class="erro_tip" v-show="!loginSuccess">密码有误，请重新输入</div>
         </div>  
         <div class="tipText">仅限会议平台站点管理员可登录</div>
         <div class="form_button">
             <div @click="toLogin()">确定</div>
         </div>
         </div>
         <div class="bg_pic"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>

 @import "./login.less";

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
        userName:"liaokh",
        passWord:"1",
        loginSuccess:true,
          opt: { //发送请求参数
            areaId:"",
            queryType:1,
            curPage: 1,
            pageSize:10,
            sort:"",
          }
      }
     },
      computed: {
     },
      methods:  {
        goback(){
           let self=this;
          if(CLIENTOSTYPE == "ios") {
           self.$router.goBack()
          }else {
            self.$router.goBack()
          }
        },
        getFoucs(){
           this.loginSuccess = true;
        },
        pageInit() { //页面初始化数据
            this.opt.areaId ="";
            this.opt.curPage = 1;
            this.opt.pageSize = 10;
            this.disabled = true;
            this.loader.loading = false;
            this.loader.tips = false;
            this.loader.totalPage = 0;
            this.defaultPage.show = false;
            this.defaultPage.icon = "loading";
            this.defaultPage.des = "加载中";
          },
          fetchList() { 
            var opt = { 
                areaId:"",
                queryType:1,
                curPage: 1,
                pageSize:10,
                sort:""
              }
          },
          associationSystem(){
             
          },
          toLogin(){
            var self = this;
            if(self.userName!=''&&self.passWord!=''){
                 self.$dialog.loading.open('正在登录…');
                
                var opt = {
                  'code':'20',
                  'login_info':{
                    'login_name':self.userName,
                    'password':self.passWord
                  }
                }
               
                // this.$router.push('/bindRoom');
                var ws = new WebSocket("ws://10.38.31.231:1234/ws");
                ws.onopen = function(evt) { 
                  console.log("Connection open ..."); 
                  // ws.send("{'code':'10','sys_url':'10.38.31.231:1234'}");
                  ws.send(JSON.stringify(opt));
                 
                };
                ws.onmessage = function(evt) {
                  console.log( "Received Message: " + evt.data);
                  // ws.close();
                  console.log( ws.readyState );
                  console.log( JSON.parse(evt.data));
                  //存储当前用户信息
                  localStorage.setItem("userInfo",evt.data);
                  localStorage.setItem("paw",self.passWord);
                  if(JSON.parse(evt.data).status==201){
                    self.$dialog.loading.close();
                    self.loginSuccess = true;
                    self.$dialog.toast({
                        mes: '登录成功',
                        timeout: 1000,
                        icon: 'success',
                        callback: () => {
                          //todo...
                             self.$router.push('/bindRoom');
                        }
                      });
                     setTimeout(() => {
                        
                      },1000);
                  }else if(JSON.parse(evt.data).code==401){
                    self.$dialog.loading.close();
                    self.$dialog.toast({
                            mes: '网络错误',
                            timeout: 1000,
                            icon: 'error',
                            callback: () => {
                              //todo...
                            }
                    });
                  }else{
                    self.$dialog.loading.close();
                    self.loginSuccess = false;
                  }
                };
            }else{
              self.$dialog.toast({
                      mes: '账号不能为空',
                      timeout: 1000,
                      icon: 'error',
                      callback: () => {
                        //todo...
                      }
              });

            }
           
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
