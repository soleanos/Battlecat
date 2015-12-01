
Meteor.publish("allCatsNames", function(){

	

	return Cats.find({}, {

	    fields: {content: 0}

	});

});

Meteor.publish("allObjectsMarket", function(){

	

	return Market.find({}, {

	    fields: {content: 0}

	});

});



Meteor.publish('money', function() {
  return Meteor.users.find({}, {fields: {'money':1}});
});

Meteor.publish('setmoney', function() {
  return Meteor.users.update({}, {fields: {'money':1}});
});