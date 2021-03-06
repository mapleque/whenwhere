/**
 * use underscore for template util
 * use jquery for selector
 */
(function(){
	'use strict';
	/**
	 * class base model, only render simple data
	 * private
	 * root class
	 */
	var BaseViewClass = function(){
		this.$rootDom=[];		//the dom for render
		this.$template=[];		//the template dom
		this.data=[];			//the data to render
	};
	BaseViewClass.prototype.addEventListener = function(){};
	BaseViewClass.prototype.render = function(){//渲染页面
		this.$rootDom.html(_.template((this.$template).html())({data:this.data}));
		P.init(this.$rootDom);
		this.addEventListener();

	};
	BaseViewClass.prototype.init = function($r,$t,d){//渲染页面
		this.$rootDom = $r;
		this.$template = $t;
		this.data = d;
		this.render();
	};
	BaseViewClass.prototype.setRoot = function($r){
		this.$rootDom = $r;
		this.render();
	};
	BaseViewClass.prototype.setTemplate = function($t){
		this.$template = $t;
		this.render();
	};
	BaseViewClass.prototype.setData = function(d){
		this.data = d;
		this.render();
	};

	var V = window.V = {};

	/**
	 * common view
	 */
	var Common = V.Common= function(){
	};
	Common.prototype = new BaseViewClass();

	/**
	 * list view
	 */
	var List = V.List = function(){
	};
	List.prototype = new BaseViewClass();

	/**
	 * party view
	 */
	var Party= V.Party= function(){
	};
	Party.prototype = new BaseViewClass();

})();
