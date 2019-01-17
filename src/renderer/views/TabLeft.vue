<template>
  <div id="tabLeft">
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu
          :default-openeds="['1', '2', '3']"
          router
          collapse-transition
          style="background-color: rgb(245, 245, 245)"
        >
          <el-submenu index="1">
            <template slot="title">推荐</template>
            <el-menu-item-group>
              <el-menu-item index="/">发现音乐</el-menu-item>
              <el-menu-item index="/personalFm">私人FM</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">我的音乐</template>
            <el-menu-item-group>
              <el-menu-item index="/collection">我的收藏</el-menu-item>
              <el-menu-item index="/cloudPlate">我的云盘</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">创建新歌单</template>
            <el-menu-item-group>
              <el-menu-item index="/loveMusic">我喜欢的音乐</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "tabLeft",
  data() {
    return {};
  }
};
</script>
<style>
#tabLeft {
  width: 200px;
}
</style>