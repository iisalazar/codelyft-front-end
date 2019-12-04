import { GET_FEED } from "../types";

export default (state, action) =>{ 
	switch(action.type){
		case GET_FEED:
			return {
				...state,
				feed: action.payload,
				loading: false
			}
		default:
			return state
	}
}