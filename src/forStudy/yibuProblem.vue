<template>
  <div>
    经典异步问题， 见网址" <a href="https://blog.csdn.net/weixin_38404899/article/details/103594131" target="_blank">异步问题</a>"
    <div style="margin-top: 16px;">
      <h4>异步问题1<button class="btn fun_btn" @click="yibu1">执行</button></h4>
      <pre class="codeDisplay">
    async function async1() {
      console.log('1');
      await async2();
      console.log('2'); 
    }

    async function async2() {
      console.log('3');
    }
    
    console.log('4');

    setTimeout(function() {
        console.log('5'); 
    }, 0)

    async1();

    new Promise(function(resolve) {
        console.log('6');
        resolve();
    }).then(function() {
        console.log('7');
    });

    console.log('8');
      </pre>

      <h4>异步问题2<button class="btn fun_btn" @click="yibu2">执行</button></h4>
      <pre class="codeDisplay">
    async function a1 () {
        console.log('a')
        await a2()
        console.log('b')  
    }
    
    async function a2 () {
        console.log('c')   
    }
    
    console.log('d')  
    
    setTimeout(() => {
        console.log('e')  
    }, 0)
    
    Promise.resolve().then(() => {
        console.log('f')    
    })
    
    a1()
    
    let promise2 = new Promise((resolve) => {
        resolve('g')   
        console.log('h')    
    })
    
    promise2.then((res) => {
        console.log(res)
        Promise.resolve().then(() => {
            console.log('i')  
        })
    })
    
    console.log('j')
      </pre>

      
      <h4>异步问题3<button class="btn fun_btn" @click="yibu3">执行</button></h4>
      <pre class="codeDisplay">
    const promise = new Promise((resolve, reject) => {
      console.log(1);   
      resolve(5);
      console.log(2);
    }).then(val => {
      console.log(val);
    });
    
    
    promise.then(() => {
      console.log(3);
    });
    
    
    console.log(4);
    
    
    setTimeout(function() {
      console.log(6);
    })
      </pre>
    </div>
  </div>
</template>

<script>

export default {
  name: 'yibuProblem',
  methods:{
    yibu1(){
      let self = this
      async function async1() {
        console.log('1');
        await async2();
        console.log('2'); 
      }

      async function async2() {
        console.log('3');
      }
      
      console.log('4');

      setTimeout(function() {
          console.log('5'); 
      }, 0)

      async1();

      new Promise(function(resolve) {
          console.log('6');
          resolve();
      }).then(function() {
          console.log('7');
      });

      console.log('8');
    },
    yibu2(){
      let self = this
      async function a1 () {
          console.log('a')    // 2
          await a2()
          console.log('b')    // 7
      }
      
      async function a2 () {
          console.log('c')           // 3
      }
      
      console.log('d')     // 1
      
      setTimeout(() => {
          console.log('e')  // 10
      }, 0)
      
      Promise.resolve().then(() => {
          console.log('f')     // 6
      })
      
      a1()
      
      let promise2 = new Promise((resolve) => {
          resolve('g')     // 8
          console.log('h')      // 4
      })
      
      promise2.then((res) => {
          console.log(res)
          Promise.resolve().then(() => {
              console.log('i')   // 9
          })
      })
      
      console.log('j') // 5
    },
    yibu3(){
      const promise = new Promise((resolve, reject) => {
        console.log(1);   
        resolve(5);
        console.log(2);
      }).then(val => {
        console.log(val);
      });
      
      
      promise.then(() => {
        console.log(3);
      });
      
      
      console.log(4);
      
      
      setTimeout(function() {
        console.log(6);
      })
    }
  }
}
</script>

<style scoped>
.codeDisplay{ 
  background: oldlace;
  border-radius: 10px;
  max-width: 100%;
  overflow-x: auto;
  padding: 8px;
  font-family: initial;
  margin: -16px 0 16px;
}
</style>