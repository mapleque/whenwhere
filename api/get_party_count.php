<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();
//TODO: 参数检验

$uid = User::getUserId();
if (isset($req->attend)) {
	$ret = Party::getAttendCount($uid);
} else {
	$ret = Party::getHostCount($uid);
}

Base::dieWithResponse([ 'count' => $ret ]);
