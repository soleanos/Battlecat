 Template.myCats.events = {
        "click .open-modal" : function(e,t) {
        e.preventDefault();
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
					Fight.insert( {player1:Meteor.userId(), player2:idEnnemy,stateFight:"En attente"} )
					Meteor.users.update({_id: idEnnemy},{$set:{"inFight":2}});
				}
			}
		}
 };


Tracker.autorun(function () {
    Meteor.subscribe("fights");
});

Template.myCats.helpers({
	alertFight: function() {
		if(Fight.find({"player2": Meteor.userId()}).count()>0){
			//~ console.log("nombre de combats"+Fight.find({"player2": Meteor.userId()}).count());
			$("#fight").modal("show");
			return true;
		}
	},
	test: function() {
			$("#fight").modal("show");
	}
});

Template.chooseEnemy.helpers({
	user: function(){
		return Meteor.users.find({"_id":{$not:null}});
	},
	usersOnlineCheck: function(){
		if (this.status.online == true && Meteor.user().username != this.username){
			return true
		}else{return false}
	},
	userStatusClass: function(){
		if (this.status.idle)
			return "label-warning"
		else if (this.status.online)
			return "label-success"
		else
			return "label-default"
		}
});

