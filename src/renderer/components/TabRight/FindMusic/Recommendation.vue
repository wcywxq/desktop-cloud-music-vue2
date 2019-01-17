<template>
  <div id="Recommendation">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in obj.banner" :key="index">
        <div class="banner">
          <img class="banner-img" v-lazy="item.imageUrl">
          <span
            class="banner-flag"
            :style="{backgroundColor: item.titleColor}"
            :data-type="item.targetType"
          >{{ item.typeTitle }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
    <section>
      <item-title title="推荐歌单"></item-title>
      <item-personalized :data="obj.personalized"></item-personalized>
    </section>
    <section>
      <item-title title="独家放送"></item-title>
      <item-privatecontent :data="obj.privatecontent"></item-privatecontent>
    </section>
    <section>
      <item-title title="推荐MV"></item-title>
      <item-mv :data="obj.mv"></item-mv>
    </section>
  </div>
</template>

<script>
import itemTitle from "./Recommendation/ItemTitle";
import itemPersonalized from "./Recommendation/ItemPersonalized";
import itemMv from "./Recommendation/ItemMv";
import itemPrivatecontent from "./Recommendation/ItemPrivatecontent";
export default {
  name: "Recommendation",
  data() {
    return {
      obj: {
        banner: null,
        personalized: null,
        mv: null,
        privatecontent: null
      }
    };
  },
  components: {
    itemTitle,
    itemPersonalized,
    itemMv,
    itemPrivatecontent
  },
  methods: {
    // banner轮播图
    async banner() {
      const res = await this.$server.banner();
      this.obj.banner = res.banners;
    },
    // 推荐歌单
    async personalized() {
      const res = await this.$server.personalized({ limit: 9 });
      this.obj.personalized = res.result;
    },
    // 独家放送
    async privatecontent() {
      const res = await this.$server.privatecontent();
      this.obj.privatecontent = res.result;
    },
    // 推荐mv
    async mv() {
      const res = await this.$server.mv({ limit: 9 });
      this.obj.mv = res.result;
    }
  },
  created() {
    this.banner();
    this.personalized();
    this.privatecontent();
    this.mv();
  }
};
</script>

<style scoped lang="scss">
#Recommendation {
  .banner {
    position: relative;
    &-img {
      width: 542px;
      height: 201px;
    }
    &-flag {
      position: absolute;
      bottom: 10px;
      right: 3px;
      padding: 0 8px;
      height: 18px;
      line-height: 18px;
      border-radius: 10px;
      text-align: center;
      font-size: 11px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>