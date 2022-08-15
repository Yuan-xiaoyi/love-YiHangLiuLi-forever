import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: 'ImageGallery',
          name: 'ImageGallery',
          component: function () {
            return import('../components/content/ImageGallery.vue')
          }
        }, {
          path: 'TornadBreakPark',
          name: 'TornadBreakPark',
          component: function () {
            return import('../components/content/TornadBreakPark.vue')
          }
        }, {
          path: 'yibuProblem',
          name: 'yibuProblem',
          component: function () {
            return import('../forStudy/yibuProblem.vue')
          }
        }, {
          path: 'messengerApply',
          name: 'messengerApply',
          component: function () {
            return import('../forStudy/messengerApplyFather.vue')
          }
        }, {
          path: 'Test',
          name: 'Test',
          component: function () {
            return import('../components/content/Test.vue')
          }
        }
      ]
    },
    {
      path: '/messengerApplyChild',
      name: 'messengerApplyChild',
      component: function () {
        return import('../forStudy/messengerApplyChild.vue')
      }
    }

  ]
})
