import React, { ReactNode, useState } from 'react';
import cn from 'classnames';
import './Panel.less';

interface Props {
  title: string;
  children: ReactNode;
}

function Panel(props: Props) {
  const { title, children } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleClickCollapse() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="panel-container">
      <div className="panel-header" onClick={handleClickCollapse}>
        {title}
        <i
          className={cn(
            'iconfont',
            { icongengduo: isCollapsed },
            {
              iconxialada: !isCollapsed
            }
          )}
        />
      </div>
      <div
        className={cn('panel-content', {
          'panel-content-collapsed': isCollapsed
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default Panel;
