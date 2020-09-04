import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class ConfirmBox extends React.Component {
  submit = () => {
    const { caption, label, onConfirm } = this.props;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui text-black" style={{ padding: '15px' }}>
            <h1 className="text-3xl">Are you sure?</h1>
            <p className="font-normal text-gray-700">{caption}</p>
            <br />
            <button
              className="bg-white border-gray-500 font-semibold py-2 px-6 border rounded"
              style={{ marginRight: '10px' }}
              onClick={onClose}
            >
              {' '}
              No
            </button>
            <button
              className="text-white bg-red-800 border-red-800 font-semibold py-2 px-6 border rounded"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {label}
            </button>
          </div>
        );
      },
    });
  };

  render() {
    const { btnClass, children } = this.props;
    return (
      <button type="button" className={btnClass} onClick={this.submit}>
        {children}
      </button>
    );
  }
}

export default ConfirmBox;
