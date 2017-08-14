/**
 * Created by liuxiaoya；
 *date 2017/7/31 0031.
 *description
 */
import Vue from 'vue';
import Vuex from 'vuex'
import Axios from 'axios'
import qs from 'qs'
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
     seller:{},
    ratings:{},
    goods:{},
  },
  getters:{

  },
  mutations:{
    setData(state,payload){
      state.seller=payload.seller;
      state.ratings=payload.ratings;
      state.goods=payload.goods;
    }
  },
  actions:{
    getData(context,payload){
       Axios.get("/api/getData").then((res)=>{
         context.commit('setData',res.data)
       }).catch(function(error){
              console.log(error)
       })

    }
  }

})
