import axios from 'axios'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:3000/';
// 全局设置，发送权限验证的cookie的，以及跨域
axios.defaults.withCredentials = true;

// http request拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截 <=> 异常处理
axios.interceptors.response.use(response => {
  return response;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求');
        break;
      case 401:
        console.log('未授权，请重新登陆');
        break;
      case 403:
        console.log('拒绝访问');
        break;
      case 404:
        console.log('请求错误，未找到该资源');
        break;
      case 405:
        console.log('请求方法未被允许');
        break;
      case 408:
        console.log('请求超时');
        break;
      case 500:
        console.log('服务端出错');
        break;
      case 501:
        console.log('网络未实现');
        break;
      case 502:
        console.log('网络错误');
        break;
      case 503:
        console.log('服务不可用');
        break;
      case 504:
        console.log('网络超时');
        break;
      case 505:
        console.log('http版本不支持该请求');
        break;
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    console.log('连接服务器失败');
  }
  return Promise.reject(err.response);
});

/**
 *  封装get方法
 *  @param url
 *  @param data
 *  @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 *  封装post请求
 *  @param url
 *  @param data
 *  @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 *  封装patch请求
 *  @param url
 *  @param data
 *  @param {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装jsonp请求
 * 有问号就会有查询字符串，直接在后面加&和转化后的字符串
 * 没有问号直接在后面加?和转化后的字符串
 */
export function jsonp(url, options = {}) {
  return new Promise(resolve => {
    /**
     * @params url
     * @param options
     * @returns {Promise}
     *
     * callbackId：随机生成的callbackId
     * container：获取head头
     * scriptNode：创建script节点
     *
     */
    let callbackId = `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`,
      container = document.getElementsByTagName('head')[0],
      scriptNode = document.createElement('script'),
      params = [];
    scriptNode.type = 'text/javascript';
    container.appendChild(scriptNode);
    /**
     *  加上callback参数，服务端接口数据根据callback返回函数
     */
    options['callback'] = callbackId;
    /**
     *  遍历参数,把参数组成数组[name=zhangsan,age:18]
     */
    for (let key in options) {
      params.push(key + '=' + options[key]);
    }
    /**
     *  判断原url是否已经有‘？’，如有给url拼接‘&’，否则拼接‘？’
     */
    url += (/\?/.test(url)) ? '&' : '?';
    url += params.join('&');
    /**
     *  设置script节点id以便后面删除
     */
    scriptNode.id = callbackId;
    scriptNode.src = url;
    /**
     * 定义全局函数，注意函数名是callbackId是跟上面定义的参数data["callback"]=callbackId是一致的
     * 服务端接口是根据客户端传的callback而返回callbackId
     * ({"code":0,"error":"操作成功","data":{}})
     *
     * 当客服端请求接口时即调用了函数callbackId
     * ({"code":0,"error":"操作成功","data":{}})，
     * 刚好是这里我们定义的全局函数，于是就拿到了数据response
     * */
    window[callbackId] = function (response) {
      resolve(response);
      container.removeChild(document.getElementById(callbackId));
    };
  })
}

/**
 *  下面是获取数据的接口
 */
export const server = {
  /** 登陆相关 */
  // 1. 登陆
  login(params) {
    return get('login/cellphone', params)
  },
  // 2.退出登录
  logout(params) {
    return get('logout', params)
  },
  // 3.获取用户详情
  userInfo(params) {
    return get('user/detail', params)
  },
  // 4.登陆状态
  status(params) {
    return get('login/status', params)
  },
  // 轮播图
  banner(params) {
    return get('banner', params)
  },
  // 搜索
  search(params) {
    return get('search', params)
  },
  // 获取音乐url
  getMusicUrl(params) {
    return get('song/url', params)
  },
  /**
   * 发现音乐
   */
  /** 一、个性推荐 */
  // 1.推荐歌单
  personalized(params) {
    return get('personalized', params)
  },
  // 2.推荐mv
  mv(params) {
    return get('personalized/mv', params)
  },
  // 3.独家放送
  privatecontent(params) {
    return get('personalized/privatecontent', params)
  },
  /** 二、歌单 */
  // 1.歌单分类
  catlist(params) {
    return get('playlist/catlist', params);
  },
  // 2.热门歌单分类
  hot(params) {
    return get('playlist/hot', params)
  },
  // 3.歌单获取
  getPlaylist(params) {
    return get('top/playlist', params)
  },
  /** 三、主播电台 */
  // 1.电台分类
  classification(params) {
    return get('dj/catelist', params)
  },
  // 2.付费精选
  pay(params) {
    return get('dj/paygift', params)
  },
  // 3.推荐
  recommend(params) {
    return get('dj/recommend', params)
  },
  // 4.分类详情
  recommendType(params) {
    return get('dj/recommend/type', params)
  },
  /** 四、排行榜 */
  makeList(params) {
    return get('toplist', params)
  },
  /** 五、最新音乐 */
  // 1.新歌速递
  newCourier(params) {
    return get('top/song', params)
  },
  // 2.新碟上架
  newDisc(params) {
    return get('top/album', params)
  },
  /**
   * 私人FM
   */
  fm(params) {
    return get('personal_fm', params)
  },
  // 2.获取歌词
  lyric(params) {
    return get('lyric', params)
  },
  /** 喜欢音乐列表 */
  // 1. 获取用户歌单
  user_playlist(params) {
    return get('user/playlist', params)
  },
  // 2. 获取喜欢的音乐列表
  like(params) {
    return get('likelist', params)
  },
  // 3. 获取歌曲详情
  song_detail(params) {
    return get('song/detail', params)
  },
  // 4. 喜欢音乐
  like_music(params) {
    return get('like', params)
  },
  /** 我的云盘 */
  my_cloud(params) {
    return get('user/cloud', params)
  }
};