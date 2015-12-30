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
			$('#your-modal-id').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		}else{
			if(Fight.find({"player2": Meteor.userId()}).count()>0){
				console.log("nombre de combats"+Fight.find({"player2": Meteor.userId()}).count());
				$("#fight").modal("show");
				return true;
			}
		}
	},
	test: function() {
			$("#fight").modal("show");
	}
});
