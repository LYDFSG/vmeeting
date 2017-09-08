<template>
  <div id="app">
  <div class="header" id="header"></div>
    <transition :name="transitionNameA">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
        return {
          transitionNameA: 'slide-left'
        }
      },
      beforeRouteUpdate (to, from, next) {
        let isBack = this.$router.isBack
        if (isBack) {
          this.transitionNameA = 'slide-right'
        } else {
          this.transitionNameA = 'slide-left'
        }
        this.$router.isBack = false
        next()
      },
  methods:{
    markRouter(){
      //切路由干掉loading提示
      this.$dialog.loading.close();
      //  //模拟history记录方法
      // let _history = [];
      // //let _currentPath = this.$route.path;
      // let _currentPath = window.location.hash.split("#")[1];
      // if(window.sessionStorage.getItem("_history")) {
      //   _history = JSON.parse(window.sessionStorage.getItem("_history"));
      // }else {
      //   _history = [];
      // }
      // if(_currentPath == "/me" || _currentPath == "/taoke") {
      //   _history = [];
      //   _history.push(_currentPath);
      // }else if(_currentPath != "/login" && _history.indexOf(_currentPath) == -1) {
      //   //_history.push(this.$route.path);
      //   _history.push(_currentPath);
      // }
      // _history = JSON.stringify(_history);
      // window.sessionStorage.setItem("_history", _history);
    
    }
  },
   mounted() {

    //给当前页面顶层一个初始高度
    // document.getElementById("dx-minHeight").style.minHeight = document.body.clientHeight + 'px';
    // document.getElementById("header").style.minWidth = 19.2+"rem";
    
    }
}
</script>

<style lang="less">
.child-view {
    position: absolute;
    width:100%;
    transition: all .6s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter, .slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(50px, 0);
      transform: translate(50px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-50px, 0);
      transform: translate(-50px, 0);
    }

  .ios{
    /*margin-top: 1.28rem;*/
    background: #fff;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    
  }
 .ios{
      .header{
         height:1.28rem;
      }
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      width:100%;
      height:0.88rem;
      background:none;
      color:#fff;
      line-height:0.88rem;
      text-align: center;
      background: url("./assets/i/hedaer_bg.png") no-repeat center center;
      background-size: cover;
    }
</style>
