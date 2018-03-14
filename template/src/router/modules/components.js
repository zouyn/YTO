const _import = require('../_import_' + process.env.NODE_ENV);
export const routerMap = [
  {
    path: '',
    component: _import('login'),
    redirect: '/home',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: _import('home/loginBox')
      },
      {
        path: '/home',
        name: 'Home',
        component: _import('home/homeBox')
      }
    ]
  },
  {path: '/404', component: _import('errorPage/404')},
  {path: '/401', component: _import('errorPage/401')},
  {path: '*', redirect: '/404'}
];

export default routerMap;
