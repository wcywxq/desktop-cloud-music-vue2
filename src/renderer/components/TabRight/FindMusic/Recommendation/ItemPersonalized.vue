<template>
  <div id="ItemPersonalized">
    <section>
      <el-row>
        <el-col>
          <aside>
            <div class="daily">
              <p>星期{{ week | change }}</p>
              <p>{{ date }}</p>
            </div>
            <span class="subTitle">每日歌曲推荐</span>
          </aside>
        </el-col>
      </el-row>
      <el-row v-for="item in data" :key="item.id">
        <el-col>
          <aside>
            <img v-lazy="item.picUrl" alt>
            <span class="subTitle">{{ item.copywriter }}</span>
          </aside>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  name: "ItemPersonalized",
  data() {
    return {};
  },
  props: {
    data: Array
  },
  computed: {
    week() {
      return new Date().getDay();
    },
    date() {
      return new Date().getDate();
    }
  },
  filters: {
    change(val) {
      switch (val) {
        case 1:
          return "一";
          break;
        case 2:
          return "二";
          break;
        case 3:
          return "三";
          break;
        case 4:
          return "四";
          break;
        case 5:
          return "五";
          break;
        case 6:
          return "六";
          break;
        default:
          return "日";
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
#ItemPersonalized {
  section {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .el-row {
      width: 18%;
      margin: 0 1% 20px;
      .el-col {
        aside {
          img,
          .daily {
            width: 200px;
            height: 200px;
            &:hover {
              cursor: pointer;
            }
          }
          .daily {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #fff;
            p {
              &:first-child {
                font-size: 20px;
              }
              &:last-child {
                font-size: 80px;
                font-weight: bold;
                color: #c62f2f;
              }
            }
          }
          .subTitle {
            padding: 5px 0;
            font-size: 12px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.6);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>