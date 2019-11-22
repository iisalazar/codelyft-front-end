import React, { useReducer } from 'react';
import uuid from "uuid";
import alertReducer from "./alertReducer";
import AlertContext from "./alertContext";

import {
	SET_ALERT,
	REMOVE_ALERT
} from "../types";

const AlertState = props => {

	// initial state of alerts is an empty array
	const initialState = []; 

	const [state, dispatch] = useReducer(alertReducer, initialState);

	// an action to add a new alert

	const setAlert = (msg, type, timeout = 5000) => {
		const id = uuid.v4();
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id }
		})

		// removes the alert after five seconds
		setTimeout( () => {
			dispatch({
				type: REMOVE_ALERT,
				payload: id
			})
		}, timeout);
	}

	return (
		<AlertContext.Provider value={{ alerts: state, setAlert }}>
			{ props.children }
		</AlertContext.Provider>
	)

}

export default AlertState;