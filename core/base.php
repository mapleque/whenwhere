<?php

require dirname(__FILE__) . '/../common/include.php';
require dirname(__FILE__) . '/../common/status.php';

ClassLoader::appendMap([
	'Party'			=> 'party',
	'User'			=> 'user',
]);
