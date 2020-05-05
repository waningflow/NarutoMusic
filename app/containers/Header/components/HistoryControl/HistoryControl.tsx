import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import historyStack from '@/utils/historyStack';
import Logger from '@/utils/logger';
import './HistoryControl.less';

const log = new Logger('HistoryControl');

function HistoryControl() {
  const history = useHistory();
  const [canBack, setCanBack] = useState(false);
  const [canForward, setCanForward] = useState(false);
  useEffect(() => {
    const unlisten = history.listen((loc, action) => {
      if (action === 'POP') {
        historyStack.pop(loc);
      } else if (action === 'PUSH') {
        historyStack.push(loc);
      } else {
        log.err(action, loc);
      }
      log.info(historyStack.stack);
      setCanBack(historyStack.canGo(-1));
      setCanForward(historyStack.canGo(1));
    });
    return unlisten;
  }, []);

  function handleClickBtn(dir: number) {
    if (historyStack.canGo(dir)) history.go(dir);
  }
  return (
    <div className="history-control-container">
      <div
        className={cn('history-control-btn', {
          'history-control-btn-disabled': !canBack
        })}
        onClick={() => handleClickBtn(-1)}
      >
        <i className="iconfont iconfanhui" />
      </div>
      <div
        className={cn('history-control-btn', {
          'history-control-btn-disabled': !canForward
        })}
        onClick={() => handleClickBtn(1)}
      >
        <i className="iconfont icongengduo" />
      </div>
    </div>
  );
}

export default HistoryControl;
