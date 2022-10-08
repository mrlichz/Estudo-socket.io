import con from "./connection.js";

export async function newUser(name, email, password) {
	const command = `
        insert into tb_user (nm_user)
        values(?);
        set @last = last_insert_id();
        insert into tb_user_login (id_user, ds_email, ds_password)
        values (@last, ?, md5(?)); `;
	const [answer] = await con.query(command, [name, email, password]);
	return answer.affectedRows;
}

export async function userLogin(email, password) {
	const command = `
        select
            id_user id,
            ds_email email
        from tb_user_login
        where ds_email = ? and ds_password = md5(?) `;
	const [answer] = await con.query(command, [email, password]);
	return answer[0];
}

export async function getUserByEmail(email) {
	const command = `
        select id_user id
        from tb_user_login
        where ds_email = ? `;
	const [answer] = await con.query(command, [email]);
	if (!answer[0]) return false;
	return true;
}
