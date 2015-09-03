<?php

require __DIR__ . '/../core/base.php';

$key = md5(time());

	Base::dieWithResponse(['key' => $key]);
