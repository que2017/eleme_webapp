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
      <div class="ball" v-if="this.$store.state.mousePos.click"></div>
    </transition>
  </div>
</template>

<script>
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
      beforeEnter (elem) {
        this.pos = this.$store.state.mousePos.pos
        let winH = window.innerHeight
        elem.style.top = `${-winH + this.pos.y + 48}px`
        elem.style.marginLeft = `${this.pos.x - 32}px`
      },
      ballEnter (elem) {
        this.pos = this.$store.state.mousePos.pos
        let winH = window.innerHeight
        elem.style.marginLeft = 0
        elem.style.webkitTransform = `translate3d(0,${winH - this.pos.y - 48}px,0)`
        elem.style.transform = `translate3d(0,${winH - this.pos.y - 48}px,0)`
      },
      afterEnter (elem) {
        elem.style.top = 0
        elem.marginLeft = 0
        elem.style.display = 'none'
        this.$store.state.mousePos.click = false
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .shopcart-wrap
    position: fixed
    left: 0
    bottom: 0
    display: flex
    width: 100%
    height: 48px
    color: rgba(255, 255, 255, 0.4)
    .drop-enter-active
      transition: transform 0.4s cubic-bezier(.43, -0.43, .82, .65), margin-left 0.4s linear
    .ball
      position: absolute
      top: 0
      left: 32px
      width: 16px
      height: 16px
      border-radius: 50%
      background: rgb(0, 160, 220)
    .shopcart-left
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
</style>
