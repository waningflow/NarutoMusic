import { storage } from '@/storage';
import { lsKey } from '@/constants/const';

function getHistoryRecommend(): string[] {
  return storage.get(lsKey.HistoryRecommendKeys) || [];
}

export { getHistoryRecommend };
