<template>
  <div id="home">
    <el-container>
      <!-- 容器 -->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <!-- 登陆组件容器 -->
        <router-view name="login"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {},
  watch: {},
  created() {}
};
</script>

<style scoped lang="scss">
#home {
  flex: 1;
  margin-bottom: 78px;
  .el-main {
    padding: 0;
    background-color: rgb(250, 250, 250);
    height: 680px;
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
}
</style>