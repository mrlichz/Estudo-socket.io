import { Router } from "express";
import { createChannel, createMessage, getChannel, getMessages } from "../repositories/messageRepository.js";
import jwt, { decode } from "jsonwebtoken";

const server = Router();

server.post("/channel/:id", async (req, res) => {
	try {
		const token = req.header("x-access-token");
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		const id = Number(req.params.id);
		const exists = await getChannel(id);
		if (!exists) {
			const r = await createChannel(id, decoded.id);
			if (r < 1) throw new Error("Cannot create this channel");
		}
		res.status(204).send();
	} catch (err) {
		res.status(400).send({ err: err.message });
	}
});

server.post("/message/:id", async (req, res) => {
	try {
		const token = req.header("x-access-token");
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		const id = Number(req.params.id);
		const message = req.body.message;
		const r = await createMessage(id, message, decoded.id);
		if (r < 1) throw new Error("Cannot save this message");
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
