import axios from 'axios';
import { baseURL } from './services';

const api = axios.create({ baseURL: baseURL });

export async function userLogin(email, password) {
	const r = await api.post('/user/login', {
		email,
		password,
	});
	return r.data;
}

export async function newUser(name, email, password) {
	const r = await api.post('/user', {
		name,
		email,
		password,
	});
	return r.status;
}
