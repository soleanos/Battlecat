Router.configure({

    layoutTemplate: 'mainLayout'

});


Router.route('/', {

    name: "home",

});


Router.route('/market', {

	name: "market",
	data: function(){

        var objetsMarkets = Market.find({});
        var price = Session.get('price');
        var breed = Session.get('breed');
        var quantity = Session.get('quantity');
        var sexe = Session.get('sexe');
		
        return {

            objetsMarkets: objetsMarkets,
        };

    },

    waitOn: function(){

        return Meteor.subscribe("allObjectsMarket");
		
    }

});

Router.route('/myCats', {

    name: "myCats",

	data: function(){

		var iduser = Meteor.userId();
        var cats = Cats.find({owner : iduser});
        
        
        return {

            cats: cats,
            iduser : iduser,
            
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


