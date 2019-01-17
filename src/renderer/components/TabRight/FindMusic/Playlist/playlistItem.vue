<template>
  <div id="playlistItem">
    <section>
      <el-row v-for="item in data" :key="item.id">
        <el-col>
          <img v-lazy="item.coverImgUrl" alt>
          <p>{{ item.name }}</p>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  name: "playlistItem",
  props: {
    data: Array
  }
};
</script>

<style scoped lang="scss">
#playlistItem {
  margin-top: 20px;
  section {
    display: flex;
    flex-wrap: wrap;
    .el-row {
      width: 18%;
      margin: 0 1% 20px;
      img {
        width: 195px;
        height: 195px;
        &:hover {
          cursor: pointer;
        }
      }
      p {
        font-size: 14px;
        margin: 5px 0;
      }
    }
  }
}
</style>