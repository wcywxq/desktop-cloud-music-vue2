<template>
  <div id="itemTitle">
    <el-row>
      <el-col :span="22" class="title">
        <div class="title-box">
          <span>{{ title }}</span>
        </div>
      </el-col>
      <el-col :span="2" class="more">
        <div class="more-box">
          <span>更多</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "itemTitle",
  props: {
    title: String
  }
};
</script>

<style scoped lang="scss">
#itemTitle {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  .el-col {
    display: flex;
    &.more {
      justify-content: flex-end;
    }
    div {
      height: 20px;
      line-height: 20px;
      &.title-box {
        font-weight: bold;
      }
      &.more-box {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>