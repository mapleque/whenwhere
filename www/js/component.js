/**
 * use underscore for template util
 * use jquery for selector
 */
(function(){
	'use strict';
	var P = window.P = {};
	P.init = function($rootDom){
		//where picker
		$rootDom.find('[where-picker]').each(function(){
			var $root=$(this);
			var avilableList=[];
			var avilableVal=$root.attr('avilable');
			if (avilableVal){
				avilableList=avilableVal.split(',');
			}

			var selectedMap={};
			var selectedVal=$root.attr('data-selected');
			if (selectedVal && selectedVal !== 'undefined'){
				var jsonstr=decodeURIComponent(selectedVal);
				var selectedList=JSON.parse(jsonstr)
				_.map(selectedList,function(e,i){
					var item = JSON.parse(e.one_value);
					_.map(item,function(se,si){
						if (!(se in selectedMap)){
							selectedMap[se]=0;
						}
						selectedMap[se]+=1;
					});
				});
				for (var key in selectedMap){
					var ratio=selectedMap[key]/selectedList.length;
					ratio=ratio<0.05?0.05:ratio;
					selectedMap[key]=ratio;
				}
			}
			var showList=[];
			_.map(avilableList,function(e,i){
				showList.push({
					value:e,
					ratio:selectedMap[e]||0.05
				});
			});

			var tpl=[
				'<%_.map(data,function(e,i){%>',
				'	<div class="attr-ele btn btn-default" value="<%=e.value%>">',
				'		<div class="attr-ratio" style="width:<%=e.ratio*100%>%"></div>',
				'		<span class="attr-value"><%=e.value%></span>',
				'	</div>',
				'<%})%>',
			].join('');
			var bindEvent=function(){
				var $value_box=$('[name='+$root.attr('for')+']');
				var checked_value=[];
				$root.find('.attr-ele').click(function(){
					var $ele = $(this);
					var ischeck=$ele.attr('checked');
					var value=$ele.attr('value');
					if (ischeck){
						checked_value=checked_value.filter(function(a){return a==value?'':a});
						$ele.removeAttr('checked');
					}else{
						checked_value=checked_value.filter(function(a){return a==value?'':a});
						checked_value.push(value);
						$ele.attr('checked','true');
					}
					$value_box.val(checked_value.join(','));
				});
			};
			$root.html(_.template(tpl)({data:showList}));
			bindEvent();
		});
		//where picker end
		//when picker
		$rootDom.find('[when-picker]').each(function(){
			var $root=$(this);
			//获取可选择日期
			var avilableList=[];
			var avilableVal=$root.attr('avilable');
			if (avilableVal){
				avilableList=avilableVal.split(',');
			}
			var avilableMap={};
			for (var i = 0 ; i < avilableList.length; i++){
				avilableMap[avilableList[i]]=avilableList[i];
			}
			var isAvilable=function(val){
				if (!avilableVal)
					return true;
				if (val in avilableMap){
					return true;
				}
				return false;
			};

			var selectedMap={};
			var selectedVal=$root.attr('data-selected');
			if (selectedVal && selectedVal !== 'undefined'){
				var jsonstr=decodeURIComponent(selectedVal);
				var selectedList=JSON.parse(jsonstr)
				_.map(selectedList,function(e,i){
					var item = JSON.parse(e.one_value);
					_.map(item,function(se,si){
						if (!(se in selectedMap)){
							selectedMap[se]=0;
						}
						selectedMap[se]+=1;
					});
				});
				for (var key in selectedMap){
					var ratio=selectedMap[key]/selectedList.length;
					ratio=ratio<0.05?0.05:ratio;
					selectedMap[key]=ratio;
				}
			}
			var getRatio = function(val){
				return selectedMap[val]||0.05;
			}
			//生成指定月份的日历数组
			var genMonthCal = function(year,month){
				//重载getMonthCal()
				if (year == undefined){
					year = new Date().getFullYear();
					month = new Date().getMonth();
				}
				//重载getMonthCal(month)
				if (month == undefined){
					month = parseInt(year);
					year = new Date().getFullYear();
				}
				var addyear = Math.floor(month/12);
				if (month > 11){
					month = month%12;
				}
				if (month < 0){
					month = 12 + month%12;
				}
				year = parseInt(year)+addyear;
				var dateTool =new Date();
				dateTool.setDate(1);
				dateTool.setMonth(month+1);
				dateTool.setYear(year);
				dateTool.setDate(0);

				var ret = [];
				//需要显示天数
				var totalDay = dateTool.getDate();
				//月末补到星期六
				while (dateTool.getDay()<6){
					dateTool.setDate(dateTool.getDate()+1);
					totalDay++;
				}
				for (var i = totalDay ; i > 0 ; i--){
					ret.push({
							ratio:getRatio(dateTool.toString()),
							avilable:isAvilable(dateTool.toString()),
							display:dateTool.getDate(),
							day:dateTool.getDay(),
							value:dateTool.toString(),
							not_other:!(dateTool.getDate()<10&&i>10)
						});
					dateTool.setDate(dateTool.getDate()-1);
				}
				dateTool.setDate(dateTool.getDate()+1);
				while (dateTool.getDay()>0){
					totalDay++;
					dateTool.setDate(dateTool.getDate()-1);
					ret.push({
							ratio:getRatio(dateTool.toString()),
							avilable:isAvilable(dateTool.toString()),
							display:dateTool.getDate(),
							day:dateTool.getDay(),
							value:dateTool.toString()
						});
				}
				return {
					year:year,
					month:month,
					days:ret.reverse()
				};
			};
			var tpl=[
				'<div class="cal-container">',
				'	<div class="container-fluid cal-header">',
				'		<a class="cal-month-change" year="<%=year%>" month="<%=month-1%>" role="cal-prev" href="javascript:;"><i class="glyphicon glyphicon-backward"></i></a>',
				'		<span class=""><%=year%>年<%=parseInt(month)+1%>月</span>',
				'		<a class="cal-month-change" year="<%=year%>" month="<%=parseInt(month)+1%>" role="cal-next" href="javascript:;"><i class="glyphicon glyphicon-forward"></i></a>',
				'	</div>',
				'	<div class="container-fluid cal-body">',
				'		<div class="row cal-row">',
				'			<% _.map(["日","一","二","三","四","五","六"],function(e,i){%>',
				'				<span class="col-sm-offset-1 col-sm-1 cal-ele <%=(i==0||i==6)?"weekend":""%>"><%=e%></span>',
				'			<%})%>',
				'		</div>',
				'		<% _.map(days,function(e,i){%>',
				'			<%if (i%7==0){%>',
				'				<div class="row cal-row">',
				'			<%}%>',
				'			<%if (e.avilable){%>',
					'			<span class="col-sm-offset-1 col-sm-1 cal-ele btn btn-default <%=(e.day==0||e.day==6)?"weekend":""%> <%=e.not_other?"":"other-month"%>" value="<%=e.value%>" avilable="<%=e.avilable%>">',
				'					<%=e.display%>',
				'					<div class="cal-ratio" style="width:<%=e.ratio*100%>%"></div>',
				'				</span>',
				'			<%}else{%>',
					'			<span class="col-sm-offset-1 col-sm-1 cal-ele <%=(e.day==0||e.day==6)?"weekend":""%> <%=e.not_other?"":"other-month"%>" value="<%=e.value%>"><%=e.display%></span>',
				'			<%}%>',
				'			<%if (i%7==6){%>',
				'				</div>',
				'			<%}%>',
				'		<%})%>',
				'	</div>',
				'</div>'
			].join('');
			var bindEvent = function(){
				//交互事件
				var $value_box=$('[name='+$root.attr('for')+']');
				var checked_value=[];
				$root.find('.cal-ele[avilable=true]').click(function(){
					var $ele = $(this);
					var ischeck=$ele.attr('checked');
					var value=$ele.attr('value');
					if (ischeck){
						checked_value=checked_value.filter(function(a){return a==value?'':a});
						$ele.removeAttr('checked');
					}else{
						checked_value=checked_value.filter(function(a){return a==value?'':a});
						checked_value.push(value);
						$ele.attr('checked','true');
					}
					$value_box.val(checked_value.sort().join(','));
				});
				$root.find('a.cal-month-change').click(function(){
					var year = $(this).attr('year');
					var month = $(this).attr('month');
					generlView(year,month);
				});
			};
			var generlView = function(year,month){
				var cal=genMonthCal(year,month);
				$root.html(_.template(tpl)(cal));
				bindEvent();
			};
			var init = function(){
				var curDate =new Date();
				var year = curDate.getFullYear();
				var month = curDate.getMonth();
				generlView(year,month);
			};
			init();
		});
		//when picker end
	};
})();
