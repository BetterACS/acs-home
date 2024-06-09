import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState, forwardRef, useMemo } from 'react';
import { trpc } from '@/app/_trpc/client';
import { z } from 'zod';
import { set } from 'mongoose';

const CommentInput = forwardRef((props: any, ref: any) => {
	const { name, parent_id, postID, userData, setDependency, replyReference, setParentId } = props;
	const isReply = useMemo(() => parent_id !== '', [parent_id]);
	const [_id, setId] = useState('');

	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [value, setValue] = useState('');
	const [placeholder, setPlaceholder] = useState('Type your message here.');
	// const replyReference = useRef<any>(replyRef);

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.overflow = 'hidden';
			textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
		}
	}, [value]);

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
			post_id: postID,
			user_id: userData._id,
			comment_text: value,
			parent_id: '',
		};

		if (parent_id) {
			commentData.parent_id = parent_id;
		}
		console.log('commentData', commentData);

		setValue('');
		const response = await mutation.mutate(commentData);
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		console.log('outer', value);
		setValue(e.target.value);
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

	useEffect(() => {
		console.log(replyReference.current);
	}, [replyReference.current]);

	const scrollToRef = () => {
		console.log(replyReference.current);
		if (replyReference.current) {
			replyReference.current.scrollIntoView({ behavior: 'smooth' });
			replyReference.current.className += ' border-blue-500';
		}
	};
	return (
		<div className="rounded-lg border-2 p-4" ref={ref}>
			{isReply ? (
				<div className="flex items-center space-x-4 pb-4">
					<p>You replying to</p>
					<i className="text-gray-400 cursor-pointer" onClick={scrollToRef}>
						Jack jessada
					</i>
					<p className="cursor-pointer" onClick={() => setParentId('')}>
						click here to <span className="text-red-400">cancel</span>
					</p>
				</div>
			) : null}

			<div className="flex flex-row items-center space-x-2 mb-2">
				<img
					className="w-[32px] h-[32px] bg-blue-300 rounded-full"
					src={`https://cdn.discordapp.com/avatars/${userData.discord_id}/${userData.avatar}.png`}
					alt="https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png"
				/>
				<p>{name}</p>
			</div>
			{/* <CommentInputTextArea onChange={handleOnChange} postID={postID} userID={userData._id} /> */}
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
			<div className="w-full flex flex-row justify-endz">
				<Button onClick={handleSubmit} className="" color="blue">
					Sent
				</Button>
			</div>
		</div>
	);
});

export default CommentInput;
