// @flow
import * as React from 'react';
import { Modal, Icon } from 'rsuite';
import './Dialog.less';

type Props = {
  show: boolean,
  onHide: Function,
  children?: React.Node,
  modalClass?: string,
  contentClass?: string,
  modalStyle?: Object,
  contentStyle?: Object
};

export default class Dialog extends React.Component<Props> {
  static defaultProps = {
    children: null,
    modalClass: '',
    contentClass: '',
    modalStyle: {},
    contentStyle: {}
  };

  render() {
    const {
      show,
      onHide,
      children,
      modalClass,
      contentClass,
      modalStyle,
      contentStyle,
      ...props
    } = this.props;
    return (
      <Modal
        show={show}
        onHide={onHide}
        className={modalClass}
        style={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          paddingTop: '60px',
          ...modalStyle
        }}
        full
      >
        <Icon icon="close" className="dialog_close_btn" onClick={onHide} />
        <Modal.Body className={contentClass} style={contentStyle} {...props}>
          {children}
        </Modal.Body>
      </Modal>
    );
  }
}
