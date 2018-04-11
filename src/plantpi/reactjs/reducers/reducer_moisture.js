import { FETCH_MOISTURE } from '../actions/index';

export default function (state = [], action) {

	switch(action.type) {
		case FETCH_MOISTURE:

			return [action.payload.data];
	}
	return state;
}