module.exports = () => {

  const app = require('express')()
  const server = require('http').createServer(app);
  const io = require('socket.io')(server)

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
  
  return app, server;
}
