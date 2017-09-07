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
      <div v-if="seller.supports" class="sup-num" @click="showDetail">
        <span class="num">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrap" @click="showDetail">
      <span class="bull-icon"></span>
      <p class="bull-text">{{seller.bulletin}}</p>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="show_detail">
        <div class="detail-wrap">
          <div class="detail-main">
            <p class="title">{{seller.name}}</p>
            <div class="score">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="supports">
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="item-wrap" v-if="seller.supports">
                <li v-for="item,index in seller.supports" class="item">
                  <span class="icon" :class="cssMap[seller.supports[index].type]"></span>
                  <span class="info">{{seller.supports[index].description}}</span>
                </li>
              </ul>
            </div>
            <div class="supports">
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <p class="context">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'

  export default {
    props: ['seller'],
    data () {
      return {
        show_detail: false
      }
    },
    methods: {
      showDetail () {
        this.show_detail = true
      },
      hideDetail () {
        this.show_detail = false
      }
    },
    created () {
      this.cssMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minix.styl";

  .header
    position: relative
    overflow: hidden
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
        font-size: 0
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
      background-color: rgba(7,17,27,0.2)
      .bull-icon
        position: absolute
        top: 8px
        left: 12px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 100% 100%
      .bull-text
        padding: 0 28px 0 38px
        height: 28px
        line-height: 28px
        font-size: 10px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
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
      filter: blur(10px)
      &>img
        position: absolute
        top: -112px
        left: 0
    .fade-enter-active, .fade-leave-active
      transition: opacity 0.5s
    .fade-enter, .fade-leave-to
      opacity: 0
    .detail
      position: fixed
      z-index: 10
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7,17,27,0.8)
      backdrop-filter: blur(10px)
      .detail-wrap
        min-height: 100%
        .detail-main
          width: 100%
          padding-top: 64px
          padding-bottom: 64px
          .title
            width: 100%
            text-align: center
            font-size: 16px
            font-weight: 700
          .score
            margin: 16px 0 28px 0
            text-align: center
          .supports
            width: 80%
            margin: 28px auto 0 auto
            .title
              display: flex
              height: 16px
              align-items: center
              .line
                flex-grow: 1
                border-bottom: 1px solid rgba(255,255,255,0.2)
              .text
                margin: 0 12px
                font-size: 16px
                font-weight: 700
            .item-wrap
              width: 100%
              margin: 24px 0 0 12px
              .item
                font-size: 0
                margin-bottom: 12px
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                vertical-align: middle
                width: 16px
                height: 16px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.special
                  bg-image('special_2')
                &.invoice
                  bg-image('invoice_2')
                &.guarantee
                  bg-image('guarantee_2')
              .info
                vertical-align: middle
                margin-left: 6px
                font-size: 14px
                font-weight: 200
                line-height: 14px
            .context
              padding: 24px 12px 0 12px
              font-size: 14px
              line-height: 24px
      .detail-close
        position: relative
        width:32px
        height:32px
        margin: 0 auto
        margin-top: -64px
        .icon-close
          font-size: 32px

</style>
