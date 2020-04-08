var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('weebo-control', function(msg){
        console.log('message: ' + msg);
        io.emit('weebo-control', msg);
    });

    socket.on('frame',function(data){
      socket.broadcast.emit('frame',data);
    }); 
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
