Template.chat.events = {
  'keypress input.inputChat': function (evt, template) {
    if (evt.which === 13) {
		messageInput = template.find(".inputChat").value;
		myfights = Fight.findOne({"player2": Meteor.userId()});
				
		if(!myfights){
			myfights = Fight.findOne({"player1": Meteor.userId()});
		}
		if(messageInput != ""){
			Chat.insert( {fightId:myFight._id,author:Meteor.user().username,message:messageInput} )	
			template.find(".inputChat").value = "";
		}
    }
  }
};

Template.chat.helpers({
	messages: function() {
		
		myfights = Fight.findOne({"player2": Meteor.userId()});
				
		if(!myfights){
			myfights = Fight.findOne({"player1": Meteor.userId()});
		}
		
		fightId = myfights && myfights._id;
		fightMessages = Chat.find({"fightId": fightId}).fetch();

		return fightMessages;
	},
});
