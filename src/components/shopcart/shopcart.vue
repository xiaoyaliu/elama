<template>
  <div>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>

    <div class="ball-container">

      <transition name="drop"
                  v-for="(ball,index) in balls"
                  v-on:before-enter="beforeEnter"
                  v-on:enter="enter"
                  v-on:after-enter="afterEnter" :key="index">
        <div v-show="ball.show" class="ball">
          <div class="inner innerhook"></div>
        </div>
      </transition>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
    <transition name="fade">
    <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import cartcontrol from './../cartcontrol/cartcontrol'
  export default {
    components: {},
    data:function(){
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls:[],
        fold:true
      }
    },
    props:{
      selectFoods:{
        type:Array,
        default:function(){
          return [{
            price:20,
            count:0
          }
          ];
        }
      },
      deliveryPrice:{
        type:Number,
        default:0
      },
      minPrice:{
        type:Number,
        default:0
      }
    },
    components:{cartcontrol},
    computed:{
      totalPrice:function(){
        let total=0;
        this.selectFoods.forEach((food)=>{
          total+=food.price*food.count;
        })
        return total;
      },
      totalCount:function(){
        let count=0;
        this.selectFoods.forEach((food)=>{
          count+=food.count;
        })
        return count;
      },
      payDesc:function(){
        if(this.totalPrice===0){
          return '￥'+this.minPrice+"元起送"
        }else if(this.totalPrice<this.minPrice){
          let diff=this.minPrice-this.totalPrice;
          return '还差￥'+diff+"元起送";
        }else{
          return '去结算';
        }
      },
      payClass:function(){
        if(this.totalPrice<this.minPrice){
          return 'not-enough'
        }else{
          return 'enough'
        }
      },
      listShow:function(){
        if(!this.totalCount){
          this.fold=true;
            return false
        }
        let show=!this.fold;
        if(show){
          this.$nextTick(()=>{
             if(!this.scroll){
            this.scroll=new BScroll(this.$refs.listContent,{click:true})
             }else{
               this.scroll.refresh();
             }
          })
        }
        return show;
      }
    },
    methods:{
      _drop:function(el){

        for(let i=0;i<this.balls.length;i++){

          let ball=this.balls[i];
          if(!ball.show){
            ball.show=true;
            ball.el=el
            // this.balls[i].show=true;
            //this.$set(this.balls,i,{show:this.balls[i].show})

            //ball.el=el;
            this.dropBalls.push(ball);
            return;
          }
        }


      },

      beforeEnter: function (el) {

        let count=this.balls.length;
        while(count--){

          let ball=this.balls[count];
          if(ball.show){
            let rect=ball.el.getBoundingClientRect();
            let x=rect.left-32;
            let y=-(window.innerHeight-rect.top-22);
            el.style.display='';
            el.style.webkitTransform=`translate3d(0,${y}px,0)`;
            el.style.transform=`translate3d(0,${y}px,0)`;

            let inner=el.getElementsByClassName('innerhook')[0];
            inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
            inner.style.transform=`translate3d(${x}px,0,0)`;
          }

        }

      },
      enter: function (el, done){
        let refresh = el.offsetHeight;
        this.$nextTick(()=>{
          el.style.webkitTransform='translate3d(0,0,0)';
          el.style.transform='translate3d(0,0,0)';
          let inner=el.getElementsByClassName('innerhook')[0];
          inner.style.webkitTransform='translate3d(0,0,0)';
          inner.style.transform='translate3d(0,0,0)';
        });
        console.log(this.balls)
        setTimeout(done,400);
      },
      afterEnter: function (el) {
        let ball=this.dropBalls.shift();
        if(ball){
          ball.show=false;
          el.style.display='none'
        }
        console.log(this.balls)
      },
      toggleList:function(){
        if(!this.totalCount){
          return;
        }
        this.fold=!this.fold;

      },
      hideList:function(){
        this.fold=true;
      },
      pay:function(){
         if(this.totalPrice<this.minPrice){
             return;
         }
        window.alert("支付"+this.totalPrice+'元')
      },
      empty:function(){
        this.selectFoods.forEach((food)=>{
          food.count=0;
        })
      }
    },

  }
</script>
<style lang="scss">
  @import "./../../common/sass/mixin";
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background: #000000;
  .content{
    display: flex;
    background: #141d27;
    font-size: 0;
  .content-left{
    flex: 1;
  .logo-wrapper{
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    box-sizing: border-box;
    width: 56px;
    height: 56px;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background: #2b343c;
  &.highlight{
     background: rgb(0,160,220);
  .icon-shopping_cart{
    color: #fff;
  }
  }
  .icon-shopping_cart{
    font-size: 24px;
    line-height: 44px;
    color: #80858a;
  }
  }
  .num{
    position: absolute;
    top: 0px;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  }
  }
  .price{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    padding-right: 12px;
    border-right: 1px solid rgba(255,255,255,0.1);
    line-height: 24px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 700;
    color: rgba(255,255,255,0.4);
  }
  .desc{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    margin-left: 12px;
    line-height: 24px;
    color: rgba(255,255,255,0.4);
    font-size: 10px;
  }
  }
  .content-right{
    flex: 0 0 105px;
    width: 105px;
  .pay{
    line-height: 48px;
    height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,0.4);
  &.not-enough{
     background: #2b333b;
   }
  &.enough{
     background: #00b43c;
     color: #fff;
   }
  }
  }
  }
  .ball-container{
  .ball{
    position: fixed;
    line-height: 32px;
    left: 22px;
    bottom: 22px;
    z-index: 200;
  &.drop-enter-active{
     transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
      .inner{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0,160,220);
        transition: all 0.4s linear;
      }
  }
  }
  }
  .shopcart-list{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
    transition:all 0.5s;
    &.fold-enter-active,&.fold-leave-active{
                           transform: translate3d(0,-100%,0);

    }
    &.fold-enter,&.fold-leave-to{

                    transform: translate3d(0,0,0);
    }
      .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 8px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .title{
          float: left;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .empty{
          float: right;
          font-size: 12px;
          color: rgb(0,160,220);
        }
      }
      .list-content{
        padding:0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food{
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          @include border-1px(rgba(7,17,27,0.1));
          .name{
            line-height: 24px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
           .price{
             position: absolute;
             right: 90px;
             bottom: 12px;
             line-height: 24px;
             font-size: 14px;
             font-weight: bold;
             color: rgb(240,20,20);
           }
           .cartcontrol-wrapper{
             position: absolute;
             right: 0px;
             bottom: 6px;
           }
        }
      }
  }

  }
  .list-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    background: rgba(7,17,27,0.6);
    transition:all 0.5s;
  &.fade-enter-active,&.fade-leave-active{
                         opacity: 1;
                         background: rgba(7,17,27,0.6);
                       }
  &.fade-enter,&.fade-leave-to{
                  opacity:0;
                  background: rgb(7,17,27);
                }
  }
</style>
