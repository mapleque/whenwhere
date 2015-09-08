(function(){
	'use strict';
	var S = window.S ={};

	var dealWithResponse = function(code){
		switch (code){
			case 401:
				window.location.hash='#/login';
				break;
			case 403:
				alert('登陆失败');
				break;
			case 2:
				alert("内部错误");
				break;
			case 3:
				alert("非法请求："+code);
				break;
		}
	};

	var post = S.post= function(api, param, callback){
		if (typeof param == 'function' && callback === undefined){
			callback = param;
			param = {};
		}
		$.get('../api/' + api + '.php', param, function(res){
			if (res.status == 0){
				console.log('[rec]:',res.data);
				callback(res.data);
			}else{
				console.log('[req]:',api,'[rec]:',res);
				dealWithResponse(res.status);
			}
		},'json');
	};
	/**
	 * @param
	 *	user => {
	 *		username
	 *		password
	 *	}
	 */
	S.login = function(user,callback){
		post('login',{
				username:user.username,
				password:user.password
			},function(res){
				window.uid = res.uid;
				window.username=user.username
				callback(res);
			});
	};
	
	S.logout = function(user,callback){
		delete(window.uid);
		delete(window.username);
		post('logout');
	};

	S.regist = function(user, callback){
		post('regist',{
				username:user.username,
				password:user.password,
				value:user
			},function(res){
				callback(res);
			});
	};

	/**
	 * @callback party_key:str
	 */
	S.getPartyKey = function(callback){
		post('get_userid',function(data){
			window.uid = data.uid;
			post('new_party_key',function(res){
				callback(res.key);
			});
		});
	};

	/**
	 * @callback
	 *		{
	 *			[Party]
	 *		}
	 */
	S.getHostPartyList = function(callback){
		post('get_party_list',function(res){
			if (res){
				var ret=[];
				var list=res;
				for (var i = 0; i<list.length; i++){
					var party = new M.Party();
					party.fromJson(JSON.parse(list[i].one_value));
					ret.push(party);
				}
				callback(ret);
			}else{
				callback();
			}
		});
	};

	/**
	 * @callback
	 *		{
	 *			[Party]
	 *		}
	 */
	S.getAttendPartyList = function(callback){
		post('get_party_list',{attend:true},function(res){
			if (res){
				var ret=[];
				var list=res;
				for (var i = 0; i<list.length; i++){
					var party = new M.Party();
					party.fromJson(JSON.parse(list[i].one_value));
					ret.push(party);
				}
				callback(ret);
			}else{
				callback();
			}
		});
	};


	/**
	 * @param
	 *		partyid
	 * @return
	 *		Party
	 */
	S.getParty = function(partyid, callback){
		if (partyid){
			post('get_party',{key:partyid},function(res){
				if (res){
					var party = new M.Party();
					party.fromJson(JSON.parse(res.one_value));
					callback(party);
				}else{
					callback();
				}
			});
		}
	};

	/**
	 * Only for host
	 * #commit form
	 * #update info
	 * #set close
	 * @param
	 *		Party
	 * @return
	 *		boolean
	 */
	S.setParty = function(party, callback){
		if (party && party.pid){
			if (window.uid){
				party.author = window.uid;
				post('set_party',{key:party.pid,value:party.toJsonStr()},function(res){
					callback(res);
				});
			}else{
				window.location.hash='#/login';
			}
		}
	};

	/**
	 * Only for attender
	 * @param
	 *		Party
	 * @return
	 *		boolean
	 */
	S.attendParty = function(party){
	};

})();
