/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import qs from 'qs'
import {
  Indicator,
  Toast
} from 'mint-ui'
import state from './state'
// 超时时间
//axios.defaults.timeout = 5000
// //测试
// axios.defaults.baseURL = 'https://192.168.2.243'
// axios.defaults.baseURL = 'http://186977m3k1.iask.in:33428/'

var publish_version = false; // 是否为正式版本。
if (publish_version) {
  // 线上
  axios.defaults.baseURL = 'https://mp.juyooo.com/'
} else {
  //测试
  axios.defaults.baseURL = 'https://test.cheertea.com/api/'
}
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'



// http请求拦截器
axios.interceptors.request.use(config => {

  if (config.method == 'post') {
    config.data = qs.stringify(config.data)
  }

  // element ui Loading方法
  Indicator.open({
    text: '加载中...',
    spinnerType: 'triple-bounce'
  });
  return config
}, error => {
  // Indicator.close()
  Toast({
    message: '加载超时',
    position: 'middle'
  });
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  Indicator.close()
  return data
}, error => {
  Indicator.close()
  Toast({
    message: '加载失败',
    position: 'middle'
  });
  return Promise.reject(error)
})

export default axios
