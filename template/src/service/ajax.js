import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { getStore } from '@/components/date';
// import qs from 'qs';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000, // request timeout
  responseType: 'json'
});
// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getStore('token')) {
    config.headers.token = getStore('token');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 返回状态拦截器
service.interceptors.response.use((res) => {
  let ifStatus = res.data.status !== 0 && res.data.status !== -1;
  if (ifStatus && res.config.responseType === 'json') {
    if (res.data.status === -40100) {
      let errorMeg = '您的用户信息已过期，请重新登录';
      console.log(Vue);
      Vue.prototype.$alert(errorMeg, '请求出错了！', {
        confirmButtonText: '确定',
        callback: () => {
          store.dispatch('FedLogOut').then(() => {
            router.push({path: '/login'});
          });
        }
      });
    } else {
      let errorMeg = res.data.message;
      Vue.prototype.$alert(errorMeg, '请求出错了！', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
    }
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  // 404等问题可以在这里处理
  Vue.prototype.$alert(error.message, '请求出错了！', {
    confirmButtonText: '确定',
    callback: action => {
    }
  });
  return Promise.reject(error);
});

export default service
