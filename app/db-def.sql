-- create a bunch of tables;

create database hospital;

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

alter table users add column image varchar(100);

alter table doctors add column image varchar(100);

alter table hospitals add column image varchar(100);

create table timeslots(
    id serial primary key,
    doctor_id bigint unsigned not null,
    day_of_week varchar(10),
    start_time time,
    end_time time
);

alter table timeslots add constraint foreign key(doctor_id) references doctors(id);

 alter table timeslots add column is_booked boolean default false;

alter table doctors add column hospital_id bigint unsigned;

alter table doctors add constraint foreign key(hospital_id) references hospitals(id);

alter table doctors rename column password to qualifications;

create table bookings(
    id serial primary key,
    booking_id bigint unsigned,
    patient_id bigint unsigned,
    foreign key(booking_id) references timeslots(id),
    foreign key(patient_id) references users(id));

alter table bookings rename column booking_id to timeslot_id;

create table tests(
     test_id serial,
     name varchar(30),
     description varchar(100),
     hospital bigint unsigned,
     foreign key(hospital) references hospitals(id));

alter table tests add column image varchar(100);

alter table timeslots drop column is_booked;

alter table timeslots add column no_of_bookings integer default 0;

alter table timeslots add column total_bookings integer;

alter table timeslots add constraint check(no_of_bookings<=total_bookings);

alter table hospitals drop column coords;

alter table timeslots modify start_time varchar(20);

alter table timeslots modify end_time varchar(20);

alter table bookings add constraint unique(timeslot_id,patient_id);

delete from hospitals;
alter table hospitals add column coords point not null srid 4326;
alter table hospitals add spatial index(coords);
