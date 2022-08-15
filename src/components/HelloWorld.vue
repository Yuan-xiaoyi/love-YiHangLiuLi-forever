<template>
  <div class="helloWorld" style="display: block;height:100%">
    <div class="header">
      <Header />
    </div>
    <div class="layout">
      <div class="main">
        <Mainer />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>

  </div>
</template>

<script>
import Header from './layout/Header.vue'
import Mainer from './layout/Mainer.vue'
import Footer from './layout/Footer.vue'
export default {
  name: 'HelloWorld',
  components: {
    Header, Mainer, Footer
  }

}
</script>

<style scoped>
/* 
    width: calc(100% - var(--pageMarginLeftWidth));
    height: 100%;
  /* html, body {
  } */
  .helloWorld{
    padding: 0;
    margin: 0;
    height: 100%;
    width:100%;
    overflow: hidden;
    background:rgba(0,0,0,0.8);
    background-image: url('../assets/bg.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .header{
    width: calc(100% + var(--pageMarginLeftWidth));
    margin-left: var(--half_minus_pageMarginLeftWidth);
    text-align: center;
    height: 66px;
    color: white;
    font-size: var(--headFontSize);
    /* background:url('../assets/head_bg.jpg');
    background-repeat: no-repeat;
    background-size: cover; */
    background-image: linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.7) 98%);

  }

  .layout {
    width: calc(100% - 400px);
    height: calc(100% - 66px);
    overflow-y: auto;
    overflow-x: hidden;
    margin:0 200px;
    background-color: rgba(255, 255, 255, 0.4);
  }
  .main{
    display: block;
    width: calc(100% - 40px);
    padding: 20px;
    min-height: calc(100% - 140px);
    overflow: hidden;
    font-size: var(--fontSize);
    color: var(--fontColor);
  }
  .footer{
    text-align: center;
    width: 100%;
    height: 100px;
    background: radial-gradient(lightgrey, gray);
  }
</style>
