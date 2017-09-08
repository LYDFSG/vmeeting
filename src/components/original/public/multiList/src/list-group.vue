<template>
  <div class="hc-list-group" :class="'theme'+theme">
    <div class="hc-list-title" v-if="title">
      <h2 class="hc-title">{{title}}</h2>
      <router-link class="hc-more" v-if="link" :to="link">查看更多</router-link>
      <slot name="more"></slot>
    </div>
    <slot></slot>
    <slot name="extend"></slot>
  </div>
</template>

<style lang="less">
    @import './list.less';
</style>

<script type="text/babel">
  export default {
    name: 'hc-list-group',
    props: {
        title: String,
        theme: String,
        link: String
    }
  }
</script>
