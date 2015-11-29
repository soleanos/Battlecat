
Meteor.publish("allCatsNames", function(){

	

	return Cats.find({}, {

	    fields: {content: 0}

	});

});



Meteor.publish('money', function() {
  return Meteor.users.find({}, {fields: {'money':1}});
});
