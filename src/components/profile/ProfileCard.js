import React, { useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import PropTypes from "prop-types";

const ProfileCard = ({ style, imageSize, className }) => {

	const authContext = useContext(AuthContext);
	const { user } = authContext;
	if(user === null){
		return(
			<Fragment>
				<h1>Not logged-in yet</h1>
			</Fragment>
		)
	} else {
		return(
			<div className={"card grid-2 text-center " + className} style={style}>
				<img 
					alt="avatar" src={ user.profile.image } 
					className={ 'circular-image ' + imageSize + ' large-image ' } 
					style={{ margin: 'auto' }}
					/>
				<ul style={{ margin: 'auto 0' }}>
					<li><h2 className="">{ user.username }</h2></li>
					<li><small>{ user.snippet_count } snippets</small></li>
					<li><p>{ user.first_name + ' ' + user.last_name}</p></li>
				</ul>
			</div>
		)
	}
}

ProfileCard.defaultProps = {
	style: {
		width: '500px'
	},
	imageSize: 'x-large-image'
}

ProfileCard.propTypes = {
	imageSize: PropTypes.string
}

export default ProfileCard;