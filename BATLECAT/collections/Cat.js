Cats = new Mongo.Collection("cats");

Cats.allow({

    insert: function(userId, doc){

        

        if(doc.name == ""  || doc.breed == ""  ){

            throw new Meteor.Error(403, "Vous n'avez pas l'autorisation d'insérer un nouveau post !");

        }

        

        return true;

    }

});

