import React, { ReactNode } from 'react';
import './SheetCard.less';

interface Props {
  picUrl?: string;
  desc: string;
  children?: ReactNode;
}

const SheetCard = (props: Props) => {
  const { desc, children } = props;
  return (
    <div className="sheet-card-container">
      <div className="sheet-card-box">{children}</div>
      <div className="sheet-card-desc">{desc}</div>
    </div>
  );
};

export default SheetCard;
