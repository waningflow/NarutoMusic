import React from 'react';
import { useHistory } from 'react-router-dom';
import SheetCard from '@/shared/SheetCard';
import { uuid } from '@/utils/utils';
import { getHistoryRecommend } from './service';
import './HistoryRecommend.less';

const HistoryRecommend = () => {
  const list = getHistoryRecommend();
  const history = useHistory();

  const handleClickSheetCard = (date: string) => {
    history.push(`/music_sheet?type=history_recommend&date=${date}#${uuid()}`);
  };
  return (
    <div className="history-recommend-container">
      <div className="page-content-container">
        {Object.keys(list)
          .reverse() // 时间倒序
          .slice(1) // 不显示当天
          .map((dateKey: string) => {
            return (
              <SheetCard
                key={dateKey}
                // desc={`${dateKey}歌曲推荐`}
                picUrl={list[dateKey][0].album?.picUrl}
                onClick={() => handleClickSheetCard(dateKey)}
              >
                <div className="history-recommend-sheet-box">
                  {dateKey.slice(5)}
                </div>
              </SheetCard>
            );
          })}
      </div>
    </div>
  );
};

export default HistoryRecommend;
