// Server code

const WebSocket = require("ws")
const wss = new WebSocket.Server({ port : 24642 });

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
