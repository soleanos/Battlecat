jQuery(document).ready(function($){
	//final width --> this is the quick view image slider width
	//maxQuickWidth --> this is the max-width of the quick-view panel
	var sliderFinalWidth = 400,
		maxQuickWidth = 900;

Template.fight.events = {
        "click .closeFightAlert" : function(e,t) {
			e.preventDefault();
			$('#fight').modal('hide');
			myfights = Fight.find({"player2": Meteor.userId()}).fetch();	
			//~ Fight.remove({'_id':{'$in':myfights}});
			console.log(myfights)
			for (fight in myfights){
				Fight.remove({'_id':myfights[fight]._id});
				console.log(myfights[fight].player2);
			}
			
			$('#your-modal-id').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();	

		},
        "click .openFightAlert" : function(e,t) {
			e.preventDefault();
			Router.go('/fight');
		},
};

	//open the quick view panel
	Template.market.events = {
        "click .cd-trigger" : function(e,t) {
			e.preventDefault();
			var selectedImage = $(e.target).parent('.cd-item').children('img'),
			slectedImageUrl = selectedImage.attr('src');
			var idObject = selectedImage.attr('alt');
	
			var cat = Market.find({_id : idObject}).fetch();
			console.log(cat[0]);
			Session.set("breed", cat[0].breed);
			Session.set("price", cat[0].price);
			Session.set("sexe", cat[0].sexe);
			Session.set("quantity", cat[0].quantity);
			Session.set("img", cat[0].img);
			Session.set("idObjectMarket", idObject);
				Template.market.helpers({
				  price: function () {
					return cat[0].price;
				  },
				  breed: function () {
					return cat[0].breed;
				  },
				  sexe: function () {
					return cat[0].sexe;
				  },
				  quantity: function () {
					return cat[0].quantity;
				  }
				});
				//~ 
				
				$("#image").attr("src",slectedImageUrl);
				$('body').addClass('overlay-layer');
				animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');
				
				//update the visible slider image in the quick view panel
				//you don't need to implement/use the updateQuickView if retrieving the quick view data with ajax
				updateQuickView(slectedImageUrl);
			
        },"click .buyObject" : function(e,t) {
			e.preventDefault();
			var objetcSelected = true;
			Session.set("objetcSelected", objetcSelected )
			
			Template.market.helpers({
				  objetcSelected: function () {
					return true ;
				  }
			});
        },"click .cd-close" : function(e,t) {
			e.preventDefault();
			var objetcSelected = false;
			Session.set("objetcSelected", objetcSelected )
			
			Template.market.helpers({
				  objetcSelected: function () {
					return false ;
				  }
			});
        },
	};

	//close the quick view panel
	$('body').on('click', function(event){
		if( $(event.target).is('.cd-close') || $(event.target).is('body.overlay-layer')) {
			var objetcSelected = true;
			Session.set("objetcSelected", objetcSelected )
			closeQuickView( sliderFinalWidth, maxQuickWidth);
		}
	});
	$(document).keyup(function(event){
		//check if user has pressed 'Esc'
    	if(event.which=='27'){
			closeQuickView( sliderFinalWidth, maxQuickWidth);
		}
	});

	//quick view slider implementation
	$('.cd-quick-view').on('click', '.cd-slider-navigation a', function(){
		updateSlider($(this));
	});

	//center quick-view on window resize
	$(window).on('resize', function(){
		if($('.cd-quick-view').hasClass('is-visible')){
			window.requestAnimationFrame(resizeQuickView);
		}
	});

	function updateSlider(navigation) {
		var sliderConatiner = navigation.parents('.cd-slider-wrapper').find('.cd-slider'),
			activeSlider = sliderConatiner.children('.selected').removeClass('selected');
		if ( navigation.hasClass('cd-next') ) {
			( !activeSlider.is(':last-child') ) ? activeSlider.next().addClass('selected') : sliderConatiner.children('li').eq(0).addClass('selected'); 
		} else {
			( !activeSlider.is(':first-child') ) ? activeSlider.prev().addClass('selected') : sliderConatiner.children('li').last().addClass('selected');
		} 
	}

	function updateQuickView(url) {
		$('.cd-quick-view .cd-slider li').removeClass('selected').find('img[src="'+ url +'"]').parent('li').addClass('selected');
	}

	function resizeQuickView() {
		var quickViewLeft = ($(window).width() - $('.cd-quick-view').width())/2,
			quickViewTop = ($(window).height() - $('.cd-quick-view').height())/2;
		$('.cd-quick-view').css({
		    "top": quickViewTop,
		    "left": quickViewLeft,
		});
	} 

	function closeQuickView(finalWidth, maxQuickWidth) {
		var close = $('.cd-close'),
			activeSliderUrl = close.siblings('.cd-slider-wrapper').find('.selected img').attr('src'),
			selectedImage = $('.empty-box').find('img');
		//update the image in the gallery
		if( !$('.cd-quick-view').hasClass('velocity-animating') && $('.cd-quick-view').hasClass('add-content')) {
			selectedImage.attr('src', activeSliderUrl);
			animateQuickView(selectedImage, finalWidth, maxQuickWidth, 'close');
		} else {
			closeNoAnimation(selectedImage, finalWidth, maxQuickWidth);
		}
	}

	function animateQuickView(image, finalWidth, maxQuickWidth, animationType) {
		//store some image data (width, top position, ...)
		//store window data to calculate quick view panel position
		var parentListItem = image.parent('.cd-item'),
			topSelected = image.offset().top - $(window).scrollTop(),
			leftSelected = image.offset().left,
			widthSelected = image.width(),
			heightSelected = image.height(),
			windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			finalLeft = (windowWidth - finalWidth)/2,
			finalHeight = finalWidth * heightSelected/widthSelected,
			finalTop = (windowHeight - finalHeight)/2,
			quickViewWidth = ( windowWidth * .8 < maxQuickWidth ) ? windowWidth * .8 : maxQuickWidth ,
			quickViewLeft = (windowWidth - quickViewWidth)/2;

		if( animationType == 'open') {
			//hide the image in the gallery
			parentListItem.addClass('empty-box');
			//place the quick view over the image gallery and give it the dimension of the gallery image
			$('.cd-quick-view').css({
			    "top": topSelected,
			    "left": leftSelected,
			    "width": widthSelected,
			}).velocity({
				//animate the quick view: animate its width and center it in the viewport
				//during this animation, only the slider image is visible
			    'top': finalTop+ 'px',
			    'left': finalLeft+'px',
			    'width': finalWidth+'px',
			}, 1000, [ 400, 20 ], function(){
				//animate the quick view: animate its width to the final value
				$('.cd-quick-view').addClass('animate-width').velocity({
					'left': quickViewLeft+'px',
			    	'width': quickViewWidth+'px',
				}, 300, 'ease' ,function(){
					//show quick view content
					$('.cd-quick-view').addClass('add-content');
				});
			}).addClass('is-visible');
		} else {
			//close the quick view reverting the animation
			$('.cd-quick-view').removeClass('add-content').velocity({
			    'top': finalTop+ 'px',
			    'left': finalLeft+'px',
			    'width': finalWidth+'px',
			}, 300, 'ease', function(){
				$('body').removeClass('overlay-layer');
				$('.cd-quick-view').removeClass('animate-width').velocity({
					"top": topSelected,
				    "left": leftSelected,
				    "width": widthSelected,
				}, 500, 'ease', function(){
					$('.cd-quick-view').removeClass('is-visible');
					parentListItem.removeClass('empty-box');
				});
			});
		}
	}
	function closeNoAnimation(image, finalWidth, maxQuickWidth) {
		var parentListItem = image.parent('.cd-item'),
			topSelected = image.offset().top - $(window).scrollTop(),
			leftSelected = image.offset().left,
			widthSelected = image.width();

		//close the quick view reverting the animation
		$('body').removeClass('overlay-layer');
		parentListItem.removeClass('empty-box');
		$('.cd-quick-view').velocity("stop").removeClass('add-content animate-width is-visible').css({
			"top": topSelected,
		    "left": leftSelected,
		    "width": widthSelected,
		});
	}
});
