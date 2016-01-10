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
		messageCombat = kitty.name+ " lance l'attaque '"+$(e.target).text()+"' qui fait "+dommages+" points de dégats à "+ennemyCat.name;
		myEnnemy = Meteor.users.findOne({"_id":ennemy});
		Fight.update({_id: myFigth._id},{$set:{"leader":ennemy}});
		newHps = ennemyCat.hp-dommages
		if(newHps<0){
			newHps = 0;
			Fight.update({_id: myFigth._id},{$set:{"winner":Meteor.userId()}});
			Fight.update({_id: myFigth._id},{$set:{"stateFight":"end"}});
			
			giveMoneyToPlayer(myFigth,Meteor.user(),50)		
			//~ giveMoneyToPlayer(myFigth,myEnnemy,10)
			
			giveXpToCat(myFigth,kitty,100);
			giveXpToCat(myFigth,ennemyCat,20);
		}
		
		Cats.update({_id: ennemyCat._id },{$set:{"hp":newHps}});
		FightLogs.insert( {fightId:myFigth._id,player1:myFigth.player1,player2:myFigth.player2,message: messageCombat} )
		
		}else{
			alert("La triche est interdite ici !!!!!!!!!!");
		}
}

function giveMoneyToPlayer(myFigth,player,gain) {
	
	messageToSend = "LE JOUEUR "+player.username+" GAGNE "+gain+" PIECES";
	Chat.insert( {fightId:myFigth._id,author:"SYSTEM",message:messageToSend} )
	
	actualMoney = player.money;
	newMoney = actualMoney + gain;
	Meteor.users.update({_id: player._id},{$set:{"money":newMoney}});
}

function giveXpToCat(figth,cat,gain) {
	
	if(!cat.xp){
		actualXp = 0;
	}else{
		actualXp = cat.xp;
	}
	
	messageToSend = "LE CHAT "+cat.name+" GAGNE "+gain+" POINTS D'EXP";
	Chat.insert( {fightId:figth._id,author:"SYSTEM",message:messageToSend} )
	
	newXp = actualXp + gain
	Cats.update({_id: cat._id},{$set:{"xp":newXp}});	
	checkLevelUp(cat,figth);

}

function checkLevelUp(cat,myFight) {
	ArrayLimitLevel = [0,300,600,1200,1800,2200,2600,3000,3200,3400,3600,4000,4400,4800,5300,6000,7000,8000,10000,13000,15000,19000];
	
	i = -1;
	level = false;
	
	while (level ==false) {
		if(cat.xp < ArrayLimitLevel[i+1]){
			newLevel = i+1;
			if (cat.level != newLevel){
				messageToSend = "LE CHAT "+cat.name+" VIENT DE PASSER NIVEAU "+newLevel;
				Chat.insert( {fightId:myFight._id,author:"SYSTEM",message:messageToSend} )	
				Cats.update({_id: cat._id},{$set:{"level":newLevel}});
			}
			level = true;
		}
		i++;
	}
	

}
