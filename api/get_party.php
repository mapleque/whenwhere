<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();

//TODO: 参数检验

$ret = Party::getOne($req->key);

if (isset($ret)) {
	$party = json_decode($ret['one_value']);

	$member = Party::getMember($req->key);
	$party->member = $member;

	$when = Party::getMemberWhen($req->key);
	$party->memberWhen = $when;

	$where = Party::getMemberWhere($req->key);
	$party->memberWhere = $where;

	$ret['one_value'] = json_encode($party);
}

Base::dieWithResponse($ret);
