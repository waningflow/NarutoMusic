import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { State as StateType } from '@/reducers';
import { MenuItem } from '@/types';
import { menuList } from '@/constants/router';
import './HeaderMenu.less';

// const menu: MenuItem[] = [];
// let selectedItem: MenuItem | null = null;

function HeaderMenu() {
  const history = useHistory();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { location } = useSelector((state: StateType) => state.router);
  useEffect(() => {
    const mainMenu = menuList.find(v =>
      (location.pathname + location.search).startsWith(v.path || v.href)
    );
    if (mainMenu && mainMenu.subMenu) {
      setMenu(mainMenu.subMenu);
      setSelectedItem(
        mainMenu.subMenu.find(v =>
          (location.pathname + location.search).startsWith(v.path || v.href)
        ) || null
      );
    } else {
      setMenu([]);
      setSelectedItem(null);
    }
  }, [location]);

  function handleClickMenu(key: string) {
    if (key === selectedItem?.key) return;
    const item: MenuItem | undefined = menu.find(v => v.key === key);
    if (item) history.push(item.href);
  }

  return (
    <div className="header-menu-container">
      {menu
        .filter(item => !item.hidden)
        .map(({ key, label }) => (
          <div
            key={key}
            className={cn('header-menu-item', {
              'header-menu-item-selected':
                selectedItem && selectedItem.key === key
            })}
            onClick={() => handleClickMenu(key)}
          >
            {label}
          </div>
        ))}
    </div>
  );
}

export default HeaderMenu;
