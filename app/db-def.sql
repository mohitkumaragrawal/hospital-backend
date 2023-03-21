-- create a bunch of tables;

create table
    users (
        id serial primary key,
        name varchar(255) not null,
        email varchar(255) not null,
        password varchar(255) not null,
        created_at timestamp not null default now()
    );

create table
    doctors (
        id serial primary key,
        name varchar(255) not null,
        email varchar(255) not null,
        password varchar(255) not null,
        speciality varchar(255),
        created_at timestamp not null default now()
    );

alter table users add unique(email);

alter table doctors add UNIQUE(email);

alter table users add (verified tinyint not null default 0);

alter table doctors add (verfied tinyint not null default 0);