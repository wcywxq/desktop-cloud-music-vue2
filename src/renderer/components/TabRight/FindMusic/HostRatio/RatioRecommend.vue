<template>
  <div id="RatioRecommend">
    <ratio-header :title="'电台个性推荐'" showMore></ratio-header>
    <section class="content">
      <el-row v-for="item in data" :key="item.id">
        <el-col>
          <div>
            <img :src="item.picUrl" alt="">
            <p class="name">
              <span>{{ item.name }}</span>
            </p>
          </div>
          <p class="text">{{ item.rcmdtext }}</p>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  import ratioHeader from './RatioHeader'

  export default {
    name: "RatioRecommend",
    props: {
      data: Array
    },
    components: {
      ratioHeader
    }
  }
</script>

<style scoped lang="scss">
#RatioRecommend {
  .content {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .el-row {
      width: 18%;
      .el-col {
        p {
          &.text {
            margin: 5px 0;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 1px;
          }
        }
        div {
          position: relative;
          width: 165px;
          img {
            width: 165px;
            height: 165px;
          }
          span {
            padding-left: 5px;
            font-size: 11px;
            font-weight: bold;
            letter-spacing: 1px;
            color: #fff;
          }
          p.name {
            position: absolute;
            left: 0;
            bottom: 0;
            padding: 5px 0;
            width: 100%;
            height: 13px;
            line-height: 13px;
            background: linear-gradient(to top, rgba(80, 80, 80, 0.7), rgba(130, 130, 130, 0.5)) ;
          }
        }
      }
    }
  }
}
</style>