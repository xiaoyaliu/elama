<template>
  <div>
    <div class="goods">
       <div class="menu-wrapper" ref="menu">
         <ul>
           <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex==index}"
               @click="selectMenu(index,$event)">
              <span class="text border-1px">
                   <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>
                 {{item.name}}
              </span>
           </li>
         </ul>
       </div>
       <div class="foods-wrapper"  ref="food">
        <ul>
          <li v-for="(item,index) in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food,index) in item.foods" class="food-item border-1px"  @click="selectFood(food,$event)">
                <div class="icon">
                  <img width="58px" height="58px" :src="food.icon" alt=""/>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>

                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @cart-add="addAnimate"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
       <shopcart ref="shopcart"  :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" @addAnimate="addAnimate" ref="selectedFood"></food>
  </div>
</template>

<script type="text/ecmascript-6">
   import BScroll from "better-scroll";
   import shopcart from './../shopcart/shopcart';
   import cartcontrol from './../cartcontrol/cartcontrol';
   import food from './../food/food'
    export default {
      data:function(){
         return {
             listHeight:[],
              scrollY:0,
              currenttarget:"",
              selectedFood:{}
         }
      },
      components: {shopcart,cartcontrol,food},
      computed:{
        goods:function(){
          return this.$store.state.goods;
        },
        seller:function(){
          return this.$store.state.seller;
        },
        currentIndex:function(){
          for(let i=0;i<this.listHeight.length;i++){
            let height1=this.listHeight[i];
            let height2=this.listHeight[i+1];

            if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
              return i;
            }
          }
          return 0;
        },
        selectFoods:function(){
          let foods=[];
          this.goods.forEach((good)=>{
            good.foods.forEach((food)=>{
              if(food.count){
                foods.push(food)
              }
            })
          })
          return foods;
        }
     },
      created:function(){
          this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      },
      mounted:function(){
        this._initScroll();
        this._calculateHeight();
        this.foodScroll.on('scroll',(pos)=>{

          this.scrollY=Math.round(pos.y)<0?Math.abs(Math.round(pos.y)):0;
        })
        this.$on("cart-add",function(){
            console.log("3333333")
        })
      },
      methods:{
        selectFood:function(food,event){
          this.selectedFood=food;
          this.$refs.selectedFood.show();
        },
        selectMenu:function(index,event){
          if(!event._constructed){
            return;
          }
          let foodList=this.$refs.food.getElementsByClassName("food-list-hook");
          let el=foodList[index];
          this.foodScroll.scrollToElement(el,300)
        },
        _initScroll:function(){
          this.menuScroll=new BScroll(this.$refs.menu,{click:true});
          this.foodScroll=new BScroll(this.$refs.food,{click:true,probeType:3});
        },
        _calculateHeight:function(){
          let foodList=this.$refs.food.getElementsByClassName("food-list-hook");
          let height=0;
          this.listHeight.push(height);
          for(let i=0;i<foodList.length;i++){
            let item=foodList[i];
            height+=item.clientHeight+12;

            this.listHeight.push(height)
          }
        },
        addAnimate:function(target){
          console.log(222)
          this.$nextTick(()=>{
            this.$refs.shopcart._drop(target)
          })

        }
      }
    }
</script>
<style lang="scss">
  @import "./../../common/sass/mixin";
 .goods {
   display: flex;
   position: absolute;
   top: 174px;
   width: 100%;
   bottom: 46px;
   overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width : 80px;
    background : #f3f5f7;
    .menu-item {
      display: table;
      width: 56px;
      height: 54px;
      line-height: 14px;
      padding:0 12px;
    &.current{
       position: relative;
        margin-top: -1px;
        z-index: 10;
        background: rgb(255,255,255);
        font-weight: 700;
        .text{
          @include border-none()
        }
     }
  .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  &.decrease{
   @include bg-image('decrease_1');
   }
  &.discount{
   @include bg-image('discount_1');
   }
  &.invoice{
   @include bg-image('invoice_1');
   }
  &.special{
   @include bg-image('special_1');
   }
  &.guarantee{
   @include bg-image('guarantee_1');
   }
  }
    }

  .text{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
   @include border-1px(rgba(7,17,27,0.1));
    font-size: 12px;
  }
  }
   .foods-wrapper{
       flex: 1;
       .title{
         padding-left: 14px;
         height: 26px;
         line-height: 26px;
         border-left: 2px solid #d9dde1;
         font-size: 12px;
         color: rgb(147,153,159);
         background: #f3f5f7;
       }
       .food-item{
         display:flex;
         margin: 12px;
         padding-bottom: 12px;
         @include border-1px(rgba(7,17,27,0.1));
        &:last-child{
         @include border-none();
         }
         .icon{
           width: 57px;
           margin-right: 10px;
         }
         .content{
           flex: 1;
           .name{
              margin: 2px 0 8px;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              color: rgb(7,17,27);
           }
           .desc,.extra{
             line-height: 12px;
             font-size: 10px;
             color: rgb(147,153,159);
           }
           .desc{
             margin-bottom: 8px;
           }
           .extra{
             .count{
               margin-right: 2px;
             }
           }
           .price{
             font-weight: 700;
             line-height: 24px;
              .now{
                margin-right: 8px;
                font-size: 14px;
                color: rgb(240,20,20);
              }
              .old{
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(147,153,159);
              }
           }
            .cartcontrol-wrapper{
              position: absolute;
              right: 0;
              bottom: 8px;
            }
         }
       }

   }
 }

</style>
