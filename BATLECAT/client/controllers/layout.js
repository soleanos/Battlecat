Template.mainLayout.events({

    "click .logout": function(event, template) {

        Meteor.logout();

    }

});

accountsUIBootstrap3.setLanguage('fr');

Deps.autorun(function(){
  Meteor.subscribe('money');
});
