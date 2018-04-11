import axios from 'axios';


const API_KEY = '844f86f81130c67537eab449f589d93a';
const WEATHER_ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
const MOIST_URL = `api/`;




export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_MOISTURE = 'FETCH_MOISTURE';



export function fetchWeather(city) {
	const url = `${WEATHER_ROOT_URL}&q=${city},us`;
	const request = axios.get(url);

	return {
		type: FETCH_WEATHER,
		payload: request
	};
}

export function fetchMoisture() {
	const url = `${MOIST_URL}`;
	const request = axios.get(url);

	return {
		type: FETCH_MOISTURE,
		payload: request
	};
}
