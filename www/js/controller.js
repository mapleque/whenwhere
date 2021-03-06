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
		window.location.hash='#/list';
	};
	/**
	 * 用于初始化用户信息模块，每次重载页面都会调用该方法
	 */
	var userInit = C.userInit = function(){
		var userNavView = new V.Common();
		userNavView.init($('#user-nav'),$('#user-nav-template'),{});
		if (U.getUid()&&U.getUsername()){
			userNavView.setData({username:U.getUsername(),login:true});
		}
	};

	/** 以下是自定义视图载入方法及交互 **/
	var login = C.login = function(param){
		var loginView = new V.Common();
		loginView.addEventListener = function(){
			$('#login-form').on('submit',function(){
				var user = new M.User();
				user.username = $('input[name=username]').val();
				user.password = $('input[name=password]').val();
				S.login(user,function(res){
					window.location.hash="#/list";
				});
			});
		};
		loginView.init($('#content'),$('#login-template'),{});
	};

	var logout = C.logout = function(){
		S.logout();
		window.location.hash='#/';
	}

	var regist = C.regist = function(param){
		var registView = new V.Common();
		registView.addEventListener = function(){
			$('#regist-form').on('submit',function(){
				var user = new M.User();
				user.username = $('input[name=username]').val();
				user.password = $('input[name=password]').val();
				S.regist(user,function(res){
					alert('注册成功，请登陆');
					window.location.hash='#/login';
				});

			});
		};
		registView.init($('#content'),$('#regist-template'));
	}

	/**
	 * @param
	 *		uid => user id
	 */
	var showList = C.showList = function(param){
		var partyListView = new V.List();
		partyListView.init($('#content'),$('#party-list-template'),{});
		if (param.attend){
			S.getAttendPartyList(function(res){
				var partyList=res;
				partyListView.setData({tab:'attend',list:partyList,len:partyList?partyList.length:0});
			});
		}else{
			S.getHostPartyList(function(res){
				var partyList=res;
				partyListView.setData({tab:'host',list:partyList,len:partyList?partyList.length:0});
			});
		}
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
				party.describe = $('textarea[name=describe]').val();
				party.createDate = new Date();
				party.updateDate = new Date();
				party.when= $('input[name=when]').val();
				party.where = [];
				$('input[name=where]').each(function(i,e){
					if ($(e).val()!=''){
						party.where.push($(e).val());
					}
				});

				S.setParty(party,function(res){
					window.location.hash="#/list";
					console.log(res);
				});
			});
			$('#attend-form').on('submit',function(){
				var when=$('input[name=when]').val();
				var where=$('input[name=where]').val();
				console.log('attend',when,where,U.getUid());
				//TODO 免登陆参与
				S.attendParty(param.pid,when.split(','),where.split(','),function(res){
					alert('提交成功');
				});

			});
		};

		S.getParty(param.pid, function(party){
			if (party){
				var disabled = false;
				if (U.getUid() && U.getUid() == party.author){
					partyView.init($('#content'),$('#assume-party-template'),{});
					disabled = true;
				}else{
					partyView.init($('#content'),$('#attend-party-template'),{});
				}
				_.map(party.member, function(e,i){
					if (U.getUid() == e.user_id) {
						disabled = true;
					}
				});
				party.disabled = disabled;
				partyView.setData(party);
			}else if (U.getUid()){
				partyView.init($('#content'),$('#create-party-template'),{});
			}else{
				partyView.init($('#content'),$('#error-template'),{msg:'这个聚会不存在,登陆后可以创建新的聚会'});
			}
		});
	};

	/**
	 * 路由映射,通过hash实现,映射到不同的视图载入方法
	 * 例如：//somehost/#view?id=someid
	 */
	var route = C.route = {
		'login':login,
		'logout':logout,
		'regist':regist,
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
					userInit();
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
