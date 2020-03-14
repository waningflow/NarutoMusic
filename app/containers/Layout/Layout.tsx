import React, { ReactNode } from 'react';
import styles from './Layout.css';

interface Props {
  Header: ReactNode;
  Sidebar: ReactNode;
  Content: ReactNode;
  Footer: ReactNode;
}

const Layout = (props: Props) => {
  const { Header, Sidebar, Content, Footer } = props;
  return (
    <div className={styles.container}>
      <div className={styles.header}>{Header}</div>
      <div className={styles.center}>
        <div className={styles.sidebar}>{Sidebar}</div>
        <div className={styles.content}>{Content}</div>
      </div>
      <div className={styles.footer}>{Footer}</div>
    </div>
  );
};
export default Layout;
