import { combineReducers } from 'redux';

import WeatherReducer from './reducer_weather';
import MoistureReducer from './reducer_moisture';
import WateringReducer from './reducer_watering';
import LoginReducer from './reducer_login';


const rootReducer = combineReducers({
  weather: WeatherReducer,
  moisture: MoistureReducer,
  watering: WateringReducer,
  isLoginSuccess: LoginReducer,
  isLoginPending: LoginReducer,
  loginError: LoginReducer
});

export default rootReducer;
