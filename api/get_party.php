<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();

//TODO: 参数检验

$ret = Party::getOne($req->key);

Base::dieWithResponse($ret);
