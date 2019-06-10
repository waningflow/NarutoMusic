// @flow
import React, { Component } from 'react';
import styles from './Content.css';

type Props = {
  children: React.Node
};

export default class Content extends Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <div className={styles.container}>{children}</div>;
  }
}
