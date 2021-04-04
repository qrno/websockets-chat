// HTTP library
const http = require('http');
// filesystem library
const fs = require('fs');

// port number for HTTP server
const port = 3000;

// sendFile function - sends files in the HTTP response
// INPUT:
//		name of file to be sent
// 		HTTP response object
/
const sendFile = function(fileName, res) {
	// try to read file
	fs.readFile(fileName, function(error,data) {
		if (error) {
			// something went wrong
			// send a 404 error
			res.writeHead(404);
			res.write('Error: File Not Found');
		} else {
			// read file successfully
			// send file
			res.write(data);
		}
		// end HTTP response
		res.end();
	})
}


// creating HTTP server
const server = http.createServer(function(req, res){
	if (req.url == '/') {
		// if requesting page index
		sendFile('index.html', res);
	} else if (req.url == '/style.css') {
		// if requesting page stylesheet
		sendFile('style.css', res);
	} else if (req.url == '/client.js') {
		// if requesting page script
		sendFile('client.js', res);
	}
})

// initializing HTTP server
// listens for requests on the specified port number
// INPUT: port number
//
server.listen(port, function(error) {
	if (error) {
		// something went wrong
		// print error to console
		console.log('nope', error);
	} else {
		// successfully initialized server
		// print port to console
		console.log('yep' + port);
	}
})



// WebSockets library
const WebSocket = require("ws");

// Creating new WS server on port 2848
const wss = new WebSocket.Server({ port : 2848 });


// When a new client connects to the WS server
wss.on("connection",
	ws => {
		// Print to console
		console.log("New client connected.");

		// When new data is received
		ws.on("message", data => {
			// Print incoming data to console
			console.log(data);

			// Resend new data to all clients...
			wss.clients.forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
					// ... but only if their WS is still open
					client.send(data);
				}
			});

		});

		// When the WS is closed
		ws.on("close", () => {
			// Print confirmation to console
			console.log("Client has disconnected.");
		});
	}
);
