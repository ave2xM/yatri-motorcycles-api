import React, { useState } from 'react';
import ConfirmBox from '../helpers/ConfirmBox';
import { resetBatteryAvaibility } from '../../services/batteryService';

export default () => {
  const [submitting, setSubmitting] = useState(false);

  function handleAvaibilityReset() {
    setSubmitting(true);
    resetBatteryAvaibility()
      .then(() => {
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  }

  return (
    <div className="text-right my-4">
      {!submitting ? (
        <ConfirmBox
          label="Yes, reset it!"
          caption="Only for developers, make sure to reload website after."
          btnClass="text-white  underline btn-chromeless"
          onConfirm={handleAvaibilityReset}
        >
          Reset availability
        </ConfirmBox>
      ) : (
        <div className="spi" style={{ marginRight: 0 }}></div>
      )}
    </div>
  );
};
