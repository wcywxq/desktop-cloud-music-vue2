<template>
  <div id="findMusic">
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane label="个性推荐" name="first">
        <recommendation/>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <playlist/>
      </el-tab-pane>
      <el-tab-pane label="主播电台" name="third">
        <host-ratio/>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="fourth">
        <make-list/>
      </el-tab-pane>
      <el-tab-pane label="最新音乐" name="sixth">
        <latest/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 个性推荐
import recommendation from "@/components/TabRight/FindMusic/Recommendation";
// 歌单
import playlist from "@/components/TabRight/FindMusic/Playlist";
// 电台
import hostRatio from "@/components/TabRight/FindMusic/HostRatio";
// 排行榜
import makeList from "@/components/TabRight/FindMusic/MakeList";
// 最新音乐
import latest from "@/components/TabRight/FindMusic/latest";

export default {
  name: "findMusic",
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    recommendation,
    playlist,
    hostRatio,
    makeList,
    latest
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>

<style scoped lang="scss">
#findMusic {
  padding: 0 100px;
}
</style>