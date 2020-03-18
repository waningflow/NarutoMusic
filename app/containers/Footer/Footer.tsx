import React from 'react';
import PlayingBar from '@/components/PlayingBar';
import styles from './Footer.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.stepline} />
      <PlayingBar />
    </div>
  );
};

export default Footer;
