Market = new Mongo.Collection("market");


var nbdoc = Market.find().count();

console.log(nbdoc);
//~ if (nbdoc == 0){
	//~ Market.insert( {price:300, type: "cat",breed:"Chat lion",sexe:"female",img:"lion", quantity:10 } )
	Market.insert( {price:300, type: "cat",breed:"Chat lion",sexe:"male",img:"lion", quantity:10 } )
	
	//~ Market.insert( {price:300, type: "cat",breed:"Himalayen",sexe:"male",img:"himalayen", quantity:10 } )
	Market.insert( {price:300, type: "cat",breed:"Himalayen",sexe:"female",img:"himalayen", quantity:10 } )
	
	//~ Market.insert( {price:500, type: "cat",breed:"Exotic",sexe:"female",img:"exotic", quantity:10 } )
	Market.insert( {price:500, type: "cat",breed:"Exotic",sexe:"male",img:"exotic", quantity:10 } )
	
	//~ Market.insert( {price:1000, type: "cat",breed:"Dieu chat",sexe:"female",img:"god", quantity:10 } )
	Market.insert( {price:1000, type: "cat",breed:"Dieu chat",sexe:"male",img:"god", quantity:10 } )
	
	//~ Market.insert( {price:300, type: "cat",breed:"Persan",sexe:"female",img:"persan", quantity:10 } )
	Market.insert( {price:300, type: "cat",breed:"Persan",sexe:"male",img:"persan", quantity:10 } ) 
  
	//~ Market.insert( {price:300, type: "cat",breed:"Grumpy",sexe:"male",img:"grumpy", quantity:10 } ) 
	Market.insert( {price:300, type: "cat",breed:"Grumpy",sexe:"female",img:"grumpy", quantity:10 } ) 
	
	
//~ } 

Market.allow({
  update: function () {
    return true;
  }
  
});
