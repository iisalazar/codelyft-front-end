import React from "react";



export default ({ username, profile}) => {
	const cardStyle={
		display: 'grid',
		gridTemplateColumns: '1fr 9fr',
		alignItems:'center',
	}
	return(
		<div className="card" style={cardStyle}>
			<img alt="avatar" className="circular-image medium-image" src={ profile } />
			<div className="text-left">
				<h3>{ username }</h3>
			</div>
		</div>
	)
}