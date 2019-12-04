import React, { useContext } from "react";
import SnippetContext from "../../context/snippet/snippetContext";
import ModalContext from "../../context/modal/modalContext";
import "./SnippetCard.css";
import extractor from "../../utils/extractFileName";
const SnippetCard = ({ id, fileName }) => {
	const snippetContext = useContext(SnippetContext);
	const modalContext = useContext(ModalContext);
	const { setCurrent } = snippetContext;
	const { showModal } = modalContext;
	const onClick = e => {
		setCurrent(id);
		showModal();
	}
	return (
		<div className="card text-center snippet-card">
		
			<button className="btn btn-secondary" onClick={ onClick }>
				View Code
			</button>
			<div className="footnote text-left">
				{ extractor(fileName) }
			</div>
		</div>
	)
}

export default SnippetCard;