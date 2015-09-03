<?php

/**
 * a party class
 */
class Party
{

	public static function getOne($key)
	{
		$sql = 'SELECT one_key, one_value
				FROM party
				WHERE one_key = ? LIMIT 1';
		return DB::select($sql, [ $key ])[0];
	}

	public static function setOne($key, $uid, $value)
	{
		$sql = 'INSERT INTO party (one_key, user_id, one_value) VALUES (?, ?, ?)
				ON DUPLICATE KEY UPDATE user_id = ?, one_value = ?';
		$bind = [ $key, $uid, $value, $uid, $value ];
		return DB::insert($sql, $bind) >= 0;
	}

	public static function getHostCount($uid)
	{
		$sql = 'SELECT count(one_key) as c
				FROM party
				WHERE user_id = ?
				';
		$ret = DB::select($sql, [ $uid ]);
		return $ret[0]['c'];
	}

	public static function getHostList($uid, $start = 0, $num = 10)
	{
		$sql = 'SELECT one_key, one_value
				FROM party
				WHERE user_id = ?
				LIMIT ? OFFSET ?';
		$bind = [ $uid, $num, $start ];
		return DB::select($sql, $bind);
	}

	public static function getAttendCount($uid)
	{
		$sql = 'SELECT count(p.one_key) as c
				FROM party AS p
				LEFT JOIN attend_party AS a
				ON p.one_key = a.party_id
				WHERE a.user_id = ?
				';
		$ret = DB::select($sql, [ $uid ]);
		return $ret[0]['c'];
	}
	public static function getAttendList($uid, $start = 0, $num = 10)
	{
		$sql = 'SELECT p.one_key as one_key, p.one_value as one_value
				FROM party AS p
				LEFT JOIN attend_party AS a
				ON p.one_key = a.party_id
				WHERE a.user_id = ?
				LIMIT ? OFFSET ?';
		$bind = [ $uid, $num, $start ];
		return DB::select($sql, $bind);
	}

	//method for admin
	public static function delOne($key)
	{
		$sql = 'DELETE FROM party
				WHERE one_key = ?';
		return DB::delete($sql,[ $key ]) >= 0;
	}

	public static function getOneCount()
	{
		$sql = 'SELECT count(one_key) as c
				FROM party';
		$ret = DB::select($sql);
		return $ret[0]['c'];
	}

	public static function getOneList($start = 0, $num = 10)
	{
		$sql = 'SELECT one_key, one_value
				FROM party
				LIMIT ? OFFSET ?';
		$bind = [ $num, $start ];
		return DB::select($sql, $bind);
	}
}
