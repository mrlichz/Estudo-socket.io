import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getUserByEmail, newUser, userLogin } from '../repositories/userRepository.js';

const server = Router();
const emailTest = email => email && (email.length <= 200 ? /^[a-z 0-9 A-Z]+@[a-z]+\.[a-z]{2,3}/.test(email) : false);

server.post('/user', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !name.trim() || name.length > 30) throw new Error('Invalid name');
		else if (!email || !emailTest(email)) throw new Error('Invalid email');
		else if (!password) throw new Error('Invalid password');
		else if (await getUserByEmail(email)) throw new Error('The user already exists');
		const answer = await newUser(name, email, password);
		if (answer < 1) throw new Error("Couldn't create account");
		res.status(204).send();
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

server.post('/user/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !emailTest(email)) throw new Error('Invalid email');
		else if (!password) throw new Error('Invalid password');
		else if (!(await getUserByEmail(email))) throw new Error("The user doesn't exist");
		const answer = await userLogin(email, password);
		if (!answer) throw new Error('Invalid credentials');
		const token = jwt.sign(answer, process.env.JWT_KEY, { expiresIn: '1h' });
		res.status(201).send({ id: answer.id, token });
	} catch (err) {
		res.status(400).send({
			err: err.message,
		});
	}
});

export default server;
