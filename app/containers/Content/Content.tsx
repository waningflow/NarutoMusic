import React, { ReactNode } from 'react';
import styles from './Content.css';

interface Props {
  children: ReactNode;
}

export default function Content(props: Props) {
  const { children } = props;
  return (
    <div className={styles.container} id="app-content-container">
      {children}
    </div>
  );
}
