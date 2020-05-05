import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State as StateType } from '@/reducers';
import './HistoryControl.less';

const historyStack: { current: any; stack: any[] } = {
  current: '',
  stack: []
};

function HistoryControl() {
  const history = useHistory();
  const { location } = useSelector((state: StateType) => state.router);
  useEffect(() => {
    const unlisten = history.listen((loc, action) => {
      // location is an object like window.location
      console.log('listen:', action, loc);
    });
    return unlisten;
  }, []);

  useEffect(() => {
    console.log(
      'history:',
      history.action,
      history.length,
      history.location,
      history
    );
    const { location } = history;
    const locData = { ...location, key: location.pathname + location.search };
    if (historyStack.stack.length === 0) {
      historyStack.stack.push(locData);
      historyStack.current = locData;
    } else {
      // const index =
    }
  }, [location]);

  function handleClickBtn(dir: number) {
    console.log('click:', history.action, history.length, history.location);
    history.go(dir);
  }
  return (
    <div className="history-control-container">
      <div className="history-control-btn" onClick={() => handleClickBtn(-1)}>
        <i className="iconfont iconfanhui" />
      </div>
      <div className="history-control-btn" onClick={() => handleClickBtn(1)}>
        <i className="iconfont icongengduo" />
      </div>
    </div>
  );
}

export default HistoryControl;
