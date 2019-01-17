<template>
  <div id="ItemMv">
    <section>
      <el-row v-for="item in data" :key="item.id">
        <el-col>
          <aside>
            <img v-lazy="item.picUrl" alt>
            <span class="subTitle">{{ item.name }}</span>
            <br>
            <span class="subTitle" style="color: #b3b3b3;">{{ item.artistName }}</span>
          </aside>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  name: "ItemMv",
  data() {
    return {};
  },
  props: {
    data: Array
  },
  computed: {}
};
</script>

<style scoped lang="scss">
#ItemMv {
  section {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .el-row {
      width: 23%;
      margin: 0 1% 20px;
      .el-col {
        aside {
          img {
            width: 250px;
            height: 140px;
            &:hover {
              cursor: pointer;
            }
          }
          .subTitle {
            padding: 5px 0;
            font-size: 12px;
            font-weight: bold;
            color: #3e3e3e;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>