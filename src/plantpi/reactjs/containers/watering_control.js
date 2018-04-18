import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { waterNow } from '../actions/index';

class Controls extends Component {
	constructor(props) {
		super(props); //again, giving access to those props outside of the constructor function
		
		this.state = { watering: false }

		this.onWaterRequest = this.onWaterRequest.bind(this);
	}

	onWaterRequest(event) {
		event.preventDefault();

		//water the plant(s)
		this.props.waterNow();
	}

	render() {
		return (
				<div id="waterControlPanel">
					<h1 className="control-panel-title">Water Event Control Panel</h1>
					<p className="waterInfoSnippet">Water your plant(s) remotely through this control panel!</p>
					<hr />
					<button className="btn btn-success" onClick={this.onWaterRequest}>Water Now!</button>
				</div>
			);
	}
}

function mapStateToProps ({watering}) {
	return { watering }; // identical to {weather: state.weather}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ waterNow }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);