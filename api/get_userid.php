<?php

require __DIR__ . '/../core/base.php';

$uid = User::getUserId();

Base::dieWithResponse([ 'uid' => $uid ]);
