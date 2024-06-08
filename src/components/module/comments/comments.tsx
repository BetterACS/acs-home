import { useEffect, useState } from 'react';
import CommentInput from './commentsInput';
import {Comment} from '@/database/models';
// You can edit this file to modify the list of comments
// const example = [
// 	{
// 		id: 1,
// 		parent_id: -1,
// 		avatar: 'https://avatars.githubusercontent.com/u/66357924?v=4',
// 		name: 'John Doe',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
// 	},
// 	{
// 		id: 2,
// 		parent_id: 1,
// 		avatar: 'https://avatars.githubusercontent.com/u/66357924?v=4',
// 		name: 'Jane Doe',
// 		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
// 	},
// ];


function CommentComponent(props: any) {
	
	// const { id, avatar, parent_id, name, text, className, onReply } = props;
	const { _id, comment_text ,parent_id,onReply,comments,user_id,className } = props;
	console.log("b",props);
	return (
		<div className={className}>
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row items-center space-x-2">
				<img className="w-[32px] h-[32px] bg-blue-300 rounded-full" src={`https://cdn.discordapp.com/avatars/${user_id.discord_id}/${user_id.avatar}.png`} alt="https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png" />
					<p>{user_id.display_name}</p>
				</div>
				<div
					className="bg-red-200 rounded-full w-[18px] h-[18px] cursor-pointer"
					onClick={() => onReply(_id)}
				></div>
			</div>
			<div className="mt-2">{comment_text}</div>
		</div>
	);
}

function CommentBlock(props: any) {
	const { _id, comment_text ,parent_id,onReply,comments,user_id } = props;
	
	function recursive(parent_id: any): JSX.Element {
		if (parent_id === null) {
			return (<></>)
		}
		return (
			<>	
				{recursive(parent_id.parent_id)}
				<div>
					<div className="relative flex flex-row py-2">
						<div className="border-l-[5px] border-gray-200"></div>
						<CommentComponent className="pl-6 text-gray-400 mb-2" {...parent_id} />
					</div>
				</div>
			</>
		)
	}

	return (
		<div className="rounded-lg border-2 p-4">

			{/* {parent_id &&(
				<div>
					<div className="relative flex flex-row py-2">
						<div className="border-l-[5px] border-gray-200"></div>
						<CommentComponent className="pl-6 text-gray-400 mb-2" {...parent_id} />
					</div>
				</div>
			)}
			<CommentComponent {...props} /> */}
			{recursive(parent_id)}
			<CommentComponent {...props} />
		</div>
	);
}

export default function CommentsElement(props: any) {
	const { className,postID,userData } = props;
	const [parent_id, setParentId] = useState("");
	const [dependency, setDependency] = useState(false);
	const [comments, setComment] = useState<Comment[]>([]);
	async function Loaddata() {
		('use server');
		await fetch(
			`/api/trpc/getComment?input=${encodeURIComponent(
				JSON.stringify({ post_id: postID})
			)}`
		).then(async (res) => {
			const query = await res.json();
			console.log('query', query);
			const query_data = query.result.data.data.post as Comment[];
			setComment(query_data);
		});
	}

	useEffect(() => {
		const fetchData = async () => {
			await Loaddata();
			if (dependency === true) {
				//callBack();
				setDependency(false);
			}
		};
		fetchData();
	}, [dependency]);

	const onReply = (id: string) => {
		setParentId(id);
	};
	console.log("comments",comments);


	return (
		<div className={className}>
			<div className="relative flex py-5 items-center">
				<div className="flex-grow border-t border-gray-200"></div>
				<span className="flex-shrink mx-4 text-gray-400">Comments</span>
				<div className="flex-grow border-t border-gray-200"></div>
			</div>
			<div className="flex flex-col space-y-4">
				{comments.map((comment) => (
					<CommentBlock key={comment._id} {...comment} onReply={onReply} comments={comments} />
				))}

				<CommentInput name={userData.display_name} parent_id={parent_id} postID={postID} userData={userData} setDependency={setDependency}/>
			</div>
		</div>
	);
}
