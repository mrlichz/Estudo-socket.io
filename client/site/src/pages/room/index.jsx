import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./index.sass";

const socket = io.connect("http://localhost:5050");

const Index = () => {
	const [message, setMessage] = useState("");
	const [room, setRoom] = useState("");
	const [rec, setRec] = useState([]);

	const send = () => {
		socket.emit("send-room", {
			message,
			room,
		});
	};

	const join = () => {
		socket.emit("join", room);
	};

	useEffect(() => {
		socket.on("receive-room", (data) => {
			setRec([...rec, data.message]);
		});
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
					<li>{item}</li>
				))}
			</section>
		</div>
	);
};

export default Index;
