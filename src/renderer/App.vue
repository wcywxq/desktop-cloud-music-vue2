<template>
  <div id="app">
    <!-- 头部容器 -->
    <keep-alive>
      <router-view name="top"></router-view>
    </keep-alive>
    <section style="display: flex">
      <!-- 左侧容器 -->
      <keep-alive>
        <router-view name="left"></router-view>
      </keep-alive>
      <!-- 主体内容容器 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </section>
    <!-- 底部容器 -->
    <keep-alive>
      <router-view name="bottom"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "app",
    data() {
      return {};
    }
  };
</script>

<style lang="scss">
</style>
