Template.newCat.events({

    'submit form': function(e){

        e.preventDefault();

        

        var name = $("input[name='name']").val();

        var breed = $("input[name='breed']").val();

        var sex = $("input[name='sex']").val();

        var level = 1;

		var iduser = Meteor.userId();
		
		var img = $("input[name='breed']").val();

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

                $("form input, form textarea").val("");

            }

        });

    }

});

Tracker.autorun(function () {
    Meteor.subscribe("userData");
    Meteor.subscribe("allUserData");
});
