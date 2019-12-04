import React from "react";
import Highlight from "react-highlight.js";

const codeStyle = { 
	overflowY: 'scroll', 
	height: 'auto', 
	maxHeight: '68vh',
	width: '100%',
	fontSize: '14px'
}

const CodeSnippet = ({ language, source_code }) => {
	return(
		<Highlight language={ language } style={codeStyle}>
				{ source_code }
		</Highlight>
	)
}

export default CodeSnippet