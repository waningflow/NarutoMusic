// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

type Props = {};

const styles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingTop: '50px',
    paddingBottom: '58px'
  }
};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div style={styles.container}>
        <Header />
        <Sidebar />
        <Footer />
      </div>
    );
  }
}
