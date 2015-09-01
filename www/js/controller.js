/**
 * use jquery for selector
 */
(function(){
	'use strict';

	var C = window.C = {};

	/**
	 * 这是默认视图载入方法，必须有定义,可以不实现
	 */
	var showIndex = C.showIndex = function(param){
	};

	/** 以下是自定义视图载入方法及交互 **/

	/**
	 * @param
	 *		uid => user id
	 */
	var showList = C.showList = function(param){
		var partyListView = new V.List();
		partyListView.init($('#party-list-root'),$('#party-list-template'),{});
		var partyList = S.getPartyList(param.uid);
		partyListView.setData(partyList);
	};

	/**
	 * @param
	 *		uid => user id
	 *		pid => party id
	 */
	var showParty = C.showParty = function(param){
		if (!param.pid){
			S.getPartyKey(function(res){
				
				window.location.hash = '#/party?pid='+res;
			});
			return;
		}
		var partyView = new V.Party();
		partyView.addEventListener = function(){
			//增加地点输入框
			$('#create-form').delegate('span[name=add-where]','click',function(){
				var inputhtml=$('#where-more').html();
				$('#where-root').parent().after(inputhtml);
			});
			//减少地点输入框
			$('#create-form').delegate('span[name=del-where]','click',function(){
				$(this).parent().parent().remove();
			});
			$('#create-form').on('submit',function(){
				var party = new M.Party();
				party.pid = param.pid;
				party.title = $('input[name=title]').val();
				party.describe = '';
				party.createDate = new Date();
				party.author = param.uid;
				party.updateDate = new Date();
				party.when= $('input[name=when]').val();
				party.where = [];
				$('input[name=where]').each(function(i,e){
					if ($(e).val()!=''){
						party.where.push($(e).val());
					}
				});

				S.setParty(party,function(res){
					console.log(res);
				});
			});
		};
		partyView.init($('#party-root'),$('#party-template'),{});

		S.getParty(param.pid, param.uid, function(party){
			if (party){
				partyView.setData(party);
			}
		});
	};

	/**
	 * 路由映射,通过hash实现,映射到不同的视图载入方法
	 * 例如：//somehost/#view?id=someid
	 */
	var route = C.route = {
		'list':showList,
		'party':showParty
	};

	/**
	 * 私有方法，实现了hash路由功能，hash后可以识别参数
	 */
	var startHashMonitor = function(){
		var oldhash = null;
		var hashIntervalId = setInterval(
			function(){
				var curhash = window.location.hash;
				if (curhash != oldhash) {
					oldhash = curhash;
					var method = null;
					var param = {};
					if (oldhash.indexOf('#/')==0){
						var path=oldhash.substring(2);
						var paramIndex=path.indexOf('?');
						if (paramIndex>-1){
							var paramstr=path.substring(paramIndex+1);
							path=path.substring(0,paramIndex);
							var subpstr=paramstr.split('&');
							for (var i = 0; i < subpstr.length; i++){
								var subp=subpstr[i].split('=');
								var key = subp[0];
								var value = '';
								if (subp.length > 1){
									value = subp[1];
								}
								param[key]=value;
							}
						}
						method = route[path];
					}
					if (method && typeof method === 'function'){
						method(param);
					}else{
						window.location.hash='/';
						showIndex && showIndex(param);
					}
				}
			} ,200);
	}

	var init = function(){
		startHashMonitor();
	};

	init();
})();
