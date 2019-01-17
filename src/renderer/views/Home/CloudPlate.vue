<template>
  <div id="CloudPlate">
    <section class="title">
      <p>我的音乐云盘</p>
      <p>
        <span>云盘容量</span>
        <section class="progress">
          <el-progress :percentage="precent ? precent : 0"></el-progress>
        </section>
        <span>
          {{ size ? size : '--' }}G / {{ maxSize ? maxSize : '--' }}G
        </span>
      </p>
      <p>歌曲永久保存，随时随地多端畅听</p>
    </section>
    <section class="btn">
      <el-button type="danger" size="mini">
        <i class="iconfont icon-bofang"></i>
        播放全部</el-button>
      <el-button size="mini">
        <i class="el-icon-plus"></i>
        上传音乐</el-button>
    </section>
  </div>
</template>

<script>
export default {
  name: "CloudPlate",
  data() {
    return {
      cloudObj: {},
      percentage: 0
    };
  },
  computed: {
    size() {
      return (this.cloudObj.size / ((2**10)**3)).toFixed(2)
    },
    maxSize() {
      return this.cloudObj.maxSize / ((2**10)**3)
    },
    precent() {
      return (this.size / this.maxSize) * 100
    }
  },
  methods: {
    server: async function() {
      const res = await this.$server.my_cloud();
      this.cloudObj = res;
    }
  },
  created() {
    this.server();
  }
};
</script>

<style scoped lang="scss">
#CloudPlate {
  .title {
    display: flex;
    align-items: center;
    padding: 30px 20px 10px;
    border-bottom: 1px solid rgb(225, 225, 225);
    p {
      font-size: 12px;
      font-weight: bold;
      margin-right: 15px;
      &:first-child {
        font-size: 18px;
        font-weight: bold;
      }
      .progress {
        width: 200px;
      }
    }
  }
  .btn {
    margin-top: 10px;
    padding: 0 20px;
    i {
      font-size: 14px;
      line-height: 14px;
    }
  }
}
</style>