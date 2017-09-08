<template>
  <div class="shopcart-wrap">
    <div class="shopcart-left clearfix">
      <div class="cart" :class="{'heiglight':totalCount>0}">
        <span class="icon-shopping_cart"></span>
        <span class="num-icon" v-show="totalCount>0">{{selectFoods.length}}</span>
      </div>
      <div class="price" :class="{'heiglight':totalPrice>0}">
        ￥{{totalPrice > 0 ? totalPrice : 0}}
      </div>
      <div class="dispatch">另需配送费￥{{deliveryPrice}}元</div>
    </div>
    <div class="shopcart-right" :class="{enough:totalPrice>=minPrice}">{{payDescription}}</div>
    <transition name="drop"
                v-on:before-enter="beforeEnter"
                v-on:enter="ballEnter"
                v-on:after-enter="afterEnter"
    >
      <div v-if="this.$store.state.mousePos.click"></div>
    </transition>
    <div class="ball-wrap"></div>
    <div class="shopcart-foods-hide">
      <div class="hide-top">
        <div class="title">购物车</div>
        <div class="clear">清空</div>
      </div>
      <ul class="foods-wrap">
        <li v-for="item in selectFoods" class="food-item">
          <div class="name">{{item.name}}</div>
          <div class="info">
            <div class="price">{{item.price}}</div>
            <div class="foods-num">
              <cartcontrol :food="item"></cartcontrol>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import cartcontrol from '../cartcontrol/cartcontrol.vue'

  export default {
    props: ['selectFoods', 'deliveryPrice', 'minPrice'],
    data () {
      return {
        pos: {
          x: 0,
          y: 0
        }
      }
    },
    methods: {
      beforeEnter () {
        let ballWrap = document.querySelector('.ball-wrap')
        let ball = document.createElement('div')
        ball.className = 'ball'
        this.pos = this.$store.state.mousePos.pos
        ball.style.top = `${this.pos.y}px`
        ball.style.marginLeft = `${this.pos.x - 48}px`
        ballWrap.appendChild(ball)
      },
      ballEnter () {
        this.$nextTick(() => {
          let winH = window.innerHeight
          let ball = document.querySelector('.ball-wrap').querySelectorAll('.ball')
          for (let i = 0; i < ball.length; i++) {
            ball[i].style.marginLeft = '0px'
            ball[i].style.webkitTransform = `translate3d(0,${winH - this.pos.y - 48}px,0)`
            ball[i].style.transform = `translate3d(0,${winH - this.pos.y - 48}px,0)`
            ball[i].addEventListener('webkitTransitionEnd', function () {
              this.style.display = 'none'
            })
            ball[i].addEventListener('transitionend', function () {
              this.style.display = 'none'
            })
          }
        })
      },
      afterEnter () {
        document.querySelector('.ball-wrap').innerHTML = ''
        this.$store.dispatch('setClick', false)
      }
    },
    computed: {
      totalPrice () {
        let price = 0
        this.selectFoods.forEach((food) => {
          price += food.price * food.count
        })
        return price
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDescription () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`
        } else {
          return `去结算`
        }
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minix.styl"

  .shopcart-wrap
    position: fixed
    left: 0
    bottom: 0
    display: flex
    width: 100%
    height: 48px
    color: rgba(255, 255, 255, 0.4)
    .drop-enter-active
      transition: all 0.4s
    .ball-wrap
      position: relative
      .ball
        position: fixed
        bottom: 48px
        left: 32px
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
        transition: transform 0.4s cubic-bezier(0.43, -0.43, 0.82, 0.65), margin-left 0.4s linear
    .shopcart-left
      position: relative
      z-index: 10
      flex: 1
      height: 100%
      background: #141d27
      .cart
        position: relative
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
        &.heiglight
          background: rgb(0, 160, 220)
          color: #fff
        .num-icon
          position: absolute
          top: -6px
          right: 0
          width: 24px
          height: 16px
          border-radius: 8px
          background: rgb(240, 20, 20)
          color: #fff
          text-align: center
          line-height: 16px
          font-size: 9px
          font-weight: 700
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        float: left
        height: 24px
        margin: 12px 12px 12px 0
        font-size: 16px
        font-weight: 700
        line-height: 24px
        &.heiglight
          color: #fff
      .dispatch
        float: left
        height: 24px
        padding-left: 12px
        margin: 12px 0
        border-left: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 12px
        line-height: 24px
    .shopcart-right
      position: relative
      z-index: 10
      flex: 0 0 105px
      height: 48px
      width: 105px
      background: #2B333B
      text-align: center
      font-size: 12px
      font-weight: 700
      line-height: 48px
      &.enough
        color: #fff
        background: #00b43c
    .shopcart-foods-hide
      position: absolute
      z-index: 9
      top: 0
      left: 0
      width: 100%
      .hide-top
        width: 100%
        height: 40px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          height: 40px
          margin-left: 18px
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
          line-height: 40px
        .clear
          float: right
          height: 40px
          margin-right: 18px
          font-size: 12px
          color: rgb(0, 160, 220)
          line-height: 40px
      .foods-wrap
        max-height: 217px
        overflow: auto
        .food-item
          display: block
          width: 100%
          height: 48px
          border-1px(rgba(7, 17, 27, 0.1))
          background: #fff
          .name
            float: left
            height: 48px
            margin-left: 18px
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 48px
          .info
            float: right
            height: 48px
            margin-right: 18px
            font-size: 0
            .price
              display: inline-block
              vertical-align: middle
              height: 48px
              color: rgb(240, 20, 20)
              font-size: 14px
              font-weight: 700
              line-height: 48px
              &:before
                content: '￥'
                display: inline-block
                height: 100%
                text-align: bottom
                font-size: 10px
                font-weight: normal
            .foods-num
              display: inline-block
              vertical-align: middle
              height: 30px
              padding: 9px 0
              margin-left: 12px
</style>
