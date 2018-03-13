import {post, get} from './ajax';

// 账号密码登录
export const accountLoginAPI(account, password) => post('api/loginController/login', {account, password});
