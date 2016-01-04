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
			
			var mySelf = Meteor.users.findOne({_id: Meteor.userId()});
			var inFight = mySelf && mySelf.inFight;
			var myFight = Fight.findOne({"player2": Meteor.userId()});
						
			if(inFight==1){
				Router.go('/fight');
			}
		
			var stateFight = myFight && myFight.stateFight;
			if(myFight && stateFight != "end"){
				$("#fight").modal("show");
				return true;
			}else{
				return false
			}
		}
	},
	test: function() {
			$("#fight").modal("show");
	}
});

