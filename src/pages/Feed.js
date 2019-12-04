import React, { useEffect, useContext, Fragment } from "react";
import ProfileCard from "../components/profile/ProfileCard";
import Snippets from "../components/snippets/Snippets";
import AuthContext from "../context/auth/authContext";
import FeedContext from "../context/feed/feedContext"

import SnippetContext from "../context/snippet/snippetContext";
import Spinner from "../components/spinner/Spinner";
import ProfileCardSmall from "../components/profile/ProfileCardSmall";

import SnippetsFeed from "../components/feed/SnippetsFeed";

const Feed = () => {
	const authContext = useContext(AuthContext);
	const snippetContext = useContext(SnippetContext);
	const feedContext = useContext(FeedContext);


	const { loadUser, user, loading } = authContext;

	const { getSnippets } = snippetContext;

	useEffect( () => {
		loadUser();
		getSnippets();
		// getSnippets();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="grid-6-3">
			<div >
				{ !snippetContext.loading ? <SnippetsFeed /> : <Spinner /> }
			</div>
			<div>
				{ !loading && user ? 
					(
						<Fragment>
							<ProfileCardSmall username={ user.username } profile = { user.profile.image } /> 
						</Fragment>
					)
					: <Spinner /> 
				}
			</div>
		</div>
	)
}

export default Feed;