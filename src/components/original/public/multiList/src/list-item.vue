<template>
  <div class="hc-list-item-wrap">
    <div class="hc-list-item">
      <div class="hc-list-left">
        <h3 class="hc-title">{{title}}</h3>
        <p :class="des2 ? 'hc-des-1' : 'hc-des-2'">{{des}}</p>
        <p class="hc-des2" v-if="des2">{{des2}}</p>
        <slot name="ft"></slot>
      </div>
      <div class="hc-list-right">
        <div v-if="!lazyLoad" class="hc-img" :style="{backgroundImage: 'url('+src+')'}"></div>
        <div v-if="lazyLoad" class="hc-img lazyImgBg" v-lazy:background-image="src"></div>
        <div class="hc-timer" v-if="timer&&timer!=0">{{timer}}</div>
      </div>
    </div>
    <slot name="item-extend"></slot>
  </div>
</template>

<style lang="less">
    @import './list.less';
</style>

<script type="text/babel">
  export default {
    name: 'hc-list-item',
    props: {
        title: String,
        des: String,
        des2: String,
        src: String,
        timer: String,
        lazyLoad: {
          type: Boolean,
          default: false
        }
    }
  }
</script>

<!-- type: {
  type: String,
  validator(value) {
      return ['primary', 'danger', 'warning', 'hollow', 'disabled'].indexOf(value) > -1;
  },
  default: 'primary'
}, -->
