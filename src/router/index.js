import Vue from 'vue'
import Router from 'vue-router'
const Hello = resolve => require(['@/Hello'], resolve);
const goods = resolve => require(['@/goods/goods'], resolve);
const ratings = resolve => require(['@/rating/ratings'], resolve);
const sellers = resolve => require(['@/seller/seller'], resolve);
Vue.use(Router)

export default new Router({
  mode:'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: sellers
    }
  ]
})
