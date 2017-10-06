<template>
  <div class="ratings" ref="ratingsWrap">
    <div>
      <div class="detail-info">
        <div class="left">
          <div class="total-score">{{seller.score}}</div>
          <div class="total-score-title">综合评分</div>
          <div class="rank-rate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right">
          <div class="service-score">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="service-score">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-time">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <ratingselect
        :ratings="ratings"
        :onlyContent="onlyContent"
        :selectType="selectType"
        @changeOnlyContent="changeOnlyContent"
        @changeSelectType="changeSelectType"></ratingselect>
      <ul class="ratings-wrap" v-show="ratings&&ratings.length">
        <li class="rating-item" v-show="needShow(item)" v-for="item in ratings">
          <div class="avatar"><img :src="item.avatar" width="28" height="28"/></div>
          <div class="rating-info">
            <div class="user-time">
              <div class="username">{{item.username}}</div>
              <div class="time">{{item.time}}</div>
            </div>
            <div class="star-delivery">
              <star class="star" :size="24" :score="item.score"></star>
              <div class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</div>
            </div>
            <p class="text" v-show="item.text">{{item.text}}</p>
            <div class="recommend clearfix">
              <span :class="{'icon-thumb_down': item.rateType === 1,'icon-thumb_up': item.rateType === 0}"></span>
              <div class="recom-text" v-for="recom in item.recommend">{{recom}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import { formatDate } from '../../common/js/date'
  import BScroll from 'better-scroll'

  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        onlyContent: false,
        selectType: 2
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          formatDate(this.ratings)
          this.$nextTick(() => {
            if (!this.ratingsWrap) {
              this.ratingsWrap = new BScroll(this.$refs.ratingsWrap, {
                click: true
              })
            } else {
              this.ratingsWrap.refresh()
            }
          })
        }
      })
    },
    methods: {
      needShow (item) {
        if (this.onlyContent && item.text) {
          if (this.selectType === 2) {
            return true
          } else {
            if (item.rateType === this.selectType) {
              return true
            }
          }
        } else if (!this.onlyContent) {
          if (this.selectType === 2) {
            return true
          } else {
            if (item.rateType === this.selectType) {
              return true
            }
          }
        } else {
          return false
        }
      },
      changeOnlyContent (bool) {
        this.onlyContent = bool
        this.$nextTick(() => {
          this.ratingsWrap.refresh()
        })
      },
      changeSelectType (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.ratingsWrap.refresh()
        })
      }
    },
    components: {
      star,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/minix.styl'

  .ratings
    position: absolute
    top: 173px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .detail-info
      display: flex
      padding: 18px 0
      .left
        flex: 0 0 137px
        text-align: center
        border-right: 1px solid rgba(147, 153, 159, 0.2)
        @media only screen and (max-width: 320px)
          flex: 0 0 115px
          width: 115px
        .total-score
          height: 28px
          color: rgb(255, 153, 0)
          font-size: 24px
          line-height: 28px
        .total-score-title
          height: 12px
          margin-top: 6px
          color: rgb(7, 17, 27)
          font-size: 12px
          line-height: 12px
        .rank-rate
          height: 10px
          padding: 8px 0 6px 0
          color: rgb(147, 153, 159)
          font-size: 10px
          line-height: 10px
      .right
        flex: 1
        padding-left: 24px
        @media only screen and (max-width: 320px)
          padding-left: 5px
        .title
          float: left
          color: rgb(7, 17, 27)
          font-size: 12px
          line-height: 18px
        .service-score
          height: 18px
          margin-bottom: 8px
          .star
            float: left
            margin: 0 12px
          .score
            float: left
            color: rgb(255, 153, 0)
            font-size: 12px
            line-height: 18px
        .delivery-time
          height: 18px
          .time
            float: left
            margin-left: 12px
            color: rgb(147, 153, 159)
            font-size: 12px
            line-height: 18px
    .ratings-wrap
      padding: 0 18px
      .rating-item
        display: flex
        padding: 16px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          height: 28px
          border-radius: 50%
          overflow: hidden
        .rating-info
          flex: 1
          margin-left: 6px
          .user-time
            height: 12px
            margin-bottom: 4px
            font-size: 10px
            line-height: 12px
            .username
              float: left
              color: rgb(7, 17, 27)
            .time
              float: right
              color: rgb(147, 153, 159)
              font-weight: 200
          .star-delivery
            height: 12px
            margin-bottom: 6px
            .star
              float: left
            .delivery
              float: left
              height: 12px
              margin-left: 6px
              color: rgb(147, 153, 159)
              font-size: 10px
              font-weight: 200
              line-height: 12px
          .text
            margin-bottom: 8px
            color: rgb(7, 17, 27)
            font-size: 12px
            line-height: 18px
          .recommend
            .icon-thumb_down, .icon-thumb_up
              float: left
              margin-right: 8px
              font-size: 12px
              line-height: 24px
            .icon-thumb_down
              color: rgb(147, 153, 159)
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .recom-text
              float: left
              box-sizing: border-box
              width: 64px
              height: 16px
              padding: 0 6px
              margin: 3px 8px 3px 0
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              background: #fff
              color: rgb(147, 153, 159)
              font-size: 9px
              line-height: 16px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap

</style>
