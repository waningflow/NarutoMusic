// @flow
import React, { Component } from 'react';
import { InputGroup, Input, Icon } from 'rsuite';
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
      <div className="profilebar">
        <div
          className="profilebar_icon"
          onClick={this.open}
          onKeyPress={this.open}
          role="button"
          tabIndex="0"
        />
        <div
          className="profilebar_msg"
          onClick={this.open}
          onKeyPress={this.open}
          role="button"
          tabIndex="0"
        >
          未登录
        </div>
        <Dialog
          show={showLoginModal}
          onHide={this.close}
          modalStyle={{}}
          contentClass="login_dialog"
        >
          <div className="login_dialog_container">
            <div className="login_input_container">
              <InputGroup inside>
                <InputGroup.Addon>
                  <Icon icon="avatar" />
                </InputGroup.Addon>
                <Input />
              </InputGroup>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
