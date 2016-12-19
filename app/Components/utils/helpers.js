// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Geocoder API
var key = "eb240f09ad3340b68c5c63dcc8bf269f";

// Helper Functions (in this case the only one is runQuery)
var helpers = {
 
	runQuery: function(term, start, end){

		console.log(term);
		console.log(start);
		console.log(end);
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + key + "&q=" + term + "&begin_date=" + start + "&end_date=" + end;

		return axios.get(queryURL)
			.then(function(response){

				console.log(response);
				return response;
		});

	},

	// This function hits our own server to retrieve the record of query results
	getHistory: function(){

		return axios.get('/api')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(article){

		return axios.post('/api', {title: article.title, date: article.date, url: article.url})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}


// We export the helpers function 
module.exports = helpers;