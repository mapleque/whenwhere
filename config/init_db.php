<?php

require __DIR__ . '/../core/base.php';

DB::exec('DROP TABLE IF EXISTS user;');
DB::exec('
	create table user(
		`one_key` varchar(32) not null unique primary key,
		`username` varchar(32) not null unique,
		`password` varchar(32) not null,
		`one_value` blob
	);
');

DB::exec('DROP TABLE IF EXISTS party;');
DB::exec('
	create table party (
		`one_key` varchar(32) not null unique primary key,
		`user_id` varchar(32) not null,
		`one_value` blob
	);
');

DB::exec('DROP TABLE IF EXISTS attend_party;');
DB::exec('
	create table attend_party (
		`one_key` varchar(32) not null unique primary key,
		`party_id` varchar(32) not null,
		`user_id` varchar(32) not null,
		`one_value` blob
	);
');
DB::exec('CREATE UNIQUE INDEX puid on attend_party(`party_id`, `user_id`);');

DB::exec('DROP TABLE IF EXISTS when_party;');
DB::exec('
	create table when_party (
		`one_key` varchar(32) not null unique primary key,
		`party_id` varchar(32) not null,
		`user_id` varchar(32) not null,
		`one_value` blob
	);
');
DB::exec('CREATE UNIQUE INDEX puid on when_party(`party_id`, `user_id`);');

DB::exec('DROP TABLE IF EXISTS where_party;');
DB::exec('
	create table where_party (
		`one_key` varchar(32) not null unique primary key,
		`party_id` varchar(32) not null,
		`user_id` varchar(32) not null,
		`one_value` blob
	);
');
DB::exec('CREATE UNIQUE INDEX puid on where_party(`party_id`, `user_id`);');
