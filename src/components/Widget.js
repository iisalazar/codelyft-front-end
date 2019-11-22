import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalContext from "../context/modal/modalContext";
import AuthContext from "../context/auth/authContext";

const Widget = (props) => {
	const modalContext = useContext(ModalContext);
	const authContext = useContext(AuthContext);
	const { showModalForm } = modalContext;
	const { isAuthenticated } = authContext;
	const show = () => {
		console.log("SHOW FORM");
		showModalForm();
	}
	return(
		isAuthenticated ? (
			<div className="widget">
				<button className="btn btn-secondary btn-circular"
					style={{ height: '100px', width: '100px' }}
					onClick = { show }
				>
					<FontAwesomeIcon icon="code" />
				</button>
			</div>
			) : null
		
	)
}

export default Widget;