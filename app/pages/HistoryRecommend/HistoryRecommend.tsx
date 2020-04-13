import React from 'react';
import { useHistory } from 'react-router-dom';
import SheetCard from '@/shared/SheetCard';
import { getHistoryRecommend } from './service';
import './HistoryRecommend.less';

const HistoryRecomment = () => {
  const list = getHistoryRecommend();
  const history = useHistory();

  const handleClickSheetCard = (date: string) => {
    history.push(`/music_sheet?type=history_recommend&date=${date}`);
  };
  return (
    <div className="history-recommend-container">
      {list.map(item => (
        <SheetCard
          key={item}
          desc={`${item}歌曲推荐`}
          onClick={() => handleClickSheetCard(item)}
        >
          <div className="history-recommend-sheet-box">{item.slice(5)}</div>
        </SheetCard>
      ))}
    </div>
  );
};

export default HistoryRecomment;
