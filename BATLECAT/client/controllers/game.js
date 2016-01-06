Template.game.helpers({
	amILeader: function() {
		myFight = Fight.findOne({"player2": Meteor.userId()});
		if(!myFight){myFight = Fight.findOne({"player1": Meteor.userId()});}
		
		var leader = myFight && myFight.leader;
		if(leader == Meteor.userId()){
			return true
		}
		
	},
	myCat: function() {
			myFigth = Fight.findOne({"player2": Meteor.userId()});
		
			if(myFigth){
				catPlayer2 = myFigth && myFigth.catPlayer2;
				kitty = Cats.findOne({"_id": catPlayer2 });
				return kitty;

			}else{
				myFigth = Fight.findOne({"player1": Meteor.userId()});
				catPlayer1 = myFigth && myFigth.catPlayer1;
				kitty = Cats.findOne({"_id": catPlayer1});
				return kitty;
			}
			
	},	
	ennemyCat: function() {
			myFigth = Fight.findOne({"player2": Meteor.userId()});
		
			if(myFigth){
				catPlayerEnnemy = myFigth && myFigth.catPlayer1;
				kitty = Cats.findOne({"_id": catPlayerEnnemy });
				return kitty;

			}else{
				myFigth = Fight.findOne({"player1": Meteor.userId()});
				catPlayerEnnemy = myFigth && myFigth.catPlayer2;
				kitty = Cats.findOne({"_id": catPlayerEnnemy});
				return kitty;
			}
			
	},	
});
