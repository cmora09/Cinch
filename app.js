var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var Yelp = require('yelp');
var config = require('./config');
var secureYelp = new Yelp(config);

// var randomizeResults = Math.floor(Math.random() * 20);

//set ejs to default engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

var port = process.env.PORT || 3000;
/*these are categories we can add to our search
	
	category_filter: "breakfast_brunch"
	category_fitler: "desserts"
*/

function metersToMiles(distance){
	return Math.round(distance * 0.000621371192 * 100)/100;
}

app.get('/', function (req, res) {
  res.render('main');
});

//breakfast ajax
app.post('/yelp-results-breakfast', function(req,res){
	secureYelp.search({ 
		term: 'food', 
		ll: req.body.latlng, 
		radius_filter: 9656,    //6 miles
		sort: 1,
		category_filter: 'breakfast_brunch'
	})
	.then(function (data) {
		var businesses = data.businesses;
		var random = Math.floor((Math.random() * businesses.length));
		var result = businesses[random];
		var resultInfo = 
			{
			name: result.name,
			img: result.image_url.replace("ms.jpg", "l.jpg"),
			numOfReviews: result.review_count,
			rating: result.rating_img_url_large,
			distance: metersToMiles(result.distance),
			url: result.url,
			snippet: result.snippet_text
		};
		res.send({resultInfo: resultInfo});
	})
	.catch(function (err) {
	  console.error(err);
	});
});
app.post('/yelp-results-lunch', function(req,res){
	secureYelp.search({ 
		term: 'food', 
		ll: req.body.latlng,
		radius_filter: 9656,    //6 miles
		sort: 1	
	})
	.then(function (data) {
		var businesses = data.businesses;
		var random = Math.floor((Math.random() * businesses.length));
		var result = businesses[random];
		var resultInfo = 
			{
			name: result.name,
			img: result.image_url.replace("ms.jpg", "l.jpg"),
			numOfReviews: result.review_count,
			rating: result.rating_img_url_large,
			distance: metersToMiles(result.distance),
			url: result.url,
			snippet: result.snippet_text
		};
		res.send({resultInfo: resultInfo});
	})
	.catch(function (err) {
	  console.error(err);
	});
});

app.post('/yelp-results-dinner', function(req,res){
	secureYelp.search({ 
		term: 'food', 
		ll: req.body.latlng,
		radius_filter: 9656,
		sort: 1,
		offset: 20
	})
	.then(function (data) {
		var businesses = data.businesses;
		var random = Math.floor((Math.random() * businesses.length));
		var result = businesses[random];
		var resultInfo = 
			{
			name: result.name,
			img: result.image_url.replace("ms.jpg", "l.jpg"),
			numOfReviews: result.review_count,
			rating: result.rating_img_url_large,
			distance: metersToMiles(result.distance),
			url: result.url,
			snippet: result.snippet_text
		};
		res.send({resultInfo: resultInfo});
	})
	.catch(function (err) {
	  console.error(err);
	});
});
app.post('/yelp-results-desserts', function(req,res){
	secureYelp.search({ 
		term: 'food', 
		ll: req.body.latlng,
		radius_filter: 9656,
		sort: 1,
		category_filter: 'desserts' 
	})
	.then(function(data) {
		var businesses = data.businesses;
		var random = Math.floor((Math.random() * businesses.length));
		var result = businesses[random];
		var resultInfo = 
			{
			name: result.name,
			img: result.image_url.replace("ms.jpg", "l.jpg"),
			numOfReviews: result.review_count,
			rating: result.rating_img_url_large,
			distance: metersToMiles(result.distance),
			url: result.url,
			snippet: result.snippet_text
		};
		res.send({resultInfo: resultInfo});
	})
	.catch(function (err) {
	  console.error(err);
	});
});

app.listen(port, function () {
  console.log('All Right! Thats Cool!');
});