(function(){
	'use strict';
	var U = window.U ={};

	var getCookie = U.getCookie = function(key){
		if (document.cookie.length>0){
			var c_start=document.cookie.indexOf(key+"=");
			if (c_start!=-1){
				c_start=c_start+key.length+1;
				var c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1)c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			}
		}
	};
	var setCookie = U.setCookie = function(key,value,expiredays){
		var exdate = new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie = key+"="+escape(value)+((expiredays==null)?"":";expires="+exdate.toGMTString());
	};
	var getUid = U.getUid = function(){
		return getCookie('uid');
	};
	var setUid = U.setUid = function(uid){
		setCookie('uid',uid);
	};
	var rmUid = U.rmUid = function(){
		setCookie('uid','',-1);
	}
	var getUsername = U.getUsername = function(){
		return getCookie('username');
	};
	var setUsername = U.setUsername = function(username){
		setCookie('username',username);
	};
	var rmUsername = U.rmUsername = function(){
		setCookie('username','',-1);
	};
})();

