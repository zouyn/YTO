// import { loginByUsername, logout, getUserInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { setStore, getStore, removeStore } from '@/components/date';
import { accountLoginAPI } from '@/service/index';

const user = {
  state: {
    user: '',
    token: getStore('token'),
    name: '',
    empNo: '',
    userOrgType: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setStore('token', token);
    },
    SET_NAME: (state, name) => {
      setStore('name', name);
      state.name = getStore('name');
    },
    SET_EMPNO: (state, empNo) => {
      setStore('empNo', empNo);
      state.empNo = getStore('empNo');
    },
    SET_ORGTYPE: (state, userOrgType) => {
      setStore('userOrgType', userOrgType);
      state.userOrgType = getStore('userOrgType');
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({commit}, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        accountLoginAPI(username, userInfo.password).then(response => {
          const data = response.data;
          if (data) {
            commit('SET_TOKEN', data.accessToken);
            commit('SET_EMPNO', data.empNo);
            commit('SET_NAME', data.userName);
            commit('SET_ORGTYPE', data.userOrgType);
            resolve();
          } else {
            reject(response.message);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 前端 登出
    LogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeStore('token');
        resolve();
      });
    }
  }
};

export default user;
