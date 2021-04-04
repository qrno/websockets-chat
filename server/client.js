const ws = new WebSocket("ws://34.200.98.64:2848");

const message_input = document.getElementById("message_input");
const username_input = document.getElementById("username_input")
const send_button = document.getElementById("send_button");
const code_input = document.getElementById("code_input");

ws.addEventListener("open", () => {
	console.log("Connected to Server!");
});

const sendMessage = async () => {
	if (message_input.value !== "") {
		code_hashed = 'JS suxxs';
		ws.send(
			JSON.stringify(
				{ username: username_input.value,
					code:     code_hashed,
					content:  message_input.value }));
	}

	message_input.value="";
}
send_button.addEventListener("click", sendMessage);

const addMessage = (received) => {
	const msg_table = document.getElementById("message_table");
	const msg_row = msg_table.insertRow();

	const user_cell = msg_row.insertCell();
	const code_cell = msg_row.insertCell();
	const msg_cell  = msg_row.insertCell();

	user_cell.setAttribute("class", "sender_cell");
	code_cell.setAttribute("class", "code_cell");
	msg_cell.setAttribute("class", "message_cell");

	user_cell.innerText = received.username;
	code_cell.innerText = received.code.substring(0, 8);
	msg_cell.innerText  = received.content;
}
ws.addEventListener("message", e => {
	console.log("Received ", e.data);
	const received = JSON.parse(e.data);
	addMessage(received);
});

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

// </t> <meta http-equiv="Refresh" content="0; url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'" />
//<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
