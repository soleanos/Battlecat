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
		
		$(window).resize(function(evt) {
			width= $(window).width();
			left = (width/2)-175;
			$(".chat").css('left', left);
		});
		
		width= $(window).width();
		left = (width/2)-175;
		return left;
	},
});
