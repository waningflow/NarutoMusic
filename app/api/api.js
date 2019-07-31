import axios from './request';

/**
 * 手机登录
 *
 * @param {Object} params
 * @param {string} params.phone 手机号
 * @param {string} params.password 密码
 * @return {Object}
 */
export function loginWithCellphone(params) {
  return axios.get('/login/cellphone', { params });
}

/**
 * 邮箱登录
 *
 * @param {Object} params
 * @param {string} params.email 163 网易邮箱
 * @param {string} params.password 密码
 * @return {Object}
 */
export function loginWithEmail(params) {
  return axios.get('/login', { params });
}

/**
 * 刷新登录
 */
export function loginRefresh() {
  return axios.get('/login/refresh');
}
