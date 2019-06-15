import React, { Component } from 'react';
import styles from './Sidebar.css';

import ProfileBar from '../../components/ProfileBar';

export default class Sidebar extends Component {
  render() {
    return (
      <div className={styles.container}>
        <ProfileBar />
      </div>
    );
  }
}
