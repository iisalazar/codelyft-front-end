import React, { useReducer } from "react";
import axios from "axios";
import SnippetContext from "./snippetContext";
import snippetReducer from "./snippetReducer";
import {
	GET_SNIPPETS,
	ADD_SNIPPET,
	DELETE_SNIPPET,
	SET_CURRENT,
	CLEAR_CURRENT,
	CLEAR_SNIPPETS,
	// SNIPPET_ERROR,
	CLEAR_CREATED,
	CLEAR_DELETED,
	UPVOTE,
	DOWNVOTE,
	GET_FEED
} from "../types";

const SnippetState = props => {
	const initialState = {
		snippets: null,
		current: null,
		error: null,
		loading: true,
		created: false,
		deleted: false,
		feed: []
	};

	const [state, dispatch] = useReducer(snippetReducer, initialState);

	const addSnippet = async formData => {
		const config = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}
		console.log(formData);
		try {
			const res = await axios.post('/api/snippets/', formData, config);
			dispatch({
				type: ADD_SNIPPET,
				payload: res.data
			})
			setTimeout( () => dispatch({ type: CLEAR_CREATED }), 5000)
		} catch(err){
			console.error(err.response.data);

		}
	}

	const deleteSnippet = async id => {
		
		try {
			await axios.delete(`/api/snippets/${id}`);
			dispatch({
				type: DELETE_SNIPPET,
				payload: id
			})
			clearCurrent()
			setTimeout( () => dispatch({ type: CLEAR_DELETED }), 5000)
		} catch(err){
			console.error(err.response)
		}
	}

	const getMySnippets = async () => {
		try {
			const res = await axios.get('/api/snippets/mine/');
			dispatch({
				type: GET_SNIPPETS,
				payload: res.data
			})
		} catch(err){
			console.error(err.response.data);
		}
	}

	const getSnippets = async () => {
		try {
			const res = await axios.get('/api/snippets/');
			console.log(res.data);
			dispatch({
				type: GET_FEED,
				payload: res.data
			});
		}catch(err){
			console.error(err.response);
		}
	}

	const setCurrent = async id => {
		try {
			let res = await axios.get(`/api/snippets/${id}`);
			const res2 = await axios.get(`/api/users/${res.data.user.id}/`);
			res.data = { ...res.data, user: {
				username: res2.data.username,
				id: res2.data.id,
				profile: res2.data.profile
				} 
			}
			console.log(res.data)
			dispatch({
				type: SET_CURRENT,
				payload: res.data
			})
		} catch(err){
			console.error(err.response.data);
		}
	}

	const clearCurrent = () => dispatch({ type: CLEAR_CURRENT })

	const clearSnippets = () => {
		dispatch({ type: CLEAR_SNIPPETS })
	}

	const upvote = ({ id, user}) => {
		try {
			dispatch({
				type: UPVOTE,
				payload: { id, user}
			})
		}catch(err){
			console.log(err.response.data);
		}
	}
	const downvote = ({ id, user }) => {
		try {
			dispatch({
				type: DOWNVOTE,
				payload: { id, user}
			})
		}catch(err){
			console.log(err.response.data);
		}
	}

	return (
		<SnippetContext.Provider
			value={{
				snippets: state.snippets,
				current: state.current,
				error: state.error,
				loading: state.loading,
				created: state.created,
				deleted: state.deleted,
				feed: state.feed,
				getMySnippets,
				clearSnippets,
				setCurrent,
				clearCurrent,
				addSnippet,
				deleteSnippet,
				upvote,
				downvote,
				getSnippets
			}}
		>
			{ props.children }
		</SnippetContext.Provider>
	)
}

export default SnippetState;