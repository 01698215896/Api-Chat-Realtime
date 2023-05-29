const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log(` user connected ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(` user disconect ${socket.id}`);
  });

  socket.on('my message', (msg) => {
    console.log(msg)
    io.emit('my broadcast', msg);

  });


});

http.listen(3000, () => {
  console.log('listening on *:3000');
});