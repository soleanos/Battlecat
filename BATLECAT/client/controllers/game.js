Template.game.helpers({
	amILeader: function() {
		myFight = Fight.findOne({"player2": Meteor.userId()});
		if(!myFight){myFight = Fight.findOne({"player1": Meteor.userId()});}
		
		var leader = myFight && myFight.leader;
		if(leader == Meteor.userId()){
			return true
		}
		
	}
		
});
