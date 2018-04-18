import { WATER_NOW } from '../actions/index';

export default function (state = [], action) {

	switch(action.type) {
		case WATER_NOW:
			return [action.payload.data];
	}
	return state;
}