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
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + key + "&q=" + term[0] + "&begin_date=" + term[1] + "0101" + "&end_date=" + term[2] + "1231";
		// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + key + "&q=" + term;

		return axios.get(queryURL)
			.then(function(response){

				console.log(response);
				var resultsArray = [];
				for (var i = 0; i<5; i++) {
					resultsArray.push({title: response.data.response.docs[i].headline.main, url: response.data.response.docs[0].web_url});
				// return response.data.response.docs[0].headline.main;
				// return response.data.response.docs[0].web_url;
			}
			return resultsArray;
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
	postHistory: function(resultsArray){
		for (var i = 0; i<5; i++){
		return axios.post('/api', {title: resultsArray[i].title, date: Date.now(), url: resultsArray[i].url})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
		}
	}

}


// We export the helpers function 
module.exports = helpers;