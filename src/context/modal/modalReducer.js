import {
	SHOW_MODAL,
	HIDE_MODAL,
	SHOW_MODAL_FORM,
	HIDE_MODAL_FORM
} from "../types";

export default (state, action) => {
	switch(action.type){
		case SHOW_MODAL:
			return {
				...state,
				showSnippet: true
			}
		case HIDE_MODAL:
			return {
				...state,
				showSnippet: false
			}
		case SHOW_MODAL_FORM: 
			return {
				...state,
				showForm: true
			}
		case HIDE_MODAL_FORM:
			return {
				...state,
				showForm: false
			}
		default:
			return state
	}
}