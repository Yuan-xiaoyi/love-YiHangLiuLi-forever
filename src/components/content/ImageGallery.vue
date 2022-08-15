<template>
  <div style="display: block; width:100%">
    <div v-for="(item, index) in funs" :key="index"
      class="fun"
      @click="enterFun(item)"
    >
      <div class="funImg">
        <!-- 单张图片 -->
        <img v-if="typeof item.value === 'string'"
          :src="getImgUrl(item.value)" alt=""
          class="img"
          :class="{defaultImg: !item.value}"
        >
        <!-- 数组但只有一张 -->
        <div v-else-if="typeof item.value === 'object' && item.value.length === 1">
          <img :src="getImgUrl(item.value[0])" alt=""
            class="img"
            :class="{defaultImg: !item.value[0]}"
          >
        </div>
        <!-- 多张图片 -->
        <div v-else-if="typeof item.value === 'object' && item.value.length > 1" class="imgsBox">
          <img v-for="(imgs, index) in item.value" :key="index"
            class="imgs"
            :src="getImgUrl(item.value[index])" alt="">
        </div>
      </div>
      <div class="funLabel">{{item.label}}</div>
    </div>

    <popup
      :showPopup="showPopup"
      :title="popupTitle"
      :width="'100%'"
      :height="'100%'"
      @onCancel="closeTest"
    >
    
      <!-- 图片展示 -->
      <div v-if="!showMofang && !showTornado" style="height: 100%;">
        <div v-if="imgUrls.length > 1"
          style="height: 100%;overflow-y: auto;"
        >
          <div v-for="(item, index) in imgUrls" :key="index"
            class="imgUrls"
          >
            <img class="img_complex" :src="getImgUrl(item)" alt="">
          </div>
        </div>
        <div v-else>
          <img class="img_single" :src="getImgUrl(imgUrls[0])" alt="">
        </div>
      </div>

      <!-- 魔方相册 -->
      <magic-cube v-else-if="showMofang" :image="image"></magic-cube>

      <!-- 龙卷风 -->
      <Tornado v-else-if="showTornado" :image="image"></Tornado>

      
      <div class="fun_btns">
        <button class="btn fun_btn" @click="test1">test1</button>
        <button class="btn fun_btn" @click="test2">test2</button>
      </div>
    </popup>

  </div>
</template>

<script>
import Public from '../../js/Public'
import magicCube from '../specialFun/magicCube'
import Tornado from '../specialFun/Tornado'
export default {
  name: 'ImageGallery',
  components: {magicCube, Tornado, },
  data () {
    return {
      funs: [
        {
          label: '图1',
          value: ['assets/pic/b_b.png']
        }, {
          label: '图2',
          value: 'assets/pic/b_g.png'
        }, {
          label: '图3',
          value: ''
        }, {
          label: '图组4',
          value: [
            'assets/pic/g_p.png',
            'assets/pic/g_purple.png',
            'assets/pic/g_w.png'
          ]
        }, {
          label: '一行琉璃',
          value: [
            'assets/pic/1.png',
            'assets/pic/2.png',
            'assets/pic/3.png',
            'assets/pic/4.png',
            'assets/pic/5.png',
            'assets/pic/6.png',
            'assets/pic/7.png',
            'assets/pic/8.png',
            'assets/pic/9.png',
            'assets/pic/10.png',
            'assets/pic/11.png',
            'assets/pic/12.png'
          ],
          music: 'assets/mus/SlowDown.mp3'
        }
      ],
      showPopup: false,
      // popupWidth: 0,
      // popupHeight: 0,
      popupTitle: undefined,
      image: {},
      imgUrls: [],
      
      showMofang: false,
      showTornado: false
    }
  },
  mounted () {
    console.log(Public.createRandomId())
  },
  methods: {
    enterFun (item) {
      if (item.value) {
        // if(typeof item.value === 'string'){
        //   this.imgUrls = [item.value]
        // } else {
        // }
        this.image = item
        this.popupTitle = item.label
        this.showPopup = true
        
        if (typeof this.image.value === 'string') {
          this.imgUrls = [this.image.value]
        } else {
          this.imgUrls = this.image.value
        }

      } else {
        this.$Message.showToast({
          title: '图片有误，不支持浏览!',
          icon: 'fail', // success 成功， fail 失败
          duration: 1500
        })
      }
    },
    getImgUrl (imgUrl) {
      if (imgUrl) {
        return require('../../' + imgUrl)
      } else {
        return require('../../assets/default.png')
      }
    },
    
    test1 () {
      this.showMofang = !this.showMofang

      this.showTornado = false
    },
    test2 () {
      this.showTornado = !this.showTornado

      this.showMofang = false
    },
    closeTest(){
      this.showPopup = false
      this.showMofang = false
      this.showTornado = false
    }
  }
}
</script>

<style scoped>
  .fun{
    width: 200px;
    height: 200px;
    margin: 15px;
    float: left;
    position: relative;
    border-radius: 16px;
  }
  .funImg{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    border-radius: 16px;
    overflow: hidden;
  }
  .funImg:hover{
    cursor: pointer;
  }
  .funImg >>> img{
    transition: all 0.6s;
  }
  .funImg:hover img{
    transform: scale(1.3);
  }
  .funLabel{
    width: 100%;
    text-align: center;
    background: radial-gradient(black, transparent);
    color: white;
    position: absolute;
    bottom: 0;
    z-index: 100;
    border-radius: 0 0 14px 14px;
  }
  .img{
    height: 100%;
    width: 100%;
  }
  .defaultImg{
    padding: 45px 5px;
    height: calc(100% - 100px) !important;
  }
  .imgsBox{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .imgs{
    height: calc(100% - 80px);
    width: calc(100% - 80px);
    padding: 40px;
    float: left;
    position: absolute;
  }
  .imgs:nth-child(2n){
    transform: rotate(15deg);
  }
  .imgs:nth-child(2n + 1){
    transform: rotate(0deg);
  }

  .imgUrls{
    width: 220px;
    height: 220px;
    margin: 15px;
    float: left;
    position: relative;
    border-radius: 16px;
  }
  .img_complex{
    width: 100%;
    height: 100%;
  }
  .img_single{

  }
  .fun_btns{
    position: absolute;
    left: 26px;
    bottom: 0;
    width: calc(100% - 42px);
    height: 42px;
    background: rgba(255, 255, 255, 0.4);
  }
  .fun_btn{
    margin-top: 5px;
  }

</style>
