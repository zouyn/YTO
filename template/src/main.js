{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue';
import App from './App';
{{#router}}
import router from './router';
{{/router}}
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ECharts from 'vue-echarts/components/ECharts';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUI, {size: 'mini'});
Vue.component('chart', ECharts);

// you can set only in production env show the error-log
if (process.env.NODE_ENV === 'development') {
    Vue.config.errorHandler = function (err, vm, info, a) {
      // Don't ask me why I use Vue.nextTick, it just a hack.
      // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
      Vue.nextTick(() => {
        store.dispatch('addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      });
      console.error(err, info);
    });
    };
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
    store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
