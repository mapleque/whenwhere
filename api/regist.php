<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();

if (User::setOne(md5(time()), $req->username, $req->password, $req->value)) {
	Base::dieWithResponse();
} else {
	Base::dieWithError(ERROR_INTERNAL);
}
