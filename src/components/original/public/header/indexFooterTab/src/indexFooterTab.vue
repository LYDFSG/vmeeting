<template>
  <div class="hc-tab">
    <div class="hc-tab-item" :class="{'active': currentTab == 'taoke'}" @click="selectTab('taoke')">
      <span class="i-icon i-taoke"></span>
      <span class="hc-tab-des">淘课</span>
    </div>
    <div class="hc-tab-item" :class="{'active': currentTab == 'me'}" @click="selectTab('me')">
      <span class="i-icon i-me"></span>
      <span class="hc-tab-des">我的</span>
    </div>
  </div>
</template>

<style lang="less">
  @import "./indexFooterTab.less";
</style>

<script type="text/babel">
  import {mapState} from 'vuex'

  export default {
    name: "hc-indexFooterTab",
    data() {
      return {
        currentTab: "taoke"
      }
    },
    watch: {
      '$route.path': 'markTab'
    },
    mounted() {
      this.markTab();
    },
    methods: {
      markTab() { //记录路由
        this.currentTab = this.$route.path.split("/")[1];
        //console.log("当前切换模块：【"+this.currentTab+"】");
        
      },
      selectTab(tab) { //选择路由
        this.currentTab = tab;
        this.$router.replace({path: "/"+this.currentTab});
      }
    }
  }
</script>
