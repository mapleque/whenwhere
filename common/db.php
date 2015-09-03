<?php

class DB
{
	public static function select($query, $bind = null)
	{
		return self::getDB()->select($query, $bind);
	}

	public static function insert($query, $bind = null)
	{
		return self::getDB()->insert($query, $bind);
	}

	public static function delete($query, $bind = null)
	{
		return self::getDB()->exec($query, $bind);
	}

	public static function update($query, $bind = null)
	{
		return self::getDB()->exec($query, $bind);
	}

	public static function exec($query, $bind = null)
	{
		return self::getDB()->exec($query, $bind);
	}

	public static function beginTransaction()
	{
		self::getDB()->beginTransaction();
	}

	public static function endTransaction($commit)
	{
		self::getDB()->endTransaction($commit);
	}

	private static function getDB()
	{
		if (self::$conn === null) {
			$callbacks = [
				'error' => [ __CLASS__, 'errorCallback' ],
				'assert' => [ __CLASS__, 'assertCallback' ],
				'debug' => [ __CLASS__, 'debugCallback' ],
			];
			self::$conn = new DBConn(
				Important::DB_ADDR,
				Important::DB_USER,
				Important::DB_PASS,
				Important::DB_NAME,
				Important::DB_PORT,
				$callbacks
			);
		}
		return self::$conn;
	}

	public static function errorCallback($err)
	{
		if (Important::ERROR_LOG) {
			Base::dieWithError(ERROR_DB_ERROR, $err);
		} else {
			Base::dieWithError(ERROR_DB_ERROR);
		}
	}

	public static function assertCallback($sql, $bind, $err)
	{
		if (Important::ERROR_LOG) {
			ob_start();
			debug_print_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
			$trace = ob_get_contents();
			ob_end_clean();
			echo '<br>' . nl2br(str_replace(' ', '&nbsp;', $trace)) . '<hr>';
			echo 'SQL:' . $sql . '<br>' . $err;
		}
		Base::dieWithError(ERROR_DB_ERROR);
	}

	public static function debugCallback($sql, $bind)
	{
	}

	private static $conn = null;
}
