<template>
    <div class="seller" ref="rating">
      <div class="seller-content" >
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc">
            <star class="star" :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>

              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>

              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>

              </div>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="info-wrapper">
          <h2>公告与活动</h2>
          <p class="bulletin">{{seller.bulletin}}</p>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="phone-wrapper">
          <h2>商家实景</h2>
          <div class="scroll-img" ref="img">
          <ul class="img" :style="{width:picWidth+'px'}">
            <li v-for="img in seller.pics">
            <img :src="img">
            </li>
          </ul>
          </div>
        </div>
        <split></split>
        <div class="seller-message">
          <h2>商家信息</h2>
          <ul>
            <li class="item" v-for="item in seller.infos">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from './../star/star';
  import split from './../split/split';
    export default {
        name: 'app',
        components: {star,split},
      data:function(){
        return {
          classMap:[]
        }
      },
        computed:{
          seller:function(){
            console.log(this.$store.state.seller.score)
            return this.$store.state.seller;
          },
          picWidth:function(){
            return 120*this.$store.state.seller.pics.length;
          }
        },
      created: function () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      },
      mounted:function(){
        if(!this.scroll){
        this.scroll=new BScroll(this.$refs.rating,{});
        }
        if(this.$store.state.seller.pics.length>1&&!this.imgScroll){
          this.imgScroll=new BScroll(this.$refs.img,{scrollX:true});
        }
      }
    }
</script>
<style lang="scss">
  @import "./../../common/sass/mixin";
  .seller{
    position: absolute;
    top: 156px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  .seller-content{
    padding-bottom: 50px;;
  }
  .overview{
    padding: 18px;
    .title{
      font-size: 14px;
      line-height: 14px;
      color: rgb(7,17,27);
    }
    .desc{
      font-size:0;
      margin-top:8px;
      .star{
        display: inline-block;
        vertical-align: top;
        height: 18px;
      }
      .text{
        font-size: 10px;
        height: 18px;
        line-height: 18px;
        vertical-align: top;
        margin: 0 4px 0 8px;
        color: rgb(77,85,93);
      }
    }
  .remark{
    border-top: 1px solid rgba(7,17,27,0.1);
    margin-top: 10px;
    padding-top: 18px;
    width: 100%;
    display:flex;
    li{
      display: table-cell;
      flex: 1;
      text-align: center;
      border-right:1px solid rgba(7,17,27,0.1);
      &:last-child{
         border: none;
       }
         h2{
           font-size: 10px;
           line-height: 10px;
           color: rgb(147,153,159);
         }
         .content{
         text-align:center;
         margin-top:4px;
         font-size: 0;
           .stress{
             font-size: 24px;
             font-weight: 200;
             line-height:24px;

             &:after{
               content: "元";
               font-size: 10px;
               line-height: 10px;
               color: rgb(7,17,27);
             }
           }
         }
    }
  }

  }
  .info-wrapper{
  margin:18px 18px 0 18px;
  h2{
    font-size: 14px;
    line-height: 14px;
    color: rgb(7,17,27);
  }
  .bulletin{
    margin-top: 8px;
    font-size: 12px;
    font-weight: 200;
    line-height:24px;
    color:rgb(240,20,20)
  }
  .supports{
  margin-top:16px;
      li{
        padding: 16px 12px;
        border-top: 1px solid rgba(7,17,27,0.1);
        flex: 1;
  .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    &.decrease {
     @include bg-image('decrease_2');
     }

    &.discount {
     @include bg-image('discount_2');
     }

    &.invoice {
     @include bg-image('invoice_2');
     }

    &.special {
     @include bg-image('special_2');
     }

    &.guarantee {
     @include bg-image('guarantee_2');
     }
    }
        .text{
          font-size: 12px;
          font-weight: 200;
          color: rgb(7,17,27);
          line-height: 16px;
        }
      }
  }
  }
  .phone-wrapper{
    margin:18px;
    h2{
      font-size: 14px;
      line-height: 14px;
      color: rgb(7,17,27);
    }
  .scroll-img{
    position:relative;
    overflow: hidden;
    white-space:nowrap;
    height:90px;
    width:100%;
    .img{
        margin-top:12px;
        li{
          float: left;
          margin-right:6px;
          width: 120px;
          height:90px;
          img{
            width: 120px;
            height:90px;
            display: inline-block;
          }
        }
    }
  }
  }
  .seller-message{
    margin:18px;
    h2{
      font-size: 14px;
      line-height: 14px;
      color: rgb(7,17,27);
    }
    ul{
       margin-top:12px;
      li{
        padding: 16px 12px;
        border-top: 1px solid rgba(7,17,27,0.1);
        font-size: 12px;
        font-weight: 200;
        color:rgb(7,17,27);
        line-height: 16px;
      }
    }

  }
  }
</style>
