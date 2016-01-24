 Template.test.events = {
        "click .test" : function(e,t) {
			 $(".player1").animate({
				left: '0px',
				//~ height: '+=150px',
				//~ width: '+=150px'
			});
        
			 $(".player2").animate({
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
	leftSateFightPx : function(e,t) {
	 
		$(window).resize(function(evt) {
			width= $(window).width();
			left = (width/2)-350;
			$(".stateFight").css('left', left);
		});
		
		width= $(window).width();
		left = (width/2)-350;
		return left;

	},
	heightPlayerBlock : function(e,t) {
	 
		$(window).resize(function(evt) {
			height= $(window).height()-55;
			$(".blockPlayer1").css('height', height);
			$(".blockPlayer2").css('height', height);
		});
		
		
		height= $(window).height()-55;
		return height;

	},
	attacksBlockPx : function(e,t) {
	 
		$(window).resize(function(evt) {
			top= $(window).height()/2-100;
			$(".attacks1").css('top', top);
			$(".attacks2").css('top', top);
		});
		
		height = $(window).height()
		
		topi= (height/2)-100;
		
		return topi;

	},
	
});

