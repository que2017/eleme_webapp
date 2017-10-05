<template>
  <div>
    <split></split>
    <div class="food-rating">
      <h3 class="rating-title">商品评论</h3>
      <div class="rating-describe">
        <span class="desc all" @click="showRatingsData(ratings,textRatings)">{{describe.all}} <span
          class="num">{{onlyContent ? textRatings.length : ratings.length}}</span></span>
        <span class="desc positive"
              @click="showRatingsData(positiveRatings,textPosiRatings)">{{describe.positive}} <span
          class="num">{{onlyContent ? textPosiRatings.length : positiveRatings.length}}</span></span>
        <span class="desc negative"
              @click="showRatingsData(negativeRatings,textNegaRatings)">{{describe.negative}} <span
          class="num">{{onlyContent ? textNegaRatings.length : negativeRatings.length}}</span></span>
      </div>
      <span class="only-content icon-check_circle" :class="{'on': onlyContent}"
            @click="onlyContentRatings">只看有内容的评价</span>
    </div>
    <ul class="ratings-wrap">
      <li class="rating-item" v-for="item in showRatings">
        <div class="rating-info clearfix">
          <div class="time">{{item.time}}</div>
          <div class="avatar"><img :src="item.avatar" width="12px" height="12px"/></div>
          <div class="username">{{item.username}}</div>
        </div>
        <p class="text"><span
          :class="{'icon-thumb_down': item.rateType === 1,'icon-thumb_up': item.rateType === 0}"></span>{{item.text}}
        </p>
      </li>
    </ul>
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
    data () {
      return {
        positiveRatings: [],
        negativeRatings: [],
        textRatings: [],
        textPosiRatings: [],
        textNegaRatings: [],
        showRatings: [],
        onlyContent: false
      }
    },
    methods: {
      showRatingsData (ratingsData, textRatingsData) {
        if (this.onlyContent) {
          this.showRatings = textRatingsData
        } else {
          this.showRatings = ratingsData
        }
      },
      onlyContentRatings () {
        this.onlyContent = !this.onlyContent
        if (this.onlyContent) {
          this.showRatings = this.textRatings
        } else {
          this.showRatings = this.ratings
        }
      }
    },
    watch: {
      'ratings': function () {
        this.positiveRatings = []
        this.negativeRatings = []
        this.textRatings = []
        this.textPosiRatings = []
        this.textNegaRatings = []
        this.onlyContent = false
        for (let i = 0; i < this.ratings.length; i++) {
          let item = this.ratings[i]
          let date = new Date(item.rateTime)
          let numDate = {
            year: date.getFullYear(),
            month: ('00' + (date.getMonth() + 1)).substring((date.getMonth() + 1).toString().length),
            date: ('00' + date.getDate()).substring(date.getDate().toString().length),
            hour: ('00' + date.getHours()).substring(date.getHours().toString().length),
            minute: ('00' + date.getMinutes()).substring(date.getMinutes().toString().length)
          }
          let strDate = numDate.year + '-' + numDate.month + '-' + numDate.date + ' ' + numDate.hour + ':' + numDate.minute
          item.time = strDate
          if (item.text) {
            this.textRatings.push(item)
            if (item.rateType === 0) {
              this.textPosiRatings.push(item)
            }
            if (item.rateType === 1) {
              this.textNegaRatings.push(item)
            }
          }
          if (item.rateType === 0) {
            this.positiveRatings.push(item)
          }
          if (item.rateType === 1) {
            this.negativeRatings.push(item)
          }
        }
        this.showRatings = this.ratings
      }
    },
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
        color: #fff
        background: rgb(0, 160, 220)
      .positive
        color: rgb(77, 85, 93)
        background: rgba(0, 160, 220, 0.2)
      .negative
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
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

  .ratings-wrap
    box-sizing: border-box
    width: 100%
    padding: 0 18px
    .rating-item
      display: block
      border-1px(rgba(7, 17, 27, 0.1))
      .rating-info
        height: 12px
        padding-top: 16px
        .time
          float: left
          height: 100%
          color: rgb(147, 153, 159)
          font-size: 10px
          line-height: 12px
        .avatar
          float: right
          width: 12px
          height: 12px
          border-radius: 50%
          overflow: hidden
        .username
          float: right
          height: 100%
          margin-right: 6px
          color: rgb(147, 153, 159)
          font-size: 10px
          line-height: 12px
      .text
        height: 24px
        padding: 6px 0 16px 0
        color: rgb(7, 17, 27)
        font-size: 12px
        line-height: 24px
        .icon-thumb_down, .icon-thumb_up
          margin-right: 4px
          font-size: 12px
          line-height: 24px
        .icon-thumb_down
          color: rgb(147, 153, 159)
        .icon-thumb_up
          color: rgb(0, 160, 220)
</style>
