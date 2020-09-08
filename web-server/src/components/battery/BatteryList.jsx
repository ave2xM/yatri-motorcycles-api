import React from 'react';
import Battery from './Battery';

export default ({ batteries }) => {
  function renderBatteryList() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mx-3">
        {Object.values(batteries).map(b => (
          <Battery key={b._id} battery={b} />
        ))}
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
