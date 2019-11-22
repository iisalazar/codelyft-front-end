import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

export default (state, action) => {
	switch(action.type){
		case USER_LOADED:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false
			}
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.response.token);
			console.log("CALLING REGISTER");
			return {
				...state,
				token: action.payload.response.token,
				isAuthenticated: true,
				loading: false
			}
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			console.log("CALLING LOGIN");
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				loading: false
			}

		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				loading: false,
				error: action.payload
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state
	}
}