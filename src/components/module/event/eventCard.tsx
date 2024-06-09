'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useRef, useState } from 'react';
import EventCardPopup from './eventCardPopup';
import Image from 'next/image';
import bookmarkImage from '/public/bookmark-anim.gif';
import { trpc } from '@/app/_trpc/client';

export default function EventCard(props: any) {
	const {
		id,
		title,
		name,
		description,
		onChildClick,
		avatar = 'https://avatars.githubusercontent.com/u/66357924?v=4',
		due_date,
		coin,
		user,
		bookmark_status,
		bookmark,
		setBookMarkDependency,
		setCoinDependency,
		setCoinGithubDependency,
		coinGithubDependency,
		user_id_foreign,
		isLoggedIn
	} = props;
	const [modalOpen, setModalOpen] = useState(false);
	const [isBookmark, setIsBookmark] = useState(bookmark_status);

	const cardRef = useRef<any>();
	const open = () => {
		setModalOpen(true);
		onChildClick(id);
		console.log('open', id);
	};


	const [_id, setId] = useState('');
	const [dependency, setDependency] = useState(false);

	const mutation = trpc.createBookMark.useMutation({
		onSuccess: (data) => {
			console.log('data:', data);
			console.log('data.data._id:', data.data._id);
			setId(data.data._id);
			setDependency(true);
			setBookMarkDependency(true);
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
		const bookmarkData = {
			post_id: id,
			user_id: user._id,
		};

		console.log('bookmarkData', bookmarkData);

		const response = await mutation.mutate(bookmarkData);
	};

	const mutationDelete = trpc.deleteBookMark.useMutation({
		onSuccess: (data) => {
			setBookMarkDependency(true);
		},
		onError: (error: any) => {
			console.error('Error creating post:', error);
			alert('Failed to create post');
		},
		onSettled: () => {
			console.log('settled');
		},
	});

	const handleDelete = async () => {	
		const bookmarkData = {
			_id: bookmark._id,
		};

		console.log('bookmarkData', bookmarkData);

		const response = await mutationDelete.mutate(bookmarkData);
	};

	const bookmarkButton = async (e:any) => {
		e.stopPropagation();
	
		if (isBookmark) {
			console.log('Unbookmark');
			await handleDelete();
			setIsBookmark(false);
			
		} else {
			console.log('Bookmark');
			await handleSubmit();
			setIsBookmark(true);
			console.log('State set to bookmark');
		}
		console.log("Bookmark function called");
	};

	return (
		<div>
			{modalOpen && (
				<EventCardPopup
					avatar={avatar}
					name={name}
					title={title}
					description={description}
					ref={cardRef}
					setModalOpen={setModalOpen}
					coin={coin}
					due_date={due_date}
					postID={id}
					userData={user}
					setCoinDependency={setCoinDependency}
					setCoinGithubDependency={setCoinGithubDependency}
					user_id_foreign={user_id_foreign}
					isLoggedIn={isLoggedIn}
				/>
			)}
			<Card
				ref={cardRef}
				className="hover:shadow-xl hover:scale-[101%] pr-4  my-2 w-[590px] h-[132px] flex flex-row items-center cursor-pointer"
				onClick={open}
			>
				<Avatar className="w-[60px] h-[60px] mx-6">
					<AvatarImage src={avatar} alt="@shadcn" />
					<AvatarFallback>Avatar</AvatarFallback>
				</Avatar>
				<div className="flex flex-col w-[455px] overflow-x-hidden">
					<p className="text-xl line-clamp-1">{title}</p>
					<p className="text-gray-800 line-clamp-1">{description}</p>
				</div>
				<div className="cursor-pointer" onClick={bookmarkButton}>
					{isLoggedIn && (
						isBookmark ? (
							<Image
								className="hover:scale-[114%]"
								alt="bookmark"
								src={bookmarkImage}
								width={36}
								height={36}
								priority
							/>
						) : (
							<Image
								className="hover:scale-[114%]"
								alt="bookmark"
								src={'/bookmark.png'}
								width={36}
								height={36}
							/>
						)
					)}
				</div>
			</Card>
		</div>
	);
}
