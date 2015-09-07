<?php

require __DIR__ . '/../core/base.php';

$uid = User::getUserId();

$ret = User::getOne($uid);

Base::dieWithResponse($ret);
