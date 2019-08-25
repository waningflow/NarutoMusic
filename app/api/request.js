import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://waningflow.com:3002',
  timeout: 5000
});

export default instance;
