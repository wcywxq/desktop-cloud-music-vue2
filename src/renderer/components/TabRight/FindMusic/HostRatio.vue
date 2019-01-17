<template>
  <div id="hostRatio">
    <ratio-catalog :data="renders"></ratio-catalog>
    <ratio-pay :data="payObj"></ratio-pay>
    <ratio-recommend :data="recommendObj"></ratio-recommend>
    <ratio-items
      v-for="(item, index) in saveObj"
      :key="index"
      :data="item.data"
      :title="item.title"
    ></ratio-items>
  </div>
</template>

<script>
import ratioCatalog from "./HostRatio/RatioCatalog";
import ratioItems from "./HostRatio/RatioItems";
import ratioPay from "./HostRatio/RatioPay";
import ratioRecommend from "./HostRatio/RatioRecommend";

export default {
  name: "hostRatio",
  data() {
    return {
      renders: null,
      saveObj: [],
      // 支付精品数据
      payObj: null,
      // 电台个性推荐
      recommendObj: null
    };
  },
  components: {
    ratioCatalog,
    ratioItems,
    ratioPay,
    ratioRecommend
  },
  methods: {
    async server() {
      const saveId = [];
      const res_fication = await this.$server.classification();
      this.renders = res_fication.categories;
      // 获取id
      res_fication.categories.forEach(item => {
        saveId.push({ id: item.id, title: item.name });
      });
      saveId.splice(5);
      /**
       * 因为lodash的forEach和[].forEach不支持await,
       * 如果非要一边遍历一边执行await,可使用for-of
       */
      for (const item of saveId) {
        const res_type = await this.$server.recommendType({ type: item.id });
        this.saveObj.push({ data: res_type.djRadios, title: item.title });
      }
    },
    async pay() {
      const res = await this.$server.pay({
        limit: 4,
        offset: 0
      });
      this.payObj = res.data.list;
    },
    async recommend() {
      const res = await this.$server.recommend();
      this.recommendObj = res.djRadios;
    }
  },
  created() {
    this.pay();
    this.recommend();
    this.server();
  }
};
</script>

<style scoped lang="scss">
</style>