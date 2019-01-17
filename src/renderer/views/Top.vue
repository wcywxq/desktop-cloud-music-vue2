<template>
  <div id="top">
    <el-row>
      <el-col :span="4">
        <aside class="logo-box">
          <img src="../assets/images/header-wyy.png" alt>
          网易云音乐
        </aside>
      </el-col>
      <el-col :span="8">
        <aside class="search-box">
          <i class="el-icon-arrow-left nav" @click="$router.go(-1)"></i>
          <i class="el-icon-arrow-right nav" @click="$router.go(1)"></i>
          <div class="input-box">
            <el-input
              placeholder="搜索音乐，视频，歌词，电台"
              suffix-icon="el-icon-search"
              clearable
              size="mini"
              v-model="search"
              @keyup.enter.native="searchReq"
            ></el-input>
          </div>
        </aside>
      </el-col>
      <el-col :span="12">
        <section class="controls-box">
          <aside class="controls-box-left">
            <div class="contorls-login" @click="loginBtn">
              <img
                :src="$store.state.loginMessage.status == 0 ? $store.state.loginMessage.img :  $store.state.loginMessage.data.avatarUrl"
              >
              <span>{{ $store.state.loginMessage.status == 0 ? '未登录' : $store.state.loginMessage.data.nickname }}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <i class="el-icon-goods"></i>
            <i class="el-icon-message"></i>
            <i class="el-icon-setting"></i>
          </aside>
          <span class="hr-line">|</span>
          <aside class="controls-box-right">
            <i class="el-icon-minus" @click="min"></i>
            <i class="el-icon-plus" @click="max"></i>
            <i class="el-icon-close" @click="close"></i>
          </aside>
        </section>
      </el-col>
    </el-row>
    <aside class="landed" v-show="Landed">
      <!--{{ $store.state.loginMessage.data }}-->
      <header>
        <img :src="$store.state.loginMessage.data.avatarUrl" alt>
        <span>{{ $store.state.loginMessage.data.nickname }}</span>
      </header>

      <section class="content">
        <aside class="content-item">
          <span>等级</span>
          <span class="level">LV.{{ userInfoData ? userInfoData.level : ''}}</span>
        </aside>
        <aside class="content-item">
          <span>听过的音乐</span>
          <span>共{{ userInfoData ? userInfoData.listenSongs : ''}}首</span>
        </aside>
        <aside class="content-item">
          <span>创建时长</span>
          <span>{{ userInfoData ? userInfoData.createDays : ''}}天</span>
        </aside>
        <el-button size="small" @click="back" style="width: 100%">
          <div class="btn-text">
            <i class="iconfont icon-tuichu"></i>
            <span>退出登录</span>
          </div>
        </el-button>
      </section>
    </aside>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "top",
  data() {
    return {
      search: "",
      // 已登陆时控制信息面板的展示和隐藏
      Landed: false,
      userInfoData: null
    };
  },
  methods: {
    searchVal(curVal, oldVal) {
      return curVal;
    },
    // 搜索
    searchReq() {
      this.$store.commit("searchValue", this.search);
      this.$router.push({
        path: "/searchLists",
        query: {
          text: this.$store.state.searchVal
        }
      });
    },
    // 获取用户详情
    userInfo() {
      this.$server
        .userInfo({
          uid: this.$store.state.loginMessage.data.userId
        })
        .then(res => {
          this.userInfoData = res;
        });
    },
    // 跳转登录页面
    loginBtn() {
      if (this.$store.state.loginMessage.status == 0) {
        this.$router.push("/login");
      } else {
        this.Landed = !this.Landed;
      }
    },
    // 退出登录
    async back() {
      // /logout
      const res = await this.$server.logout();
      if (res.code == 200) {
        localStorage.clear();
        this.$store.commit("loginMessage", {
          status: 0,
          img: `${require("../assets/images/logo.jpg")}`,
          data: []
        });
        this.Landed = false;
        // 重新加载当前路由
        this.$router.push({ path: "/" });
      }
    },
    /** 放大缩小关闭 */
    min() {
      ipcRenderer.send("min");
    },
    max() {
      ipcRenderer.send("max");
    },
    close() {
      ipcRenderer.send("close");
    }
  },
  computed: {
    status() {
      return this.$store.state.loginMessage.status;
    }
  },
  watch: {
    search: "searchVal",
    status(curVal, oldVal) {
      if (curVal == 1) {
        // 已登陆
        this.userInfo();
      }
    }
  }
};
</script>

<style scoped lang="scss">
#top {
  position: relative;
  background-color: rgb(198, 47, 47);
  color: #fff;
  .el-row {
    display: flex;
    align-items: center;
    height: 40px;
    .logo-box {
      display: flex;
      align-items: center;
      margin-left: 20px;
      img {
        margin-right: 10px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
    }
    .search-box {
      display: flex;
      align-items: center;
      .nav {
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
      .input-box {
        margin-left: 15px;
        width: 100%;
      }
    }
    .controls-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      &-left {
        display: flex;
        align-items: center;
        .contorls-login {
          &:hover {
            cursor: pointer;
          }
          img {
            border-radius: 50%;
            width: 20px;
            height: 20px;
          }
          span {
            font-size: 12px;
          }
          i {
            opacity: 0.6;
            font-size: 10px;
            margin: 0;
            cursor: pointer;
            &:hover {
              opacity: 1;
              color: #fff;
            }
          }
        }
        i {
          opacity: 0.6;
          margin: 0 10px;
          cursor: pointer;
          &:hover {
            opacity: 1;
            color: #fff;
          }
        }
      }
      .hr-line {
        color: rgba(0, 0, 0, 0.8);
        margin-right: 10px;
      }
      &-right {
        margin-right: 20px;
        i {
          opacity: 0.6;
          margin: 0 5px;
          cursor: pointer;
          &:hover {
            opacity: 1;
            color: #fff;
          }
        }
      }
    }
  }

  .landed {
    position: absolute;
    z-index: 3;
    top: 40px;
    right: 130px;
    padding: 10px;
    width: 260px;
    background-color: rgb(250, 250, 250);
    color: #000;
    border-radius: 10px;
    box-shadow: 0 0 15px rgb(91, 91, 91);
    header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      span {
        margin-left: 10px;
        font-size: 14px;
      }
    }
    .content {
      &-item {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          margin: 0 10px;
          &:first-child {
            font-size: 12px;
            font-weight: bold;
          }
          &:last-child {
            font-size: 15px;
            font-weight: bold;
            &.level {
              font-style: italic;
            }
          }
        }
      }
    }
  }

  .btn-text {
    display: flex;
    align-items: center;
    i {
      margin-right: 10px;
      font-size: 18px;
    }
  }
}
</style>