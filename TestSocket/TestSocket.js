var net = require('net');
 
var server = net.createServer(function(socket) {
	socket.on('data', function(data){
		console.log(data.toString());
	})
	socket.write('HTTP/1.1 200 OK\n\n HOLA');
	socket.end();
}) 
 
var port = 8080;
 
server.listen(port, function(){
	console.log('Running on port: ', port, '\n');
});
 
var client = new net.Socket();
client.connect(port, function() {
	console.log('Connected');
	client.write('Hello, server! Client.');
}); 
