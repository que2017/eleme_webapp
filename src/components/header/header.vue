<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="cssMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="sup-num">
        <span class="num">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrap">
      <span class="bull-icon"></span><span class="bull-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['seller'],
    created () {
      this.cssMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minix.styl";

  .header
    position: relative
    color: #fff
    background-color: rgba(7,17,27,0.5)
    .content-wrap
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        border-radius: 2px
        overflow: hidden
      .content
        display: inline-block
        vertical-align: top
        margin-left: 16px
        font-size: 0px
        .title
          padding: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            margin-right: 6px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            color: #fff
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          font-size: 12px
          line-height: 12px
          margin-bottom: 10px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.special
              bg-image('special_1')
            &.invoice
              bg-image('invoice_1')
            &.guarantee
              bg-image('guarantee_1')
          .text
            line-height: 12px
            font-size: 10px
      .sup-num
        position: absolute
        right: 12px
        bottom: 12px
        height: 24px
        padding: 0 8px
        border-radius: 14px
        background: rgba(0,0,0,0.2)
        .num
          display: inline-block
          vertical-align: middle
          height: 24px
          line-height: 24px
          font-size: 10px
        .icon-keyboard_arrow_right
          display: inline-block
          vertical-align: middle
          height: 24px
          line-height: 24px
          margin-left: 2px
          font-size: 10px
    .bulletin-wrap
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 50px 0 12px
      background-color: rgba(7,17,27,0.2)
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      &>span
        display: inline-block
      .bull-icon
        width: 22px
        height: 12px
        margin: 8px 4px 0 0
        bg-image('bulletin')
        background-size: 100% 100%
      .bull-text
        vertical-align: top
        padding-right: 22px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 50%
        margin-top: -8px
    .bg
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      height: 100%
      overflow: hidden
      filter: blur(10px)
      &>img
        position: absolute
        top: -112px
        left: 0px

</style>
