import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAllBatteries } from '../../services/batteryService';
import ResetAvailability from './ResetAvailability';
import NotificationBox from '../helpers/NotificationBox';

import Battery from './Battery';

export default ({ socket }) => {
  const [batteries, setBatteries] = useState(null);
  const [notification, setNotification] = useState(null);

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
  }, [pollBatteryStatus, socket]);

  if (!batteries) return <h3>Loading...</h3>;

  function handleNotification(notifier) {
    setNotification(notifier);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  function renderBatteryList() {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mx-3">
          {Object.values(batteries).map(b => (
            <Battery
              key={b._id}
              battery={b}
              handleNotification={handleNotification}
            />
          ))}
        </div>
        <ResetAvailability />
        <NotificationBox notification={notification} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="primary-text text-xl font-extrabold my-5">
        Going for a trip? Reserve Yatri batteries.
      </h1>
      {renderBatteryList()}
    </div>
  );
};
