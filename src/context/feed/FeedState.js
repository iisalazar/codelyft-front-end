import React, { useReducer } from "react";
import axios from "axios";
import feedReducer from "./feedReducer";
import FeedContext from "./feedContext";

import { GET_FEED } from "../types";

const FeedState = props => {
	const initialState = {
		loading: true
	}

	const [ state, dispatch ] = useReducer(feedReducer, initialState);
	return(
		<FeedContext.Provider 
			value={{
				loading: state.loading,
			}}
		>
			{ props.children }
		</FeedContext.Provider>
	)
}
export default FeedState;