// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'lib-flexible'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store/index'
import Axios from 'axios'
import 'common/scss/index.scss'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'common/js/http'
import urlstate from 'common/js/state'
import 'common/fonts/buy.css'
import $ from 'jquery'
import wx from 'weixin-js-sdk'
import * as filters from 'common/js/filters'
import filter from 'common/js/ESC'
import api from 'common/js/api'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

fastClick.attach(document.body)
Vue.use(VueLazyLoad,{
  loading:require('./common/image/defaultimg.png')
});

Vue.use(Mint)
Vue.prototype.filters=filters
Vue.prototype.filter=filter
Vue.prototype.$axios=Axios
Vue.prototype.$urlstate=urlstate
Vue.prototype.$api = api
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
mounted(){

}
})
