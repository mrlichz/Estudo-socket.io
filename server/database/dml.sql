use socketdb;
-- Sign up
insert into tb_user (nm_user)
values('yolo');
set @last = last_insert_id();
insert into tb_user_login (id_user, ds_email, ds_password)
values (@last, 'mrlichz0x01@hi.co', md5('hash'));
-- Sign in
select id_user id,
    nm_user name,
    ds_email email
from tb_user_login
    inner join tb_user on tb_user_login.id_user = tb_user.id_user
where tb_user_login.ds_password = md5('hash');
-- Create channel
insert into tb_channel (id_channel, id_creator, nm_channel)
values (1, 1, 'First');
-- Create message
insert into tb_message (id_channel, id_user, ds_message)
values (1, 1, 'cool');
-- Get channel
select id_channel
from tb_channel
where id_channel = 1;
--Get messages
select id_message id,
    ds_message message
from tb_message
where id_channel = 1;
