<template>
  <div id="loveMusic">
    <el-row>
      <el-col :span="4" :style="{marginRight: '20px'}">
        <img v-lazy="user_playlistObj ? user_playlistObj.coverImgUrl : ''" style="width: 100%;">
      </el-col>
      <el-col :span="16">
        <section class="love-box">
          <p class="love-box-title">
            <span>歌单</span>
            <span>我喜欢的音乐</span>
          </p>
          <p class="love-box-content">
            <img v-lazy="user_playlistObj ? user_playlistObj.creator.avatarUrl : ''">
            <span>{{user_playlistObj ? user_playlistObj.creator.nickname : '' }}</span>
            <span>{{ createTime }}创建</span>
          </p>
          <el-button
            size="mini"
            :style="{
              backgroundColor: '#c62f2f',
              color: '#fff',
              padding: '5px 10px'
            }"
          >
            <aside class="love-box-btn">
              <i class="iconfont icon-bofang"></i>
              <span>播放全部</span>
              <i class="el-icon-plus"></i>
            </aside>
          </el-button>
          <el-button
            size="mini"
            disabled
            :style="{
              padding: '5px 10px'
            }"
          >
            <aside class="love-box-btn">
              <i class="iconfont icon-addAll" style="font-size: 16px"></i>
              <span>收藏(0)</span>
            </aside>
          </el-button>
        </section>
      </el-col>
      <el-col :span="2">
        <aside class="love-right">
          <p>歌曲数</p>
          <p>{{ song_detailObj ? song_detailObj.length : 0 }}</p>
        </aside>
      </el-col>
    </el-row>
    <el-table
      :data="song_detailObj"
      style="width: 100%"
      stripe
      :default-sort="{prop: 'name', order: 'descending'}"
      @row-dblclick="Media"
    >
      <el-table-column type="index" prop="index" label=" " sortable></el-table-column>
      <el-table-column label="操作" width="50px">
        <template slot-scope="scope">
          <div class="love-sc">
            <i
              class="iconfont icon-xihuan"
              @click="love(scope.row.id, scope.$index, song_detailObj)"
            ></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" width="420" sortable></el-table-column>
      <el-table-column prop="singer" label="歌手" sortable></el-table-column>
      <el-table-column prop label="专辑"></el-table-column>
      <el-table-column prop label="时长"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "LoveMusic",
  data() {
    return {
      // 用户歌单
      user_playlistObj: null,
      // 获取音乐详情
      song_detailObj: null
    };
  },
  computed: {
    createTime() {
      const date = new Date(
        this.user_playlistObj ? this.user_playlistObj.createTime : ""
      );
      const yy = date.getFullYear();
      const mm = (date.getMonth() + 1).toString().padStart(2, 0);
      const dd = date
        .getDate()
        .toString()
        .padStart(2, 0);
      return `${yy}-${mm}-${dd}`;
    }
  },
  methods: {
    async server() {
      const uid = JSON.parse(localStorage.getItem("info")).userId;
      /** 获取用户歌单 */

      const res_playlist = await this.$server.user_playlist({
        uid,
        like: false
      });
      this.user_playlistObj = res_playlist.playlist[0];
      /** 获取喜欢的音乐列表  */

      const res = await this.$server.like({ uid });
      const ids = res.ids.join(",");
      /** 获取歌曲详情 */
      const res_song_detail = await this.$server.song_detail({ ids });
      this.song_detailObj = res_song_detail.songs;
      // 歌手名字处理
      res_song_detail.songs.forEach(item => {
        let arr = [];
        item.ar.forEach(i => {
          arr.push(i.name);
        });
        item.singer = arr.join("/");
      });
    },
    async love(id, index, rows) {
      try {
        await this.$confirm("确定将选中歌曲从我喜欢的音乐中删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          roundButton: true
        });
        const res = await this.$server.like_music({ id });
        if (res.code == 200) {
          let arr = rows.filter(item => {
            if (item.id == id) {
              return true;
            }
          });
          rows.splice(rows.indexOf(arr[0]), 1);
          this.$message({ type: "success", message: "取消喜欢成功！" });
        } else {
          this.$message({ type: "error", message: "取消喜欢失败！" });
        }
      } catch (err) {
        this.$message({ type: "info", message: "已取消！" });
      }
    },
    // 双击播放音乐
    async Media(row) {
      const res = await this.$server.getMusicUrl({ id: row.id });
      // 请求成功
      this.$store.dispatch("musicDetail", {
        name: row.name,
        url: res.data[0].url
      });
      this.$store.dispatch("isPlaying", true);
    }
  },
  created() {
    this.server();
  }
};
</script>

<style scoped lang="scss">
#loveMusic {
  padding: 20px;
  .el-row {
    margin-bottom: 60px;
  }
  .love-box {
    &-title {
      margin-bottom: 10px;
      span {
        &:first-child {
          padding: 3px 6px;
          font-size: 12px;
          color: #c62f2f;
          border: 1px solid #c62f2f;
        }
        &:last-child {
          font-size: 22px;
          font-weight: bold;
        }
      }
    }
    &-content {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      span {
        margin-right: 15px;
        &:last-child {
          font-size: 13px;
        }
      }
    }
    &-btn {
      display: flex;
      align-items: center;
      i {
        &:first-child {
          font-size: 14px;
        }
        &:last-child {
          font-size: 12px;
        }
      }
      span {
        margin: 0 20px 0 5px;
        font-size: 12px;
      }
    }
  }
  .love-sc {
    font-size: 14px;
    line-height: 24px;
    i {
      color: #c62f2f;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .love-right {
    p {
      text-align: right;
      &:first-child {
        font-size: 14px;
      }
      &:last-child {
        margin-top: 5px;
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
}
</style>