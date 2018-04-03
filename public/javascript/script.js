$(document).ready(function(){
		
	var opts = {
		lines: 11, // The number of lines to draw
		length: 0, // The length of each line
		width: 20, // The line thickness
		radius: 30, // The radius of the inner circle
		scale: 1.25, // Scales overall size of the spinner
		corners: 1, // Corner roundness (0..1)
		color: '#737373', // #rgb or #rrggbb or array of colors
		opacity: 0, // Opacity of the lines
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		speed: 1, // Rounds per second
		trail: 79, // Afterglow percentage
		fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		className: 'spinner', // The CSS class to assign to the spinner
		top: '100%', // Top position relative to parent
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
		var breakfastDiv= $('.breakfast-bg');
		var lunchDiv= $('.lunch-bg');
		var dinnerDiv= $('.dinner-bg');
		var dessertDiv= $('.dessert-bg');

		var userLat = position.coords.latitude;
		var userLong = position.coords.longitude;

		var latlng = userLat + ',' + userLong;

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
						<div class="yelp-img-cont"><img class="yelp-img" src="'+info.img + '"></div>\
						<a href="' + info.url +'"</a>\
						<h4 class="business-name">' + info.name + '</h4></a>\
						<h5>'+ info.numOfReviews +' Reviews</h5>\
						<h5>'+ info.distance + ' Miles away' + '</h5>\
						<img class="rating-stars-img" src="' + info.rating + '">\
						<br><br><p class="text-left snippet">' + info.snippet + '</p>\
						<button class="btn breakfast-btn ">New choice?</button>\
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
						<div class="yelp-img-cont"><img class="yelp-img" src="'+info.img + '"></div>\
						<a href="' + info.url +'"</a>\
						<h4 class="business-name">' + info.name + '</h4></a>\
						<h5>'+ info.numOfReviews +' Reviews</h5>\
						<h5>'+ info.distance + ' Miles away' + '</h5>\
						<img class="rating-stars-img" src="' + info.rating + '">\
						<br><br><p class="text-left snippet">' + info.snippet + '</p>\
						<button class="btn lunch-btn">New choice?</button>\
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
						<div class="yelp-img-cont"><img class="yelp-img" src="'+info.img + '"></div>\
						<a href="' + info.url +'"</a>\
						<h4 class="business-name">' + info.name + '</h4></a>\
						<h5>'+ info.numOfReviews +' Reviews</h5>\
						<h5>'+ info.distance + ' Miles away' + '</h5>\
						<img class="rating-stars-img" src="' + info.rating + '">\
						<br><br><p class="text-left snippet">' + info.snippet + '</p>\
						<button class="btn dinner-btn">New choice?</button>\
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
						<div class="yelp-img-cont"><img class="yelp-img" src="'+info.img + '"></div>\
						<a href="' + info.url +'"</a>\
						<h4 class="business-name">' + info.name + '</h4></a>\
						<h5>'+ info.numOfReviews +' Reviews</h5>\
						<h5>'+ info.distance + ' Miles away' + '</h5>\
						<img class="rating-stars-img" src="' + info.rating + '">\
						<br><br><p class="text-left snippet">' + info.snippet + '</p>\
						<button class="btn dessert-btn">New choice?</button>\
					').fadeIn("slow","swing");
					spinDiv.spin(false);
				}
			});
		}
		// //breakfast choice
		$('.breakfast-bg').on('click','.breakfast-btn', breakfastAjax);
		// // //lunch choice
		$('.lunch-bg').on('click','.lunch-btn', lunchAjax);
		// //dinner choice
		$('.dinner-bg').on('click','.dinner-btn', dinnerAjax);
		// //dessert choice
		$('.dessert-bg').on('click','.dessert-btn', dessertAjax);
	};

});
