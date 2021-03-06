// Include React 
var React = require('react');

// Here we include all of the sub-components
var Form = require('./Children/Form');
var Results = require('./Children/Results');
var History = require('./Children/History');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			searchTerm: "",
			searchStart: "",
			searchEnd: "",
			results: [],
			history: [] /*Note how we added in this history state variable*/
		}
	},	

	// This function allows childrens to update the parent.
	setTerm: function(term, start, end){
		this.setState({
			searchTerm: term,
			searchStart: start,
			searchEnd: end
		})
	},

	// If the component changes (i.e. if a search is entered)... 
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTerm != this.state.searchTerm){
			console.log("UPDATED");

			// Run the query for the address
			helpers.runQuery(this.state.searchTerm)
				.then(function(data){
					if (data != this.state.results)
					{
						console.log("article", data);

						this.setState({
							results: data
						})

						// After we've received the result... then post the search term to our history. 
						helpers.postHistory(this.state.searchTerm)
							.then(function(data){
								console.log("Updated!");

								// After we've done the post... then get the updated history
								helpers.getHistory()
									.then(function(response){
										console.log("Current History", response.data);
										if (response != this.state.history){
											console.log ("History", response.data);

											this.setState({
												history: response.data
											})
										}
									}.bind(this))	
							}.bind(this)
						)
					}
				}.bind(this))
				
			}
	},

	// The moment the page renders get the History
	componentDidMount: function(){

		// Get the latest history.
		helpers.getHistory()
			.then(function(response){
				if (response != this.state.history){
					console.log ("History", response.data);

					this.setState({
						history: response.data
					})
				}
			}.bind(this))
	},

	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">New York Times Article Search!</h2>
						<p className="text-center"><em>Search for any topic in a time range.</em></p>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
					
						<Form setTerm={this.setTerm}/>

					</div>
				</div>
				<div className="row">

					<div className="col-md-12">
				
						<Results address={this.state.results} />

					</div>

				</div>

				<div className="row">

					<History history={this.state.history}/> 

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;