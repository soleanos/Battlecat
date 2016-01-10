 Template.fightArea.events = {
        "click .leave-fight" : function(e,t) {
			myFigth = Fight.findOne({"player2": Meteor.userId()});
			
			if(!myFigth){
				myFigth = Fight.findOne({"player1": Meteor.userId()});
			}

			if(myFigth){
				
				winner = myFigth.winner;
				
				
				if(myFigth.stateFight == "surrend"){	
					Fight.remove({_id:myFigth._id});
				}
				
				if(myFigth.stateFight == "end" && winner){	
					Fight.update({_id: myFigth._id},{$set:{"stateFight":"end 1 player left"}});
					Chat.insert( {fightId:myFight._id,author:"SYSTEM",message:"L'ADVERSAIRE VIENT DE QUITTER LA PARTIE"} )	
				}
				
				if(myFigth.stateFight == "end 1 player left" && winner){	
					Fight.remove({_id:myFigth._id});
				}
				
				if(myFigth.stateFight != "end" && !winner){
					Fight.update({_id: myFigth._id},{$set:{"stateFight":"surrend"}});
				}
				
				
			}
			
			Meteor.users.update({_id: Meteor.userId()},{$set:{"inFight":0}});
			Router.go('/');
        }
 };

Template.fightArea.helpers({
	verifSurrend: function() {
			myfights = Fight.findOne({"player2": Meteor.userId()});
				
			if(!myfights){
				myfights = Fight.findOne({"player1": Meteor.userId()});
			}
			stateFight = myfights && myfights.stateFight;
			
			if(stateFight == "surrend"){return true }
	},
	needIChooseCat: function() {
		myFight = Fight.findOne({"player2": Meteor.userId()});		
		if(myFight){
			if (!myFight.catPlayer2){
				return true;
			}
		}
	},
	verifWin: function() {
		myfights = Fight.findOne({"player2": Meteor.userId()});
				
		if(!myfights){
			myfights = Fight.findOne({"player1": Meteor.userId()});
		}
		winner = myfights && myfights.winner;
		
		if(Meteor.userId()==winner){
			return true;
		}
		
	},
	verifLoose: function() {
		myfights = Fight.findOne({"player2": Meteor.userId()});
				
		if(!myfights){
			myfights = Fight.findOne({"player1": Meteor.userId()});
		}
		winner = myfights && myfights.winner;
		
		if (winner){
			if(Meteor.userId() != winner){
				return true;
			}
		}
	},

});

Template.chooseCat.helpers({
	allMyCats: function() {
		cats = Cats.find({owner : Meteor.userId()});
		return cats;	
	},
});

Template.chooseCat.events = {
        "click .valid-cat" : function(e,t) {
			myFight = Fight.findOne({"player2": Meteor.userId()});
			catId = $('.selectCat').val();
			if(catId){
				Fight.update({_id: myFight._id},{$set:{"catPlayer2":catId}});
				FightLogs.insert( {fightId:myFight._id,player1:myFight.player1,player2:myFight.player2,message: "L'adversaire choisit son attaque...."} )
			}
			
        }
 };


