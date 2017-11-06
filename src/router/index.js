import Vue from 'vue'
import Router from 'vue-router'

/**
 * [异步组件加载函数]
 * @param  {[string]} name [组件名称]
 * @return {[promise]}      [组件]
 */
const asyncComponent = (name) => {
  return resolve => require([`@/view/${name}`], resolve)
}
const List = asyncComponent('List')
const Bought = asyncComponent('Bought')
const User = asyncComponent('User')
const Details = asyncComponent('Details')
const Pay = asyncComponent('Pay')
const Follow = asyncComponent('Follow')
const Guide = asyncComponent('Guide')
const NotFound = asyncComponent('NotFound')

Vue.use(Router)

const router = new Router({
  base: '/xxcard/',
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {path: '/', name: 'App', redirect: '/list'},
    {path: '/list', name: 'List', component: List},
    {path: '/bought', name: 'Bought', component: Bought},
    {path: '/user', name: 'User', component: User},
    {path: '/details', name: 'Details', component: Details},
    {path: '/pay', name: 'Pay', component: Pay},
    {path: '/follow', name: 'Follow', component: Follow},
    {path: '/guide', name: 'Guide', component: Guide},
    {path: '*', name: 'NotFound', component: NotFound}
  ]
})

export default router
