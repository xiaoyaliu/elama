<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0"
             @click.stop.prevent="decreaseCart($event)">
          <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
         <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props:{
        food:{
          type:Object
        }
      },
      created:function() {
      },
      methods:{
        addCart:function(event){
          console.log(this.food)
          if(!event._constructed){
            return;
          }
          if(!this.food.count){
            this.$set(this.food,'count',1)
          }else{
            this.food.count=this.food.count+1;
          }
          this.$emit("cart-add",event.target)
        },
        decreaseCart:function(){
          if(!event._constructed){
            return;
          }
          if(this.food.count>0){
            this.food.count=this.food.count-1;
          }
        }
      }
    }
</script>
<style lang="scss">
.cartcontrol{
   font-size:0;
  .cart-decrease,.cart-add{
    display: inline-block;
    padding: 6px;
  }
  .cart-decrease{
      transition:all 0.4s linear;
      .inner{
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0,160,220);
        transition:all 0.4s linear;
      }
       &.move-enter-active, &.move-leave-active {
          opacity: 1;
          transform: translate3d(0,0,0);
          .inner{
            transform: rotate(0);
          }
      }
      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translate3d(24px,0,0);
         .inner{
           transform: rotate(180deg);
         }
      }
  }
  .cart-add{
    font-size: 24px;
    line-height: 24px;
    color: rgb(0,160,220);
  }
  .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 16px;
    text-align: center;
    padding-top: 6px;
    line-height: 24px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
}
</style>
