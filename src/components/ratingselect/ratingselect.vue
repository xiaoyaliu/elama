<template>
    <div class="ratingselect">
        <div class="rating-type">
          <span class="block positive" @click="select(2,$event)" :class="{'current':mySelectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
          <span class="block positive" @click="select(0,$event)" :class="{'current':mySelectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
          <span class="block negative" @click="select(1,$event)" :class="{'current':mySelectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
      <div class="switch" @click="toggleContent">
        <span class="icon-check_circle" :class="{'onlyContent':onlyContent}"></span>
        <span class="text" :class="{'onlyContent':onlyContent}">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE=0;
  const NEGATIVE=1;
  const ALL=2;
    export default {
        name: 'ratingselect',
        props:{
          ratings:{
            type:Array,
            default:function(){
               return [];
            }
          },
          selectType:{
            type:Number,
            default:ALL
          },
          onlyContent:{
            type:Boolean,
            default:false
          },
          desc:{
            type:Object
          }

        },
      data:function(){
        return {
          myOnlyContent:this.onlyContent,
          mySelectType:this.selectType
        }
      },
      computed:{
        positives:function (){
           return this.ratings.filter((rating)=>{
             return rating.rateType===POSITIVE;
           })
       },
        negatives:function (){
          return this.ratings.filter((rating)=>{
            return rating.rateType===NEGATIVE;
          })
        }
      },
      methods:{
        select:function(type,event){
          console.log(this.ratings)
             if(!event._constructed){
               return;
             }

             this.mySelectType=type;
          this.$emit('increment', 'selectType', type)
           },
        toggleContent:function(event){
          if(!event._constructed){
            return;
          }
          this.myOnlyContent=!this.myOnlyContent;
          this.$emit('increment', 'onlyContent', this.myOnlyContent);
        }
      }
    }
</script>
<style lang="scss">
  @import "./../../common/sass/mixin";
  .ratingselect{
    .rating-type{
      padding: 18px 0;
      margin: 0 18px;
      @include border-1px(rgba(7,17,27,0.1));
      font-size: 0;
      .block{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77,85,93);
         font-size:12px;
      &.current{
          color:#fff;
       }
      .count{
        margin-left: 2px;
        line-height: 16px;
        font-size: 8px;
      }
       &.positive{
          background: rgba(0,160,220,0.2);
          &.current{
             background: rgb(0,160,220);
           }
        }
        &.negative{
          background: rgba(77,85,93,0.2);
          &.current{
              background: rgb(77,85,93);
           }
         }
      }
    }
  .switch{
  font-size:0;
  padding: 18px 0;
    .icon-check_circle{
      font-size: 20px;
      line-height: 20px;
      color:rgb(149,153,157);
      vertical-align: top;
      margin-left:18px;
      &.onlyContent{
         color:rgb(0,160,220);
       }
    }
  .text{
    vertical-align: top;
    line-height: 20px;
    font-size: 14px;
    color:rgb(149,153,157);
  &.onlyContent{
     color:rgb(0,160,220);
   }
  }
  }
  }
</style>
