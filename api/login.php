<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();

//TODO: 参数检验

if (User::login($req->username, $req->password)) {
	Base::dieWithResponse(['uid' => $_SESSION['uid']]);
} else {
	Base::dieWithError(ERROR_INTERNAL);
}
