<template>
  <div>
    <v-header :seller="seller">

    </v-header>

    <div class="tab">
      <div class="tab-item">
        <router-link activeClass="current" to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link activeClass="current" to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link activeClass="current" to="/sellers">商家</router-link>
      </div>
    </div>
    <router-view>
    </router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/header/header.vue';

  export default {
    name: "main",
    data:function(){
        return {
        }
    },
    components: {
      'v-header':header
    },
    computed:{
      seller:function(){
        return this.$store.state.seller;
      }
    },
    created:function(){
      this.$store.dispatch("getData")
    }
  }

</script>


