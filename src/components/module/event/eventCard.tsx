'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useRef, useState } from 'react';
import EventCardPopup from './eventCardPopup';
import Image from 'next/image';
import bookmarkImage from '/public/bookmark-anim.gif';

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
	} = props;
	const [modalOpen, setModalOpen] = useState(false);
	const [isBookmark, setIsBookmark] = useState(false);

	const cardRef = useRef<any>();
	const open = () => {
		setModalOpen(true);
		onChildClick(id);
		console.log('open', id);
	};

	const bookmark = (e: any) => {
		e.stopPropagation();
		setIsBookmark(!isBookmark);
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
				<div className="cursor-pointer" onClick={bookmark}>
					{isBookmark ? (
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
					)}
				</div>
			</Card>
		</div>
	);
}
