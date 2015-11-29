
Meteor.publish("allCatsNames", function(){

	return Cats.find({userId: "aaa"}, {

	    fields: {content: 0}

	});

});