<template>
  <div id="bottom">
    <section class="player">
      <audio ref="audio" preload="auto" :src="$store.state.musicMsg.url">
        <!-- <source :src="$store.state.musicMsg.url" type="audio/mp3"> -->
      </audio>
      <section class="player-box">
        <aside class="player-left">
          <i
            :class="[iconPublic, iconTab ? 'icon-zanting' : 'icon-bofang']"
            @click="startPlayOrPause"
          ></i>
        </aside>
        <aside class="player-middle">
          <p>{{ $store.state.musicMsg.name ? $store.state.musicMsg.name : '标题' }}</p>
          <div class="sliderBar">
            <el-slider
              v-model="progress"
              :show-tooltip="true"
              input-size="mini"
              :max="progressEnd"
              :step="1"
              :format-tooltip="formatTooltip"
              @change="change"
            ></el-slider>
          </div>
          <div class="time">
            <span class="time-start">{{ voteTime }}</span>
            <span class="time-end">{{ endTime }}</span>
          </div>
        </aside>
        <aside class="player-right">
          <i
            :class="[iconPublic, volumeTab ? 'icon-yinliang' : 'icon-jingyin']"
            @click="volumeStatus"
          ></i>
          <div class="singer">
            <el-slider v-model="volume" input-size="mini" vertical height="40px" :step="1"></el-slider>
          </div>
        </aside>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "bottom",
  data() {
    return {
      // 播放暂停切换的class
      iconPublic: "iconfont",
      iconTab: false,
      // 播放进度
      progress: 0,
      progressEnd: 0,
      // 时间显示 默认值为00:00
      voteTime: "00:00",
      endTime: "00:00",
      // 声音控制
      volume: 100,
      // 声音切换class
      volumeTab: true
    };
  },
  components: {},
  watch: {
    volume(val) {
      const audio = this.$refs.audio;
      // 声音控制
      audio.volume = val / 100;
      this.volumeTab = audio.volume == 0 ? false : true;
    }
  },
  methods: {
    // 时间格式化
    format(currentTime) {
      let minute = parseInt(currentTime / 60)
        .toString()
        .padStart(2, "0");
      let seconds = parseInt(currentTime % 60)
        .toString()
        .padStart(2, "0");
      // 格式化时间
      return `${minute}:${seconds}`;
    },
    // 播放控制
    startPlayOrPause() {
      const audio = this.$refs.audio;
      if (!audio.src) return;
      /**
       * 播放暂停图片切换
       */
      this.iconTab = !this.iconTab;
      /**
       * 播放，暂停控制
       */
      audio.paused ? audio.play() : audio.pause();
      /**
       * 结束时间显示   format=> 'xx:xx'
       */
      // 格式化结束时间
      this.endTime = this.format(audio.duration);
      // 结束时间，单位：/s
      this.progressEnd = parseInt(audio.duration);
    },
    // 点击切换静音
    volumeStatus() {
      const audio = this.$refs.audio;
      this.volumeTab = !this.volumeTab;
      audio.volume = this.volumeTab ? this.volume / 100 : 0;
    },
    // 进度条tooltip提示
    formatTooltip(val) {
      return this.format(val);
    },
    // 拖拽和点击改变进度值
    change(val) {
      const audio = this.$refs.audio;
      // 将当前播放的进度值修改成拖拽或者点击之后的进度值
      audio.currentTime = val;
      // 当前时间
      this.voteTime = this.format(val);
      // 当前进度值
      this.progress = parseInt(val);
    }
  },
  mounted() {
    const audio = this.$refs.audio;
    // 播放位置改变的回调
    audio.addEventListener(
      "timeupdate",
      () => {
        // 当前时间
        this.voteTime = this.format(audio.currentTime);
        // 当前进度值
        this.progress = parseInt(audio.currentTime);
      },
      false
    );
    // 成功获取资源长度的回调，刚获取完元数据的回调
    audio.addEventListener(
      "loadedmetadata",
      () => {
        this.iconTab = false;
      },
      false
    );
    // 播放结束的回调
    audio.addEventListener(
      "ended",
      () => {
        this.iconTab = false;
      },
      false
    );
  }
};
</script>

<style scoped lang="scss">
#bottom {
  position: fixed;
  z-index: 9999;
  bottom: 0;
  width: 100%;
  .player {
    background-color: #333;
    opacity: 0.9;
    color: #ccc;
    &-box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0;
    }
    &-left {
      margin-right: 40px;
      i {
        font-size: 40px;
        color: #ccc;
        &:hover {
          cursor: pointer;
        }
      }
    }
    &-middle {
      display: flex;
      flex-direction: column;
      p {
        font-size: 14px;
        font-weight: bold;
      }
      .sliderBar {
        width: 500px;
      }
      .time {
        display: flex;
        font-size: 12px;
        font-weight: bold;
        &-start {
          text-align: left;
        }
        &-end {
          text-align: right;
        }
        span {
          flex: 1;
        }
      }
    }
    &-right {
      display: flex;
      align-items: center;
      margin-left: 20px;
      i {
        font-size: 20px;
        font-weight: bold;
        color: #ccc;
        &:hover {
          cursor: pointer;
        }
      }
      .singer {
        padding: 10px 0;
      }
    }
  }
}
</style>