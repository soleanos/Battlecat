

Template.updateBd.helpers({
  insertCat: function () {
    var nbCat = Market.find().count();
    var cat = Market.find().fetch();
		if(cat.length==0){
			Market.insert( {price:300, type: "cat",breed:"Chat lion",sexe:"female",img:"lion", quantity:10 } )
			//~ Market.insert( {price:300, type: "cat",breed:"Chat lion",sexe:"male",img:"lion", quantity:10 } )
			
			Market.insert( {price:300, type: "cat",breed:"Himalayen",sexe:"male",img:"himalayen", quantity:10 } )
			//~ Market.insert( {price:300, type: "cat",breed:"Himalayen",sexe:"female",img:"himalayen", quantity:10 } )
			
			Market.insert( {price:500, type: "cat",breed:"Exotic",sexe:"female",img:"exotic", quantity:10 } )
			//~ Market.insert( {price:500, type: "cat",breed:"Exotic",sexe:"male",img:"exotic", quantity:10 } )
			
			Market.insert( {price:1000, type: "cat",breed:"Dieu chat",sexe:"female",img:"god", quantity:3 } )
			//~ Market.insert( {price:1000, type: "cat",breed:"Dieu chat",sexe:"male",img:"god", quantity:10 } )
			
			//~ Market.insert( {price:300, type: "cat",breed:"Persan",sexe:"female",img:"persan", quantity:10 } )
			Market.insert( {price:300, type: "cat",breed:"Persan",sexe:"male",img:"persan", quantity:10 } ) 
		  
			Market.insert( {price:300, type: "cat",breed:"Grumpy",sexe:"male",img:"grumpy", quantity:10 } ) 
			//~ Market.insert( {price:300, type: "cat",breed:"Grumpy",sexe:"female",img:"grumpy", quantity:10 } ) 
			
			return "Les chats ont étés correctement insérés";
			
		}else{
			return ("Insertion échouée car il y a déja "+nbCat+" chats insérés");
		}
  },	
  insertBreed: function () {
    var nbBreed = Breed.find().count();
    var breed = Breed.find().fetch();
		if(breed.length==0){
			Breed.insert({nameBreed:"Grumpy",attacks:{attack1:{nom:"Griffure de la flemme",dommages:5},attack2:{nom:"Balayette de grumpy",dommages:7},attack3:{nom:"Rage de grumpy",dommages:7}}})
			Breed.insert({nameBreed:"Persan",attacks:{attack1:{nom:"Petite griffure persane",dommages:5},attack2:{nom:"Souffle persan",dommages:7},attack3:{nom:"Ruade",dommages:7}}})
			Breed.insert({nameBreed:"Dieu chat",attacks:{attack1:{nom:"Knackie purée",dommages:25},attack2:{nom:"Rayon laser du dieu de la mort ",dommages:10},attack3:{nom:"Vindicte des dieux",dommages:11}}})
			Breed.insert({nameBreed:"Exotic",attacks:{attack1:{nom:"Coup de patte violent",dommages:5},attack2:{nom:"Charge déchainée",dommages:7},attack3:{nom:"Coup de langue",dommages:8}}})
			Breed.insert({nameBreed:"Himalayen",attacks:{attack1:{nom:"Rage des montagnes",dommages:5},attack2:{nom:"Coup de patte",dommages:7},attack3:{nom:"Lechouille",dommages:8}}})
			Breed.insert({nameBreed:"Chat lion",attacks:{attack1:{nom:"Griffure du lion sauvage",dommages:5},attack2:{nom:"Coup de patte de la savane",dommages:7},attack3:{nom:"Morsure",dommages:8}}})
			return "Les races de chats ont étés correctement insérés";
			
		}else{
			return ("Insertion échouée car il y a déja "+nbBreed+" races insérés");
		}
  },
});
