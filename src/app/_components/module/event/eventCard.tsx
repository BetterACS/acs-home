'use client';

import { motion } from 'framer-motion';

export default function EventCard(props: any) {
	const { id, title, description, onChildClick } = props;

	return (
		<div>
			<motion.div
				className="flex flex-col bg-red-400 h-[144px] mx-[70px] rounded-[26px] my-[10px]"
				onClick={() => onChildClick(id)}
			>
				<h1>{title}</h1>
				{description}
			</motion.div>
		</div>
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
			{event?.dueDate}
		</motion.div>
	);
}
