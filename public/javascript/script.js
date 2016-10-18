$(document).ready(function(){
		
	var opts = {
		lines: 11, // The number of lines to draw
		length: 0, // The length of each line
		width: 20, // The line thickness
		radius: 30, // The radius of the inner circle
		scale: 1.25, // Scales overall size of the spinner
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
		top: '125%', // Top position relative to parent
		left: '30%', // Left position relative to parent
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
	}

	//geolocation
	getLocation();
	function getLocation(){
		if (navigator.geolocation){
		    navigator.geolocation.getCurrentPosition(success);
		} else {
	    	console.log("Geolocation is not supported by this browser.");
		}
	};
	function success(position){
		var breakfastDiv= $('#breakfast');
		var lunchDiv= $('#lunch');
		var dinnerDiv= $('#dinner');
		var dessertDiv= $('#dessert');
		var spinDiv = $('.spin');

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
					breakfastDiv.html('\
						<h1 class="meal-title">Breakfast</h1>\
						<a class="restaurant-link" href="' + info.url +'"</a>\
						<h2>' + info.name + '</h2></a>\
						<img class="yelp-img img-responsive" src="'+info.img + '">\
						<img class="img-responsive" src="' + info.rating + '"><h3>'+'Number of Reviews: '+ info.numOfReviews +'</h3>\
						<h3 class="text-center">'+ 'Distance: ' + info.distance + ' miles away' + '</h3>\
						<p class="text-center snippet">' + info.snippet + '</p>\
						<button class="btn btn-info breakfast-btn choice-btn">New choice?</button>\
					');
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
					lunchDiv.html('\
						<h1 class="meal-title">Lunch</h1>\
						<a class="restaurant-link" href="' + info.url +'"</a>\
						<h3>' + info.name + '</h3></a>\
						<img class="img-responsive yelp-img" src="'+info.img + '">\
						<img class="img-responsive" src="' + info.rating + '"><h3>'+'Number of Reviews: '+ info.numOfReviews +'</h3>\
						<h3 class="text-center">'+ 'Distance: ' + info.distance + ' miles away' + '</h3>\
						<p class="snippet text-center snippet">' + info.snippet + '</p>\
						<button class="btn btn-info lunch-btn choice-btn">New choice?</button>\
					');
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
					dinnerDiv.html('\
						<h1 class="meal-title">Dinner</h1>\
						<a class="restaurant-link" href="' + info.url +'"</a>\
						<h3>' + info.name + '</h3></a>\
						<img class="yelp-img img-responsive" src="'+info.img + '">\
						<img class="img-responsive" src="' + info.rating + '"><h3>'+'Number of Reviews: '+ info.numOfReviews +'</h3>\
						<h3 class="text-center">'+ 'Distance: ' + info.distance + ' miles away' + '</h3>\
						<p class="text-center snippet">' + info.snippet + '</p>\
						<button class="btn btn-info dinner-btn choice-btn">New choice?</button>\
					');
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
					dessertDiv.html('\
						<h1 class="meal-title">Dessert</h1>\
						<a class="restaurant-link" href="' + info.url +'"</a>\
						<h3>' + info.name + '</h3></a>\
						<img class="yelp-img img-responsive" src="'+info.img + '">\
						<img class="img-responsive" src="' + info.rating + '"><h3>'+'Number of Reviews: '+ info.numOfReviews +'</h3>\
						<h3 class="text-center">'+ 'Distance: ' + info.distance + ' miles away' + '</h3>\
						<p class="text-center snippet">' + info.snippet + '</p>\
						<button class="btn btn-info dessert-btn choice-btn">New choice?</button>\
					');
					spinDiv.spin(false);
				}
			});
		}
		// //breakfast choice
		$('#breakfast').on('click','.breakfast-btn', breakfastAjax);
		// // //lunch choice
		$('#lunch').on('click','.lunch-btn', lunchAjax);
		// //dinner choice
		$('#dinner').on('click','.dinner-btn', dinnerAjax);
		// //dessert choice
		$('#dessert').on('click','.dessert-btn', dessertAjax);
	};

});	
