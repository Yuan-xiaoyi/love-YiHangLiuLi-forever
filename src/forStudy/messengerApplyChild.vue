<template>
  <div>
    子窗口
    <button class="btn fun_btn" @click="test">点击获取数据</button>
    <div>
      跨文档通信应用举例： 
      {{tableData}}
    </div>
  </div>
</template>

<script>
import Messenger from '../js/messenger'
const messenger = new Messenger('messengerApply', 'test'); //'test'为固定值

export default {
  name: 'messengerApplyChild',
  data(){
    return {
      tableData: [],
    }
  },
  methods: {
    test(){
      let self = this
      let misKey = 'love_YiHangLiuLi'
      /* messenger初始化 */
      messenger.addTarget(window.parent, 'messengerApply');
      // console.log(window.parent,1)
      /* 接收信息 */
      messenger.listen(function(data){
        try {
          /**************** 自定义代码，处理数据 ******************/
          self.tableData = data
          /**************** 自定义代码，处理数据 ******************/
        } catch (e) {
          console.error(e);
        }
      });

      // messenger.addTarget(window.parent, 'parent')
      // var parms = {
      //   requstInfo: {
      //     name: 'messengerApply',//请求页面target的名称
      //     sendId: misKey,//同一页面同一target的请求标识
      //   },//请求页面的信息，回传时，会将该对象直接返回
      //   type: 0,//外部调用类型
      // }
      // messenger.targets['parent'].send(JSON.stringify(parms));
      // messenger.targets['parent'].listen(function (msg) {
      //   try {
      //     let parse = JSON.parse(msg);
      //     if (parse.requstInfo.sendId === misKey) {
      //         console.log(parse)
      //       if(parse.data){
              
      //         /**************** 自定义代码，处理数据 ******************/
      //         self.tableData = parse.data
      //         /**************** 自定义代码，处理数据 ******************/
      //       }
      //     }
      //   } catch (e) {
      //     console.error(e);
      //   }
      // })
    }
  }
}
</script>

<style>

</style>