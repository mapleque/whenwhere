<?php

require __DIR__ . '/../core/base.php';

$req = Base::getRequestJson();

//TODO: 参数检验

if (Party::setOne($req->key, $req->value)) {
	Base::dieWithResponse();
} else {
	Base::dieWithError(ERROR_INTERNAL);
}
