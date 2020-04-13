import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Nav, Icon } from 'rsuite';
import { MenuItem } from '@/types';
import { menuList } from '@/constants/const';
import { State as StateType } from '@/reducers';
import './SideMenu.less';

const SideMenu = () => {
  const history = useHistory();
  const [activeKey, setActiveKey] = useState('');
  const { location } = useSelector((state: StateType) => state.router);

  const handleSelect = (key: string) => {
    if (key === activeKey) return;
    setActiveKey(key);
    const item: MenuItem = menuList.find(v => v.key === key) || menuList[0];
    history.push(item.href);
  };

  useEffect(() => {
    const item = menuList.find(
      v => v.href === location.pathname + location.search
    );
    if (item) {
      setActiveKey(item.key);
    } else {
      setActiveKey('');
    }
  }, [location]);

  useEffect(() => {
    if (!activeKey) handleSelect(menuList[0].key);
  }, []);

  return (
    <div className="side-menu-container">
      <Nav vertical activeKey={activeKey} onSelect={handleSelect} style={{}}>
        {/* <Nav.Item eventKey="home" icon={<Icon icon="home" />}>
          Home
        </Nav.Item> */}
        {menuList
          .filter(item => !item.hidden)
          .map(item => (
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