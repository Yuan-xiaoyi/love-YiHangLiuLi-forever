<template>
  <div>
    <div>拓展：</div>
    <div v-for="(item, index) in list" :key="index" style="margin:10px 20px">
      <div v-if="item.id">
        {{item.userName}}
        <button class="btn" @click="del(item.userName)">删除</button>  
      </div>
      <a :href="item.url" target="_blank" style="color:var(--linkColor)">{{item.label}}</a>
    </div>

    <p>用户名：</p>
    <input type="text" v-model="userName">
    <br>
    <p>密码：</p>
    <input type="password" v-model="Pwd">
    <br>
    <input type="submit" value="登录" @click="login">
    
    <br>
    <p>用户名：</p>
    <input type="text" v-model="userName2">
    <br>
    <p>密码：</p>
    <input type="password" v-model="Pwd2">
    <br>
    <input type="submit" value="注册" @click="register">
  
  </div>
</template>

<script>
import api from '../../api/demo/myFirstInterface';
export default {
  name: 'Test',
  data () {
    return {
      list: [
        {
          label: '一行琉璃',
          url: 'https://www.duitang.com/blogs/tag/?name=%E4%B8%80%E8%A1%8C%E7%90%89%E7%92%83'
        },
        {
          label: '微前端',
          url: 'https://qiankun.umijs.org/zh/guide/getting-started'
        },{
          label: '纯 CSS 实现绘制各种三角形（各种角度）',
          url: 'https://www.cnblogs.com/chengxs/p/11406278.html'
        },{
          label: 'el-table横竖滚动条交汇处的白色小方框样式调整',
          url: 'https://blog.csdn.net/MISS_CJL/article/details/115122652?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.essearch_pc_relevant&spm=1001.2101.3001.4242'
        },{
          label: 'CSS垂直居中的8种方法',
          url: 'https://www.cnblogs.com/qianxiaoPro/p/14276519.html'
        },{
          label: 'cookie删除不掉的问题',
          url: 'https://blog.csdn.net/weixin_30257433/article/details/99836682'
        },{
          label: 'Vue-Cli 4.5+版本创建项目以及使用Vue-router',
          url: 'https://blog.csdn.net/CHENJIANLIN_/article/details/119037786'
        },{
          label: 'vue动态引入（按需引入）组件并传值',
          url: 'https://blog.csdn.net/weixin_42284117/article/details/105405820'
        },{
          label: 'vue-print  打印功能坑',
          url: 'https://juejin.cn/post/6882565127246184455'
        },{
          label: '用CSS3动画特效实现弹窗效果',
          url: 'https://www.cnblogs.com/w-wanglei/p/5678696.html'
        },{
          label: '手动激活 Navicat',
          url: 'https://customer.navicat.com/cn/manual_activate.php'
        }
      ],
      userName: '',
      Pwd: '',
      userName2: '',
      Pwd2: ''
    }
  },
  created () {
    this.getAllUsers()
  },
  methods:{
    getAllUsers(){
      api.getURLList().then(res => {
        this.list = res
      });
    },
    login(){
      if(this.userName && this.Pwd){
        let param = {userName: this.userName, password: this.Pwd}
        api.login(param).then(res => {
          alert("success!")
        }).catch(e => {
          console.log(e)
        })
      }
    },

    register(){
      let self = this
      if(self.userName2 && self.Pwd2){
        let param = {userName: self.userName2, password: self.Pwd2}
        api.register(param).then(res => {
          alert("success!")
          self.getAllUsers();
        }).catch(e => {
          console.log(e)
        })
      }
    },
    
    del(name){
      let self = this;
      let param = {userName: name}
      api.del(param).then(res => {
        alert("success!")
        self.getAllUsers();
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style>

</style>
