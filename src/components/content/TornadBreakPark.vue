<template>
  <div style="display: block; width:100%; height: 100%">
    <popup
      :showPopup="showPopup"
      :title="popupTitle"
      :coverNav="false"
      @onCancel="showPopup = false"
    >
      <div>
        <div class="tornado" :class="{revovle:revovle}"></div>
        
        <div class="parkIcon">
          <div class="parkIconBottom"></div>
        </div>
        <div class="cars cars1"></div>
        <div class="cars cars2"></div>
        
        <div class="bottomLine"></div>
      </div>
    </popup>
  </div>
</template>

<script>
export default {
  name: 'TornadBreakPark',
  data(){
    return {
      showPopup: false,
      popupTitle: '龙卷风摧毁停车场',
      revovle: false,
      listener: undefined
    }
  },
  mounted(){
    let _this = this
    _this.showPopup = true
    _this.listener = setInterval(() => {
      _this.revovle = !_this.revovle
    }, 500);
  },
  methods: {
    
  },
  destroyed(){
    if(this.listener){
      clearInterval(this.listener)
    }
  }
}
</script>

<style scoped>
  .tornado{
    width: 157px;
    height: 270px;
    background-image: url('../../assets/tool/tornado.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: inherit;
    position: absolute;
    bottom: calc(12% - 60px);
  
    -webkit-animation: rotate 3s 1 forwards;
    animation: rotate 3s 1 forwards;
    
  }
  .revovle{
    transform: rotateY(180deg)
  }
  
  @keyframes rotate{
    from{left: 10px}
    to{left: 30%}
  }


  .parkIcon{
    width: 30px;
    height: 30px;
    background-image: url('../../assets/tool/park.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    bottom: 15%;
    right: 4%;
  }
  .parkIconBottom{
    height: 24px;
    border: white 1px solid;
    width: 0px;
    position: relative;
    left: calc(50% - 1px);
    top: 28px;
  }
  .cars{
    width: 30px;
    height: 30px;
    position: absolute;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .cars1{
    background-image: url('../../assets/tool/car1.png');
    right: calc(5% - 30px);
    bottom: calc(12% - 6px);
  }
  .cars2{
    background-image: url('../../assets/tool/car2.png');
    right: calc(5% - 60px);
    bottom: calc(12% - 8px);
  }

  .bottomLine{
    width: 100%;
    border: white 1px solid;
    height: 0px;
    position: absolute;
    bottom: 12%;
  }
</style>