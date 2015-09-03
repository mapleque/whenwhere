<?php

require __DIR__ . '/../core/base.php';

$sql = '
	create table party ( `one_key` varchar(32) not null unique primary key, `one_value` blob);
';

DB::exec($sql);

$sql = '
	create table attend_party (
		`one_key` varchar(32) not null unique primary key,
		`two_key` varchar(32) not null,
		`one_value` blob
	);
';

DB::exec($sql);

$sql = '
	create table when_party (
		`one_key` varchar(32) not null unique primary key,
		`two_key` varchar(32) not null,
		`one_value` blob
	);
';

DB::exec($sql);

$sql = '
	create table where_party (
		`one_key` varchar(32) not null unique primary key,
		`two_key` varchar(32) not null,
		`one_value` blob
	);
';

DB::exec($sql);
