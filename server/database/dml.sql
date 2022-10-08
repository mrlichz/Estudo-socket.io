use socketdb;
-- Create channel
insert into tb_channel (id_channel, nm_channel)
values (1, 'First');
-- Create message
insert into tb_message (ds_message, id_channel)
values ('cool', 1);
-- Get channel
select id_channel
from tb_channel
where id_channel = ?;
--Get messages
select id_message id,
    ds_message message
from tb_message
where id_channel = ?;
