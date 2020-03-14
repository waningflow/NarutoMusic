import React from 'react';
import styles from './Sidebar.css';

import ProfileBar from '../../components/ProfileBar';

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <ProfileBar />
    </div>
  );
};

export default Sidebar;
