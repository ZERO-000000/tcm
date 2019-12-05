// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false;
axios.defaults.baseURL = '/sy';
axios.defaults.crossDomain=true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization']=localStorage.getItem('token');
//添加一个请求拦截器
axios.interceptors.request.use(function(config){
  //在请求发出之前进行一些操作
  return config;
},function(err){
  //Do something with request error
  return Promise.reject(error);
});
//添加一个响应拦截器
axios.interceptors.response.use(function(res){
  //在这里对返回的数据进行处理
  return res;
},function(err){
  //Do something with response error
  return Promise.reject(error);
})
//如果未登录，跳转到登录页面；如果已经登录，确保要调用next()方法，否则钩子就不会被resolved
router.beforeEach((to, from, next)=>{
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some(record => record.meta.requireAuth)){
    //console.log('需要登录');
    if (localStorage.token){
      // 判断当前的token是否存在 ； 登录存入的token
      //console.log("localStorage.token"+localStorage.token);
      next();
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else{
    next();
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(App),
  components: { App },
  template: '<App/>'
})
