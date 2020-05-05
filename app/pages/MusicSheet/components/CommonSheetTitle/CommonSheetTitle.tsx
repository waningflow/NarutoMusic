import React from 'react';
import cn from 'classnames';
import { Button, Panel } from 'rsuite';
import SheetCard from '@/shared/SheetCard';
import { PlaylistDetail } from '@/types';
import Collapse from '@/shared/Collapse';
import { getDate, parsePlaycount } from '@/utils/utils';
import './CommonSheetTitle.less';

interface Props {
  onClickPlayAll: () => void;
  playlistDetail?: PlaylistDetail;
}

function CommonSheetTitle(props: Props) {
  const { onClickPlayAll, playlistDetail } = props;
  const {
    name,
    description,
    creator,
    trackCount,
    playCount,
    coverImgUrl,
    createTime,
    tags
  } = playlistDetail || {};
  const { userId, nickname, avatarUrl } = creator || {};
  if (!playlistDetail) {
    return null;
  }
  return (
    <div className="common-sheet-title-container">
      <div className="common-sheet-title-pic">
        <SheetCard picUrl={coverImgUrl || ''} />
      </div>
      <div className="common-sheet-title-content">
        <div className="common-sheet-title">{name}</div>
        {creator && (
          <div className="common-sheet-creator">
            <div
              className="creator-icon"
              style={{ backgroundImage: `url(${avatarUrl})` }}
            />
            <div className="creator-nickname">{nickname}</div>
            {createTime && (
              <div className="creator-time">
                {getDate(createTime)}
                创建
              </div>
            )}
          </div>
        )}
        <div className="common-title-btn-group">
          <Button appearance="primary" size="sm" block onClick={onClickPlayAll}>
            <i className="iconfont iconplay" />
            播放全部
          </Button>
        </div>

        {tags && (
          <div className="common-sheet-tags">
            <span>标签</span>
            {`：${tags.join('/')}`}
          </div>
        )}
        {(trackCount || playCount) && (
          <div className="common-sheet-count">
            {trackCount && (
              <>
                <span>歌曲数：</span>
                {trackCount}
              </>
            )}
            {playCount && (
              <>
                <span style={{ marginLeft: '10px' }}>播放数：</span>
                {parsePlaycount(playCount)}
              </>
            )}
          </div>
        )}
        {description && (
          <Collapse>
            <pre className="common-sheet-desc">
              <span>简介</span>
              {`：${description}`}
            </pre>
          </Collapse>
        )}
      </div>
    </div>
  );
}

export default CommonSheetTitle;
