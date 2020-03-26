import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider, Alert } from 'rsuite';
import cn from 'classnames';
import { parseTime } from '@/utils/utils';
import { updatePlaylist } from '@/actions/playlist';
import './PlayingBar.less';

const refreshInterval = 500;

let audioNode: any = null;
let refreshTime: any = null;

let musicInfo = {};

const audioPlay = node => {
  try {
    node.play();
  } catch (e) {
    console.log(e);
    Alert.error(e.message);
  }
};

const PlayingBar = () => {
  // const [volume, setVolumn] = useState(50);

  const dispatch = useDispatch();
  const {
    paused,
    currentTime,
    playing,
    list,
    reset,
    playingIndex
  } = useSelector(state => state.playlist);
  musicInfo = playing || {};

  if (reset === 1 && audioNode) {
    setTimeout(() => {
      audioPlay(audioNode);
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
      audioPlay(audioNode);
    } else {
      audioNode.pause();
    }
    dispatch(updatePlaylist({ paused: !paused }));
  };

  const handleClickSwitch = (direction: number) => {
    const nIndex = playingIndex + direction;
    if (!list[nIndex]) return;
    dispatch(
      updatePlaylist({ playing: list[nIndex], playingIndex: nIndex, reset: 1 })
    );
  };

  const hanldeChangeProgress = value => {
    const cTime = (value * musicInfo.hMusic.playTime) / 100000;
    dispatch(
      updatePlaylist({
        currentTime: cTime
      })
    );
    if (audioNode) audioNode.currentTime = cTime;
  };

  const playProgress = musicInfo.hMusic
    ? Number(((currentTime * 100000) / musicInfo.hMusic.playTime).toFixed(1))
    : 0;

  return (
    <div className="playing-bar-container">
      <audio
        src={musicInfo.url || ''}
        ref={node => {
          audioNode = node;
        }}
      />
      <div className="playing-bar-stepline">
        {musicInfo.hMusic && (
          <>
            <div
              className="playing-bar-stepline-progress"
              style={{
                width: `${playProgress}%`
              }}
            />
            <Slider
              progress
              value={playProgress}
              tooltip={false}
              onChange={hanldeChangeProgress}
            />
          </>
        )}
      </div>
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
            {musicInfo.hMusic && (
              <>
                {parseTime(currentTime)}
                <span style={{ margin: '0 4px' }}>/</span>
                {parseTime(musicInfo.hMusic.playTime / 1000)}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="playing-bar-center-control">
        <div
          role="button"
          tabIndex={0}
          className={cn('playing-bar-triangle', 'playing-bar-pre-btn', {
            'playing-bar-btn-disable': !list[playingIndex - 1]
          })}
          onClick={() => handleClickSwitch(-1)}
          onKeyUp={() => {}}
        >
          <div className="playing-bar-line" />
        </div>
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
            <div className="playing-bar-triangle" />
          ) : (
            <div className="playing-bar-play-doublelines">
              <div className="playing-bar-play-line" />
              <div className="playing-bar-play-line" />
            </div>
          )}
        </div>
        <div
          role="button"
          tabIndex={0}
          className={cn('playing-bar-triangle', 'playing-bar-next-btn', {
            'playing-bar-btn-disable': !list[playingIndex + 1]
          })}
          onClick={() => handleClickSwitch(1)}
          onKeyUp={() => {}}
        >
          <div className="playing-bar-line" />
        </div>
      </div>
      <div className="playing-bar-right-control" />
    </div>
  );
};

export default PlayingBar;
