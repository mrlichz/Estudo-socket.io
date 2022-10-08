import { Router } from "express";
import { createChannel, createMessage, getChannel, getMessages } from "../repositories/messageRepository.js";

const server = Router();

server.post("/channel/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const exists = await getChannel(id);
		if (!exists) {
			const r = await createChannel(id);
			if (r < 1) throw new Error("Cannot create this channel");
			console.log("Channel created");
		}
		res.status(204).send();
	} catch (err) {
		res.status(400).send({ err: err.message });
	}
});

server.post("/message/:id/:message", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const message = req.params.message;
		const r = await createMessage(id, message);
		if (r < 1) throw new Error("Cannot create this message");
		res.status(204).send();
	} catch (err) {
		res.status(400).send({ err: err.message });
	}
});

server.get("/message/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const exists = await getChannel(id);
		if (!exists) throw new Error("Channel not found");
		const r = await getMessages(id);
		res.status(200).send(r);
	} catch (err) {
		res.status(400).send({ err: err.message });
	}
});

export default server;
