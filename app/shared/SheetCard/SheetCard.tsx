import React, { ReactNode } from 'react';
import { parsePlaycount } from '@/utils/utils';
import './SheetCard.less';

interface Props {
  picUrl?: string;
  desc?: string;
  playcount?: number;
  children?: ReactNode;
  onClick?: () => void;
  boxStyle?: any;
}

const SheetCard = (props: Props) => {
  const { desc, playcount, children, onClick, picUrl, boxStyle } = props;
  const backStyle = picUrl ? { backgroundImage: `url(${picUrl})` } : {};
  return (
    <div className="sheet-card-container" onClick={onClick}>
      <div className="sheet-card-box" style={{ ...backStyle, ...boxStyle }}>
        {children}
      </div>
      {desc && <div className="sheet-card-desc">{desc}</div>}
      {playcount && (
        <div className="sheet-card-playcount-container">
          <div className="sheet-card-playcount">
            <i className="iconfont iconplay1" />
            {parsePlaycount(playcount)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SheetCard;
