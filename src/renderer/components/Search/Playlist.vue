<template>
  <div id="playlists">
    <section
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <aside class="playlists">
        <el-row class="playlists-box" v-for="(item, index) in playlists.obj" :key="index">
          <el-col :span="1">
            <img v-lazy="item.coverImgUrl" alt>
          </el-col>
          <el-col :span="11">
            <span class="playlists-text left">{{ item.name }}</span>
          </el-col>
          <el-col :span="3">
            <span class="playlists-text">{{ item.trackCount }}首</span>
          </el-col>
          <el-col :span="9">
            <span class="playlists-text">by {{ item.creator.nickname }}</span>
          </el-col>
        </el-row>
      </aside>
    </section>
    <el-pagination
      background
      :page-size.sync="pageSize"
      :total="playlists.count"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "playlists",
  data() {
    return {
      loading: true,
      playlists: {
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
        type: 1000,
        limit: this.pageSize,
        offset: offset
      });
      // 请求成功
      this.loading = false;
      this.playlists.count = res.result.playlistCount;
      this.playlists.obj = res.result.playlists;
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
#playlists {
  .playlists {
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
    &-box {
      display: flex;
      align-items: center;
      margin: 10px 0;
      &:nth-child(2n) {
        background: rgb(245, 245, 245);
      }
    }
  }
  img {
    width: 40px;
    height: 40px;
  }
  .playlists-text {
    margin-left: 10px;
    font-size: 13px;
    font-weight: bold;
    color: rgb(102, 102, 102);
    &.left {
      font-size: 13px;
      font-weight: bold;
    }
  }
}
</style>