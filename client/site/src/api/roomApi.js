import axios from "axios";
import { baseURL, token } from "./services";

const api = axios.create({ baseURL: baseURL });

export async function joinRoom(id) {
	const r = await api.post(
		`/channel/${id}`,
		{},
		{
			headers: {
				"x-access-token": token,
			},
		}
	);
	return r.status;
}

export async function createMessage(id, message) {
	const r = await api.post(
		`/message/${id}`,
		{
			message,
		},
		{
			headers: {
				"x-access-token": token,
			},
		}
	);
	return r.status;
}

export async function getMessages(id) {
	const r = await api.get(`/message/${id}`);
	return r.data;
}
