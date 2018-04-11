import React, {Component} from 'react';
import {connect} from 'react-redux';
import WeatherChart from '../components/weather_chart';
import GoogleMap from '../components/google_map';
import _ from 'lodash';


class WeatherList extends Component {
	renderWeather(cityData) {
		const name = cityData.city.name;
		const clouds = cityData.list.map(weather => weather.clouds.all);
		const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => (9/5) * (temp-273) + 32);
		const soon_main = cityData.list[0].weather[0].main;
		const soon_icon_code = cityData.list[0].weather[0].icon;
		const soon_icon = `http://openweathermap.org/img/w/${soon_icon_code}.png`;
		const soon_description = cityData.list[0].weather[0].description;
		const soon_clouds = _.round(cityData.list[0].clouds.all);
		const soon_temp = _.round((9/5) * (cityData.list[0].main.temp - 273) + 32);
		const { lon, lat } = cityData.city.coord;
		/* Same as 
		const lon = cityData.city.coord.lon;
		const lat = cityData.city.coord.lat; */

		return (
				<table key={name} className="Table">
					<thead>
						<tr>
							<th>City</th>
							<th>In 3 Hours...</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><GoogleMap lon={lon} lat={lat} /></td>
							<td id="quickWeather">
								<h4><strong>{soon_main}</strong></h4>
								<p><img src={soon_icon} className="weatherIcon" alt="Weather Icon" /></p>
								<p>Specifically: <i>{soon_description}</i></p>
								<p>Cloudiness: {soon_clouds}%</p>
								<p>Temp: {soon_temp} &deg;F</p>
							</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th>Cloudiness (5 Day Forecast)</th>
							<th>Temperature (5 Day Forecast)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><WeatherChart data={clouds} color="blue" units="%" /></td>
							<td><WeatherChart data={temps} color="red" units="&deg;F" /></td>
						</tr>
					</tbody>
				</table>
		);
	}

	render() {
		return (
			<div className="slide">
				{this.props.weather.map(this.renderWeather)}		
			</div>
		);
	}

}

function mapStateToProps ({weather}) {
	return { weather }; // identical to {weather: state.weather}
}

export default connect(mapStateToProps)(WeatherList);