<template>
  <div id="Login">
    <section class="noLogin">
      <img class="mobile" src="../../assets/images/mobile.png" alt>
      <span class="close" @click="close">×</span>
      <!--<h1>登陆</h1>-->
      <aside class="account">
        <el-select v-model="regionCode" placeholder="请选择" size="small">
          <el-option label="+86" value="中国">
            <span style="float: left">中国</span>
            <span style="float: right; color: #8492a6; font-size: 13px">+86</span>
          </el-option>
        </el-select>
        <el-input
          v-model="mobileNumber"
          type="tel"
          placeholder="请输入手机号"
          size="small"
          clearable
          prefix-icon="el-icon-setting"
        ></el-input>
      </aside>
      <el-input
        v-model="password"
        type="password"
        minlength="6"
        placeholder="请输入密码"
        size="small"
        clearable
      ></el-input>
      <el-checkbox v-model="checked" size="mini">记住账号</el-checkbox>
      <el-button type="danger" size="mini" @click="login">登 陆</el-button>

      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <el-alert title="登陆成功" type="success" show-icon :closable="false" v-if="success"></el-alert>
      </transition>

      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <el-alert :title="errText" type="error" show-icon :closable="false" v-if="fail"></el-alert>
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 账户
      mobileNumber: "",
      password: "",
      // 记住密码
      checked: true,
      // 地区
      regionCode: "中国",
      // 消息提示
      success: false,
      fail: false,
      errText: "登陆失败"
    };
  },
  props: {
    noLogin: Boolean,
    hasLogin: Boolean,
    msg: Boolean
  },
  methods: {
    close() {},
    async login() {
      try {
        // 登陆成功
        const res = await this.$server.login({
          phone: this.mobileNumber,
          password: this.password
        });
        // 登陆状态接口
        const loginStatus = await this.$server.status();
        /** 登陆成功的操作 */
        if (loginStatus.code == 200) {
          /** 消息提示显示隐藏控制 */
          this.success = true;
          this.fail = false;

          /** 账户密码缓存 */
          if (this.checked) {
            this.setCookie("username", this.mobileNumber);
            this.setCookie("password", this.password);
          }

          /** 存储登陆信息到本地 */
          localStorage.setItem("token", res.bindings[1].tokenJsonStr);
          localStorage.setItem("info", JSON.stringify(res.profile));

          /** 信息修改 */
          let uid = [].push(localStorage.getItem("userId"));
          let message = {};
          // token 的获取，判断
          if (JSON.parse(localStorage.getItem("token")).access_token) {
            message.status = 1;
            message.data = JSON.parse(localStorage.getItem("info"));
          }
          this.$store.dispatch("loginMessage", message);

          /** 1s后，跳转默认的首页 */
          setTimeout(() => {
            this.$router.push("/");
          }, 800);
        }
      } catch (err) {
        // 登陆失败
        console.log(err);
        /** 消息提示显示隐藏控制 */
        this.fail = true;
        this.success = false;
        if (err) {
          /** 状态码判断 */
          switch (err.data.code) {
            case 415:
              this.errText = "登陆频率过高，请稍后重试";
              break;
            case 501:
              this.errText = "账号不存在，请重新输入";
              this.mobileNumber = this.password = "";
              break;
            case 502:
              this.errText = "密码错误，请重新输入";
              this.password = "";
              break;
            default:
              this.errText = "网络错误，请重试";
              break;
          }
        } else {
          this.errText = "请求超时";
        }
      }
    },
    // 动画
    beforeEnter(el) {
      el.style.transform = "translateX(50px)";
    },
    enter(el, done) {
      el.offsetWidth;

      el.style.transform = "translateX(0)";
      el.style.transition = "all 1s ease";
      done();
    },
    afterEnter() {},
    // 设置cookie
    setCookie(name, value) {
      let Days = 1;
      let exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    // 读取cookie
    getCookie(name) {
      let arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    }
  },
  created() {
    if (document.cookie.length > 0) {
      this.mobileNumber = this.getCookie("username");
      this.password = this.getCookie("password");
    }
  }
};
</script>

<style scoped lang="scss">
#Login {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  section {
    z-index: 10;
    position: relative;
    &.noLogin {
      padding: 0 30px;
      width: 300px;
      background: rgb(248, 248, 248);
      border-radius: 10px;
      box-shadow: 0 0 20px rgb(205, 205, 205);
      h1 {
        margin: 10px 0;
        font-size: 14px;
        font-weight: bold;
        color: #3e3e3e;
        text-align: center;
      }
      .account {
        display: flex;
      }
      .el {
        &-button {
          width: 100%;
        }
        &-checkbox,
        &-button {
          margin-bottom: 10px;
          padding: 10px 0;
        }
      }
    }
  }
  .mobile {
    width: 100%;
    margin-top: 30px;
  }
  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #000;
    font-size: 13px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.v-enter-alive,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
