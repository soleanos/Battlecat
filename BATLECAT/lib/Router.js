Router.configure({

    layoutTemplate: 'mainLayout'

});


Router.route('/', {

    name: "accueil",

});

Router.route('/register', {

    name: "register",

});

Router.route('/play', {

    name: "game",

    data: function(){

        var cats = Cats.find();

        

        return {

            cats: cats

        };

    },

    waitOn: function(){

        return Meteor.subscribe("allCatsNames");

    }

});