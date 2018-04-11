import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: 'Clemson' };

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.props.fetchWeather(this.state.term);
	}

	onInputChange(event) {
		this.setState({term: event.target.value});
		
	}

	onFormSubmit(event) {
		event.preventDefault();

		//fetch weather data
		this.props.fetchWeather(this.state.term);
		this.setState({ term: '' });
	}

	render() {
		return (
			<div className="slide">
				<h1 className="control-panel-title">Relevant Weather Information</h1>
				<form onSubmit={this.onFormSubmit} className="input-group">
					<input
						placeholder="See relevant weather information for your area."
						className="form-control"
						value={this.state.term}
						onChange={this.onInputChange}
					 />
					<span className="input-group-btn">
						<button type="submit" className="btn btn-success">Search</button>
					</span>
				</form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);