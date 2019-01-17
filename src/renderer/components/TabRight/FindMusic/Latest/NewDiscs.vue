<template>
  <div
    id="NewDiscs"
    v-loading="flag"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgb(245, 245, 245)"
  >
    <section>
      <el-row v-for="item in hasRendering" :key="item.id">
        <el-col>
          <img v-lazy="item.picUrl" alt>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  name: "NewDiscs",
  data() {
    return {
      hasRendering: null,
      flag: true,
      // 用于分页
      limit: 20,
      page: 1,
      // 判断是否到底
      isBottom: false
    };
  },
  methods: {
    async server() {
      const res = await this.$server.newDisc({
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      });
      this.flag = false;
      this.hasRendering = res.albums;
    }
  },
  created() {
    this.server();
  },
  mounted() {
    let discs = document.querySelector(".el-main");
    // 滚动分页
    discs.onscroll = () => {
      let scrollTop = discs.scrollTop,
        clientHeight = discs.clientHeight,
        scrollHeight = discs.scrollHeight;
      if (
        Math.abs(scrollTop + clientHeight - scrollHeight) < 1 &&
        !this.isBottom
      ) {
        this.isBottom = true;
        this.flag = true;
        // 滚动到底加载下一页
        this.limit += 20;
        this.server();
      }
      this.isBottom = false;
    };
  }
};
</script>

<style scoped lang="scss">
#NewDiscs {
  margin-top: 20px;
  height: 530px;
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
  section {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .el-row {
      margin-bottom: 15px;
      width: 18%;
      .el-col {
        img {
          width: 195px;
          height: 195px;
        }
      }
    }
  }
}
</style>