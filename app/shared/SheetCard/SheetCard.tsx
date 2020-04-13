import React, { ReactNode } from 'react';
import './SheetCard.less';

interface Props {
  picUrl?: string;
  desc: string;
  children?: ReactNode;
  onClick?: () => void;
}

const SheetCard = (props: Props) => {
  const { desc, children, onClick } = props;
  return (
    <div className="sheet-card-container" onClick={onClick}>
      <div className="sheet-card-box">{children}</div>
      <div className="sheet-card-desc">{desc}</div>
    </div>
  );
};

export default SheetCard;
