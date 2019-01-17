<template>
  <div id="RatioCatalog">
    <aside class="box">
      <ul :class="['content', dynamic]">
        <li v-for="item in data"
            :key="item.id"
            :data-id="item.id"
        >
          <img :src="item.pic56x56Url" alt="">
          <p>{{ item.name }}</p>
        </li>
      </ul>
      <i class="el-icon-arrow-left box-left"
         v-show="leftStatus"
         @click="left"></i>
      <i class="el-icon-arrow-right box-right"
         v-show="rightStatus"
         @click="right"></i>
    </aside>
  </div>
</template>

<script>
  export default {
    name: "RatioCatalog",
    data() {
      return {
        // 箭头显示
        leftStatus: false,
        rightStatus: true,
        // class
        dynamic: ''
      };
    },
    props: {
      data: Array
    },
    watch: {
      // 如果新增加的class改变，则将新增加的class移除
      dynamic(oldVal, newVal) {
        if(newVal) {
          newVal = ''
        }
      }
    },
    methods: {
      left() {
        this.dynamic = 'goLeft';
        this.leftStatus = false;
        this.rightStatus = true;
      },
      right() {
        this.dynamic = 'goRight';
        this.leftStatus = true;
        this.rightStatus = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  #RatioCatalog {
    margin-bottom: 40px;
    .box {
      position: relative;
      height: 60px;
      ul {
        position: absolute;
        left: 0;
        width: 200%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        li {
          padding: 5px 8px;
          border-radius: 5px;
          text-align: center;
          &:hover {
            background-color: #e6e6e6;
            cursor: pointer;
          }
          img {
            width: 30px;
            height: 30px;
          }
          p {
            margin-top: 5px;
            font-size: 12px;
            font-weight: bold;
          }
        }
      }
      i {
        position: absolute;
        font-size: 30px;
        color: #e2e2e2;
        top: 50%;
        transform: translateY(-50%);
        &:hover {
          cursor: pointer;
        }
      }
      &-left {
        left: 0;
      }
      &-right {
        right: 0;
      }
    }
  }
  /* 动画 */
  .goLeft {
    animation: left 2s ease forwards;
  }

  @keyframes left {
    0% {
      left: -100%
    }
    100% {
      left: 0;
    }
  }

  .goRight {
    animation: right 2s ease forwards;
  }

  @keyframes right {
    0% {
      left: 0;
    }
    100% {
      left: -100%;
    }
  }
</style>