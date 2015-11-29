Router.configure({

    layoutTemplate: 'mainLayout'

});


Router.route('/', {

    name: "home",

});


Router.route('/market', {

    name: "market",

});

Router.route('/myCats', {

    name: "myCats",

	data: function(){

		var iduser = Meteor.userId();
        var cats = Cats.find({owner : iduser});
        
        
        return {

            cats: cats,
            iduser : iduser
            
        };

    },

    waitOn: function(){

        return Meteor.subscribe("allCatsNames");
		
    }
});


Router.route('/cats', {

    name: "newCat",

    data: function(){

		var iduser = Meteor.userId();
           
        return {

            iduser : iduser
            
        };

    },


});


