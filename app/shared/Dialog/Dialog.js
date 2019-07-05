// @flow
import * as React from 'react';
import { Modal, Icon } from 'rsuite';
import './Dialog.less';

type Props = {
  show: boolean,
  onHide: Function,
  children?: React.Node
};

export default class Dialog extends React.Component<Props> {
  static defaultProps = {
    children: null
  };

  render() {
    const { show, onHide, children, ...props } = this.props;
    return (
      <Modal show={show} onHide={onHide} size="xs">
        <Icon icon="close" className="dialog_close_btn" onClick={onHide} />
        <Modal.Body {...props}>{children}</Modal.Body>
      </Modal>
    );
  }
}
