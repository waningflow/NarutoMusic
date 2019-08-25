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
  console.log(params);
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

/**
 * 登录状态
 *
 * @return {Object}
 */
export function loginStatus() {
  return axios.get('/login/status');
}

/**
 * 邮箱登录
 *
 * @param {number} uid
 * @return {Object}
 */
export function userDetail(uid) {
  return axios.get('/user/detail', { params: { uid } });
}

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 *
 * @return {Object}
 */
export function userSubcount() {
  return axios.get('/user/subcount');
}

/**
 * 获取用户歌单
 *
 * @param {number} uid
 * @return {Object}
 */
export function userPlaylist(uid) {
  return axios.get('/user/playlist', { params: { uid } });
}

/**
 * 获取歌单详情
 *
 * @param {number} id 歌单 id
 * @return {Object}
 */
export function playlistDetail(id) {
  return axios.get('/playlist/detail', { params: { id } });
}

/**
 * 获取歌单详情
 *
 * @param {number} id 音乐 id，多个用逗号间隔
 * @return {Object}
 */
export function songUrl(id) {
  return axios.get('/song/url', { params: { id } });
}
