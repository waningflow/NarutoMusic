import axios from 'axios';
import { Alert } from 'rsuite';
import Logger from '@/utils/logger';
import { lsKey } from '@/constants/const';
import { lsSet, lsGet } from '@/utils/utils';

const log = new Logger('ApiRequest');

const instance = axios.create({
  baseURL: 'http://waningflow.com:3002',
  withCredentials: true,
  timeout: 30000
});

instance.interceptors.request.use(request => {
  log.info('HTTP start', request);
  return request;
});

instance.interceptors.response.use(
  response => {
    log.info('HTTP success', response);
    return response.data;
  },
  err => {
    log.err('HTTP error', err);
    Alert.error(err.response.body.msg || err.message);
    if (err.response && err.response.status === 301 && lsGet(lsKey.USER_INFO)) {
      lsSet(lsKey.USER_INFO, null, false);
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export default instance;
