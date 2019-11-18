module.exports = (options) => {

  const app = require('express')()
  const io = require('socket.io')(options.server)

  app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
  })

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
  
  return app;
}
