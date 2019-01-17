import Vue from 'vue'
import Vuex from 'vuex'

import {
  createPersistedState,
  createSharedMutations
} from 'vuex-electron'

import modules from './modules'
import {
  stat
} from 'fs';

Vue.use(Vuex);

const state = {
  searchVal: '',
  musicMsg: [],
  isPlaying: false,
  cataName: '全部歌单',
  loginMessage: {
    status: 0, // 0：未登陆 1：已登陆
    img: `${require('../assets/images/logo.jpg')}`, // 头像
    // 登陆数据的存储
    data: []
  }
};

const mutations = {
  // 搜索
  searchValue(state, searchVal) {
    state.searchVal = searchVal;
  },
  // 音乐信息
  musicDetail(state, data) {
    state.musicMsg = data;
  },
  // 是否播放
  isPlaying(state, isPlaying) {
    state.isPlaying = isPlaying;
  },
  // 存储分类
  cataChange(state, cataName) {
    state.cataName = cataName;
  },
  // 登陆信息存储
  loginMessage(state, loginMessage) {
    state.loginMessage = loginMessage
  }
};

const actions = {
  searchValue({
    commit
  }, args) {
    commit('searchValue', args)
  },
  musicDetail({
    commit
  }, data) {
    commit('musicDetail', data)
  },
  isPlaying({
    commit
  }, bool) {
    commit('isPlaying', bool)
  },
  // 登陆信息存储
  loginMessage({
    commit
  }, data) {
    commit('loginMessage', data)
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  // plugins: [
  //     createPersistedState(),
  //     createSharedMutations()
  // ],
  strict: process.env.NODE_ENV !== 'production'
})