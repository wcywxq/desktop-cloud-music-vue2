<template>
  <div id="MakeList">
    <section>
      <el-row v-for="item in renders" :key="item.id">
        <el-col>
          <aside class="make-box">
            <img :src="item.coverImgUrl">
            <div>
              <i class="iconfont icon-ting"></i>
              <span>{{ item.playCount | screening }}</span>
            </div>
          </aside>
          <p>{{ item.name }}</p>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  name: "MakeList",
  data() {
    return {
      renders: null
    };
  },
  filters: {
    screening(val) {
      let valStr = val.toString();
      if (valStr.length > 4) {
        return valStr.substring(0, valStr.length - 4) + "万";
      } else {
        return valStr;
      }
    }
  },
  methods: {
    async server() {
      const res = await this.$server.makeList();
      this.renders = res.list;
    }
  },
  created() {
    this.server();
  }
};
</script>

<style scoped lang="scss">
#MakeList {
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-row {
      width: 15%;
      .make-box {
        position: relative;
        img {
          width: 100%;
        }
        div {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
          padding: 1px;
          font-size: 13px;
          font-weight: bold;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.9)
          );
          color: #fff;
          i {
            margin-right: 3px;
          }
        }
      }
      p {
        margin: 5px 0;
        text-align: center;
        font-size: 13px;
        font-weight: bold;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>