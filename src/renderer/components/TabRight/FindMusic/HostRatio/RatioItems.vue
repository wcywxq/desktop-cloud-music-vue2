<template>
  <div id="RatioItems">
    <ratio-header :title="title"></ratio-header>
    <section class="content">
      <el-row v-for="(item, index) in newData" :key="item.id">
        <el-col>
          <div class="box">
            <span class="flag">{{ item.radioFeeType != 0 ? '付费精品' : '' }}</span>
            <img v-lazy="item.picUrl" alt="">
            <p class="box-text">
              <span>{{ item.name }}</span>
            </p>
          </div>
          <p>{{ item.rcmdtext }}</p>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  import ratioHeader from './RatioHeader'

  export default {
    name: "RatioItems",
    props: {
      data: Array,
      title: String
    },
    computed: {
      newData() {
        this.data.splice(6);
        return this.data
      }
    },
    components: {
      ratioHeader
    }
  }
</script>

<style scoped lang="scss">
  #RatioItems {
    margin-top: 40px;
    .content {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      .el-row {
        width: 15%;
        .box {
          position: relative;
          width: 100%;
          .flag {
            position: absolute;
            top: 0;
            left: 0;
            padding: 2px 5px;
            background: #c62f2f;
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            border-bottom-right-radius: 10px;
          }
          img {
            width: 165px;
            height: 165px;
            &:hover {
              cursor: pointer;
            }
          }
          &-text {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20px;
            line-height: 20px;
            background: linear-gradient(to top, #333, #aaa);
            span {
              padding-left: 5px;
              font-size: 11px;
              color: #fff;
            }
          }
        }
        p {
          margin-top: 5px;
          font-size: 12px;
          font-weight: bold;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>