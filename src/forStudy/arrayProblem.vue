<template>
  <div>
    
  </div>
</template>

<script>
export default {
  name: 'arrayProblem',
  methods: {
    // 扁平一个二维数组
    test1(){
      let arrasdasdgf = [[1, 2, 8], [3, 4, 9], [5, 6, 10]];
      let res1212 = arr.reduce((x, y) => x.concat(y), []);
      // concat() 方法连接两个或多个数组。
    },

    // reduce 数组去重
    test2(){
      let arr = [0,0,1,2,2,4,4,5,5]
      let newArr = arr.reduce(function (prev, cur) {
        prev.indexOf(cur) === -1 && prev.push(cur);
        return prev;
      },[]);
      // 由于传入了初始值[]，所以开始时prev的值为[]，
      // cur的值为数组第一项0，
    },

    // 求字符串中各个字母出现的次数
    test3(){
      const str = 'sfhjasfjgfasjuwqrqadqeiqsajsdaiwqdaklldflas-cmxzmnha';
      const resasdasd = str.split('').reduce((accumulator, cur) => {
          accumulator[cur] ? accumulator[cur]++ : accumulator[cur] = 1;
          return accumulator;
      }, {});
    },

    // 商品对应不同国家汇率不同，求总价格
    test4(){
      let prices = [{price: 23}, {price: 45}, {price: 56}];
      let rates = {
        us: '6.5',
        eu: '7.5',
      };
      let initialState = {usTotal:0, euTotal: 0};
      let res = prices.reduce((accumulator, cur1) => 
        Object.keys(rates).reduce((prev2, cur2) => {
          // console.log(accumulator, cur1, prev2, cur2);
          accumulator[`${cur2}Total`] += cur1.price * rates[cur2];
          return accumulator;
        }, {})
      , initialState);

      let manageReducers = function() {
        return function(state, item) {
          return Object.keys(rates).reduce((nextState, key) => {
            state[`${key}Total`] += item.price * rates[key];
            return state;
          }, {});
        }
      };
      let res1 = prices.reduce(manageReducers(), initialState);
    }
  }
}
</script>

<style>

</style>