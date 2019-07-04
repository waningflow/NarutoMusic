// @flow
import * as React from 'react';
import { Modal } from 'rsuite';

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
        <Modal.Body {...props}>{children}</Modal.Body>
      </Modal>
    );
  }
}
