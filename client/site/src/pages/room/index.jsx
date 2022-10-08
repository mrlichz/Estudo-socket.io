import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { createMessage, getMessages, joinRoom } from "../../api/roomApi";
import { baseURL } from "../../api/services";
import "./index.sass";

const socket = io.connect(baseURL);

const Index = () => {
	const [message, setMessage] = useState("");
	const [room, setRoom] = useState("");
	const [rec, setRec] = useState([]);

	const send = () => {
		if (!message || !message.trim()) return;

		socket.emit("send-room", {
			message,
			room,
		});

		const send = async () => {
			const r = await createMessage(room, message);
			if (r !== 204) alert("Couldn't save the message");
		};
		send();
	};

	const join = async () => {
		if (isNaN(Number(room)) || room <= 0) {
			alert("The inserted room is invalid");
			return;
		}
		const r = await joinRoom(room);
		if (r !== 204) alert("Couldn't enter the room");
		socket.emit("join", room);
		const m = await getMessages(room);
		setRec(m);
		alert("Connected");
	};

	useEffect(() => {
		socket.on("receive-room", (data) => {
			setRec([...rec, { message: data.message }]);
		});
		console.log(rec);
	});

	return (
		<div>
			<h1>Chat</h1>
			<input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Room" />
			<button onClick={() => join()}>Join</button>
			<br />
			<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
			<button onClick={() => send()}>Send</button>
			<section>
				{rec.map((item) => (
					<li key={item}>{item.message}</li>
				))}
			</section>
		</div>
	);
};

export default Index;
