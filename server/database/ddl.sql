create schema socketdb;
create table tb_channel (
    id_channel int unique primary key,
    nm_channel varchar(20)
);
create table tb_message (
    id_message int primary key auto_increment,
    id_channel int,
    ds_message varchar(500),
    dt_sent date default(curdate()),
    foreign key (id_channel) references tb_channel (id_channel)
);
