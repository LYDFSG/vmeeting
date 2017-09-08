<template>
  <div>
       <transition :name="transitionName">
         <router-view  class="child-view"></router-view>
       </transition>
  </div>
</template>

<script>
     export default {
        data () {
	      return {
	        transitionName: 'slide-left'
	      }
	    },
	    beforeRouteUpdate (to, from, next) {
	      let isBack = this.$router.isBack
	      if (isBack) {
	        this.transitionName = 'slide-right'
	      } else {
	        this.transitionName = 'slide-left'
	      }
	      this.$router.isBack = false
	      next()
	    }
     }
</script>

<style lang="less" scoped>
   .child-view {
    position: absolute;
    width:100%;
    transition: all .8s cubic-bezier(.55,0,.1,1);
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
      background:#319bf7;
      color:#fff;
      line-height:0.88rem;
      text-align: center;
    }
</style>