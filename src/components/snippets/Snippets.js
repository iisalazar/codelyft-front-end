import React, {  useContext } from "react";
import SnippetCard from "./SnippetCard";
import SnippetContext from "../../context/snippet/snippetContext";
import extractor from "../../utils/extractFileName";

const Snippets = () => {
	const snippetContext = useContext(SnippetContext);
	let { snippets } = snippetContext;
	if(snippets !== null){
		if(snippets.length === 0){
			snippets = null
		}
	}
	return (
		<div className="grid-3 margin-y-3" style={{ gridGap: "3rem" }}>
			{  snippets ? snippets.map(snippet => (
					<SnippetCard 
						key={ snippet.id } 
						id={ snippet.id } 
						fileName={ extractor(snippet.source) }
					/>)
				) : <h2 className="text-center card">No snippets yet. Please add</h2>
		}
		</div>
	)
}

export default Snippets;