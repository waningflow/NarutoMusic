import React, { ReactNode } from 'react';
import './SheetCard.less';

interface Props {
  picUrl?: string;
  desc: string;
  children?: ReactNode;
  onClick?: () => void;
  backImgUrl?: string;
  boxStyle?: any;
}

const SheetCard = (props: Props) => {
  const { desc, children, onClick, backImgUrl, boxStyle } = props;
  const backStyle = backImgUrl ? { backgroundImage: `url(${backImgUrl})` } : {};
  return (
    <div className="sheet-card-container" onClick={onClick}>
      <div className="sheet-card-box" style={{ ...backStyle, ...boxStyle }}>
        {children}
      </div>
      {/* <div className="sheet-card-desc">{desc}</div> */}
    </div>
  );
};

export default SheetCard;
