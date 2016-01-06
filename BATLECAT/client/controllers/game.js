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
	ennemy: function() {
			myFigth = Fight.findOne({"player2": Meteor.userId()});
		
			if(myFigth){
				ennemy = myFigth && myFigth.player1;
				myEnnemy = Meteor.users.findOne({"_id":ennemy});
				return myEnnemy;
			}else{
				myFigth = Fight.findOne({"player1": Meteor.userId()});
				ennemy = myFigth && myFigth.player2;
				myEnnemy = Meteor.users.findOne({"_id":ennemy});
				return myEnnemy;
			}		
	},
	myFigthLogs: function() {
			myFigth = Fight.findOne({"player2": Meteor.userId()});
	
			if(myFigth){
				myFigthLogs = FightLogs.find({"fightId": myFigth._id}).fetch();
				console.log(myFigthLogs[0]);
				return myFigthLogs;
			}else{
				myFigth = Fight.findOne({"player1": Meteor.userId()});
				myFigthLogs = FightLogs.find().fetch();
				console.log(myFigthLogs);
				return myFigthLogs;
			}		
	},
			
});
