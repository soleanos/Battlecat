Meteor.publish('money', function() {
  return Meteor.users.find({}, {fields: {'money':1,'username':1,'services': 1}});
});

Meteor.publish("allCats", function(){
	return Cats.find({}, {
	    fields: {content: 0}
	});
});

Meteor.publish("allObjectsMarket", function(){
	return Market.find({}, {
	    fields: {content: 0}
	});
});



//~ Meteor.publish('marketUpdate', function() {
  //~ return Market.find({}, {fields: {'quantity':1}});
//~ });

//~ Meteor.publish("userData", function () {
  //~ return Meteor.users.find(
    //~ {_id: this.userId},
    //~ {fields: {'money': 1,"username":1}}
  //~ );
//~ });

