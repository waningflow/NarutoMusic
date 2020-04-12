import React from 'react';
import SheetCard from '@/shared/SheetCard';
import { getHistoryRecommend } from './service';
import './HistoryRecommend.less';

const HistoryRecomment = () => {
  const list = getHistoryRecommend();
  return (
    <div className="history-recommend-container">
      {list.map(item => (
        <SheetCard key={item} desc={`${item}歌曲推荐`}>
          <div className="history-recommend-sheet-box">{item.slice(5)}</div>
        </SheetCard>
      ))}
    </div>
  );
};

export default HistoryRecomment;
