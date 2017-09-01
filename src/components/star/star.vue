<template>
  <div class="star-wrap" :class="starType">
    <span v-for="item in itemClass" :class="item" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const ON = 'on'
  const HALF = 'half'
  const OFF = 'off'
  const LENGTH = 5

  export default {
    props: ['size', 'score'],
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClass () {
        let score = Math.floor(this.score * 2) / 2
        let hasHalf = score % 1 !== 0
        let starOn = Math.floor(score)
        let itemClass = []
        for (let i = 0; i < starOn; i++) {
          itemClass.push(ON)
        }
        if (hasHalf) {
          itemClass.push(HALF)
        }
        while (itemClass.length < LENGTH) {
          itemClass.push(OFF)
        }
        return itemClass
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minix.styl";

  .star-wrap
    font-size: 0px
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:lastChild
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:lastChild
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:lastChild
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
