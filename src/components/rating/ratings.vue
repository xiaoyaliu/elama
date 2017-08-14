<template>
    <div class="ratings" ref="rating">
      <div>
       <div class="ratings-content">
            <div class="overview">
              <div class="overview-left">
                <h1 class="score">{{seller.score}}</h1>
                <div class="title">综合评分</div>
                <div class="rank">
                  高于周边商家{{seller.rankRate}}%
                </div>
              </div>
              <div class="overview-right">
                <div class="score-wrapper">
                  <span class="title">服务态度</span>
                  <star :size="36" :score="seller.serviceScore"></star>
                </div>
                <div class="score-wrapper">
                  <span class="title">商品评分</span>
                  <star :size="36" :score="seller.foodScore"></star>
                </div>
                <div class="score-wrapper">
                  <span class="title">送达时间</span>
                  <span class="time">{{seller.deliveryTime}}分钟</span>
                </div>
              </div>
            </div>
       </div>
      <split></split>
      <ratingselect
        :selectType="selectType"
        :onlyContent="onlyContent"
        :desc="desc"
        :ratings="ratings"
        @increment="incrementTotal"
        ></ratingselect>
        <div class="ratings-wrapper">
          <ul>
            <li v-for="(rating,index) in ratings" :key="index" v-show="needShow(rating.rateType,rating.text)">
              <img :src="rating.avatar" class="left">
              <div class="right">
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <span class="name">{{rating.username}}</span>
                <div class="star-wrapper">
                  <div class="star"><star :size="24" :score="rating.score"></star></div>
                  <span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <div v-if="rating.text" class="content">{{rating.text}}</div>
                <div class="other">

                  <span class="icon-thumb icon-thumb_up" v-if="rating.rateType===0"></span>
                  <span class="icon-thumb icon-thumb_down" v-if="rating.rateType===1"></span>
                  <div class="rating-food">
                    <span  v-if="rating.recommend.length>0" class="food-item" v-for="item in rating.recommend">{{item}}</span>
                  </div>

                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE=0;
  const NEGATIVE=1;
  const ALL=2;
  import BScroll from 'better-scroll';
   import star from './../star/star';
   import split from './../split/split';
   import ratingselect from './../ratingselect/ratingselect';
   import {formatDate} from './../../common/js/date'
    export default {
        name: 'app',
        components: {star,split,ratingselect},
        data:function(){
          return{
            selectType:NEGATIVE,
            onlyContent:true,
            desc:{
              all:'全部',
              positive:'推荐',
              negative:'吐槽'
            }
          }
        },
        computed:{
          ratings:function(){
            return this.$store.state.ratings;
          },
          seller:function(){
            return this.$store.state.seller;
          }
        },
      filters:{
        formatDate:function(time){
          let date=new Date(time);
          return formatDate(date,'yyyy-MM-dd hh:mm' )
        }
      },
      methods:{
        incrementTotal:function(type, data) {
          this[type] = data;
          this.$nextTick(() => {
            this.ratingScroll.refresh();
          });
        },
        needShow:function(type,text){
          console.log(111)
          if(this.onlyContent&&!text){
            return false;
          }
          if(this.selectType===ALL){
            return true;
          }else{
            return type===this.selectType
          }
        }
      },
      mounted:function(){
        console.log(222)
        this.ratingScroll=new BScroll(this.$refs.rating,{click:true})
      }
    }
</script>
<style lang="scss">
  .ratings{
    position: absolute;
    top: 156px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      display: flex;
       padding:18px 0;

      .overview-left{
        flex: 0 0 137px;
        width: 137px;
        text-align: center;
        border-right: 1px solid rgba(7,17,27,0.1);
        padding:6px 0;
  @media screen and (max-width: 320px){
    flex: 0 0 120px;
    width: 120px;
  }
        .score{
          line-height: 28px;
          font-size: 24px;
          color: rgb(255,163,0);
          margin-bottom: 6px;
        }
        .title{
          font-size: 12px;
          line-height: 12px;
          color: rgb(7,17,27);
          margin-bottom: 8px;
        }
        .rank{
          line-height: 10px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
      }
      .overview-right{
        flex: 1;
        padding:6px 0 6px 24px;
      @media screen and (max-width: 320px){
        padding:6px 0 6px 6px;
      }
        .score-wrapper{
          margin-bottom: 8px;

          font-size: 0;
          .title{
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7,17,27);
          }
          .star{
            display: inline-block;
            vertical-align: top;
            margin-left: 12px;
          }
          .time{
            display: inline-block;
            vertical-align: top;
            margin-left: 12px;
            color: rgb(147,153,159);
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }
  .ratings-wrapper{
    li{
      display: flex;
      padding: 18px;
      border-top: 1px solid Rgba(7,17,27,0.1);
      .left{
        width: 28px;
        height: 28px;
        vertical-align: top;
        border-radius: 14px;
        flex: 0 0 28px;
      }
      .right{
        flex: 1;
        margin-left: 12px;
       position:relative;
      .time{
        font-size: 10px;
        color: rgb(147,153,159);
        font-weight: 200;
        line-height: 12px;
        position: absolute;
        right: 0px;
        top: 4px;
      }
        .name{
          font-size: 10px;
          color: rgb(7,17,27);
          line-height: 12px;
        }
        .star-wrapper{
          font-size:0;
          margin-top:4px;
          .star{
            display: inline-block;
            vertical-align: top;
          }
          .delivery-time{
            display: inline-block;
            font-size: 10px;
            font-weight: 200;
            color: rgb(147,153,159);
            line-height: 12px;
            vertical-align: top;
            margin-left: 6px;
          }
        }
      .content{
        display: inline-block;
        font-size: 12px;
        color: rgb(7,17,27);
        line-height: 18px;
        margin-top: 6px;
      }
      .other{
          font-size:0;
          display:flex;
      margin-top:6px;
          .icon-thumb {
            margin-right: 4px;
            font-size: 12px;
            line-height: 16px;
            flex: 0 0 12px;
            width: 12px;
          }
          .rating-food{
            display: inline-block;
             flex:1;
             margin-left:6px;
            .food-item{
              margin-right: 8px;
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              color: rgb(0,160,220);
              height: 16px;
              line-height: 16px;
              border: 1px solid rgba(7,17,27,0.1);
              background: #fff;
              padding: 0 6px;
              max-width: 70px;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 6px;
            }
          }

      }

      }
    }
  }
  }



</style>
