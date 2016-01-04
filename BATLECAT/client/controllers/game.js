Template.game.helpers({
	amILeader: function() {
		myFight = Fight.findOne({"player2": Meteor.userId()});
		if(!myFight){myFight = Fight.findOne({"player1": Meteor.userId()});}
		
		if(myFight.leader == Meteor.userId()){
			return true
		}
	}
		
});
