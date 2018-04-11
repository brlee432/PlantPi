import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchMoisture } from '../actions/index';
import HistoryChart from '../components/history_chart';
import PercentCircle from '../components/current_chart';


class Graphs extends Component {
	constructor(props) {
		super(props);
		this.props.fetchMoisture();
	}
	
	componentWillReceiveProps(nextProps) {
		this.timer = setTimeout(() => this.props.fetchMoisture(), 10000);
	}

	/*renderMoisture(moistureData) {
		var plant_1_data = [];
	    var plant_2_data = [];

		for (var i = 0; i < moistureData.length; i++) {
			if (moistureData[i].plant_name == 'peppermint') {
				plant_1_data.push(moistureData[i]);
			} else if (moistureData[i].plant_name == 'thyme') {
				plant_2_data.push(moistureData[i]);
			}
		}

		const generateKey = () => {
			var randomnumber = Math.floor(Math.random()*100) + 1;
			return `${ randomnumber }_${ new Date().getTime() }`;
		}
		const plant_1_id = plant_1_data.map(moisture => moisture.id);
		const plant_1_name = plant_1_data.map(moisture => moisture.plant_name);
		const plant_1_status = plant_1_data.map(moisture => moisture.has_water);
		const plant_1_time = plant_1_data.map(moisture => moisture.time_last_watered);
		const plant_2_id = plant_2_data.map(moisture => moisture.id);
		const plant_2_name = plant_2_data.map(moisture => moisture.plant_name);
		const plant_2_status = plant_2_data.map(moisture => moisture.has_water);
		const plant_2_time = plant_2_data.map(moisture => moisture.time_last_watered);

			return (
					<tr key={ generateKey() }>
						<td><HistoryChart data={ plant_1_status } color="green" units="%" /></td>
						<td><HistoryChart data={ plant_2_status } color="orange" units="%" /></td>
					</tr>
				);

	} */

	renderCurrent(moistureData) {
		var plant_1_data = [];
		var plant_2_data = [];

		for (var i = 0; i < moistureData.length; i++) {
			if (moistureData[i].plant_name == 'peppermint') {
				plant_1_data.push(moistureData[i]);
			} else if (moistureData[i].plant_name == 'thyme') {
				plant_2_data.push(moistureData[i]);
			}
		}

		const generateKey = () => {
			var randomnumber = Math.floor(Math.random()*100) + 1;
			return `${ randomnumber }_${ new Date().getTime() }`;
		}
		const plant_1_status = plant_1_data.map(moisture => moisture.has_water);
		const plant_1_time = plant_1_data.map(moisture => moisture.time_last_watered);
		const plant_2_status = plant_2_data.map(moisture => moisture.has_water);
		const plant_2_time = plant_2_data.map(moisture => moisture.time_last_watered);
		const plant_1_current_status = [plant_1_status[plant_1_status.length - 1]];
		const plant_2_current_status = [plant_2_status[plant_2_status.length - 1]];
		const currentData = [plant_1_status[plant_1_status.length - 1], plant_2_status[plant_2_status.length - 1]];
		
		
		return (
				<div key={ generateKey() } className="flexFix">
					<PercentCircle curData={ currentData } />
				</div>
			);
	}



	render() {
		return (
				<div className="infoContainer">
					<div className="percentGrid">
						{this.props.moisture.map(this.renderCurrent)}
					</div>
				</div>
			);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchMoisture }, dispatch);
}

function mapStateToProps ({moisture}) {
	return { moisture }; // identical to {weather: state.weather}
}

export default connect(mapStateToProps, mapDispatchToProps)(Graphs);