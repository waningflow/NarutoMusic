// @flow
import React, { Component } from 'react';
import { Button, Modal } from 'rsuite';
// import styles from './ProfileBar.css';

type Props = {};
type State = { showLoginModal: boolean };

export default class ProfileBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showLoginModal: false
    };
  }

  close = () => {
    this.setState({
      showLoginModal: false
    });
  };

  open = () => {
    this.setState({
      showLoginModal: true
    });
  };

  render() {
    const { showLoginModal } = this.state;
    return (
      <div>
        未登录
        <Button appearance="primary" onClick={this.open}>
          login
        </Button>
        <Modal show={showLoginModal} onHide={this.close} size="xs">
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body />
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Ok
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
