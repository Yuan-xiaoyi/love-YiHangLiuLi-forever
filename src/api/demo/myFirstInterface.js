//引入request文件
import instance from '../index';
 
//导出封装ok的请求
 
//查询需求申请列表,getURLList为请求名
const api = {
  /**
   * 若要传参
   * GET 用 params
   * POST 用 data
   */
  getURLList: () => {
    return instance({
      url: '/getUsers',
      method: 'get',
    })
  },

  login: (data) => {
    return instance({
      url: '/login',
      method: 'post',
      //请求传递的参数
      data: data, 
    })
  },
  
  register: (data) => {
    return instance({
      url: '/register',
      method: 'get',
      //请求传递的参数
      params: data, 
    })
  },

  del: (data) => {
    return instance({
      url: '/delUser',
      method: 'POST',
      //请求传递的参数
      data: data, 
    })
  },
}
export default api;