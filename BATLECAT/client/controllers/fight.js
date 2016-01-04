 Template.fightArea.events = {
        "click .leave-fight" : function(e,t) {
			myfights = Fight.find({"player2": Meteor.userId()}).fetch();
			if(myfights == ""){
				myfights = Fight.find({"player1": Meteor.userId()}).fetch();
			}
			if(myfights[0].stateFight != "end"){
				Fight.update({_id: myfights[0]._id},{$set:{"stateFight":"end"}});
			}else{
				Fight.remove({_id:myfights[0]._id});
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
			
			if(stateFight == "end"){return true }
	},

});
