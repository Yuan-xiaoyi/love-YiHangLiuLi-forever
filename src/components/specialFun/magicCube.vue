<!--魔方展示图片-->
<template>
  <div style="display: block; height: 100%;width:100%">
    <div >
      <!-- autoplay 自动播放 -->
      <!-- loop 循环播放 -->
      <audio
        ref="audio"
        @pause="onPause"
        @play="onPlay"
        loop
      >
        <source :src="musicUrl" type="audio/mpeg" />
        您的浏览器不支持音频播放
      </audio>
      <div v-if="musicUrl != ''" class="btn playBtn"
        style="float: right;
          font-size: 25px;
          line-height: 30px;
          padding: 4px;
          margin: 0px;
          transform: rotate(30deg);"
        :style="{animation : audio.playing ? '' : 'none'}"
        @click="startPlayOrPause">{{audio.playing | transPlayPause}}
      </div>

      <!-- 魔方相册 -->
      <div class="wrap">
        <!--	/*包裹所有元素的容器*/-->
        <div class="cube">
          <!--前面图片 -->
          <div class="out_front">
            <img :src="getImgUrl(images, true)" class="pic" >
          </div>
          <!--后面图片 -->
          <div class="out_back">
            <img :src="getImgUrl(images, true)" class="pic">
          </div>
          <!--左图片 -->
          <div class="out_left">
            <img :src="getImgUrl(images, true)" class="pic">
          </div>
          <div class="out_right">
            <img :src="getImgUrl(images, true)" class="pic">
          </div>
          <div class="out_top">
            <img :src="getImgUrl(images, true)" class="pic">
          </div>
          <div class="out_bottom">
            <img :src="getImgUrl(images, true)" class="pic">
          </div>

          <!-- 里层小正方体 -->
          <span class="in_front">
            <img :src="getImgUrl(images, true)" class="in_pic" />
          </span>
          <span class="in_back">
            <img :src="getImgUrl(images, true)" class="in_pic" />
          </span>
          <span class="in_left">
            <img :src="getImgUrl(images, true)" class="in_pic" />
          </span>
          <span class="in_right">
            <img :src="getImgUrl(images, true)" class="in_pic" />
          </span>
          <span class="in_top">
            <img :src="getImgUrl(images, true)" class="in_pic" />
          </span>
          <span class="in_bottom">
            <img :src="getImgUrl(images, true)" class="in_pic" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var randomNum = 0
export default {
  name: 'magicCube',
  props: {
    image: {}
  },
  data () {
    return {
      images: [],
      musicUrl: '',
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false
      },
    }
  },
  mounted () {
    if (typeof this.image.value === 'string') {
      this.images = [this.image.value]
    } else {
      this.images = this.image.value
    }

    if (this.image.music) {
      this.musicUrl = this.getImgUrl(this.image.music)
    } else {
      this.musicUrl = ''
    }
  },
  watch: {
    image: {
      handler (newVal, oldVal) {
        if (typeof newVal.value === 'string') {
          this.images = [newVal.value]
        } else {
          this.images = newVal.value
        }

        if (newVal.music) {
          this.musicUrl = this.getImgUrl(newVal.music)
        } else {
          this.musicUrl = ''
        }
      },
      deep: true
    }
  },
  methods: {
    getImgUrl (imgUrl, random) {
      if (!random) {
        if (imgUrl) {
          return require('../../' + imgUrl)
        } else {
          return require('../../assets/default.png')
        }
      } else {
        if(imgUrl.length > 0){
          if (randomNum >= imgUrl.length - 1) {
            randomNum = 0
          } else {
            randomNum++
          }
          return require('../../' + imgUrl[randomNum])
        }
      }
    },

    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    // 播放音频
    play () {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay () {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },

  },

  // ??????????
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause (value) {
      return value ? '' : '丨'
    }
  },

  destroyed () {
    this.images = [],
    this.showMofang = false
  }
}
</script>

<style scoped>
  /* 魔方相册 */
  .wrap{
    width: 600px;
    height: 600px;
    position: absolute;
    left: calc(50% - 300px);
    top: calc(50% - 300px);
  }
  /*包裹所有容器样式*/
  .cube{
    position: absolute;
    top: 100px;
    left: 100px;
    width:400px;
    height:400px;
    margin: 0 auto;
    transform-style: preserve-3d;
    transform: rotateX(-30deg) rotateY(-80deg) rotateZ(-60deg);
    -webkit-animation: rotate 25s infinite;
    animation: rotate 25s infinite;
    /*匀速*/
    animation-timing-function: linear;
  }
  @-webkit-keyframes rotate{
    from{transform: rotateX(360deg) rotateY(-180deg) rotateZ(0deg);}
    to{transform: rotateX(-360deg) rotateY(180deg) rotateZ(360deg);}
  }
  @keyframes rotate{
    from{transform: rotateX(360deg) rotateY(-180deg) rotateZ(0deg);}
    to{transform: rotateX(-360deg) rotateY(180deg) rotateZ(360deg);}
  }
  .cube div{
    position: absolute;
    width: 300px;
    height: 300px;
    opacity: 0.8;
    transition: all .4s;
  }
  /*定义所有图片样式*/
  .pic{
    width: 300px;
    height: 300px;
  }
  .cube .out_front{
    transform: rotateY(0deg) translateZ(150px);
  }
  .cube .out_back{
    transform: translateZ(-150px) rotateY(180deg);
  }
  .cube .out_left{
    transform: rotateY(90deg) translateZ(150px);
  }
  .cube .out_right{
    transform: rotateY(-90deg) translateZ(150px);
  }
  .cube .out_top{
    transform: rotateX(90deg) translateZ(150px);
  }
  .cube .out_bottom{
    transform: rotateX(-90deg) translateZ(150px);
  }
  /*定义小正方体样式*/
  .cube span{
    display: bloack;
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50px;
    left: 50px;
  }
  .cube .in_pic{
    width: 200px;
    height: 200px;
  }
  .cube .in_front{
    transform: rotateY(0deg) translateZ(100px);
  }
  .cube .in_back{
    transform: translateZ(-100px) rotateY(180deg);
  }
  .cube .in_left{
    transform: rotateY(90deg) translateZ(100px);
  }
  .cube .in_right{
    transform: rotateY(-90deg) translateZ(100px);
  }
  .cube .in_top{
    transform: rotateX(90deg) translateZ(100px);
  }
  .cube .in_bottom{
    transform: rotateX(-90deg) translateZ(100px);
  }
  /*鼠标移入后样式*/
  .cube:hover .out_front{
    transform: rotateY(0deg) translateZ(400px);
  }
  .cube:hover .out_back{
    transform: translateZ(-400px) rotateY(180deg);
  }
  .cube:hover .out_left{
    transform: rotateY(90deg) translateZ(400px);
  }
  .cube:hover .out_right{
    transform: rotateY(-90deg) translateZ(400px);
  }
  .cube:hover .out_top{
    transform: rotateX(90deg) translateZ(400px);
  }
  .cube:hover .out_bottom{
    transform: rotateX(-90deg) translateZ(400px);
  }
</style>
