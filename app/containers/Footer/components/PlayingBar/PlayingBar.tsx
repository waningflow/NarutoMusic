import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider, Alert, Whisper, Tooltip } from 'rsuite';
import cn from 'classnames';
import { parseTime, findNext, lsGet, lsSet } from '@/utils/utils';
import Logger from '@/utils/logger';
import { updatePlaylist } from '@/actions/playlist';
import { Music } from '@/types';
import { State as StateType } from '@/reducers';
import { lsKey } from '@/constants/const';
import './PlayingBar.less';

const log = new Logger('PlayingBar');

const modeMap = {
  LOOP: 'loop',
  SINGLE: 'single'
};

let audioNode: any = null;

let musicInfo: Music = {};

const audioPlay = async (node: any) => {
  try {
    log.info('start to play');
    await node.play();
  } catch (e) {
    log.err(e);
    Alert.error(e.message);
  }
};

const defaultPlayMode = lsGet(lsKey.PlayMode, modeMap.LOOP, false);

const PlayingBar = () => {
  // const [volume, setVolumn] = useState(50);
  const [playmode, setPlaymode] = useState(defaultPlayMode);
  const [currentTime, setCurrentTime] = useState(0);

  const dispatch = useDispatch();
  const { paused, playing, list, reset, playingIndex } = useSelector(
    (state: StateType) => state.playlist
  );
  musicInfo = playing || {};

  const latestPlayingIndex = useRef(playingIndex);
  const latestList = useRef(list);
  const latestPlaymode = useRef(playmode);

  useEffect(() => {
    latestPlayingIndex.current = playingIndex;
    latestList.current = list;
    latestPlaymode.current = playmode;
  }, [playingIndex, list, playmode]);

  useEffect(() => {
    if (reset === 1 && audioNode) {
      setTimeout(() => {
        audioPlay(audioNode);
      }, 150);
    }
  }, [reset]);

  const playFrom = (index: number, trystart?: boolean) => {
    log.info('play from', index);
    const nIndex = latestList.current[index] || !trystart ? index : 0;
    if (!latestList.current[nIndex]) {
      log.info('no music to play');
      return;
    }
    dispatch(
      updatePlaylist({
        playing: latestList.current[nIndex],
        playingIndex: nIndex,
        reset: 1
      })
    );
  };

  const playFromCount = (index = 0, trystart?: boolean) => {
    log.info('latestPlayingIndex', JSON.stringify(latestPlayingIndex));
    playFrom(latestPlayingIndex.current + index, trystart);
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      log.info('audioNode: timeupdate');
      if (audioNode) setCurrentTime(parseInt(audioNode.currentTime, 10));
    };
    const handlePlaying = () => {
      log.info('audioNode: playing');
    };
    const handlePlay = () => {
      log.info('audioNode: play');
      dispatch(updatePlaylist({ paused: false }));
    };
    const handlePause = () => {
      log.info('audioNode: paused');
      dispatch(updatePlaylist({ paused: true }));
    };
    const handleWaiting = () => {
      log.info('audioNode: waiting');
    };
    const handleVolumnChange = () => {
      log.info('audioNode: volumechange');
    };
    const handleEnded = () => {
      log.info('audioNode: ended');
      switch (latestPlaymode.current) {
        case modeMap.LOOP:
          playFromCount(1, true);
          break;
        case modeMap.SINGLE:
          playFromCount(0);
          break;
        default:
      }
    };
    audioNode.addEventListener('timeupdate', handleTimeUpdate);
    audioNode.addEventListener('playing', handlePlaying);
    audioNode.addEventListener('play', handlePlay);
    audioNode.addEventListener('pause', handlePause);
    audioNode.addEventListener('waiting', handleWaiting);
    audioNode.addEventListener('volumechange', handleVolumnChange);
    audioNode.addEventListener('ended', handleEnded);
    return () => {
      audioNode.removeEventListener('timeupdate', handleTimeUpdate);
      audioNode.removeEventListener('playing', handlePlaying);
      audioNode.removeEventListener('play', handlePlay);
      audioNode.removeEventListener('pause', handlePause);
      audioNode.removeEventListener('waiting', handleWaiting);
      audioNode.removeEventListener('volumechange', handleVolumnChange);
      audioNode.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleClickPlay = () => {
    if (!musicInfo || !musicInfo.url) return;
    if (paused) {
      audioPlay(audioNode);
    } else {
      audioNode.pause();
    }
  };

  const handleClickPlayMode = () => {
    const nextMode = findNext(Object.values(modeMap), playmode);
    if (nextMode) {
      setPlaymode(nextMode);
      lsSet(lsKey.PlayMode, nextMode, false);
    }
  };

  const hanldeChangeProgress = (value: number) => {
    if (!musicInfo || !musicInfo.duration) return;
    const cTime = (value * musicInfo.duration) / 100000;
    if (audioNode) audioNode.currentTime = cTime;
  };

  const playProgress = musicInfo.duration
    ? Number(((currentTime * 100000) / musicInfo.duration).toFixed(1))
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
        {musicInfo.duration && (
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
            {musicInfo.duration && (
              <>
                {parseTime(currentTime)}
                <span style={{ margin: '0 4px' }}>/</span>
                {parseTime(musicInfo.duration / 1000)}
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
          onClick={() => playFromCount(-1)}
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
          onClick={() => playFromCount(1)}
          onKeyUp={() => {}}
        >
          <div className="playing-bar-line" />
        </div>
      </div>
      <div className="playing-bar-right-control">
        <div
          role="button"
          tabIndex={0}
          className="playing-bar-play-mode"
          onClick={handleClickPlayMode}
          onKeyUp={() => {}}
        >
          {playmode === modeMap.LOOP && (
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>列表循环</Tooltip>}
            >
              <i className="iconfont iconxunhuanbofang" />
            </Whisper>
          )}
          {playmode === modeMap.SINGLE && (
            <Whisper
              placement="top"
              trigger="hover"
              speaker={<Tooltip>单曲循环</Tooltip>}
            >
              <i className="iconfont icondanquxunhuan" />
            </Whisper>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayingBar;
