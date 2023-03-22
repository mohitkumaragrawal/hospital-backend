-- create a bunch of tables;

create table hospital;

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

create table
    hospitals (
        id serial primary key,
        name varchar(255) not null,
        address varchar(255) not null,
        root_mail varchar(255) not null,
        root_pass varchar(255) not null,
        coords point not null srid 4326 default(
            ST_GeomFromText('POINT(-100 -100)', 4326)
        ),
        created_at timestamp not null default now(),
        spatial index(coords)
    );

alter table hospitals add unique(root_mail);

alter table hospitals add verfied_mail tinyint not null default 0;