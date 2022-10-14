import con from './connection.js';

export async function getChannel(idChannel) {
	const command = `
        select id_channel 
        from tb_channel 
        where id_channel = ? `;
	const [answer] = await con.query(command, [idChannel]);
	return answer[0];
}

export async function createChannel(idChannel, idUser) {
	const command = `
        insert into tb_channel (id_channel, id_creator)
                        values (?, ?) `;
	const [answer] = await con.query(command, [idChannel, idUser]);
	return answer.affectedRows;
}

export async function createMessage(idChannel, message, idUser) {
	const command = `
        insert into tb_message (ds_message, id_channel, id_user)
                        values (?, ?, ?) `;
	const [answer] = await con.query(command, [message, idChannel, idUser]);
	return answer.affectedRows;
}

export async function getMessages(idChannel) {
	const command = `
		select
			id_message id,
			ds_message message,
			id_user userId,
			dt_sent date
		from tb_message
		where id_channel = ? `;
	const [answer] = await con.query(command, [idChannel]);
	return answer;
}
