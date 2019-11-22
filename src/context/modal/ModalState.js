import React, { useReducer } from "react";
import modalReducer from "./modalReducer";
import ModalContext from "./modalContext";
import {
	SHOW_MODAL,
	HIDE_MODAL,
	SHOW_MODAL_FORM,
	HIDE_MODAL_FORM
} from "../types";

const ModalState = props => {
	const initialState = {
		showSnippet: false,
		showForm: false
	}
	const [state, dispatch] = useReducer(modalReducer, initialState);

	const showModal = () => dispatch({ type: SHOW_MODAL })
	
	const hideModal = () => dispatch({ type: HIDE_MODAL })

	const showModalForm = () => dispatch({ type: SHOW_MODAL_FORM })
	const hideModalForm = () => dispatch({ type: HIDE_MODAL_FORM })

	return (
		<ModalContext.Provider 
			value={{
				showSnippet: state.showSnippet,
				showForm: state.showForm,
				showModal,
				hideModal,
				showModalForm,
				hideModalForm
			}}
		>
			{ props.children }
		</ModalContext.Provider>
	)
}

export default ModalState