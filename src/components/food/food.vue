<template>
  <div class="cover">
    <div class="title-img"><img :src="food.image" width="100%" height="100%"/></div>
    <div class="food-info"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: Object
    },
    created () {
    }
  }
</script>

<style lang="stylus">
  .cover
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    background: #fff
    .title-img
      width: 100%
      height: 375px
    .food-info
      width: 100%
      height: 120px
</style>
