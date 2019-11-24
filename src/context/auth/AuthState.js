import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
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
import setAuthToken from "../../utils/setAuthToken";

const AuthState = (props) => {
	const initialState = {
		token: 				localStorage.getItem('token'),
		isAuthenticated: 	null,
		loading: 			true,
		error: 				null,
		user: 				null
	}

	const [state, dispatch] = useReducer(authReducer, initialState);

	const loadUser = async () => {
		try {
			const res = await axios.get('/api/users/check/');
			console.log(res.data);
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		} catch(err){
			console.error(err.response.data);
			dispatch({
				type: AUTH_ERROR,
				payload: err.response.data
			})
		}
	}
	const register = async formData => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}
		try {
			const res = await axios.post('/api/users/register/', formData, config);
			console.log(res.data);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})
			console.log("TOKEN " + res.data.response.token);
			setAuthToken(res.data.response.token);
			loadUser();
		} catch(err){
			console.error(err.response.data);
			console.log(err.response.data.username !== undefined);
			if(err.response.data.username !== undefined){
				err.response.data = {
					...err.response.data,
					details: "A user with that username already exists."
				}
			}
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.details
			})
		}
	}
	const login = async formData => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		try {
			const res = await axios.post('/api/users/login/', formData, config);
			// console.log(res.data);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})
			setAuthToken(res.data.token);
			loadUser();
		} catch(err){
			console.error(err.response.data);
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.details
			})
		}
	}

	const logout = () => {
		dispatch({ type: LOGOUT })
		setAuthToken();
	}

	const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

	return (
			<AuthContext.Provider
				value={{
					token: state.token,
					isAuthenticated: state.isAuthenticated,
					loading: state.loading,
					error: state.error,
					user: state.user,
					login,
					register,
					logout,
					loadUser,
					clearErrors
				}}
			>
				{ props.children }
			</AuthContext.Provider>
		)
}

export default AuthState;