<template>
  <div id="video">
    <section
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-row v-for="(item, index) in video.obj" :key="index">
        <el-col>
          <aside>
            <div class="video-box">
              <img v-lazy="item.coverUrl" alt>
              <span
                class="video-box-date"
              >{{ parseInt(item.durationms / 1000 / 60).toString().padStart(2, 0) + ':' + parseInt((item.durationms / 1000) % 60) }}</span>
              <span
                class="video-box-count"
              >{{ item.playTime.toString().length > 5 ? item.playTime.toString().substring(0, item.playTime.toString().length - 4) + '万' : item.playTime }}</span>
            </div>
            <p
              class="video-title"
            >{{ item.title.length >=10 ? item.title.substring(0, 10) + '...' : item.title }}</p>
            <p class="video-subTitle">by {{ item.creator[0].userName }}</p>
          </aside>
        </el-col>
      </el-row>
    </section>
    <el-pagination
      background
      :page-size.sync="pageSize"
      :total="video.count"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "video",
  data() {
    return {
      loading: true,
      video: {
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
        type: 1014,
        limit: this.pageSize,
        offset: offset
      });
      // 请求成功
      this.loading = false;
      this.video.count = res.result.videoCount;
      this.video.obj = res.result.videos;
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
#video {
  section {
    display: flex;
    flex-wrap: wrap;
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
    .el-row {
      width: 20%;
      margin-right: 5%;
      aside {
        .video-box {
          position: relative;
          img {
            width: 209px;
            height: 117px;
          }
          span {
            position: absolute;
            font-size: 12px;
            font-weight: bold;
            color: #fff;
          }
          &-date {
            bottom: 5px;
            left: 5px;
          }
          &-count {
            top: 5px;
            right: 5px;
          }
        }
        p {
          margin: 5px 0;
        }
        p.video {
          &-title {
            font-size: 12px;
          }
          &-subTitle {
            margin-bottom: 25px;
            font-size: 12px;
            color: rgb(165, 165, 165);
          }
        }
      }
    }
  }
}
</style>