import React, { Component } from 'react';
import styles from './Layout.css';

export default class Layout extends Component {
  render() {
    const { Header, Sidebar, Content, Footer } = this.props;
    return (
      <div className={styles.container}>
        <Header />
        <Sidebar />
        <Content />
        <Footer /> 
      </div>
    );
  }
}
