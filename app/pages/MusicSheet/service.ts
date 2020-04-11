import { recommendSongs } from '@/api/api';
import Logger from '@/utils/logger';
import { lsKey } from '@/constants/const';
import { lsGet, lsSet } from '@/utils/utils';
import { storage } from '@/storage';

const log = new Logger('MusicSheet');

function storeRecommendSonds(today: string, data: any) {
  let songs = storage.get(lsKey.RecommendSongs);
  if (!songs) songs = {};
  if (songs[today]) return;
  songs[today] = data;
  storage.set({ [lsKey.RecommendSongs]: songs });
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

export { log, getRecommendSongs };
