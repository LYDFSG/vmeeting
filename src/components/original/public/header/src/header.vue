<template>
  <div class="hc-header" :class="{'normal': headerType}">
    <slot name="left"></slot>
    <div class="hc-header-title">{{title}}</div>
    <slot name="right"></slot>
  </div>
</template>

<style lang="less" scoped>
  @import './header.less';
</style>

<script type="text/babel">
  export default {
    name: 'dx-header',
    props: {
      title: String,
      headerType: {
        type: String,
        default: ''
      }
    }
  }
</script>
