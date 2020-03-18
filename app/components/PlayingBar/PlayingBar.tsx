import React, { useState, useEffect } from 'react';
import { parseTime } from '@/utils/utils';
import './PlayingBar.less';

const url =
  'http://m8.music.126.net/20200317232513/f62433e4551bc31b2655f06bcae08cc9/ymusic/f221/cac7/0f95/3c15e709c8f2595b01edc5f32c214f42.mp3';

const refreshInterval = 500;

let audioNode: any = null;
let refreshTime: any = null;

const PlayingBar = () => {
  const [currentTime, setCurrentTime] = useState(0);
  // const [volume, setVolumn] = useState(50);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const refresh = () => {
      console.log('rr');
      if (audioNode) setCurrentTime(parseInt(audioNode.currentTime, 10));
      refreshTime = setTimeout(refresh, refreshInterval);
    };
    refresh();
    return () => {
      if (refreshTime) clearTimeout(refreshTime);
      refreshTime = null;
    };
  }, [paused]);

  const handleClickPlay = () => {
    if (paused) {
      audioNode.play();
    } else {
      audioNode.pause();
    }
    setPaused(!paused);
  };

  return (
    <div className="playing-bar-container">
      <audio
        src={url}
        ref={node => {
          audioNode = node;
        }}
      />
      <div className="playing-bar-chip">{parseTime(currentTime)}</div>
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
