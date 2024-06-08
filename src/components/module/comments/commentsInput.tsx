import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { trpc } from '@/app/_trpc/client';
import { z } from 'zod';
import { set } from 'mongoose';
function CommentInputTextArea({ onChange,postID,userID }: { onChange: (text: string) => void,postID:string,userID:string }) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [value, setValue] = useState('');
	const [placeholder, setPlaceholder] = useState('Type your message here.');

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.overflow = 'hidden';
			textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
		}
	}, [value]);

	const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
		onChange(e.target.value);
	};

	const onFocus = () => {
		if (value === '') {
			setPlaceholder('');
		}
	};

	const onBlur = () => {
		if (value === '') {
			setPlaceholder('Type your message here.');
		}
	};

	return (
		<Textarea
			className="text-md focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-0"
			style={{ resize: 'none' }}
			ref={textAreaRef}
			placeholder={placeholder}
			value={value}
			onChange={handleOnChange}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
}

export default function CommentInput(props: any) {
	const { name, parent_id,postID,userData,setDependency } = props;
	const [value, setValue] = useState('');
	const [placeholder, setPlaceholder] = useState('Type your message here.');
	const [_id, setId] = useState('');

	const mutation = trpc.createComment.useMutation({
		onSuccess: (data) => {
			setValue('');
			console.log('data:', data);
			console.log('data.data._id:', data.data._id);
			setId(data.data._id);
			setDependency(true);
		},
		onError: (error: any) => {
			console.error('Error creating post:', error);
			alert('Failed to create post');
		},
		onSettled: () => {
			console.log('settled');
		},
	});

	const handleSubmit = async () => {

		const commentData = {
			post_id:postID,
			user_id:userData._id,
			comment_text:value,
			parent_id:""
		};

		if (parent_id) {
			commentData.parent_id = parent_id;
		}
		console.log("commentData",commentData);

		const response = await mutation.mutate(commentData);
	};

	const handleOnChange = (value: string) => {
		console.log("outer",value);
		setValue(value);
	};

	const onFocus = () => {
		if (value === '') {
			setPlaceholder('');
		}
	};

	const onBlur = () => {
		if (value === '') {
			setPlaceholder('Type your message here.');
		}
	};
	return (
		<div className="rounded-lg border-2 p-4">
			<div className="flex flex-row items-center space-x-2 mb-2">
				<img className="w-[32px] h-[32px] bg-blue-300 rounded-full" src={`https://cdn.discordapp.com/avatars/${userData.discord_id}/${userData.avatar}.png`} alt="https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png" />
				<p>{name}</p>
			</div>
			<CommentInputTextArea onChange={handleOnChange} postID={postID} userID={userData._id}/>
			<div className="w-full flex flex-row justify-endz">
				<Button onClick={handleSubmit} className="" color="blue">
					Sent
				</Button>
			</div>
		</div>
	);
}
