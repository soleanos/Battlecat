 Template.myCats.events = {
        "click .open-modal" : function(e,t) {
        e.preventDefault();
        $("#chooseEnemy").modal("show");
        },"click .open-fight" : function(e,t) {
			e.preventDefault();
			var idEnnemy = $(e.target).attr('value');
			alert(idEnnemy);
			Meteor.users.update({_id: idEnnemy},{$set:{"FightRequest":1}});
		}
 };


Template.chooseEnemy.helpers({
  user: function(){
      return Meteor.users.find({"_id":{$not:null}});
  }
});

