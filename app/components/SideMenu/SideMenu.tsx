import React, { useState } from 'react';
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
    href: '/music_sheet'
  }
];

const SideMenu = () => {
  const history = useHistory();
  const [activeKey, setActiveKey] = useState(menuList[0].key);
  const handleSelect = (key: string) => {
    setActiveKey(key);
    const item: MenuItem = menuList.find(v => v.key === key) || menuList[0];
    history.push(item.href);
  };
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
