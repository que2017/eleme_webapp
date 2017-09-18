<template>
  <transition name="fly-in">
    <div class="cover">
      <div class="close" @click="closeDetail">
        <span class="icon-close"></span>
      </div>
      <div class="title-img"><img :src="food.image" width="100%" height="100%"/></div>
      <div class="food-info"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      food: Object
    },
    methods: {
      closeDetail () {
        this.$emit('close')
      }
    },
    created () {
    }
  }
</script>

<style lang="stylus">
  .fly-in-enter-active, .fly-in-leave-active
    transition: all 0.4s linear
    transform: translate3d(0, 0, 0)
  .fly-in-enter, .fly-in-leave-to
    transform: translate3d(100%, 0, 0)
  .cover
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    background: #fff
    .close
      position: absolute
      top: 10px
      left: 10px
      width: 32px
      height: 32px
      border-radius: 50%
      color: #fff
      text-align: center
      line-height: 32px
      font-size: 24px
      background: rgba(0, 0, 0, 0.3)
    .title-img
      width: 100%
      height: 375px
    .food-info
      width: 100%
      height: 120px
</style>
