import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./index.sass";

const socket = io.connect("http://localhost:5050");

const Index = () => {
	const [message, setMessage] = useState("");
	const [rec, setRec] = useState([]);

	const send = () => {
		socket.emit("send", {
			message: message,
		});
	};

	useEffect(() => {
		socket.on("receive", (data) => {
			setRec([...rec, data.message]);
		});
	});

	return (
		<div>
			<h1>Chat</h1>
			<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
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
