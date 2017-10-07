<template>
  <div class="seller-wrap">
    <div>
      <div class="seller-title">
        <h3 class="title">{{seller.name}}</h3>
        <div class="score">
          <star class="star" :size="36" :score="seller.score"></star>
          <div class="sell-num">
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
        </div>
      </div>
      <ul class="price-info">
        <li class="info-item">
          <div class="info-name">起送价</div>
          <div class="price"><span class="stress">{{seller.minPrice}}</span>元</div>
        </li>
        <li class="info-item">
          <div class="info-name">商家配送</div>
          <div class="price"><span class="stress">{{seller.deliveryPrice}}</span>元</div>
        </li>
        <li class="info-item">
          <div class="info-name">平均配送时间</div>
          <div class="price"><span class="stress">{{seller.deliveryTime}}</span>分钟</div>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="bulletin">
      <h3 class="title">公告与活动</h3>
      <p class="content">{{seller.bulletin}}</p>
      <ul class="supports-wrap">
        <li class="support" v-for="item in seller.supports">
          <supports :type="item.type" :description="item.description" :bg="true"></supports>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import supports from '../supports/supports.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created () {
    },
    components: {
      star,
      split,
      supports
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/minix.styl'

  .seller-wrap
    position: absolute
    top: 173px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .title
      height: 14px
      padding-top: 18px
      color: rgb(7, 17, 27)
      font-size: 14px
      line-height: 14px
    .seller-title
      padding: 0 18px
      .score
        height: 18px
        padding: 8px 0 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          float: left
          height: 18px
        .sell-num
          float: left
          height: 18px
          margin-left: 8px
          color: rgb(77, 85, 93)
          font-size: 0
          .rating-count
            display: inline-block
            font-size: 10px
            line-height: 18px
          .sell-count
            display: inline-block
            margin-left: 12px
            font-size: 10px
            line-height: 18px
    .price-info
      display: flex
      width: 100%
      padding: 18px 0
      .info-item
        flex: 1
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        &:last-child
          border-right: none
        .info-name
          margin-bottom: 8px
          color: rgb(147, 153, 159)
          font-size: 10px
          line-height: 10px
        .price
          height: 24px
          color: rgb(7, 17, 27)
          font-size: 10px
          font-weight: 200
          line-height: 24px
          .stress
            font-size: 24px
    .bulletin
      padding: 0 18px
      .content
        padding: 6px 12px 18px 12px
        color: rgb(240, 20, 20)
        font-size: 12px
        font-weight: 200
        line-height: 24px
</style>
