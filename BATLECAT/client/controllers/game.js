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
	},additionalDommgs: function() {

		myFigth = Fight.findOne({"player2": Meteor.userId()});

		if(myFigth){
			catPlayer2 = myFigth && myFigth.catPlayer2;
			kitty = Cats.findOne({"_id": catPlayer2 });
		}else{
			myFigth = Fight.findOne({"player1": Meteor.userId()});
			catPlayer1 = myFigth && myFigth.catPlayer1;
			kitty = Cats.findOne({"_id": catPlayer1});
			
		}
		dmgs = kitty.strength/2
		return dmgs;
	},
	leftChatPx: function() {
		
		$(window).resize(function(evt) {
			width= $(window).width();
			left = (width/2)-175;
			$(".chat").css('left', left);
		});
		
		width= $(window).width();
		left = (width/2)-175;
		return left;
	},
	leftSateFightPx : function(e,t) {
	 
		$(window).resize(function(evt) {
			width= $(window).width();
			left = (width/2)-350;
			$(".stateFight").css('left', left);
		});
		
		width= $(window).width();
		left = (width/2)-350;
		return left;

	},
	heightPlayerBlock : function(e,t) {
	 
		$(window).resize(function(evt) {
			height= $(window).height()-55;
			$(".blockPlayer1").css('height', height);
			$(".blockPlayer2").css('height', height);
		});
		
		
		height= $(window).height()-55;
		return height;

	},
	attacksBlockPx : function(e,t) {
	 
		$(window).resize(function(evt) {
			top= $(window).height()/2-100;
			$(".attacks1").css('top', top);
			$(".attacks2").css('top', top);
		});
		
		height = $(window).height()
		
		topi= (height/2)-100;
		
		return topi;

	},
	topPhotoCat: function(e,t) {
	 
		$(window).resize(function(evt) {
			top= $(window).height()/2-100;
			$(".attacks1").css('top', top);
			$(".attacks2").css('top', top);
		});
		
		height = $(window).height()
		
		topi= (height/2)-200;
		
		return topi;

	},
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

});

Template.game.events = {
	"click .attack" : function(e,t) {
		RepercuterAttaque(e,t)
	}
};


function RepercuterAttaque(e,t) {
	e.preventDefault();

		myFigth = Fight.findOne({"player2": Meteor.userId()});


		if(myFigth){
				catPlayer2 = myFigth && myFigth.catPlayer2;
				kitty = Cats.findOne({"_id": catPlayer2});

				for (var i=0;i<kitty.attacks.length;i=i+1)
				{
					if(kitty.attacks[i].nom ==$(e.target).attr("nomAttaque")){
						dommages = kitty.attacks[i].dommages
						attack = kitty.attacks[i].nom
					}
					ennemy = myFigth.player1;
					ennemyCat = Cats.findOne({"_id": myFigth.catPlayer1});

				}
		}else{

				myFigth = Fight.findOne({"player1": Meteor.userId()});
				catPlayer1 = myFigth && myFigth.catPlayer1;
				kitty = Cats.findOne({"_id": catPlayer1});

				for (var i=0;i<kitty.attacks.length;i=i+1)
				{
					if(kitty.attacks[i].nom == $(e.target).attr("nomAttaque")){
						dommages = kitty.attacks[i].dommages
						attack = kitty.attacks[i].nom
					}
					ennemy = myFigth.player2;
					ennemyCat = Cats.findOne({"_id": myFigth.catPlayer2});
				}
		}

		if(dommages != null){
		myEnnemy = Meteor.users.findOne({"_id":ennemy});
		Fight.update({_id: myFigth._id},{$set:{"leader":ennemy}});

		myKittyStrength = kitty.strength;
		ennemyResistance = ennemyCat.resistance;
		ennemyAgility = ennemyCat.agility;
		reduction = ennemyResistance/2;
		moreDommages = myKittyStrength/2;
		finalDommages = dommages+moreDommages-reduction


		messageCombat = kitty.name+ " lance l'attaque '"+attack+"' qui fait "+finalDommages+" points de dégats à "+ennemyCat.name+" ( réduits "+reduction+")";
		newHps = ennemyCat.hp-finalDommages
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
	ArrayLimitLevel = [0,300,600,1200,1800,2200,2600,3000,3200,3400,3600,4000,4400,4800,5300,6000,7000,8000,10000,13000,15000,19000,22000,24000,26000,30000,40000,50000,70000,100000,150000,200000];

	i = -1;
	level = false;

	while (level ==false) {
		if(cat.xp < ArrayLimitLevel[i+1]){
			newLevel = i+1;
			if (cat.level != newLevel){
				messageToSend = "LE CHAT "+cat.name+" VIENT DE PASSER NIVEAU "+newLevel;
				Chat.insert( {fightId:myFight._id,author:"SYSTEM",message:messageToSend} )
				Cats.update({_id: cat._id},{$set:{"level":newLevel}});
				oldStatPoints = cat.statPoints;
				Cats.update({_id: cat._id},{$set:{"statPoints":oldStatPoints+3}});
			}
			level = true;
		}
		i++;
	}
}
