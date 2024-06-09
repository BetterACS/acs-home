import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { GitHubRepoProps } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import bookmarkImage from '/public/bookmark-anim.gif';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRef, useState } from 'react';
import { trpc } from '@/app/_trpc/client';

export default function GitHubEventCard(props: GitHubRepoProps) {
	const cardRef = useRef<any>();
	const { id,title, fullName, avatar, description, language, stars, userID, userAvatar, onClick ,bookmark_status,bookmark,userData,setBookMarkDependency} = props;
	const [isBookmark, setIsBookmark] = useState(bookmark_status);

	const [dependency, setDependency] = useState(false);
	const [_id, setId] = useState('');
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
			user_id: userData._id,
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
		console.log('bookmark', bookmark)
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
		<Card
			ref={cardRef}
			onClick={() => onClick?.(title, description, avatar, cardRef.current, userAvatar)}
			className="cursor-pointer scale-[92%] h-[318px] w-[381px] flex flex-col justify-evenly items-center drop-shadow-lg hover:scale-[95%] transition-transform duration-100 ease-in-out"
		>
			<div className="flex flex-row w-[320px] items-top justify-between">
				<div className="flex flex-row items-top">
					<Avatar className="w-[38px] h-[38px] mr-4 mt-2">
						<AvatarImage src={userAvatar} alt="@shadcn" />
						<AvatarFallback>Avatar</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-2xl leading-tight font-bold line-clamp-2">{title}</p>
					</div>
				</div>
				<div className="mt-1 cursor-pointer" onClick={bookmarkButton}>
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
			</div>
			<Card className="h-[170px] w-[320px] flex flex-col justify-between p-4">
				<div className="flex flex-row justify-between">
					<div className="mr-4 mt-2 w-[200px]">
						<p className="text-[1.25rem] break-words ...">{fullName}</p>
						<p
							className={clsx(
								'text-sm line-clamp-3 w-[200px] pt-[2px]',
								description ? 'text-gray-600' : 'text-gray-400'
							)}
						>
							{description ? description : 'No description'}
						</p>
					</div>
					<Avatar className="w-[64px] h-[64px] rounded-lg">
						<AvatarImage src={avatar} alt="@shadcn" />
						<AvatarFallback>Icon</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-row">
					<Badge variant="outline" className="h-8 flex flex-row justify-center">
						<Star strokeWidth={2} size={20} />
						<p className="pl-2">{stars}</p>
					</Badge>
					<div className="pl-2">
						<Badge color="red">{language}</Badge>
					</div>
				</div>
			</Card>
		</Card>
	);
}
