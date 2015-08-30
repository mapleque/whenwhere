(function(){
	'use strict';
	var S = window.S ={};
	/**
	 * @param
	 *		userid
	 * @return 
	 *		{
	 *			host:[Party],
	 *			attend:[Party]
	 *		}
	 */
	S.getPartyList = function(userid){
	};

	/**
	 * @param
	 *		partyid
	 * @return
	 *		Party
	 */
	S.getParty = function(partyid,userid){
		if (partyid){
			var party = new M.Party();
			party.fromJson({
				pid:1,
				title:'小伙伴来玩耍',
				describe:'',
				member:['赵小七','王小北','西门林'],
				createDate:new Date(),
				author:'',
				updateDate:new Date(),
				when:[],
				where:['什刹海','三里屯','东土大唐去往西天取经所经过的女儿国','花果山福地，水帘洞洞天']
			});
			return party;
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
	S.setParty = function(party){
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
