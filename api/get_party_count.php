<?php

require __DIR__ . '/../core/base.php';

//TODO: 参数检验

$ret = Party::getOneCount();

Base::dieWithResponse([ 'count' => $ret ]);
