<template>
  <div class="control-wrap">
    <div class="cart-add" @click="addFood">
      <span class="icon-add_circle"></span>
    </div>
    <div class="num" v-show="food.count">{{food.count}}</div>
    <div class="cart-remove" v-show="food.count" @click="removeFood">
      <span class="icon-remove_circle_outline"></span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    props: {
      food: Object
    },
    methods: {
      addFood () {
        if (this.food.count !== undefined) {
          this.food.count++
        } else {
          Vue.set(this.food, 'count', 1)
        }
      },
      removeFood () {
        this.food.count--
      }
    }
  }
</script>

<style lang="stylus">
  .control-wrap
    height: 30px
    font-size: 0
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
