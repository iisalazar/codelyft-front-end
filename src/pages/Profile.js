import React, { useEffect, useContext } from "react";
import ProfileCard from "../components/profile/ProfileCard";
import Snippets from "../components/snippets/Snippets";
import AuthContext from "../context/auth/authContext";
import SnippetContext from "../context/snippet/snippetContext";
import Spinner from "../components/spinner/Spinner";

const Profile = () => {
	const authContext = useContext(AuthContext);
	const snippetContext = useContext(SnippetContext);

	const { loadUser } = authContext;
	const { getSnippets } = snippetContext;
	useEffect( () => {
		loadUser();
		getSnippets();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="text-center">
			{ !authContext.loading ? <ProfileCard className="margin-y-3-auto"/> : <Spinner /> }
			<h1>Snippets</h1>
			{ !snippetContext.loading ? <Snippets /> : <Spinner /> }
		</div>
	)
}

export default Profile;