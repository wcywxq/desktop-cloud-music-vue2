<template>
  <div id="RatioHeader">
    <section class="header">
      <el-row>
        <el-col :span="12"
                :style="{
                  fontSize: '16px'
                }"
        >
          <p>{{ title }}</p>
        </el-col>
        <el-col :span="12"
                :style="{
                  textAlign: 'right',
                  fontSize: '12px'
                }">
          <span v-show="!showMore">更多></span>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  export default {
    name: "RatioHeader",
    props: {
      title: String,
      showMore: Boolean
    }
  }
</script>

<style scoped lang="scss">
  #RatioHeader {
    .header {
      padding: 8px 0;
      border-bottom: 1px solid #e6e6e6;
      font-weight: bold;
      color: #333;

    }
  }
</style>