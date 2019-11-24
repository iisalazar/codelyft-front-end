import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";


const LoginForm = (props) => {
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;

	// for authentication

	const authContext = useContext(AuthContext);
	const { login, error, isAuthenticated, clearErrors } = authContext;

	useEffect( () => {
		if(isAuthenticated){
			setLoading(false);
			props.history.push('/');
			setAlert('Login Successful!', 'success');
		}
		if (error){
			setLoading(false);
			setAlert(error, 'danger');
			clearErrors()
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		username: '',
		password: '',
	})
	const [loading, setLoading] = useState(false);

	const { username, password } = user;

	const onChange = e => setUser({ ...user, [e.target.name] : e.target.value })

	const onSubmit = e => {
		e.preventDefault();
		if(username === '' || password === ''){
			setAlert('Username and passwords should not be blank', 'danger');
		} else {
			setLoading(true);
			login({
				username,
				password
			})
		}
	}
	const redirect = () => props.history.push('/register')
	return(
		<form className="form-container card" onSubmit = { onSubmit }>
			<h1>
				Login to <span className="text-secondary">Codelyft</span>
			</h1>
			<div className="form-group">
				<label htmlFor="username">Username</label>
				<input 
					type="text" 
					name="username"
					value={ username }
					onChange={ onChange }
					/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input 
					type="password" 
					name="password"
					value={ password }
					onChange={ onChange }
					/>
			</div>
			{ loading ? (
				<button className="btn btn-block" 
					style={{ fontSize: '1.5rem' }}>
					Logging in...
				</button>
				) : (
				<input 
					type="submit" 
					value="Login" 
					className="btn btn-secondary btn-block"
					style={{ fontSize: '1.5rem' }}
				/>
				)
			}
			<button 
				className="btn btn-primary btn-block"
				style={{ fontSize: '1.5rem' }}
				onClick= { redirect }
			>
				I don't have an account.
			</button>
		</form>
	)
}


export default LoginForm;