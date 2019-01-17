<template>
  <div id="Playlist">
    <!-- 标签控件 -->
    <section class="cata">
      <el-popover placement="right-end" width="560" v-model="add" popper-class="card">
        <h1>添加标签</h1>
        <hr>
        <section class="card-body" style="height: 350px; overflow-y: scroll;">
          <aside
            :style="{
              marginBottom: '10px',
              textAlign: 'center'
            }"
          >
            <el-button size="mini" :style="{position: 'relative', width: '90%'}">
              {{ catalog.all.name }}
              <select-icon></select-icon>
            </el-button>
          </aside>
          <!-- 其他分类 -->
          <aside>
            <el-row
              class="card-item"
              v-for="(item, index) in catalog.categories"
              :key="index"
              :style="{
                  marginBottom: '10px',
                  fontSize: '16px',
                  color: '#c62f2f',
                  fontWeight: 'bold'
                }"
            >
              <el-col :span="6">{{ item }}</el-col>
              <el-col :span="18" :style="{display: 'flex', flexWrap: 'wrap'}">
                <el-button
                  size="small"
                  v-for="(subItem, idx) in catalog.sub"
                  :key="idx"
                  v-if="subItem.category == index"
                  :style="{ position: 'relative', marginLeft: 0, width: '80px', fontSize: '10px' }"
                  @click="isSelect(subItem.name)"
                >
                  {{ subItem.name }}
                  <span
                    :style="{
                      position: 'absolute', 
                      right: '2px', 
                      top: '2px',
                      color: '#c62f2f',
                      fontSize: '6px',
                      fontWeight: 'bold'
                    }"
                    v-show="subItem.hot"
                  >HOT</span>
                  <select-icon class="selectIcon"></select-icon>
                </el-button>
              </el-col>
            </el-row>
          </aside>
        </section>
        <el-button slot="reference" type="infor" size="mini">
          {{ $store.state.cataName }}
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </el-popover>
    </section>
    <!-- 面包屑 -->
    <section class="hot">
      <span>热门标签：</span>
      <el-breadcrumb separator="|">
        <el-breadcrumb-item v-for="item in hotcat" :key="item.id">
          <span @click="changeServer" style="cursor: pointer;">{{ item.name }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <!-- 主体内容 -->
    <section
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <playlist-item :data="playlistItemObj"></playlist-item>
    </section>
    <!-- 分页组件 -->
    <el-pagination
      background
      :page-size.sync="pageSize"
      :total="playlistCount"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import selectIcon from "./Playlist/select";
import playlistItem from "./Playlist/playlistItem";

export default {
  name: "Playlist",
  data() {
    return {
      add: "",
      catalog: {
        all: [],
        sub: [],
        categories: []
      },
      hotcat: [],
      // 加载状态
      loading: true,
      // 歌单信息
      playlistItemObj: null,
      // 总数
      playlistCount: 0,

      pageSize: 100,
      currentPage: 1
    };
  },
  components: { selectIcon, playlistItem },
  methods: {
    // 获取歌单分类
    async catlist() {
      const res = await this.$server.catlist();
      this.catalog = res;
    },
    // 热门歌单分类
    async hot() {
      const res = await this.$server.hot();
      this.hotcat = res.tags;
    },
    //请求
    async server() {
      let offset = (this.currentPage - 1) * this.pageSize;
      /**
       *  @params tag: name
       */
      const res = await this.$server.getPlaylist({
        limit: this.pageSize,
        offset: offset
      });
      this.loading = false;
      this.playlistItemObj = res.playlists;
      this.playlistCount = res.total;
    },
    // 点击按钮选中
    isSelect(name) {
      this.$store.commit("cataChange", name);
      this.server();
    },
    // 点击面包屑的操作
    changeServer() {
      this.server();
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.server();
    }
  },
  created() {
    this.catlist();
    this.hot();
    this.server();
  }
};
</script>

<style scoped lang="scss">
#Playlist {
  margin-bottom: 10px;
  .cata {
    margin-bottom: 10px;
  }
  .hot {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
}
</style>