import {
	GET_SNIPPETS,
	ADD_SNIPPET,
	DELETE_SNIPPET,
	SET_CURRENT,
	CLEAR_CURRENT,
	// SNIPPET_ERROR,
	CLEAR_SNIPPETS,
	CLEAR_CREATED,
	CLEAR_DELETED,
	GET_FEED,
	UPVOTE,
	DOWNVOTE
} from "../types";

export default (state, action) => {
	switch(action.type){
		case ADD_SNIPPET:
			return {
				...state,
				snippets: [action.payload, ...state.snippets],
				created: true
			}
		case CLEAR_CREATED:
			return {
				...state,
				created: false
			}
		case GET_SNIPPETS:
			return {
				...state,
				snippets: action.payload,
				loading: false
			}
		case DELETE_SNIPPET:
			const snippets = state.snippets.filter( snippet => snippet.id !== action.payload )
			return {
				...state,
				snippets,
				deleted: true
			}
		case CLEAR_DELETED:
			return {
				...state,
				deleted: false
			}
		case CLEAR_SNIPPETS:
			return {
				...state,
				snippets: null
			}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			}
		case GET_FEED:
			return {
				...state,
				feed: action.payload,
				loading: false
			}
		case UPVOTE:
			const { id, user } = action.payload;
			const feed = state.feed.map( entry => {
				if(entry.id === id){
					let nandon = false;
					entry.upVoters.map( voter => {
						if(voter.id === user.id){
							nandon=true
						}
						return voter
					})
					if(nandon){
						const a = entry.upVoters.indexOf(user);
						entry.upVoters.splice(a, 1);
						entry.upVotes -= 1
						entry.totalVotes -= 1
					}else {
						entry.upVoters.push(user);
						entry.upVotes += 1
						entry.totalVotes += 1
					}
					
				}
				return entry
			})
			return {
				...state,
				feed
			}
		case DOWNVOTE:
			const { ID, USER } = action.payload;
			const FEED = state.feed.map( entry => {
				if(entry.id === ID){
					let nandon = false;
					entry.downVoters.map( voter => {
						if(voter.id === USER.id){
							nandon=true
						}
						return voter
					})
					if(nandon){
						const a = entry.downVoters.indexOf(USER);
						entry.downVoters.splice(a, 1);
						entry.downVotes += 1
						entry.totalVotes += 1
					}else {
						entry.downVoters.push(USER);
						entry.downVotes -= 1
						entry.totalVotes -= 1
					}
					
				}
				return entry
			})
			return {
				...state,
				feed : FEED
			}
		default:
			return state
	}
}