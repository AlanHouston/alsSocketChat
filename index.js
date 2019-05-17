var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//serving html file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// listening on connection event for incoming sockets
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

//server created, listening
http.listen(3000, function(){
  console.log('listening on *:3000');
});

