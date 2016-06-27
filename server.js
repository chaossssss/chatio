var express = require('express'),
sio = require('socket.io')

app = express.createServer(
	express.bodyParser(),
	express.static('public')
	);
app.listen(8000);
var io = sio.listen(app);
io.sockets.on('connection',function(socket){
	console.log('Someone connected');
	socket.on('join',function(name){
		socket.nickname = name;
		socket.broadcast.emit('announcement', name + ' 加入了聊天:)');
	});
	socket.on('text', function(msg){
		socket.broadcast.emit('text',socket.nickname,msg);
		// fn(Date.now());
	});
});