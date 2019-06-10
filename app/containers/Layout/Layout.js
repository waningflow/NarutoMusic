import React, { Component } from 'react';
import styles from './Layout.css';

export default class Layout extends Component {
  render() {
    const { Header, Sidebar, Content, Footer } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.center}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <div className={styles.content}>
            <Content />
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}
