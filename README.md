#When Where 望外
##概述
这是一个私人项目，主要用于朋友间约会确定时间。主办者提出聚会邀请，参与者标注自己可参加的时间，最后由主办者确认时间举办一个聚会。
##功能列表
* 主办者创建聚会
* 主办者发出聚会邀请
* 参与者圈定可参与时间
* 主办者敲定聚会

##实现方式
####View
* 聚会列表视图
    * 项目主页、列出现有聚会，点击可查看聚会详情，提供创建聚会入口
* 创建聚会视图
    * 列出聚会内容、形式、可选择时间、地点等
* 聚会详情视图
    * 查看聚会内容,给主办者之外的用户提供参与聚会入口
    * 如果是已经敲定的聚会，显示聚会详情及参与人员
    * 如果是未敲定聚会，主办者有权修改聚会内容
* 参与聚会视图
    * 添加可出席时间，地点建议，聚会方式建议等

####Model
* 聚会
	* pid、聚会主题、详情、可参与人数、创建时间、时间、地点
* 用户
	* uuid、昵称、联系方式
* 参与意愿
	* pid、聚会pid、用户uuid、出席时间、地点建议、其他建议

####ViewModel
* list-party
	* get party list
	* show the list
* create-party
	* properties input
	* create party
* view-party
	* get party model
	* show party properties
    * show attend entrence for attender
    * show update entrence for hoster
* attend-party
	* input attend date
	* input attend addr
	* input other advice
* update-party
	* change party properties
	* ensure party