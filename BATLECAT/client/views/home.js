Template.accueil.events({

    'submit form': function(e){

        e.preventDefault();

        

        var name = $("input[name='name']").val();

        var breed = $("input[name='breed']").val();

        var sex = $("textarea[name='sex']").val();

        var level = 1;

        var cat = {

                name: name,

                breed: breed,

                sex : sex,

                level: level

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