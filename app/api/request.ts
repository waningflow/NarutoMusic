import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

const instance = axios.create({
  baseURL: 'http://waningflow.com:3002',
  timeout: 5000
});

AxiosLogger.setGlobalConfig({
  prefixText: 'Send Http',
  headers: true
});

instance.interceptors.request.use(request => {
  return AxiosLogger.requestLogger(request);
});

instance.interceptors.response.use(
  response => {
    return AxiosLogger.responseLogger(response);
  },
  err => {
    return AxiosLogger.errorLogger(err);
  }
);

export default instance;
