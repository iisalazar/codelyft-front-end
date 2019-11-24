import React, { useContext, useEffect } from "react";
import Highlight from "react-highlight.js";
import Modal from "./Modal";
import SmallCard from "../profile/ProfileCardSmall";
import ModalContext from "../../context/modal/modalContext";
import SnippetContext from "../../context/snippet/snippetContext";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import extractor from "../../utils/extractFileName";

const modalStyle = { 
	overflowY: 'scroll', 
	height: 'auto', 
	maxHeight: '68vh',
	width: 'auto',
	fontSize: '14px'
}

const SnippetModal = (props) => {
	const modalContext = useContext(ModalContext);
	const snippetContext = useContext(SnippetContext);
	const alertContext = useContext(AlertContext);
	const authContext 		= useContext(AuthContext);

	const { showSnippet, hideModal } = modalContext;
	const { current, clearCurrent, deleteSnippet, deleted } = snippetContext;
	const { setAlert } = alertContext;
	const { loadUser } = authContext;

	useEffect( () => {
		if(deleted){
			setAlert('Snippet deleted.', 'success');
			loadUser();
			hideModal()
		}
		// eslint-disable-next-line
	}, [deleted] );

	const hide = () => {
		hideModal()
		clearCurrent()
	}
	const convertDate = date => {
		let newDate = new Date(date);
		return newDate.toLocaleString()
	}
	const language = lang => lang.toLowerCase()
	const delSnippet = () => {
		if(current && showSnippet){
			deleteSnippet(current.id);
		}
	}
	return(
		showSnippet && current && (
			<Modal>
				<Highlight language={ language(current.language) } style={modalStyle}>
						{ current.source_code }
				</Highlight>
				<div>
					<button 
						className='btn btn-dark btn-block' 
						onClick={ hide }
					>
						Close
					</button>
					<SmallCard 
						username={ current.user.username } 
						profile= { current.user.profile.image }
					/>
					<div className="card text-left">
						<b>{ extractor(current.filename) }</b><br/>
						Written in: <b>{ current.language }</b><br />
						Date: <b>{ convertDate(current.created)  }</b>
					</div>
					<button 
						className="btn btn-danger btn-block"
						onClick={ delSnippet }
					>
						Delete
					</button>
				</div>
			</Modal>
			)
	)
}

export default SnippetModal;