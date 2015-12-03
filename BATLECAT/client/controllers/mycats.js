 Template.myCats.events = {
        "click .open-modal" : function(e,t) {
        e.preventDefault();
        $("#chooseEnemy").modal("show");
        }
 };

Template.chooseEnemy.helpers({
  user: function(){
      return Meteor.users.find({"_id":{$not:null}});
  }
});
