/* eslint-disable no-bitwise */
import moment from 'moment';

function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function mockApi(data: any, time = 1500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

function num2str(initNum = 0, d = 2) {
  let num = initNum;
  for (let i = 0; i < d; i += 1) {
    num /= 10;
  }
  return num.toFixed(d).slice(-d);
}

function parseTime(ts = 0) {
  const min = Math.floor(ts / 60);
  const sec = Math.floor(ts % 60);
  return `${num2str(min)}:${num2str(sec)}`;
}

function findNext<T>(
  list: T[] = [],
  val: string | number,
  i = 1,
  loop = true
): T | null {
  const { length } = list;
  const index = list.indexOf(val);
  if (index === -1) return list[0];
  const nIndex = index + i;
  if (nIndex < length) return list[nIndex];
  if (loop) return list[0];
  return null;
}

function lsGet(key: string, defaultVal: any = null, isJson = true) {
  const resultStr = localStorage.getItem(key);
  if (!resultStr) return defaultVal;
  if (!isJson) return resultStr || defaultVal;
  let result;
  try {
    result = JSON.parse(resultStr);
  } catch (e) {
    result = defaultVal;
  }
  return result;
}

function lsSet(key: string, val: any, isJson = true) {
  let valStr;
  if (isJson) {
    try {
      valStr = JSON.stringify(val);
    } catch (e) {
      valStr = '';
    }
  } else {
    valStr = val;
  }
  localStorage.setItem(key, valStr);
}

function getToday() {
  return moment().format('MM-DD');
}

function parsePlaycount(num: number) {
  return num >= 100000 ? `${Math.floor(num / 10000)}万` : num;
}

function getDate(num: number) {
  if (!num) return '';
  return moment(num)
    .add(8, 'h')
    .format('YYYY-MM-DD');
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export {
  sleep,
  mockApi,
  parseTime,
  num2str,
  findNext,
  lsGet,
  lsSet,
  getToday,
  parsePlaycount,
  getDate,
  uuid
};
