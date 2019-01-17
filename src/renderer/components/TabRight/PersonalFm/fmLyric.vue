<template>
  <div id="fmLyric">
    <p>{{ lyricObj }}</p>
  </div>
</template>

<script>
export default {
  name: "fmLyric",
  data() {
    return {
      lyricObj: {}
    };
  },
  props: ["id"],
  methods: {
    async server() {
      const res_lyric = await this.$server.lyric({ id: this.id });
      const pattern = /\[\d+:\d+.\d+\]/g;
      let text = res_lyric.lrc.lyric.replace(pattern, "");
      console.log(text);
      this.lyricObj = text;
    }
  },
  created() {
    this.server();
  }
};
</script>

<style scoped lang="scss">
#fmLyric {
  margin-top: 20px;
  height: 350px;
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

  p {
    width: 500px;
    white-space: pre-wrap;
    line-height: 2;
    font-size: 15px;
    font-weight: bold;
  }
}
</style>