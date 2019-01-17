<template>
  <div id="user">
    <section
      class="user"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <aside class="user-container">
        <section class="user-content" v-for="(item, index) in user.obj" :key="index">
          <el-row class="user-box">
            <el-col :span="12" class="user-box-left">
              <img v-lazy="item.avatarUrl" alt>
              <span class="text">{{ item.nickname }}</span>
            </el-col>
            <el-col :span="12" class="user-box-right">
              <span class="text">{{ item.description ? item.description : '网易音乐人'}}</span>
            </el-col>
          </el-row>
        </section>
      </aside>
    </section>
    <el-pagination
      background
      :page-size.sync="pageSize"
      :total="user.count"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      loading: true,
      user: {
        count: null,
        obj: null
      },
      pageSize: 20,
      currentPage: 1
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
    async pageServer() {
      let offset = (this.currentPage - 1) * this.pageSize;
      const res = await this.$server.search({
        keywords: this.$store.state.searchVal,
        type: 1002,
        limit: this.pageSize,
        offset: offset
      });
      // 请求成功
      this.loading = false;
      this.user.count = res.result.userprofileCount;
      this.user.obj = res.result.userprofiles;
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.pageServer();
    }
  },
  created() {
    this.pageServer();
  }
};
</script>

<style scoped lang="scss">
#user {
  section {
    &.user {
      .user-container {
        height: 450px;
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
      }
    }
    &.user-content {
      padding: 10px 0;
      &:nth-child(2n) {
        background-color: rgb(245, 245, 245);
      }
      &:hover {
        background-color: rgb(235, 236, 237);
        cursor: pointer;
      }
      .user-box {
        display: flex;
        align-items: center;
        &-left {
          img {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            vertical-align: middle;
          }
        }
        &-right {
          .text {
            float: right;
            margin-right: 20px;
            color: rgb(148, 148, 148);
          }
        }
        &-left,
        &-right {
          font-weight: bold;
          font-size: 12px;
          span.text {
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>