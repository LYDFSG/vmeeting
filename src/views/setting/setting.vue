<template>
  <section class="setting" id="dx-minHeight">
      <dx-header title="设置">
      <div class="header-left" slot="left" @click="back()"></div>
       <div class="header-right" slot="right">
       </div>
       </dx-header>
     <section class="header_bottom" id="header_bottom"></section>
     <section class="setting_main">
          <div class="set_main" id="set_main">  
              <div class="switch_account"><span class="clickTy">登录账号</span><span>vk001</span> <div class="but" @click="switch_account()">切换账号</div></div>
              <div class="switch_room"><span  class="clickTy">当前会议室</span><span>当前会议室</span> <div  class="but" @click="switch_room()">解除绑定</div></div>
              <div class="current_company"><span  class="clickTy">所在公司</span><span>集团总部</span></div>
              <div class="current_bottom">
                <div class="v1"></div>
                <div class="v2">万科会议展板APP V1.0</div>
                <div class="v3">技术支持 : 廖楷鸿 liaokh@vanke.com</div>
              </div>
          </div>
     </section>
  </section>
</template>

<style lang="less" scoped>

   @import "./setting.less";

   
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
          opt: { //发送请求参数
            areaId:"",
            queryType:1,
            curPage: 1,
            pageSize:10,
            sort:"",
          },
          roomList:[
             1,2,3,4,5
          ]
      }
     },
      computed: {
    },
      methods:  {
        back(){
          let self=this;
          if(CLIENTOSTYPE == "ios") {
           self.$router.goBack()
          }else {
            self.$router.goBack()
          }
        },
        switch_account(){
            //清空账号信息
            localStorage.setItem("userInfo","")
            //返回到登录页面
            this.$router.push('/login');
        },
        switch_room(){
             //解绑会议室
             localStorage.setItem("currentMeetRoom","")
             //返回到会议室绑定的页面
             this.$router.push('/bindRoom');
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
            // getLshareList(opt).then((res) => {
            //     console.log("我要的");
            //     console.log(res);
            // },(err) => {
             
            // });
          },
          toLogin(){
            this.$router.push('/bindRoom');
          }
      },
       mounted() {
          //给当前页面顶层一个初始高度
          document.getElementById("dx-minHeight").style.minHeight = document.body.clientHeight + 'px';
           document.getElementById("set_main").style.minHeight = document.body.clientHeight-document.getElementById("header_bottom").clientHeight+ 'px';
            // document.getElementById("header_bottom").style.minWidth = 19.2+"rem";
            // document.getElementById("set_main").style.minWidth = 19.2+"rem";
           // this.$dialog.toast({mes: "列表已更新", timeout: 1800});
           this.fetchList() ;
        },
        activated() { 

        },
        deactivated() { 
        }
     }
</script>
