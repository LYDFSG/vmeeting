import Vue from 'vue'
import Router from 'vue-router'
const Login = r => require.ensure([], () => r(require('@/views/login/Login.vue')))
const bindRoom = r => require.ensure([], () => r(require('@/views/bindRoom/bindRoom.vue')))
const currentMeeting = r => require.ensure([], () => r(require('@/views/currentMeeting/currentMeeting.vue')))
const isAdministrator = r => require.ensure([], () => r(require('@/views/isAdministrator/isAdministrator.vue')))
const setting = r => require.ensure([], () => r(require('@/views/setting/setting.vue')))
const Index = r => require.ensure([], () => r(require('@/views/Index.vue')))


Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router) 

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '',
      children: [
        {
          path: '',
          component:currentMeeting
        }
      ]
    },
    {
      path: '/bindRoom',
      component: bindRoom
    },
    {
      path: '/login',
      component:  Login
    },
    {
      path: '/isAdministrator',
      component: isAdministrator
    },
    {
      path: '/setting',
      component: setting
    }
  ]
})
