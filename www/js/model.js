(function(){
	'use strict';
	/**
	 * class base model
	 * private
	 * root class
	 */
	var BaseModelClass = function(){};
	BaseModelClass.prototype.fromJson = function(json){//通过json给类属性赋值
		if (typeof json !== 'object')
			return;
		for (var key in json){
			this[key]=json[key];
		}
	},
	BaseModelClass.prototype.toJsonStr = function(){//将当前类属性转成json
		return JSON.stringify(this);
	}
	Date.prototype.toString =
	Date.prototype.toJSON =
	function (){
		var str=[];
		str.push(this.getFullYear());
		str.push(this.getMonth()<9?'0'+(this.getMonth()+1):(this.getMonth()+1));
		str.push((this.getDate()<10?'0':'') + this.getDate());
		return str.join('-');
	}

	var M = window.M = {};
	/**
	 * class party
	 * public
	 * extend base model class
	 */
	var Party = M.Party = function() {
		this.pid = null;			//pid
		this.title = null;			//标题
		this.describe = null;		//详细说明
		this.member = [];			//参与人,其中带有参与信息
		this.createDate = null;		//创建时间
		this.author = null;			//创建人
		this.updateDate = null;		//最后修改时间
		this.when = [];				//拟聚会日期
		this.where = [];			//拟聚会地点
		this.isClose = false;		//是否已关闭

		this.memberWhen = [];		//参与人允许时间
		this.memberWhere = [];		//参与人推荐地点
	};
	Party.prototype = new BaseModelClass();

	/**
	 * class user 
	 * public
	 * extend base model class
	 */
	var User = M.User = function(){
		this.pid = null;			//pid
		this.username = null;		//username
		this.password = null;		//password
		this.nickname = null;		//昵称
		this.phone = null;			//电话
		this.hostParty = [];		//发起的聚会列表
		this.attendParty = [];		//参与的聚会列表
	};
	User.prototype = new BaseModelClass();

})();
