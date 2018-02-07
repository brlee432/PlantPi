import { combineReducers } from 'redux';

import WeatherReducer from './reducer_weather';
import MoistureReducer from './reducer_moisture';


const rootReducer = combineReducers({
  weather: WeatherReducer,
  moisture: MoistureReducer
});

export default rootReducer;
