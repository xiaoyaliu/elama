<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt=""/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}
        </div>
        <div v-if="seller.supports" class="support">
              <span class="icon" :class="classMap[seller.supports[1].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>

        </div>
      </div>
      <div class="support-count" v-if="seller.supports"  @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper"   @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <transition name="fade">
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from './../star/star.vue'
  export default {
    name: 'header',
    components: {star},
    data:function(){
        return{
        detailShow:false
        }
    },
    computed: {
      seller: function () {
        return this.$store.state.seller
      }
    },
    created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods:{
      showDetail:function(){
        this.detailShow=true
      },
      hideDetail:function(){
        this.detailShow=false
      }
    }
  }
</script>
<style lang="scss">
  @import "./../../common/sass/mixin";

  .header{
    color: #fff;
    background-color: rgba(7,17,27,0.5);
    overflow: hidden;
      .content-wrapper {
        padding: 12px 12px 12px 12px;
        font-size: 0;
        position: relative;

  .avatar {
    display: inline-block;
    vertical-align: top;

  img {
    border-radius: 2px;
  }

  }
  .content {
    display: inline-block;
    font-size: 14px;
    margin-left: 16px;
  .description {
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .title {
    margin: 2px 0 8px 0;
  }
  .support .text {
    vertical-align: top;
    font-size: 10px;
    line-height: 12px;
  }
  .brand {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
  @include bg-image('brand') background-repeat : no-repeat;
    background-size: 30px 18px;

  .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }

  }



  }
  .support-count {
    position: absolute;
    right: 12px;
    bottom: 12px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;

  .count {
    vertical-align: top;
    font-size: 10px;
  }

  .icon-keyboard_arrow_right {
    margin-left: 2px;
    font-size: 10px;
    line-height: 24px;
    color: red;
  }

  }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);

  span.bulletin-title {
    display: inline-block;
    width: 22px;
    height: 12px;
  @include bg-image('bulletin');
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }

  .bulletin-text {
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
  }

  .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 8px;
  }

  }
  .detail {
    position: fixed;
    background: rgba(7, 17, 27, 0.8);
    opacity: 1;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    top: 0;
    left: 0;
    transition: all .5s;

  .detail-wrapper {
    width: 100%;
    min-height: 100%;

  .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;

  .name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }

  .star-wrapper {
    margin-top: 18px;
    padding: 2px;
    text-align: center;


  }
  .title {
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;

  .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .text {
    padding: 0 12px;
    font-size: 12px;
    font-weight: bold;
  }

  }
  .supports {
    width: 80%;
    margin: 0 auto;

  .support-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;

  &:last-child {
    margin-bottom: 0;
  }

  .icon {
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
  .text {
    line-height: 16px;
    font-size: 12px;
  }

  }
  }
  .bulletin {
    width: 80%;
    margin: 0 auto;

  .content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }

  }
  }
  }
  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }

  }
  .fade-enter-active, .fade-leave-active {
    transition: all 1.3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }


  }
</style>
