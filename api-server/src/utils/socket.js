const socketio = require('socket.io');

let socket = null;
let io = null;

/**
 * Get IO Object.
 *
 * @returns
 */
exports.getIO = function () {
  return io;
};
exports.getSocket = function () {
  return socket;
};

/**
 * Emit Update.
 *
 */
exports.emitReserveSuccess = function (data = { message: 'Hello' }) {
  io.emit('BATTERY_RESERVE_SUCCESS', data);
};

/**
 * Initialize Socket IO.
 *
 * @param {*} server
 */
exports.initialize = function (server) {
  io = socketio(server);
  console.log('✅ Socket connection established');
  io.on('connection', _socket => {
    socket = _socket;
  });
};
