<template>
  <div class="goods-wrap">
    <div class="menu-wrap" ref="menuWrap">
      <ul>
        <li v-for="item,index in goods" class="menu-item border-1px" :class="{'current':nowIndex === index}"
            @click="menuTouch(index)">
          <span class="text">
            <span v-show="item.type>=0" class="icon" :class="cssMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <ul>
        <li v-for="cate in goods" class="food-cate food-hook">
          <h2 class="title">{{cate.name}}</h2>
          <ul>
            <li v-for="item in cate.foods" class="food-item border-1px">
              <div class="icon"><img :src="item.icon" width="100%" height="100%"/></div>
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
              <div class="select">
                <cartcontrol :food="item"></cartcontrol>
              </div>
            </li>
            <food v-show="true"></food>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import food from '../food/food.vue'
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import BScroll from 'better-scroll'

  const ERR_OK = 0

  export default {
    props: ['seller'],
    data () {
      return {
        goods: [],
        height: [],
        scrollY: 0
      }
    },
    computed: {
      nowIndex () {
        for (let i = 0; i < this.height.length - 1; i++) {
          if (this.height[i] <= this.scrollY && this.height[i + 1] > this.scrollY) {
            return i
          }
        }
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((goodsItem) => {
          goodsItem.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        if (response.data.errno === ERR_OK) {
          this.goods = response.data.data
          this.$nextTick(() => {
            this._initScroll()
            this._calcuHeight()
          })
        }
      })
      this.cssMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      food,
      shopcart,
      cartcontrol
    },
    methods: {
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.menuWrap, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
          // console.log(this.scrollY)
        })
      },
      _calcuHeight () {
        let foodsList = this.$refs.foodsWrap.querySelectorAll('.food-hook')
        let h = 0
        this.height.push(h)
        for (let i = 0; i < foodsList.length; i++) {
          h += foodsList[i].clientHeight
          this.height.push(h)
        }
      },
      menuTouch (index) {
        let foodsList = this.$refs.foodsWrap.querySelectorAll('.food-hook')
        let elem = foodsList[index]
        this.foodsScroll.scrollToElement(elem, 300)
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
        border-1px(rgba(7, 17, 27, 0.1))
        background: #f3f5f7
        font-weight: 200
        &.current
          background-color: #fff
          color: #000
          font-weight: 700
        .text
          display: table-cell
          vertical-align: middle
          width: 56px
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
          color: rgb(147, 153, 159)
          background-color: #f3f5f7
        .food-item
          position: relative
          display: flex
          margin-left: 18px
          padding: 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
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
              color: rgb(7, 17, 27)
              font-size: 14px
              line-height: 14px
            .disc
              padding-top: 8px
              color: rgb(147, 153, 159)
              font-size: 10px
              line-height: 10px
            .sell-rating
              font-size: 0
              padding-top: 8px
              color: rgb(147, 153, 159)
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
                color: rgb(240, 20, 20)
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
                color: rgb(147, 153, 159)
                &:before
                  content: '￥'
                  display: inline-block
                  text-decoration: line-through
                  font-size: 10px
                  font-weight: normal
          .select
            position: absolute
            bottom: 18px
            right: 18px
</style>
