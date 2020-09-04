import React, { useState, useEffect, useRef } from 'react';
import { getAllBatteries } from '../../services/batteryService';
import Battery from './battery';

export default ({ socket }) => {
  const [batteries, setBatteries] = useState(null);
  const ref = useRef(batteries); // Make a ref and give it the count

  // Keeps the state and ref equal
  // https://css-tricks.com/dealing-with-stale-props-and-states-in-reacts-functional-components/
  function updateBatteryList(newBatteryList) {
    ref.current = newBatteryList;
    setBatteries(newBatteryList);
  }

  function pollBatteryStatus() {
    socket.on('BATTERY_RESERVE_SUCCESS', data => {
      const updatedBattery = { [data._id]: { ...data } };
      if (ref.current[data._id])
        setBatteries({ ...ref.current, ...updatedBattery });
    });
  }

  useEffect(() => {
    getAllBatteries('/api/v1/batteries').then(({ data }) => {
      const batteryArr = data.data.data;

      const arrayToObj = batteryArr.reduce((obj, item) => {
        obj[item._id] = item;
        return obj;
      }, {});

      updateBatteryList({ ...arrayToObj });
    });
    pollBatteryStatus();

    return () => {
      socket.removeAllListeners('BATTERY_RESERVE_SUCCESS');
    };
  }, []);

  if (!batteries) return <h3>Loading...</h3>;

  function renderBatteryList() {
    return Object.values(batteries).map(b => (
      <Battery key={b._id} socket={socket} battery={b} />
    ));
  }

  return (
    <div>
      <h1 className="primary-text">
        Going for a trip? Reserve Yatri batteries.
      </h1>
      {renderBatteryList()}
    </div>
  );
};
