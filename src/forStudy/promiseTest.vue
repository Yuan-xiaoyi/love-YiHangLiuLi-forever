<template>
  <div>
    Promise.all() 异步变同步 用法
  </div>
</template>

<script>
  // let testArr = []
  // const getBaseMaps = function(baseMap){
  //   return new Promise((resolve, reject) => {
  //     RestServices.call(RestServices.rest.getBaseMapResource, {"catalogId": baseMap.id,"appId": self.app.appid}).then(data => {
  //       let backArr = JSON.parse(data)
  //       if(backArr && backArr.length > 0){
  //         resolve(backArr)
  //       }
  //     })
  //   })
  // }
  // RestServices.call(RestServices.rest.queryBaseCatalogByAppId, {"appId": self.app.appid}).then(data => { // baseMaps
  //   let fun = []
  //   data.forEach(baseMap => {
  //     fun.push(getBaseMaps(baseMap))
  //   })
  //   Promise.all(fun).then(da => {
  //     da.forEach(backMaps => {
  //       backMaps.forEach(backMap => {
  //         testArr.push(backMap)
  //       })
  //     })
  //     if(testArr && testArr.length > 0){
  //       ele.options.push({label: 'baseMaps', children: getMapArr(testArr, 'baseMaps'), disabled: true})
  //     }
  //   })
  // }).catch(err => {
  //   $error(err)
  // })
export default {
  
}
</script>

<style>

</style>