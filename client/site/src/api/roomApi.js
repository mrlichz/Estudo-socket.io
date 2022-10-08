import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5050" });

export async function joinRoom(id) {
	const r = await api.post(`/channel/${id}`);
	return r.status;
}

export async function createMessage(id, message) {
	const r = await api.post(`/message/${id}/${message}`);
	return r.status;
}

export async function getMessages(id) {
	const r = await api.get(`/message/${id}`);
	return r.data;
}
