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
		}, 'click button': function () {
			
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
		}
});

