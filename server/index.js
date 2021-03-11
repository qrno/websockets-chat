// HTTP
const http = require('http')
const fs = require('fs')
const port = 3000

const sendFile = function(fileName, res) {
	fs.readFile(fileName, function(error,data) {
		if (error) {
			res.writeHead(404)
			res.write('Error: File Not Found')
		} else {
			res.write(data)
		}
		res.end()
	})
}


const server = http.createServer(function(req, res){
	if (req.url == '/') {
		sendFile('index.html', res)
	} else if (req.url == '/style.css') {
		sendFile('style.css', res)
	} else if (req.url == '/client.js') {
		sendFile('client.js', res)
	}
})

server.listen(port, function(error) {
	if (error) {
		console.log('nope', error)
	} else {
		console.log('yep' + port)
	}
})

// WebSockets
const WebSocket = require("ws")
const wss = new WebSocket.Server({ port : 2848 });

wss.on("connection",
	ws => {
		console.log("New client connected.");

		ws.on("message", data => {
			console.log(data)
			wss.clients.forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(data);
				}
			});
		});

		ws.on("close", () => {
			console.log("Client has disconnected.");
		});
	}
);
