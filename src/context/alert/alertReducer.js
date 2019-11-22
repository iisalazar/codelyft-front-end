import {
	SET_ALERT,
	REMOVE_ALERT
} from "../types";

export default (state, action) => {
	switch(action.type){
		case SET_ALERT:
			return [ ...state, action.payload ];
		case REMOVE_ALERT:
			const alerts = state.filter( alert => alert.id !== action.payload )
			return alerts;
		default:
			return state
	}
}