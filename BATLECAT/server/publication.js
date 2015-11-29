
Meteor.publish("allCatsNames", function(){

	return Cats.find({}, {

	    fields: {content: 0}

	});

});