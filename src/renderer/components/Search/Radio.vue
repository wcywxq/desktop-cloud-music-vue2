<template>
  <div id="radio">
    <section
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <aside class="radio-content">
        <el-row v-for="(item, index) in radio.obj" :key="index">
          <el-col>
            <aside>
              <div class="radio-box">
                <img v-lazy="item.picUrl" alt>
                <p class="radio-box-title">{{ item.name }}</p>
                <p class="radio-box-subTitle">by {{ item.dj.nickname }}</p>
              </div>
            </aside>
          </el-col>
        </el-row>
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  name: "radio",
  data() {
    return {
      loading: true,
      radio: {
        count: null,
        obj: null
      }
    };
  },
  watch: {
    // 路由变化监听
    $route(_val, val) {
      console.log(_val, val);
      this.loading = true;
      this.pageServer();
    }
  },
  methods: {
    // 请求
    async pageServer() {
      const res = await this.$server.search({
        keywords: this.$store.state.searchVal,
        type: 1009
      });
      // 请求成功
      this.loading = false;
      this.radio.count = res.result.djRadiosCount;
      this.radio.obj = res.result.djRadios;
    }
  },
  created() {
    this.pageServer();
  }
};
</script>

<style scoped lang="scss">
#radio {
  section {
    height: 500px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    /** 滚动条整体样式 */
    &::-webkit-scrollbar {
      width: 8px;
    }
    /** 滚动条里面轨道 */
    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-right: 1px solid rgb(228, 228, 230);
      border-radius: 5px;
    }
    /** 滚动条里面小方块 */
    &::-webkit-scrollbar-thumb {
      height: 100px;
      background: rgb(228, 228, 230);
      border-radius: 5px;
    }
    .radio-content {
      display: flex;
      flex-wrap: wrap;
      .el-row {
        width: 13.3%;
        margin-right: 3.3%;
        aside {
          .radio-box {
            img {
              width: 138px;
              height: 138px;
            }
            p {
              font-weight: bold;
            }
            &-title {
              margin-top: 5px;
              font-size: 12px;
            }
            &-subTitle {
              margin-top: 3px;
              margin-bottom: 25px;
              font-size: 12px;
              color: rgb(165, 165, 165);
            }
          }
        }
      }
    }
  }
}
</style>