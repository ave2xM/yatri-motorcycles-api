import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Battery from './components/battery';
import './css/style.css';
import './css/tailwind.css';

export default () => {
  const [socket, setSocket] = useState(null);
  const [loader, setLoader] = useState(true);

  function initSocket() {
    const socket = io(process.env.REACT_APP_API_SERVER);
    socket.on('connect', () => {
      setLoader(false);
    });
    setSocket(socket);
  }

  useEffect(() => {
    initSocket();
  }, []);

  if (loader) return <h3>Loading...</h3>;

  return (
    <div id="app" className="bg-black" style={{ minHeight: '100vh' }}>
      <div className="container mx-auto p-4">
        <Battery socket={socket} />
      </div>
    </div>
  );
};
