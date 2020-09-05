import { Server } from 'http';
import { IBattery } from '../shared/interfaces';
import socketio, { Socket, Server as SocketServer } from 'socket.io';

let socket: Socket;
let io: SocketServer;

function getIO() {
  return io;
}

function getSocket() {
  return socket;
}

function emitReserveSuccess(reservedBattery: IBattery) {
  io.emit('BATTERY_RESERVE_SUCCESS', reservedBattery);
}

function initialize(server: Server) {
  io = socketio(server);
  console.log('✅ Socket connection established');
  io.on('connection', (_socket) => {
    socket = _socket;
  });
}

export default {
  getIO,
  getSocket,
  emitReserveSuccess,
  initialize,
};
