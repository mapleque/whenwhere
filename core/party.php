<?php

/**
 * a party class
 */
class Party
{
  private static $table = 'party';

	public static function getOne($key)
	{
		$sql = 'SELECT one_key, one_value
				FROM '. self::$table .'
				WHERE one_key = ? LIMIT 1';
		return DB::select($sql, [ $key ])[0];
	}

	public static function setOne($key, $value)
	{
		$sql = 'INSERT INTO '. self::$table .' (one_key, one_value) VALUES (?, ?)
				ON DUPLICATE KEY UPDATE one_value = ?';
		$bind = [ $key, $value, $value ];
		return DB::insert($sql, $bind) >= 0;
	}

	public static function delOne($key)
	{
		$sql = 'DELETE FROM '. self::$table .'
				WHERE one_key = ?';
		return DB::delete($sql,[ $key ]) >= 0;
	}

	public static function getOneCount()
	{
		$sql = 'SELECT count(one_key) as c
				FROM '. self::$table;
		$ret = DB::select($sql);
		return $ret[0]['c'];
	}

	public static function getOneList($start = 0, $num = 10)
	{
		$sql = 'SELECT one_key, one_value
				FROM '. self::$table .'
				LIMIT ? OFFSET ?';
		$bind = [ $num, $start ];
		return DB::select($sql, $bind);
	}
}
