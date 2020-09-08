import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAllBatteries } from '../../services/batteryService';
import { arrayToObj } from '../../utils';
import socket from '../../utils/socket';
import BatteryList from './BatteryList';

export default () => {
  const [batteries, setBatteries] = useState(null);

  const ref = useRef(batteries); // Make a ref and give it the count

  // Keeps the state and ref equal
  // https://css-tricks.com/dealing-with-stale-props-and-states-in-reacts-functional-components/
  function updateBatteryList(newBatteryList) {
    ref.current = newBatteryList;
    setBatteries(newBatteryList);
  }

  const pollBatteryStatus = useCallback(
    function () {
      socket.on('BATTERY_RESERVE_SUCCESS', data => {
        if (ref.current[data._id]) {
          let newBatteryList = { ...ref.current };
          newBatteryList[data._id] = {
            ...newBatteryList[data._id],
            available: false,
          };
          updateBatteryList(newBatteryList);
        }
      });
    },
    [socket]
  );

  useEffect(() => {
    getAllBatteries().then(({ data }) => {
      const batteryArr = data.data.data;
      updateBatteryList({ ...arrayToObj(batteryArr) });
    });
    pollBatteryStatus();

    return () => {
      socket.removeAllListeners('BATTERY_RESERVE_SUCCESS');
    };
  }, [pollBatteryStatus, socket]);

  if (!batteries) return <h3>Loading...</h3>;

  return <BatteryList batteries={batteries} />;
};
