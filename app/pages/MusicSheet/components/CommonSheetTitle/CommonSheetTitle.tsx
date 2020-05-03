import React from 'react';
import cn from 'classnames';
import { Button } from 'rsuite';
import SheetCard from '@/shared/SheetCard';
import { PlaylistDetail } from '@/types';
import './CommonSheetTitle.less';

interface Props {
  onClickPlayAll: () => void;
  playlistDetail: PlaylistDetail | {};
}

function CommonSheetTitle(props: Props) {
  const { onClickPlayAll, playlistDetail } = props;
  const {
    name,
    description,
    creator,
    trackCount,
    playCount,
    coverImgUrl
  } = playlistDetail;
  return (
    <div className="common-sheet-title-container">
      <div className="common-sheet-title-pic">
        <SheetCard picUrl={coverImgUrl || ''} />
      </div>
      <div className="common-sheet-title-content">
        <div className="common-sheet-title">{name}</div>
        <div className="common-sheet-subtitle">{description}</div>
        <Button appearance="primary" size="sm" block onClick={onClickPlayAll}>
          <i className="iconfont iconplay" />
          播放全部
        </Button>
      </div>
    </div>
  );
}

export default CommonSheetTitle;
