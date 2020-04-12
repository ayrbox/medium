const socketIO = require('socket.io');

const User = require('./models/User');

function bindIO(io) {
  const userChangeStream = User.watch();

  userChangeStream.on('change', (change) => {
    console.log('Change', change);
    io.emit('changeData', change);
  });

  io.on('connection', function() {
    console.log('Connected');
  });


  setInterval(() => {
    io.emit('hi', { msg: 'hello client' });
  }, 1000);

}

const socket = function(httpServer) {
  const io = socketIO(httpServer);  
  bindIO(io);
  return;
};
module.exports = socket;