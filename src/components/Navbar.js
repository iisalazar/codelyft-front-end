import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import SnippetContext from "../context/snippet/snippetContext";
import AlertContext from "../context/alert/alertContext";

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const snippetContext = useContext(SnippetContext);
	const alertContext = useContext(AlertContext);

	const { isAuthenticated, user, logout } = authContext;
	const { setAlert } = alertContext;
	const onLogout = () => {
		logout();
		setAlert('Thank you for using Codelyft.', 'success')
		snippetContext.clearSnippets();
	}
	const authLinks = (
		<Fragment>
			<li>
				<Link to='/profile'>
					Hello, { user && user.username }
				</Link>
			</li>
			<li>
				<a onClick= { onLogout } href="#!">
					{/* 
						- the next line of html hides on small devices 
						- made possible using css
					*/}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
		)
	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</Fragment>
	)
	return(
		<div className="navbar bg-primary">
			<h1>
				<Link to='/'>
					Codelyft
				</Link>
			</h1>
			<ul>
				{
					isAuthenticated ? authLinks : guestLinks
				}
			</ul>
		</div>
	)
}

export default Navbar;