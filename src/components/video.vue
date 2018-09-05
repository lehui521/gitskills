<template>
  <div :class="clientStatus?'videoBox':'videoBox videoAllClient'" @mousemove="showControl=true" @mouseout="showControl=false">
    <video src="static/1.mp4" id="video" class="video" @loadedmetadata="getVideo"></video>
    <div class="control" v-if="showControl">
      <div class="left">
        <span @click="playClick('play')" v-if="playStatus">开始</span>
        <span @click="playClick('pause')" v-else>暂停</span>
      </div>
      <div class="progress" id="progress" @click="clickProgress">
        <div class="currentProgress" :style="'width:'+currentProgress*100+'%'">
          <span class="dot" @mousedown="move"></span>
        </div>
      </div>
      <div class="right">
        <span @click="voiceClick(1)" v-if="voiceStatus">静音</span>
        <span @click="voiceClick(2)" v-else>打开声音</span>
        <span @click="allClientClick(1)" v-if="clientStatus">全屏</span>
        <span @click="allClientClick(2)" v-else>取消全屏</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      currentProgress: 0,
      videoDom: "",
      playStatus: true,
      voiceStatus: true,
      clientStatus: true,
      showControl: false
    };
  },
  mounted: function() {
    this.videoDom = document.getElementById("video");
    this.controlAllClient();
  },
  methods: {
    controlAllClient: function() {
      let that = this;
      window.addEventListener("resize", function() {
        var isFull =
          document.fullscreenEnabled ||
          window.fullScreen ||
          document.webkitIsFullScreen ||
          document.msFullscreenEnabled;
        if (isFull) {
          that.clientStatus = false;
        } else {
          that.clientStatus = true;
        }
      });
    },
    getVideo: function() {
      var video = this.videoDom;
      var videoDuration = Math.floor(video.duration);
      var that = this;
      video.addEventListener(
        "timeupdate",
        () => {
          //用秒数来显示当前播放进度
          var timeDisplay = Math.floor(video.currentTime);
          that.currentProgress = timeDisplay / videoDuration;
          //当视频播放到 4s的时候做处理
        },
        false
      );
    },
    playClick: function(res) {
      if (res == "play") {
        this.videoDom.play();
        this.playStatus = false;
      } else {
        this.videoDom.pause();
        this.playStatus = true;
      }
    },
    voiceClick: function(res) {
      if (res == 1) {
        this.videoDom.muted = true;
        this.voiceStatus = false;
      } else {
        this.videoDom.muted = false;
        this.voiceStatus = true;
      }
    },
    allClientClick: function(res) {
      if (res == 1) {
        var ele = document.documentElement;
        if (ele.requestFullscreen) {
          ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullScreen) {
          ele.webkitRequestFullScreen();
        }
        this.clientStatus = false;
      } else {
        var de = document;
        if (de.exitFullscreen) {
          de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
          de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
          de.webkitCancelFullScreen();
        }
        this.clientStatus = true;
      }
    },
    clickProgress: function(e) {
      var video = this.videoDom;
      var length = e.pageX - document.getElementById("progress").offsetLeft;
      var percent = length / document.getElementById("progress").offsetWidth;
      this.currentProgress = percent;
      video.currentTime = percent * video.duration;
    },
    move: function(e) {
      let odiv = e.target; //获取目标元素
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      let videoWidth = document.getElementById("progress").offsetWidth;
      let video = this.videoDom;
      document.onmousemove = e => {
        var length = e.clientX - document.getElementById("progress").offsetLeft;
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        //绑定元素位置到positionX和positionY上面
        if (left < 0) {
          return;
        } else if (left > videoWidth) {
          return;
        }
        //移动当前元素
        this.currentProgress = length / videoWidth;
      };
      document.onmouseup = e => {
        video.currentTime = this.currentProgress * video.duration;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>
<style scoped>
.videoBox {
  /* border: 1px solid red; */
  width: 600px;
  height: 400px;
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 9999;
}
.videoAllClient {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.videoBox .video {
  width: 100%;
  height: 100%;
  z-index: -9999 !important;
}
.videoBox .control {
  width: 100%;
  position: absolute;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  line-height: 40px;
  z-index: 9999;
}
.videoBox .control .right {
  width: 20%;
  font-size: 15px;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: space-around;
}
.videoBox .control .right span {
  display: inline-block;
}
.videoBox .control .left {
  width: 10%;
  font-size: 15px;
  color: #fff;
  text-align: center;
}
.videoBox .control .progress {
  width: 70%;
  height: 4px;
  background: gray;
  margin: auto;
  position: relative;
}
.videoBox .control .progress .currentProgress {
  position: absolute;
  top: 0;
  left: 0;
  background: red;
  z-index: 999;
  height: 100%;
}
.videoBox .control .progress .currentProgress .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  right: 0;
  top: -2px;
  cursor: pointer;
}
</style>


