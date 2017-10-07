<template>
  <div>
    <span :class="[iconStyle,cssMap[type]]"></span>
    <span class="info" :class="{'small': small}">{{description}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: Number
      },
      description: {
        type: String
      },
      small: {
        type: Boolean,
        default: false
      },
      bg: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        cssMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    computed: {
      iconStyle () {
        if (this.small) {
          return 'icon-small'
        } else if (this.bg) {
          return 'icon-big-bg'
        } else {
          return 'icon-big'
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/minix.styl"

  .icon-big
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

  .icon-big-bg
    display: inline-block
    vertical-align: middle
    width: 16px
    height: 16px
    background-size: 16px 16px
    background-repeat: no-repeat
    &.decrease
      bg-image('decrease_4')
    &.discount
      bg-image('discount_4')
    &.special
      bg-image('special_4')
    &.invoice
      bg-image('invoice_4')
    &.guarantee
      bg-image('guarantee_4')

  .icon-small
    display: inline-block
    vertical-align: middle
    width: 12px
    height: 12px
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

  .info
    vertical-align: middle
    margin-left: 6px
    font-size: 12px
    font-weight: 200
    line-height: 14px
    &.small
      margin-left: 4px
      font-size: 10px
      line-height: 12px
</style>
