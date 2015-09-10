<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();

$uid = User::getUserId();

if (Party::attendOne($uid, $req->pid, $req->when, $req->where)) {
	Base::dieWithResponse();
} else {
	Base::dieWithError(ERROR_INTERNAL);
}

