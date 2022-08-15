<template>
  <div style="height: 100%;">
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    width:100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(10px);
    height: 100%;
  }
  
</style>
