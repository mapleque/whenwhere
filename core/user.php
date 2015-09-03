<?php

class User
{
	public static function getUserId()
	{
		session_start();
		$uid = $_SESSION['uid'];
		if (self::isExist($uid))
			return $uid;
		Base::dieWithError(ERROR_INTERNAL);
	}
	public static function login($username, $password)
	{
		session_start();
		$user = self::getByUsername($username);
		if (isset($user) && $user['password'] === md5($password)){
			$_SESSION['uid'] = $user['one_key'];
			return true;
		}
		unset($_SESSION['uid']);
		return false;
	}
	public static function logout()
	{
		session_start();
		unset($_SESSION['uid']);
	}

	public static function isExist($key){
		$sql = 'SELECT count(one_key) as c
				FROM user
				WHERE one_key = ?';
		$ret = DB::select($sql, [ $key ]);
		return $ret[0]['c']>0;
	}

	public static function getOne($key)
	{
		$sql = 'SELECT one_key, username, password, one_value
				FROM user
				WHERE one_key = ? LIMIT 1';
		return DB::select($sql, [ $key ])[0];
	}

	public static function getByUsername($username)
	{
		$sql = 'SELECT one_key, username, password, one_value
				FROM user
				WHERE username = ? LIMIT 1';
		return DB::select($sql, [ $username ])[0];
	}

	public static function setOne($key, $username, $pass, $value)
	{
		$password = md5($pass);
		$sql = 'INSERT INTO user (one_key, username, password, one_value) VALUES (?, ?, ?, ?)
				ON DUPLICATE KEY UPDATE username = ?, password = ?, one_value = ?';
		$bind = [ $key, $username, $password, $value, $username, $password, $value ];
		return DB::insert($sql, $bind) >= 0;
	}

	public static function updatePassword($key, $pass)
	{
		$password = md5($pass);
		$sql = 'UPDATE user SET password = ?
				WHERE one_key = ?';
		$bind = [ $password, $key ];
		return DB::insert($sql, $bind) >= 0;
	}

	public static function updateValue($key, $value)
	{
		$sql = 'UPDATE user SET one_value = ?
				WHERE one_key = ?';
		$bind = [ $value, $key ];
		return DB::insert($sql, $bind) >= 0;
	}

	public static function delOne($key)
	{
		$sql = 'DELETE FROM user
				WHERE one_key = ?';
		return DB::delete($sql,[ $key ]) >= 0;
	}

	public static function getOneCount()
	{
		$sql = 'SELECT count(one_key) as c
				FROM user';
		$ret = DB::select($sql);
		return $ret[0]['c'];
	}

	public static function getOneList($start = 0, $num = 10)
	{
		$sql = 'SELECT one_key, username, password, one_value
				FROM user
				LIMIT ? OFFSET ?';
		$bind = [ $num, $start ];
		return DB::select($sql, $bind);
	}
}
