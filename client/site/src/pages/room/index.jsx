import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import io from 'socket.io-client';
import { createMessage, getMessages, joinRoom } from '../../api/roomApi';
import { baseURL } from '../../api/services';
import { Title } from '../../styled';
import { toast } from 'react-toastify';
import ChatItem from '../../components/chat';
import './index.sass';

const socket = io.connect(baseURL);

const rnd = () => Math.random() * 9999;

const Index = () => {
	const [message, setMessage] = useState('');
	const [room, setRoom] = useState(1);
	const [rec, setRec] = useState([]);
	const lastMsg = useRef(null);

	const send = () => {
		if (!message || !message.trim()) return;

		socket.emit('send-room', {
			message,
			room,
		});

		const save = async () => {
			const r = await createMessage(room, message);
			if (r !== 204) toast.warning("Couldn't save the message");
		};
		save();
		setRec([...rec, { id: rnd(), message, local: true }]);
		setMessage('');
	};

	const join = async () => {
		if (isNaN(Number(room)) || room <= 0) {
			alert('The inserted room is invalid');
			return;
		}
		const r = await joinRoom(room);
		if (r !== 204) toast.error("Couldn't enter the room");
		socket.emit('join', room);
		const m = await getMessages(room);
		setRec(m);
		toast.success('Connected');
	};

	useEffect(() => {
		socket.on('receive-room', data => {
			setRec([...rec, { message: data.message }]);
		});
	});

	useEffect(() => {
		lastMsg.current?.scrollIntoView();
	}, [rec]);

	return (
		<div className='room page'>
			<main>
				<Title
					color='#424242'
					font='4vw'>
					Chat
				</Title>
				<FormControl sx={{ m: 1, width: '100%', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
					<TextField
						margin='dense'
						type='number'
						label='Room'
						variant='outlined'
						value={room}
						onChange={e => setRoom(e.target.value)}
					/>
					<Button
						onClick={() => join()}
						variant='contained'
						sx={{ width: '30px', height: '53px', margin: 'none' }}>
						Join
					</Button>
				</FormControl>
				<br />

				<section className='feed'>
					{rec.map(item => (
						<ChatItem
							key={rnd()}
							user={item.userId}
							message={item.message}
							local={item.local}
						/>
					))}
					<div ref={lastMsg} />
				</section>

				<FormControl sx={{ m: 1, width: '100%', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
					<TextField
						margin='dense'
						type='text'
						label='Message'
						variant='outlined'
						value={message}
						onChange={e => setMessage(e.target.value)}
						sx={{ width: '100%' }}
					/>
					<Button
						onClick={() => send()}
						variant='contained'
						sx={{ width: '30px', height: '53px', margin: 'none' }}>
						Send
					</Button>
				</FormControl>
			</main>
		</div>
	);
};

export default Index;
