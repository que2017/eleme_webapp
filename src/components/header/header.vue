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
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['seller']
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minix.styl";

  .header
    color: #fff
    background: #000
    .content-wrap
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
        font-size: 14px
        .title
          padding: 2px 0 8px 0
          font-size: 0
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

        
</style>
