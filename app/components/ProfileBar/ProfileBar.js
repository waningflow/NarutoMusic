// @flow
import React, { Component } from 'react';
import { Button } from 'rsuite';
import './ProfileBar.less';
import Dialog from '../../shared/Dialog';

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
        <Dialog
          show={showLoginModal}
          onHide={this.close}
          className="login_dialog"
        >
          <div>login board</div>
        </Dialog>
      </div>
    );
  }
}
