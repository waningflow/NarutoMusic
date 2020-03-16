import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Nav, Icon } from 'rsuite';
import './SideMenu.less';

type MenuItem = {
  key: string;
  label: string;
  href: string;
};

const menuList: MenuItem[] = [
  {
    key: 'MUSIC_FIND',
    label: '发现音乐',
    href: '/'
  },
  {
    key: 'PERSONAL_FM',
    label: '私人FM',
    href: '/music_play'
  },
  {
    key: 'DAILY_RECOMMENDED',
    label: '每日推荐',
    href: '/music_sheet?type=daily_recommended'
  }
];

const SideMenu = () => {
  const history = useHistory();
  const [activeKey, setActiveKey] = useState('');
  // history.push(menuList[0].href);
  const handleSelect = (key: string) => {
    if (key === activeKey) return;
    setActiveKey(key);
    const item: MenuItem = menuList.find(v => v.key === key) || menuList[0];
    history.push(item.href);
  };
  if (!activeKey) handleSelect(menuList[0].key);
  return (
    <div className="side-menu-container">
      <Nav vertical activeKey={activeKey} onSelect={handleSelect} style={{}}>
        {/* <Nav.Item eventKey="home" icon={<Icon icon="home" />}>
          Home
        </Nav.Item> */}
        {menuList.map(item => (
          <Nav.Item eventKey={item.key} key={item.key}>
            {item.label}
            {/* <Link to={item.href}>{item.label}</Link> */}
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default SideMenu;
