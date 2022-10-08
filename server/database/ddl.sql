create schema chatdb;
create table tb_user (
    id_user int primary key auto_increment,
    nm_user varchar(30) not null,
    ds_user varchar(300),
    img_user varchar(300),
    dt_created date default(curdate())
);
create table tb_user_login (
    id_user_login int primary key auto_increment,
    id_user int not null,
    ds_email varchar(200) not null,
    ds_password varchar(32) not null,
    foreign key (id_user) references tb_user (id_user)
);
create table tb_channel (
    id_channel int unique primary key,
    id_creator int not null,
    dt_created date default(curdate()),
    foreign key (id_creator) references tb_user (id_user)
);
create table tb_message (
    id_message int primary key auto_increment,
    id_channel int not null,
    id_user int not null,
    ds_message varchar(500) not null,
    dt_sent date default(curdate()),
    foreign key (id_channel) references tb_channel (id_channel),
    foreign key (id_user) references tb_user (id_user)
);
