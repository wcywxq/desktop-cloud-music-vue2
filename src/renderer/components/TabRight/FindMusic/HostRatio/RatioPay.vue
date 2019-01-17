<template>
  <div id="RatioPay">
    <ratio-header :title="'付费精品'">
    </ratio-header>
    <section class="pay-content">
      <el-row v-for="item in data" :key="item.id">
        <el-col>
          <img :src="item.picUrl" alt="">
          <div>
            <h1>{{ item.name }}</h1>
            <p>{{ item.rcmdText }}</p>
            <p class="last">
              <i class="el-icon-caret-right"></i>
              {{ item.lastProgramName }}
            </p>
            <span>￥{{ parseInt(item.originalPrice / 100) }}</span>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  import ratioHeader from './RatioHeader'

  export default {
    name: "RatioPay",
    props: {
      data: Array
    },
    components: {
      ratioHeader
    }
  }
</script>

<style scoped lang="scss">
  #RatioPay {
    .pay-content {
      display: flex;
      flex-wrap: wrap;
      .el-row {
        width: 50%;
        .el-col {
          display: flex;
          padding: 10px 0;
          img {
            margin-right: 8px;
            width: 115px;
            height: 115px;
          }
          h1 {
            margin: 10px 0;
            font-size: 14px;
            font-weight: bold;
          }
          p {
            margin: 8px 0;
            font-size: 12px;
            color: rgb(153, 153, 153);
            &.last {
              margin-bottom: 15px;
              display: flex;
              align-items: center;
            }
          }
          span {
            margin-top: 10px;
            font-weight: bold;
            color: #c62f2f;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
</style>