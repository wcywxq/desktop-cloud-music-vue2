<template>
  <div id="ItemPrivatecontent">
    <section>
      <el-row v-for="item in data" :key="item.id">
        <el-col>
          <aside>
            <img v-lazy="item.sPicUrl" alt>
            <p>{{ item.name }}</p>
            <div>
              <i class="iconfont icon-fangying"></i>
            </div>
          </aside>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  name: "ItemPrivatecontent",
  data() {
    return {};
  },
  props: {
    data: Array
  },
  methods: {}
};
</script>

<style scoped lang="scss">
#ItemPrivatecontent {
  section {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 10px 0 20px;
    .el-row {
      width: 30%;
      margin: 0 1%;
      .el-col {
        aside {
          position: relative;
          img {
            width: 325px;
            height: 183px;
            &:hover {
              cursor: pointer;
            }
          }
          p {
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.5);
            &:hover {
              cursor: pointer;
            }
          }
          div {
            position: absolute;
            top: 5px;
            left: 5px;
            width: 25px;
            height: 25px;
            line-height: 25px;
            border-radius: 50%;
            background-color: #000;
            opacity: 0.5;
            text-align: center;
            i {
              color: #fff;
            }
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>