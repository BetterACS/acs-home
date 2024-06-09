import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import CommentInput from './commentsInput';
import { Comment } from '@/database/models';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '@/components/utils/ui';
import GiveCoinButton from './giveCoinButton';
// function Component() {
// 	const controls = useAnimationControls();

// 	useEffect(() => {
// 		controls.start({ scale: 2 });
// 	}, []);

// 	return <motion.div animate={controls} />;
// }

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
	const { _id, comment_text, parent_id, onReply, comments, user_id, className,setCoinDependency,userData,postCoin,postID,setCoinGithubDependency,user_id_foreign,isLoggedIn } = props;

	return (
		<div className={className}>
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row items-center space-x-2">
					<img
						className="w-[32px] h-[32px] bg-blue-300 rounded-full"
						src={`https://cdn.discordapp.com/avatars/${user_id.discord_id}/${user_id.avatar}.png`}
						alt="https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png"
					/>
					<p>{user_id.display_name}</p>
				</div>
			</div>

			<div className="py-2">{comment_text}</div>
			{onReply !== undefined ? (
				<div className="flex flex-row items-center space-x-2">
					{/* <div className="py-[2px] px-[8px] text-sm border-2 rounded-md cursor-pointer">Give</div> */}
					<GiveCoinButton setCoinDependency={setCoinDependency} userData={userData} postCoin={postCoin} postID={postID} setCoinGithubDependency={setCoinGithubDependency} user_id_foreign={user_id_foreign} isLoggedIn={isLoggedIn} user_id_foreign_comment={user_id._id}/>
					{isLoggedIn&&<div
						className={cn('py-[2px] px-[8px] text-sm border-2 rounded-md cursor-pointer')}
						onClick={() => onReply(_id)}
					>
						Reply
					</div>}
				</div>
			) : null}
		</div>
	);
}

const CommentBlock = forwardRef((props: any, ref: any) => {
	const { _id, comment_text, parent_id, onReply, comments, user_id,setCoinDependency,userData,postID, postCoin,setCoinGithubDependency,user_id_foreign,isLoggedIn} = props;
	const [isToggle, setToggle] = useState(true);
	const placeholder = useMemo(() => (isToggle ? 'Hide replies' : 'See replies'), [isToggle]);
	const animation = useAnimationControls();
	// const [isFocus, setFocus] = useState(false);

	// const onFocus = () => {
	// 	setFocus(true);
	// 	console.log('focus');
	// };

	// const onBlur = () => {
	// 	setFocus(false);
	// };

	function recursive(parent_id: any): JSX.Element {
		if (parent_id === null) {
			return <></>;
		}
		return (
			<>
				{recursive(parent_id.parent_id)}
				<div>
					<div className="relative flex flex-row py-2">
						<div className="border-l-[5px] border-gray-200"></div>
						<CommentComponent className="pl-6 text-gray-400 mb-2" {...parent_id} onReply={undefined} setCoinDependency={setCoinDependency} userData={userData} postCoin={postCoin} postID={postID} setCoinGithubDependency={setCoinGithubDependency} user_id_foreign={user_id_foreign} isLoggedIn={isLoggedIn}/>
					</div>
				</div>
			</>
		);
	}
	useEffect(() => {
		if (isToggle) {
			animation.start({ height: '100%' });
		} else {
			animation.start({ height: '0px' });
		}
	}, [isToggle]);

	return (
		<div ref={ref} className={cn('rounded-lg border-2 p-4')}>
			{parent_id !== null ? (
				<div>
					<p className="text-gray-400 text-md cursor-pointer mb-2" onClick={() => setToggle(!isToggle)}>
						<i>{placeholder}</i>
					</p>
					<motion.div className="overflow-hidden" animate={animation}>
						{recursive(parent_id)}
					</motion.div>
				</div>
			) : null}
			<CommentComponent {...props} />
		</div>
	);
});

export default function CommentsElement(props: any) {
	const { className, postID, userData,setCoinDependency,postCoin,setCoinGithubDependency,user_id_foreign,isLoggedIn} = props;
	const [parent_id, setParentId] = useState('');
	const [dependency, setDependency] = useState(false);
	const [comments, setComment] = useState<Comment[]>([]);
	const commentsRef = useRef<any>(null);
	const refToInput = useRef<any>(null);
	const replyToComment = useRef<any>(null);

	async function Loaddata() {
		('use server');
		await fetch(`/api/trpc/getComment?input=${encodeURIComponent(JSON.stringify({ post_id: postID }))}`).then(
			async (res) => {
				const query = await res.json();
				console.log('query', query);
				const query_data = query.result.data.data.post as Comment[];
				setComment(query_data);
			}
		);
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

	useEffect(() => {
		if (refToInput.current && parent_id !== '') {
			refToInput.current.scrollIntoView({ behavior: 'smooth' });

			const index = comments.findIndex((comment) => comment._id === parent_id);
			if (index !== -1) {
				for (let i = 0; i < commentsRef.current.children.length - 1; i++) {
					if (commentsRef.current.children[i].className.includes('border-blue-500')) {
						commentsRef.current.children[i].className = commentsRef.current.children[i].className.replace(
							'border-blue-500',
							''
						);
					}
				}
				replyToComment.current = commentsRef.current.children[index];
			}
		} else {
			replyToComment.current = null;
			for (let i = 0; i < commentsRef.current.children.length - 1; i++) {
				if (commentsRef.current.children[i].className.includes('border-blue-500')) {
					commentsRef.current.children[i].className = commentsRef.current.children[i].className.replace(
						'border-blue-500',
						''
					);
				}
			}
		}
	}, [parent_id]);

	const onReply = (id: string) => {
		setParentId(id);
	};
	console.log('comments', comments);

	return (
		<div className={className}>
			<div className="relative flex py-5 items-center">
				<div className="flex-grow border-t border-gray-200"></div>
				<span className="flex-shrink mx-4 text-gray-400">Comments</span>
				<div className="flex-grow border-t border-gray-200"></div>
			</div>
			<div className="flex flex-col space-y-4" ref={commentsRef}>
				{comments.map((comment) => (
					<CommentBlock key={comment._id} {...comment} onReply={onReply} comments={comments} setCoinDependency={setCoinDependency} userData={userData} postID={postID} postCoin={postCoin} setCoinGithubDependency={setCoinGithubDependency} user_id_foreign={user_id_foreign} isLoggedIn={isLoggedIn}/>
				))}

				{isLoggedIn && <CommentInput
					ref={refToInput}
					replyReference={replyToComment}
					name={userData.display_name}
					parent_id={parent_id}
					postID={postID}
					userData={userData}
					setDependency={setDependency}
					setParentId={setParentId}
				/>}
			</div>
		</div>
	);
}
