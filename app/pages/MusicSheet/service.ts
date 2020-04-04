import { recommendSongs } from '@/api/api';
import Logger from '@/utils/logger';

const log = new Logger('MusicSheet');

const StorageKey = {
  RecommendSongs: 'N_Recommennd_Songs'
};

async function getRecommendSongs() {
  const today = new Date().toJSON().split('T')[0];
  let result;
  try {
    const resStr = localStorage.getItem(StorageKey.RecommendSongs);
    if (resStr) {
      const res = JSON.parse(resStr);
      if (res[today]) {
        result = res[today];
      }
    }
  } catch (e) {
    log.err('get recomment songs from localstorage err');
  }
  if (!result) {
    try {
      const res = await recommendSongs();
      localStorage.setItem(
        StorageKey.RecommendSongs,
        JSON.stringify({ [today]: res })
      );
      result = res;
    } catch (e) {
      log.err('get recomment songs from api err');
    }
  }
  return result;
}

export { log, getRecommendSongs };
