'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function EventCard(props: any) {
	const {
		id,
		title,
		description,
		onChildClick,
		avatar = 'https://avatars.githubusercontent.com/u/66357924?v=4',
	} = props;
	return (
		<Card
			className="hover:shadow-xl hover:scale-[101%] my-2 w-[590px] h-[132px] flex flex-row items-center cursor-pointer"
			onClick={() => onChildClick(id)}
		>
			<Avatar className="w-[60px] h-[60px] mx-6">
				<AvatarImage src={avatar} alt="@shadcn" />
				<AvatarFallback>Avatar</AvatarFallback>
			</Avatar>
			<div className="flex flex-col w-[455px] overflow-x-hidden">
				<p className="text-xl line-clamp-1">{title}</p>
				<p className="text-gray-800 line-clamp-1">{description}</p>
			</div>
		</Card>
	);
}

export function EventCardPost(props: any) {
	const { setCurrentPage, event } = props;
	const close = () => setCurrentPage('');
	return (
		<motion.div
			className="bg-red-200 pl-16 pt-12"
			initial={{
				opacity: 0,
				width: '960px',
				height: '144px',
				borderRadius: '33px',
			}}
			animate={{
				opacity: 1,
				width: '1200px',
				height: '100%',
				minHeight: '720px',
				borderRadius: '60px',
			}}
			exit={{ opacity: 0, scale: 0, transition: { duration: 0.25 } }}
			transition={{ duration: 1.25, ease: 'easeIn' }}
		>
			<div className="flex flex-row">
				<h2 className="text-9xl basis-[95%]">{event?.title}</h2>
				<div className="bg-red-400 rounded-full w-12 h-12 mr-10" onClick={close}></div>
			</div>
			{event?.description}
		</motion.div>
	);
}
