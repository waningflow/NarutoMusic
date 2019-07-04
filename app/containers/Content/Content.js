// @flow
import * as React from 'react';
import styles from './Content.css';

type Props = {
  children: React.Node
};

export default class Content extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <div className={styles.container}>{children}</div>;
  }
}
