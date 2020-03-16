import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputGroup, Input, Icon, Button } from 'rsuite';
import './ProfileBar.less';
import Dialog from '../../shared/Dialog';
import { login } from '../../actions/user';
import { State as StateType, UserStatus, User } from '../../reducers/types';

interface Props {
  loginStatus: UserStatus;
  userInfo: User;
  loginApi: (params: any) => Promise<any>;
}

interface State {
  showLoginModal: boolean;
  phone: string;
  password: string;
  [key: string]: any;
}

class ProfileBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showLoginModal: false,
      phone: '',
      password: ''
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

  handleChangeInput = (name: string) => (value: string) => {
    this.setState({
      [name]: value
    });
  };

  handleClickLogin = async () => {
    const { loginApi } = this.props;
    const { phone, password } = this.state;
    await loginApi({ phone, password });
    this.close();
  };

  render() {
    const { showLoginModal, phone, password } = this.state;
    const { loginStatus, userInfo } = this.props;
    const avatarStyle: { [key: string]: string } = {};
    const profile = userInfo.profile || {};
    if (profile.avatarUrl) {
      avatarStyle.backgroundImage = `url(${userInfo.profile.avatarUrl})`;
    }
    return (
      <div className="profilebar">
        <div
          className="profilebar_icon"
          onClick={this.open}
          onKeyPress={this.open}
          role="button"
          tabIndex={0}
          aria-label="xx"
          style={avatarStyle}
        />
        <div
          className="profilebar_msg"
          onClick={this.open}
          onKeyPress={this.open}
          role="button"
          tabIndex={0}
        >
          {profile.nickname || loginStatus}
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
                  <Icon icon="mobile" />
                </InputGroup.Addon>
                <Input
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={this.handleChangeInput('phone')}
                />
              </InputGroup>
              <InputGroup inside style={{ marginTop: '15px' }}>
                <InputGroup.Addon>
                  <Icon icon="lock" />
                </InputGroup.Addon>
                <Input
                  placeholder="请输入密码"
                  type="password"
                  value={password}
                  onChange={this.handleChangeInput('password')}
                />
              </InputGroup>
              <Button
                appearance="primary"
                className="login_confirm_btn"
                onClick={this.handleClickLogin}
                loading={loginStatus === UserStatus.LOGGING}
              >
                登录
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state: StateType) => {
  return {
    loginStatus: state.user.status,
    userInfo: state.user
  };
};

const mapDispatchToProps = { loginApi: login };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBar);
