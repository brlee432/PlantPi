import { FETCH_WEATHER } from '../actions/index';


export default function (state = [], action) {
	switch (action.type) {
		case FETCH_WEATHER:
			//Alternatively, one could use .concat(), as it also does not mutate state, merely creates new state.
			//return state.concat([action.payload.data]);
			return [action.payload.data, ...state];
	}
	return state;
}