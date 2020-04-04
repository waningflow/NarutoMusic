import axios from 'axios';
import { Alert } from 'rsuite';
import Logger from '@/utils/logger';

const log = new Logger('ApiRequest');

const instance = axios.create({
  baseURL: 'http://waningflow.com:3002',
  withCredentials: true,
  timeout: 8000
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
    Alert.error(err.message);
    return err;
  }
);

export default instance;
