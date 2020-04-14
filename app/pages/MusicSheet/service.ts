import { recommendSongs } from '@/api/api';
import Logger from '@/utils/logger';
import { lsKey } from '@/constants/const';
import { lsGet, lsSet } from '@/utils/utils';
import { storage } from '@/storage';

const log = new Logger('MusicSheet');

function storeRecommendSonds(today: string, data: any) {
  let keys = storage.get(lsKey.HistoryRecommendKeys);
  if (!keys) {
    keys = [];
    storage.set(lsKey.HistoryRecommendKeys, []);
    storage.set(lsKey.HistoryRecommend, {});
  }
  if (keys.indexOf(today) === -1) {
    keys.unshift(today);
    storage.set(lsKey.HistoryRecommendKeys, keys);
    storage.set(`${lsKey.HistoryRecommend}.${today}`, data);
  }
}

async function getRecommendSongs() {
  const d = new Date();
  const today = d.toJSON().split('T')[0];
  const yestoday = new Date(d.getTime() - 86400000).toJSON().split('T')[0];
  // 每日推荐六点更新，预留15分钟缓冲期，6点15之前的数据视为昨天的，不保存
  const isAfterSix = d.getHours() >= 6 && d.getMinutes() >= 15;
  const targetDate = isAfterSix ? today : yestoday;
  let result = lsGet(lsKey.RecommendSongs, {})[targetDate];

  if (!result) {
    try {
      const res = await recommendSongs();
      lsSet(lsKey.RecommendSongs, { [targetDate]: res });
      result = res;
    } catch (e) {
      log.err('get recomment songs from api err');
    }
  }

  if (result && isAfterSix) storeRecommendSonds(targetDate, result);
  return result;
}

function getHistoryRecommendSongs(date: string) {
  return storage.get(`${lsKey.HistoryRecommend}.${date}`);
}

export { log, getRecommendSongs, getHistoryRecommendSongs };
