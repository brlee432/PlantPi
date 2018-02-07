import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchMoisture } from '../actions/index';
import HistoryChart from '../components/history_chart';
import PercentCircle from '../components/current_chart';

class Graphs extends Component {
	constructor(props) {
		super(props); //gives access to props outside of constructor function

		this.props.fetchMoisture();
	}

	renderMoisture(moistureData) {
		var plant_1_data = [];
	    var plant_2_data = [];

		for (var i = 0; i < moistureData.length; i++) {
			if (moistureData[i].plant_name == 'peppermint') {
				plant_1_data.push(moistureData[i]);
			} else if (moistureData[i].plant_name == 'thyme') {
				plant_2_data.push(moistureData[i]);
			}
		}

		const id = moistureData.map(moisture => moisture.key);
		const plant_1_id = plant_1_data.map(moisture => moisture.id);
		const plant_1_name = plant_1_data.map(moisture => moisture.plant_name);
		const plant_1_level = _.map(plant_1_data.map(moisture => moisture.moisture_voltage), (moisture_voltage) => ((moisture_voltage/1023)*100));
		const plant_1_time = plant_1_data.map(moisture => moisture.time_measured);
		const plant_2_id = plant_2_data.map(moisture => moisture.id);
		const plant_2_name = plant_2_data.map(moisture => moisture.plant_name);
		const plant_2_level = _.map(plant_2_data.map(moisture => moisture.moisture_voltage), (moisture_voltage) => ((moisture_voltage/1023)*100));
		const plant_2_time = plant_2_data.map(moisture => moisture.time_measured);

			return (
					<tr key={ id }>
						<td><HistoryChart data={ plant_1_level } color="green" units="%" /></td>
						<td><HistoryChart data={ plant_2_level } color="orange" units="%" /></td>
					</tr>
				);

	}

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

		const id = moistureData.map(moisture => moisture.key);
		const plant_1_level = _.map(plant_1_data.map(moisture => moisture.moisture_voltage), (moisture_voltage) => ((moisture_voltage/1023)*100));
		const plant_1_time = plant_1_data.map(moisture => moisture.time_measured);
		const plant_2_level = _.map(plant_2_data.map(moisture => moisture.moisture_voltage), (moisture_voltage) => ((moisture_voltage/1023)*100));
		const plant_2_time = plant_2_data.map(moisture => moisture.time_measured);
		const plant_1_current_level = [plant_1_level[plant_1_level.length - 1]];
		const plant_2_current_level = [plant_2_level[plant_2_level.length - 1]];
		const currentData = [plant_1_level[plant_1_level.length - 1], plant_2_level[plant_2_level.length - 1]];

		return (
				<div key={ id } className="flexFix">
					<PercentCircle curData={ currentData } />
				</div>
			);
	}


	render() {
		return (
				<div>
					<div className="percentGrid">
						{this.props.moisture.map(this.renderCurrent)}
					</div>
					<h4>Historical Soil Saturation</h4>
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Peppermint</th>
								<th>Thyme</th>
							</tr>
						</thead>
						<tbody>
							{this.props.moisture.map(this.renderMoisture)}
						</tbody>
					</table>
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