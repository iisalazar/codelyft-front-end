import React, { useContext } from "react";
import ProfileCardSmall from "../profile/ProfileCardSmall";
import CodeSnippet from "../snippets/CodeSnippet";
import { convertDate, language as getLang} from "../../utils"
import extractor from "../../utils/extractFileName";
import AuthContext from "../../context/auth/authContext";
import SnippetContext from "../../context/snippet/snippetContext";

const FeedCard = ({ id, user, source_code, language, created, style, totalVotes, upVoters, downVoters }) => {
	const authContext = useContext(AuthContext);
	const snippetContext = useContext(SnippetContext);

	const { upvote, downvote } = snippetContext;

	upVoters.filter( upvoter => upvoter.id === authContext.user.id);
	downVoters.filter( downvoter => downvoter.id === authContext.user.id );

	const onUp = () => upvote({ id, user });
	const onDown = () => downvote({ id, user});
	return(
		<div className="card" style={style}>
			<ProfileCardSmall 
				username={ user.username } 
				profile={ user.profile.image || ''} 
				style={{ width: '200px' }}
				/>
			<CodeSnippet 
				language={ getLang(language) }
				source_code={ source_code }
			/>
			<div className='margin-y-1'>
				<b>{ totalVotes } ++'s</b> | Uploaded { convertDate(created) }
			</div>
			<div className="grid-2 no-gap text-center margin-y-1">
				<div 
					className={ "btn btn-block btn-success" + (
						upVoters.length !== 1 ? '-inverted' : ''
						) }
					onClick = { onUp }
				>
					vote += 1
				</div>
				<div 
					className={ "btn btn-block btn-danger" + (
						downVoters.length !== 1 ? '-inverted' : ''
					)}
					onClick={ onDown }
				>
					vote -= 1
				</div>
			</div>
		</div>
	)
}

export default FeedCard;