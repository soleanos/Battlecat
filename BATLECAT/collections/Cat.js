Cats = new Mongo.Collection("cats");

Cats.allow({

    insert: function(userId, doc){

        

        if(doc.name == ""  || doc.breed == ""  ){

            throw new Meteor.Error(403, "Vous devez donner un nom a votre chat !");

        }

        return true;

    }

});

