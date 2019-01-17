<template>
  <div id="PersonalFm">
    <section class="fm-top">
      <ul>
        <li v-for="item in render" :key="item.id">
          <aside class="left">
            <img v-lazy="item.album.picUrl" alt>
          </aside>
          <aside class="right">
            <p class="title">{{ item.name }}</p>
            <span class="album">
              专辑：
              <a href="javascript:;">{{ item.album.name }}</a>
            </span>
            <span class="singer">
              歌手：
              <a href="javascript:;">{{ item.artists[0].name }}</a>
            </span>
            <fm-lyric :id="item.id"></fm-lyric>
          </aside>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import fmLyric from "@/components/TabRight/PersonalFm/fmLyric";

export default {
  name: "PersonalFm",
  data() {
    return {
      render: null
    };
  },
  components: { fmLyric },
  methods: {
    async server() {
      const arrId = [];
      const res_fm = await this.$server.fm();
      this.render = res_fm.data;
      res_fm.data.forEach(item => {
        arrId.push(item.id);
      });
    }
  },
  created() {
    this.server();
  }
};
</script>

<style scoped lang="scss">
#PersonalFm {
  padding: 30px 280px;
  .fm-top > ul > li {
    display: flex;
    margin-bottom: 30px;
    .left {
      padding: 40px 0;
      img {
        width: 300px;
        height: 300px;
      }
    }
    .right {
      margin-left: 30px;
      .title {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
      }
      .album {
        margin-right: 70px;
      }
      .album,
      .singer {
        font-size: 12px;
        font-weight: bold;
        text-decoration: none;
        a {
          text-decoration: none;
          color: rgb(12, 77, 175);
        }
      }
    }
  }
}
</style>