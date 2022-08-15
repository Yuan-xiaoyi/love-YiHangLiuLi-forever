<template>
  <div style="height:100%">
    <div class="side">
      <Sider />
    </div>
    <div class="content">
      <router-view />
      <!-- <component :is="componentName" ></component>
        js: this.componentName = () => import(`../content/${param}`)
      -->
    </div>
  </div>
</template>

<script>
import Sider from './Sider.vue'
export default {
  name: 'Mainer',
  components: {
    Sider
  },
  data () {
    return {
      componentArr: [],
      componentName: ''
    }
  }

}
</script>

<style scoped>
  .side{
    float: left;
    width: var(--leftNavWidth);
  }
  .content{
    float: right;
    width: calc(100% - var(--leftNavWidth));
  }
</style>
