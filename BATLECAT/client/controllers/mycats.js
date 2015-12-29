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
			console.log("nombre de combats"+Fight.find({"player2": Meteor.userId()}).count());
			$("#fight").modal("show");
			//~ $(".cd-popup").modal("show");
			//~ $('.cd-popup').addClass('is-visible');
			return true;
		}
	},
	test: function() {
			$("#fight").modal("show");
			//~ $(".cd-popup").modal("show");
			//~ $('.cd-popup').addClass('is-visible');
	}
});

Template.chooseEnemy.helpers({
  user: function(){
      return Meteor.users.find({"_id":{$not:null}});
  }
});

