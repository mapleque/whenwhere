<?php

require __DIR__ . '/../core/base.php';

$sql = '
	create table party ( `one_key` varchar(32) not null unique primary key, `one_value` blob);
';

DB::exec($sql);
