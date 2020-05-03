import React from 'react';
import cn from 'classnames';
import { Button } from 'rsuite';
import { getToday } from '@/utils/utils';
import SheetCard from '@/shared/SheetCard';
import './DaySheetTitle.less';

interface Props {
  onClickPlayAll: () => void;
  date: string;
  picUrl: string;
}

function DaySheetTitle(props: Props) {
  const { onClickPlayAll, date, picUrl } = props;
  return (
    <div className="day-sheet-title-container">
      <div className="day-sheet-title-pic">
        <SheetCard picUrl={picUrl}>
          <div
            className={cn('day-sheet-title-pic-text', {
              'is-today': date === getToday()
            })}
          >
            {date}
          </div>
        </SheetCard>
      </div>
      <div className="day-sheet-title-content">
        <div className="day-sheet-title">
          {/* <span>{date}</span> */}
          每日歌曲推荐
        </div>
        <div className="day-sheet-subtitle">根据你的音乐口味生成</div>
        <Button appearance="primary" size="sm" block onClick={onClickPlayAll}>
          <i className="iconfont iconplay" />
          播放全部
        </Button>
      </div>
    </div>
  );
}

export default DaySheetTitle;
