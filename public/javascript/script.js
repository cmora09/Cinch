$(document).ready(function(){
		
	var opts = {
		lines: 7, // The number of lines to draw
		length: 0, // The length of each line
		width: 28, // The line thickness
		radius: 18, // The radius of the inner circle
		scale: 0.4, // Scales overall size of the spinner
		corners: 1, // Corner roundness (0..1)
		color: '#000', // #rgb or #rrggbb or array of colors
		opacity: 0, // Opacity of the lines
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		speed: 1, // Rounds per second
		trail: 79, // Afterglow percentage
		fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		className: 'spinner', // The CSS class to assign to the spinner
		top: '-100px', // Top position relative to parent
		left: '50%', // Left position relative to parent
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
	}
	var spinDiv = $('.spin');

	$('.loc-btn').on('click', function(e){
		e.preventDefault();
		spinDiv.spin(opts);
		getLocation();
		$('.loc-btn').fadeOut(900,"swing");
	});

	//geolocation
	function getLocation(){
		if (navigator.geolocation){
		    navigator.geolocation.getCurrentPosition(success);
		} else {
	    	console.log("Geolocation is not supported by this browser.");
		}
	};

	function success(position){
		var breakfastDiv= $('.breakfast-bg'),
			lunchDiv= $('.lunch-bg'),
			dinnerDiv= $('.dinner-bg'),
			dessertDiv= $('.dessert-bg'),
			userLat = position.coords.latitude,
			userLong = position.coords.longitude,
			latlng = userLat + ',' + userLong;

		//loads first choices
		breakfastAjax();
		lunchAjax();
		dinnerAjax();
		dessertAjax();

		// ajax calls
		function breakfastAjax(){
			spinDiv.spin(opts);
			$.ajax({
				url: '/yelp-results-breakfast',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({latlng: latlng}),
				success: function(response){
					var info = response.resultInfo;
					breakfastDiv.hide();
					breakfastDiv.html('\
						<div class="panel-heading">BREAKFAST</div>\
						<div class="business-info"><img class="business-pic" src="'+info.img + '">\
						<a href="' + info.url +'"</a>\
						<h4 class="business-name">' + info.name + '</h4></a>\
						<h5>'+ info.numOfReviews +' Reviews</h5>\
						<h5>'+ info.distance + ' Miles away' + '</h5>\
						<img class="star-rating" src="' + info.rating + '">\
						<br><br><p class="text-left snippet">' + info.snippet + '</p></div>\
						<div class="refresh-panel"><i class="breakfast-btn fas fa-arrow-right"></i></div>\
					').fadeIn("slow","swing");
					spinDiv.spin(false);
				}
			});
		};
		function lunchAjax(){
			spinDiv.spin(opts);
			$.ajax({
				url: '/yelp-results-lunch',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({latlng: latlng}),
				success: function(res){
					var info = res.resultInfo;
					lunchDiv.hide();
					lunchDiv.html('\
						<div class="panel-heading">LUNCH</div>\
						<div class="business-info"><img class="business-pic" src="'+info.img + '">\
						<a href="' + info.url +'"</a>\
						<h4 class="business-name">' + info.name + '</h4></a>\
						<h5>'+ info.numOfReviews +' Reviews</h5>\
						<h5>'+ info.distance + ' Miles away' + '</h5>\
						<img class="star-rating" src="' + info.rating + '">\
						<br><br><p class="text-left snippet">' + info.snippet + '</p></div>\
						<div class="refresh-panel"><i class="lunch-btn fas fa-arrow-right"></i></div>\
					').fadeIn("slow","swing");
					spinDiv.spin(false);
				}
			});
		}
		function dinnerAjax(){
			spinDiv.spin(opts);
			$.ajax({
				url: '/yelp-results-dinner',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({latlng: latlng}),
				success: function(response){
					var info = response.resultInfo;
					dinnerDiv.hide();
					dinnerDiv.html('\
						<div class="panel-heading">DINNER</div>\
						<div class="business-info"><img class="business-pic" src="'+info.img + '">\
						<a href="' + info.url +'"</a>\
						<h4 class="business-name">' + info.name + '</h4></a>\
						<h5>'+ info.numOfReviews +' Reviews</h5>\
						<h5>'+ info.distance + ' Miles away' + '</h5>\
						<img class="star-rating" src="' + info.rating + '">\
						<br><br><p class="text-left snippet">' + info.snippet + '</p></div>\
						<div class="refresh-panel"><i class="dinner-btn fas fa-arrow-right"></i></div>\
					').fadeIn("slow","swing");
					spinDiv.spin(false);
				}
			});
		}
		function dessertAjax(){
			spinDiv.spin(opts);
			$.ajax({
				url: '/yelp-results-desserts',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({latlng: latlng}),
				success: function(res){
					var info = res.resultInfo;
					dessertDiv.hide();
					dessertDiv.html('\
						<div class="panel-heading">DESSERT</div>\
						<div class="business-info"><img class="business-pic" src="'+info.img + '">\
						<a href="' + info.url +'"</a>\
						<h4 class="business-name">' + info.name + '</h4></a>\
						<h5>'+ info.numOfReviews +' Reviews</h5>\
						<h5>'+ info.distance + ' Miles away' + '</h5>\
						<img class="star-rating" src="' + info.rating + '">\
						<br><br><p class="text-left snippet">' + info.snippet + '</p></div>\
						<div class="refresh-panel"><i class="dessert-btn fas fa-arrow-right"></i></div>\
					').fadeIn("slow","swing");
					spinDiv.spin(false);
				}
			});
		}
		// call ajax on click
		$('.breakfast-bg').on('click','.breakfast-btn', breakfastAjax);
		$('.lunch-bg').on('click','.lunch-btn', lunchAjax);
		$('.dinner-bg').on('click','.dinner-btn', dinnerAjax);
		$('.dessert-bg').on('click','.dessert-btn', dessertAjax);
	};
});