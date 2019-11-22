import {
	GET_SNIPPETS,
	ADD_SNIPPET,
	DELETE_SNIPPET,
	SET_CURRENT,
	CLEAR_CURRENT,
	// SNIPPET_ERROR,
	CLEAR_SNIPPETS,
	CLEAR_CREATED,
	CLEAR_DELETED
} from "../types";

export default (state, action) => {
	switch(action.type){
		case ADD_SNIPPET:
			return {
				...state,
				snippets: [action.payload, ...state.snippets],
				created: true
			}
		case CLEAR_CREATED:
			return {
				...state,
				created: false
			}
		case GET_SNIPPETS:
			return {
				...state,
				snippets: action.payload,
				loading: false
			}
		case DELETE_SNIPPET:
			const snippets = state.snippets.filter( snippet => snippet.id !== action.payload )
			return {
				...state,
				snippets,
				deleted: true
			}
		case CLEAR_DELETED:
			return {
				...state,
				deleted: false
			}
		case CLEAR_SNIPPETS:
			return {
				...state,
				snippets: null
			}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			}
		default:
			return state
	}
}