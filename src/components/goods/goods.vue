<template>
  <div class="goods-wrap">
    <div class="menu-wrap" ref="menuWrap">
      <ul>
        <li v-for="item in goods" class="menu-item border-1px">
          <span class="text">
            <span v-show="item.type>=0" class="icon" :class="cssMap[item.type]"></span>{{item.name}}            
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <ul>
        <li v-for="cate in goods" class="food-cate">
          <h2 class="title">{{cate.name}}</h2>
          <ul>
            <li v-for="item in cate.foods" class="food-item border-1px">
              <div class="icon"><img :src="item.icon" width="100%" height="100%" /></div>
              <div class="info">
                <h3 class="item-name">{{item.name}}</h3>
                <h4 class="disc" v-show="item.description">{{item.description}}</h4>
                <div class="sell-rating">
                  <span class="sell">月售{{item.sellCount}}份</span>
                  <span class="rating">好评率{{item.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now-price">{{item.price}}</span>
                  <span v-show="item.oldPrice" class="old-price">{{item.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  const ERR_OK = 0

  export default {
    props: ['seller'],
    data () {
      return {
        goods: []
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        if (response.data.errno === ERR_OK) {
          this.goods = response.data.data
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
      this.cssMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.menuWrap, {})
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minix.styl";

  .goods-wrap
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    overflow: hidden
    .menu-wrap
      flex: 0 0 80px
      width: 80px
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        border-1px(rgba(7,17,27,0.1))
        background: #f3f5f7
        .text
          display: table-cell
          vertical-align: middle
          width: 56px
          font-weight: 200
          font-size: 12px
          line-height: 14px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.special
              bg-image('special_3')
            &.invoice
              bg-image('invoice_3')
            &.guarantee
              bg-image('guarantee_3')
    .foods-wrap
      flex: 1
      .food-cate
        display: block
        .title
          height: 26px
          border-left: 2px solid #d9dde1
          padding-left: 12px
          font-size: 12px
          line-height: 26px
          color: rgb(147,153,159)
          background-color: #f3f5f7
        .food-item
          display: flex
          margin-left: 18px
          padding: 18px 0
          border-1px(rgba(7,17,27,0.1))
          &:last-chlid
            border-none()
          .icon
            flex: 0 0 57px
            width: 57px
            height: 57px
          .info
            flex: 1
            margin-left: 10px
            .item-name
              padding-top: 2px
              color: rgb(7,17,27)
              font-size: 14px
              line-height: 14px
            .disc
              padding-top: 8px
              color: rgb(147,153,159)
              font-size: 10px
              line-height: 10px
            .sell-rating
              font-size: 0
              padding-top: 8px
              color: rgb(147,153,159)
              .sell
                display: inline-block
                font-size: 10px
                line-height: 10px
              .rating
                display: inline-block
                margin-left: 12px
                font-size: 10px
                line-height: 10px
            .price
              height: 24px
              margin-top: 8px
              font-size: 0
              .now-price
                display: inline-block
                height: 24px
                text-align: top
                font-size: 14px
                font-weight: 700
                color: rgb(240,20,20)
                &:before
                  content: '￥'
                  display: inline-block
                  height: 100%
                  text-align: bottom
                  font-size: 10px
                  font-weight: normal
              .old-price
                display: inline-block
                height: 24px
                text-align: top
                text-decoration: line-through
                margin-left: 8px
                font-size: 10px
                font-weight: 700
                color: rgb(147,153,159)
                &:before
                  content: '￥'
                  display: inline-block
                  text-decoration: line-through
                  font-size: 10px
                  font-weight: normal
</style>
