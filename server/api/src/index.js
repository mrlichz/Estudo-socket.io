import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const origin = process.env.ORIGIN ?? "http://localhost:3000";
const port = process.env.PORT ?? 5050;
const io = new Server(server, {
	cors: {
		origin: origin,
		methods: ["GET", "POST"],
	},
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
	socket.on("send", (data) => {
		socket.broadcast.emit("receive", data);
	});

	socket.on("join", (data) => {
		socket.join(data);
	});

	socket.on("send-room", (data) => {
		socket.to(data.room).emit("receive-room", data);
	});
});

server.listen(port, () => console.log(`Server running at ${port}`));
