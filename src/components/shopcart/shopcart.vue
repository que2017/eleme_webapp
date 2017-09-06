<template>
  <div class="shopcart-wrap">
    <div class="shopcart-left clearfix">
      <div class="cart">
        <span class="icon-shopping_cart"></span>
      </div>
      <div class="price">￥0</div>
      <div class="dispatch">另需配送费￥4元</div>
    </div>
    <div class="shopcart-right">￥20起送</div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .shopcart-wrap
    position: fixed
    left: 0
    bottom: 0
    display: flex
    width: 100%
    height: 48px
    color: rgba(255,255,255,0.4)
    .shopcart-left
      flex: 1
      height: 100%
      background: #141d27
      .cart
        float: left
        width: 44px
        height: 44px
        margin: -10px 18px 0 12px
        border: 6px solid #141d27
        border-radius: 50%
        background: #2b343c
        text-align: center
        font-size: 24px
        line-height: 44px
      .price
        float: left
        height: 24px
        margin: 12px 12px 12px 0
        font-size: 16px
        font-weight: 700
        line-height: 24px
      .dispatch
        float: left
        height: 24px
        padding-left: 12px
        margin: 12px 0
        border-left: 1px solid rgba(255,255,255,0.1)
        font-size: 12px
        line-height: 24px
    .shopcart-right
      flex: 0 0 105px
      height: 48px
      width: 105px
      background: #2B333B
      text-align: center
      font-size: 12px
      font-weight: 700
      line-height: 48px
</style>
