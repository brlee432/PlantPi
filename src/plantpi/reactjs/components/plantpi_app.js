import React, { Component } from 'react';

import SearchBar from '../containers/search_bar';
import WeatherList from '../containers/weather_list';
import Graphs from '../containers/moisture_graphs';

export default class App extends Component {
  render() {
    return (
    	<div>
	      <div className="row">
	      	<div className="col-sm-12">
		      	<SearchBar />
		      	<WeatherList />
		    </div>
		  </div>
	      <hr />
	      <div className="row">
	      	<div className="col-sm-12">
	      		<h4>Watering Control</h4>
	      	</div>
	      </div>
	      <hr />
	      <div className="row">
	      	<div className="col-sm-12">
	  			<h4>Current Saturation</h4>
	      	</div>
	      </div>
	      <hr />
	       <div className="row">
	      	<div className="col-sm-12">
	      		<Graphs />
	      	</div>
	      </div>
	      <hr />
        </div>
    );
  }
}
