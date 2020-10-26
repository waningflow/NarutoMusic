import { storage } from '@/storage';
// import { Music } from '@/types';
import { lsKey } from '@/constants/const';

function getHistoryRecommend(): {
  [dateKey: string]: { [key: string]: any };
} {
  const data = storage.get(lsKey.HistoryRecommend) || {};
  const result: any = {};
  Object.keys(data).forEach(key => {
    result[key] = {
      picUrl: data[key][0].album?.picUrl
    };
  });
  return result;
}

export { getHistoryRecommend };
