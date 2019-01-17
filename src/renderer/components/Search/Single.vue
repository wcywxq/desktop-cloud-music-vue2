<template>
  <div id="single">
    <div class="table-box">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="single.obj"
        style="width: 100%"
        highlight-current-row
        :header-cell-style="{
            color: 'rgba(0, 0, 0, 0.8)',
            fontSize: '14px',
            fontWeight: 'bold'
        }"
        :row-style="{ cursor: 'pointer'}"
        @row-dblclick="Media"
      >
        <el-table-column prop="index" label=" " min-width="30"></el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <p class="operation">
              <i class="iconfont icon-shoucang"></i>
              <i class="iconfont icon-xiazai"></i>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题"></el-table-column>
        <el-table-column prop="artists[0].name" label="歌手"></el-table-column>
        <el-table-column prop="album.name" label="专辑"></el-table-column>
        <el-table-column prop="duration" label="时长"></el-table-column>
      </el-table>
    </div>

    <el-pagination
      background
      :page-size.sync="pageSize"
      :total="single.count"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "single",
  data() {
    return {
      loading: true,
      single: {
        count: null,
        obj: null
      },
      // 每页显示条数
      pageSize: 100,
      // 当前页码
      currentPage: 1
    };
  },
  watch: {
    // 路由变化监听
    $route(_val, val) {
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
        type: 1,
        limit: this.pageSize,
        offset: offset
      });
      // 请求成功
      this.loading = false;
      this.single.count = res.result.songCount;
      this.single.obj = res.result.songs;
      this.single.obj.forEach((item, index) => {
        // 索引
        item.index = index + 1 + offset;
        // 时长格式化
        item.duration =
          parseInt(item.duration / 1000 / 60)
            .toString()
            .padStart(2, 0) +
          ":" +
          parseInt((item.duration / 1000) % 60)
            .toString()
            .padStart(2, 0);
      });
    },
    /** pageSize => 每页显示条数 改变时会触发
     *  handleSizeChange(val) {
     *     this.pageSize = val;
     *     this.pageServer();
     *  },
     * */
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.pageServer();
    },
    // 音乐播放
    async Media(row, e) {
      console.log(row, e);
      const res = await this.$server.getMusicUrl({ id: row.id });
      // 请求成功
      this.$store.dispatch("musicDetail", {
        name: row.name,
        url: res.data[0].url
      });
      this.$store.dispatch("isPlaying", true);
    }
  },
  created() {
    this.pageServer();
  }
};
</script>

<style scoped lang="scss">
#single {
  font-weight: bold;
  .table-box {
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
  &-box {
    display: flex;
    align-items: center;
    margin: 10px 0;
    &:nth-child(2n) {
      background: rgb(245, 245, 245);
    }
    &-text {
      margin-left: 10px;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .operation {
    i {
      color: #ccc;
      line-height: 24px;
      &:hover {
        cursor: pointer;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .icon-xiazai {
      font-size: 16px;
    }
  }
}
</style>