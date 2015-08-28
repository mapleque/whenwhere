<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();

//TODO: 参数检验

if (!isset($req->start)) {
	$ret = Party::getOneList();
} else if (!isset($req->num)) {
	$ret = Party::getOneList($req->start);
} else {
	$ret = Party::getOneList($req->start, $req->num);
}

Base::dieWithResponse($ret);
