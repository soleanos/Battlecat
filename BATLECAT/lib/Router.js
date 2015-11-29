Router.configure({

    layoutTemplate: 'mainLayout'

});


Router.route('/', {

    name: "accueil",

});


Router.route('/cats', {

    name: "newCat",

    data: function(){

        var cats = Cats.find();
        var iduser = Meteor.userId();
        

        return {

            cats: cats,
            iduser : iduser
        };

    },

    waitOn: function(){

        return Meteor.subscribe("allCatsNames");

    }

});


