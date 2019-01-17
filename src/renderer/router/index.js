import Vue from 'vue'
import Router from 'vue-router'
// app组件容器渲染
import top from '../views/Top'
import bottom from '../views/Bottom'
import home from '../views/Home'
import left from '../views/TabLeft'

// home组件容器渲染
// 登陆组件容器
import login from '../views/Home/Login';

import SearchLists from '../views/Home/SearchLists'
import FindMusic from '../views/Home/FindMusic'
import PersonalFm from '../views/Home/PersonalFm'
import collection from '../views/Home/Collection'
import cloudPlate from '../views/Home/CloudPlate'
import LoveMusic from '../views/Home/LoveMusic'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    components: {
      default: home,
      top,
      bottom,
      left
    },
    children: [{
        path: 'searchLists',
        name: 'searchLists',
        components: {
          default: SearchLists
        }
      },
      {
        path: 'login',
        name: 'login',
        components: {
          login
        }
      },
      {
        path: '',
        name: 'findMusic',
        components: {
          default: FindMusic
        }
      }, {
        path: 'personalFm',
        name: 'personalFm',
        meta: {
          auth: true
        },
        components: {
          default: PersonalFm
        }
      }, {
        path: 'collection',
        name: 'collection',
        meta: {
          auth: true
        },
        components: {
          default: collection
        }
      }, {
        path: 'cloudPlate',
        name: 'cloudPlate',
        meta: {
          auth: true
        },
        components: {
          default: cloudPlate
        }
      }, {
        path: 'loveMusic',
        name: 'loveMusic',
        meta: {
          auth: true
        },
        components: {
          default: LoveMusic
        }
      }
    ]
  }]
})