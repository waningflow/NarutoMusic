import React from 'react';
import { Loader } from 'rsuite';
import './Loading.less';

function Loading() {
  return (
    <div className="loading-congtainer">
      <Loader content="加载中..." />
    </div>
  );
}

export default Loading;
