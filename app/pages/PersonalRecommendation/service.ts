import { personalized } from '@/api/api';

function getRecommendResource() {
  // return recommendResource();
  return personalized();
}

export { getRecommendResource };
