import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/';
import { getStore } from '../components/date';

// 路由列表
Vue.use(Router);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./modules', false, /\.js$/);
const modulesMap = requireAll(req);
export let modulesRouterMap = [];
modulesMap.forEach(item => {
  modulesRouterMap = modulesRouterMap.concat(item.routerMap);
});

const router = new Router({
  routes: modulesRouterMap
});

const whiteList = ['/login', '/authredirect']; // no redirect whitelist

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

router.beforeEach((to, from, next) => {
  if (getStore('token')) { // determine if there has token
    if (to.path === '/login') {
      next({path: '/'});
    } else {
      if (hasPermission(store.getters.roles, to.meta.roles)) {
        next();
      } else {
        next({path: '/401', replace: true, query: {noGoBack: true}});
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});

export default router;
