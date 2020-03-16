import { pick } from 'lodash';
import { mockApi } from '@/utils/utils';
import { loginRes, recommendSonsRes } from './mock';
import axios from './request';

/**
 * 手机登录
 */
interface LoginWithCellphoneIn {
  phone: string;
  password: string;
}
interface LoginWithCellphoneRes {
  code: number;
  loginType: number;
  account: { [key: string]: any };
  token: string;
  profile: { [key: string]: any };
  bindings: { [key: string]: any }[];
}
export function loginWithCellphone(
  params: LoginWithCellphoneIn
): Promise<LoginWithCellphoneRes> {
  // return axios.get('/login/cellphone', { params });
  return mockApi(loginRes);
}

/**
 * 邮箱登录
 */
interface LoginWithEmailIn {
  email: string;
  password: string;
}
export function loginWithEmail(params: LoginWithEmailIn) {
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
 */
export function userDetail(uid: string) {
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
 */
export function userPlaylist(uid: string) {
  return axios.get('/user/playlist', { params: { uid } });
}

/**
 * 获取歌单详情
 */
export function playlistDetail(id: string) {
  return axios.get('/playlist/detail', { params: { id } });
}

/**
 * 获取歌单详情。音乐 id，多个用逗号间隔
 */
export function songUrl(id: string) {
  return axios.get('/song/url', { params: { id } });
}

interface RecommendSongsAPIRes {
  code: number;
  recommend: any[];
  data: any;
}
// 获取推荐歌曲
export async function recommendSongs() {
  // return axios.get('/recommend/songs');
  const res = await mockApi(recommendSonsRes);
  const result = res.recommend.map(v =>
    pick(v, ['name', 'id', 'artists', 'album', 'hMusic'])
  );
  return result;
}
