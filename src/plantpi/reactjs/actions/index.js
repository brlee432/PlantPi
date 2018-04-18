import axios from 'axios';

const API_KEY = //key here
const WEATHER_ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
const MOIST_URL = `api/`;
const WATERING_URL = `watering_url/`;

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_MOISTURE = 'FETCH_MOISTURE';
export const WATER_NOW = 'WATER_NOW';
export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

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

export function waterNow() {
	const url = `${WATERING_URL}`;
	const request = axios.get(url);

	return {
		type: WATER_NOW,
		payload: request
	};
}

export function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

export function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

function callLoginApi(email, password, callback) {
  setTimeout(() => {
    if (email === 'email_here' && password === 'password_here') {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);
}

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, error => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}