Router.configure({

    layoutTemplate: 'mainLayout'

});


Router.route('/', {

    name: "home",

});

Router.route('/fight', {
    name: "fightArea",
});


Router.route('/market', {

	name: "market",	
	data: function(){

        var objetsMarkets = Market.find({});
        var price = Session.get('price');
        var breed = Session.get('breed');
        var quantity = Session.get('quantity');
        var sexe = Session.get('sexe');
		var objetcSelected = Session.get('objetcSelected');
		var iduser = Meteor.userId();
		Meteor.subscribe("userData");

        return {

            objetsMarkets: objetsMarkets,
            iduser : iduser
        };

    },
});

Router.route('/myCats', {

    name: "myCats",

	data: function(){

		var iduser = Meteor.userId();
        var cats = Cats.find({owner : iduser});
        var users = Meteor.users.find({});
        return {
            cats: cats,
            iduser : iduser,
            users:users
        };

    },
     waitOn: function() {  $('#cara').hide(); }
});




Router.route('/cats', {

    name: "newCat",

    data: function(){

		var iduser = Meteor.userId();
        var breed = Session.get('breed');
        var sexe = Session.get('sexe');

        return {
            iduser : iduser
        };

    },


});

Router.route('/updateBd', {

    name: "updateBd",

});

Router.route('/test', {

    name: "test",

});


