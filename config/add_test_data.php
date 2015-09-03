<?php

require __DIR__ . '/../core/base.php';

DB::exec('insert into user value(1,1,1,1)');
DB::exec('insert into user value(2,2,1,1)');

DB::exec('insert into party value(1,1,1)');
DB::exec('insert into party value(2,2,2)');

DB::exec('insert into attend_party value(1,2,1,1)');
DB::exec('insert into attend_party value(2,1,2,1)');
