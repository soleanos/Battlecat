Template.newCat.events({

    'submit form': function(e){

        e.preventDefault();

        

        var name = $("input[name='name']").val();

        var breed = $("input[name='breed']").val();

        var sex = $("input[name='sex']").val();

        var level = 1;

		var iduser = Meteor.userId();
		
		var img = $("input[name='img']").val();

        var cat = {

                name: name,

                breed: breed,

                sex : sex,

                level: level,
                
                owner: iduser,
                
                img:img

        }

        Cats.insert(cat, function(err, id){

            if(err){

                alert(err.reason)

            }

            else{

                $("input[name='name']").val("");
                var usermoney =  Meteor.user().money;
                var price = Session.get("price");
                 Meteor.user().money = usermoney - price;
                Meteor.users.update({_id:Meteor.user()._id}, {$set:{"money":usermoney-price}})
                console.log(Meteor.user().money);
            }

        });

    }

});

Template.newCat.helpers({
  breedInput: function () {
  
    var breed = Session.get('breed');
    
    return {
      name: "breed",
      value: breed
    }
  },
  imgInput: function () {
  
    var img = Session.get('img');
    return {
      name: "img",
      value: img
    }
  },
  sexInput: function () {
  
    var sex = Session.get('sexe');
    
    return {
      name: "sex",
      value: sex
    }
  }

});
Tracker.autorun(function () {
    Meteor.subscribe("userData");
    Meteor.subscribe("allUserData");
});
