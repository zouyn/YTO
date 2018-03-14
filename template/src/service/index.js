import ajax from './ajax';

// 账号密码登录
export function accountLoginAPI(account, password) {
  return ajax({
    url: 'api/loginController/login',
    method: 'post',
    params: {account, password}
  })
}
