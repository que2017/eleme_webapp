<template>
  <div>
    <split></split>
    <div class="food-rating">
      <h3 class="rating-title">商品评论</h3>
      <div class="rating-describe">
        <span class="desc all">{{describe.all}} <span class="num">11</span></span>
        <span class="desc positive">{{describe.positive}} <span class="num">14</span></span>
        <span class="desc negative">{{describe.negative}} <span class="num">22</span></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from '../split/split.vue'

  export default {
    props: {
      describe: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      },
      ratings: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      split
    }
  }
</script>

<style lang="stylus">

  .food-rating
    padding: 18px
    .rating-title
      margin-bottom: 6px
      font-size: 16px
      font-weight: 400
    .rating-describe
      margin-top: 16px
      .desc
        display: inline-block
        height: 28px
        padding: 0 12px
        margin-right: 8px
        border-radius: 1px
        line-height: 28px
        font-size: 12px
        .num
          font-size: 8px
          vertical-align: bottom
      .all
        color: #fff
        background: rgb(0,160,220)
      .positive
        color: rgb(77,85,93)
        background: rgba(0,160,220,0.2)
      .negative
        color: rgb(77,85,93)
        background: rgba(77,85,93,0.2)
</style>
