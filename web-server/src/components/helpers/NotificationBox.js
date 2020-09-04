import React from 'react';

export default ({ notification }) => (
  <div
    className={`side-notification bg-white text-black shadow fixed px-4 py-2 rounded ${
      notification ? 'show' : ''
    }`}
  >
    {notification && (
      <div>
        {notification.status === 'success' && (
          <i className="fas fa-check mr-2 text-green-600"></i>
        )}
        {notification.message}
      </div>
    )}
  </div>
);
