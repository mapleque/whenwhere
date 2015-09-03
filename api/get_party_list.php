<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();
//TODO: 参数检验

$uid = User::getUserId();

if (isset($req->attend)) {
	if (!isset($req->start)) {
		$ret = Party::getAttendList($uid);
	} else if (!isset($req->num)) {
		$ret = Party::getAttendList($uid, $req->start);
	} else {
		$ret = Party::getAttendList($uid, $req->start, $req->num);
	}
} else {
	if (!isset($req->start)) {
		$ret = Party::getHostList($uid);
	} else if (!isset($req->num)) {
		$ret = Party::getHostList($uid, $req->start);
	} else {
		$ret = Party::getHostList($uid, $req->start, $req->num);
	}
}

Base::dieWithResponse($ret);
