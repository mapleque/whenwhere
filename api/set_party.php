<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();
//TODO: 参数检验

$uid = User::getUserId();
if (Party::setOne($req->key, $uid, $req->value)) {
	Base::dieWithResponse();
} else {
	Base::dieWithError(ERROR_INTERNAL);
}
