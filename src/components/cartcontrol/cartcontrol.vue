<template>
  <div class="control-wrap">
    <div class="cart-add" @click.stop="addFood($event)">
      <span class="icon-add_circle"></span>
    </div>
    <div class="num" v-show="food.count">{{food.count}}</div>
    <transition name="roll">
      <div class="cart-remove" v-show="food.count" @click.stop="removeFood">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    props: {
      food: Object
    },
    data () {
      return {
        pos: {
          x: 0,
          y: 0
        }
      }
    },
    methods: {
      addFood (event) {
//        this.pos.x = Math.abs(event.touches[0].clientX)
//        this.pos.y = Math.abs(event.touches[0].clientY)
//        this.pos = this.getPosition(event.target)
//        console.log(this.pos)
//        console.log(document.body.scrollTop || document.documentElement.scrollTop)
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
      },
      removeFood () {
        this.food.count--
      }
//      getPosition (elem) {
//        let x = elem.offsetLeft
//        let y = elem.offsetTop
//        while (elem) {
//          x += elem.offsetLeft
//          y += elem.offsetTop
//          elem = elem.offsetParent
//        }
//        if (this.food.count) {
//          x -= 48
//        }
//        y -= document.body.scrollTop || document.documentElement.scrollTop
//        return {
//          x: x,
//          y: y
//        }
//      }
    }
  }
</script>

<style lang="stylus">
  .control-wrap
    height: 30px
    font-size: 0
    .roll-enter-active, .roll-leave-active
      transition: all 0.5s linear
      transform: translate3d(0, 0, 0) rotate(0)
    .roll-enter, .roll-leave-to
      opacity: 0
      transform: translate3d(24px, 0, 0) rotate(180deg)
    .cart-remove, .cart-add
      float: right
      width: 24px
      height: 24px
      padding: 3px
      font-size: 24px
      color: rgb(0, 160, 220)
    .num
      float: right
      width: 18px
      height: 30px
      line-height: 30px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
</style>
