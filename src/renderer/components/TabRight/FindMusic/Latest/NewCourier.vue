<template>
  <div id="NewCourier">
    <el-row>
      <el-col :span="12">
        <div class="left-header-content">
          <i class="iconfont icon-bofang"></i>
          <span>播放全部</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right-header-content">
          <el-button size="mini" type="infor">
            <div class="btn-icon-box">
              <i class="iconfont icon-addAll"></i>
              收藏全部
            </div>
          </el-button>
        </div>
      </el-col>
    </el-row>
    <div class="table-box">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgb(245, 245, 245)"
        stripe
        :show-header="false"
        style="width: 100%"
        highlight-current-row
        :data="obj"
        :row-style="{ cursor: 'pointer' }"
      >
        <el-table-column type="index" prop="index" label=" " min-width="10"></el-table-column>
        <el-table-column label="操作" min-width="15">
          <template slot-scope="props">
            <img v-lazy="props.row.album.picUrl" alt>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题"></el-table-column>
        <el-table-column prop="artists[0].name" label="歌手" min-width="40"></el-table-column>
        <el-table-column prop="album.name" label="专辑" min-width="60"></el-table-column>
        <el-table-column prop="duration" label="时长" min-width="20"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewCourier",
  data() {
    return {};
  },
  props: {
    obj: Array,
    loading: Boolean
  }
};
</script>

<style scoped lang="scss">
#NewCourier {
  .table-box {
    height: 450px;
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
  }
  img {
    width: 40px;
    height: 40px;
  }
  .left,
  .right {
    &-header-content {
      display: flex;
      align-items: center;
      height: 45px;
      font-size: 12px;
    }
  }
  .left-header-content {
    float: left;
    margin-left: 10px;
    i {
      font-size: 18px;
      margin-right: 5px;
      color: #c62f2f;
      cursor: pointer;
    }
    span {
      cursor: pointer;
    }
  }
  .right-header-content {
    float: right;
    margin-right: 10px;
    .btn-icon-box {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: bold;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>