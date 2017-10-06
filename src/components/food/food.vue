<template>
  <transition name="fly-in">
    <div class="cover" ref="cover">
      <div class="cover-wrap">
        <div class="close" @click="closeDetail">
          <span class="icon-close"></span>
        </div>
        <div class="title-img"><img :src="food.image" width="100%" height="100%"/></div>
        <div class="food-info">
          <h2 class="title">{{food.name}}</h2>
          <div class="sell-rating">
            <span class="sell">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price-addfood">
            <div class="price">
              <span class="now-price">{{food.price}}</span>
              <span v-show="food.oldPrice" class="old-price">{{food.oldPrice}}</span>
            </div>
            <div v-show="!food.count" class="addfood" @click.stop="addFood($event)">加入购物车</div>
            <div class="cart-control">
              <cartcontrol v-show="food.count" :food="food"></cartcontrol>
            </div>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div v-show="food.info" class="food-intro">
          <h3 class="intro-title">商品介绍</h3>
          <p class="intro">{{food.info}}</p>
        </div>
        <ratingselect :describe="describe" :ratings="food.ratings"></ratingselect>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import Vue from 'vue'
  import BScroll from 'better-scroll'

  export default {
    props: {
      food: Object
    },
    data () {
      return {
        pos: {
          x: 0,
          y: 0
        },
        describe: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      closeDetail () {
        this.$emit('close')
      },
      addFood (event) {
//        this.pos.x = Math.abs(event.touches[0].clientX)
//        this.pos.y = Math.abs(event.touches[0].clientY)
        if (event._constructed) {
          this.pos.x = Math.abs(event.offsetX)
          this.pos.y = Math.abs(event.offsetY)
        } else {
          this.pos.x = Math.abs(event.pageX)
          this.pos.y = Math.abs(event.pageY)
        }
//        console.log(event)
        if (this.food.count !== undefined) {
          this.food.count++
        } else {
          Vue.set(this.food, 'count', 1)
        }
        this.$store.dispatch('setClick', false)
        this.$nextTick(() => {
          this.$store.dispatch('setClick', true)
        })
        this.$store.dispatch('setPos', this.pos)
      }
    },
    watch: {
      food: function () {
        this.$nextTick(() => {
          if (!this.cover) {
            this.cover = new BScroll(this.$refs.cover, {
              click: true
            })
            console.log(this.cover)
          } else {
            this.cover.refresh()
          }
        })
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus">
  .fly-in-enter-active, .fly-in-leave-active
    transition: all 0.4s linear
    transform: translate3d(0, 0, 0)

  .fly-in-enter, .fly-in-leave-to
    transform: translate3d(100%, 0, 0)

  .cover
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #fff
    overflow: hidden
    .cover-wrap
      padding-bottom: 50px
      .close
        position: absolute
        top: 10px
        left: 10px
        width: 32px
        height: 32px
        border-radius: 50%
        color: #fff
        text-align: center
        line-height: 32px
        font-size: 24px
        background: rgba(0, 0, 0, 0.3)
      .title-img
        width: 100%
        height: 375px
      .food-info
        box-sizing: border-box
        width: 100%
        height: 120px
        padding: 18px
        .title
          height: 14px
          font-size: 14px
          font-weight: 700
          line-height: 14px
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
        .price-addfood
          margin-top: 18px
          .price
            float: left
            height: 24px
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
          .addfood
            float: right
            width: 74px
            padding: 0 12px
            border-radius: 12px
            font-size: 10px
            line-height: 24px
            text-align: center
            color: #fff
            background: rgb(0, 160, 220)
          .cart-control
            float: right
      .food-intro
        padding: 18px
        .intro-title
          margin-bottom: 6px
          font-size: 16px
          font-weight: 400
        .intro
          padding-left: 8px
          font-size: 12px
          font-weight: 200
          color: rgb(77, 85, 93)
          line-height: 24px
</style>
