<template>
  <div id="lyric">
    <div class="table-box">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="lyric.obj"
        style="width: 100%;"
        :header-cell-style="{
                    color: 'rgba(0, 0, 0, 0.8)',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }"
        :row-style="{ cursor: 'pointer'}"
        @row-dblclick="Media"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <section class="lyric-box" style="width: 500px;">
                  <aside>
                    <pre>{{ flag ? props.row.lyrics.txt : props.row.lyrics.txt.substring(0, 50) }}</pre>
                  </aside>
                  <aside>
                    <el-button size="mini" @click="isShow">{{ flag ? '收起' : '展开' }}歌词</el-button>
                  </aside>
                </section>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="index" label=" " min-width="30"></el-table-column>
        <el-table-column label="操作"></el-table-column>
        <el-table-column prop="name" label="音乐标题"></el-table-column>
        <el-table-column prop="artSingers" label="歌手"></el-table-column>
        <el-table-column prop="album.name" label="专辑"></el-table-column>
        <el-table-column prop="duration" label="时长"></el-table-column>
      </el-table>
    </div>

    <el-pagination
      background
      :page-size.sync="pageSize"
      :total="lyric.count"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "lyric",
  data() {
    return {
      loading: true,
      lyric: {
        count: null,
        obj: null
      },
      flag: false,
      // 每页显示条数
      pageSize: 20,
      // 当前页码
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
        type: 1006,
        limit: this.pageSize,
        offset: offset
      });
      // 请求成功
      this.loading = false;
      this.lyric.count = res.result.songCount;
      this.lyric.obj = res.result.songs;
      this.lyric.obj.forEach((item, index) => {
        let arr = [];
        // 索引
        item.index = index + 1 + offset;
        item.artists.forEach(val => {
          arr.push(val.name);
        });
        item.artSingers =
          arr.join("/").length > 10
            ? arr.join("/").substring(0, 10) + "..."
            : arr.join("/");
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
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.pageServer();
    },
    isShow() {
      this.flag = !this.flag;
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
#lyric {
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
  .lyric-box {
    display: flex;
    font-size: 12px;
    aside {
      flex: 1;
      .el-button {
        margin-top: 5px;
        float: right;
      }
    }
  }
}
</style>