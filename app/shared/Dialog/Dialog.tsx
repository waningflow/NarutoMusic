import React, { ReactNode } from 'react';
import { Modal, Icon } from 'rsuite';
import './Dialog.less';

interface Props {
  show: boolean;
  onHide: () => void;
  children?: ReactNode;
  modalClass?: string;
  contentClass?: string;
  modalStyle?: any;
  contentStyle?: any;
  [key: string]: any;
}

function Dialog(props: Props) {
  const {
    show,
    onHide,
    children,
    modalClass,
    contentClass,
    modalStyle,
    contentStyle
  } = props;
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
      <Modal.Body className={contentClass} style={contentStyle}>
        {children}
      </Modal.Body>
    </Modal>
  );
}

Dialog.defaultProps = {
  children: null,
  modalClass: '',
  contentClass: '',
  modalStyle: {},
  contentStyle: {}
};

export default Dialog;
