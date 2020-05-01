import { storage } from '@/storage';
import { Music } from '@/types';
import { lsKey } from '@/constants/const';

function getHistoryRecommend(): { [dateKey: string]: Music[] } {
  return storage.get(lsKey.HistoryRecommend) || [];
}

export { getHistoryRecommend };
