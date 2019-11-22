import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalContext from "../context/modal/modalContext";

const Widget = (props) => {
	const modalContext = useContext(ModalContext);
	const { showModalForm } = modalContext;
	const show = () => {
		console.log("SHOW FORM");
		showModalForm();
	}
	return(
		<div className="widget">
			<button className="btn btn-secondary btn-circular"
				style={{ height: '100px', width: '100px' }}
				onClick = { show }
			>
				<FontAwesomeIcon icon="code" />
			</button>
		</div>
	)
}

export default Widget;