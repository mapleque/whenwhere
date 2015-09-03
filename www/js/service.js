(function(){
	'use strict';
	var S = window.S ={};

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
				callback();
			}
		},'json');
	};

	/**
	 * @return party_key:str
	 */
	S.getPartyKey = function(callback){
		post('new_party_key',function(res){
			callback(res.key);
		});
	};

	/**
	 * @param
	 *		userid
	 * @return 
	 *		{
	 *			host:[Party],
	 *			attend:[Party]
	 *		}
	 */
	S.getPartyList = function(userid, callback){
		post('get_party_list',{uid:userid},function(res){
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
	S.getParty = function(partyid, userid, callback){
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
			post('set_party',{key:party.pid,value:party.toJsonStr()},function(res){
				callback(res);
			});
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
