import React, { useState } from 'react';
import { reserveBattery } from '../../services/batteryService';

export default ({ battery, handleNotification }) => {
  const [submitting, setSubmitting] = useState(false);

  function handleBatteryReserve(id) {
    setSubmitting(true);
    reserveBattery(id)
      .then(() => {
        afterSubmit({
          status: 'success',
          message: 'Battery reserved',
        });
      })
      .catch(err => {
        afterSubmit({
          status: 'failed',
          message: 'Something went wrong',
        });
      });
  }

  function afterSubmit(status) {
    setSubmitting(false);
    handleNotification(status);
  }

  const { _id, location, available } = battery;

  return (
    <div className="relative p-4 bg-gray-900 m-3">
      <h3
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {location}
      </h3>
      <p>
        <small>Code : {_id.substring(_id.length - 7, _id.length)}</small>
      </p>
      <button
        className="bg-teal-700 hover:bg-teal-900 py-2 px-4 my-6"
        type="button"
        onClick={() => handleBatteryReserve(_id)}
        disabled={available === false}
      >
        Reserve
      </button>

      <p>
        <span
          style={{
            width: '12px',
            height: '12px',
            background: available ? 'lightgreen' : 'red',
            display: 'inline-block',
            borderRadius: '50%',
            marginRight: 15,
          }}
        ></span>
        {available ? 'Available' : 'Not available'}
      </p>

      {submitting && (
        <div
          className="flex absolute bottom-0 left-0 top-0 right-0 bg-black bg-opacity-75"
          style={{ alignItems: 'center' }}
        >
          <div className="spi"></div>
        </div>
      )}
    </div>
  );
};
