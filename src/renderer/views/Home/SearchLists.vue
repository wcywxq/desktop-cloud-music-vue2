<template>
  <div id="searchLists">
    <p class="search-title">
      搜索
      <span>"{{ $store.state.searchVal }}"</span>
      <!-- ，找到 {{ single.count }} 首单曲 -->
    </p>
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane label="单曲" name="single">
        <m-single :val="$store.state.searchVal"></m-single>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="singer">
        <m-singer :val="$store.state.searchVal"></m-singer>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="album">
        <m-album :val="$store.state.searchVal"></m-album>
      </el-tab-pane>
      <el-tab-pane label="视频" name="video">
        <m-video :val="$store.state.searchVal"></m-video>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="playlist">
        <m-playlist :val="$store.state.searchVal"></m-playlist>
      </el-tab-pane>
      <el-tab-pane label="歌词" name="lyric">
        <m-lyric :val="$store.state.searchVal"></m-lyric>
      </el-tab-pane>
      <el-tab-pane label="主播电台" name="radio">
        <m-radio :val="$store.state.searchVal"></m-radio>
      </el-tab-pane>
      <el-tab-pane label="用户" name="user">
        <m-user :val="$store.state.searchVal"></m-user>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mSingle from "@/components/Search/Single";
import mSinger from "@/components/Search/Singer";
import mAlbum from "@/components/Search/Album";
import mVideo from "@/components/Search/Video";
import mPlaylist from "@/components/Search/Playlist";
import mRadio from "@/components/Search/Radio";
import mUser from "@/components/Search/User";
import mLyric from "@/components/Search/Lyric";

export default {
  name: "searchLists",
  data() {
    return {
      activeName: "single"
    };
  },
  components: {
    mSingle,
    mSinger,
    mAlbum,
    mVideo,
    mPlaylist,
    mRadio,
    mUser,
    mLyric
  },
  computed: {
    searchVal() {
      return this.$store.state.searchVal;
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName);
      switch (this.activeName) {
        case "single":
          break;
        case "singer":
          break;
        case "album":
          break;
        case "video":
          break;
        case "playlist":
          break;
        case "lyric":
          break;
        case "radio":
          break;
        case "user":
          break;
      }
    }
  },
  created() {
    // console.log(this.searchVal);
  }
};
</script>

<style scoped lang="scss">
#searchLists {
  padding: 20px 140px;
  .search-title {
    margin-bottom: 20px;
    font-size: 14px;
    span {
      color: rgb(12, 115, 204);
    }
  }
}
</style>