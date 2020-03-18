import React, { useState } from 'react';
import './PlayingBar.less';

const url =
  'http://m8.music.126.net/20200317232513/f62433e4551bc31b2655f06bcae08cc9/ymusic/f221/cac7/0f95/3c15e709c8f2595b01edc5f32c214f42.mp3';

interface Audio {
  currentTime: number;
  volume: number;
  paused: boolean;
}

const PlayingBar = () => {
  let audioNode: any;

  const [audio, setAudio] = useState<Audio>({
    currentTime: 0,
    volume: 50,
    paused: true
  });
  const handleClickPlay = () => {
    const currPaused = audio.paused;
    if (currPaused) {
      audioNode.play();
    } else {
      audioNode.pause();
    }
    setAudio({ ...audio, ...{ paused: !currPaused } });
  };
  return (
    <div className="playing-bar-container">
      <audio
        src={url}
        ref={node => {
          audioNode = node;
        }}
      />
      <div
        role="button"
        tabIndex={0}
        className="playing-bar-play-btn"
        onClick={handleClickPlay}
        onKeyUp={() => {}}
      >
        {audio.paused ? (
          <div className="playing-bar-play-triangle" />
        ) : (
          <div className="playing-bar-play-doublelines">
            <div className="playing-bar-play-line" />
            <div className="playing-bar-play-line" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayingBar;
