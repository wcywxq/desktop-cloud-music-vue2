<template>
  <div id="Collection">
    <section class="tabs">
      <el-radio-group
        v-model="tabChange"
        style="margin-bottom: 30px;"
        size="mini"
        fill="rgb(124, 125, 133)"
        text-color="#fff"
      >
        <el-radio-button label="专辑">专辑</el-radio-button>
        <el-radio-button label="歌手">歌手</el-radio-button>
        <el-radio-button label="视频">视频</el-radio-button>
        <el-radio-button label="专栏">专栏</el-radio-button>
      </el-radio-group>
    </section>
    <section class="title">
      <p>收藏的{{ tabChange }}</p>
      <el-input
        type="text"
        suffix-icon="el-icon-search"
        clearable
        size="mini"
        v-model="search_collection"
        :placeholder="'搜索我收藏的' + tabChange"
        :style="{
          width: '215px',
          fontSize: '12px'
        }"
      ></el-input>
    </section>
    <section class="content">
      <aside v-show="tabChange == 'album' ? true : false"></aside>
      <aside v-show="tabChange == 'singer' ? true : false">2</aside>
      <aside v-show="tabChange == 'video' ? true : false">3</aside>
      <aside v-show="tabChange == 'column' ? true : false">4</aside>
    </section>
  </div>
</template>

<script>
export default {
  name: "Collection",
  data() {
    return {
      tabChange: "专辑",
      // v-model 绑定数据
      search_collection: ""
    };
  }
};
</script>

<style scoped lang="scss">
#Collection {
  .tabs {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    padding: 0 30px 8px 30px;
    border-bottom: 1px solid rgb(225, 225, 225);
    p {
      line-height: 28px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>