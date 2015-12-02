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

		var price = Session.get("price");
		if(Meteor.user().money >= price){
			Cats.insert(cat, function(err, id){
				if(err){

					alert(err.reason)

				}

				else{
					var quantity = Session.get("quantity");
					
					var idObjectMarket = Session.get("idObjectMarket");
					Market.update({_id: idObjectMarket},{$set:{"quantity":quantity-1}});
					$("input[name='name']").val("");
					var usermoney =  Meteor.user().money;
					if(Meteor.userId()){
						Meteor.users.update({_id: Meteor.userId()},{$set:{"money":usermoney - price }});
					}
				}
			});
		}else{
			alert("pas assez d'argent, désolé !");
		}

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
    Meteor.subscribe("usersNames");
    Meteor.subscribe("marketUpdate");
    
});
