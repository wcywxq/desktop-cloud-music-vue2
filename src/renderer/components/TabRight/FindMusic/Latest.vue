<template>
  <div id="Latest">
    <el-radio-group v-model="tabs" size="mini" fill="rgb(124, 125, 133)" @change="radioChange">
      <el-radio-button label="新歌速递"></el-radio-button>
      <el-radio-button label="新碟上架"></el-radio-button>
    </el-radio-group>
    <!-- 新歌速递 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" v-show="flag">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.id">
        <new-courier :obj="dataObj" :loading="loading"></new-courier>
      </el-tab-pane>
    </el-tabs>
    <!-- 新碟上架 -->
    <section v-show="!flag">
      <new-discs></new-discs>
    </section>
  </div>
</template>

<script>
import newCourier from "@/components/TabRight/FindMusic/Latest/NewCourier";
import newDiscs from "@/components/TabRight/FindMusic/Latest/NewDiscs";

export default {
  name: "Latest",
  data() {
    return {
      // 加载图标
      loading: true,
      tabList: [
        {
          id: 1,
          label: "全部",
          name: "0"
        },
        {
          id: 2,
          label: "华语",
          name: "7"
        },
        {
          id: 3,
          label: "欧美",
          name: "96"
        },
        {
          id: 4,
          label: "韩国",
          name: "16"
        },
        {
          id: 5,
          label: "日本",
          name: "8"
        }
      ],
      tabs: "新歌速递",
      activeName: "0",
      // 数据
      dataObj: null,
      // 切换状态
      flag: true
    };
  },
  components: {
    newCourier,
    newDiscs
  },
  methods: {
    // 请求
    async server() {
      const res = await this.$server.newCourier({ type: this.activeName });
      this.loading = false;
      this.dataObj = res.data;
      this.dataObj.forEach(item => {
        // 名称过滤
        let filterItem =
          item.alias.length > 0 ? "(" + item.alias.join(",") + ")" : "";
        item.name = item.name + filterItem;
        item.album.name = item.album.name + filterItem;
        // 时间过滤
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
    // 单选按钮改变
    radioChange() {
      // 页面切换
      this.flag = this.tabs == "新歌速递" ? true : false;
    },
    // tab切换事件
    handleClick() {
      this.loading = true;
      this.server();
    }
  },
  created() {
    this.server();
  }
};
</script>

<style scoped lang="scss">
#Latest {
  text-align: center;
  font-weight: bold;
}
</style>