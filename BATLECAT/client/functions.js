
function gagnerArgent(idPlayer,gain) {
	
	actualMoney = Meteor.user().money;
	newMoney = actualMoney + gain
	Meteor.users.update({_id: idPlayer},{$set:{"money":newMoney}});
	
}
