import React, { Component } from 'react';
import Button from 'rsuite/lib/Button';
// import styles from './ProfileBar.css';

export default class ProfileBar extends Component {
  render() {
    return (
      <div>
        未登录
        <Button appearance="primary">login</Button>
      </div>
    );
  }
}
