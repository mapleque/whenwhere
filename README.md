#When Where 望外
##概述
这是一个私人项目，主要用于朋友间约会确定时间。主办者提出聚会邀请，参与者标注自己可参加的时间，最后由主办者确认时间举办一个聚会。
##功能列表
* 主办者创建聚会、发出聚会邀请
* 参与者圈定可参与时间、地点
* 主办者敲定聚会
* 用户查看自己的聚会列表，包括发起的和参与的

##实现
####View
* 主页 (目前感觉没啥意义啊)
	* 添加聚会入口，聚会列表入口
* 聚会列表视图
    * 列出发起的和参与的聚会，点击可查看聚会详情，提供创建聚会入口
* 聚会详情视图
    * 主办者可以提交聚会内容、形式、可选择时间、地点等
    * 参与者查看聚会内容,选择聚会地点和时间
    * 如果是已经敲定的聚会，显示聚会详情及参与人员，所有内容不能再修改
    * 如果是未敲定聚会，主办者有权修改聚会内容

####Model
@view www/js/model.js
* Party
* User
* When
* Where

####ViewModel
* list
	* get host party list
	* show the list
	* get aattend party list
	* show the list
* party
	* if view, get party model, show party properties
	* input attend date
	* input attend addr
	* if crate, properties input, set party model
	* if host, change party properties
	* if host, ensure party
