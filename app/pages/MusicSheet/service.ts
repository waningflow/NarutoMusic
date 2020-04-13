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
  const today = new Date().toJSON().split('T')[0];
  let result = lsGet(lsKey.RecommendSongs, {})[today];

  if (!result) {
    try {
      const res = await recommendSongs();
      lsSet(lsKey.RecommendSongs, { [today]: res });
      result = res;
    } catch (e) {
      log.err('get recomment songs from api err');
    }
  }
  if (result) storeRecommendSonds(today, result);
  return result;
}

function getHistoryRecommendSongs(date: string) {
  return storage.get(`${lsKey.HistoryRecommend}.${date}`);
}

export { log, getRecommendSongs, getHistoryRecommendSongs };
