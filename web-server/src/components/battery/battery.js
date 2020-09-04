import React from 'react';
import axios from '../../utils/axios';
import { reserveBattery } from '../../services/batteryService';

export default ({ battery }) => {
  function handleBatteryReserve(id) {
    reserveBattery(`/api/v1/batteries/${id}`)
      .then(() => {
        // show message
      })
      .catch(err => {
        // show message
      });
  }

  const { _id, location, available } = battery;

  return (
    <div>
      <h3>{location}</h3>
      <p>
        <small>{_id.substring(_id.length - 7, _id.length)}</small>
      </p>
      <p>{available ? 'Available' : 'Not available'}</p>
      <button
        type="button"
        onClick={() => handleBatteryReserve(_id)}
        disabled={available === false}
      >
        Reserve
      </button>
    </div>
  );
};
