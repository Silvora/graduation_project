import axios from 'axios'
import { Message } from 'element-ui'
 
const http = axios.create({
  timeout: 5000,
  baseURL: 'http://localhost:1991/api',  //与proxy中的api地址一致
  //baseURL: 'http://192.168.1.54:8092/yuye_spring/v1',
  //baseURL: 'http://192.168.1.116:8092/yuye_spring/v1',
  //headers: 'token',
  validateStatus(status) {
    switch (status) {
      case 400:
        Message.error('请求出错')
        break
      case 401:
        Message.warning({
          message: '授权失败，请重新登录'
        })
        // store.commit('LOGIN_OUT')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        return
      case 403:
        Message.warning({
          message: '拒绝访问'
        })
        break
      case 404:
        Message.warning({
          message: '请求错误,未找到该资源'
        })
        break
      case 500:
        Message.warning({
          message: '服务端错误'
        })
        break
    }
    return status >= 200 && status < 300
  }
})

// http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// //添加请求拦截器
// http.interceptors.request.use(
//   function (config) {
//     const token = window.localStorage.getItem('token')
//     //console.log(token)
//     if(token){
//         //const token = window.localStorage.getItem('token')
//         config.headers.common['X-token'] = token;
       
//     }
//     return config
//   },
//   function (error) {
//       //console.log(error)
//     return Promise.reject(error)
//   }
// )
 
// //响应拦截器即异常处理
// http.interceptors.response.use(
//   response => {
//     return response
//   },
//   err => {
//     err.message = '连接服务器失败'
//     // if (err && err.response) {
//     // } else {
//     //   err.message = '连接服务器失败'
//     // }
//     return Promise.reject(err)
//   }
// )
 

export default http
