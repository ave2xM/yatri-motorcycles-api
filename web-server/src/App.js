import React from 'react';
import BatteryComponent from './components/battery';
import ResetAvailability from './components/battery/ResetAvailability';
import './css/tailwind.css';

export default () => (
  <div id="app" className="bg-black" style={{ minHeight: '100vh' }}>
    <div className="container mx-auto p-4">
      <BatteryComponent />
      <ResetAvailability />
    </div>
  </div>
);
