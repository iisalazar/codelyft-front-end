import React, { useContext, Fragment } from "react";
import FeedCard from "./SnippetFeedCard";
import SnippetContext from "../../context/snippet/snippetContext";


const SnippetsFeed = () => {
	const snippetContext = useContext(SnippetContext);
	let { feed } = snippetContext;
	return(
		<div>
			{ feed.map( entry => (
					<FeedCard 
						{ ...entry } 
						key={ entry.id } 
						style={{
							marginBottom: '5rem',
							width: '50vw',
							display: 'grid',
							gridRowGap: '0.5rem',
							background: '#fff'
						}}
					/>
				)) 
			}			
		</div>
	)
}

export default SnippetsFeed;