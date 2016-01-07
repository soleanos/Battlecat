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
				console.log(kitty);
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
	myFigthLog: function() {
			myFigth = Fight.findOne({"player2": Meteor.userId()});
	
			if(myFigth){
				idFight = myFigth && myFigth._id;
				myFigthLogs = FightLogs.find({"fightId": idFight}).fetch();
				
				for (log in myFigthLogs){
					if(log == myFigthLogs.length-1){
						lastLog = myFigthLogs[log];
						return lastLog;
					}
				}
			}else{
				myFigth = Fight.findOne({"player1": Meteor.userId()});
				idFight = myFigth && myFigth._id;
				myFigthLogs = FightLogs.find({"fightId": idFight}).fetch();
				
				for (log in myFigthLogs){
					if(log == myFigthLogs.length-1){
						lastLog = myFigthLogs[log];
						return lastLog;
					}
				}
			}		
	},			
});

Template.game.events = {
	"click .attack1" : function(e,t) {
		RepercuterAttaque(e,t)
	},
	"click .attack2" : function(e,t) {
		RepercuterAttaque(e,t)
	},
	"click .attack3" : function(e,t) {
		RepercuterAttaque(e,t)
	},
			
};


function RepercuterAttaque(e,t) {
	e.preventDefault();	
		
		myFigth = Fight.findOne({"player2": Meteor.userId()});
		
		
		if(myFigth){
				catPlayer2 = myFigth && myFigth.catPlayer2;
				kitty = Cats.findOne({"_id": catPlayer2});
				
				if(kitty.attacks.attack1.nom == $(e.target).text()){
					dommages = kitty.attacks.attack1.dommages
				}else 	if (kitty.attacks.attack2.nom == $(e.target).text()){
						dommages = kitty.attacks.attack2.dommages
						}else if(kitty.attacks.attack3.nom == $(e.target).text()){
							dommages = kitty.attacks.attack3.dommages
						}else{dommages =null;}
				ennemy = myFigth.player1;
				ennemyCat = Cats.findOne({"_id": myFigth.catPlayer1});

		}else{
			
				myFigth = Fight.findOne({"player1": Meteor.userId()});
				catPlayer1 = myFigth && myFigth.catPlayer1;
				kitty = Cats.findOne({"_id": catPlayer1});
				
				if(kitty.attacks.attack1.nom == $(e.target).text()){
					dommages = kitty.attacks.attack1.dommages
				}else 	if (kitty.attacks.attack2.nom == $(e.target).text()){
						dommages = kitty.attacks.attack2.dommages
						}else if(kitty.attacks.attack3.nom == $(e.target).text()){
							dommages = kitty.attacks.attack3.dommages;
						}else{dommages =null;}
				ennemy = myFigth.player2;
				ennemyCat = Cats.findOne({"_id": myFigth.catPlayer2});
		}
			
		if(dommages != null){
		messageCombat = Meteor.user().username+" lance l'attaque '"+$(e.target).text()+"' qui fait "+dommages+" points de dégats";
		
		Fight.update({_id: myFigth._id},{$set:{"leader":ennemy}});
		newHps = ennemyCat.hp-dommages
		Cats.update({_id: ennemyCat._id },{$set:{"hp":newHps}});
		FightLogs.insert( {fightId:myFigth._id,player1:myFigth.player1,player2:myFigth.player2,message: messageCombat} )
		
		}else{
			alert("La triche est interdite ici !!!!!!!!!!");
		}
}
