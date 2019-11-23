import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";


const RegisterForm = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { register, error, isAuthenticated, clearErrors, token } = authContext;
	const { setAlert } = alertContext;

	useEffect( () => {
		if(isAuthenticated && token){
			console.log(token);
			props.history.push('/');
		}
		if(error){
			setAlert(error, 'danger');
			clearErrors()
		}
		// eslint-disable-next-line
	}, [isAuthenticated, props.history, error]);

	const [user, setUser] = useState({
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		password: '',
		password2: '',
		profile: null,
	})
	
	const { username, 
			email, 
			first_name, 
			last_name, 
			password, 
			password2, profile } = user;

	const validateEmail = (email) => {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	const handleProfile = (e) => {
	    e.preventDefault();
	    setUser({ ...user, profile: e.target.files[0]})
	}
	const redirect = () => props.history.push('/login')
	const onChange = e => setUser({ ...user, [e.target.name] : e.target.value });
	const onSubmit = e => {
		e.preventDefault();
		const allowed = [ "jpeg", "jpg", "png" ]
		const name = profile.name;
		const extension = name.split('.').pop().toLowerCase()
		if(! allowed.includes(extension) ){
			setAlert('Please only upload in jpg, png or jpeg format', 'danger');
		}
		else if(
			username === '' || 
			email === '' || 
			first_name === '' ||
			last_name === '' 
			) {
			setAlert('All fields are required', 'danger');
		}
		else if( !validateEmail(email) ) {
			setAlert('Please enter a valid email', 'danger');
		}
		else if(password !== password2){
			setAlert('Passwords do not match', 'danger');
		} 
		else if (profile === null){
			setAlert('Profile field is required', 'danger');
		}
		else{
			let formData = new FormData();
			formData.append('profile', profile, profile.name);
			formData.append('username', username);
			formData.append('email', email);
			formData.append('first_name', first_name);
			formData.append('last_name', last_name);
			formData.append('password', password);
			formData.append('password2', password2);
			register(formData);
		}
	}
	return(
		<form className="form-container card" onSubmit = { onSubmit }>
			<h1>
				Register to <span className="text-secondary">Codelyft</span>
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
			<div className='form-group'>
				<label htmlFor='email'>Email</label>
				<input 
					type="text" 
					name="email" 
					value={ email }
					onChange = { onChange }
				/>
			</div>
			<div className="form-group">
				<label htmlFor="first_name">First Name</label>
				<input 
					type="text" 
					name="first_name"
					value={ first_name }
					onChange={ onChange }
					
					/>
			</div>
			<div className="form-group">
				<label htmlFor="last_name">Last Name</label>
				<input 
					type="text" 
					name="last_name"
					value={ last_name }
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
			<div className="form-group">
				<label htmlFor="password2">Confirm Pasword</label>
				<input 
					type="password" 
					name="password2"
					value={ password2 }
					onChange={ onChange }
					
					/>
			</div>
			<div className="form-group">
				<label htmlFor="profile">Profile Image <span className="text-danger">(required)</span></label>
				<input 
					type="file" 
					name="profile"
					onChange= { handleProfile }
					/>
			</div>
			<input 
				type="submit" 
				value="Register" 
				className="btn btn-secondary btn-block"
				style={{ fontSize: '1.5rem' }}
			/>
			<button 
				className="btn btn-primary btn-block"
				style={{ fontSize: '1.5rem' }}
				onClick={ redirect }
			>
				I want to login instead
			</button>
		</form>
	)
}


export default RegisterForm;