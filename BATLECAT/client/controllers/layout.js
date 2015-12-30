Template.mainLayout.events({
    "click .logout": function(event, template) {
        Meteor.logout();
    }
});

accountsUIBootstrap3.setLanguage('fr');

Deps.autorun(function(){
  Meteor.subscribe('money');
});

Template.mainLayout.helpers({
	alertFight: function() {
		var routeName = Router.current().route.getName();
		
		if(routeName == "fightArea"){
			$('#fight').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		}else{
			
			var mySelf = Meteor.users.find({_id: Meteor.userId()}).fetch();
			var checkIfIvFight = Fight.find({"player2": Meteor.userId()});
		
			if(mySelf[0].inFight==1 && checkIfIvFight){
				Router.go('/fight');
			}
			
			myfights = Fight.find({"player2": Meteor.userId()}).fetch();

			if(Fight.find({"player2": Meteor.userId()}).count() && myfights[0].stateFight != "end"){
				$("#fight").modal("show");
				return true;
			}
		}
	},
	test: function() {
			$("#fight").modal("show");
	}
});
