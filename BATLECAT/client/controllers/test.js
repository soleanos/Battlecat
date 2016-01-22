 Template.test.events = {
        "click .test" : function(e,t) {
			 $(".adversaire1").animate({
				left: '0px',
				//~ height: '+=150px',
				//~ width: '+=150px'
			});
        
			 $(".adversaire2").animate({
				left: '0px',
				//~ height: '+=150px',
				//~ width: '+=150px'
			});
			 $(".chat").animate({
				top: '50px',
				//~ height: '+=150px',
				//~ width: '+=150px'
			});
			
			console.log($(window).width());
			console.log($(window).height());
			
        },
 };

Template.test.helpers({
	heightBlockAdv: function() {
		return $(window).height()
	},
	widthtBlockAdv: function() {
		return $(window).width();
	},
	leftChatPx: function() {
		
	width= $(window).width();
	lefti = (width/2)-175;

	//~ $(window).resize(function(evt) {
	//~ $(".chat").css({left: 0});
	//~ });
		
	return left;
	
	},
});
