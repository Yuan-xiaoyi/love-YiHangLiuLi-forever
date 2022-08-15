<template>
  <div>
    <div style="margin-bottom: 20px">父窗口</div>
    <iframe ref="iframe" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
import Messenger from '../js/messenger'
const messenger = new Messenger('messengerApply', 'test'); //'test'为固定值
export default {
  name: 'messengerApplyFather',
  data(){
    return{
      url: 'http://localhost:8080/messengerApplyChild'
    }
  },
  mounted(){
    messenger.addTarget(this.$refs.iframe.contentWindow, 'messengerApply')

    let backdata = 'hi'
    messenger.targets['parent'].send(backdata)
    

    // messenger.addTarget(iframe1.contentWindow, 'iframe1');

    // window.addEventListener('click', function() {
    //   messenger.send('hi');
    // });
// 或
// iframe.onload = function(){
// messenger.send('hi');
// }
  },

}
</script>

<style>

</style>