import { useState } from 'react';
import CommentInput from './commentsInput';
// You can edit this file to modify the list of comments
const example = [
	{
		id: 1,
		parent_id: -1,
		avatar: 'https://avatars.githubusercontent.com/u/66357924?v=4',
		name: 'John Doe',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
	{
		id: 2,
		parent_id: 1,
		avatar: 'https://avatars.githubusercontent.com/u/66357924?v=4',
		name: 'Jane Doe',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	},
];

function Comment(props: any) {
	const { id, avatar, parent_id, name, text, className, onReply } = props;

	return (
		<div className={className}>
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row items-center space-x-2">
					<div className="w-[32px] h-[32px] bg-blue-300 rounded-full"></div>
					<p>{name}</p>
				</div>
				<div
					className="bg-red-200 rounded-full w-[18px] h-[18px] cursor-pointer"
					onClick={() => onReply(id)}
				></div>
			</div>
			<div className="mt-2">{text}</div>
		</div>
	);
}

function CommentBlock(props: any) {
	const { id, avatar, parent_id, name, text, onReply } = props;

	const findParentText = (id: number) => {
		return example.find((comment) => comment.id === id);
	};

	return (
		<div className="rounded-lg border-2 p-4">
			{parent_id !== -1 && (
				<div>
					<div className="relative flex flex-row py-2">
						<div className="border-l-[5px] border-gray-200"></div>
						<Comment className="pl-6 text-gray-400 mb-2" {...findParentText(props.parent_id)} />
					</div>
				</div>
			)}
			<Comment {...props} />
		</div>
	);
}

export default function CommentsElement(props: any) {
	const { className } = props;
	const [parent_id, setParentId] = useState(-1);

	const onReply = (id: number) => {
		setParentId(id);
	};
	return (
		<div className={className}>
			<div className="relative flex py-5 items-center">
				<div className="flex-grow border-t border-gray-200"></div>
				<span className="flex-shrink mx-4 text-gray-400">Comments</span>
				<div className="flex-grow border-t border-gray-200"></div>
			</div>
			<div className="flex flex-col space-y-4">
				{example.map((comment) => (
					<CommentBlock key={comment.id} {...comment} onReply={onReply} />
				))}

				<CommentInput name="Monchinawat" parent_id={parent_id} />
			</div>
		</div>
	);
}
