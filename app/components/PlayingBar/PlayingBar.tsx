import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parseTime } from '@/utils/utils';
import { updatePlaylist } from '@/actions/playlist';
import './PlayingBar.less';

const refreshInterval = 500;

let audioNode: any = null;
let refreshTime: any = null;

let musicInfo = {};

const PlayingBar = () => {
  // const [volume, setVolumn] = useState(50);

  const dispatch = useDispatch();
  const { paused, currentTime, playing, list, reset } = useSelector(
    state => state.playlist
  );
  musicInfo = playing || {};

  if (reset === 1 && audioNode) {
    setTimeout(() => {
      audioNode.play();
      dispatch(updatePlaylist({ paused: false }));
    });
  }

  useEffect(() => {
    const refresh = () => {
      if (audioNode) {
        dispatch(
          updatePlaylist({ currentTime: parseInt(audioNode.currentTime, 10) })
        );
        if (audioNode.paused) {
          dispatch(updatePlaylist({ paused: true }));
        }
      }
      refreshTime = setTimeout(refresh, refreshInterval);
    };
    if (paused) {
      if (refreshTime) clearTimeout(refreshTime);
    } else {
      refresh();
    }
    return () => {
      if (refreshTime) clearTimeout(refreshTime);
      refreshTime = null;
    };
  }, [paused]);

  const handleClickPlay = () => {
    if (!musicInfo || !musicInfo.url) return;
    if (paused) {
      audioNode.play();
    } else {
      audioNode.pause();
    }
    dispatch(updatePlaylist({ paused: !paused }));
  };

  return (
    <div className="playing-bar-container">
      <audio
        src={musicInfo.url || ''}
        ref={node => {
          audioNode = node;
        }}
      />
      <div className="playing-bar-chip">
        <div
          className="playing-bar-chip-pic"
          style={{
            backgroundImage: `url(${
              musicInfo.album ? musicInfo.album.picUrl : ''
            })`
          }}
        />
        <div className="playing-bar-text">
          <div className="playing-bar-text-name">
            {musicInfo.name || ''}
            {musicInfo.artists && (
              <span>{musicInfo.artists.map(v => v.name).join('/')}</span>
            )}
          </div>
          <div className="playing-bar-text-time">
            {parseTime(currentTime)}
            {musicInfo.hMusic && (
              <span>
                <span style={{ margin: '0 4px' }}>/</span>
                {parseTime(musicInfo.hMusic.playTime / 1000)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="playing-bar-center-control">
        <div
          role="button"
          tabIndex={0}
          className="playing-bar-play-btn"
          onClick={handleClickPlay}
          onKeyUp={e => {
            // 监听空格，后续改成全局快捷键
            if (e.keyCode === 32) handleClickPlay();
          }}
        >
          {paused ? (
            <div className="playing-bar-play-triangle" />
          ) : (
            <div className="playing-bar-play-doublelines">
              <div className="playing-bar-play-line" />
              <div className="playing-bar-play-line" />
            </div>
          )}
        </div>
      </div>
      <div className="playing-bar-right-control" />
    </div>
  );
};

export default PlayingBar;
