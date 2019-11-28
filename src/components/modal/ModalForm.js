import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalContext from "../../context/modal/modalContext";
import SnippetContext from "../../context/snippet/snippetContext";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

// import AlertContext from "../../context/alert/alertContext";


const ModalForm = () => {
	const modalContext 		= useContext(ModalContext);
	const snippetContext 	= useContext(SnippetContext);
	const alertContext 		= useContext(AlertContext);
	const authContext 		= useContext(AuthContext);

	const { addSnippet, created } = snippetContext;
	const { showForm, hideModalForm } = modalContext;
	const { setAlert }  = alertContext;
	const { loadUser } = authContext;

	// to show an alert if successfully created
	useEffect( () => {
		if(created){
			setAlert('Snippet uploaded successfully','success');
			loadUser();
			setUploading(false)
			hideModalForm();
		}
		// eslint-disable-next-line
	}, [created] )

	const [snippet, setSnippet] = useState({
		file: null
	})

	const [uploading, setUploading] = useState(false)

	const { file } = snippet;

	const onUpload = e => {
		const allowed = [ 
			"py", 
			"cpp", 
			"js", 
			"cs", 
			"c", 
			"java", 
			"sql", 
			'css', 
			'html',
			"ts",
			"php",
			"rb" ,
			"lua"
		]
		const file = e.target.files[0];
		const { name } = file;
		const extension = name.split('.').pop()
		if(! allowed.includes(extension) ){
			setAlert('File should end in py, js, cs, c, cpp, java, sql, css, html, ts, php, rb, or lua', 'danger');
			hideModalForm();
		} else {
			setSnippet({
				...snippet,
				file: e.target.files[0]
			})
		}
	}


	const upload = (e) => {
		setUploading(true)
		let formData = new FormData();
		formData.append('source', file, file.name);
		addSnippet(formData);
		setSnippet({
			file: null
		})
	}
	return(
		showForm 
			? (
		<Modal>
			<div 
				style={{ 
				height: '30vh',
				display: 'grid',
				alignItems: 'center',
				textAlign: 'center'
			}}>
				<h2>Upload a New Snippet</h2>
				<input 
					type="file" 
					name="snippet" 
					onChange={ onUpload }
				/>
			</div>
			<div style={{ textAlign: 'center' }}>
				<button 
					className="btn btn-dark btn-block"
					onClick={ hideModalForm }
				>
					Close
				</button>
				<div className="margin-y-3">
				{ file ? (
					<button 
						className="btn btn-secondary btn-block"
						onClick={upload}
					>
						<FontAwesomeIcon icon="upload" /> Upload
					</button>
					) : <div className="card">{ uploading ? 'Uploading...' : 'No file uploaded yet' }</div>
				}
				</div>
			</div>
		</Modal>
		) : null
	)
}
export default ModalForm;