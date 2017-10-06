<template>
  <div>
    <split></split>
    <div class="food-rating">
      <h3 class="rating-title">商品评论</h3>
      <div class="rating-describe" v-show="ratings&&ratings.length">
        <span class="desc all" :class="{'active': selectType === 2}" @click="showRatingsData(2)">{{describe.all}} <span
          class="num">{{allRatings.length}}</span></span>
        <span class="desc positive" :class="{'active': selectType === 0}" @click="showRatingsData(0)">{{describe.positive}} <span
          class="num">{{positives.length}}</span></span>
        <span class="desc negative" :class="{'active-neg': selectType === 1}" @click="showRatingsData(1)">{{describe.negative}} <span
          class="num">{{negatives.length}}</span></span>
      </div>
      <span class="only-content icon-check_circle" v-show="ratings&&ratings.length" :class="{'on': onlyContent}" @click="onlyContentRatings">只看有内容的评价</span>
      <div class="no-ratings" v-show="!(ratings&&ratings.length)">暂无评论~</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from '../split/split.vue'

  //  const ALL = 2
  //  const POSITIVE = 0
  //  const NEGATIVE = 1

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
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      selectType: {
        type: Number,
        default: 2
      }
    },
//    data () {
//      return {
//        positiveRatings: [],
//        negativeRatings: [],
//        textRatings: [],
//        textPosiRatings: [],
//        textNegaRatings: [],
//        showRatings: [],
//        onlyContent: false
//      }
//    },
    methods: {
//      showRatingsData (ratingsData, textRatingsData) {
//        if (this.onlyContent) {
//          this.showRatings = textRatingsData
//        } else {
//          this.showRatings = ratingsData
//        }
//      },
//      onlyContentRatings () {
//        this.onlyContent = !this.onlyContent
//        if (this.onlyContent) {
//          this.showRatings = this.textRatings
//        } else {
//          this.showRatings = this.ratings
//        }
//      }
      showRatingsData (type) {
        this.$emit('changeSelectType', type)
      },
      onlyContentRatings () {
        this.$emit('changeOnlyContent', !this.onlyContent)
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((item) => {
//          return rating.rateType === 0
          if (this.onlyContent && item.text) {
            return item.rateType === 0
          } else if (!this.onlyContent) {
            return item.rateType === 0
          }
        })
      },
      negatives () {
        return this.ratings.filter((item) => {
//          return rating.rateType === 1
          if (this.onlyContent && item.text) {
            return item.rateType === 1
          } else if (!this.onlyContent) {
            return item.rateType === 1
          }
        })
      },
      allRatings () {
        return this.ratings.filter((item) => {
          if (this.onlyContent && item.text) {
            return true
          } else if (!this.onlyContent) {
            return true
          } else {
            return false
          }
        })
      }
    },
//    watch: {
//      'ratings': function () {
//        this.positiveRatings = []
//        this.negativeRatings = []
//        this.textRatings = []
//        this.textPosiRatings = []
//        this.textNegaRatings = []
//        this.onlyContent = false
//        for (let i = 0; i < this.ratings.length; i++) {
//          let item = this.ratings[i]
//          let date = new Date(item.rateTime)
//          let numDate = {
//            year: date.getFullYear(),
//            month: ('00' + (date.getMonth() + 1)).substring((date.getMonth() + 1).toString().length),
//            date: ('00' + date.getDate()).substring(date.getDate().toString().length),
//            hour: ('00' + date.getHours()).substring(date.getHours().toString().length),
//            minute: ('00' + date.getMinutes()).substring(date.getMinutes().toString().length)
//          }
//          let strDate = numDate.year + '-' + numDate.month + '-' + numDate.date + ' ' + numDate.hour + ':' + numDate.minute
//          item.time = strDate
//          if (item.text) {
//            this.textRatings.push(item)
//            if (item.rateType === 0) {
//              this.textPosiRatings.push(item)
//            }
//            if (item.rateType === 1) {
//              this.textNegaRatings.push(item)
//            }
//          }
//          if (item.rateType === 0) {
//            this.positiveRatings.push(item)
//          }
//          if (item.rateType === 1) {
//            this.negativeRatings.push(item)
//          }
//        }
//        this.showRatings = this.ratings
//      }
//    },
    components: {
      split
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/minix.styl"

  .food-rating
    padding: 18px 18px 0 18px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .rating-title
      margin-bottom: 6px
      font-size: 16px
      font-weight: 400
    .rating-describe
      padding: 16px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .desc
        display: inline-block
        height: 28px
        padding: 0 12px
        margin-right: 8px
        border-radius: 1px
        line-height: 28px
        font-size: 12px
        .num
          display: inline-block
          height: 28px
          font-size: 8px
          line-height: 28px
          vertical-align: 0%
      .all
        color: rgb(77, 85, 93)
        background: rgba(0, 160, 220, 0.2)
      .positive
        color: rgb(77, 85, 93)
        background: rgba(0, 160, 220, 0.2)
      .negative
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
      .active
        color: #fff
        background: rgb(0, 160, 220)
      .active-neg
        color: #fff
        background: rgb(77, 85, 93)
    .only-content
      display: block
      height: 24px
      padding: 12px 0
      color: rgb(147, 153, 159)
      font-size: 12px
      line-height: 24px
      &:before
        vertical-align: middle
        margin-right: 4px
        font-size: 24px
        line-height: 24px
    .on
      &:before
        color: #00c850
    .no-ratings
      padding: 24px 0 36px 0
      border-top: 1px solid #ccc
      text-align: center
      font-size: 12px
</style>
