 Template.myCats.events = {
        "click .open-modal" : function(e,t) {
        e.preventDefault();
        $("#chooseEnemy").modal("show");
        },"click .open-fight" : function(e,t) {
			e.preventDefault();
			var idEnnemy = $(e.target).attr('value');
			alert(idEnnemy);
			Meteor.users.update({_id: idEnnemy},{$set:{"FightRequest":1}});
			Fight.insert( {player1:Meteor.userId(), player2:idEnnemy} )
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

