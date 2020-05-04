import React, { ReactNode, useState } from 'react';
import cn from 'classnames';
import './Collapse.less';

interface Props {
  children: ReactNode;
}

function Collapse(props: Props) {
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const { children } = props;
  function handleClickCollapse() {
    setIsCollapse(!isCollapse);
  }
  return (
    <div className={cn('collapse-container', { collapsed: isCollapse })}>
      {children}
      <div className="collapse-btn" onClick={handleClickCollapse}>
        <i className="iconfont iconxiala" />
      </div>
    </div>
  );
}

export default Collapse;
