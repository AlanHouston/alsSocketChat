const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let userNames = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('new user', function(data, callback){
    callback(true)
    socket.userName = data;
    userNames.push(socket.userName);
  })
  
  socket.on('chat message', function(data){
    io.emit('chat message', {msg: data, uname: socket.userName});
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

