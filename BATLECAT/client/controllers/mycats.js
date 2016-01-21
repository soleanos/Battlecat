 Template.myCats.events = {
        "click .open-modal" : function(e,t) {
        e.preventDefault();
        idCatSelectionned = $(e.target).attr('value');
        Session.set("myCatFight", idCatSelectionned);
        $("#chooseEnemy").modal("show");
        
        },"click .open-fight" : function(e,t) {
			e.preventDefault();
			var idEnnemy = $(e.target).attr('value');
			ennemy = Meteor.users.find({_id: idEnnemy}).fetch();
			if(ennemy[0].inFight == 1){
				alert("Le joueur que vous souhaitez défier est déja en combat..");
			}else if(ennemy[0].inFight == 2){
				alert("Le joueur que vous souhaitez défier recoit déja une demande de combat");
			}else{
				
				countMyfights = Fight.find({"player2": Meteor.userId()}).count();
				if (countMyfights==0){
					cat1 = Session.get('myCatFight');
					Fight.insert( {player1:Meteor.userId(), player2:idEnnemy,stateFight:"En attente",leader:idEnnemy,catPlayer1:cat1} )
					Meteor.users.update({_id: idEnnemy},{$set:{"inFight":2}});
				}
			}
		}, 'click #btnAgility': function (e,t) {
			updateStat(e,"agility");
		}, 'click #btnStrength': function (e,t) {
			updateStat(e,"strength");
		}, 'click #btnResistance': function (e,t) {
			updateStat(e,"resistance");
		}, 'click #btnHpMax': function (e,t) {
			updateStat(e,"hpMax");
		}, 'click .open-cara': function (e,t) {
			$('#cara span').fadeToggle();
		}
		
 };


Tracker.autorun(function () {
    Meteor.subscribe("fights");
});

Template.myCats.helpers({
	levelMax: function() {
		
		ArrayLimitLevel = [0,300,600,1200,1800,2200,2600,3000,3200,3400,3600,4000,4400,4800,5300,6000,7000,8000,10000,13000,15000,19000,22000,24000,26000,30000,40000,50000,70000,100000,150000,200000];
		
		i = -1;
		level = false;
		
		maxLevel = 0;
		
		while (level ==false) {
			if(this.xp < ArrayLimitLevel[i+1]){
				maxLevel = ArrayLimitLevel[i+1];
				level =true;
			}
			i++;
		}	
		
		return maxLevel
	},haveIStatePoints: function() {
		cat = Cats.findOne({"_id": this._id});
		statPoints = cat && cat.statPoints;
		if(statPoints > 0){
			return true
		}
	},
});

Template.chooseEnemy.helpers({
	user: function(){
		return Meteor.users.find({"_id":{$not:null}});
	},
	usersOnlineCheck: function(){
		online = this && this.status && this.status.online; 	
		if ( online == true && Meteor.user().username != this.username){
			return true
		}else{return false}
	},
	userStatusClass: function(){
		online = this && this.status.online; 
		idle = this && this.status.idle;
		if (idle)
			return "label-warning"
		else if (online)
			return "label-success"
		else
			return "label-default"
	},checkIfIsInFight: function(){
		myFigth = Fight.findOne({"player2": this._id});
		if(!myFigth){
			myFigth = Fight.findOne({"player1": this._id});
		}
		if(myFigth){return true}
		
	},ennemyOfThisPlayer: function(){
		myFigth = Fight.findOne({"player2": this._id});
		if(myFigth){
			ennemy = myFigth && myFigth.player1;
			myEnnemy = Meteor.users.findOne({"_id":ennemy});
		}else{
			myFigth = Fight.findOne({"player1": this._id});
			ennemy = myFigth && myFigth.player2;
			myEnnemy = Meteor.users.findOne({"_id":ennemy});
		}
		return myEnnemy.username;
	},
});

function updateStat(e,statToUpdate) {
	
	idCat = $(e.target).attr('value2');
	catToUpdate = Cats.findOne({"_id": idCat});
	
	oldStat = catToUpdate[statToUpdate];
	oldStatPoints = catToUpdate.statPoints;
		
		
	if(oldStatPoints > 0){
		var obj = {};
		obj[statToUpdate] = oldStat+1;

		Cats.update({_id: idCat},{ $set: obj});
		Cats.update({_id: idCat},{$set:{"statPoints":oldStatPoints-1}});
	}else{
		alert("Vous n'avez pas assez de points de compétences !");
	}
}
