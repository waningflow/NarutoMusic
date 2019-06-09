// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import Header from '../components/Header';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}
