import con from "./connection.js";

export async function getChannel(idChannel) {
	const command = `
        select id_channel 
        from tb_channel 
        where id_channel = ? `;
	const [answer] = await con.query(command, [idChannel]);
	return answer[0];
}

export async function createChannel(idChannel) {
	const command = `
        insert into tb_channel (id_channel)
                        values (?) `;
	const [answer] = await con.query(command, [idChannel]);
	return answer.affectedRows;
}

export async function createMessage(idChannel, message) {
	const command = `
        insert into tb_message (ds_message, id_channel)
                        values (?, ?) `;
	const [answer] = await con.query(command, [message, idChannel]);
	return answer.affectedRows;
}
