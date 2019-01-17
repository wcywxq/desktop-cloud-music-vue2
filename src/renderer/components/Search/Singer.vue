<template>
  <div id="singer">
    <section
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <aside class="singer">
        <el-row class="singer-box" v-for="(item, index) in singer.obj" :key="index">
          <el-col :span="1">
            <img v-lazy="item.img1v1Url" alt>
          </el-col>
          <el-col :span="23">
            <span
              class="singer-text"
            >{{ item.name }}{{ item.trans ? `(${ item.trans })` : item.alias[0] ? `(${ item.alias[0] })`: '' }}</span>
          </el-col>
        </el-row>
      </aside>
    </section>
    <el-pagination
      background
      :page-size.sync="pageSize"
      :total="singer.count"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "singer",
  data() {
    return {
      loading: true,
      singer: {
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
    // 请求
    async pageServer() {
      let offset = (this.currentPage - 1) * this.pageSize;
      const res = await this.$server.search({
        keywords: this.$store.state.searchVal,
        type: 100,
        limit: this.pageSize,
        offset: offset
      });
      // 请求成功
      this.loading = false;
      this.singer.count = res.result.artistCount;
      this.singer.obj = res.result.artists;
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
#singer {
  .singer {
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
  .singer-text {
    margin-left: 10px;
    font-size: 13px;
    font-weight: bold;
  }
}
</style>