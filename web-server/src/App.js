import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Battery from './components/battery';
import './css/style.css';

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

  return <Battery socket={socket} />;
};
