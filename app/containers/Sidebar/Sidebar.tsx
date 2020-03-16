import React from 'react';

import ProfileBar from '@/components/ProfileBar';
import SideMenu from '@/components/SideMenu';
import styles from './Sidebar.css';

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <ProfileBar />
      <SideMenu />
    </div>
  );
};

export default Sidebar;
